import React, { useState, useRef, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { renderPdfPages, burnSignaturesAndFields } from '../../utils/pdfHelpers';
import { FileUploader } from '../FileUploader';
import { PrivacyBadge } from '../PrivacyBadge';
import { AdBanner } from '../AdBanner';
import { SignatureField, PdfPagePreview } from '../../types';
import {
  FilePenLine,
  Download,
  CheckCircle,
  Trash2,
  Plus,
  Calendar,
  CheckSquare,
  Stamp,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  Move,
  Maximize2,
  Minimize2,
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  MousePointerClick,
  Sliders,
} from 'lucide-react';

export const SignFillTool: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [pages, setPages] = useState<PdfPagePreview[]>([]);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [fields, setFields] = useState<SignatureField[]>([]);
  const [selectedFieldId, setSelectedFieldId] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [exportedBytes, setExportedBytes] = useState<Uint8Array | null>(null);

  // Dragging state ref for smooth window-level pointer tracking
  const draggingRef = useRef<{
    id: string;
    startX: number;
    startY: number;
    fieldX: number;
    fieldY: number;
    containerWidth: number;
    containerHeight: number;
  } | null>(null);

  const [activeDragId, setActiveDragId] = useState<string | null>(null);

  // Signature Pad State
  const [signatureModalOpen, setSignatureModalOpen] = useState(false);
  const [signatureMode, setSignatureMode] = useState<'draw' | 'type'>('draw');
  const [typedName, setTypedName] = useState('');
  const [isDrawingSig, setIsDrawingSig] = useState(false);
  const sigCanvasRef = useRef<HTMLCanvasElement>(null);

  const containerRef = useRef<HTMLDivElement>(null);

  // Global window listeners for smooth dragging on Desktop and Mobile
  useEffect(() => {
    const handleMove = (clientX: number, clientY: number) => {
      if (!draggingRef.current) return;

      const { id, startX, startY, fieldX, fieldY, containerWidth, containerHeight } = draggingRef.current;
      const deltaX = clientX - startX;
      const deltaY = clientY - startY;

      const deltaXPercent = (deltaX / containerWidth) * 100;
      const deltaYPercent = (deltaY / containerHeight) * 100;

      const newX = Math.max(0, Math.min(92, fieldX + deltaXPercent));
      const newY = Math.max(0, Math.min(92, fieldY + deltaYPercent));

      setFields((prev) =>
        prev.map((f) => (f.id === id ? { ...f, x: Number(newX.toFixed(2)), y: Number(newY.toFixed(2)) } : f))
      );
    };

    const handlePointerMoveWindow = (e: PointerEvent) => {
      if (draggingRef.current) {
        handleMove(e.clientX, e.clientY);
      }
    };

    const handleTouchMoveWindow = (e: TouchEvent) => {
      if (draggingRef.current && e.touches.length > 0) {
        e.preventDefault(); // Stop screen scrolling while dragging elements
        handleMove(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    const handlePointerUpWindow = () => {
      if (draggingRef.current) {
        draggingRef.current = null;
        setActiveDragId(null);
      }
    };

    window.addEventListener('pointermove', handlePointerMoveWindow);
    window.addEventListener('pointerup', handlePointerUpWindow);
    window.addEventListener('touchmove', handleTouchMoveWindow, { passive: false });
    window.addEventListener('touchend', handlePointerUpWindow);

    return () => {
      window.removeEventListener('pointermove', handlePointerMoveWindow);
      window.removeEventListener('pointerup', handlePointerUpWindow);
      window.removeEventListener('touchmove', handleTouchMoveWindow);
      window.removeEventListener('touchend', handlePointerUpWindow);
    };
  }, []);

  const handleStartDrag = (id: string, clientX: number, clientY: number, e?: React.SyntheticEvent) => {
    if (e) {
      const target = e.target as HTMLElement;
      if (target.closest('button, input, textarea')) return;
      e.stopPropagation();
    }

    const field = fields.find((f) => f.id === id);
    if (!field || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;

    setSelectedFieldId(id);
    setActiveDragId(id);

    draggingRef.current = {
      id,
      startX: clientX,
      startY: clientY,
      fieldX: field.x,
      fieldY: field.y,
      containerWidth: rect.width,
      containerHeight: rect.height,
    };
  };

  const handleFileSelected = async (files: File[]) => {
    if (files.length > 0) {
      setFile(files[0]);
      setIsProcessing(true);
      try {
        const buffer = await files[0].arrayBuffer();
        const previews = await renderPdfPages(buffer, 1.3);
        setPages(previews);
        setCurrentPageIndex(0);
        setFields([]);
        setSelectedFieldId(null);
        setExportedBytes(null);
      } catch (err) {
        console.error('Error rendering PDF:', err);
        alert('Could not render PDF preview for form filler.');
      } finally {
        setIsProcessing(false);
      }
    }
  };

  const addField = (type: 'text' | 'checkmark' | 'date' | 'stamp', defaultContent?: string) => {
    const today = new Date().toISOString().split('T')[0];
    const newId = Math.random().toString(36).substring(2, 9);
    const newField: SignatureField = {
      id: newId,
      pageIndex: currentPageIndex,
      x: 35,
      y: 35,
      width: type === 'stamp' ? 25 : 20,
      height: type === 'stamp' ? 8 : 5,
      type,
      content: defaultContent || (type === 'date' ? today : type === 'text' ? 'Sample Text' : '✓'),
      fontSize: 16,
    };
    setFields((prev) => [...prev, newField]);
    setSelectedFieldId(newId);
  };

  const nudgeField = (id: string, dxPercent: number, dyPercent: number) => {
    setFields((prev) =>
      prev.map((f) => {
        if (f.id !== id) return f;
        const newX = Math.max(0, Math.min(92, f.x + dxPercent));
        const newY = Math.max(0, Math.min(92, f.y + dyPercent));
        return { ...f, x: Number(newX.toFixed(2)), y: Number(newY.toFixed(2)) };
      })
    );
  };

  const resizeField = (id: string, factor: number) => {
    setFields((prev) =>
      prev.map((f) => {
        if (f.id !== id) return f;
        const newW = Math.max(5, Math.min(80, f.width * factor));
        const newH = Math.max(3, Math.min(80, f.height * factor));
        return { ...f, width: Number(newW.toFixed(2)), height: Number(newH.toFixed(2)) };
      })
    );
  };

  // Click on PDF Canvas to instantly jump selected field to click spot
  const handleCanvasClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!selectedFieldId || !containerRef.current) return;
    const target = e.target as HTMLElement;
    if (target.closest('.field-element')) return; // Ignore clicks directly on field elements

    const rect = containerRef.current.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;

    const clickXPercent = ((e.clientX - rect.left) / rect.width) * 100 - 5;
    const clickYPercent = ((e.clientY - rect.top) / rect.height) * 100 - 3;

    const newX = Math.max(0, Math.min(92, clickXPercent));
    const newY = Math.max(0, Math.min(92, clickYPercent));

    setFields((prev) =>
      prev.map((f) => (f.id === selectedFieldId ? { ...f, x: Number(newX.toFixed(2)), y: Number(newY.toFixed(2)) } : f))
    );
  };

  // Signature Pad drawing logic (supports Mouse & Touch)
  const getCanvasCoords = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = sigCanvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    let clientX = 0;
    let clientY = 0;

    if ('touches' in e && e.touches.length > 0) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else if ('clientX' in e) {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    return {
      x: clientX - rect.left,
      y: clientY - rect.top,
    };
  };

  const startSigDraw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = sigCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const { x, y } = getCanvasCoords(e);
    ctx.beginPath();
    ctx.moveTo(x, y);
    setIsDrawingSig(true);
  };

  const drawSig = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawingSig) return;
    const canvas = sigCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const { x, y } = getCanvasCoords(e);
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#0f172a';
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const clearSigCanvas = () => {
    const canvas = sigCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  const handleSaveSignature = () => {
    let sigDataUrl = '';
    if (signatureMode === 'draw') {
      const canvas = sigCanvasRef.current;
      if (!canvas) return;
      sigDataUrl = canvas.toDataURL('image/png');
    } else {
      const canvas = document.createElement('canvas');
      canvas.width = 400;
      canvas.height = 120;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.font = 'italic 36px "Dancing Script", cursive, Georgia';
        ctx.fillStyle = '#0f172a';
        ctx.fillText(typedName || 'Your Signature', 30, 70);
        sigDataUrl = canvas.toDataURL('image/png');
      }
    }

    if (sigDataUrl) {
      const newId = Math.random().toString(36).substring(2, 9);
      // Default auto-position to Bottom-Right (Standard document signature spot)
      const newField: SignatureField = {
        id: newId,
        pageIndex: currentPageIndex,
        x: 60,
        y: 78,
        width: 32,
        height: 14,
        type: 'signature',
        content: sigDataUrl,
      };
      setFields((prev) => [...prev, newField]);
      setSelectedFieldId(newId);
      setSignatureModalOpen(false);
    }
  };

  const setPresetPosition = (id: string, preset: 'bottom-right' | 'bottom-left' | 'bottom-center' | 'center' | 'top-right') => {
    let targetX = 35;
    let targetY = 45;

    if (preset === 'bottom-right') {
      targetX = 62;
      targetY = 78;
    } else if (preset === 'bottom-left') {
      targetX = 10;
      targetY = 78;
    } else if (preset === 'bottom-center') {
      targetX = 35;
      targetY = 78;
    } else if (preset === 'top-right') {
      targetX = 62;
      targetY = 10;
    }

    setFields((prev) =>
      prev.map((f) => (f.id === id ? { ...f, x: targetX, y: targetY } : f))
    );
  };

  const removeField = (id: string) => {
    setFields((prev) => prev.filter((f) => f.id !== id));
    if (selectedFieldId === id) setSelectedFieldId(null);
  };

  const triggerFileDownload = (bytes: Uint8Array) => {
    if (!file) return;
    const blob = new Blob([bytes], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = file.name.replace(/\.pdf$/i, '_signed.pdf');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleBurnAndSave = async () => {
    if (!file) return;
    setIsProcessing(true);
    try {
      const buffer = await file.arrayBuffer();
      const result = await burnSignaturesAndFields(buffer, fields);
      setExportedBytes(result);

      confetti({ particleCount: 70, spread: 60, origin: { y: 0.7 } });
      triggerFileDownload(result);
    } catch (err) {
      console.error('Signing error:', err);
      alert('Failed to sign and burn fields to PDF. Please ensure file is valid.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (exportedBytes) {
      triggerFileDownload(exportedBytes);
    } else {
      handleBurnAndSave();
    }
  };

  const currentPageFields = fields.filter((f) => f.pageIndex === currentPageIndex);
  const selectedField = fields.find((f) => f.id === selectedFieldId);

  return (
    <div className="max-w-5xl mx-auto py-6 px-4">
      <PrivacyBadge compact />

      {!file ? (
        <FileUploader
          onFilesSelected={handleFileSelected}
          title="PDF Form Filler & Digital Signer"
          subtitle="Add hand-drawn signatures, custom text, date stamps, and checkmarks to PDF forms."
          buttonText="Load PDF Form"
        />
      ) : (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-blue-500/10 text-blue-600 dark:text-blue-400">
                  <FilePenLine className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-base line-clamp-1">
                    {file.name}
                  </h3>
                  <p className="text-xs text-slate-500">
                    Fields Placed: {fields.length} elements
                  </p>
                </div>
              </div>

              <button
                onClick={() => setFile(null)}
                className="text-xs text-slate-500 hover:underline"
              >
                Change File
              </button>
            </div>

            {/* Field Toolbar */}
            {!exportedBytes && pages.length > 0 && (
              <div className="mt-6 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-50 dark:bg-slate-800/60 p-3 rounded-2xl border border-slate-200 dark:border-slate-700">
                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      onClick={() => setSignatureModalOpen(true)}
                      className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md flex items-center gap-1.5"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add E-Signature</span>
                    </button>

                    <button
                      onClick={() => addField('text')}
                      className="px-3 py-2 rounded-xl bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-xs font-semibold text-slate-800 dark:text-slate-200 hover:bg-slate-100"
                    >
                      + Text Box
                    </button>

                    <button
                      onClick={() => addField('date')}
                      className="px-3 py-2 rounded-xl bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-xs font-semibold text-slate-800 dark:text-slate-200 hover:bg-slate-100 flex items-center gap-1"
                    >
                      <Calendar className="w-3.5 h-3.5" />
                      <span>Date Stamp</span>
                    </button>

                    <button
                      onClick={() => addField('checkmark')}
                      className="px-3 py-2 rounded-xl bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-xs font-semibold text-slate-800 dark:text-slate-200 hover:bg-slate-100 flex items-center gap-1"
                    >
                      <CheckSquare className="w-3.5 h-3.5 text-emerald-500" />
                      <span>Checkmark</span>
                    </button>

                    <button
                      onClick={() => addField('stamp', 'APPROVED')}
                      className="px-3 py-2 rounded-xl bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-xs font-semibold text-red-600 dark:text-red-400 hover:bg-slate-100 flex items-center gap-1"
                    >
                      <Stamp className="w-3.5 h-3.5" />
                      <span>APPROVED Stamp</span>
                    </button>
                  </div>

                  {/* Page Controls */}
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

                {/* Helper Banner & Selected Item Precision Controls */}
                <div className="bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/50 p-3.5 rounded-2xl text-xs space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2 text-blue-900 dark:text-blue-300">
                      <Move className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
                      <span>
                        <strong>3 Ways to Move Signature/Fields:</strong> 1) Drag on page, 2) Click Quick Position buttons below, 3) Click anywhere on PDF!
                      </span>
                    </div>

                    {selectedField && (
                      <div className="flex flex-wrap items-center gap-2 bg-white dark:bg-slate-800 p-1.5 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
                        <span className="text-[11px] font-extrabold text-blue-600 dark:text-blue-400 uppercase tracking-wide">
                          Selected {selectedField.type}:
                        </span>

                        {/* Direct Nudge Pad */}
                        <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-700/50 p-1 rounded-lg">
                          <button
                            onClick={() => nudgeField(selectedField.id, 0, -3)}
                            className="p-1 hover:bg-white dark:hover:bg-slate-600 rounded text-slate-700 dark:text-slate-200"
                            title="Move Up"
                          >
                            <ArrowUp className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => nudgeField(selectedField.id, 0, 3)}
                            className="p-1 hover:bg-white dark:hover:bg-slate-600 rounded text-slate-700 dark:text-slate-200"
                            title="Move Down"
                          >
                            <ArrowDown className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => nudgeField(selectedField.id, -3, 0)}
                            className="p-1 hover:bg-white dark:hover:bg-slate-600 rounded text-slate-700 dark:text-slate-200"
                            title="Move Left"
                          >
                            <ArrowLeft className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => nudgeField(selectedField.id, 3, 0)}
                            className="p-1 hover:bg-white dark:hover:bg-slate-600 rounded text-slate-700 dark:text-slate-200"
                            title="Move Right"
                          >
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <div className="h-4 w-px bg-slate-200 dark:bg-slate-700" />

                        {/* Resize Controls */}
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => resizeField(selectedField.id, 1.25)}
                            className="p-1 bg-blue-50 dark:bg-blue-900/40 hover:bg-blue-100 dark:hover:bg-blue-900/70 text-blue-700 dark:text-blue-300 rounded font-bold text-xs flex items-center gap-1"
                            title="Make Bigger"
                          >
                            <Maximize2 className="w-3 h-3" />
                            <span>Larger</span>
                          </button>
                          <button
                            onClick={() => resizeField(selectedField.id, 0.8)}
                            className="p-1 bg-blue-50 dark:bg-blue-900/40 hover:bg-blue-100 dark:hover:bg-blue-900/70 text-blue-700 dark:text-blue-300 rounded font-bold text-xs flex items-center gap-1"
                            title="Make Smaller"
                          >
                            <Minimize2 className="w-3 h-3" />
                            <span>Smaller</span>
                          </button>
                        </div>

                        <div className="h-4 w-px bg-slate-200 dark:bg-slate-700" />

                        <button
                          onClick={() => removeField(selectedField.id)}
                          className="p-1.5 bg-red-100 dark:bg-red-950/50 hover:bg-red-200 text-red-600 dark:text-red-400 rounded-lg font-bold text-xs flex items-center gap-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Delete</span>
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Preset Position Buttons (Bottom Right, Bottom Center, Bottom Left, Center Page) */}
                  {selectedField && (
                    <div className="pt-2 border-t border-blue-200/60 dark:border-blue-900/40 flex flex-wrap items-center gap-2">
                      <span className="text-[11px] font-bold text-blue-900 dark:text-blue-300 uppercase">
                        Quick Move Presets:
                      </span>
                      <button
                        onClick={() => setPresetPosition(selectedField.id, 'bottom-right')}
                        className="px-2.5 py-1 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-lg shadow-sm flex items-center gap-1"
                      >
                        📍 Bottom Right (End of Document)
                      </button>
                      <button
                        onClick={() => setPresetPosition(selectedField.id, 'bottom-center')}
                        className="px-2.5 py-1 bg-white dark:bg-slate-800 hover:bg-slate-100 text-slate-800 dark:text-slate-200 font-bold text-xs rounded-lg border border-slate-200 dark:border-slate-700"
                      >
                        📍 Bottom Center
                      </button>
                      <button
                        onClick={() => setPresetPosition(selectedField.id, 'bottom-left')}
                        className="px-2.5 py-1 bg-white dark:bg-slate-800 hover:bg-slate-100 text-slate-800 dark:text-slate-200 font-bold text-xs rounded-lg border border-slate-200 dark:border-slate-700"
                      >
                        📍 Bottom Left
                      </button>
                      <button
                        onClick={() => setPresetPosition(selectedField.id, 'center')}
                        className="px-2.5 py-1 bg-white dark:bg-slate-800 hover:bg-slate-100 text-slate-800 dark:text-slate-200 font-bold text-xs rounded-lg border border-slate-200 dark:border-slate-700"
                      >
                        📍 Center Page
                      </button>
                    </div>
                  )}

                  {/* Position Sliders when element selected */}
                  {selectedField && (
                    <div className="pt-2 border-t border-blue-200/60 dark:border-blue-900/40 flex flex-wrap items-center gap-4 text-xs font-medium text-slate-700 dark:text-slate-300">
                      <div className="flex items-center gap-2">
                        <Sliders className="w-3.5 h-3.5 text-blue-600" />
                        <span>X Position:</span>
                        <input
                          type="range"
                          min="0"
                          max="90"
                          step="1"
                          value={Math.round(selectedField.x)}
                          onChange={(e) =>
                            setFields((prev) =>
                              prev.map((f) =>
                                f.id === selectedField.id ? { ...f, x: parseInt(e.target.value, 10) } : f
                              )
                            )
                          }
                          className="w-24 accent-blue-600 cursor-pointer"
                        />
                        <span className="font-mono text-[11px] w-8">{Math.round(selectedField.x)}%</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <span>Y Position:</span>
                        <input
                          type="range"
                          min="0"
                          max="90"
                          step="1"
                          value={Math.round(selectedField.y)}
                          onChange={(e) =>
                            setFields((prev) =>
                              prev.map((f) =>
                                f.id === selectedField.id ? { ...f, y: parseInt(e.target.value, 10) } : f
                              )
                            )
                          }
                          className="w-24 accent-blue-600 cursor-pointer"
                        />
                        <span className="font-mono text-[11px] w-8">{Math.round(selectedField.y)}%</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Form Viewer Canvas */}
                <div className="relative flex justify-center bg-slate-900/10 dark:bg-slate-950 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-auto min-h-[500px]">
                  <div
                    ref={containerRef}
                    onClick={handleCanvasClick}
                    className="relative shadow-xl rounded-lg overflow-hidden bg-white select-none touch-none cursor-crosshair"
                    style={{ width: pages[currentPageIndex].width, height: pages[currentPageIndex].height }}
                  >
                    <img
                      src={pages[currentPageIndex].dataUrl}
                      alt={`Page ${currentPageIndex + 1}`}
                      className="w-full h-full object-contain pointer-events-none"
                      draggable={false}
                    />

                    {/* Placed Fields Overlay */}
                    {currentPageFields.map((f) => {
                      const isSelected = selectedFieldId === f.id;
                      const isDragging = activeDragId === f.id;

                      return (
                        <div
                          key={f.id}
                          onPointerDown={(e) => handleStartDrag(f.id, e.clientX, e.clientY, e)}
                          onTouchStart={(e) => {
                            if (e.touches.length > 0) {
                              handleStartDrag(f.id, e.touches[0].clientX, e.touches[0].clientY, e);
                            }
                          }}
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedFieldId(f.id);
                          }}
                          className={`field-element absolute group p-2 rounded-xl border-2 transition-transform cursor-grab active:cursor-grabbing select-none ${
                            isSelected
                              ? 'border-blue-600 bg-blue-500/20 shadow-2xl ring-4 ring-blue-500/30 z-30'
                              : 'border-blue-400/80 bg-blue-500/10 hover:border-blue-500 z-10'
                          } ${isDragging ? 'opacity-90 scale-105 z-40' : ''}`}
                          style={{
                            left: `${f.x}%`,
                            top: `${f.y}%`,
                            touchAction: 'none',
                          }}
                        >
                          <div className="flex items-center gap-2 pointer-events-none">
                            {/* Prominent Drag Handle */}
                            <div className="p-1 rounded bg-blue-600 text-white shadow-sm flex items-center justify-center shrink-0">
                              <Move className="w-3.5 h-3.5" />
                            </div>

                            {f.type === 'signature' ? (
                              <img
                                src={f.content}
                                alt="Signature"
                                className="object-contain pointer-events-none"
                                style={{
                                  height: `${Math.max(28, f.height * 4.5)}px`,
                                  maxWidth: `${Math.max(70, f.width * 8.5)}px`,
                                }}
                              />
                            ) : f.type === 'text' || f.type === 'date' ? (
                              <input
                                type="text"
                                value={f.content}
                                onChange={(e) => {
                                  const val = e.target.value;
                                  setFields((prev) =>
                                    prev.map((item) => (item.id === f.id ? { ...item, content: val } : item))
                                  );
                                }}
                                className="bg-transparent font-bold text-slate-900 focus:outline-none text-sm min-w-[90px] pointer-events-auto"
                              />
                            ) : f.type === 'checkmark' ? (
                              <span className="text-emerald-600 font-extrabold text-2xl select-none">✓</span>
                            ) : (
                              <span className="px-2 py-0.5 border-2 border-red-600 text-red-600 font-black text-xs uppercase bg-red-50 select-none rounded">
                                {f.content}
                              </span>
                            )}
                          </div>

                          {/* Quick Delete & Selection Ring Indicator */}
                          <button
                            type="button"
                            onMouseDown={(e) => {
                              e.stopPropagation();
                              e.preventDefault();
                            }}
                            onClick={(e) => {
                              e.stopPropagation();
                              e.preventDefault();
                              removeField(f.id);
                            }}
                            className="absolute -top-3 -right-3 z-30 p-1.5 bg-red-600 hover:bg-red-700 active:scale-95 text-white rounded-full shadow-lg transition-transform cursor-pointer flex items-center justify-center"
                            title="Delete element"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="pt-4 flex justify-end">
                  <button
                    onClick={handleBurnAndSave}
                    disabled={isProcessing || fields.length === 0}
                    className="px-8 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-sm shadow-lg flex items-center gap-2 disabled:opacity-50"
                  >
                    {isProcessing ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>Applying Signatures...</span>
                      </>
                    ) : (
                      <>
                        <Download className="w-4 h-4" />
                        <span>Sign & Export PDF ({fields.length})</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* Completed Signed PDF Banner */}
            {exportedBytes && (
              <div className="mt-6 p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-center space-y-4 animate-fade-in">
                <div className="w-12 h-12 mx-auto rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-lg">
                  <CheckCircle className="w-6 h-6" />
                </div>
                <h4 className="text-xl font-extrabold text-slate-900 dark:text-white">
                  Document Signed & Saved Successfully!
                </h4>
                <div className="pt-2 flex flex-col sm:flex-row justify-center gap-3">
                  <button
                    onClick={handleDownload}
                    className="px-8 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm shadow-lg flex items-center justify-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download Signed PDF</span>
                  </button>
                  <button
                    onClick={() => setExportedBytes(null)}
                    className="px-5 py-3.5 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold text-sm"
                  >
                    Back to Form Editor
                  </button>
                </div>
              </div>
            )}
          </div>

          <AdBanner placement="download" />
        </div>
      )}

      {/* Signature Creator Modal */}
      {signatureModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 w-full max-w-lg shadow-2xl space-y-4">
            <h3 className="font-extrabold text-slate-900 dark:text-white text-lg">
              Create Your Digital Signature
            </h3>

            <div className="flex gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
              <button
                onClick={() => setSignatureMode('draw')}
                className={`px-4 py-1.5 rounded-xl font-bold text-xs ${
                  signatureMode === 'draw' ? 'bg-blue-600 text-white' : 'text-slate-500'
                }`}
              >
                Draw Signature
              </button>
              <button
                onClick={() => setSignatureMode('type')}
                className={`px-4 py-1.5 rounded-xl font-bold text-xs ${
                  signatureMode === 'type' ? 'bg-blue-600 text-white' : 'text-slate-500'
                }`}
              >
                Type Signature
              </button>
            </div>

            {signatureMode === 'draw' ? (
              <div>
                <canvas
                  ref={sigCanvasRef}
                  width={400}
                  height={150}
                  onMouseDown={startSigDraw}
                  onMouseMove={drawSig}
                  onMouseUp={() => setIsDrawingSig(false)}
                  onTouchStart={startSigDraw}
                  onTouchMove={drawSig}
                  onTouchEnd={() => setIsDrawingSig(false)}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl cursor-crosshair touch-none"
                />
                <button
                  onClick={clearSigCanvas}
                  className="text-xs text-slate-500 hover:underline mt-1"
                >
                  Clear Pad
                </button>
              </div>
            ) : (
              <div>
                <input
                  type="text"
                  value={typedName}
                  onChange={(e) => setTypedName(e.target.value)}
                  placeholder="Type full legal name..."
                  className="w-full p-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-base font-semibold focus:outline-none"
                />
              </div>
            )}

            <div className="flex justify-end gap-2 pt-3">
              <button
                onClick={() => setSignatureModalOpen(false)}
                className="px-4 py-2 rounded-xl text-slate-500 font-semibold text-xs"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveSignature}
                className="px-6 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md"
              >
                Insert Signature
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

