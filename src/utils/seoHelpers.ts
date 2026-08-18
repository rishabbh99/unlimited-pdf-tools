import { ToolConfig, ToolId, ToolSeoConfig } from '../types';
import { SEO_PAGES, getSeoPageBySlug, SeoPageData } from '../data/seoPages';

export const ALL_TOOLS: ToolConfig[] = [
  {
    id: 'compress',
    path: '/compress-pdf-unlimited',
    name: 'Unlimited PDF Compressor',
    shortName: 'Compress PDF',
    tagline: 'Reduce PDF file size up to 90% without losing quality directly in your browser.',
    metaTitle: '100% Free Unlimited PDF Compressor Online - Private & Client-Side',
    metaDescription: 'Compress PDF files online for free without limits or registration. 100% client-side privacy. Reduce PDF size up to 90% instantly in your browser.',
    keywords: ['compress pdf', 'reduce pdf size', 'pdf compressor unlimited', 'compress pdf client side', 'free pdf shrinker', 'small pdf online'],
    iconName: 'Minimize2',
    badge: 'Unlimited',
    category: 'edit',
    popular: true,
  },
  {
    id: 'ocr',
    path: '/scanned-pdf-to-text-ocr-free',
    name: 'Scanned PDF to Text (OCR)',
    shortName: 'PDF OCR',
    tagline: 'Extract editable text from scanned documents & image PDFs using AI OCR in browser.',
    metaTitle: 'Free Scanned PDF to Text OCR Converter Online - No Server Uploads',
    metaDescription: 'Convert scanned PDF to editable text with 100% private browser OCR. Supports 100+ languages, multi-page PDFs, and TXT/DOCX text export.',
    keywords: ['pdf ocr', 'scanned pdf to text', 'extract text from pdf', 'free online ocr', 'browser pdf ocr', 'image pdf text converter'],
    iconName: 'FileSearch',
    badge: 'AI Powered',
    category: 'convert',
    popular: true,
  },
  {
    id: 'redact',
    path: '/remove-sensitive-info-pdf',
    name: 'Permanent Sensitive Data Eraser',
    shortName: 'Redact PDF',
    tagline: 'Visual editor to permanently blackout, redact, or whiteout sensitive info & numbers.',
    metaTitle: 'Permanently Redact & Erase Sensitive Info from PDF Free Online',
    metaDescription: 'Blackout sensitive text, SSN, credit cards, or names in PDFs permanently. 100% browser-side burning ensures text is never recoverable.',
    keywords: ['redact pdf free', 'remove sensitive info pdf', 'blackout pdf text', 'pdf redactor online', 'sanitize pdf client side'],
    iconName: 'Eraser',
    badge: '100% Secure',
    category: 'security',
    popular: true,
  },
  {
    id: 'merge',
    path: '/merge-pdf',
    name: 'PDF Merger',
    shortName: 'Merge PDF',
    tagline: 'Combine multiple PDF files into one seamless document with page reordering.',
    metaTitle: 'Free PDF Merger Online - Combine Unlimited PDF Files Instantly',
    metaDescription: 'Merge PDF files into a single document online for free. Drag and drop ordering, page selection, 100% browser native with zero file limits.',
    keywords: ['merge pdf', 'combine pdf files', 'join pdfs online', 'unlimited pdf merger', 'combine pdf pages free'],
    iconName: 'Layers',
    badge: 'Fast',
    category: 'organize',
    popular: true,
  },
  {
    id: 'split',
    path: '/split-pdf',
    name: 'PDF Splitter & Extractor',
    shortName: 'Split PDF',
    tagline: 'Extract specific pages or split large PDF files into individual documents.',
    metaTitle: 'Free PDF Splitter - Extract PDF Pages Online without Limits',
    metaDescription: 'Split PDF files online for free. Extract custom page ranges or separate all pages into instant downloads. 100% browser privacy guaranteed.',
    keywords: ['split pdf', 'extract pdf pages', 'separate pdf pages', 'free pdf splitter online', 'cut pdf pages'],
    iconName: 'Scissors',
    badge: 'Instant',
    category: 'organize',
    popular: true,
  },
  {
    id: 'sign',
    path: '/sign-pdf',
    name: 'PDF Signer & Digital Form Filler',
    shortName: 'Sign PDF',
    tagline: 'Sign contracts, fill forms, add typed text, checkmarks, & hand-drawn signatures.',
    metaTitle: 'Free PDF Form Filler & Digital Signer - Sign PDFs Online',
    metaDescription: 'Sign PDF documents online for free. Draw your signature, type text, add stamps, dates, and checkmarks. 100% private client-side processing.',
    keywords: ['sign pdf free', 'digital signature pdf', 'fill pdf form online', 'e-sign pdf client side', 'draw signature on pdf'],
    iconName: 'FilePenLine',
    badge: 'E-Sign',
    category: 'edit',
    popular: true,
  },
  {
    id: 'images-to-pdf',
    path: '/images-to-pdf',
    name: 'Images to PDF Converter',
    shortName: 'Image to PDF',
    tagline: 'Convert JPG, PNG, WEBP, and BMP images into a clean multi-page PDF document.',
    metaTitle: 'Free JPG & PNG to PDF Converter Online - 100% Private',
    metaDescription: 'Convert images (JPG, PNG, WEBP) into a single high-quality PDF document instantly. Adjust margins, page orientation, and compression.',
    keywords: ['jpg to pdf', 'image to pdf', 'png to pdf converter', 'convert pictures to pdf free', 'combine photos into pdf'],
    iconName: 'Image',
    badge: 'Multi-Format',
    category: 'convert',
    popular: true,
  },
  {
    id: 'pdf-to-images',
    path: '/pdf-to-images',
    name: 'PDF to High-Res Images',
    shortName: 'PDF to JPG',
    tagline: 'Convert every page of your PDF into crisp PNG or JPG image files.',
    metaTitle: 'Convert PDF to High-Res JPG/PNG Images Free Online',
    metaDescription: 'Extract high-resolution JPG or PNG images from PDF pages online. 100% browser-based conversion with individual or batch ZIP download.',
    keywords: ['pdf to jpg', 'pdf to png', 'convert pdf to images', 'extract pictures from pdf', 'high quality pdf to image'],
    iconName: 'FileImage',
    badge: 'High DPI',
    category: 'convert',
  },
  {
    id: 'rotate',
    path: '/rotate-pdf',
    name: 'PDF Rotate & Organize Pages',
    shortName: 'Rotate PDF',
    tagline: 'Rotate individual pages 90°, 180°, or 270° and re-organize page sequence.',
    metaTitle: 'Rotate & Organize PDF Pages Free Online - Instant Save',
    metaDescription: 'Rotate PDF pages permanently online. Turn portrait to landscape, reorder pages, and delete unwanted pages in seconds.',
    keywords: ['rotate pdf pages', 'turn pdf landscape', 'reorder pdf pages', 'rotate single page pdf', 'organize pdf free'],
    iconName: 'RotateCw',
    badge: 'Easy',
    category: 'organize',
  },
  {
    id: 'protect',
    path: '/protect-pdf',
    name: 'PDF Password Protect & Unlock',
    shortName: 'Protect PDF',
    tagline: 'Encrypt PDFs with standard passwords or strip security restrictions.',
    metaTitle: 'Password Protect PDF Online Free - Client-Side Encryption',
    metaDescription: 'Add strong password encryption to your PDF files online. Keep confidential documents safe with 100% browser-side security.',
    keywords: ['protect pdf password', 'encrypt pdf free', 'lock pdf file', 'add password to pdf', 'secure pdf online'],
    iconName: 'ShieldCheck',
    badge: '256-Bit',
    category: 'security',
  },
  {
    id: 'packager',
    path: '/govt-exam-form-packager',
    name: '1-Click Govt Exam & College Form Packager',
    shortName: 'Form Packager',
    tagline: 'Resize photo < 50KB, signature < 20KB, and merge all documents into 1 PDF under strict portal limits (200KB).',
    metaTitle: '1-Click Govt Exam & College Form Packager - Photo, Signature & PDF Resizer (< 200KB)',
    metaDescription: '100% free, private form packager for UPSC, SSC, NTA, JEE, NEET, and College Admission portals. Auto-crop photo 3.5x4.5cm, whiten signature, and combine all documents into 1 PDF under 200KB.',
    keywords: ['govt exam form packager', 'upsc photo resizer', 'ssc signature 20kb', 'combine documents for college admission 200kb', 'nta neet photo compressor', 'compress pdf to 200kb for govt form'],
    iconName: 'FileCheck2',
    badge: '1-Click Package',
    category: 'edit',
    popular: true,
  },
];


