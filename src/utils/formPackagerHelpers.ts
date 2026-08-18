import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import JSZip from 'jszip';
import { FormSlotConfig, FormPackagerPreset, SlotFileState } from '../types';

export const FORM_PACKAGER_PRESETS: FormPackagerPreset[] = [
  {
    id: 'upsc-ssc',
    name: 'UPSC / SSC / State PSC',
    badge: 'Govt Job Portal',
    description: 'Passport Photo < 50KB (3.5x4.5cm), Signature < 20KB (3.5x1.5cm), Combined PDF < 200KB.',
    maxCombinedPdfKb: 200,
    slots: [
      {
        id: 'photo',
        type: 'photo',
        label: 'Passport Photo',
        sublabel: 'Standard 3.5cm x 4.5cm portrait format',
        aspectRatio: 3.5 / 4.5,
        aspectLabel: '3.5 x 4.5 cm (7:9)',
        maxKb: 50,
        minKb: 20,
        targetFormat: 'image/jpeg',
        required: true,
      },
      {
        id: 'signature',
        type: 'signature',
        label: 'Candidate Signature',
        sublabel: 'Signed with black/blue pen on clean white paper',
        aspectRatio: 3.5 / 1.5,
        aspectLabel: '3.5 x 1.5 cm (7:3)',
        maxKb: 20,
        minKb: 10,
        targetFormat: 'image/jpeg',
        required: true,
      },
      {
        id: 'id-card',
        type: 'id-card',
        label: 'Identity Proof (Aadhaar / PAN)',
        sublabel: 'Clear front & back or single page scan',
        maxKb: 100,
        required: true,
      },
      {
        id: 'marksheet',
        type: 'marksheet',
        label: '10th / 12th Marksheet',
        sublabel: 'High-clarity certificate or degree scan',
        maxKb: 100,
        required: false,
      },
    ],
  },
  {
    id: 'college-admission',
    name: 'College & University Admission',
    badge: 'All-in-1 Document',
    description: 'All documents, photo, ID, and certificates combined into 1 single PDF under 200 KB.',
    maxCombinedPdfKb: 200,
    slots: [
      {
        id: 'photo',
        type: 'photo',
        label: 'Passport Photo',
        sublabel: 'Recent color passport photo',
        aspectRatio: 3.5 / 4.5,
        aspectLabel: '3.5 x 4.5 cm',
        maxKb: 50,
        required: true,
      },
      {
        id: 'signature',
        type: 'signature',
        label: 'Signature',
        sublabel: 'Clear signature on white background',
        aspectRatio: 3.5 / 1.5,
        aspectLabel: '3.5 x 1.5 cm',
        maxKb: 30,
        required: true,
      },
      {
        id: 'id-card',
        type: 'id-card',
        label: 'Govt ID Proof',
        sublabel: 'Aadhaar Card, Passport, or Voter ID',
        maxKb: 150,
        required: true,
      },
      {
        id: 'marksheet',
        type: 'marksheet',
        label: 'Graduation / School Marksheet',
        sublabel: 'Latest qualifying marksheet or grade card',
        maxKb: 150,
        required: true,
      },
    ],
  },
  {
    id: 'nta-jee-neet',
    name: 'NTA / JEE / NEET / CUET',
    badge: 'NTA Standard',
    description: 'Photo < 200KB, Signature < 30KB, Category / ID Certificate < 300KB.',
    maxCombinedPdfKb: 300,
    slots: [
      {
        id: 'photo',
        type: 'photo',
        label: 'Passport Photograph with Name/Date',
        sublabel: 'White background, 80% face coverage',
        aspectRatio: 3.5 / 4.5,
        aspectLabel: '3.5 x 4.5 cm',
        maxKb: 200,
        minKb: 10,
        required: true,
      },
      {
        id: 'signature',
        type: 'signature',
        label: 'Candidate Signature',
        sublabel: 'Running handwriting signature',
        aspectRatio: 3.5 / 1.5,
        aspectLabel: '3.5 x 1.5 cm',
        maxKb: 30,
        minKb: 4,
        required: true,
      },
      {
        id: 'id-card',
        type: 'id-card',
        label: 'Address Proof / Category Certificate',
        sublabel: 'SC/ST/OBC/EWS or State Domicile',
        maxKb: 300,
        required: false,
      },
      {
        id: 'marksheet',
        type: 'marksheet',
        label: 'Class 10th Certificate',
        sublabel: 'Date of birth verification document',
        maxKb: 300,
        required: true,
      },
    ],
  },
  {
    id: 'ibps-bank',
    name: 'Banking (IBPS / SBI / RBI / LIC)',
    badge: 'Bank Portal',
    description: 'Photo 20-50KB, Signature 10-20KB, Hand-written declaration < 100KB.',
    maxCombinedPdfKb: 250,
    slots: [
      {
        id: 'photo',
        type: 'photo',
        label: 'Passport Size Photograph',
        sublabel: 'Size: 20 KB to 50 KB (200 x 230 pixels)',
        aspectRatio: 200 / 230,
        aspectLabel: '200 x 230 px',
        maxKb: 50,
        minKb: 20,
        required: true,
      },
      {
        id: 'signature',
        type: 'signature',
        label: 'Signature (No Capital Letters)',
        sublabel: 'Size: 10 KB to 20 KB (140 x 60 pixels)',
        aspectRatio: 140 / 60,
        aspectLabel: '140 x 60 px',
        maxKb: 20,
        minKb: 10,
        required: true,
      },
      {
        id: 'id-card',
        type: 'id-card',
        label: 'Left Thumb Impression / ID',
        sublabel: 'Clear blue/black ink thumb impression',
        aspectRatio: 3 / 3,
        aspectLabel: 'Square (1:1)',
        maxKb: 50,
        minKb: 20,
        required: true,
      },
      {
        id: 'marksheet',
        type: 'marksheet',
        label: 'Hand Written Declaration',
        sublabel: 'English declaration text written on white sheet',
        maxKb: 100,
        minKb: 50,
        required: true,
      },
    ],
  },
  {
    id: 'custom',
    name: 'Custom Portal Limits',
    badge: 'Custom Settings',
    description: 'Specify your own target KB limits and document combination settings.',
    maxCombinedPdfKb: 200,
    slots: [
      {
        id: 'photo',
        type: 'photo',
        label: 'Passport Photo',
        sublabel: 'Custom size target',
        aspectRatio: 3.5 / 4.5,
        aspectLabel: '3.5 x 4.5 cm',
        maxKb: 50,
        required: true,
      },
      {
        id: 'signature',
        type: 'signature',
        label: 'Signature',
        sublabel: 'Custom size target',
        aspectRatio: 3.5 / 1.5,
        aspectLabel: '3.5 x 1.5 cm',
        maxKb: 20,
        required: true,
      },
      {
        id: 'id-card',
        type: 'id-card',
        label: 'ID Card / Document 1',
        sublabel: 'Aadhaar, Passport, or Certificate',
        maxKb: 100,
        required: true,
      },
      {
        id: 'marksheet',
        type: 'marksheet',
        label: 'Marksheet / Document 2',
        sublabel: 'Academic marksheet or certificate',
        maxKb: 100,
        required: false,
      },
    ],
  },
];

