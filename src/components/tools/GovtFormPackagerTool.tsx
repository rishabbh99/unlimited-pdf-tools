import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { 
  FORM_PACKAGER_PRESETS, 
  processImageSlot, 
  createCombinedExamPdf, 
  createExamZipPackage,
  PackagedPdfSlotInput 
} from '../../utils/formPackagerHelpers';
import { 
  FormPackagerPreset, 
  FormSlotConfig, 
  SlotFileState, 
  ExamPresetId 
} from '../../types';
import { 
  FileCheck2, 
  Upload, 
  Trash2, 
  Download, 
  Share2, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  Sliders, 
  Eye, 
  FolderArchive, 
  SunMedium, 
  Contrast, 
  Wand2, 
  RotateCw, 
  Plus, 
  FileText, 
  Image as ImageIcon,
  ShieldCheck,
  Check,
  Copy
} from 'lucide-react';

export const GovtFormPackagerTool: React.FC = () => {
  const [selectedPresetId, setSelectedPresetId] = useState<ExamPresetId>('upsc-ssc');
  const [preset, setPreset] = useState<FormPackagerPreset>(FORM_PACKAGER_PRESETS[0]);
  const [customMaxPdfKb, setCustomMaxPdfKb] = useState<number>(200);

  // Slot States keyed by slot.id
  const [slotStates, setSlotStates] = useState<Record<string, SlotFileState>>({});
  
  // Active editing slot for tuning brightness/contrast/crop
  const [activeTuningSlotId, setActiveTuningSlotId] = useState<string | null>(null);

  // Packaging & Export State
  const [isPackaging, setIsPackaging] = useState<boolean>(false);
  const [combinedPdfBlob, setCombinedPdfBlob] = useState<Blob | null>(null);
  const [combinedPdfUrl, setCombinedPdfUrl] = useState<string | null>(null);
  const [combinedPdfSize, setCombinedPdfSize] = useState<number>(0);
  const [applicantName, setApplicantName] = useState<string>('');
  const [copiedLink, setCopiedLink] = useState<boolean>(false);
  const [previewPdfOpen, setPreviewPdfOpen] = useState<boolean>(false);

  // Sync preset changes
  useEffect(() => {
    const found = FORM_PACKAGER_PRESETS.find((p) => p.id === selectedPresetId) || FORM_PACKAGER_PRESETS[0];
    setPreset(found);
    setCustomMaxPdfKb(found.maxCombinedPdfKb);
    
    // Initialize slot states if not present
    setSlotStates((prev) => {
      const next = { ...prev };
      found.slots.forEach((s) => {
        if (!next[s.id]) {
          next[s.id] = {
            file: null,
            previewUrl: null,
            originalSize: 0,
            processedBlob: null,
            processedSize: 0,
            status: 'idle',
            brightness: 0,
            contrast: 0,
            enhanceClarity: true,
          };
        }
      });
      return next;
    });

    // Reset generated combined PDF when preset changes
    setCombinedPdfBlob(null);
    setCombinedPdfUrl(null);
    setCombinedPdfSize(0);
  }, [selectedPresetId]);

  // Handle file selection and auto-processing for a slot
  const handleFileForSlot = async (slot: FormSlotConfig, file: File) => {
    setSlotStates((prev) => ({
      ...prev,
      [slot.id]: {
        ...(prev[slot.id] || {
          brightness: 0,
          contrast: 0,
          enhanceClarity: true,
        }),
        file,
        originalSize: file.size,
        status: 'processing',
        errorMessage: undefined,
      },
    }));

    try {
      const isSignature = slot.type === 'signature';
      const result = await processImageSlot(file, {
        maxKb: slot.maxKb,
        minKb: slot.minKb,
        aspectRatio: slot.aspectRatio,
        brightness: 0,
        contrast: isSignature ? 15 : 0,
        enhanceClarity: true,
        isSignature,
      });

      setSlotStates((prev) => ({
        ...prev,
        [slot.id]: {
          ...prev[slot.id],
          previewUrl: result.dataUrl,
          processedBlob: result.blob,
          processedSize: result.size,
          status: 'ready',
        },
      }));
    } catch (err: any) {
      setSlotStates((prev) => ({
        ...prev,
        [slot.id]: {
          ...prev[slot.id],
          status: 'error',
          errorMessage: err?.message || 'Failed to process image',
        },
      }));
    }
  };

  // Re-process slot when tuning filters change
  const reprocessSlotWithSettings = async (slot: FormSlotConfig, updates: Partial<SlotFileState>) => {
    const currentState = slotStates[slot.id];
    if (!currentState || !currentState.file) return;

    const merged = { ...currentState, ...updates };

    setSlotStates((prev) => ({
      ...prev,
      [slot.id]: {
        ...merged,
        status: 'processing',
      },
    }));

    try {
      const isSignature = slot.type === 'signature';
      const result = await processImageSlot(currentState.file, {
        maxKb: slot.maxKb,
        minKb: slot.minKb,
        aspectRatio: slot.aspectRatio,
        brightness: merged.brightness,
        contrast: merged.contrast,
        enhanceClarity: merged.enhanceClarity,
        isSignature,
      });

      setSlotStates((prev) => ({
        ...prev,
        [slot.id]: {
          ...merged,
          previewUrl: result.dataUrl,
          processedBlob: result.blob,
          processedSize: result.size,
          status: 'ready',
        },
      }));
    } catch (err: any) {
      setSlotStates((prev) => ({
        ...prev,
        [slot.id]: {
          ...merged,
          status: 'error',
          errorMessage: err?.message || 'Processing failed',
        },
      }));
    }
  };

  const removeFileFromSlot = (slotId: string) => {
    setSlotStates((prev) => ({
      ...prev,
      [slotId]: {
        file: null,
        previewUrl: null,
        originalSize: 0,
        processedBlob: null,
        processedSize: 0,
        status: 'idle',
        brightness: 0,
        contrast: 0,
        enhanceClarity: true,
      },
    }));
    setCombinedPdfBlob(null);
    setCombinedPdfUrl(null);
  };

  // Count ready slots
  const readySlotsCount = preset.slots.filter((s) => slotStates[s.id]?.status === 'ready').length;
  const totalSlotsCount = preset.slots.length;
  const hasAtLeastOneFile = readySlotsCount > 0;

  // Generate All-in-1 Combined PDF Package
  const handleGenerateCombinedPdf = async () => {
    if (!hasAtLeastOneFile) return;

    setIsPackaging(true);
    try {
      const slotInputs: PackagedPdfSlotInput[] = preset.slots
        .filter((s) => slotStates[s.id]?.processedBlob)
        .map((s) => ({
          config: s,
          state: slotStates[s.id],
        }));

      const maxLimitKb = selectedPresetId === 'custom' ? customMaxPdfKb : preset.maxCombinedPdfKb;
      const res = await createCombinedExamPdf(slotInputs, maxLimitKb, {
        applicantName: applicantName.trim() || undefined,
      });

      setCombinedPdfBlob(res.blob);
      const url = URL.createObjectURL(res.blob);
      setCombinedPdfUrl(url);
      setCombinedPdfSize(res.size);

      // Trigger celebratory confetti
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#2563EB', '#10B981', '#6366F1'],
      });
    } catch (err: any) {
      alert(`Packaging error: ${err?.message || 'Failed to create PDF package'}`);
    } finally {
      setIsPackaging(false);
    }
  };

  // Download Individual Resized Slot
  const downloadSingleSlot = (slot: FormSlotConfig) => {
    const state = slotStates[slot.id];
    if (!state?.processedBlob) return;

    const ext = slot.targetFormat === 'application/pdf' ? 'pdf' : 'jpg';
    const filename = `${slot.id}_${preset.id}_under_${slot.maxKb}kb.${ext}`;
    const url = URL.createObjectURL(state.processedBlob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Download 1-Click ZIP with all assets
  const handleDownloadZipPackage = async () => {
    if (!hasAtLeastOneFile) return;

    const slotInputs: PackagedPdfSlotInput[] = preset.slots
      .filter((s) => slotStates[s.id]?.processedBlob)
      .map((s) => ({
        config: s,
        state: slotStates[s.id],
      }));

    const zipBlob = await createExamZipPackage(slotInputs, combinedPdfBlob || undefined);
    const url = URL.createObjectURL(zipBlob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Exam_Packager_${preset.id}_Complete_Package.zip`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Native Web Share API integration ("Share with Classmates")
  const handleShare = async () => {
    const shareData = {
      title: '1-Click Govt Exam & College Form Packager',
      text: 'Resize photo < 50KB, signature < 20KB, and combine all documents into 1 PDF under 200KB for free with 100% privacy!',
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch {
        // User dismissed share dialog
      }
    } else {
      // Fallback copy link to clipboard
      await navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  return (
    <div className="space-y-8">
      
      {/* 1. Preset Selector Bar */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400">
                <Sparkles className="w-4 h-4" />
              </span>
              <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
                Select Exam / Admission Portal Preset
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
              Choose your exam standard to auto-configure aspect ratios and strict size limits.
            </p>
          </div>

          {/* Native Web Share Button */}
          <button
            onClick={handleShare}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold transition-all shrink-0"
          >
            {copiedLink ? (
              <>
                <Check className="w-4 h-4 text-emerald-500" />
                <span className="text-emerald-600 dark:text-emerald-400">Link Copied!</span>
              </>
            ) : (
              <>
                <Share2 className="w-4 h-4 text-blue-500" />
                <span>Share with Classmates</span>
              </>
            )}
          </button>
        </div>

        {/* Preset Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {FORM_PACKAGER_PRESETS.map((p) => {
            const isSelected = selectedPresetId === p.id;
            return (
              <button
                key={p.id}
                onClick={() => setSelectedPresetId(p.id)}
                className={`p-3.5 rounded-2xl text-left transition-all border ${
                  isSelected
                    ? 'bg-blue-500/10 border-blue-500 text-blue-900 dark:text-blue-100 shadow-sm'
                    : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200/80 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full ${
                    isSelected
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                  }`}>
                    {p.badge}
                  </span>
                  {isSelected && <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />}
                </div>
                <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white leading-tight">
                  {p.name}
                </h3>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 mt-1 leading-snug">
                  {p.description}
                </p>
              </button>
            );
          })}
        </div>

        {/* Custom Target Size Controls (if selected) */}
        {selectedPresetId === 'custom' && (
          <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Max Combined PDF Size:
              </label>
              <div className="flex items-center gap-2">
                {[100, 200, 300, 500, 1024].map((size) => (
                  <button
                    key={size}
                    onClick={() => setCustomMaxPdfKb(size)}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors ${
                      customMaxPdfKb === size
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    &lt; {size} KB
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2 ml-auto">
              <input
                type="text"
                placeholder="Optional Applicant Name"
                value={applicantName}
                onChange={(e) => setApplicantName(e.target.value)}
                className="px-3 py-1.5 text-xs rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        )}
      </div>

      {/* 2. File Upload Dropzones Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {preset.slots.map((slot) => {
          const state = slotStates[slot.id] || {
            file: null,
            previewUrl: null,
            originalSize: 0,
            processedBlob: null,
            processedSize: 0,
            status: 'idle',
            brightness: 0,
            contrast: 0,
            enhanceClarity: true,
          };

          const fileInputRef = useRef<HTMLInputElement>(null);
          const isPhotoOrSig = slot.type === 'photo' || slot.type === 'signature';
          const isTuningActive = activeTuningSlotId === slot.id;

          return (
            <div
              key={slot.id}
              className={`bg-white dark:bg-slate-900 border rounded-3xl p-6 transition-all shadow-sm ${
                state.status === 'ready'
                  ? 'border-emerald-500/50 dark:border-emerald-500/40 bg-emerald-50/10'
                  : 'border-slate-200 dark:border-slate-800'
              }`}
            >
              {/* Slot Header */}
              <div className="flex items-start justify-between gap-2 mb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="p-1 rounded bg-slate-100 dark:bg-slate-800 text-blue-600 dark:text-blue-400">
                      {slot.type === 'photo' ? (
                        <ImageIcon className="w-4 h-4" />
                      ) : slot.type === 'signature' ? (
                        <Wand2 className="w-4 h-4" />
                      ) : (
                        <FileText className="w-4 h-4" />
                      )}
                    </span>
                    <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                      {slot.label}
                    </h3>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    {slot.sublabel}
                  </p>
                </div>

                {/* Target Limit Badge */}
                <div className="text-right shrink-0">
                  <span className="inline-block px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 text-[11px] font-black">
                    Max &lt; {slot.maxKb} KB
                  </span>
                  {slot.aspectLabel && (
                    <span className="block text-[10px] text-slate-400 mt-0.5">
                      Aspect: {slot.aspectLabel}
                    </span>
                  )}
                </div>
              </div>

              {/* Slot Body: Dropzone or Processed Preview */}
              {!state.file ? (
                <div
                  onClick={() => fileInputRef.current?.click()}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => {
                    e.preventDefault();
                    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                      handleFileForSlot(slot, e.dataTransfer.files[0]);
                    }
                  }}
                  className="border-2 border-dashed border-slate-200 dark:border-slate-800 hover:border-blue-500 dark:hover:border-blue-500 rounded-2xl p-6 sm:p-8 text-center cursor-pointer transition-colors bg-slate-50/50 dark:bg-slate-800/20 hover:bg-blue-50/20"
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*,application/pdf"
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        handleFileForSlot(slot, e.target.files[0]);
                      }
                    }}
                  />
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center mx-auto mb-2">
                    <Upload className="w-5 h-5" />
                  </div>
                  <span className="text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-300 block">
                    Choose or Drop {slot.label}
                  </span>
                  <span className="text-[11px] text-slate-400 block mt-1">
                    Auto-crops aspect & compresses to under {slot.maxKb} KB
                  </span>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* File Preview Card */}
                  <div className="flex items-center gap-4 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60">
                    {state.previewUrl && (
                      <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-white shrink-0 border border-slate-200 dark:border-slate-700 shadow-inner flex items-center justify-center">
                        <img
                          src={state.previewUrl}
                          alt={slot.label}
                          className="max-w-full max-h-full object-contain"
                        />
                      </div>
                    )}

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold text-slate-900 dark:text-white truncate">
                          {state.file.name}
                        </span>
                      </div>

                      {/* Compression Stats */}
                      <div className="mt-1 flex flex-wrap items-center gap-2 text-xs">
                        <span className="text-slate-400 line-through text-[11px]">
                          {(state.originalSize / 1024).toFixed(0)} KB
                        </span>
                        <span className="text-emerald-600 dark:text-emerald-400 font-extrabold flex items-center gap-0.5">
                          <Check className="w-3.5 h-3.5" />
                          {(state.processedSize / 1024).toFixed(0)} KB
                        </span>
                        <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold">
                          Under {slot.maxKb} KB Limit
                        </span>
                      </div>

                      {/* Single Slot Action Buttons */}
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() => downloadSingleSlot(slot)}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-blue-600 text-white text-[11px] font-bold hover:bg-blue-700 transition-colors"
                        >
                          <Download className="w-3 h-3" />
                          <span>Save {slot.type === 'photo' ? 'Photo' : slot.type === 'signature' ? 'Sign' : 'Doc'}</span>
                        </button>

                        {isPhotoOrSig && (
                          <button
                            onClick={() => setActiveTuningSlotId(isTuningActive ? null : slot.id)}
                            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-colors ${
                              isTuningActive
                                ? 'bg-blue-500/20 text-blue-600 dark:text-blue-400'
                                : 'bg-slate-200/80 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                            }`}
                          >
                            <Sliders className="w-3 h-3" />
                            <span>Adjust</span>
                          </button>
                        )}

                        <button
                          onClick={() => removeFileFromSlot(slot.id)}
                          className="p-1 rounded-lg hover:bg-red-500/10 text-slate-400 hover:text-red-500 transition-colors ml-auto"
                          title="Remove file"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Tuning Sliders (Brightness, Contrast, Paper Whitener for Signature) */}
                  {isTuningActive && (
                    <div className="p-4 rounded-2xl bg-blue-50/50 dark:bg-blue-950/20 border border-blue-200/60 dark:border-blue-800/60 space-y-3 animate-fadeIn">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-blue-900 dark:text-blue-200 flex items-center gap-1.5">
                          <Sliders className="w-3.5 h-3.5" />
                          <span>Image Clarity & Whitening Tools</span>
                        </span>
                        {slot.type === 'signature' && (
                          <button
                            onClick={() =>
                              reprocessSlotWithSettings(slot, {
                                enhanceClarity: !state.enhanceClarity,
                              })
                            }
                            className={`text-[11px] px-2.5 py-0.5 rounded-full font-bold transition-colors ${
                              state.enhanceClarity
                                ? 'bg-blue-600 text-white'
                                : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-400'
                            }`}
                          >
                            Auto Paper Whitener: {state.enhanceClarity ? 'ON' : 'OFF'}
                          </button>
                        )}
                      </div>

                      {/* Brightness Slider */}
                      <div className="flex items-center gap-3">
                        <span className="text-[11px] text-slate-600 dark:text-slate-400 w-16 flex items-center gap-1">
                          <SunMedium className="w-3 h-3" /> Light
                        </span>
                        <input
                          type="range"
                          min="-30"
                          max="30"
                          value={state.brightness}
                          onChange={(e) =>
                            reprocessSlotWithSettings(slot, {
                              brightness: parseInt(e.target.value, 10),
                            })
                          }
                          className="flex-1 accent-blue-600"
                        />
                        <span className="text-[10px] text-slate-400 w-6 text-right">
                          {state.brightness > 0 ? `+${state.brightness}` : state.brightness}
                        </span>
                      </div>

                      {/* Contrast Slider */}
                      <div className="flex items-center gap-3">
                        <span className="text-[11px] text-slate-600 dark:text-slate-400 w-16 flex items-center gap-1">
                          <Contrast className="w-3 h-3" /> Contrast
                        </span>
                        <input
                          type="range"
                          min="-30"
                          max="30"
                          value={state.contrast}
                          onChange={(e) =>
                            reprocessSlotWithSettings(slot, {
                              contrast: parseInt(e.target.value, 10),
                            })
                          }
                          className="flex-1 accent-blue-600"
                        />
                        <span className="text-[10px] text-slate-400 w-6 text-right">
                          {state.contrast > 0 ? `+${state.contrast}` : state.contrast}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* 3. Combined Package Generation Action Card */}
      <div className="bg-gradient-to-r from-blue-900 to-indigo-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-blue-800/80">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="flex items-center gap-2">
              <span className="p-1 rounded bg-blue-500/20 text-blue-300">
                <ShieldCheck className="w-4 h-4" />
              </span>
              <span className="text-xs font-extrabold uppercase tracking-wider text-blue-300">
                100% Client-Side Memory Processing
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight">
              Package All Documents into 1 Single PDF
            </h2>
            <p className="text-xs sm:text-sm text-blue-200/80 leading-relaxed">
              Guaranteed output strictly under{' '}
              <span className="font-extrabold text-emerald-300">
                &lt; {selectedPresetId === 'custom' ? customMaxPdfKb : preset.maxCombinedPdfKb} KB
              </span>
              . Includes applicant profile card, photo & signature verification block, and attached certificates.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            {/* 1-Click PDF Generation Button */}
            <button
              onClick={handleGenerateCombinedPdf}
              disabled={!hasAtLeastOneFile || isPackaging}
              className="px-6 py-3.5 rounded-2xl bg-blue-500 hover:bg-blue-400 text-white font-extrabold text-sm shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isPackaging ? (
                <>
                  <RotateCw className="w-4 h-4 animate-spin" />
                  <span>Packaging Dossier...</span>
                </>
              ) : (
                <>
                  <FileCheck2 className="w-5 h-5" />
                  <span>Generate Combined PDF</span>
                </>
              )}
            </button>

            {/* Batch ZIP Export Button */}
            <button
              onClick={handleDownloadZipPackage}
              disabled={!hasAtLeastOneFile}
              className="px-4 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/20 transition-all flex items-center gap-2 disabled:opacity-50"
              title="Download all resized images and PDF in a single ZIP folder"
            >
              <FolderArchive className="w-4 h-4" />
              <span>Download ZIP Package</span>
            </button>
          </div>
        </div>

        {/* 4. Generated PDF Result Callout */}
        {combinedPdfBlob && combinedPdfUrl && (
          <div className="mt-8 pt-6 border-t border-blue-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white/5 rounded-2xl p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center font-extrabold shrink-0 shadow-md">
                ✓
              </div>
              <div>
                <span className="text-xs sm:text-sm font-extrabold text-emerald-300 block">
                  Form Package Ready: {(combinedPdfSize / 1024).toFixed(0)} KB (Under {selectedPresetId === 'custom' ? customMaxPdfKb : preset.maxCombinedPdfKb} KB Limit)
                </span>
                <span className="text-[11px] text-blue-200 block">
                  Ready for instant upload to UPSC, SSC, NTA, or College Admission portals.
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <a
                href={combinedPdfUrl}
                download={`Application_Dossier_${preset.id}_under_${preset.maxCombinedPdfKb}kb.pdf`}
                className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs transition-colors flex items-center gap-1.5 shadow-md"
              >
                <Download className="w-4 h-4" />
                <span>Download PDF Dossier</span>
              </a>

              <a
                href={combinedPdfUrl}
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
                title="Preview PDF"
              >
                <Eye className="w-4 h-4" />
              </a>
            </div>
          </div>
        )}
      </div>

    </div>
  );
};
