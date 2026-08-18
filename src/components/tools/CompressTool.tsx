import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { compressPdf } from '../../utils/pdfHelpers';
import { FileUploader } from '../FileUploader';
import { PrivacyBadge } from '../PrivacyBadge';
import { AdBanner } from '../AdBanner';
import { CompressionSettings } from '../../types';
import { Download, Minimize2, CheckCircle, RefreshCw, Zap, Sliders, ArrowRight } from 'lucide-react';

export const CompressTool: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [level, setLevel] = useState<'extreme' | 'recommended' | 'high-quality'>('recommended');
  const [isCompressing, setIsCompressing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [compressedBytes, setCompressedBytes] = useState<Uint8Array | null>(null);
  const [originalSize, setOriginalSize] = useState(0);
  const [compressedSize, setCompressedSize] = useState(0);

  const handleFileSelected = (files: File[]) => {
    if (files.length > 0) {
      setFile(files[0]);
      setOriginalSize(files[0].size);
      setCompressedBytes(null);
    }
  };

  const triggerFileDownload = (bytes: Uint8Array) => {
    if (!file) return;
    const blob = new Blob([bytes], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = file.name.replace(/\.pdf$/i, '_compressed.pdf');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleCompress = async () => {
    if (!file) return;
    setIsCompressing(true);
    setProgress(10);

    try {
      const arrayBuffer = await file.arrayBuffer();
      const settings: CompressionSettings = {
        level,
        dpi: level === 'extreme' ? 100 : level === 'recommended' ? 150 : 200,
        imageQuality: level === 'extreme' ? 0.35 : level === 'recommended' ? 0.55 : 0.75,
        removeMetadata: true,
      };

      const resultBytes = await compressPdf(arrayBuffer, settings, (p) => setProgress(p));
      setCompressedBytes(resultBytes);
      setCompressedSize(resultBytes.length);

      // Trigger celebration confetti
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.7 },
      });
      triggerFileDownload(resultBytes);
    } catch (err) {
      console.error('Compression error:', err);
      alert('An error occurred while compressing your PDF. Please try a different file.');
    } finally {
      setIsCompressing(false);
    }
  };

  const handleDownload = () => {
    if (compressedBytes) {
      triggerFileDownload(compressedBytes);
    } else {
      handleCompress();
    }
  };

  const formatSize = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getSavedPercent = () => {
    if (originalSize === 0 || compressedSize === 0) return 0;
    const saved = ((originalSize - compressedSize) / originalSize) * 100;
    return saved > 0 ? Math.round(saved) : 0;
  };

  return (
    <div className="max-w-4xl mx-auto py-6 px-4">
      <PrivacyBadge compact />

      {!file ? (
        <FileUploader
          onFilesSelected={handleFileSelected}
          title="Compress PDF File Size (100% Client-Side)"
          subtitle="Reduce PDF file size up to 90% in browser. Zero server uploads."
          buttonText="Select PDF File"
        />
      ) : (
        <div className="space-y-6">
          {/* Active File Card */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-blue-500/10 text-blue-600 dark:text-blue-400">
                  <Minimize2 className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-base line-clamp-1">
                    {file.name}
                  </h3>
                  <p className="text-xs text-slate-500">Original Size: {formatSize(originalSize)}</p>
                </div>
              </div>

              <button
                onClick={() => setFile(null)}
                className="text-xs text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 underline"
              >
                Choose another file
              </button>
            </div>

            {/* Compression Options */}
            {!compressedBytes && (
              <div className="mt-6 space-y-4">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
                  Select Compression Strength:
                </label>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <button
                    onClick={() => setLevel('extreme')}
                    className={`p-4 rounded-2xl border text-left transition-all ${
                      level === 'extreme'
                        ? 'border-blue-600 bg-blue-50/50 dark:bg-blue-950/40 ring-2 ring-blue-500/20'
                        : 'border-slate-200 dark:border-slate-800 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between font-bold text-slate-900 dark:text-white text-sm mb-1">
                      <span>Extreme Compression</span>
                      <span className="text-xs px-2 py-0.5 rounded bg-amber-500/10 text-amber-600 font-extrabold">
                        ~70% Smaller
                      </span>
                    </div>
                    <p className="text-xs text-slate-500">
                      Maximum file size reduction. Ideal for low bandwidth & email attachments.
                    </p>
                  </button>

                  <button
                    onClick={() => setLevel('recommended')}
                    className={`p-4 rounded-2xl border text-left transition-all ${
                      level === 'recommended'
                        ? 'border-blue-600 bg-blue-50/50 dark:bg-blue-950/40 ring-2 ring-blue-500/20'
                        : 'border-slate-200 dark:border-slate-800 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between font-bold text-slate-900 dark:text-white text-sm mb-1">
                      <span>Recommended</span>
                      <span className="text-xs px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 font-extrabold">
                        ~50% Smaller
                      </span>
                    </div>
                    <p className="text-xs text-slate-500">
                      Perfect balance between high visual clarity and small document size.
                    </p>
                  </button>

                  <button
                    onClick={() => setLevel('high-quality')}
                    className={`p-4 rounded-2xl border text-left transition-all ${
                      level === 'high-quality'
                        ? 'border-blue-600 bg-blue-50/50 dark:bg-blue-950/40 ring-2 ring-blue-500/20'
                        : 'border-slate-200 dark:border-slate-800 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between font-bold text-slate-900 dark:text-white text-sm mb-1">
                      <span>High Quality</span>
                      <span className="text-xs px-2 py-0.5 rounded bg-blue-500/10 text-blue-600 font-extrabold">
                        ~20% Smaller
                      </span>
                    </div>
                    <p className="text-xs text-slate-500">
                      Slight compression prioritizing original print DPI & vector crispness.
                    </p>
                  </button>
                </div>

                {/* Submit Action */}
                <div className="pt-4 flex justify-end">
                  <button
                    onClick={handleCompress}
                    disabled={isCompressing}
                    className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2 transition-all hover:scale-105 disabled:opacity-50"
                  >
                    {isCompressing ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>Compressing locally ({progress}%)...</span>
                      </>
                    ) : (
                      <>
                        <Zap className="w-4 h-4" />
                        <span>Compress PDF Now</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* Results / Completed Banner */}
            {compressedBytes && (
              <div className="mt-6 p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-center space-y-4 animate-fade-in">
                <div className="w-12 h-12 mx-auto rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-lg">
                  <CheckCircle className="w-6 h-6" />
                </div>

                <div>
                  <h4 className="text-xl font-extrabold text-slate-900 dark:text-white">
                    PDF Successfully Compressed!
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                    Processed 100% locally inside your browser. No files were sent over the internet.
                  </p>
                </div>

                {/* Savings Badge */}
                <div className="flex items-center justify-center gap-4 py-3 bg-white dark:bg-slate-800 rounded-xl border border-emerald-500/20 max-w-md mx-auto">
                  <div className="text-center">
                    <span className="text-[10px] uppercase text-slate-400 font-bold block">Original</span>
                    <span className="font-extrabold text-slate-700 dark:text-slate-300 text-sm">
                      {formatSize(originalSize)}
                    </span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-emerald-500" />
                  <div className="text-center">
                    <span className="text-[10px] uppercase text-slate-400 font-bold block">Compressed</span>
                    <span className="font-extrabold text-emerald-600 dark:text-emerald-400 text-base">
                      {formatSize(compressedSize)}
                    </span>
                  </div>
                  <div className="px-2.5 py-1 rounded-lg bg-emerald-500 text-white text-xs font-black">
                    -{getSavedPercent()}%
                  </div>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <button
                    onClick={handleDownload}
                    className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 transition-transform hover:scale-105"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download Compressed PDF</span>
                  </button>

                  <button
                    onClick={() => {
                      setCompressedBytes(null);
                      setFile(null);
                    }}
                    className="w-full sm:w-auto px-5 py-3.5 rounded-xl bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 text-slate-700 dark:text-slate-200 font-bold text-sm"
                  >
                    Compress Another File
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
