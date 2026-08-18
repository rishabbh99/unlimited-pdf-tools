import React, { useState } from 'react';
import { runOcrOnPdf } from '../../utils/pdfHelpers';
import { FileUploader } from '../FileUploader';
import { PrivacyBadge } from '../PrivacyBadge';
import { AdBanner } from '../AdBanner';
import { OcrResult } from '../../types';
import { FileSearch, Copy, Download, RefreshCw, Check, Globe, Sparkles, AlertCircle } from 'lucide-react';

const OCR_LANGUAGES = [
  { code: 'eng', name: 'English' },
  { code: 'spa', name: 'Spanish (Español)' },
  { code: 'fra', name: 'French (Français)' },
  { code: 'deu', name: 'German (Deutsch)' },
  { code: 'por', name: 'Portuguese (Português)' },
  { code: 'ita', name: 'Italian (Italiano)' },
  { code: 'chi_sim', name: 'Chinese Simplified (简体中文)' },
  { code: 'jpn', name: 'Japanese (日本語)' },
  { code: 'rus', name: 'Russian (Русский)' },
  { code: 'ara', name: 'Arabic (العربية)' },
  { code: 'hin', name: 'Hindi (हिंदी)' },
];

export const OcrTool: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [language, setLanguage] = useState('eng');
  const [isProcessing, setIsProcessing] = useState(false);
  const [statusText, setStatusText] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [ocrResult, setOcrResult] = useState<OcrResult | null>(null);
  const [copied, setCopied] = useState(false);

  const handleFileSelected = (files: File[]) => {
    if (files.length > 0) {
      setFile(files[0]);
      setOcrResult(null);
    }
  };

  const handleStartOcr = async () => {
    if (!file) return;
    setIsProcessing(true);
    setStatusText('Initializing client-side Tesseract.js OCR engine...');

    try {
      const buffer = await file.arrayBuffer();
      const res = await runOcrOnPdf(buffer, language, (p, page, total, status) => {
        setCurrentPage(page);
        setTotalPages(total);
        setStatusText(status);
      });
      setOcrResult(res);
    } catch (err) {
      console.error('OCR Error:', err);
      alert('Failed to process PDF OCR. Please verify file is not password-protected.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCopyText = () => {
    if (!ocrResult) return;
    navigator.clipboard.writeText(ocrResult.text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadTxt = () => {
    if (!ocrResult || !file) return;
    const blob = new Blob([ocrResult.text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = file.name.replace(/\.pdf$/i, '_extracted_ocr.txt');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-4xl mx-auto py-6 px-4">
      <PrivacyBadge compact />

      {!file ? (
        <FileUploader
          onFilesSelected={handleFileSelected}
          title="Scanned PDF to Text (AI OCR)"
          subtitle="Extract copyable text from scanned PDFs & images with 100% browser native OCR."
          buttonText="Select Scanned PDF"
        />
      ) : (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
                  <FileSearch className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-base line-clamp-1">
                    {file.name}
                  </h3>
                  <p className="text-xs text-slate-500">Scanned Document for OCR</p>
                </div>
              </div>

              <button
                onClick={() => setFile(null)}
                className="text-xs text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 underline"
              >
                Change File
              </button>
            </div>

            {/* Language Selector & Controls */}
            {!ocrResult && (
              <div className="mt-6 space-y-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-1">
                      Document Language:
                    </label>
                    <div className="flex items-center gap-2">
                      <Globe className="w-4 h-4 text-slate-400" />
                      <select
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                        className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-sm font-semibold text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        {OCR_LANGUAGES.map((lang) => (
                          <option key={lang.code} value={lang.code}>
                            {lang.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <button
                    onClick={handleStartOcr}
                    disabled={isProcessing}
                    className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2 transition-transform hover:scale-105 disabled:opacity-50"
                  >
                    {isProcessing ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>Processing OCR...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4" />
                        <span>Start OCR Recognition</span>
                      </>
                    )}
                  </button>
                </div>

                {isProcessing && (
                  <div className="mt-6 p-5 rounded-2xl bg-blue-500/10 border border-blue-500/20 space-y-2 text-center">
                    <p className="text-sm font-bold text-blue-900 dark:text-blue-200">
                      {statusText}
                    </p>
                    {totalPages > 0 && (
                      <div className="w-full bg-slate-200 dark:bg-slate-700 h-2.5 rounded-full overflow-hidden max-w-md mx-auto">
                        <div
                          className="bg-blue-600 h-full transition-all duration-300"
                          style={{ width: `${(currentPage / totalPages) * 100}%` }}
                        />
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* OCR Extracted Text Output */}
            {ocrResult && (
              <div className="mt-6 space-y-4 animate-fade-in">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-slate-50 dark:bg-slate-800/80 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-700/60">
                  <div>
                    <span className="text-xs font-bold uppercase text-slate-500 block">
                      OCR Confidence Score
                    </span>
                    <span className="text-lg font-extrabold text-emerald-600 dark:text-emerald-400">
                      {ocrResult.confidence}% Accuracy
                    </span>
                  </div>

                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <button
                      onClick={handleCopyText}
                      className="flex-1 sm:flex-initial px-4 py-2 rounded-xl bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 hover:bg-slate-100 font-semibold text-xs text-slate-800 dark:text-slate-200 flex items-center justify-center gap-1.5"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copied ? 'Copied!' : 'Copy Text'}</span>
                    </button>

                    <button
                      onClick={handleDownloadTxt}
                      className="flex-1 sm:flex-initial px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 font-semibold text-xs text-white flex items-center justify-center gap-1.5 shadow-md"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download .TXT</span>
                    </button>
                  </div>
                </div>

                <div className="relative">
                  <textarea
                    value={ocrResult.text}
                    readOnly
                    rows={12}
                    className="w-full bg-slate-900 text-slate-100 p-4 rounded-2xl font-mono text-xs leading-relaxed focus:outline-none resize-y border border-slate-800"
                  />
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    onClick={() => setOcrResult(null)}
                    className="px-5 py-2.5 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold text-xs"
                  >
                    Run OCR on another language / file
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
