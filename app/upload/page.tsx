"use client";

import { useState, useRef } from "react";
import { Navbar } from "@/app/components/Navigation/Navbar";

type UploadResult = {
  url: string;
};

export default function UploadPage() {
  const [fileName, setFileName] = useState<string | null>(null);
  const [previewDataUrl, setPreviewDataUrl] = useState<string | null>(null);
  const [fileType, setFileType] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  function reset() {
    setFileName(null);
    setPreviewDataUrl(null);
    setFileType(null);
    setMessage(null);
  }

  function handleFile(file: File | null) {
    reset();
    if (!file) return;
    setFileName(file.name);
    setFileType(file.type);

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string | ArrayBuffer | null;
      if (!result) return;
      if (typeof result === "string") {
        setPreviewDataUrl(result);
      } else {
        // ArrayBuffer -> convert to base64
        const blob = new Blob([result]);
        const r2 = new FileReader();
        r2.onload = () => setPreviewDataUrl(r2.result as string);
        r2.readAsDataURL(blob);
      }
    };

    // For PDFs and images we'll load as data URL
    reader.readAsDataURL(file);
  }

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0] ?? null;
    handleFile(f);
  }

  function onDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    const f = e.dataTransfer.files?.[0] ?? null;
    handleFile(f);
  }

  function onDragOver(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
  }

  async function upload() {
    if (!previewDataUrl || !fileName) return;
    setUploading(true);
    setMessage(null);

    try {
      // Strip data:*/*;base64, prefix
      const parts = previewDataUrl.split(",");
      const base64 = parts[1] ?? parts[0];

      const res = await fetch("/api/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ filename: fileName, contentBase64: base64 }),
      });

      if (!res.ok) {
        const txt = await res.text();
        throw new Error(txt || "Upload failed");
      }

      const json = (await res.json()) as UploadResult;
      setMessage(`Fatura enviada com sucesso: ${json.url}`);
    } catch (err: any) {
      console.error(err);
      setMessage(err?.message ?? "Erro ao enviar");
    } finally {
      setUploading(false);
    }
  }

  return (
    <>
      <Navbar title="Upload de Fatura" />
      <main className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8 text-white">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">Enviar fatura</h1>
          <p className="text-gray-400 mb-6">
            Faça upload de uma fatura em PDF ou imagem (PNG/JPEG). Mostraremos
            pré-visualização antes do envio.
          </p>

          <div
            onDrop={onDrop}
            onDragOver={onDragOver}
            className="border-2 border-dashed border-gray-700 rounded-lg p-6 text-center mb-4 bg-gray-800 hover:border-gray-600 transition"
          >
            <p className="text-gray-300 mb-4">Arraste e solte o ficheiro aqui</p>
            <p className="text-sm text-gray-500 mb-4">ou</p>
            <div>
              <input
                ref={inputRef}
                type="file"
                accept="application/pdf,image/*"
                onChange={onChange}
                className="hidden"
              />
              <button
                className="px-4 py-2 bg-blue-600 rounded text-white hover:bg-blue-500"
                onClick={() => inputRef.current?.click()}
              >
                Escolher ficheiro
              </button>
            </div>
          </div>

          {fileName && (
            <div className="mb-4">
              <p className="text-sm text-gray-300">Ficheiro: {fileName}</p>
              <p className="text-sm text-gray-400">Tipo: {fileType}</p>
            </div>
          )}

          {previewDataUrl && fileType?.startsWith("image/") && (
            <div className="mb-4">
              <img
                src={previewDataUrl}
                alt="preview"
                className="max-h-80 mx-auto rounded shadow"
              />
            </div>
          )}

          {previewDataUrl && fileType === "application/pdf" && (
            <div className="mb-4">
              <object
                data={previewDataUrl}
                type="application/pdf"
                width="100%"
                height={600}
              >
                <p className="text-gray-400">Não é possível pré-visualizar o PDF.</p>
              </object>
            </div>
          )}

          <div className="flex gap-3">
            <button
              disabled={!previewDataUrl || uploading}
              onClick={upload}
              className="px-4 py-2 bg-green-600 rounded disabled:opacity-50"
            >
              {uploading ? "A enviar..." : "Enviar fatura"}
            </button>
            <button onClick={reset} className="px-4 py-2 bg-gray-700 rounded">
              Cancelar
            </button>
          </div>

          {message && (
            <div className="mt-4 p-3 rounded bg-gray-800 border border-gray-700 text-sm">
              {message}
            </div>
          )}
        </div>
      </main>
    </>
  );
}
