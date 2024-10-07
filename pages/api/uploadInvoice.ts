import formidable, { IncomingForm } from 'formidable';
import fs from 'fs';
import path from 'path';
import { NextApiRequest, NextApiResponse } from 'next';
import { GoogleAIFileManager } from "@google/generative-ai/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

// File type and size limits
const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/gif'];
const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2 MB

// Disable body parsing to use formidable
export const config = {
  api: {
    bodyParser: false,
  },
};

const uploadInvoice = (req: NextApiRequest, res: NextApiResponse): void => {
  const form = new IncomingForm();
  let uploadPath : string;

  form.uploadDir = path.join(process.cwd(), 'public/uploads');
  form.keepExtensions = true; // Keep file extensions

  form.on('file', (field: string, file: formidable.File) => {
    if (file.size > MAX_FILE_SIZE) {
      return res.status(400).json({ message: 'File is too large' });
    }

    if (!ALLOWED_MIME_TYPES.includes(file.mimetype)) {
      return res.status(400).json({ message: 'Invalid file type' });
    }

    const newFileName = Date.now() + path.extname(file.originalFilename);
    const newFilePath = path.join(form.uploadDir, newFileName);
    
    uploadPath = newFilePath;
    
    fs.renameSync(file.filepath, newFilePath);
  });

  form.on('end', () => {
    processInvoice(uploadPath).then(r => {
      res.status(200).json({ message: r });
    });
  });

  form.on('error', (err: Error) => {
    console.error(err);
    res.status(500).json({ message: 'File upload failed.' });
  });

  form.parse(req)
};

const processInvoice = async (uploadPath: string) : Promise<string> => {
  let googleFileName = "";

  try {
    const geminiApiKey = process.env.GEMINI_API_KEY as string;
    const fileManager = new GoogleAIFileManager(geminiApiKey);
    const uploadResult = await fileManager.uploadFile(
      uploadPath,
      {
        mimeType: "image/png",
        displayName: "Jetpack drawing",
      },
    );

    googleFileName = uploadResult.file.name;

    const genAI = new GoogleGenerativeAI(geminiApiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent([
      "Retorna-me um json com um array que tem 3 campos, preço, quantidade e nome do produto para cada produto na fatura.",
      {
        fileData: {
          fileUri: uploadResult.file.uri,
          mimeType: uploadResult.file.mimeType,
        },
      },
    ]);
  
    return result.response.text();
  } catch (err) {
    console.error("Error", err);
    return "";
  } finally { 
    deleteLocalFile(uploadPath);
    
    if(googleFileName != "") {
      deleteDriveFile(googleFileName);
    }
  }
}

const deleteLocalFile = (localPath: string) : boolean => {
  try {
    fs.unlinkSync(localPath);
    return true;
  } catch (err) {
    console.error(`Error deleting file: ${err}`);
    return false;
  }
}

const deleteDriveFile = async (googleFilename: string) : Promise<boolean> => {
  const geminiApiKey = process.env.GEMINI_API_KEY as string;
  const fileManager = new GoogleAIFileManager(geminiApiKey);

  try {
    await fileManager.deleteFile(googleFilename);
    return true;
  } catch(error) {
    console.error('Error removing google fiel:', error);
    return false;
  } 
}

export default uploadInvoice;