import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { filename, contentBase64 } = body as {
      filename: string;
      contentBase64: string;
    };

    if (!filename || !contentBase64) {
      return NextResponse.json({ error: "Missing filename or content" }, { status: 400 });
    }

    // Basic size check (avoid huge files) - approximate by base64 length
    const maxBase64Length = 20 * 1024 * 1024; // ~20MB base64
    if (contentBase64.length > maxBase64Length) {
      return NextResponse.json({ error: "File too large" }, { status: 413 });
    }

    const uploadsDir = path.join(process.cwd(), "public", "uploads");
    await fs.mkdir(uploadsDir, { recursive: true });

    // Sanitize filename: keep last part and prepend timestamp
    const safeName = filename.split(/\\|\//).pop() || filename;
    const timestamp = Date.now();
    const outName = `${timestamp}-${safeName}`;
    const outPath = path.join(uploadsDir, outName);

    // Decode base64
    const buffer = Buffer.from(contentBase64, "base64");

    await fs.writeFile(outPath, buffer);

    const publicUrl = `/uploads/${outName}`;

    return NextResponse.json({ url: publicUrl });
  } catch (err: any) {
    console.error("Upload error:", err);
    return NextResponse.json({ error: err?.message ?? "Unknown error" }, { status: 500 });
  }
}
