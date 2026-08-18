import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { mergePdfs, renderPdfPages, splitPdf } from '../../utils/pdfHelpers';
import { FileUploader } from '../FileUploader';
import { PrivacyBadge } from '../PrivacyBadge';
import { AdBanner } from '../AdBanner';
import { PdfPagePreview } from '../../types';
import { Layers, Scissors, Download, Trash2, ArrowUp, ArrowDown, RefreshCw, CheckCircle } from 'lucide-react';

interface MergeSplitToolProps {
  initialMode?: 'merge' | 'split';
}

export const MergeSplitTool: React.FC<MergeSplitToolProps> = ({ initialMode = 'merge' }) => {
  const [mode, setMode] = useState<'merge' | 'split'>(initialMode);

  // Merge state
  const [mergeFiles, setMergeFiles] = useState<File[]>([]);
  const [mergedBytes, setMergedBytes] = useState<Uint8Array | null>(null);

  // Split state
  const [splitFile, setSplitFile] = useState<File | null>(null);
  const [splitPages, setSplitPages] = useState<PdfPagePreview[]>([]);
  const [selectedPageIndices, setSelectedPageIndices] = useState<number[]>([]);
  const [splitBytes, setSplitBytes] = useState<Uint8Array | null>(null);

  const [isProcessing, setIsProcessing] = useState(false);

  // Merge Handlers
  const handleAddMergeFiles = (files: File[]) => {
    setMergeFiles((prev) => [...prev, ...files]);
    setMergedBytes(null);
  };

  const removeMergeFile = (index: number) => {
    setMergeFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const moveMergeFile = (index: number, direction: 'up' | 'down') => {
    const newFiles = [...mergeFiles];
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx >= 0 && targetIdx < newFiles.length) {
      const temp = newFiles[index];
      newFiles[index] = newFiles[targetIdx];
      newFiles[targetIdx] = temp;
      setMergeFiles(newFiles);
    }
  };

  const triggerMergeDownload = (bytes: Uint8Array) => {
    const blob = new Blob([bytes], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'merged_document.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleExecuteMerge = async () => {
    if (mergeFiles.length < 2) {
      alert('Please select at least 2 PDF files to merge.');
      return;
    }
    setIsProcessing(true);
    try {
      const buffers = await Promise.all(mergeFiles.map((f) => f.arrayBuffer()));
      const result = await mergePdfs(buffers);
      setMergedBytes(result);

      confetti({ particleCount: 70, spread: 60, origin: { y: 0.7 } });
      triggerMergeDownload(result);
    } catch (err) {
      console.error('Merge error:', err);
      alert('Failed to merge PDFs.');
    } finally {
      setIsProcessing(false);
    }
  };

  // Split Handlers
  const handleSelectSplitFile = async (files: File[]) => {
    if (files.length > 0) {
      setSplitFile(files[0]);
      setIsProcessing(true);
      try {
        const buffer = await files[0].arrayBuffer();
        const previews = await renderPdfPages(buffer, 0.8);
        setSplitPages(previews);
        setSelectedPageIndices(previews.map((p) => p.pageIndex));
        setSplitBytes(null);
      } catch (err) {
        console.error('Split load error:', err);
        alert('Could not render PDF pages for split.');
      } finally {
        setIsProcessing(false);
      }
    }
  };

  const togglePageSelection = (pageIndex: number) => {
    setSelectedPageIndices((prev) =>
      prev.includes(pageIndex) ? prev.filter((i) => i !== pageIndex) : [...prev, pageIndex]
    );
  };

  const triggerSplitDownload = (bytes: Uint8Array) => {
    if (!splitFile) return;
    const blob = new Blob([bytes], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = splitFile.name.replace(/\.pdf$/i, '_extracted.pdf');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleExecuteSplit = async () => {
    if (!splitFile || selectedPageIndices.length === 0) return;
    setIsProcessing(true);
    try {
      const buffer = await splitFile.arrayBuffer();
      const result = await splitPdf(buffer, selectedPageIndices.sort((a, b) => a - b));
      setSplitBytes(result);

      confetti({ particleCount: 70, spread: 60, origin: { y: 0.7 } });
      triggerSplitDownload(result);
    } catch (err) {
      console.error('Split error:', err);
      alert('Failed to extract PDF pages.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownloadMerged = () => {
    if (mergedBytes) {
      triggerMergeDownload(mergedBytes);
    } else {
      handleExecuteMerge();
    }
  };

  const handleDownloadSplit = () => {
    if (splitBytes) {
      triggerSplitDownload(splitBytes);
    } else {
      handleExecuteSplit();
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-6 px-4">
      <PrivacyBadge compact />

      {/* Mode Switcher */}
      <div className="flex justify-center mb-6">
        <div className="inline-flex p-1.5 rounded-2xl bg-slate-200/80 dark:bg-slate-800 border border-slate-300 dark:border-slate-700">
          <button
            onClick={() => setMode('merge')}
            className={`px-6 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 transition-all ${
              mode === 'merge'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-700 dark:text-slate-300 hover:text-slate-900'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>PDF Merger</span>
          </button>

          <button
            onClick={() => setMode('split')}
            className={`px-6 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 transition-all ${
              mode === 'split'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-700 dark:text-slate-300 hover:text-slate-900'
            }`}
          >
            <Scissors className="w-4 h-4" />
            <span>PDF Splitter</span>
          </button>
        </div>
      </div>

      {/* MERGE SECTION */}
      {mode === 'merge' && (
        <div className="space-y-6">
          {mergeFiles.length === 0 ? (
            <FileUploader
              multiple
              onFilesSelected={handleAddMergeFiles}
              title="Combine & Merge PDF Files"
              subtitle="Drag & drop multiple PDFs to combine into a single document. 100% private."
              buttonText="Select Multiple PDFs"
            />
          ) : (
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
                <h3 className="font-bold text-slate-900 dark:text-white text-base">
                  Files to Merge ({mergeFiles.length})
                </h3>
                <div className="flex items-center gap-2">
                  <label className="cursor-pointer px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-xs font-semibold text-slate-700 dark:text-slate-200">
                    + Add More PDFs
                    <input
                      type="file"
                      accept=".pdf"
                      multiple
                      onChange={(e) => e.target.files && handleAddMergeFiles(Array.from(e.target.files))}
                      className="hidden"
                    />
                  </label>
                  <button
                    onClick={() => setMergeFiles([])}
                    className="text-xs text-red-500 hover:underline"
                  >
                    Clear All
                  </button>
                </div>
              </div>

              {!mergedBytes && (
                <div className="mt-6 space-y-3">
                  {mergeFiles.map((f, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60"
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-600 font-bold text-xs flex items-center justify-center shrink-0">
                          {idx + 1}
                        </span>
                        <span className="font-semibold text-sm text-slate-900 dark:text-slate-100 line-clamp-1">
                          {f.name}
                        </span>
                      </div>

                      <div className="flex items-center gap-1">
                        <button
                          disabled={idx === 0}
                          onClick={() => moveMergeFile(idx, 'up')}
                          className="p-1.5 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 disabled:opacity-30"
                        >
                          <ArrowUp className="w-4 h-4" />
                        </button>
                        <button
                          disabled={idx === mergeFiles.length - 1}
                          onClick={() => moveMergeFile(idx, 'down')}
                          className="p-1.5 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 disabled:opacity-30"
                        >
                          <ArrowDown className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => removeMergeFile(idx)}
                          className="p-1.5 rounded-lg hover:bg-red-100 text-red-500"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}

                  <div className="pt-4 flex justify-end">
                    <button
                      onClick={handleExecuteMerge}
                      disabled={isProcessing || mergeFiles.length < 2}
                      className="px-8 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-sm shadow-lg shadow-blue-500/20 flex items-center gap-2 transition-transform hover:scale-105 disabled:opacity-50"
                    >
                      {isProcessing ? (
                        <>
                          <RefreshCw className="w-4 h-4 animate-spin" />
                          <span>Merging PDFs...</span>
                        </>
                      ) : (
                        <>
                          <Layers className="w-4 h-4" />
                          <span>Merge {mergeFiles.length} PDF Files Now</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}

              {/* Completed Banner */}
              {mergedBytes && (
                <div className="mt-6 p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-center space-y-4 animate-fade-in">
                  <div className="w-12 h-12 mx-auto rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-lg">
                    <CheckCircle className="w-6 h-6" />
                  </div>
                  <h4 className="text-xl font-extrabold text-slate-900 dark:text-white">
                    PDFs Combined Successfully!
                  </h4>
                  <div className="pt-2 flex flex-col sm:flex-row justify-center gap-3">
                    <button
                      onClick={handleDownloadMerged}
                      className="px-8 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm shadow-lg flex items-center justify-center gap-2"
                    >
                      <Download className="w-4 h-4" />
                      <span>Download Merged PDF</span>
                    </button>
                    <button
                      onClick={() => {
                        setMergedBytes(null);
                        setMergeFiles([]);
                      }}
                      className="px-5 py-3.5 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold text-sm"
                    >
                      Merge Other Files
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* SPLIT SECTION */}
      {mode === 'split' && (
        <div className="space-y-6">
          {!splitFile ? (
            <FileUploader
              onFilesSelected={handleSelectSplitFile}
              title="Split PDF & Extract Pages"
              subtitle="Select specific page ranges or extract all pages into new PDFs."
              buttonText="Select PDF to Split"
            />
          ) : (
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-base line-clamp-1">
                    {splitFile.name}
                  </h3>
                  <p className="text-xs text-slate-500">
                    Selected {selectedPageIndices.length} of {splitPages.length} pages
                  </p>
                </div>
                <button
                  onClick={() => setSplitFile(null)}
                  className="text-xs text-slate-500 hover:underline"
                >
                  Change File
                </button>
              </div>

              {!splitBytes && splitPages.length > 0 && (
                <div className="mt-6 space-y-4">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-500 uppercase">Click pages to toggle selection:</span>
                    <div className="space-x-2">
                      <button
                        onClick={() => setSelectedPageIndices(splitPages.map((p) => p.pageIndex))}
                        className="text-blue-600 hover:underline font-semibold"
                      >
                        Select All
                      </button>
                      <span>•</span>
                      <button
                        onClick={() => setSelectedPageIndices([])}
                        className="text-slate-500 hover:underline font-semibold"
                      >
                        Deselect All
                      </button>
                    </div>
                  </div>

                  {/* Thumbnail Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-h-[400px] overflow-y-auto p-2 bg-slate-50 dark:bg-slate-950 rounded-2xl border border-slate-200 dark:border-slate-800">
                    {splitPages.map((page) => {
                      const isSelected = selectedPageIndices.includes(page.pageIndex);
                      return (
                        <div
                          key={page.pageIndex}
                          onClick={() => togglePageSelection(page.pageIndex)}
                          className={`relative cursor-pointer rounded-xl overflow-hidden border-2 transition-all ${
                            isSelected
                              ? 'border-blue-600 ring-2 ring-blue-500/20 bg-blue-50'
                              : 'border-slate-200 dark:border-slate-800 opacity-50 grayscale'
                          }`}
                        >
                          <img
                            src={page.dataUrl}
                            alt={`Page ${page.pageNumber}`}
                            className="w-full h-auto object-cover"
                          />
                          <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-slate-900/80 text-white font-bold text-[10px]">
                            Page {page.pageNumber}
                          </div>
                          {isSelected && (
                            <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center">
                              ✓
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  <div className="pt-4 flex justify-end">
                    <button
                      onClick={handleExecuteSplit}
                      disabled={isProcessing || selectedPageIndices.length === 0}
                      className="px-8 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-sm shadow-lg flex items-center gap-2 disabled:opacity-50"
                    >
                      {isProcessing ? (
                        <>
                          <RefreshCw className="w-4 h-4 animate-spin" />
                          <span>Extracting Pages...</span>
                        </>
                      ) : (
                        <>
                          <Scissors className="w-4 h-4" />
                          <span>Extract {selectedPageIndices.length} Pages</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}

              {/* Completed Split Download Banner */}
              {splitBytes && (
                <div className="mt-6 p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-center space-y-4 animate-fade-in">
                  <div className="w-12 h-12 mx-auto rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-lg">
                    <CheckCircle className="w-6 h-6" />
                  </div>
                  <h4 className="text-xl font-extrabold text-slate-900 dark:text-white">
                    Pages Extracted Successfully!
                  </h4>
                  <div className="pt-2 flex flex-col sm:flex-row justify-center gap-3">
                    <button
                      onClick={handleDownloadSplit}
                      className="px-8 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm shadow-lg flex items-center justify-center gap-2"
                    >
                      <Download className="w-4 h-4" />
                      <span>Download Extracted PDF</span>
                    </button>
                    <button
                      onClick={() => {
                        setSplitBytes(null);
                        setSplitFile(null);
                      }}
                      className="px-5 py-3.5 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold text-sm"
                    >
                      Split Another File
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      <AdBanner placement="download" />
    </div>
  );
};