export interface PathMappingInfo {
  toolId: ToolId;
  overrideTitle?: string;
  overrideMetaTitle?: string;
  overrideDesc?: string;
  h1?: string;
}

export const PATH_TO_TOOL_MAP: Record<string, PathMappingInfo> = {
  '/pdf-converter': {
    toolId: 'images-to-pdf',
    overrideTitle: 'PDF Converter',
    overrideMetaTitle: 'Free Online PDF Converter - Convert PDF, Images & Documents',
    overrideDesc: 'Free and 100% private client-side PDF converter. Convert JPG, PNG, WEBP images into clean PDFs or extract high-res images directly in your browser.',
    h1: 'Free Online Client-Side PDF Converter'
  },
  '/pdf-to-word': {
    toolId: 'ocr',
    overrideTitle: 'PDF to Word',
    overrideMetaTitle: 'Free PDF to Word & Text Converter Online - OCR Powered',
    overrideDesc: 'Convert PDF to editable text and Word document content with 100% private browser OCR. Zero server uploads, supports multi-page PDFs.',
    h1: 'Free PDF to Word & Text Converter (OCR)'
  },
  '/word-to-pdf': {
    toolId: 'images-to-pdf',
    overrideTitle: 'Word to PDF',
    overrideMetaTitle: 'Free Word & Document to PDF Converter Online',
    overrideDesc: 'Convert Word document contents and images into professional PDF files instantly in your browser with 100% client-side security.',
    h1: 'Free Word & Document to PDF Converter'
  },
  '/pdf-compressor': {
    toolId: 'compress',
    overrideTitle: 'PDF Compressor',
    overrideMetaTitle: 'Free Unlimited PDF Compressor Online - Reduce File Size',
    overrideDesc: 'Compress PDF files online up to 90% size reduction without quality loss. 100% client-side memory processing with zero limits.',
    h1: 'Free Unlimited PDF Compressor'
  },
  '/compress-pdf': {
    toolId: 'compress',
    overrideTitle: 'Compress PDF',
    overrideMetaTitle: 'Compress PDF Online Free - 100% Private Client-Side',
    overrideDesc: 'Compress PDF files online fast without losing quality or clarity. 100% private browser processing with zero limits or server uploads.',
    h1: 'Compress PDF Online Free & Unlimited'
  },
  '/compress-pdf-unlimited': {
    toolId: 'compress',
    overrideTitle: 'Unlimited PDF Compressor',
    overrideMetaTitle: '100% Free Unlimited PDF Compressor Online - Private & Client-Side',
    overrideDesc: 'Unlimited PDF compressor working 100% inside browser RAM. Reduce PDF file size up to 90% instantly with zero server uploads or fees.',
    h1: '100% Free Unlimited Client-Side PDF Compressor'
  },
  '/merge-pdf': {
    toolId: 'merge',
    overrideTitle: 'Merge PDF',
    overrideMetaTitle: 'Free PDF Merger Online - Combine Unlimited PDF Files',
    overrideDesc: 'Combine multiple PDF documents into a single organized PDF file online for free. Drag and drop page reordering with zero file limits.',
    h1: 'Free PDF Merger - Combine PDF Files Online'
  },
  '/split-pdf': {
    toolId: 'split',
    overrideTitle: 'Split PDF',
    overrideMetaTitle: 'Free PDF Splitter Online - Extract Pages from PDF',
    overrideDesc: 'Split large PDF documents or extract specific page ranges into instant separate file downloads with 100% browser privacy.',
    h1: 'Free PDF Splitter & Page Extractor'
  },
  '/edit-pdf': {
    toolId: 'sign',
    overrideTitle: 'Edit PDF',
    overrideMetaTitle: 'Free Online PDF Editor - Add Text, Sign & Fill PDF Forms',
    overrideDesc: 'Edit PDF files online for free. Add text blocks, place checkmarks, draw signatures, insert dates, and fill forms without installing software.',
    h1: 'Free Online Client-Side PDF Editor'
  },
  '/pdf-editor': {
    toolId: 'sign',
    overrideTitle: 'PDF Editor',
    overrideMetaTitle: 'Free PDF Editor Online - Type, Annotate & Sign PDF Files',
    overrideDesc: 'Complete online PDF editor working 100% inside your browser memory. Type, erase, sign, and modify PDF documents securely.',
    h1: 'Free Online PDF Editor & Form Filler'
  },
  '/jpg-to-pdf': {
    toolId: 'images-to-pdf',
    overrideTitle: 'JPG to PDF',
    overrideMetaTitle: 'Free JPG & PNG to PDF Converter Online - Fast & Private',
    overrideDesc: 'Convert JPG, PNG, and WEBP images into clean PDF documents instantly. Customize page margins, orientation, and image ordering.',
    h1: 'Free JPG to PDF Converter Online'
  },
  '/pdf-to-jpg': {
    toolId: 'pdf-to-images',
    overrideTitle: 'PDF to JPG',
    overrideMetaTitle: 'Convert PDF to High-Res JPG Images Free Online',
    overrideDesc: 'Extract every page of your PDF into high-quality JPG or PNG images. Download individual page images or batch ZIP archives.',
    h1: 'Convert PDF to High-Res JPG Images'
  },
  '/ocr-pdf': {
    toolId: 'ocr',
    overrideTitle: 'OCR PDF',
    overrideMetaTitle: 'Free OCR PDF Tool - Extract Text from Scanned PDFs',
    overrideDesc: 'Extract searchable text from scanned PDF pages and photos using WebAssembly Tesseract OCR. 100% private browser processing.',
    h1: 'Free OCR PDF - Scanned PDF to Text Extractor'
  },
  '/scanned-pdf-to-text-ocr-free': {
    toolId: 'ocr',
    overrideTitle: 'Scanned PDF to Text OCR',
    overrideMetaTitle: 'Free Scanned PDF to Text OCR Converter Online - No Server Uploads',
    overrideDesc: 'Convert scanned PDFs into editable text with 100% private browser OCR. Supports multi-page documents and TXT or DOCX export.',
    h1: 'Free Client-Side Scanned PDF to Text (OCR)'
  },
  '/sign-pdf': {
    toolId: 'sign',
    overrideTitle: 'Sign PDF',
    overrideMetaTitle: 'Free PDF Signer & Digital Form Filler Online',
    overrideDesc: 'Sign PDF contracts, agreements, and forms online for free. Draw your signature or type text with 100% private browser security.',
    h1: 'Free PDF Signer & Digital Form Filler'
  },
  '/fill-pdf': {
    toolId: 'sign',
    overrideTitle: 'Fill PDF',
    overrideMetaTitle: 'Free PDF Form Filler Online - Type Fields & Checkmarks',
    overrideDesc: 'Fill out PDF forms, applications, and questionnaires online for free. Type text, add checkmarks, stamps, and dates with 100% privacy.',
    h1: 'Free Online PDF Form Filler'
  },
  '/protect-pdf': {
    toolId: 'protect',
    overrideTitle: 'Protect PDF',
    overrideMetaTitle: 'Password Protect PDF Online Free - Client-Side Encryption',
    overrideDesc: 'Encrypt sensitive PDF files with password protection online for free. 100% browser-based encryption keeps your documents safe.',
    h1: 'Password Protect & Encrypt PDF Online'
  },
  '/unlock-pdf': {
    toolId: 'protect',
    overrideTitle: 'Unlock PDF',
    overrideMetaTitle: 'Free PDF Unlocker Online - Remove PDF Password Restrictions',
    overrideDesc: 'Remove owner passwords and printing restrictions from your PDF files online for free. 100% browser-side removal with total privacy.',
    h1: 'Free PDF Unlocker & Restriction Remover'
  },
  '/rotate-pdf': {
    toolId: 'rotate',
    overrideTitle: 'Rotate PDF',
    overrideMetaTitle: 'Free PDF Rotate & Page Organizer Online',
    overrideDesc: 'Rotate PDF pages 90°, 180°, or 270° permanently online. Reorder pages and fix misaligned scanned documents in seconds with 100% privacy.',
    h1: 'Free PDF Rotate & Page Organizer'
  },
  '/delete-pdf-pages': {
    toolId: 'rotate',
    overrideTitle: 'Delete PDF Pages',
    overrideMetaTitle: 'Delete PDF Pages Free Online - Remove Unwanted Pages',
    overrideDesc: 'Delete unwanted pages from your PDF documents online for free. Fast 1-click page removal and reordering with 100% client-side privacy.',
    h1: 'Delete PDF Pages & Organize PDF Online'
  },
  '/organize-pdf': {
    toolId: 'rotate',
    overrideTitle: 'Organize PDF',
    overrideMetaTitle: 'Free Organize PDF Tool - Reorder, Rotate & Delete Pages',
    overrideDesc: 'Organize PDF pages online for free. Reorder page sequences, rotate sideways pages, and delete unwanted pages with 100% browser privacy.',
    h1: 'Free Organize PDF Tool'
  },
  '/govt-exam-form-packager': {
    toolId: 'packager',
    overrideTitle: '1-Click Govt Exam & College Form Packager',
    overrideMetaTitle: '1-Click Govt Exam Form Packager - Photo < 50KB, Signature < 20KB, PDF < 200KB',
    overrideDesc: 'Resize photo to 3.5x4.5cm < 50KB, signature to < 20KB, and merge all documents into 1 PDF under 200KB for UPSC, SSC, and College Admissions.',
    h1: '1-Click Govt Exam & College Form Packager'
  },
  '/college-admission-form-packager': {
    toolId: 'packager',
    overrideTitle: 'College Admission Form Packager',
    overrideMetaTitle: 'College Admission Document Packager - Merge All Docs into 1 PDF < 200KB',
    overrideDesc: 'Combine passport photo, signature, ID proof, and marksheets into a single PDF under 200KB for college and university admission forms.',
    h1: 'College & University Admission Document Packager'
  },
  '/form-packager': {
    toolId: 'packager',
    overrideTitle: 'Online Form Packager',
    overrideMetaTitle: 'Online Exam Form Packager & Resizer - 100% Client-Side Privacy',
    overrideDesc: '1-Click packaging tool for online application forms. Resize images to standard dimensions and compress combined PDF below portal limits.',
    h1: 'Online Exam & Admission Form Packager'
  }
};


