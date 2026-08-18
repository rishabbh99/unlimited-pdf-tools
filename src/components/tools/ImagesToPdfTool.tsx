import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { imagesToPdf } from '../../utils/pdfHelpers';
import { FileUploader } from '../FileUploader';
import { PrivacyBadge } from '../PrivacyBadge';
import { AdBanner } from '../AdBanner';
import { Image as ImageIcon, Download, RefreshCw, CheckCircle, Trash2, ArrowUp, ArrowDown } from 'lucide-react';

export const ImagesToPdfTool: React.FC = () => {
  const [images, setImages] = useState<File[]>([]);
  const [orientation, setOrientation] = useState<'portrait' | 'landscape'>('portrait');
  const [pageSize, setPageSize] = useState<'a4' | 'letter' | 'fit'>('a4');
  const [isProcessing, setIsProcessing] = useState(false);
  const [pdfBytes, setPdfBytes] = useState<Uint8Array | null>(null);

  const handleImagesSelected = (files: File[]) => {
    setImages((prev) => [...prev, ...files]);
    setPdfBytes(null);
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const moveImage = (index: number, dir: 'up' | 'down') => {
    const list = [...images];
    const target = dir === 'up' ? index - 1 : index + 1;
    if (target >= 0 && target < list.length) {
      const temp = list[index];
      list[index] = list[target];
      list[target] = temp;
      setImages(list);
    }
  };

  const triggerFileDownload = (bytes: Uint8Array) => {
    const blob = new Blob([bytes], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'converted_images.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleConvert = async () => {
    if (images.length === 0) return;
    setIsProcessing(true);
    try {
      const result = await imagesToPdf(images, orientation, pageSize);
      setPdfBytes(result);
      confetti({ particleCount: 70, spread: 60, origin: { y: 0.7 } });
      triggerFileDownload(result);
    } catch (err) {
      console.error('Image to PDF conversion error:', err);
      alert('Failed to convert images to PDF.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (pdfBytes) {
      triggerFileDownload(pdfBytes);
    } else {
      handleConvert();
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-6 px-4">
      <PrivacyBadge compact />

      {images.length === 0 ? (
        <FileUploader
          multiple
          isImageOnly
          accept="image/*,.jpg,.jpeg,.png,.webp"
          onFilesSelected={handleImagesSelected}
          title="Convert Images to PDF (JPG, PNG, WEBP)"
          subtitle="Combine multiple pictures into a clean multi-page PDF document. 100% Client-Side."
          buttonText="Select Images"
        />
      ) : (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
              <h3 className="font-bold text-slate-900 dark:text-white text-base">
                Selected Images ({images.length})
              </h3>
              <label className="cursor-pointer px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-xs font-semibold text-slate-700 dark:text-slate-200">
                + Add More Images
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(e) => e.target.files && handleImagesSelected(Array.from(e.target.files))}
                  className="hidden"
                />
              </label>
            </div>

            {!pdfBytes && (
              <div className="mt-6 space-y-6">
                {/* Image List */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-h-[300px] overflow-y-auto p-2">
                  {images.map((img, idx) => (
                    <div
                      key={idx}
                      className="relative group rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-800 aspect-square flex items-center justify-center p-1"
                    >
                      <img
                        src={URL.createObjectURL(img)}
                        alt={img.name}
                        className="w-full h-full object-cover rounded-xl"
                      />
                      <div className="absolute top-1 left-1 px-1.5 py-0.5 rounded bg-slate-900/80 text-white font-bold text-[10px]">
                        #{idx + 1}
                      </div>

                      <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1">
                        <button
                          disabled={idx === 0}
                          onClick={() => moveImage(idx, 'up')}
                          className="p-1.5 bg-white text-slate-900 rounded-lg disabled:opacity-30"
                        >
                          <ArrowUp className="w-3.5 h-3.5" />
                        </button>
                        <button
                          disabled={idx === images.length - 1}
                          onClick={() => moveImage(idx, 'down')}
                          className="p-1.5 bg-white text-slate-900 rounded-lg disabled:opacity-30"
                        >
                          <ArrowDown className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => removeImage(idx)}
                          className="p-1.5 bg-red-600 text-white rounded-lg"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Page Controls */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl">
                  <div>
                    <label className="text-xs font-bold text-slate-500 uppercase block mb-1">
                      Page Orientation:
                    </label>
                    <select
                      value={orientation}
                      onChange={(e) => setOrientation(e.target.value as 'portrait' | 'landscape')}
                      className="w-full bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl p-2.5 text-xs font-semibold"
                    >
                      <option value="portrait">Portrait (Vertical)</option>
                      <option value="landscape">Landscape (Horizontal)</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-500 uppercase block mb-1">
                      Paper Size:
                    </label>
                    <select
                      value={pageSize}
                      onChange={(e) => setPageSize(e.target.value as 'a4' | 'letter' | 'fit')}
                      className="w-full bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl p-2.5 text-xs font-semibold"
                    >
                      <option value="a4">Standard A4</option>
                      <option value="letter">US Letter</option>
                      <option value="fit">Fit to Image Aspect Ratio</option>
                    </select>
                  </div>
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    onClick={handleConvert}
                    disabled={isProcessing}
                    className="px-8 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-sm shadow-lg flex items-center gap-2"
                  >
                    {isProcessing ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>Generating PDF...</span>
                      </>
                    ) : (
                      <>
                        <ImageIcon className="w-4 h-4" />
                        <span>Convert Images to PDF</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* Download Banner */}
            {pdfBytes && (
              <div className="mt-6 p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-center space-y-4 animate-fade-in">
                <div className="w-12 h-12 mx-auto rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-lg">
                  <CheckCircle className="w-6 h-6" />
                </div>
                <h4 className="text-xl font-extrabold text-slate-900 dark:text-white">
                  Images Converted to PDF!
                </h4>
                <div className="pt-2 flex flex-col sm:flex-row justify-center gap-3">
                  <button
                    onClick={handleDownload}
                    className="px-8 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm shadow-lg flex items-center justify-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download Generated PDF</span>
                  </button>
                  <button
                    onClick={() => {
                      setPdfBytes(null);
                      setImages([]);
                    }}
                    className="px-5 py-3.5 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold text-sm"
                  >
                    Convert More Images
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
