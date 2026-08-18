import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { renderPdfPages } from '../../utils/pdfHelpers';
import { FileUploader } from '../FileUploader';
import { PrivacyBadge } from '../PrivacyBadge';
import { AdBanner } from '../AdBanner';
import { PdfPagePreview } from '../../types';
import { FileImage, Download, RefreshCw, CheckCircle, Eye } from 'lucide-react';

export const PdfToImagesTool: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [pages, setPages] = useState<PdfPagePreview[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFileSelected = async (files: File[]) => {
    if (files.length > 0) {
      setFile(files[0]);
      setIsProcessing(true);
      try {
        const buffer = await files[0].arrayBuffer();
        const previews = await renderPdfPages(buffer, 2.0); // 2x DPI scale for sharp images
        setPages(previews);
        confetti({ particleCount: 70, spread: 60, origin: { y: 0.7 } });
      } catch (err) {
        console.error('PdfToImages Error:', err);
        alert('Could not render PDF pages.');
      } finally {
        setIsProcessing(false);
      }
    }
  };

  const downloadPageImage = (page: PdfPagePreview) => {
    const link = document.createElement('a');
    link.href = page.dataUrl;
    link.download = `${file?.name.replace(/\.pdf$/i, '')}_page_${page.pageNumber}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="max-w-4xl mx-auto py-6 px-4">
      <PrivacyBadge compact />

      {!file ? (
        <FileUploader
          onFilesSelected={handleFileSelected}
          title="Convert PDF to High-Res PNG / JPG Images"
          subtitle="Render all pages of your PDF as high quality image files. 100% Client-Side."
          buttonText="Select PDF File"
        />
      ) : (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white text-base">
                  {file.name}
                </h3>
                <p className="text-xs text-slate-500">
                  Rendered {pages.length} pages as high-resolution PNG images
                </p>
              </div>

              <button
                onClick={() => setFile(null)}
                className="text-xs text-slate-500 hover:underline"
              >
                Change File
              </button>
            </div>

            {isProcessing ? (
              <div className="p-12 text-center text-slate-500 flex flex-col items-center gap-3">
                <RefreshCw className="w-8 h-8 animate-spin text-blue-600" />
                <span className="text-sm font-bold">Rendering PDF pages to high-DPI images...</span>
              </div>
            ) : (
              <div className="mt-6 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-h-[500px] overflow-y-auto p-2">
                  {pages.map((p) => (
                    <div
                      key={p.pageNumber}
                      className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-3 flex flex-col justify-between space-y-3"
                    >
                      <img
                        src={p.dataUrl}
                        alt={`Page ${p.pageNumber}`}
                        className="w-full h-auto object-contain rounded-xl border border-slate-200 dark:border-slate-700 bg-white"
                      />
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xs text-slate-700 dark:text-slate-300">
                          Page {p.pageNumber}
                        </span>
                        <button
                          onClick={() => downloadPageImage(p)}
                          className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-1"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>Save PNG</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <AdBanner placement="download" />
        </div>
      )}
    </div>
  );
};
