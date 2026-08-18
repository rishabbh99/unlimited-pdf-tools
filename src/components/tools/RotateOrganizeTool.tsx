import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { renderPdfPages, rotatePdfPages } from '../../utils/pdfHelpers';
import { FileUploader } from '../FileUploader';
import { PrivacyBadge } from '../PrivacyBadge';
import { AdBanner } from '../AdBanner';
import { PdfPagePreview } from '../../types';
import { RotateCw, Download, RefreshCw, CheckCircle, RotateCcw } from 'lucide-react';

export const RotateOrganizeTool: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [pages, setPages] = useState<PdfPagePreview[]>([]);
  const [rotations, setRotations] = useState<Record<number, number>>({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [rotatedBytes, setRotatedBytes] = useState<Uint8Array | null>(null);

  const handleFileSelected = async (files: File[]) => {
    if (files.length > 0) {
      setFile(files[0]);
      setIsProcessing(true);
      try {
        const buffer = await files[0].arrayBuffer();
        const previews = await renderPdfPages(buffer, 0.9);
        setPages(previews);
        setRotations({});
        setRotatedBytes(null);
      } catch (err) {
        console.error('Rotate Load Error:', err);
        alert('Could not render PDF pages.');
      } finally {
        setIsProcessing(false);
      }
    }
  };

  const handleRotatePage = (pageIndex: number, deltaAngle: number) => {
    setRotations((prev) => {
      const current = prev[pageIndex] || 0;
      return { ...prev, [pageIndex]: (current + deltaAngle) % 360 };
    });
  };

  const handleRotateAll = (deltaAngle: number) => {
    const updated: Record<number, number> = {};
    pages.forEach((p) => {
      const current = rotations[p.pageIndex] || 0;
      updated[p.pageIndex] = (current + deltaAngle) % 360;
    });
    setRotations(updated);
  };

  const triggerFileDownload = (bytes: Uint8Array) => {
    if (!file) return;
    const blob = new Blob([bytes], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = file.name.replace(/\.pdf$/i, '_rotated.pdf');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleApplyRotation = async () => {
    if (!file) return;
    setIsProcessing(true);
    try {
      const buffer = await file.arrayBuffer();
      const result = await rotatePdfPages(buffer, rotations);
      setRotatedBytes(result);
      confetti({ particleCount: 70, spread: 60, origin: { y: 0.7 } });
      triggerFileDownload(result);
    } catch (err) {
      console.error('Rotate Error:', err);
      alert('Failed to rotate PDF pages.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (rotatedBytes) {
      triggerFileDownload(rotatedBytes);
    } else {
      handleApplyRotation();
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-6 px-4">
      <PrivacyBadge compact />

      {!file ? (
        <FileUploader
          onFilesSelected={handleFileSelected}
          title="Rotate & Organize PDF Pages"
          subtitle="Permanently rotate pages 90°, 180°, or 270°. 100% Client-Side."
          buttonText="Select PDF File"
        />
      ) : (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white text-base">
                  {file.name}
                </h3>
                <p className="text-xs text-slate-500">{pages.length} Pages</p>
              </div>

              {!rotatedBytes && (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleRotateAll(90)}
                    className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-200 flex items-center gap-1"
                  >
                    <RotateCw className="w-3.5 h-3.5" />
                    <span>Rotate All 90°</span>
                  </button>
                  <button
                    onClick={() => setFile(null)}
                    className="text-xs text-slate-500 hover:underline ml-2"
                  >
                    Change File
                  </button>
                </div>
              )}
            </div>

            {!rotatedBytes && (
              <div className="mt-6 space-y-4">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-h-[450px] overflow-y-auto p-2 bg-slate-50 dark:bg-slate-950 rounded-2xl border border-slate-200 dark:border-slate-800">
                  {pages.map((p) => {
                    const angle = rotations[p.pageIndex] || 0;
                    return (
                      <div
                        key={p.pageNumber}
                        className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-3 text-center space-y-2"
                      >
                        <div className="overflow-hidden rounded-xl bg-slate-100 dark:bg-slate-900 h-40 flex items-center justify-center p-1">
                          <img
                            src={p.dataUrl}
                            alt={`Page ${p.pageNumber}`}
                            className="max-h-full max-w-full object-contain transition-transform duration-300"
                            style={{ transform: `rotate(${angle}deg)` }}
                          />
                        </div>
                        <span className="font-bold text-xs text-slate-700 dark:text-slate-300 block">
                          Page {p.pageNumber} ({angle}°)
                        </span>
                        <div className="flex justify-center gap-1">
                          <button
                            onClick={() => handleRotatePage(p.pageIndex, -90)}
                            className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-200"
                            title="Rotate Left 90°"
                          >
                            <RotateCcw className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleRotatePage(p.pageIndex, 90)}
                            className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-200"
                            title="Rotate Right 90°"
                          >
                            <RotateCw className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="pt-4 flex justify-end">
                  <button
                    onClick={handleApplyRotation}
                    disabled={isProcessing}
                    className="px-8 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-sm shadow-lg flex items-center gap-2"
                  >
                    {isProcessing ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>Applying Rotations...</span>
                      </>
                    ) : (
                      <>
                        <RotateCw className="w-4 h-4" />
                        <span>Save Rotated PDF</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}

            {rotatedBytes && (
              <div className="mt-6 p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-center space-y-4 animate-fade-in">
                <div className="w-12 h-12 mx-auto rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-lg">
                  <CheckCircle className="w-6 h-6" />
                </div>
                <h4 className="text-xl font-extrabold text-slate-900 dark:text-white">
                  PDF Page Rotations Applied!
                </h4>
                <div className="pt-2 flex flex-col sm:flex-row justify-center gap-3">
                  <button
                    onClick={handleDownload}
                    className="px-8 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm shadow-lg flex items-center justify-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download Rotated PDF</span>
                  </button>
                  <button
                    onClick={() => {
                      setRotatedBytes(null);
                      setFile(null);
                    }}
                    className="px-5 py-3.5 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold text-sm"
                  >
                    Rotate Another File
                  </button>
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
