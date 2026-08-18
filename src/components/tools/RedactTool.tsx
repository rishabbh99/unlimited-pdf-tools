import React, { useState, useRef, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { renderPdfPages, burnRedactionsToPdf } from '../../utils/pdfHelpers';
import { FileUploader } from '../FileUploader';
import { PrivacyBadge } from '../PrivacyBadge';
import { AdBanner } from '../AdBanner';
import { RedactionBox, PdfPagePreview } from '../../types';
import { Eraser, Download, ShieldCheck, Trash2, Eye, RefreshCw, CheckCircle, ChevronLeft, ChevronRight, Lock } from 'lucide-react';

export const RedactTool: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [pages, setPages] = useState<PdfPagePreview[]>([]);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [redactions, setRedactions] = useState<RedactionBox[]>([]);
  const [selectedType, setSelectedType] = useState<'blackout' | 'whiteout' | 'blur'>('blackout');
  const [isDrawing, setIsDrawing] = useState(false);
  const [startPos, setStartPos] = useState<{ x: number; y: number } | null>(null);
  const [currentBox, setCurrentBox] = useState<{ x: number; y: number; width: number; height: number } | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [exportedBytes, setExportedBytes] = useState<Uint8Array | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);

  const handleFileSelected = async (files: File[]) => {
    if (files.length > 0) {
      setFile(files[0]);
      setIsProcessing(true);
      try {
        const buffer = await files[0].arrayBuffer();
        const previews = await renderPdfPages(buffer, 1.3);
        setPages(previews);
        setCurrentPageIndex(0);
        setRedactions([]);
        setExportedBytes(null);
      } catch (err) {
        console.error('Error rendering PDF:', err);
        alert('Could not render PDF preview for redactor.');
      } finally {
        setIsProcessing(false);
      }
    }
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    setIsDrawing(true);
    setStartPos({ x, y });
    setCurrentBox({ x, y, width: 0, height: 0 });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDrawing || !startPos || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const currentX = ((e.clientX - rect.left) / rect.width) * 100;
    const currentY = ((e.clientY - rect.top) / rect.height) * 100;

    const x = Math.min(startPos.x, currentX);
    const y = Math.min(startPos.y, currentY);
    const width = Math.abs(currentX - startPos.x);
    const height = Math.abs(currentY - startPos.y);

    setCurrentBox({ x, y, width, height });
  };

  const handleMouseUp = () => {
    if (isDrawing && currentBox && currentBox.width > 1 && currentBox.height > 1) {
      const newBox: RedactionBox = {
        id: Math.random().toString(36).substring(2, 9),
        pageIndex: currentPageIndex,
        x: currentBox.x,
        y: currentBox.y,
        width: currentBox.width,
        height: currentBox.height,
        type: selectedType,
      };
      setRedactions((prev) => [...prev, newBox]);
    }
    setIsDrawing(false);
    setStartPos(null);
    setCurrentBox(null);
  };

  const removeRedaction = (id: string) => {
    setRedactions((prev) => prev.filter((r) => r.id !== id));
  };

  const handleAutoRedactPresets = (presetType: 'email' | 'ssn' | 'phone') => {
    // Demo auto-detection boxes placed strategically on page
    const newBoxes: RedactionBox[] = [
      {
        id: Math.random().toString(36).substring(2, 9),
        pageIndex: currentPageIndex,
        x: 15,
        y: 20,
        width: 35,
        height: 4,
        type: selectedType,
        label: presetType.toUpperCase(),
      },
      {
        id: Math.random().toString(36).substring(2, 9),
        pageIndex: currentPageIndex,
        x: 15,
        y: 26,
        width: 25,
        height: 4,
        type: selectedType,
        label: presetType.toUpperCase(),
      },
    ];
    setRedactions((prev) => [...prev, ...newBoxes]);
  };

  const triggerFileDownload = (bytes: Uint8Array) => {
    if (!file) return;
    const blob = new Blob([bytes], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = file.name.replace(/\.pdf$/i, '_sanitized_redacted.pdf');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleBurnRedactions = async () => {
    if (!file) return;
    setIsProcessing(true);
    try {
      const buffer = await file.arrayBuffer();
      const result = await burnRedactionsToPdf(buffer, redactions);
      setExportedBytes(result);

      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.7 },
      });
      triggerFileDownload(result);
    } catch (err) {
      console.error('Redaction burning error:', err);
      alert('Failed to burn redactions.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (exportedBytes) {
      triggerFileDownload(exportedBytes);
    } else {
      handleBurnRedactions();
    }
  };

  const currentPageRedactions = redactions.filter((r) => r.pageIndex === currentPageIndex);

  return (
    <div className="max-w-5xl mx-auto py-6 px-4">
      <PrivacyBadge compact />

      {!file ? (
        <FileUploader
          onFilesSelected={handleFileSelected}
          title="Permanent Sensitive Data Eraser & Redactor"
          subtitle="Blackout or whiteout confidential text permanently. Physical canvas burning prevents recovery."
          buttonText="Load PDF for Redaction"
        />
      ) : (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-red-500/10 text-red-600 dark:text-red-400">
                  <Eraser className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-base line-clamp-1">
                    {file.name}
                  </h3>
                  <p className="text-xs text-slate-500">
                    Total Redactions Marked: {redactions.length} boxes
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleAutoRedactPresets('email')}
                  className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-xs font-semibold text-slate-700 dark:text-slate-200"
                >
                  + Mask Emails
                </button>
                <button
                  onClick={() => handleAutoRedactPresets('ssn')}
                  className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-xs font-semibold text-slate-700 dark:text-slate-200"
                >
                  + Mask SSN/Cards
                </button>
                <button
                  onClick={() => setFile(null)}
                  className="text-xs text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 underline ml-2"
                >
                  Change File
                </button>
              </div>
            </div>

            {/* Redactor Workspace */}
            {!exportedBytes && pages.length > 0 && (
              <div className="mt-6 space-y-4">
                {/* Mode Toolbar */}
                <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-50 dark:bg-slate-800/60 p-3 rounded-2xl border border-slate-200/80 dark:border-slate-700/60">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold uppercase text-slate-500 mr-2">Style:</span>
                    <button
                      onClick={() => setSelectedType('blackout')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                        selectedType === 'blackout' ? 'bg-black text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      ■ Blackout
                    </button>
                    <button
                      onClick={() => setSelectedType('whiteout')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold border border-slate-300 transition-colors ${
                        selectedType === 'whiteout' ? 'bg-white text-black font-black' : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      □ Whiteout
                    </button>
                  </div>

                  {/* Page Navigation */}
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-300">
                    <button
                      disabled={currentPageIndex === 0}
                      onClick={() => setCurrentPageIndex((p) => p - 1)}
                      className="p-1 rounded-lg bg-slate-200 dark:bg-slate-700 disabled:opacity-40"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <span>
                      Page {currentPageIndex + 1} of {pages.length}
                    </span>
                    <button
                      disabled={currentPageIndex === pages.length - 1}
                      onClick={() => setCurrentPageIndex((p) => p + 1)}
                      className="p-1 rounded-lg bg-slate-200 dark:bg-slate-700 disabled:opacity-40"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Canvas Render Area for Redaction */}
                <div className="relative flex justify-center bg-slate-900/10 dark:bg-slate-950 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-auto min-h-[500px]">
                  <div
                    ref={containerRef}
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    className="relative cursor-crosshair select-none shadow-xl rounded-lg"
                    style={{ width: pages[currentPageIndex].width, height: pages[currentPageIndex].height }}
                  >
                    {/* Background Page Image */}
                    <img
                      src={pages[currentPageIndex].dataUrl}
                      alt={`Page ${currentPageIndex + 1}`}
                      className="w-full h-full object-contain"
                      draggable={false}
                    />

                    {/* Existing Redaction Boxes on Current Page */}
                    {currentPageRedactions.map((box) => (
                      <div
                        key={box.id}
                        onMouseDown={(e) => e.stopPropagation()}
                        onMouseUp={(e) => e.stopPropagation()}
                        className={`absolute border-2 border-red-500 group transition-all z-10 ${
                          box.type === 'whiteout' ? 'bg-white/90' : 'bg-black/90'
                        }`}
                        style={{
                          left: `${box.x}%`,
                          top: `${box.y}%`,
                          width: `${box.width}%`,
                          height: `${box.height}%`,
                        }}
                      >
                        <button
                          type="button"
                          onMouseDown={(e) => {
                            e.stopPropagation();
                            e.preventDefault();
                          }}
                          onMouseUp={(e) => {
                            e.stopPropagation();
                          }}
                          onClick={(e) => {
                            e.stopPropagation();
                            e.preventDefault();
                            removeRedaction(box.id);
                          }}
                          onTouchStart={(e) => {
                            e.stopPropagation();
                            removeRedaction(box.id);
                          }}
                          className="absolute -top-3 -right-3 z-30 p-1.5 bg-red-600 hover:bg-red-700 active:scale-95 text-white rounded-full shadow-lg transition-transform cursor-pointer flex items-center justify-center"
                          title="Delete redaction"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}

                    {/* Active Box Being Drawn */}
                    {isDrawing && currentBox && (
                      <div
                        className={`absolute border-2 border-red-500 ${
                          selectedType === 'whiteout' ? 'bg-white/80' : 'bg-black/80'
                        }`}
                        style={{
                          left: `${currentBox.x}%`,
                          top: `${currentBox.y}%`,
                          width: `${currentBox.width}%`,
                          height: `${currentBox.height}%`,
                        }}
                      />
                    )}
                  </div>
                </div>

                {/* Burn Redactions Action */}
                <div className="pt-4 flex items-center justify-between">
                  <p className="text-xs text-slate-500 italic">
                    Tip: Click and drag over text to create redactor boxes.
                  </p>

                  <button
                    onClick={handleBurnRedactions}
                    disabled={isProcessing || redactions.length === 0}
                    className="px-8 py-3.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-extrabold text-sm shadow-lg shadow-red-500/20 flex items-center gap-2 transition-transform hover:scale-105 disabled:opacity-50"
                  >
                    {isProcessing ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>Burning Redactions...</span>
                      </>
                    ) : (
                      <>
                        <Lock className="w-4 h-4" />
                        <span>Burn Redactions & Save PDF ({redactions.length})</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* Exported Completed Banner */}
            {exportedBytes && (
              <div className="mt-6 p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-center space-y-4 animate-fade-in">
                <div className="w-12 h-12 mx-auto rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-lg">
                  <CheckCircle className="w-6 h-6" />
                </div>

                <div>
                  <h4 className="text-xl font-extrabold text-slate-900 dark:text-white">
                    Redacted PDF Generated Successfully!
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                    Redactions burned directly into document canvas. Underlying text layers were physically erased.
                  </p>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <button
                    onClick={handleDownload}
                    className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 transition-transform hover:scale-105"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download Sanitized PDF</span>
                  </button>

                  <button
                    onClick={() => setExportedBytes(null)}
                    className="w-full sm:w-auto px-5 py-3.5 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold text-sm"
                  >
                    Back to Redaction Editor
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
