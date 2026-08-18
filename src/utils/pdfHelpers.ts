import * as pdfjsLib from 'pdfjs-dist';
import { PDFDocument, rgb, StandardFonts, degrees } from 'pdf-lib';
import Tesseract from 'tesseract.js';
import { RedactionBox, SignatureField, CompressionSettings, OcrResult, PdfPagePreview } from '../types';

// Set worker source for pdfjs-dist
const PDFJS_VERSION = pdfjsLib.version || '4.10.38';
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${PDFJS_VERSION}/build/pdf.worker.min.mjs`;

/**
 * Helper to convert data URIs directly to Uint8Array without fetch() to avoid CSP issues
 */
export function dataUriToUint8Array(dataUri: string): Uint8Array {
  const commaIdx = dataUri.indexOf(',');
  const base64 = commaIdx !== -1 ? dataUri.substring(commaIdx + 1) : dataUri;
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

/**
 * Render all or selected PDF pages as image previews/dataUrls using pdfjs-dist
 */
export async function renderPdfPages(
  fileBuffer: ArrayBuffer,
  scale = 1.2,
  maxPages = 100
): Promise<PdfPagePreview[]> {
  try {
    const loadingTask = pdfjsLib.getDocument({ data: new Uint8Array(fileBuffer) });
    const pdf = await loadingTask.promise;
    const previews: PdfPagePreview[] = [];
    const totalPages = Math.min(pdf.numPages, maxPages);

    for (let i = 1; i <= totalPages; i++) {
      const page = await pdf.getPage(i);
      const viewport = page.getViewport({ scale });
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      if (!context) continue;

      canvas.width = viewport.width;
      canvas.height = viewport.height;

      await (page.render as any)({
        canvasContext: context,
        viewport,
        canvas,
      }).promise;

      previews.push({
        pageNumber: i,
        pageIndex: i - 1,
        dataUrl: canvas.toDataURL('image/png'),
        width: viewport.width,
        height: viewport.height,
        rotation: page.rotate || 0,
        selected: true,
      });
    }

    return previews;
  } catch (err) {
    console.error('Error rendering PDF pages:', err);
    throw new Error('Failed to render PDF pages. Please check if file is password-protected or corrupted.');
  }
}

/**
 * Compress PDF by rendering page canvases and re-encoding embedded raster images at custom quality
 */
export async function compressPdf(
  fileBuffer: ArrayBuffer,
  settings: CompressionSettings,
  onProgress?: (progress: number) => void
): Promise<Uint8Array> {
  const loadingTask = pdfjsLib.getDocument({ data: new Uint8Array(fileBuffer) });
  const pdf = await loadingTask.promise;
  const newPdf = await PDFDocument.create();

  // Determine scale factor and image quality
  let scale = 1.2;
  let quality = settings.imageQuality;

  if (settings.level === 'extreme') {
    scale = 0.8;
    quality = 0.35;
  } else if (settings.level === 'recommended') {
    scale = 1.1;
    quality = 0.55;
  } else if (settings.level === 'high-quality') {
    scale = 1.4;
    quality = 0.75;
  }

  const numPages = pdf.numPages;

  for (let i = 1; i <= numPages; i++) {
    if (onProgress) onProgress(Math.round(((i - 1) / numPages) * 100));

    const page = await pdf.getPage(i);
    const viewport = page.getViewport({ scale });
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    if (!context) continue;

    canvas.width = viewport.width;
    canvas.height = viewport.height;

    const jpegDataUrl = canvas.toDataURL('image/jpeg', quality);
    await (page.render as any)({
      canvasContext: context,
      viewport,
      canvas,
    }).promise;
    const jpegImageBytes = dataUriToUint8Array(jpegDataUrl);

    const embeddedImage = await newPdf.embedJpg(jpegImageBytes);
    const newPage = newPdf.addPage([viewport.width / scale, viewport.height / scale]);
    newPage.drawImage(embeddedImage, {
      x: 0,
      y: 0,
      width: viewport.width / scale,
      height: viewport.height / scale,
    });
  }

  if (onProgress) onProgress(100);

  return await newPdf.save();
}

/**
 * Run OCR text recognition on scanned PDF using Tesseract.js
 */
export async function runOcrOnPdf(
  fileBuffer: ArrayBuffer,
  language = 'eng',
  onProgress?: (progress: number, currentPage: number, totalPages: number, statusText: string) => void
): Promise<OcrResult> {
  const loadingTask = pdfjsLib.getDocument({ data: new Uint8Array(fileBuffer) });
  const pdf = await loadingTask.promise;
  const numPages = pdf.numPages;
  const pagesText: { pageNumber: number; text: string }[] = [];
  let totalConfidence = 0;

  const worker = await Tesseract.createWorker(language);

  for (let i = 1; i <= numPages; i++) {
    if (onProgress) onProgress(0, i, numPages, `Rendering page ${i}/${numPages}...`);

    const page = await pdf.getPage(i);
    const viewport = page.getViewport({ scale: 2.0 }); // High resolution for OCR accuracy
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    if (!context) continue;
    canvas.width = viewport.width;
    canvas.height = viewport.height;

    await (page.render as any)({
      canvasContext: context,
      viewport,
      canvas,
    }).promise;

    const dataUrl = canvas.toDataURL('image/png');

    if (onProgress) onProgress(20, i, numPages, `Running OCR recognition on page ${i}/${numPages}...`);

    const ret = await worker.recognize(dataUrl);
    pagesText.push({ pageNumber: i, text: ret.data.text });
    totalConfidence += ret.data.confidence;

    if (onProgress) onProgress(100, i, numPages, `Completed page ${i}/${numPages}`);
  }

  await worker.terminate();

  const fullText = pagesText.map((p) => `--- PAGE ${p.pageNumber} ---\n\n${p.text}`).join('\n\n');
  const avgConfidence = numPages > 0 ? Math.round(totalConfidence / numPages) : 0;

  return {
    text: fullText,
    confidence: avgConfidence,
    pagesText,
  };
}

/**
 * Burn redaction boxes physically onto PDF canvas so underlying text is erased
 */
export async function burnRedactionsToPdf(
  fileBuffer: ArrayBuffer,
  redactions: RedactionBox[],
  onProgress?: (progress: number) => void
): Promise<Uint8Array> {
  const loadingTask = pdfjsLib.getDocument({ data: new Uint8Array(fileBuffer) });
  const pdf = await loadingTask.promise;
  const newPdf = await PDFDocument.create();
  const numPages = pdf.numPages;

  for (let i = 1; i <= numPages; i++) {
    if (onProgress) onProgress(Math.round(((i - 1) / numPages) * 100));

    const pageIndex = i - 1;
    const pageRedactions = redactions.filter((r) => r.pageIndex === pageIndex);

    const page = await pdf.getPage(i);
    const viewport = page.getViewport({ scale: 1.5 });
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    if (!context) continue;
    canvas.width = viewport.width;
    canvas.height = viewport.height;

    await (page.render as any)({
      canvasContext: context,
      viewport,
      canvas,
    }).promise;

    // Draw redaction boxes onto canvas
    pageRedactions.forEach((box) => {
      const rx = (box.x / 100) * canvas.width;
      const ry = (box.y / 100) * canvas.height;
      const rw = (box.width / 100) * canvas.width;
      const rh = (box.height / 100) * canvas.height;

      if (box.type === 'whiteout') {
        context.fillStyle = '#FFFFFF';
        context.fillRect(rx, ry, rw, rh);
      } else if (box.type === 'blur') {
        context.filter = 'blur(8px)';
        context.fillRect(rx, ry, rw, rh);
        context.filter = 'none';
      } else {
        // Blackout default
        context.fillStyle = '#000000';
        context.fillRect(rx, ry, rw, rh);
      }
    });

    const pngDataUrl = canvas.toDataURL('image/png');
    const pngImageBytes = dataUriToUint8Array(pngDataUrl);
    const embeddedImage = await newPdf.embedPng(pngImageBytes);

    const newPage = newPdf.addPage([viewport.width / 1.5, viewport.height / 1.5]);
    newPage.drawImage(embeddedImage, {
      x: 0,
      y: 0,
      width: viewport.width / 1.5,
      height: viewport.height / 1.5,
    });
  }

  if (onProgress) onProgress(100);
  return await newPdf.save();
}

/**
 * Merge multiple PDF file buffers into one
 */
export async function mergePdfs(pdfBuffers: ArrayBuffer[]): Promise<Uint8Array> {
  const mergedPdf = await PDFDocument.create();

  for (const buffer of pdfBuffers) {
    const pdf = await PDFDocument.load(buffer);
    const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
    copiedPages.forEach((page) => mergedPdf.addPage(page));
  }

  return await mergedPdf.save();
}

/**
 * Split PDF by page numbers/indices
 */
export async function splitPdf(
  fileBuffer: ArrayBuffer,
  selectedPageIndices: number[]
): Promise<Uint8Array> {
  const srcPdf = await PDFDocument.load(fileBuffer);
  const newPdf = await PDFDocument.create();

  const copiedPages = await newPdf.copyPages(srcPdf, selectedPageIndices);
  copiedPages.forEach((page) => newPdf.addPage(page));

  return await newPdf.save();
}

/**
 * Burn e-signatures, dates, text annotations, and stamps into PDF
 */
export async function burnSignaturesAndFields(
  fileBuffer: ArrayBuffer,
  fields: SignatureField[]
): Promise<Uint8Array> {
  const pdfDoc = await PDFDocument.load(fileBuffer);
  const helveticaFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  for (const field of fields) {
    const pages = pdfDoc.getPages();
    if (field.pageIndex < 0 || field.pageIndex >= pages.length) continue;

    const page = pages[field.pageIndex];
    const { width: pageWidth, height: pageHeight } = page.getSize();

    // Convert percentage coordinates to PDF points (PDF Y is 0 at bottom)
    const pdfX = (field.x / 100) * pageWidth;
    const pdfY = pageHeight - (field.y / 100) * pageHeight - (field.height / 100) * pageHeight;
    const pdfW = (field.width / 100) * pageWidth;
    const pdfH = (field.height / 100) * pageHeight;

    if (field.type === 'signature' && field.content.startsWith('data:image')) {
      const imageBytes = dataUriToUint8Array(field.content);
      const isPng = field.content.includes('png') || field.content.includes('image/png');
      const image = isPng
        ? await pdfDoc.embedPng(imageBytes)
        : await pdfDoc.embedJpg(imageBytes);

      page.drawImage(image, {
        x: pdfX,
        y: pdfY,
        width: Math.max(pdfW, 40),
        height: Math.max(pdfH, 20),
      });
    } else if (field.type === 'text' || field.type === 'date') {
      const fontSize = field.fontSize || 14;
      // Filter out non-WinAnsi unencodable characters to prevent pdf-lib drawText errors
      const safeText = field.content ? field.content.replace(/[^\x00-\x7F]/g, '') || field.content : '';
      page.drawText(safeText, {
        x: pdfX,
        y: pdfY + pdfH * 0.2, // Align text baseline
        size: fontSize,
        font: helveticaFont,
        color: rgb(0.05, 0.05, 0.2),
      });
    } else if (field.type === 'checkmark') {
      page.drawText('✓', {
        x: pdfX,
        y: pdfY,
        size: Math.max(pdfH * 0.8, 16),
        font: helveticaFont,
        color: rgb(0.1, 0.6, 0.2),
      });
    } else if (field.type === 'stamp') {
      // Draw stamp border and text
      page.drawRectangle({
        x: pdfX,
        y: pdfY,
        width: Math.max(pdfW, 100),
        height: Math.max(pdfH, 36),
        borderColor: rgb(0.8, 0.1, 0.1),
        borderWidth: 2,
        color: rgb(0.98, 0.9, 0.9),
      });

      page.drawText(field.content || 'APPROVED', {
        x: pdfX + 10,
        y: pdfY + 10,
        size: 14,
        font: helveticaFont,
        color: rgb(0.8, 0.1, 0.1),
      });
    }
  }

  return await pdfDoc.save();
}

/**
 * Convert Image files to a single PDF
 */
export async function imagesToPdf(
  imageFiles: File[],
  orientation: 'portrait' | 'landscape' = 'portrait',
  pageSize: 'a4' | 'letter' | 'fit' = 'a4'
): Promise<Uint8Array> {
  const pdfDoc = await PDFDocument.create();

  for (const file of imageFiles) {
    const arrayBuffer = await file.arrayBuffer();
    const isPng = file.type.includes('png');
    const image = isPng ? await pdfDoc.embedPng(arrayBuffer) : await pdfDoc.embedJpg(arrayBuffer);

    let pWidth = 595.28; // A4 width
    let pHeight = 841.89; // A4 height

    if (pageSize === 'fit') {
      pWidth = image.width;
      pHeight = image.height;
    } else if (pageSize === 'letter') {
      pWidth = 612;
      pHeight = 792;
    }

    if (orientation === 'landscape' && pageSize !== 'fit') {
      const temp = pWidth;
      pWidth = pHeight;
      pHeight = temp;
    }

    const page = pdfDoc.addPage([pWidth, pHeight]);

    // Scale image to fit within margins
    const margin = 20;
    const availWidth = pWidth - margin * 2;
    const availHeight = pHeight - margin * 2;

    const scaleFactor = Math.min(availWidth / image.width, availHeight / image.height);
    const drawW = image.width * scaleFactor;
    const drawH = image.height * scaleFactor;

    const x = (pWidth - drawW) / 2;
    const y = (pHeight - drawH) / 2;

    page.drawImage(image, {
      x,
      y,
      width: drawW,
      height: drawH,
    });
  }

  return await pdfDoc.save();
}

/**
 * Rotate specific pages in PDF
 */
export async function rotatePdfPages(
  fileBuffer: ArrayBuffer,
  pageRotations: Record<number, number>
): Promise<Uint8Array> {
  const pdfDoc = await PDFDocument.load(fileBuffer);
  const pages = pdfDoc.getPages();

  Object.entries(pageRotations).forEach(([indexStr, angle]) => {
    const idx = parseInt(indexStr, 10);
    if (idx >= 0 && idx < pages.length) {
      const currentRotation = pages[idx].getRotation().angle;
      pages[idx].setRotation(degrees((currentRotation + angle) % 360));
    }
  });

  return await pdfDoc.save();
}