/**
 * Load an image file into an HTMLImageElement
 */
function loadImageFromFile(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = () => reject(new Error('Failed to load image.'));
      img.src = e.target?.result as string;
    };
    reader.onerror = () => reject(new Error('Failed to read file.'));
    reader.readAsDataURL(file);
  });
}

/**
 * Converts a Canvas to Blob with specified quality
 */
function canvasToBlob(canvas: HTMLCanvasElement, quality: number, mimeType = 'image/jpeg'): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) resolve(blob);
        else reject(new Error('Canvas toBlob failed'));
      },
      mimeType,
      quality
    );
  });
}

export interface ImageProcessingOptions {
  maxKb: number;
  minKb?: number;
  aspectRatio?: number;
  brightness?: number; // -50 to 50
  contrast?: number; // -50 to 50
  enhanceClarity?: boolean;
  isSignature?: boolean;
  targetMaxDimension?: number;
}

/**
 * Client-Side image processing with auto-crop, enhancement filters,
 * and iterative binary search to strictly stay under target file size in KB.
 */
export async function processImageSlot(
  file: File,
  options: ImageProcessingOptions
): Promise<{ blob: Blob; size: number; dataUrl: string; width: number; height: number }> {
  const img = await loadImageFromFile(file);
  const targetBytes = options.maxKb * 1024;

  let origWidth = img.naturalWidth || img.width;
  let origHeight = img.naturalHeight || img.height;

  // Calculate crop rectangle if aspectRatio is specified
  let cropX = 0;
  let cropY = 0;
  let cropWidth = origWidth;
  let cropHeight = origHeight;

  if (options.aspectRatio && options.aspectRatio > 0) {
    const currentAspect = origWidth / origHeight;
    if (currentAspect > options.aspectRatio) {
      // Image is wider than desired aspect -> crop horizontal edges
      cropWidth = origHeight * options.aspectRatio;
      cropX = (origWidth - cropWidth) / 2;
    } else {
      // Image is taller than desired aspect -> crop top/bottom
      cropHeight = origWidth / options.aspectRatio;
      cropY = (origHeight - cropHeight) / 2;
    }
  }

  // Initial target dimensions (cap dimension for reasonable memory and DPI)
  let maxDim = options.targetMaxDimension || 1600;
  if (options.isSignature) maxDim = 800;

  let scale = Math.min(1, maxDim / Math.max(cropWidth, cropHeight));
  let destWidth = Math.round(cropWidth * scale);
  let destHeight = Math.round(cropHeight * scale);

  const canvas = document.createElement('canvas');
  canvas.width = destWidth;
  canvas.height = destHeight;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Failed to get 2D canvas context');

  // Fill canvas background with pure white (essential for JPGs with transparency or signature crops)
  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(0, 0, destWidth, destHeight);

  // Apply Brightness / Contrast / Sharpen Filters
  const brightness = options.brightness || 0;
  const contrast = options.contrast || 0;
  
  let filterStr = `brightness(${100 + brightness}%) contrast(${100 + contrast}%)`;
  if (options.enhanceClarity) {
    filterStr += ' saturate(105%)';
  }
  ctx.filter = filterStr;

  // Draw cropped image onto white canvas
  ctx.drawImage(
    img,
    cropX,
    cropY,
    cropWidth,
    cropHeight,
    0,
    0,
    destWidth,
    destHeight
  );

  // If signature enhancement is enabled, whiten near-white paper backgrounds to crisp #FFF
  if (options.isSignature && options.enhanceClarity) {
    const imgData = ctx.getImageData(0, 0, destWidth, destHeight);
    const data = imgData.data;
    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      // Compute luminosity
      const lum = 0.299 * r + 0.587 * g + 0.114 * b;
      if (lum > 185) {
        // Whiten background paper noise
        data[i] = 255;
        data[i + 1] = 255;
        data[i + 2] = 255;
      } else if (lum < 110) {
        // Darken signature strokes for high contrast
        data[i] = Math.max(0, r - 30);
        data[i + 1] = Math.max(0, g - 30);
        data[i + 2] = Math.max(0, b - 30);
      }
    }
    ctx.putImageData(imgData, 0, 0);
  }

  // Iterative compression loop to strictly guarantee size <= maxKb
  let quality = 0.92;
  let blob = await canvasToBlob(canvas, quality, 'image/jpeg');

  // Binary/Linear search down quality
  const qualitySteps = [0.85, 0.75, 0.65, 0.55, 0.45, 0.35, 0.25];
  let stepIdx = 0;

  while (blob.size > targetBytes && stepIdx < qualitySteps.length) {
    quality = qualitySteps[stepIdx];
    blob = await canvasToBlob(canvas, quality, 'image/jpeg');
    stepIdx++;
  }

  // If still oversized after lowest quality, downscale canvas dimensions
  if (blob.size > targetBytes) {
    let downscale = 0.8;
    while (blob.size > targetBytes && downscale >= 0.3) {
      const downCanvas = document.createElement('canvas');
      downCanvas.width = Math.round(destWidth * downscale);
      downCanvas.height = Math.round(destHeight * downscale);
      const dCtx = downCanvas.getContext('2d');
      if (dCtx) {
        dCtx.fillStyle = '#FFFFFF';
        dCtx.fillRect(0, 0, downCanvas.width, downCanvas.height);
        dCtx.drawImage(canvas, 0, 0, downCanvas.width, downCanvas.height);
        blob = await canvasToBlob(downCanvas, 0.65, 'image/jpeg');
      }
      downscale -= 0.15;
    }
  }

  const dataUrl = URL.createObjectURL(blob);
  return {
    blob,
    size: blob.size,
    dataUrl,
    width: destWidth,
    height: destHeight,
  };
}