export function getToolByPath(path: string): ToolConfig | undefined {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  const slug = cleanPath.replace(/^\//, '');

  // 1. Check Programmatic SEO Pages Dataset first
  const seoPage = getSeoPageBySlug(slug);
  if (seoPage) {
    const baseTool = ALL_TOOLS.find(t => t.id === seoPage.toolId);
    if (baseTool) {
      return {
        ...baseTool,
        path: cleanPath,
        name: seoPage.title,
        shortName: seoPage.shortName,
        metaTitle: seoPage.metaTitle,
        metaDescription: seoPage.metaDescription,
        badge: seoPage.badge || baseTool.badge,
        keywords: seoPage.targetKeywords,
      };
    }
  }

  // 2. Check Static Path Mapping
  const mapped = PATH_TO_TOOL_MAP[cleanPath];
  if (mapped) {
    const baseTool = ALL_TOOLS.find(t => t.id === mapped.toolId);
    if (baseTool) {
      return {
        ...baseTool,
        path: cleanPath,
        name: mapped.overrideTitle || baseTool.name,
        shortName: mapped.overrideTitle || baseTool.shortName,
        metaTitle: mapped.overrideMetaTitle || baseTool.metaTitle,
        metaDescription: mapped.overrideDesc || baseTool.metaDescription,
      };
    }
  }

  // 3. Check direct path on ALL_TOOLS
  return ALL_TOOLS.find((t) => t.path === cleanPath);
}

export const TOOL_SEO_DETAILS: Record<ToolId, ToolSeoConfig> = {
  compress: {
    h1Title: '100% Free Unlimited Client-Side PDF Compressor',
    subTitle: 'Compress PDF file size up to 90% directly in your browser. Zero file size limits, zero server uploads, total privacy.',
    descriptionText: 'Our client-side PDF compressor uses WebAssembly and high-performance Web Canvas rendering to compress embedded raster images, streamline PDF font streams, and strip unnecessary metadata objects. Because processing happens 100% inside your local browser sandbox, your confidential files never touch an external server.',
    features: [
      '100% Client-Side WebAssembly Processing for absolute privacy',
      'Choose between Extreme, Recommended, and High Quality compression profiles',
      'No file size restrictions, no page count caps, and no daily conversion limits',
      'Preserve crisp vector text quality while shrinking embedded images'
    ],
    howToSteps: [
      { name: 'Upload PDF File', text: 'Select or drop your PDF document into the compressor zone.' },
      { name: 'Choose Compression Mode', text: 'Select Recommended, Extreme, or High Quality mode.' },
      { name: 'Download Compressed PDF', text: 'Save your optimized, smaller PDF instantly.' }
    ],
    faqs: [
      {
        question: 'Is there any daily limit on PDF compression?',
        answer: 'No! PDFUltraHub allows unlimited PDF compression with zero daily restrictions or paywalls.'
      },
      {
        question: 'Are my confidential documents uploaded to any server?',
        answer: 'Never! All compression operations run 100% locally in your browser RAM using client-side JavaScript.'
      },
      {
        question: 'How much can PDFUltraHub reduce my PDF size?',
        answer: 'Depending on the image quality setting, file sizes can be reduced up to 90% while maintaining crisp readability.'
      }
    ]
  },
  ocr: {
    h1Title: 'Free Client-Side Scanned PDF to Text (OCR)',
    subTitle: 'Extract editable text from scanned documents & image PDFs using browser-native AI OCR.',
    descriptionText: 'Transform non-searchable scanned PDFs and image documents into plain editable text. Tesseract WebAssembly engine compiles optical character recognition models inside browser RAM.',
    features: [
      'Optical Character Recognition powered by WebAssembly',
      'Multi-language accuracy for printed & scanned text',
      'Extract text per page or copy entire document text',
      '100% browser-based text extraction'
    ],
    howToSteps: [
      { name: 'Select Scanned PDF', text: 'Upload your scanned document or image PDF.' },
      { name: 'Run Browser OCR Engine', text: 'Wait a few seconds while Tesseract processes pages in RAM.' },
      { name: 'Copy or Download Text', text: 'Export extracted text as TXT or copy to clipboard.' }
    ],
    faqs: [
      {
        question: 'Does this OCR tool support multi-page scanned documents?',
        answer: 'Yes! PDFUltraHub extracts text from every page of multi-page scanned PDF documents.'
      },
      {
        question: 'Is my scanned text kept private?',
        answer: 'Yes, 100%! The OCR model runs locally in your browser. No document images are sent over the network.'
      }
    ]
  },
  redact: {
    h1Title: 'Permanently Redact & Erase Sensitive PDF Info',
    subTitle: 'Blackout sensitive text, SSN numbers, credit cards, or names permanently before sharing.',
    descriptionText: 'Redact sensitive information by burning solid black or white boxes over confidential content. Redactions burn directly into the visual page canvas stream so text cannot be highlighted or recovered.',
    features: [
      'Visual point-and-drag box drawer',
      'Choose between Blackout, Whiteout, and Blur redaction styles',
      'Permanent vector rasterization prevents text recovery',
      '100% private local execution'
    ],
    howToSteps: [
      { name: 'Upload Confidential PDF', text: 'Open the document requiring redaction.' },
      { name: 'Draw Redaction Boxes', text: 'Click and drag over sensitive text or numbers.' },
      { name: 'Burn Redactions & Download', text: 'Click "Apply Permanent Redactions" to generate secure PDF.' }
    ],
    faqs: [
      {
        question: 'Can someone undo redactions created with PDFUltraHub?',
        answer: 'No! Redacted areas are permanently burned onto the page raster matrix before saving.'
      }
    ]
  },
  merge: {
    h1Title: 'Free Unlimited PDF Merger & Combiner',
    subTitle: 'Combine multiple PDF files into one seamless document with drag-and-drop page ordering.',
    descriptionText: 'Join multiple PDF documents into a single organized file. Reorder documents, delete individual pages, and save unified PDF files in seconds.',
    features: [
      'Merge unlimited PDF files in one session',
      'Drag and drop reordering of files and thumbnails',
      'Fast client-side compilation using pdf-lib',
      'Zero size or page count restrictions'
    ],
    howToSteps: [
      { name: 'Choose PDF Files', text: 'Select two or more PDF files from your device.' },
      { name: 'Arrange File Order', text: 'Drag thumbnails to set your preferred page sequence.' },
      { name: 'Merge & Save', text: 'Click "Merge PDFs" to download your combined document.' }
    ],
    faqs: [
      {
        question: 'How many PDF files can I merge at once?',
        answer: 'There is no limit! You can merge as many files as your device memory can handle.'
      }
    ]
  },
  split: {
    h1Title: 'Free PDF Splitter & Page Extractor',
    subTitle: 'Extract specific page ranges or separate all pages into individual files.',
    descriptionText: 'Split large PDF documents into smaller files or extract individual pages instantly without re-uploading documents.',
    features: [
      'Extract custom page ranges (e.g. 1-3, 5, 8-10)',
      'Split all pages into separate single-page PDFs',
      'Interactive visual thumbnail selection',
      'Instant client-side download'
    ],
    howToSteps: [
      { name: 'Upload PDF', text: 'Select the file you want to split.' },
      { name: 'Select Page Range', text: 'Type page numbers or click page thumbnails.' },
      { name: 'Extract & Download', text: 'Click "Split PDF" to save your extracted document.' }
    ],
    faqs: [
      {
        question: 'Can I select non-consecutive pages to split?',
        answer: 'Yes! You can specify exact page numbers like 1, 4, 7-9.'
      }
    ]
  },
  sign: {
    h1Title: 'Free PDF Signer & Digital Form Filler',
    subTitle: 'Sign contracts, fill form fields, add typed text, checkmarks, & hand-drawn signatures.',
    descriptionText: 'Fill out PDF forms, type responses, place checkmarks, and sign documents e-signature style using your mouse, touch screen, or stylus.',
    features: [
      'Draw smooth digital hand signatures or type e-signatures',
      'Add custom text fields, checkmarks, and date stamps',
      'Interactive page preview with drag-and-drop elements',
      '100% private client-side form signing'
    ],
    howToSteps: [
      { name: 'Upload PDF Contract', text: 'Select the document or form to sign.' },
      { name: 'Add Signature / Text', text: 'Draw your signature or click to type form text.' },
      { name: 'Export Signed PDF', text: 'Save your completed, signed PDF document.' }
    ],
    faqs: [
      {
        question: 'Is my digital signature saved on any remote server?',
        answer: 'No! Your signature is processed exclusively inside your device browser RAM.'
      }
    ]
  },
  fill: {
    h1Title: 'Free Online PDF Form Filler',
    subTitle: 'Type text fields, add checkmarks, dates, and stamps into non-interactive or interactive PDF forms.',
    descriptionText: 'Fill out PDF forms, tax forms, applications, and surveys online without requiring Adobe Acrobat. All fields are rendered in high quality directly on browser canvas.',
    features: [
      'Type text fields anywhere on PDF form pages',
      'Checkmark, date stamp, and text annotation tools',
      '100% private client-side PDF form editing',
      'Instant completed document export'
    ],
    howToSteps: [
      { name: 'Upload PDF Form', text: 'Open your document in the form filler.' },
      { name: 'Add Text & Checkmarks', text: 'Click anywhere to place text annotations and form entries.' },
      { name: 'Export Filled Form', text: 'Download your completed PDF.' }
    ],
    faqs: [
      {
        question: 'Can I fill forms without an Adobe subscription?',
        answer: 'Yes! Our form filler is 100% free and works in any standard web browser without software installation.'
      }
    ]
  },
  'images-to-pdf': {
    h1Title: 'Free JPG & PNG to PDF Converter',
    subTitle: 'Convert photos, scans, and graphic images into clean multi-page PDF documents.',
    descriptionText: 'Combine JPG, PNG, WEBP, and BMP images into a single PDF document. Customize page orientation (portrait/landscape), margin spacing, and image alignment before saving.',
    features: [
      'Supports JPG, PNG, WEBP, GIF, and BMP image formats',
      'Adjust margins, page orientation, and paper size (A4, Letter, Fit to Image)',
      'Re-order image thumbnails before compilation',
      '100% private client-side processing'
    ],
    howToSteps: [
      { name: 'Upload Images', text: 'Drag and drop your image files into the converter.' },
      { name: 'Configure Layout', text: 'Set orientation, margins, and sequence.' },
      { name: 'Convert to PDF', text: 'Click "Generate PDF" to download your PDF document.' }
    ],
    faqs: [
      {
        question: 'Can I combine different image formats into one PDF?',
        answer: 'Yes! You can select a mix of JPG, PNG, and WEBP files and combine them seamlessly.'
      }
    ]
  },
  'pdf-to-images': {
    h1Title: 'Convert PDF to High-Res JPG & PNG Images',
    subTitle: 'Render and save PDF pages as high-resolution image files directly in your browser.',
    descriptionText: 'Extract pages from any PDF and save them as individual high-resolution PNG or JPG images. Select individual pages or download all pages consolidated into a convenient ZIP archive.',
    features: [
      'Render pages up to 300 DPI for high-print resolution',
      'Select individual page export or full batch export',
      'Choice between PNG (lossless) and JPG formats',
      '100% browser canvas conversion'
    ],
    howToSteps: [
      { name: 'Drop PDF File', text: 'Upload your document to render pages.' },
      { name: 'Choose Image Quality', text: 'Select output format (PNG/JPG) and resolution.' },
      { name: 'Download Images', text: 'Save individual pages or download a ZIP folder.' }
    ],
    faqs: [
      {
        question: 'Will image quality match the original PDF?',
        answer: 'Yes! We render pages using high device pixel ratios to ensure vector elements and text remain crystal clear.'
      }
    ]
  },
  rotate: {
    h1Title: 'Free PDF Rotate & Page Organizer',
    subTitle: 'Rotate sideways or upside-down PDF pages 90°, 180°, or 270° and reorder pages.',
    descriptionText: 'Fix misaligned PDF scans and orientation problems easily. Rotate specific pages or all pages clockwise/counter-clockwise and organize page sequence with a quick visual drag interface.',
    features: [
      'Rotate individual pages or entire document',
      'Visual interactive page thumbnail grid',
      'Delete unwanted pages with 1-click',
      'Instant local browser saving'
    ],
    howToSteps: [
      { name: 'Upload PDF', text: 'Select the PDF file containing pages to rotate.' },
      { name: 'Rotate & Rearrange', text: 'Click rotate buttons on individual thumbnails or select "Rotate All".' },
      { name: 'Save Rotated PDF', text: 'Download your updated PDF file.' }
    ],
    faqs: [
      {
        question: 'Does rotating pages alter the original document quality?',
        answer: 'No! Page rotation only modifies metadata rotation flags and page matrix without re-compressing quality.'
      }
    ]
  },
  protect: {
    h1Title: 'Password Protect & Encrypt PDF Online',
    subTitle: 'Secure confidential PDF documents with standard encryption passwords directly in your browser.',
    descriptionText: 'Protect sensitive contracts, tax records, and personal records by setting password encryption on your PDF files before sharing or storing.',
    features: [
      'Client-side PDF security encryption',
      'Custom user password protection',
      'Zero server exposure of passwords or documents',
      'Instant download'
    ],
    howToSteps: [
      { name: 'Upload PDF', text: 'Select the file you want to secure.' },
      { name: 'Set Password', text: 'Enter a strong access password.' },
      { name: 'Protect & Download', text: 'Download your encrypted PDF.' }
    ],
    faqs: [
      {
        question: 'Is my password sent to any remote server?',
        answer: 'Never! Encryption happens locally inside your browser memory.'
      }
    ]
  },
  packager: {
    h1Title: '1-Click Govt Exam & College Form Packager (< 200KB)',
    subTitle: 'Auto-resize passport photo < 50KB, whiten signature < 20KB, and merge all documents into 1 PDF under 200KB.',
    descriptionText: 'Designed specifically for students and job aspirants applying to UPSC, SSC, IBPS, NTA (JEE/NEET), State PSC, and College Admissions. Automatically resizes images to official centimeter/pixel dimensions, enhances dark signatures on white paper, and generates clean combined PDF dossiers strictly under portal file size limits.',
    features: [
      'Pre-configured presets for UPSC, SSC, NTA (JEE/NEET), IBPS, and University Admissions',
      'Auto-crop to standard 3.5cm x 4.5cm photo and 3.5cm x 1.5cm signature aspect ratios',
      'Instant signature clarity enhancer & paper whitening engine',
      'Guaranteed file compression strictly under 200 KB or 100 KB limits',
      '100% private in-browser client-side execution with zero cloud storage'
    ],
    howToSteps: [
      { name: 'Select Exam / College Preset', text: 'Choose UPSC/SSC, NTA Exam, College Admission, or custom target size.' },
      { name: 'Upload Photo, Signature & Docs', text: 'Drop your files into the designated dropzones with live size indicators.' },
      { name: 'Adjust or Enhance', text: 'Use brightness/contrast and auto paper whitening to clean up signatures.' },
      { name: 'Download PDF or ZIP Package', text: 'Click "Generate Combined PDF" or download individual verified assets.' }
    ],
    faqs: [
      {
        question: 'Will this form packager ensure my PDF is strictly under 200 KB?',
        answer: 'Yes! The engine uses an iterative binary search compression algorithm to guarantee the final combined PDF is strictly below the selected limit (e.g. < 200 KB or < 100 KB).'
      },
      {
        question: 'Can I download the resized photo and signature separately?',
        answer: 'Yes! You can download the resized 3.5x4.5cm photo (under 50KB) and signature (under 20KB) as individual files or batch download everything in a single ZIP file.'
      },
      {
        question: 'Are my confidential documents and ID cards safe?',
        answer: '100% safe. All image cropping, whitening, and PDF compilation occurs locally in your device RAM. Zero files are uploaded to any server.'
      }
    ]
  }
};


/**
 * Returns dynamic SEO configuration tailored to specific programmatic landing pages
 */
export function getToolSeoDetails(pathOrToolId?: string): ToolSeoConfig | undefined {
  if (!pathOrToolId) return undefined;
  
  const cleanPath = pathOrToolId.startsWith('/') ? pathOrToolId : `/${pathOrToolId}`;
  const slug = cleanPath.replace(/^\//, '');

  const seoPage = getSeoPageBySlug(slug);
  if (seoPage) {
    return {
      h1Title: seoPage.h1,
      subTitle: seoPage.subTitle,
      descriptionText: seoPage.intro,
      features: seoPage.features,
      howToSteps: seoPage.howToSteps,
      faqs: seoPage.faqs,
    };
  }

  const mapped = PATH_TO_TOOL_MAP[cleanPath];
  if (mapped) {
    const base = TOOL_SEO_DETAILS[mapped.toolId];
    if (base) {
      return {
        ...base,
        h1Title: mapped.h1 || base.h1Title,
        subTitle: mapped.overrideDesc || base.subTitle,
        descriptionText: mapped.overrideDesc || base.descriptionText,
      };
    }
  }

  if (cleanPath in TOOL_SEO_DETAILS) {
    return TOOL_SEO_DETAILS[cleanPath as ToolId];
  }

  const byTool = ALL_TOOLS.find(t => t.id === pathOrToolId as ToolId);
  if (byTool) {
    return TOOL_SEO_DETAILS[byTool.id];
  }

  return undefined;
}

/**
 * Updates browser document title, meta tags, and injects JSON-LD schema dynamically
 */
export function updatePageSeo(pathOrToolId?: string) {
  let tool: ToolConfig | undefined;
  let seoPage: SeoPageData | undefined;

  if (pathOrToolId) {
    if (pathOrToolId.startsWith('/')) {
      const slug = pathOrToolId.replace(/^\//, '');
      seoPage = getSeoPageBySlug(slug);
      tool = getToolByPath(pathOrToolId);
    } else {
      tool = ALL_TOOLS.find(t => t.id === pathOrToolId as ToolId);
    }
  }

  const seoInfo = getToolSeoDetails(pathOrToolId || (tool ? tool.id : undefined));

  const pageTitle = seoPage 
    ? `${seoPage.metaTitle} | PDFUltraHub`
    : (tool ? `${tool.metaTitle} | PDFUltraHub` : 'PDFUltraHub - 100% Free & Unlimited Client-Side PDF Tools Hub');
    
  const metaDesc = seoPage
    ? seoPage.metaDescription
    : (tool ? tool.metaDescription : '100% Free & Unlimited Client-Side PDF Tools. Compress PDF, OCR scanned text, redact, merge, split, fill & sign PDFs online with 100% privacy.');

  const keywords = seoPage
    ? seoPage.targetKeywords.join(', ')
    : (tool ? tool.keywords.join(', ') : 'pdf converter, pdf to word, word to pdf, pdf compressor, compress pdf, merge pdf, split pdf, edit pdf, pdf editor, jpg to pdf, pdf to jpg, ocr pdf, sign pdf, fill pdf, protect pdf, unlock pdf, rotate pdf, delete pdf pages, organize pdf');

  document.title = pageTitle;

  setMetaTag('description', metaDesc);
  setMetaTag('keywords', keywords);
  
  setMetaTag('og:title', pageTitle, true);
  setMetaTag('og:description', metaDesc, true);
  setMetaTag('og:type', 'website', true);
  setMetaTag('og:site_name', 'PDFUltraHub', true);
  setMetaTag('twitter:card', 'summary_large_image', true);
  setMetaTag('twitter:title', pageTitle, true);
  setMetaTag('twitter:description', metaDesc, true);

  // Set canonical URL tag for Google Search Console (using pdfmakerr.vercel.app canonical)
  setCanonicalLink(window.location.href);

  injectJsonLdSchema(tool, seoInfo, seoPage);
}

function setCanonicalLink(url: string) {
  let link: HTMLLinkElement | null = document.querySelector('link[rel="canonical"]');
  if (!link) {
    link = document.createElement('link');
    link.setAttribute('rel', 'canonical');
    document.head.appendChild(link);
  }
  let canonicalUrl = url.split('?')[0].split('#')[0];
  try {
    const parsed = new URL(canonicalUrl);
    parsed.hostname = 'pdfmakerr.vercel.app';
    parsed.protocol = 'https:';
    canonicalUrl = parsed.toString();
  } catch {
    // fallback
  }
  link.setAttribute('href', canonicalUrl);
}

function setMetaTag(nameOrProperty: string, content: string, isProperty = false) {
  const attributeName = isProperty ? 'property' : 'name';
  let element = document.querySelector(`meta[${attributeName}="${nameOrProperty}"]`);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attributeName, nameOrProperty);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
}

function injectJsonLdSchema(tool?: ToolConfig, seoInfo?: ToolSeoConfig, seoPage?: SeoPageData) {
  const schemaId = 'pdf-ultrahub-jsonld';
  let scriptEl = document.getElementById(schemaId) as HTMLScriptElement | null;
  if (!scriptEl) {
    scriptEl = document.createElement('script');
    scriptEl.id = schemaId;
    scriptEl.type = 'application/ld+json';
    document.head.appendChild(scriptEl);
  }

  const appName = seoPage?.title || tool?.name || 'PDFUltraHub';
  const appDesc = seoPage?.metaDescription || tool?.metaDescription || '100% Free Unlimited Client-Side PDF Tools Hub';

  const baseAppSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    'name': appName,
    'url': window.location.href,
    'description': appDesc,
    'applicationCategory': 'UtilitiesApplication',
    'operatingSystem': 'All (Web Browser)',
    'browserRequirements': 'Requires JavaScript. Requires HTML5 Canvas & WebAssembly support.',
    'permissions': 'None required. 100% local client-side memory execution.',
    'offers': {
      '@type': 'Offer',
      'price': '0',
      'priceCurrency': 'USD'
    },
    'author': {
      '@type': 'Organization',
      'name': 'PDFUltraHub Software',
      'url': 'https://pdfmakerr.vercel.app'
    }
  };

  const schemas: object[] = [baseAppSchema];

  // Breadcrumb schema
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': [
      {
        '@type': 'ListItem',
        'position': 1,
        'name': 'Home',
        'item': 'https://pdfmakerr.vercel.app/'
      },
      ...(tool ? [{
        '@type': 'ListItem',
        'position': 2,
        'name': tool.name,
        'item': `https://pdfmakerr.vercel.app${tool.path}`
      }] : [])
    ]
  };
  schemas.push(breadcrumbSchema);

  if (seoInfo && seoInfo.faqs && seoInfo.faqs.length > 0) {
    const faqSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      'mainEntity': seoInfo.faqs.map(f => ({
        '@type': 'Question',
        'name': f.question,
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': f.answer
        }
      }))
    };
    schemas.push(faqSchema);
  }

  if (seoInfo && seoInfo.howToSteps && seoInfo.howToSteps.length > 0) {
    const howToSchema = {
      '@context': 'https://schema.org',
      '@type': 'HowTo',
      'name': `How to use ${appName}`,
      'step': seoInfo.howToSteps.map((step, idx) => ({
        '@type': 'HowToStep',
        'position': idx + 1,
        'name': step.name,
        'text': step.text
      }))
    };
    schemas.push(howToSchema);
  }

  scriptEl.textContent = JSON.stringify(schemas);
}
