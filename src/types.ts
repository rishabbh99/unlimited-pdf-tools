export type ToolId = 
  | 'compress'
  | 'ocr'
  | 'redact'
  | 'merge'
  | 'split'
  | 'sign'
  | 'fill'
  | 'images-to-pdf'
  | 'pdf-to-images'
  | 'rotate'
  | 'protect';

export interface ToolConfig {
  id: ToolId;
  path: string;
  name: string;
  shortName: string;
  tagline: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  iconName: string;
  badge?: string;
  category: 'edit' | 'convert' | 'security' | 'organize';
  popular?: boolean;
}

export interface RedactionBox {
  id: string;
  pageIndex: number;
  x: number; // percentage or px on canvas
  y: number;
  width: number;
  height: number;
  type: 'blackout' | 'whiteout' | 'blur';
  label?: string;
}

export interface SignatureField {
  id: string;
  pageIndex: number;
  x: number; // percentage relative to page width (0 to 100)
  y: number; // percentage relative to page height (0 to 100)
  width: number; // width in px or percentage
  height: number;
  type: 'text' | 'checkmark' | 'signature' | 'date' | 'stamp';
  content: string; // text content, or base64 data URL for drawn signature
  color?: string;
  fontSize?: number;
  fontFamily?: string;
}

export interface PdfPagePreview {
  pageNumber: number;
  pageIndex: number;
  dataUrl: string;
  width: number;
  height: number;
  rotation: number;
  selected?: boolean;
}

export interface CompressionSettings {
  level: 'extreme' | 'recommended' | 'high-quality' | 'custom';
  dpi: number;
  imageQuality: number; // 0.1 to 1.0
  removeMetadata: boolean;
}

export interface OcrResult {
  text: string;
  confidence: number;
  pagesText: { pageNumber: number; text: string }[];
}

export interface SchemaFaqItem {
  question: string;
  answer: string;
}

export interface SchemaHowToStep {
  name: string;
  text: string;
}

export interface ToolSeoConfig {
  h1Title: string;
  subTitle: string;
  descriptionText: string;
  features: string[];
  howToSteps: SchemaHowToStep[];
  faqs: SchemaFaqItem[];
}