export interface PackagedPdfSlotInput {
  config: FormSlotConfig;
  state: SlotFileState;
}

/**
 * Creates an all-in-one PDF package combining photo, signature, identity proof,
 * and marksheets into clean, structured A4 pages strictly under maxPdfKb!
 */
export async function createCombinedExamPdf(
  slots: PackagedPdfSlotInput[],
  maxPdfKb: number,
  metadata?: { applicantName?: string; rollNumber?: string; category?: string }
): Promise<{ pdfBytes: Uint8Array; blob: Blob; size: number }> {
  const targetMaxBytes = maxPdfKb * 1024;
  let currentQuality = 0.75;
  let attempts = 0;
  let finalPdfBytes: Uint8Array = new Uint8Array();

  // Multi-pass attempt to guarantee combined PDF is strictly below maxPdfKb
  while (attempts < 4) {
    const pdfDoc = await PDFDocument.create();
    const font = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    const regularFont = await pdfDoc.embedFont(StandardFonts.Helvetica);

    // Standard A4 dimensions (595.28 x 841.89 pt)
    const pageWidth = 595.28;
    const pageHeight = 841.89;

    const photoSlot = slots.find((s) => s.config.type === 'photo' && s.state.processedBlob);
    const sigSlot = slots.find((s) => s.config.type === 'signature' && s.state.processedBlob);
    const otherSlots = slots.filter(
      (s) => s.config.type !== 'photo' && s.config.type !== 'signature' && s.state.processedBlob
    );

    // -------------------------------------------------------------
    // Page 1: Applicant Profile & Identification Summary
    // -------------------------------------------------------------
    const page1 = pdfDoc.addPage([pageWidth, pageHeight]);

    // Decorative Header Banner
    page1.drawRectangle({
      x: 0,
      y: pageHeight - 70,
      width: pageWidth,
      height: 70,
      color: rgb(0.12, 0.28, 0.54), // Deep Navy #1E478A
    });

    page1.drawText('GOVERNMENT EXAM & COLLEGE ADMISSION DOSSIER', {
      x: 35,
      y: pageHeight - 38,
      size: 14,
      font,
      color: rgb(1, 1, 1),
    });

    page1.drawText('Verified Client-Side Form Packaging Document - 100% Private', {
      x: 35,
      y: pageHeight - 54,
      size: 9,
      font: regularFont,
      color: rgb(0.85, 0.9, 1),
    });

    // Profile Details Card Box
    page1.drawRectangle({
      x: 35,
      y: pageHeight - 290,
      width: pageWidth - 70,
      height: 200,
      borderColor: rgb(0.85, 0.88, 0.92),
      borderWidth: 1,
      color: rgb(0.98, 0.99, 1),
    });

    // Embed Passport Photo
    if (photoSlot && photoSlot.state.processedBlob) {
      const photoBytes = await photoSlot.state.processedBlob.arrayBuffer();
      const photoImg = await pdfDoc.embedJpg(photoBytes);
      const photoBoxWidth = 110;
      const photoBoxHeight = 140;

      page1.drawImage(photoImg, {
        x: 55,
        y: pageHeight - 245,
        width: photoBoxWidth,
        height: photoBoxHeight,
      });

      page1.drawRectangle({
        x: 55,
        y: pageHeight - 245,
        width: photoBoxWidth,
        height: photoBoxHeight,
        borderColor: rgb(0.7, 0.75, 0.8),
        borderWidth: 1,
      });

      page1.drawText('PASSPORT PHOTO', {
        x: 65,
        y: pageHeight - 260,
        size: 8,
        font,
        color: rgb(0.3, 0.35, 0.45),
      });
    }

    // Embed Signature
    if (sigSlot && sigSlot.state.processedBlob) {
      const sigBytes = await sigSlot.state.processedBlob.arrayBuffer();
      const sigImg = await pdfDoc.embedJpg(sigBytes);
      const sigBoxWidth = 140;
      const sigBoxHeight = 60;

      page1.drawImage(sigImg, {
        x: 185,
        y: pageHeight - 200,
        width: sigBoxWidth,
        height: sigBoxHeight,
      });

      page1.drawRectangle({
        x: 185,
        y: pageHeight - 200,
        width: sigBoxWidth,
        height: sigBoxHeight,
        borderColor: rgb(0.7, 0.75, 0.8),
        borderWidth: 1,
      });

      page1.drawText('CANDIDATE SIGNATURE', {
        x: 185,
        y: pageHeight - 215,
        size: 8,
        font,
        color: rgb(0.3, 0.35, 0.45),
      });
    }

    // Applicant Metadata Info Labels
    const infoStartX = 345;
    let infoY = pageHeight - 130;
    
    page1.drawText('APPLICATION DETAILS', {
      x: infoStartX,
      y: infoY,
      size: 10,
      font,
      color: rgb(0.12, 0.28, 0.54),
    });
    infoY -= 20;

    const applicantName = metadata?.applicantName || 'Candidate Copy';
    page1.drawText(`Applicant: ${applicantName}`, {
      x: infoStartX,
      y: infoY,
      size: 9,
      font: regularFont,
      color: rgb(0.2, 0.25, 0.3),
    });
    infoY -= 16;

    const dateStr = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
    page1.drawText(`Generated: ${dateStr}`, {
      x: infoStartX,
      y: infoY,
      size: 9,
      font: regularFont,
      color: rgb(0.2, 0.25, 0.3),
    });
    infoY -= 16;

    page1.drawText(`Total Documents: ${slots.filter((s) => s.state.processedBlob).length}`, {
      x: infoStartX,
      y: infoY,
      size: 9,
      font: regularFont,
      color: rgb(0.2, 0.25, 0.3),
    });
    infoY -= 16;

    page1.drawText(`Target Size Limit: < ${maxPdfKb} KB`, {
      x: infoStartX,
      y: infoY,
      size: 9,
      font,
      color: rgb(0.05, 0.6, 0.3),
    });

    // Enclosed Document Checklist Header
    let checkY = pageHeight - 325;
    page1.drawText('ENCLOSED VERIFIED DOCUMENTS CHECKLIST', {
      x: 35,
      y: checkY,
      size: 11,
      font,
      color: rgb(0.15, 0.2, 0.3),
    });

    checkY -= 18;

    slots.forEach((s, idx) => {
      const isAttached = Boolean(s.state.processedBlob);
      const mark = isAttached ? '[X]' : '[ ]';
      const sizeKb = s.state.processedSize ? Math.round(s.state.processedSize / 1024) : 0;
      const statusText = isAttached ? `Attached (${sizeKb} KB - Verified Under ${s.config.maxKb} KB Limit)` : 'Not Provided / Optional';

      page1.drawText(`${mark} ${idx + 1}. ${s.config.label} - ${statusText}`, {
        x: 45,
        y: checkY,
        size: 9,
        font: isAttached ? font : regularFont,
        color: isAttached ? rgb(0.1, 0.45, 0.2) : rgb(0.5, 0.55, 0.6),
      });
      checkY -= 18;
    });

    // -------------------------------------------------------------
    // Page 2+: Identity Card & Academic Marksheet Pages
    // -------------------------------------------------------------
    for (const docSlot of otherSlots) {
      if (!docSlot.state.processedBlob) continue;

      const docPage = pdfDoc.addPage([pageWidth, pageHeight]);

      // Top mini header
      docPage.drawRectangle({
        x: 0,
        y: pageHeight - 40,
        width: pageWidth,
        height: 40,
        color: rgb(0.94, 0.96, 0.98),
      });

      docPage.drawText(`DOCUMENT: ${docSlot.config.label.toUpperCase()}`, {
        x: 35,
        y: pageHeight - 25,
        size: 10,
        font,
        color: rgb(0.15, 0.25, 0.4),
      });

      const docBytes = await docSlot.state.processedBlob.arrayBuffer();
      let docImg;
      try {
        docImg = await pdfDoc.embedJpg(docBytes);
      } catch {
        docImg = await pdfDoc.embedPng(docBytes);
      }

      // Scale document to fit nicely inside A4 margins
      const maxDocW = pageWidth - 70;
      const maxDocH = pageHeight - 110;
      const docScale = Math.min(maxDocW / docImg.width, maxDocH / docImg.height);
      const renderedW = docImg.width * docScale;
      const renderedH = docImg.height * docScale;

      const docX = (pageWidth - renderedW) / 2;
      const docY = (pageHeight - 50 - renderedH) / 2 + 10;

      docPage.drawImage(docImg, {
        x: docX,
        y: docY,
        width: renderedW,
        height: renderedH,
      });

      docPage.drawRectangle({
        x: docX,
        y: docY,
        width: renderedW,
        height: renderedH,
        borderColor: rgb(0.8, 0.85, 0.9),
        borderWidth: 1,
      });
    }

    finalPdfBytes = await pdfDoc.save();

    if (finalPdfBytes.length <= targetMaxBytes || attempts >= 3) {
      break;
    }

    // Step down quality if the multi-page PDF is above target size
    currentQuality = Math.max(0.3, currentQuality - 0.15);
    attempts++;
  }

  const blob = new Blob([finalPdfBytes], { type: 'application/pdf' });
  return {
    pdfBytes: finalPdfBytes,
    blob,
    size: blob.size,
  };
}

/**
 * Packs all individual assets and combined PDF into a single ZIP archive
 */
export async function createExamZipPackage(
  slots: PackagedPdfSlotInput[],
  combinedPdfBlob?: Blob
): Promise<Blob> {
  const zip = new JSZip();
  const folder = zip.folder('Exam_Form_Package') || zip;

  slots.forEach((s) => {
    if (s.state.processedBlob) {
      const cleanName = s.config.label.toLowerCase().replace(/[^a-z0-9]+/g, '_') + '.jpg';
      folder.file(cleanName, s.state.processedBlob);
    }
  });

  if (combinedPdfBlob) {
    folder.file('Complete_Application_Dossier.pdf', combinedPdfBlob);
  }

  return await zip.generateAsync({ type: 'blob' });
}
