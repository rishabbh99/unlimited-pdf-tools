import { ToolId, SchemaFaqItem, SchemaHowToStep } from '../types';

export type SeoCategory = 'converter' | 'utility' | 'size-target' | 'use-case';

export interface SeoCategoryInfo {
  id: SeoCategory;
  title: string;
  description: string;
}

export const SEO_CATEGORIES: SeoCategoryInfo[] = [
  {
    id: 'converter',
    title: 'Format Converters',
    description: 'Convert between PDF, JPG, PNG, Word, Excel, and photos without file size limits.',
  },
  {
    id: 'utility',
    title: 'Core PDF Utilities',
    description: 'Merge, split, compress, fill, sign, redact, rotate, and protect your PDF documents.',
  },
  {
    id: 'size-target',
    title: 'Government & Job Portal Sizes',
    description: 'Compress PDF documents to strict target sizes (50KB, 100KB, 200KB, 300KB, 500KB) for SSC, UPSC, and State exams.',
  },
  {
    id: 'use-case',
    title: 'Identity & Official Documents',
    description: 'Specialized converters for Aadhaar cards, PAN cards, ID cards, signatures, marksheets, resumes, and bank statements.',
  },
];


export interface SeoPageData {
  slug: string;
  toolId: ToolId;
  category: SeoCategory;
  title: string;
  shortName: string;
  h1: string;
  subTitle: string;
  metaTitle: string;
  metaDescription: string;
  intro: string;
  badge: string;
  targetKeywords: string[];
  targetAudience?: string;
  features: string[];
  howToSteps: SchemaHowToStep[];
  faqs: SchemaFaqItem[];
  relatedSlugs: string[];
  presetTip?: string;
}

export const SEO_PAGES: SeoPageData[] = [
  // ==========================================
  // 1. FORMAT CONVERTERS
  // ==========================================
  {
    slug: 'jpg-to-pdf',
    toolId: 'images-to-pdf',
    category: 'converter',
    title: 'JPG to PDF Converter',
    shortName: 'JPG to PDF',
    h1: 'Convert JPG to PDF Online Free (High Quality & Private)',
    subTitle: 'Transform JPG images into a single clean PDF document in seconds. 100% private in-browser processing.',
    metaTitle: 'Free JPG to PDF Converter Online - 100% Private Client-Side',
    metaDescription: 'Convert JPG images to PDF online for free. Combine multiple photos into one PDF, adjust margins, orientation and page size without server uploads.',
    intro: 'Need to convert JPG photos or documents into a neat PDF? Our browser-native JPG to PDF converter combines multiple image files into an organized document instantly. With zero uploads to remote servers, your sensitive photos, invoices, and documents remain 100% confidential in your device RAM.',
    badge: 'Fast & Private',
    targetKeywords: ['jpg to pdf', 'convert jpg to pdf', 'jpeg to pdf', 'combine jpg into pdf', 'photo to pdf converter'],
    features: [
      'Combine multiple JPG/JPEG photos in custom sequence',
      'Adjust orientation (Portrait/Landscape) and page margins',
      'Support for A4, Letter, and Fit-to-Image dimensions',
      '100% client-side memory execution with zero cloud storage'
    ],
    howToSteps: [
      { name: 'Upload JPG Photos', text: 'Drag and drop your JPG or JPEG image files into the upload box.' },
      { name: 'Arrange Order & Layout', text: 'Drag thumbnails to reorder pages and pick Portrait or Landscape orientation.' },
      { name: 'Generate & Download PDF', text: 'Click "Convert to PDF" to instantly download your combined document.' }
    ],
    faqs: [
      {
        question: 'Can I combine multiple JPG files into a single PDF?',
        answer: 'Yes! You can select multiple JPG images at once, drag them to rearrange the order, and merge them into one single PDF document.'
      },
      {
        question: 'Will image quality be preserved during conversion?',
        answer: 'Yes, our converter embeds your JPG photos using high-resolution rendering without artificial degradation.'
      },
      {
        question: 'Are my private photos uploaded to a remote server?',
        answer: 'Never! All conversion calculations run 100% locally in your browser memory via WebAssembly and HTML5 Canvas.'
      }
    ],
    relatedSlugs: ['png-to-pdf', 'photo-to-pdf', 'images-to-pdf', 'compress-pdf-to-100kb']
  },
  {
    slug: 'png-to-pdf',
    toolId: 'images-to-pdf',
    category: 'converter',
    title: 'PNG to PDF Converter',
    shortName: 'PNG to PDF',
    h1: 'Convert PNG to PDF Online Free (Lossless Quality)',
    subTitle: 'Convert transparent and high-resolution PNG images into crisp vector-friendly PDF files.',
    metaTitle: 'Free PNG to PDF Converter Online - Lossless & Instant',
    metaDescription: 'Convert PNG images to PDF online for free. Preserve transparency, crisp graphics, and sharp typography with 100% private client-side processing.',
    intro: 'Convert graphic designs, screenshots, transparent graphics, and PNG scans into print-ready PDF files. Unlike online converters that upload your data, our tool runs client-side for maximum speed and data safety.',
    badge: 'Lossless HD',
    targetKeywords: ['png to pdf', 'convert png to pdf', 'transparent png to pdf', 'png images into pdf document'],
    features: [
      'Lossless image embedding preserving sharp lines and text',
      'Combine multiple PNGs into a multi-page PDF',
      'Custom margin settings (None, Compact, Normal)',
      'Instant client-side generation without waiting in queues'
    ],
    howToSteps: [
      { name: 'Select PNG Files', text: 'Select or drag your PNG images into the tool.' },
      { name: 'Customize Margins', text: 'Choose your desired page margins and paper size.' },
      { name: 'Download PDF', text: 'Click "Convert to PDF" to save your clean document.' }
    ],
    faqs: [
      {
        question: 'Does PNG to PDF support transparency?',
        answer: 'Yes! PNG transparency is handled with clean background blending onto white paper pages.'
      },
      {
        question: 'Is there a limit on the number of PNG images I can convert?',
        answer: 'No artificial limits! You can convert as many PNG images as your browser memory permits.'
      }
    ],
    relatedSlugs: ['jpg-to-pdf', 'images-to-pdf', 'pdf-to-png', 'photo-to-pdf']
  },
  {
    slug: 'word-to-pdf',
    toolId: 'images-to-pdf',
    category: 'converter',
    title: 'Word & Doc to PDF Converter',
    shortName: 'Word to PDF',
    h1: 'Convert Word & Documents to PDF Online Free',
    subTitle: 'Turn document scans, exported images, and Word files into professional PDF documents.',
    metaTitle: 'Free Word to PDF Converter Online - Fast & Private',
    metaDescription: 'Convert Word docs, scans, and text pages into standardized PDF files online for free. 100% browser-safe with zero server storage.',
    intro: 'Export your typed documents, resumes, and scanned paperwork into universal PDF format. PDFs preserve your fonts, styling, and formatting across every phone, tablet, and PC.',
    badge: 'Universal Doc',
    targetKeywords: ['word to pdf', 'convert doc to pdf', 'docx to pdf online free', 'document to pdf'],
    features: [
      'Retains exact page layouts and document alignment',
      'Multi-page batch document compilation',
      '100% client-side privacy protection',
      'Compatible with all PDF readers (Adobe, Chrome, Apple Preview)'
    ],
    howToSteps: [
      { name: 'Upload Document Pages', text: 'Select your document page files or scan images.' },
      { name: 'Review Layout', text: 'Choose A4 or Letter page size for professional submission.' },
      { name: 'Download PDF', text: 'Export your standardized PDF document.' }
    ],
    faqs: [
      {
        question: 'Why should I convert Word documents to PDF?',
        answer: 'PDF guarantees that your document layout, fonts, and pagination look identical on every device and operating system.'
      }
    ],
    relatedSlugs: ['pdf-to-word', 'resume-to-pdf', 'jpg-to-pdf', 'merge-pdf']
  },
  {
    slug: 'pdf-to-word',
    toolId: 'ocr',
    category: 'converter',
    title: 'PDF to Word & Text (OCR)',
    shortName: 'PDF to Word',
    h1: 'Convert PDF to Word & Editable Text (AI OCR)',
    subTitle: 'Extract editable text from scanned PDFs and read-only documents with client-side OCR.',
    metaTitle: 'Free PDF to Word & Editable Text Converter Online - OCR Powered',
    metaDescription: 'Convert PDF files to editable Word and TXT text online with AI OCR. Extract text from scanned documents with 100% browser privacy and zero uploads.',
    intro: 'Stuck with a read-only or scanned PDF document? Our browser-native Tesseract OCR engine extracts text and paragraphs directly into editable text and Word-compatible format with high accuracy.',
    badge: 'AI OCR',
    targetKeywords: ['pdf to word', 'convert pdf to editable text', 'pdf ocr online', 'scanned pdf to text converter'],
    features: [
      'Extract text from scanned book pages, receipts, and invoices',
      'Supports 100+ languages with WebAssembly OCR models',
      'Export as plain text (TXT) or copy directly to clipboard',
      '100% client-side security with zero cloud uploads'
    ],
    howToSteps: [
      { name: 'Upload Scanned PDF', text: 'Select the PDF file you wish to extract text from.' },
      { name: 'Run Optical Recognition', text: 'The browser OCR will process and recognize letters in RAM.' },
      { name: 'Copy or Download Text', text: 'Copy the editable text or download it for Microsoft Word.' }
    ],
    faqs: [
      {
        question: 'Does this work on scanned documents and photos?',
        answer: 'Yes! Our WebAssembly OCR engine specializes in recognizing characters in scanned paper documents and photo PDFs.'
      }
    ],
    relatedSlugs: ['ocr-pdf', 'scanned-pdf-to-text-ocr-free', 'word-to-pdf']
  },
  {
    slug: 'pdf-to-jpg',
    toolId: 'pdf-to-images',
    category: 'converter',
    title: 'PDF to JPG Converter',
    shortName: 'PDF to JPG',
    h1: 'Convert PDF to High-Resolution JPG Images',
    subTitle: 'Turn every PDF page into crisp JPG pictures. Download individual images or batch ZIP.',
    metaTitle: 'Free PDF to JPG Converter Online - High Quality Images',
    metaDescription: 'Convert PDF pages to high-resolution JPG images online for free. Download individual pages or entire documents as a ZIP file with 100% client-side privacy.',
    intro: 'Extract crystal-clear JPG photos from any PDF document. Whether you need to post a PDF page on social media, insert a chart into a presentation, or save document photos, our high-DPI converter renders pages in stunning clarity.',
    badge: 'High DPI',
    targetKeywords: ['pdf to jpg', 'convert pdf to jpg', 'pdf to image converter', 'save pdf as picture'],
    features: [
      'High DPI page rendering for razor-sharp vector graphics and text',
      'Download individual page photos or all pages in a single ZIP',
      '100% private in-browser rendering with pdfjs-dist',
      'Zero size limits or daily quotas'
    ],
    howToSteps: [
      { name: 'Upload PDF Document', text: 'Select the PDF file you want to convert into JPGs.' },
      { name: 'Preview Rendered Pages', text: 'Check page thumbnails generated in your browser.' },
      { name: 'Download JPG Files', text: 'Download single page images or download all as a ZIP archive.' }
    ],
    faqs: [
      {
        question: 'What resolution are the extracted JPG images?',
        answer: 'Images are rendered with multi-scale device pixel ratios (up to 300 DPI) for crisp printing and digital viewing.'
      }
    ],
    relatedSlugs: ['pdf-to-png', 'images-to-pdf', 'jpg-to-pdf']
  },
  {
    slug: 'pdf-to-png',
    toolId: 'pdf-to-images',
    category: 'converter',
    title: 'PDF to PNG Converter',
    shortName: 'PDF to PNG',
    h1: 'Convert PDF to PNG Online Free (Lossless Graphic Clarity)',
    subTitle: 'Extract lossless PNG images from PDF pages for crisp diagrams, charts, and text.',
    metaTitle: 'Free PDF to PNG Converter Online - Lossless Quality',
    metaDescription: 'Convert PDF pages to lossless PNG images online for free. Extract sharp diagrams, charts, and text without compression artifacts. 100% private.',
    intro: 'When JPG compression artifacts might ruin fine text or detailed technical schematics, PNG is the optimal format. Our PDF to PNG tool renders pure lossless PNG images directly from your browser memory.',
    badge: 'Lossless PNG',
    targetKeywords: ['pdf to png', 'convert pdf to png lossless', 'extract png from pdf'],
    features: [
      'Lossless pixel-perfect page export',
      'Zero JPEG compression blur or artifacts',
      'Batch ZIP export for multi-page documents',
      '100% in-browser processing'
    ],
    howToSteps: [
      { name: 'Open PDF', text: 'Select the PDF file you want to extract.' },
      { name: 'Preview Pages', text: 'View full rendered page previews.' },
      { name: 'Save PNGs', text: 'Download PNG files directly.' }
    ],
    faqs: [
      {
        question: 'Why choose PNG over JPG for PDF extraction?',
        answer: 'PNG uses lossless compression, making it ideal for documents with fine lines, graphs, barcodes, and small typography.'
      }
    ],
    relatedSlugs: ['pdf-to-jpg', 'png-to-pdf', 'images-to-pdf']
  },
  {
    slug: 'photo-to-pdf',
    toolId: 'images-to-pdf',
    category: 'converter',
    title: 'Photo to PDF Converter',
    shortName: 'Photo to PDF',
    h1: 'Convert Mobile Photos to PDF Document Online',
    subTitle: 'Combine camera photos, smartphone snapshots, and picture scans into a neat PDF.',
    metaTitle: 'Free Photo to PDF Converter Online - Combine Camera Snaps',
    metaDescription: 'Convert smartphone photos and picture snapshots to PDF online for free. Combine multiple photos into one document with 100% private browser security.',
    intro: 'Turn photos taken on your smartphone or digital camera into a single, clean PDF file. Perfect for receipts, handwritten notes, ID cards, and school assignments.',
    badge: 'Mobile Ready',
    targetKeywords: ['photo to pdf', 'convert photo to pdf', 'camera picture to pdf', 'combine photos into pdf'],
    features: [
      'Works on iPhone, Android, iPad, Mac, and Windows',
      'Easily reorder photo sequence before exporting',
      'Auto-orient portrait and landscape photos',
      'No registration or app installation required'
    ],
    howToSteps: [
      { name: 'Upload Phone Photos', text: 'Select photos from your gallery or camera roll.' },
      { name: 'Rearrange Sequence', text: 'Organize pages in your preferred order.' },
      { name: 'Download PDF File', text: 'Get your single compiled PDF file immediately.' }
    ],
    faqs: [
      {
        question: 'Can I use this on my mobile phone?',
        answer: 'Yes! PDFUltraHub works seamlessly in Safari, Chrome, Edge, and all mobile web browsers.'
      }
    ],
    relatedSlugs: ['jpg-to-pdf', 'passport-photo-to-pdf', 'convert-id-card-to-pdf']
  },

  // ==========================================
  // 2. CORE UTILITIES
  // ==========================================
  {
    slug: 'compress-pdf',
    toolId: 'compress',
    category: 'utility',
    title: 'Compress PDF Online',
    shortName: 'Compress PDF',
    h1: 'Compress PDF Online Free (Reduce File Size up to 90%)',
    subTitle: 'Shrink PDF documents quickly without losing readability. 100% private browser-side optimization.',
    metaTitle: 'Free PDF Compressor Online - Reduce PDF Size Fast & Privately',
    metaDescription: 'Compress PDF files online for free. Reduce file size up to 90% without sacrificing text readability. 100% client-side memory execution with zero file limits.',
    intro: 'Large PDF documents cause email bounces, portal upload errors, and slow downloads. Our client-side compressor optimizes font streams, compresses embedded raster images, and strips unnecessary metadata objects entirely inside your browser.',
    badge: 'Up to 90% Off',
    targetKeywords: ['compress pdf', 'reduce pdf size', 'shrink pdf', 'pdf compressor online free', 'small pdf'],
    features: [
      'Three intelligent compression levels: Recommended, Extreme, and High Quality',
      'Interactive size comparison showing exact KB/MB saved',
      'Zero server uploads: all compression runs in device RAM',
      'Unlimited file size and zero daily limits'
    ],
    howToSteps: [
      { name: 'Upload Large PDF', text: 'Drop your heavy PDF file into the compressor box.' },
      { name: 'Select Compression Mode', text: 'Choose Recommended (balanced) or Extreme (maximum reduction).' },
      { name: 'Download Optimized PDF', text: 'Save your lightweight, compressed PDF file.' }
    ],
    faqs: [
      {
        question: 'Will compressing my PDF make the text blurry?',
        answer: 'No! Vector text and fonts remain sharp; the engine primarily optimizes heavy raster photos and redundant metadata.'
      },
      {
        question: 'Is there a limit on file size?',
        answer: 'No! You can compress files of 50MB, 100MB, or more without paying fees or creating an account.'
      }
    ],
    relatedSlugs: ['compress-pdf-to-100kb', 'compress-pdf-to-200kb', 'compress-pdf-to-50kb', 'merge-pdf']
  },
  {
    slug: 'merge-pdf',
    toolId: 'merge',
    category: 'utility',
    title: 'Merge PDF Files',
    shortName: 'Merge PDF',
    h1: 'Merge PDF Files Online Free (Combine Multiple Documents)',
    subTitle: 'Combine multiple PDF documents into a single organized file with easy drag-and-drop ordering.',
    metaTitle: 'Free PDF Merger Online - Combine Unlimited PDF Files Instantly',
    metaDescription: 'Merge PDF files into a single document online for free. Drag and drop file ordering, page arrangement, 100% browser native with zero file limits.',
    intro: 'Combine multiple PDF reports, chapters, contracts, or receipts into one unified document. PDFUltraHub lets you merge unlimited PDF files in seconds with zero server uploads.',
    badge: 'Unlimited Files',
    targetKeywords: ['merge pdf', 'combine pdf files', 'join pdfs online free', 'pdf merger', 'combine multiple pdfs'],
    features: [
      'Merge unlimited PDF files in a single session',
      'Drag-and-drop thumbnail ordering',
      'Fast client-side assembly with pdf-lib',
      'Zero watermark, zero registration required'
    ],
    howToSteps: [
      { name: 'Select PDF Documents', text: 'Upload two or more PDF files you want to combine.' },
      { name: 'Arrange Order', text: 'Drag the document cards into your preferred sequence.' },
      { name: 'Merge & Save', text: 'Click "Merge PDFs" to instantly download the combined document.' }
    ],
    faqs: [
      {
        question: 'How many PDF documents can I combine at once?',
        answer: 'There is no limit! You can combine 2, 5, 20, or 50+ PDF files in a single merge.'
      }
    ],
    relatedSlugs: ['split-pdf', 'rotate-pdf', 'compress-pdf', 'images-to-pdf']
  },
  {
    slug: 'split-pdf',
    toolId: 'split',
    category: 'utility',
    title: 'Split PDF Pages',
    shortName: 'Split PDF',
    h1: 'Split PDF Online Free (Extract Pages & Separate Files)',
    subTitle: 'Extract specific pages or break a large PDF document into separate individual files.',
    metaTitle: 'Free PDF Splitter Online - Extract Pages from PDF Instantly',
    metaDescription: 'Split PDF files online for free. Extract custom page ranges or separate all pages into individual files. 100% browser privacy guaranteed.',
    intro: 'Need just a few pages from a 100-page report? Our PDF Splitter lets you specify custom page ranges (e.g. 1-5, 12, 18-20) or extract every page into separate downloads instantly.',
    badge: 'Instant Extract',
    targetKeywords: ['split pdf', 'extract pdf pages', 'separate pdf pages', 'cut pdf online', 'pdf page extractor'],
    features: [
      'Custom page range extraction (e.g. 1-3, 5, 8-10)',
      'Split all pages into single-page PDF files',
      'Visual page preview thumbnails for easy selection',
      '100% private in-browser memory execution'
    ],
    howToSteps: [
      { name: 'Upload PDF', text: 'Select the PDF file you wish to split.' },
      { name: 'Choose Pages', text: 'Enter page ranges or select page thumbnails.' },
      { name: 'Extract PDF', text: 'Click "Split PDF" to save your extracted pages.' }
    ],
    faqs: [
      {
        question: 'Can I extract non-consecutive pages?',
        answer: 'Yes! You can specify ranges like "1, 4, 7-10" and extract them into a single clean PDF.'
      }
    ],
    relatedSlugs: ['merge-pdf', 'rotate-pdf', 'delete-pdf-pages', 'compress-pdf']
  },
  {
    slug: 'sign-pdf',
    toolId: 'sign',
    category: 'utility',
    title: 'Sign PDF Online Free',
    shortName: 'Sign PDF',
    h1: 'Sign PDF Documents Online Free (Draw, Type & E-Sign)',
    subTitle: 'Draw digital signatures, type initials, and place date stamps directly on PDF contracts.',
    metaTitle: 'Free PDF Signer & Digital Form Filler - Sign PDFs Online',
    metaDescription: 'Sign PDF documents online for free. Draw your signature, type text, add stamps, dates, and checkmarks. 100% private client-side processing.',
    intro: 'Execute contracts, NDAs, rental agreements, and employment offers without printing a single sheet of paper. Draw your handwritten signature, type your name, add dates, and place checkmarks with 100% local privacy.',
    badge: 'E-Sign Ready',
    targetKeywords: ['sign pdf', 'e-sign pdf free', 'digital signature pdf', 'draw signature on pdf', 'fill and sign pdf'],
    features: [
      'Draw smooth digital hand signatures with mouse, touch, or stylus',
      'Quick position presets: Bottom Right, Bottom Center, Bottom Left, Center',
      'Type custom form text, insert date stamps and checkmarks',
      '100% private: signature never leaves your local device'
    ],
    howToSteps: [
      { name: 'Upload Contract or Form', text: 'Select the PDF document requiring signature.' },
      { name: 'Draw or Type Signature', text: 'Create your digital signature and place it on the signature line.' },
      { name: 'Burn & Download', text: 'Click "Sign & Download PDF" to save your legally filled document.' }
    ],
    faqs: [
      {
        question: 'Is my drawn signature sent to any cloud server?',
        answer: 'Never! Your signature is burned directly into the PDF canvas in your device RAM.'
      },
      {
        question: 'How do I position my signature at the end of the document?',
        answer: 'Use the "Bottom Right" quick preset button to place your signature on the bottom signature line with one click!'
      }
    ],
    relatedSlugs: ['fill-pdf', 'signature-to-pdf', 'contract-sign-pdf', 'protect-pdf']
  },
  {
    slug: 'fill-pdf',
    toolId: 'sign',
    category: 'utility',
    title: 'Fill PDF Forms Online',
    shortName: 'Fill PDF',
    h1: 'Fill Out PDF Forms Online Free (Type Text & Checkmarks)',
    subTitle: 'Type text entries, check checkboxes, and insert dates into non-interactive PDF forms.',
    metaTitle: 'Free PDF Form Filler Online - Type Fields & Checkmarks',
    metaDescription: 'Fill out PDF forms, applications, and questionnaires online for free. Type text, add checkmarks, stamps, and dates with 100% browser privacy.',
    intro: 'Don’t have an expensive Adobe Acrobat subscription? Our free PDF form filler lets you click anywhere on a PDF page to type answers, insert dates, and tick check boxes.',
    badge: '100% Free Form Filler',
    targetKeywords: ['fill pdf', 'fill out pdf form online', 'type on pdf free', 'pdf form filler no software'],
    features: [
      'Click anywhere to place text annotations and form entries',
      'Font size and color customization',
      'Checkmark and date stamp tools',
      'Zero installation, works on any modern web browser'
    ],
    howToSteps: [
      { name: 'Upload PDF Form', text: 'Open your application or questionnaire PDF.' },
      { name: 'Add Text & Fields', text: 'Click on blank form lines to type your responses.' },
      { name: 'Export Completed Form', text: 'Save your completed PDF document.' }
    ],
    faqs: [
      {
        question: 'Can I fill forms that are not fillable by default?',
        answer: 'Yes! PDFUltraHub allows placing text and checkmarks on ANY flat or scanned PDF document.'
      }
    ],
    relatedSlugs: ['sign-pdf', 'edit-pdf', 'pdf-editor', 'redact-pdf']
  },
  {
    slug: 'protect-pdf',
    toolId: 'protect',
    category: 'utility',
    title: 'Password Protect PDF',
    shortName: 'Protect PDF',
    h1: 'Password Protect PDF Online Free (Client-Side Encryption)',
    subTitle: 'Secure confidential documents with standard passwords before emailing or archiving.',
    metaTitle: 'Password Protect PDF Online Free - Client-Side Encryption',
    metaDescription: 'Add strong password encryption to your PDF files online. Keep confidential documents safe with 100% browser-side security and zero cloud storage.',
    intro: 'Keep tax documents, medical records, financial statements, and business contracts safe from prying eyes by applying password encryption directly in your web browser.',
    badge: '256-Bit Security',
    targetKeywords: ['protect pdf', 'password protect pdf', 'encrypt pdf online free', 'lock pdf with password'],
    features: [
      'Standard PDF password encryption',
      '100% client-side: password and document never touch external servers',
      'Compatible with all PDF viewers requiring authentication',
      'Fast 1-click protection'
    ],
    howToSteps: [
      { name: 'Upload PDF', text: 'Select the PDF file you wish to protect.' },
      { name: 'Enter Password', text: 'Type and confirm a strong password.' },
      { name: 'Save Encrypted PDF', text: 'Download your password-protected PDF document.' }
    ],
    faqs: [
      {
        question: 'Is my password safe?',
        answer: 'Yes! Encryption runs entirely inside your browser memory; neither the password nor the document is transmitted across the internet.'
      }
    ],
    relatedSlugs: ['unlock-pdf', 'redact-pdf', 'sign-pdf']
  },
  {
    slug: 'unlock-pdf',
    toolId: 'protect',
    category: 'utility',
    title: 'Unlock Protected PDF',
    shortName: 'Unlock PDF',
    h1: 'Unlock PDF & Remove Password Restrictions Online',
    subTitle: 'Strip password requirements and printing restrictions from authorized PDF files.',
    metaTitle: 'Free PDF Unlocker Online - Remove PDF Password Restrictions',
    metaDescription: 'Remove owner passwords and printing restrictions from your PDF files online for free. 100% browser-side removal with total privacy.',
    intro: 'Tired of typing a password every time you open your own bank statement or utility bill? Unlock authorized PDFs and save an unencrypted version for easy archiving.',
    badge: 'Remove Password',
    targetKeywords: ['unlock pdf', 'remove pdf password', 'decrypt pdf online', 'pdf password remover'],
    features: [
      'Removes password prompts for instant document opening',
      'Removes print, edit, and copy restrictions',
      '100% browser-based decryption',
      'Instant download without waiting'
    ],
    howToSteps: [
      { name: 'Upload Locked PDF', text: 'Select your password-protected PDF file.' },
      { name: 'Enter Current Password', text: 'Provide the document password to authorize decryption.' },
      { name: 'Download Unlocked PDF', text: 'Save your clean, unprotected PDF.' }
    ],
    faqs: [
      {
        question: 'Do I need to know the original password?',
        answer: 'Yes, entering the correct password authorizes the engine to decrypt the file and save an unlocked copy.'
      }
    ],
    relatedSlugs: ['protect-pdf', 'compress-pdf', 'merge-pdf']
  },
  {
    slug: 'rotate-pdf',
    toolId: 'rotate',
    category: 'utility',
    title: 'Rotate PDF Pages',
    shortName: 'Rotate PDF',
    h1: 'Rotate PDF Pages Online Free (90°, 180°, 270° Fix)',
    subTitle: 'Permanently rotate upside-down or sideways pages in scanned documents.',
    metaTitle: 'Rotate & Organize PDF Pages Free Online - Instant Save',
    metaDescription: 'Rotate PDF pages permanently online. Turn portrait to landscape, reorder pages, and delete unwanted pages in seconds with 100% client-side privacy.',
    intro: 'Scanned documents often end up rotated sideways or upside down. Our visual page organizer lets you rotate individual pages or the entire document permanently in seconds.',
    badge: 'Visual Grid',
    targetKeywords: ['rotate pdf', 'turn pdf landscape', 'rotate upside down pdf', 'reorder pdf pages', 'rotate single page pdf'],
    features: [
      'Rotate individual pages 90°, 180°, or 270° clockwise',
      'Batch rotate all pages with one click',
      'Visual interactive page thumbnail grid',
      'Zero quality loss; modifies orientation metadata directly'
    ],
    howToSteps: [
      { name: 'Upload PDF', text: 'Select the document containing misaligned pages.' },
      { name: 'Rotate Pages', text: 'Click the rotate icon on specific pages or choose "Rotate All".' },
      { name: 'Download Fixed PDF', text: 'Save your correctly oriented PDF document.' }
    ],
    faqs: [
      {
        question: 'Does rotating degrade page image quality?',
        answer: 'No! Rotating updates the document view matrix without recompressing page contents.'
      }
    ],
    relatedSlugs: ['delete-pdf-pages', 'organize-pdf', 'split-pdf', 'merge-pdf']
  },
  {
    slug: 'delete-pdf-pages',
    toolId: 'rotate',
    category: 'utility',
    title: 'Delete PDF Pages',
    shortName: 'Delete Pages',
    h1: 'Delete Unwanted PDF Pages Online Free',
    subTitle: 'Remove blank pages, cover sheets, and unnecessary sections from your PDF.',
    metaTitle: 'Delete PDF Pages Free Online - Remove Unwanted Pages',
    metaDescription: 'Delete unwanted pages from your PDF documents online for free. Fast 1-click page removal and reordering with 100% client-side privacy.',
    intro: 'Quickly discard blank pages, outdated sections, or duplicate sheets from your documents before sending them to clients or employers.',
    badge: '1-Click Remove',
    targetKeywords: ['delete pdf pages', 'remove pages from pdf', 'delete single page from pdf', 'cut unwanted pdf pages'],
    features: [
      'Visual trash button on every page thumbnail',
      'Instantly remove multiple unwanted pages',
      'Rearrange remaining page sequence',
      '100% private in-browser editing'
    ],
    howToSteps: [
      { name: 'Upload PDF File', text: 'Open your document in the organizer.' },
      { name: 'Delete Pages', text: 'Click the trash icon on any page you want to remove.' },
      { name: 'Save Clean PDF', text: 'Download your streamlined PDF file.' }
    ],
    faqs: [
      {
        question: 'Can I undo a page deletion before downloading?',
        answer: 'Yes, you can re-upload or adjust selections before clicking Apply.'
      }
    ],
    relatedSlugs: ['rotate-pdf', 'organize-pdf', 'split-pdf']
  },
  {
    slug: 'redact-pdf',
    toolId: 'redact',
    category: 'utility',
    title: 'Redact & Blackout PDF',
    shortName: 'Redact PDF',
    h1: 'Redact & Blackout Sensitive Text in PDF Online',
    subTitle: 'Permanently blackout social security numbers, credit cards, names, and confidential data.',
    metaTitle: 'Permanently Redact & Blackout Sensitive Info from PDF Free Online',
    metaDescription: 'Blackout sensitive text, SSN, credit cards, or names in PDFs permanently. 100% browser-side burning ensures text is never recoverable.',
    intro: 'Simply putting a black shape in standard PDF viewers leaves underlying text copyable. PDFUltraHub permanently rasterizes and burns blackouts into the document matrix so confidential data can never be uncovered.',
    badge: 'Permanent Burn',
    targetKeywords: ['redact pdf', 'blackout pdf text', 'remove sensitive info pdf', 'sanitize pdf client side', 'hide confidential info pdf'],
    features: [
      'Visual click-and-drag redaction box drawer',
      'Permanent vector rasterization prevents text copying or recovery',
      'Choose between Blackout, Whiteout, and Blur styles',
      '100% private client-side processing'
    ],
    howToSteps: [
      { name: 'Upload PDF', text: 'Open the document with confidential data.' },
      { name: 'Draw Redaction Boxes', text: 'Click and drag over names, numbers, or sensitive lines.' },
      { name: 'Burn Redactions', text: 'Click "Apply Permanent Redactions" to generate secure PDF.' }
    ],
    faqs: [
      {
        question: 'Can someone inspect the PDF code to reveal redacted text?',
        answer: 'No! PDFUltraHub rasterizes redacted pages into a unified visual layer, permanently destroying underlying text data.'
      }
    ],
    relatedSlugs: ['remove-sensitive-info-pdf', 'protect-pdf', 'edit-pdf']
  },
  {
    slug: 'remove-sensitive-info-pdf',
    toolId: 'redact',
    category: 'utility',
    title: 'Remove Sensitive Info from PDF',
    shortName: 'Sanitize PDF',
    h1: 'Remove Sensitive Information & Data from PDF',
    subTitle: 'Sanitize confidential legal filings, medical histories, and financial records before sharing.',
    metaTitle: 'Remove Sensitive Info from PDF Online Free - Permanent Sanitizer',
    metaDescription: 'Sanitize PDF documents by permanently removing sensitive personal information, banking details, and private notes. 100% client-side security.',
    intro: 'Before submitting documents to public courts, government agencies, or external partners, sanitize all sensitive personal data with permanent visual blackouts.',
    badge: 'HIPAA & GDPR Safe',
    targetKeywords: ['remove sensitive info pdf', 'sanitize pdf', 'erase personal data pdf', 'redact confidential documents'],
    features: [
      'Permanently eliminates private numbers and names',
      'Blackout, whiteout, or blur styles',
      'Zero server transfer protects privacy',
      'Instant download'
    ],
    howToSteps: [
      { name: 'Upload Document', text: 'Select the document you need to sanitize.' },
      { name: 'Mark Sensitive Regions', text: 'Draw boxes over account numbers and private info.' },
      { name: 'Download Sanitized PDF', text: 'Save your sanitized PDF document.' }
    ],
    faqs: [
      {
        question: 'Is this safe for government and legal filings?',
        answer: 'Yes! True rasterization ensures that the underlying vector text stream is completely purged.'
      }
    ],
    relatedSlugs: ['redact-pdf', 'protect-pdf', 'compress-pdf']
  },

  // ==========================================
  // 3. TARGET FILE SIZES (GOVT & PORTAL SPECIFIC)
  // ==========================================
  {
    slug: 'compress-pdf-to-100kb',
    toolId: 'compress',
    category: 'size-target',
    title: 'Compress PDF to 100KB Online',
    shortName: 'PDF to 100KB',
    h1: 'Compress PDF to 100KB Online Free (Govt & Exam Portal Ready)',
    subTitle: 'Reduce PDF file size under 100KB for SSC, UPSC, IBPS, State PSC, and job application portals.',
    metaTitle: 'Compress PDF to 100KB Online Free - Exact Size Reducer',
    metaDescription: 'Compress PDF to 100KB online for free. Perfectly formatted for government job portals, exam registrations, and email attachments. 100% private in-browser.',
    intro: 'Most government job forms, college admission portals (UPSC, SSC, NTA, State PSC), and scholarship applications strictly require document uploads under 100KB. PDFUltraHub optimizes your certificate, marksheet, or ID scan to meet the exact 100KB limit while preserving clear readability.',
    badge: 'Govt Portal Ready',
    targetKeywords: ['compress pdf to 100kb', 'reduce pdf size to 100kb online', 'compress pdf under 100 kb free', 'pdf compressor 100kb govt job'],
    targetAudience: 'Govt Job Applicants (SSC/UPSC/IBPS/Railways), Students, Job Seekers',
    features: [
      'Optimized presets specifically calibrated for 100KB portal limits',
      'Keeps text and stamps legible while shrinking heavy photos',
      '100% private: your certificates and marksheets never touch cloud servers',
      'No registration, watermarks, or fees'
    ],
    howToSteps: [
      { name: 'Upload Certificate or PDF', text: 'Select your scanned marksheet, certificate, or resume.' },
      { name: 'Select Extreme/Recommended Mode', text: 'Use Extreme mode if your original file is large (over 1MB).' },
      { name: 'Download <100KB PDF', text: 'Download your optimized PDF ready for portal submission.' }
    ],
    faqs: [
      {
        question: 'Will this PDF be accepted on UPSC / SSC / Govt job portals?',
        answer: 'Yes! The compressed PDF strictly adheres to standard PDF/A specifications and fits under the required file size limit.'
      },
      {
        question: 'What if my original file is very large (e.g. 5MB)?',
        answer: 'Choose "Extreme" compression mode to achieve up to 90% size reduction down to the 100KB threshold.'
      }
    ],
    relatedSlugs: ['compress-pdf-to-200kb', 'compress-pdf-to-50kb', 'convert-aadhaar-to-pdf', 'marksheet-to-pdf']
  },
  {
    slug: 'compress-pdf-to-200kb',
    toolId: 'compress',
    category: 'size-target',
    title: 'Compress PDF to 200KB Online',
    shortName: 'PDF to 200KB',
    h1: 'Compress PDF to 200KB Online Free (High Clarity)',
    subTitle: 'Shrink multi-page PDF documents under 200KB for online university admissions and job applications.',
    metaTitle: 'Compress PDF to 200KB Online Free - Fast & Private',
    metaDescription: 'Compress PDF to 200KB online for free. Ideal for multi-page resumes, bank statements, and college portals. 100% private browser processing.',
    intro: 'The 200KB threshold is the standard limit for university admissions, visa applications, and corporate job application portals. Shrink your PDFs effortlessly without blurriness.',
    badge: '200KB Target',
    targetKeywords: ['compress pdf to 200kb', 'reduce pdf size to 200kb', 'compress pdf under 200 kb online free', 'resize pdf to 200kb'],
    features: [
      'Balanced compression preserving clean photo and text quality',
      'Works for multi-page documents and certificates',
      'Real-time percentage reduction preview',
      '100% client-side memory safety'
    ],
    howToSteps: [
      { name: 'Upload PDF Document', text: 'Drop your document into the compression area.' },
      { name: 'Choose Recommended Mode', text: 'Select Recommended mode for balanced clarity and size.' },
      { name: 'Download <200KB PDF', text: 'Save your compressed PDF file instantly.' }
    ],
    faqs: [
      {
        question: 'Can I compress multi-page PDFs to under 200KB?',
        answer: 'Yes! Our compression engine strips redundant metadata and optimizes embedded images across all pages.'
      }
    ],
    relatedSlugs: ['compress-pdf-to-100kb', 'compress-pdf-to-300kb', 'compress-pdf', 'resume-to-pdf']
  },
  {
    slug: 'compress-pdf-to-50kb',
    toolId: 'compress',
    category: 'size-target',
    title: 'Compress PDF to 50KB Online',
    shortName: 'PDF to 50KB',
    h1: 'Compress PDF to 50KB Online Free (Photo & Signature Ready)',
    subTitle: 'Ultra-compress signature scans, ID photos, and single-page forms under 50KB.',
    metaTitle: 'Compress PDF to 50KB Online Free - Ultra Size Reducer',
    metaDescription: 'Compress PDF to 50KB online for free. Ideal for signature scans, passport photos, and strict portal limits. 100% private client-side.',
    intro: 'Some examination and government recruitment portals enforce an ultra-low 50KB limit on signature and photo PDF uploads. Our Extreme compression mode reduces file payloads dramatically.',
    badge: 'Ultra Compact',
    targetKeywords: ['compress pdf to 50kb', 'reduce pdf to 50kb', 'compress pdf under 50 kb online', 'signature pdf compress 50kb'],
    features: [
      'Extreme compression profile for ultra-low byte budgets',
      'Preserves high contrast for signatures and barcodes',
      'Instant in-browser RAM execution',
      'No email signup or software download'
    ],
    howToSteps: [
      { name: 'Upload PDF', text: 'Select your signature or ID PDF file.' },
      { name: 'Select Extreme Mode', text: 'Choose Extreme compression for maximum reduction.' },
      { name: 'Download <50KB PDF', text: 'Save your ultra-small PDF file.' }
    ],
    faqs: [
      {
        question: 'Will signatures stay sharp at 50KB?',
        answer: 'Yes! High-contrast thresholding preserves clean signature outlines even under tight file size limits.'
      }
    ],
    relatedSlugs: ['signature-to-pdf', 'compress-pdf-to-100kb', 'pan-card-to-pdf']
  },
  {
    slug: 'compress-pdf-to-300kb',
    toolId: 'compress',
    category: 'size-target',
    title: 'Compress PDF to 300KB Online',
    shortName: 'PDF to 300KB',
    h1: 'Compress PDF to 300KB Online Free',
    subTitle: 'Shrink multi-page contracts, legal briefs, and portfolios under 300KB.',
    metaTitle: 'Compress PDF to 300KB Online Free - Quality Preserved',
    metaDescription: 'Compress PDF to 300KB online for free. Reduce file sizes while keeping charts, text, and photos crisp. 100% private in-browser tool.',
    intro: 'Need to submit a portfolio or multi-page proposal under 300KB? Optimize your document size while retaining high visual appeal.',
    badge: 'Portfolio Ready',
    targetKeywords: ['compress pdf to 300kb', 'reduce pdf size to 300kb', 'compress pdf under 300 kb online'],
    features: [
      'Optimal for presentations, resumes, and multi-page reports',
      'Retains clean vector typography and color balance',
      '100% private local execution',
      'Fast 1-click download'
    ],
    howToSteps: [
      { name: 'Upload PDF', text: 'Select your document.' },
      { name: 'Select Compression Mode', text: 'Choose Recommended mode.' },
      { name: 'Download PDF', text: 'Save your compressed file.' }
    ],
    faqs: [
      {
        question: 'How fast is the compression?',
        answer: 'Because processing happens locally in your device RAM, compression completes in just 1-2 seconds!'
      }
    ],
    relatedSlugs: ['compress-pdf-to-200kb', 'compress-pdf-to-500kb', 'compress-pdf']
  },
  {
    slug: 'compress-pdf-to-500kb',
    toolId: 'compress',
    category: 'size-target',
    title: 'Compress PDF to 500KB Online',
    shortName: 'PDF to 500KB',
    h1: 'Compress PDF to 500KB Online Free (Email & HR Ready)',
    subTitle: 'Reduce heavy brochures, contracts, and scanned packets under 500KB for seamless email delivery.',
    metaTitle: 'Compress PDF to 500KB Online Free - Email Optimized',
    metaDescription: 'Compress PDF to 500KB online for free. Fast email attachment optimization without quality loss. 100% private client-side processing.',
    intro: 'Email servers and HR application systems often block attachments larger than 500KB. Optimize your documents so they send instantly without bouncing.',
    badge: 'Email Friendly',
    targetKeywords: ['compress pdf to 500kb', 'reduce pdf to 500kb', 'compress pdf for email attachment'],
    features: [
      'Guarantees swift email delivery and fast mobile opening',
      'No email bounce due to attachment limits',
      '100% private client-side execution',
      'Zero cost and no file quantity caps'
    ],
    howToSteps: [
      { name: 'Upload Document', text: 'Drop your PDF into the tool.' },
      { name: 'Choose Setting', text: 'Select High Quality or Recommended mode.' },
      { name: 'Download', text: 'Save and attach to your email.' }
    ],
    faqs: [
      {
        question: 'Why should I compress PDFs before emailing?',
        answer: 'Smaller PDFs send faster, use less cellular data on mobile recipients, and prevent attachment size rejections.'
      }
    ],
    relatedSlugs: ['compress-pdf-for-email', 'compress-pdf-for-whatsapp', 'compress-pdf-to-200kb']
  },
  {
    slug: 'compress-pdf-for-government-jobs',
    toolId: 'compress',
    category: 'size-target',
    title: 'Compress PDF for Government Jobs',
    shortName: 'Govt Job PDF',
    h1: 'Compress PDF for Government Job Applications Online',
    subTitle: 'Format and resize certificates, caste proof, marksheets, and identity scans for government portals.',
    metaTitle: 'Compress PDF for Govt Jobs (SSC, UPSC, IBPS, PSC) Free Online',
    metaDescription: 'Compress PDF documents for government job portals (UPSC, SSC, IBPS, State PSC). Meet strict 50KB-200KB upload requirements with 100% privacy.',
    intro: 'Government recruitment portals (SSC CGL/CHSL, UPSC CSE, IBPS PO, State Public Service Commissions, Railway Recruitment Boards) enforce strict byte limits on certificates and marksheets. PDFUltraHub guarantees your files meet exact specifications.',
    badge: 'UPSC / SSC / IBPS',
    targetKeywords: ['compress pdf for government jobs', 'upsc pdf size compressor', 'ssc cgl pdf compress', 'ibps marksheet compress pdf'],
    targetAudience: 'Govt Job Aspirants, SSC/UPSC/IBPS Candidates, State PSC Applicants',
    features: [
      'Pre-tuned for Indian & global government recruitment portal criteria',
      'Ensures applicant roll numbers, names, and seal stamps remain crystal clear',
      '100% client-side privacy: your sensitive marks and caste documents are never stored online',
      'Instant download ready for immediate form submission'
    ],
    howToSteps: [
      { name: 'Upload Application Certificate', text: 'Select your scanned 10th/12th marksheet, degree, or caste certificate.' },
      { name: 'Choose Size Preset', text: 'Select Recommended for <200KB or Extreme for <100KB limits.' },
      { name: 'Download & Upload to Portal', text: 'Upload your verified, compressed PDF to your job application portal.' }
    ],
    faqs: [
      {
        question: 'Will government job portals reject my marksheet if text is compressed?',
        answer: 'No! Our tool selectively compresses background raster textures while maintaining crisp text contrast.'
      }
    ],
    relatedSlugs: ['compress-pdf-to-100kb', 'convert-aadhaar-to-pdf', 'marksheet-to-pdf', 'signature-to-pdf']
  },
  {
    slug: 'compress-pdf-for-email',
    toolId: 'compress',
    category: 'size-target',
    title: 'Compress PDF for Email Attachment',
    shortName: 'PDF for Email',
    h1: 'Compress PDF for Email Attachment Online Free',
    subTitle: 'Shrink bulky PDF files to easily attach to Gmail, Outlook, Yahoo, and Apple Mail.',
    metaTitle: 'Compress PDF for Email Online Free - Avoid Attachment Bounces',
    metaDescription: 'Compress PDF files for email attachments online. Avoid file size limits on Gmail, Outlook, and Yahoo with 100% private in-browser compression.',
    intro: 'Large email attachments can bounce or clog your recipient’s inbox. Optimize your PDF attachments so they transfer instantly over mobile networks.',
    badge: 'Gmail & Outlook',
    targetKeywords: ['compress pdf for email', 'reduce pdf size to send email', 'make pdf smaller for gmail attachment'],
    features: [
      'Easily fits standard 20MB/25MB email attachment caps',
      'Fast downloading for mobile email recipients',
      '100% private client-side processing',
      'Unlimited usage with zero subscription fees'
    ],
    howToSteps: [
      { name: 'Upload PDF', text: 'Select the file you want to email.' },
      { name: 'Choose Setting', text: 'Pick Recommended compression.' },
      { name: 'Download & Send', text: 'Attach the lightweight PDF to your email.' }
    ],
    faqs: [
      {
        question: 'What is the maximum attachment size for Gmail and Outlook?',
        answer: 'Gmail allows up to 25MB, while Outlook often caps attachments at 20MB. Compressing your file ensures smooth delivery.'
      }
    ],
    relatedSlugs: ['compress-pdf-to-500kb', 'compress-pdf-for-whatsapp', 'compress-pdf']
  },
  {
    slug: 'compress-pdf-for-whatsapp',
    toolId: 'compress',
    category: 'size-target',
    title: 'Compress PDF for WhatsApp Sharing',
    shortName: 'PDF for WhatsApp',
    h1: 'Compress PDF for WhatsApp & Mobile Messaging',
    subTitle: 'Reduce PDF size for lightning-fast WhatsApp, Telegram, and mobile chat sharing.',
    metaTitle: 'Compress PDF for WhatsApp Online Free - Fast Mobile Sharing',
    metaDescription: 'Compress PDF files for WhatsApp and mobile messaging online. Share contracts and notes instantly without consuming mobile data. 100% private.',
    intro: 'Share PDFs over WhatsApp, Telegram, or SMS without wasting cellular data or waiting for long uploads. Our lightweight PDFs open immediately on phones.',
    badge: 'Mobile Optimized',
    targetKeywords: ['compress pdf for whatsapp', 'reduce pdf size for whatsapp share', 'send pdf on whatsapp fast'],
    features: [
      'Instant mobile opening on iPhone and Android',
      'Saves recipient cellular mobile data',
      '100% private in-browser compression',
      'No watermarks or app downloads'
    ],
    howToSteps: [
      { name: 'Upload PDF', text: 'Select the document you wish to share.' },
      { name: 'Compress File', text: 'Choose your desired compression strength.' },
      { name: 'Share on WhatsApp', text: 'Download and send via WhatsApp directly.' }
    ],
    faqs: [
      {
        question: 'Does WhatsApp compress PDF files automatically?',
        answer: 'No, WhatsApp sends PDF documents in their original byte size without compression. Compressing them with PDFUltraHub first saves data.'
      }
    ],
    relatedSlugs: ['compress-pdf-for-email', 'compress-pdf-to-500kb', 'compress-pdf']
  },

  // ==========================================
  // 4. USE-CASE & DOCUMENT-SPECIFIC (INDIA & GLOBAL)
  // ==========================================
  {
    slug: 'convert-aadhaar-to-pdf',
    toolId: 'images-to-pdf',
    category: 'use-case',
    title: 'Convert Aadhaar Card to PDF',
    shortName: 'Aadhaar to PDF',
    h1: 'Convert Aadhaar Card Front & Back to Single PDF Online',
    subTitle: 'Combine front and back photos of your Aadhaar card into a clean, verified single-page PDF document.',
    metaTitle: 'Convert Aadhaar Card Photo to PDF Online Free (Front & Back)',
    metaDescription: 'Convert Aadhaar card photos (front and back) into a single clean PDF online for free. 100% private in-browser conversion with zero cloud uploads.',
    intro: 'When applying for bank accounts, passport verification, KYC, SIM cards, or government schemes, you often need both the front and back of your Aadhaar card combined into a single PDF. PDFUltraHub merges your Aadhaar photos directly inside your browser so your UIDAI identity numbers never touch external servers.',
    badge: '100% Privacy Secure',
    targetKeywords: ['convert aadhaar to pdf', 'aadhaar card front and back to pdf', 'combine aadhaar photos into pdf', 'aadhaar card to pdf online free'],
    targetAudience: 'Indian Citizens, KYC Verification, Banking Applicants, Job Seekers',
    features: [
      'Combine front side and back side photos into one clean PDF document',
      '100% client-side privacy: your Aadhaar details never leave your device',
      'Clean A4 page formatting suitable for banking and official KYC',
      'Instant download with zero registration'
    ],
    howToSteps: [
      { name: 'Upload Front & Back Photos', text: 'Select the front and back photos of your Aadhaar card.' },
      { name: 'Set Order & Layout', text: 'Arrange Front side first, Back side second in Portrait A4 mode.' },
      { name: 'Download Aadhaar PDF', text: 'Click "Convert to PDF" to get your verified KYC document.' }
    ],
    faqs: [
      {
        question: 'Is it safe to convert my Aadhaar card on this website?',
        answer: 'Yes! PDFUltraHub processes images 100% locally in your device browser RAM. Your identity photos are never uploaded or stored on any server.'
      },
      {
        question: 'Can I combine both front and back sides onto one document?',
        answer: 'Yes! Select both images and our converter will compile them into a unified PDF ready for KYC submission.'
      }
    ],
    relatedSlugs: ['pan-card-to-pdf', 'convert-id-card-to-pdf', 'driving-license-to-pdf', 'compress-pdf-to-100kb']
  },
  {
    slug: 'pan-card-to-pdf',
    toolId: 'images-to-pdf',
    category: 'use-case',
    title: 'Convert PAN Card to PDF',
    shortName: 'PAN Card to PDF',
    h1: 'Convert PAN Card Photo to PDF Online Free (KYC Ready)',
    subTitle: 'Transform your PAN card snapshot or scan into a crisp, high-resolution PDF document for income tax & banking KYC.',
    metaTitle: 'Convert PAN Card to PDF Online Free - Income Tax & KYC Ready',
    metaDescription: 'Convert PAN card photos and scans to PDF online for free. Ideal for income tax filings, demat accounts, and banking KYC. 100% private client-side.',
    intro: 'Need to submit your PAN card for income tax verification, demat account opening (Zerodha, Groww, AngelOne), or loan approvals? Turn your smartphone camera photo into an official, clean PDF in seconds.',
    badge: 'KYC & Demat Ready',
    targetKeywords: ['pan card to pdf', 'convert pan card photo to pdf', 'pan card scan to pdf online', 'pan card pdf for kyc'],
    features: [
      'Converts camera photos into crisp, standardized PDF documents',
      'Guarantees PAN number, photo, and signature remain sharp and clear',
      '100% private in-browser conversion with zero cloud storage',
      'Accepted across all major banks, NSDL, and UTI portals'
    ],
    howToSteps: [
      { name: 'Upload PAN Card Photo', text: 'Select the picture or scan of your PAN card.' },
      { name: 'Review Margins', text: 'Choose standard A4 or Fit-to-Image format.' },
      { name: 'Download PAN PDF', text: 'Save your standardized PDF document.' }
    ],
    faqs: [
      {
        question: 'Will the PAN card signature and QR code be clearly visible?',
        answer: 'Yes! We embed high-resolution image data without destructive compression, ensuring QR codes and signatures are legible.'
      }
    ],
    relatedSlugs: ['convert-aadhaar-to-pdf', 'convert-id-card-to-pdf', 'signature-to-pdf', 'compress-pdf-to-100kb']
  },
  {
    slug: 'convert-id-card-to-pdf',
    toolId: 'images-to-pdf',
    category: 'use-case',
    title: 'Convert ID Card to PDF',
    shortName: 'ID Card to PDF',
    h1: 'Convert ID Card to PDF Online Free (Front & Back Combined)',
    subTitle: 'Merge student IDs, employee badges, national IDs, and voter cards into an official single PDF.',
    metaTitle: 'Convert ID Card to PDF Online Free - Front & Back Combiner',
    metaDescription: 'Convert identity cards to PDF online for free. Combine front and back sides into one clean PDF document. 100% private in-browser processing.',
    intro: 'Whether applying for remote work verification, university registrations, or security clearances, convert your identification badge or identity card photos into an organized single PDF.',
    badge: 'Universal ID',
    targetKeywords: ['convert id card to pdf', 'id card front and back to pdf', 'identity card to pdf converter', 'student id to pdf'],
    features: [
      'Merges multi-side card scans into a single organized file',
      'Supports student badges, employee IDs, and national identity cards',
      '100% private browser-side conversion',
      'Instant download without registration'
    ],
    howToSteps: [
      { name: 'Upload ID Photos', text: 'Select front and back images of your ID card.' },
      { name: 'Arrange Layout', text: 'Order front first and back second.' },
      { name: 'Download PDF', text: 'Export your combined identity document.' }
    ],
    faqs: [
      {
        question: 'Are my identity documents saved on your servers?',
        answer: 'Never! Everything is processed purely within your device’s local browser memory.'
      }
    ],
    relatedSlugs: ['convert-aadhaar-to-pdf', 'driving-license-to-pdf', 'voter-id-to-pdf', 'passport-photo-to-pdf']
  },
  {
    slug: 'signature-to-pdf',
    toolId: 'sign',
    category: 'use-case',
    title: 'Convert Signature to PDF',
    shortName: 'Signature to PDF',
    h1: 'Create & Convert Digital Signature to PDF Online',
    subTitle: 'Draw a digital signature or convert paper signature scans into a clean PDF signature file.',
    metaTitle: 'Convert Signature to PDF Online Free - Digital E-Sign Creator',
    metaDescription: 'Create digital signatures or convert signature photos to PDF online for free. Clean background, high contrast, 100% private in-browser creator.',
    intro: 'Many online exam and job application forms ask for a signature in PDF format under 50KB. Draw your signature directly with our visual canvas or upload a paper photo to generate a clean PDF signature.',
    badge: 'Exam & Form Ready',
    targetKeywords: ['signature to pdf', 'convert signature photo to pdf', 'draw signature to pdf', 'digital signature pdf creator'],
    features: [
      'Draw smooth signatures on touchscreen, stylus, or mouse',
      'Export directly to clean PDF format',
      'Quick positioning presets for document placement',
      '100% private client-side creation'
    ],
    howToSteps: [
      { name: 'Draw Signature', text: 'Draw your signature on the digital canvas.' },
      { name: 'Customize Style', text: 'Choose black or blue ink color.' },
      { name: 'Download Signature PDF', text: 'Export as an official signed PDF document.' }
    ],
    faqs: [
      {
        question: 'Can I use this signature on official forms?',
        answer: 'Yes! The output is a standard PDF document containing your high-resolution signature.'
      }
    ],
    relatedSlugs: ['sign-pdf', 'compress-pdf-to-50kb', 'pan-card-to-pdf']
  },
  {
    slug: 'driving-license-to-pdf',
    toolId: 'images-to-pdf',
    category: 'use-case',
    title: 'Convert Driving License to PDF',
    shortName: 'DL to PDF',
    h1: 'Convert Driving License to PDF Online Free (Front & Back)',
    subTitle: 'Combine front and back photos of your driver’s license into a verified single PDF document.',
    metaTitle: 'Convert Driving License to PDF Online Free - Front & Back',
    metaDescription: 'Convert Driving License photos to PDF online for free. Combine front and back scans into a single verified document. 100% private client-side.',
    intro: 'Submit your driving license for car rentals, insurance claims, vehicle registration, and identity proof by converting both sides into a clean single PDF.',
    badge: 'Insurance & Rental Ready',
    targetKeywords: ['driving license to pdf', 'convert dl photo to pdf', 'driver license front and back to pdf'],
    features: [
      'Combine front and back license photos in one PDF',
      'High clarity ensures license number and validity dates are sharp',
      '100% private: no document leaves your local device',
      'Accepted by insurance companies, RTOs, and rental services'
    ],
    howToSteps: [
      { name: 'Upload License Photos', text: 'Select front and back photos of your driving license.' },
      { name: 'Set Order', text: 'Position front image first, back image second.' },
      { name: 'Download PDF', text: 'Save your compiled driving license PDF.' }
    ],
    faqs: [
      {
        question: 'Is my driving license photo safe from third parties?',
        answer: 'Yes, 100%! All file merging runs locally in your web browser memory.'
      }
    ],
    relatedSlugs: ['convert-aadhaar-to-pdf', 'convert-id-card-to-pdf', 'passport-photo-to-pdf']
  },
  {
    slug: 'voter-id-to-pdf',
    toolId: 'images-to-pdf',
    category: 'use-case',
    title: 'Convert Voter ID Card to PDF',
    shortName: 'Voter ID to PDF',
    h1: 'Convert Voter ID (EPIC Card) to PDF Online Free',
    subTitle: 'Combine front and back photos of your Voter Identity Card into an official single PDF.',
    metaTitle: 'Convert Voter ID Card to PDF Online Free - Front & Back EPIC',
    metaDescription: 'Convert Voter ID (EPIC Card) photos to PDF online for free. Combine front and back sides into a verified KYC PDF document. 100% private.',
    intro: 'Convert your Election Commission Voter ID Card (EPIC) photos into a standardized PDF document for address proof, passport verification, or state welfare schemes.',
    badge: 'Address Proof Ready',
    targetKeywords: ['voter id to pdf', 'convert voter card to pdf', 'epic card to pdf online', 'voter id front back pdf'],
    features: [
      'Combines front and back sides into a clean single PDF file',
      'EPIC number and constituency details remain razor sharp',
      '100% client-side privacy protection',
      'Instant download without account creation'
    ],
    howToSteps: [
      { name: 'Upload Voter ID Photos', text: 'Select front and back images of your Voter card.' },
      { name: 'Arrange Pages', text: 'Set your preferred layout.' },
      { name: 'Download PDF', text: 'Save your verified Voter ID PDF.' }
    ],
    faqs: [
      {
        question: 'Can this be used as official address proof?',
        answer: 'Yes, compiling front and back photos into a clean PDF makes it easy to submit on government and banking portals.'
      }
    ],
    relatedSlugs: ['convert-aadhaar-to-pdf', 'driving-license-to-pdf', 'convert-id-card-to-pdf']
  },
  {
    slug: 'marksheet-to-pdf',
    toolId: 'images-to-pdf',
    category: 'use-case',
    title: 'Convert Marksheet to PDF',
    shortName: 'Marksheet to PDF',
    h1: 'Convert 10th / 12th / Degree Marksheet to PDF Online',
    subTitle: 'Transform paper marksheets, grade cards, and degree transcripts into crystal-clear PDF documents.',
    metaTitle: 'Convert Marksheet to PDF Online Free - 10th, 12th & Degree',
    metaDescription: 'Convert 10th, 12th, and college degree marksheets to PDF online for free. High resolution text for university admissions & job applications. 100% private.',
    intro: 'University admission portals and corporate recruiters require high-resolution PDF scans of academic marksheets and passing certificates. Convert photos or scans of your 10th, 12th, and university degree transcripts into professional PDFs.',
    badge: 'Admissions & Jobs',
    targetKeywords: ['marksheet to pdf', 'convert 10th marksheet to pdf', 'degree certificate to pdf', 'grade card to pdf converter'],
    features: [
      'Preserves crisp clarity on small subject grades and university seals',
      'Combine multiple semester marksheets into a single multi-page PDF',
      '100% private in-browser processing: marks and grades remain private',
      'Accepted by foreign universities, WES evaluation, and recruitment portals'
    ],
    howToSteps: [
      { name: 'Upload Marksheet Photos', text: 'Select photos or scans of your academic marksheets.' },
      { name: 'Arrange Semester Order', text: 'Drag pages into chronological order (1st to final semester).' },
      { name: 'Download Transcript PDF', text: 'Save your unified academic transcript document.' }
    ],
    faqs: [
      {
        question: 'Can I combine all my semester marksheets into one PDF?',
        answer: 'Yes! Select all your semester marksheets at once and our tool will compile them in order into a single PDF.'
      }
    ],
    relatedSlugs: ['resume-to-pdf', 'compress-pdf-to-100kb', 'compress-pdf-for-government-jobs']
  },
  {
    slug: 'resume-to-pdf',
    toolId: 'images-to-pdf',
    category: 'use-case',
    title: 'Convert Resume & CV to PDF',
    shortName: 'Resume to PDF',
    h1: 'Convert Resume & CV to PDF Online Free (ATS Ready)',
    subTitle: 'Turn your resume document, portfolio pages, and CV into a standardized PDF for recruiters.',
    metaTitle: 'Convert Resume to PDF Online Free - ATS Friendly Format',
    metaDescription: 'Convert resumes, CVs, and portfolios to PDF online for free. ATS-friendly formatting that looks flawless on every screen. 100% private client-side.',
    intro: 'Sending your resume as a Word document often results in broken formatting and misaligned bullet points on recruiters’ computers. Exporting your resume as a PDF guarantees your layout, fonts, and contact details look immaculate.',
    badge: 'Recruiter & ATS Ready',
    targetKeywords: ['resume to pdf', 'convert cv to pdf', 'cv to pdf converter online free', 'make resume into pdf'],
    features: [
      'Preserves exact typography, margins, and section spacing',
      'Flawless rendering across mobile, Mac, and Windows recruiters',
      '100% client-side privacy: personal employment history is never uploaded',
      'Standardized A4 and Letter paper dimensions'
    ],
    howToSteps: [
      { name: 'Upload Resume Pages', text: 'Select your resume document page images or scans.' },
      { name: 'Choose Page Size', text: 'Select standard A4 or US Letter.' },
      { name: 'Download Resume PDF', text: 'Save your polished PDF and apply for jobs.' }
    ],
    faqs: [
      {
        question: 'Why is PDF better than DOCX for resumes?',
        answer: 'PDF locks in your design so recruiters see exactly what you created, regardless of what software or fonts they have installed.'
      }
    ],
    relatedSlugs: ['marksheet-to-pdf', 'word-to-pdf', 'compress-pdf-to-200kb']
  },
  {
    slug: 'passport-photo-to-pdf',
    toolId: 'images-to-pdf',
    category: 'use-case',
    title: 'Passport Photo to PDF',
    shortName: 'Passport Photo PDF',
    h1: 'Convert Passport Size Photo to PDF Online Free',
    subTitle: 'Format passport size photos into a PDF document for visa applications and exam registrations.',
    metaTitle: 'Convert Passport Size Photo to PDF Online Free - Visa & Exam',
    metaDescription: 'Convert passport size photos to PDF online for free. Perfect for visa applications, passport renewals, and exam forms. 100% private client-side.',
    intro: 'Convert your 2x2 or 35x45mm passport photo snapshot into a PDF document ready to upload to government visa, embassy, and exam registration portals.',
    badge: 'Visa & Exam Ready',
    targetKeywords: ['passport photo to pdf', 'passport size photo into pdf', 'convert photo for visa to pdf', 'exam photo to pdf'],
    features: [
      'Sharp facial detail rendering for biometric compliance',
      'Easy integration with certificate documents',
      '100% in-browser processing with zero cloud storage',
      'Instant download ready for portal upload'
    ],
    howToSteps: [
      { name: 'Upload Passport Photo', text: 'Select your passport photograph snapshot.' },
      { name: 'Review Alignment', text: 'Confirm centering and orientation.' },
      { name: 'Download Photo PDF', text: 'Save your passport photo PDF document.' }
    ],
    faqs: [
      {
        question: 'Can I upload this to embassy visa portals?',
        answer: 'Yes! The resulting PDF meets standard PDF specifications required by visa application systems.'
      }
    ],
    relatedSlugs: ['photo-to-pdf', 'convert-id-card-to-pdf', 'signature-to-pdf', 'compress-pdf-to-50kb']
  },
  {
    slug: 'invoice-to-pdf',
    toolId: 'images-to-pdf',
    category: 'use-case',
    title: 'Convert Invoice to PDF',
    shortName: 'Invoice to PDF',
    h1: 'Convert Invoices & Receipts to PDF Online Free',
    subTitle: 'Turn vendor bills, tax receipts, and payment invoices into structured PDF archives.',
    metaTitle: 'Convert Invoices & Receipts to PDF Online Free - Tax & Accounts',
    metaDescription: 'Convert invoices, receipts, and bills to PDF online for free. Combine multiple receipts for expense reports and tax deductions. 100% private.',
    intro: 'Organize receipts, purchase orders, and vendor invoices into organized PDF files for accounting audits, tax deductions, and expense reimbursements.',
    badge: 'Tax & Accounting',
    targetKeywords: ['invoice to pdf', 'receipt to pdf converter', 'convert bill to pdf', 'expense receipts into single pdf'],
    features: [
      'Combine multiple expense slips into a single monthly PDF report',
      'Clear legible numbers for tax audits and GST filings',
      '100% client-side privacy protects financial records',
      'No fees or page limits'
    ],
    howToSteps: [
      { name: 'Upload Invoice Images', text: 'Select your receipt or invoice photos.' },
      { name: 'Arrange by Date', text: 'Drag receipts into chronological sequence.' },
      { name: 'Download PDF Archive', text: 'Save your completed invoice PDF.' }
    ],
    faqs: [
      {
        question: 'Can I combine multiple receipts into one expense PDF?',
        answer: 'Yes! Select 10, 20, or more receipts and merge them into a single PDF document.'
      }
    ],
    relatedSlugs: ['bank-statement-to-pdf', 'jpg-to-pdf', 'compress-pdf-for-email']
  },
  {
    slug: 'bank-statement-to-pdf',
    toolId: 'images-to-pdf',
    category: 'use-case',
    title: 'Bank Statement to PDF',
    shortName: 'Bank Statement PDF',
    h1: 'Convert Bank Statements & Passbook to PDF Online',
    subTitle: 'Merge passbook photos and account statement snapshots into a clean PDF for loans and visas.',
    metaTitle: 'Convert Bank Statement to PDF Online Free - Loan & Visa Ready',
    metaDescription: 'Convert bank statement photos and passbook scans to PDF online for free. Combine multiple months for loan & visa approvals with 100% privacy.',
    intro: 'Applying for a home loan, credit card, or travel visa? Combine your 3-month or 6-month bank statement photos and passbook scans into a clean, verified PDF.',
    badge: 'Loan & Visa Ready',
    targetKeywords: ['bank statement to pdf', 'passbook to pdf converter', 'convert bank statement photos to pdf', '6 month bank statement pdf'],
    features: [
      'Combine multi-month statement scans into one chronological PDF',
      '100% private: your account balances and transaction data never touch external servers',
      'High clarity preserves transaction details, IFSC codes, and account numbers',
      'Instant download without registration'
    ],
    howToSteps: [
      { name: 'Upload Statement Pages', text: 'Select photos of your bank passbook or statement sheets.' },
      { name: 'Order Months Sequentially', text: 'Drag pages into chronological order.' },
      { name: 'Download Statement PDF', text: 'Save your combined financial verification document.' }
    ],
    faqs: [
      {
        question: 'Is my financial data safe on this site?',
        answer: 'Yes! PDFUltraHub works 100% inside your browser memory using WebAssembly. No financial records are ever sent across the network.'
      }
    ],
    relatedSlugs: ['invoice-to-pdf', 'compress-pdf-to-200kb', 'convert-aadhaar-to-pdf']
  },
  {
    slug: 'contract-sign-pdf',
    toolId: 'sign',
    category: 'use-case',
    title: 'Sign Legal Contracts Online',
    shortName: 'Contract Signer',
    h1: 'Sign Legal Contracts & Agreements Online Free',
    subTitle: 'Execute NDAs, lease agreements, freelancer contracts, and sales proposals with legally compliant e-signatures.',
    metaTitle: 'Sign Contracts & Agreements Online Free - Private E-Signer',
    metaDescription: 'Sign contracts, NDAs, rental agreements, and business proposals online for free. Draw digital signatures and add date stamps with 100% browser privacy.',
    intro: 'Sign commercial contracts, non-disclosure agreements (NDAs), freelance work orders, and tenancy leases without paying monthly subscription fees. Draw your legal signature and place date stamps in seconds.',
    badge: 'Commercial & Legal',
    targetKeywords: ['sign contract pdf online', 'e-sign agreement free', 'sign nda online', 'sign rental lease agreement pdf'],
    features: [
      'Draw legally styled digital hand signatures or type initials',
      'Add date stamps, signee names, and acceptance checkmarks',
      '1-click preset positioning at end of document signature lines',
      '100% confidential: agreement content stays strictly in your browser'
    ],
    howToSteps: [
      { name: 'Upload Contract Document', text: 'Open your agreement or contract PDF.' },
      { name: 'Add Signature & Date', text: 'Draw your signature and click "Bottom Right" to place on signature line.' },
      { name: 'Download Executed Contract', text: 'Save your signed legal PDF file.' }
    ],
    faqs: [
      {
        question: 'Are agreements signed here legally valid?',
        answer: 'Yes! In most jurisdictions (such as US ESIGN Act, EU eIDAS, and Indian IT Act), electronic signatures placed with intent to sign are legally recognized.'
      }
    ],
    relatedSlugs: ['sign-pdf', 'fill-pdf', 'signature-to-pdf', 'protect-pdf']
  },
  {
    slug: 'govt-exam-form-packager',
    toolId: 'packager',
    category: 'size-target',
    title: '1-Click Govt Exam Form Packager (< 200KB)',
    shortName: 'Govt Form Packager',
    h1: '1-Click Govt Exam Form Packager (Photo, Signature & PDF < 200KB)',
    subTitle: 'Auto-crop photo to 3.5x4.5cm (<50KB), whiten signature (<20KB), and merge documents into 1 PDF under 200KB.',
    metaTitle: '1-Click Govt Exam Form Packager - Photo, Signature & PDF Resizer (< 200KB)',
    metaDescription: '100% free tool for UPSC, SSC, NTA, JEE, NEET, IBPS aspirants. Auto-crop passport photo, enhance signature, and combine all documents into 1 PDF under 200KB.',
    intro: 'Applying for government exams and job portals requires strict adherence to image dimensions and file size caps. This 1-Click Form Packager automatically sizes your photo (3.5x4.5cm < 50KB), signature (< 20KB), and compiles your identity cards into a single verified PDF dossier under 200 KB.',
    badge: 'UPSC / SSC / NTA',
    targetKeywords: ['govt exam form packager', 'upsc photo signature resize', 'ssc form photo 50kb', 'combine documents for exam form 200kb', 'nta exam photo compressor'],
    features: [
      'Pre-configured presets for UPSC, SSC, IBPS, and State PSC portals',
      'Auto-crops photo to 3.5cm x 4.5cm and signature to 3.5cm x 1.5cm',
      'Built-in paper whitening filter to clean scanned signatures',
      'Guaranteed combined PDF strictly under 200 KB or 100 KB limits',
      '1-Click ZIP export containing individual resized images + combined PDF'
    ],
    howToSteps: [
      { name: 'Select Exam Preset', text: 'Choose UPSC / SSC or custom target size limit.' },
      { name: 'Upload Photo & Signature', text: 'Drop your passport photo, signature, and ID cards into the designated slots.' },
      { name: 'Enhance & Adjust', text: 'Use brightness/contrast sliders or auto paper whitener if needed.' },
      { name: 'Download PDF or ZIP', text: 'Click "Generate Combined PDF" or download individual verified images.' }
    ],
    faqs: [
      {
        question: 'Will this satisfy UPSC and SSC photo & signature requirements?',
        answer: 'Yes! It formats the photo to 3.5x4.5cm under 50KB and signature to 3.5x1.5cm under 20KB, matching standard SSC/UPSC requirements.'
      },
      {
        question: 'Can I download the photo and signature separately?',
        answer: 'Yes! Each slot has an instant download button, plus a "Download ZIP Package" button for all assets.'
      }
    ],
    relatedSlugs: ['college-admission-form-packager', 'compress-pdf-to-200kb', 'compress-pdf-for-government-jobs', 'convert-aadhaar-to-pdf']
  },
  {
    slug: 'college-admission-form-packager',
    toolId: 'packager',
    category: 'size-target',
    title: 'College Admission Document Packager (< 200KB)',
    shortName: 'College Admission Packager',
    h1: 'College & University Admission Document Packager (< 200KB)',
    subTitle: 'Merge passport photo, signature, ID proof, and marksheets into a single clean PDF under 200 KB.',
    metaTitle: 'College Admission Document Packager - Merge All Docs into 1 PDF < 200KB',
    metaDescription: '100% free tool to combine student passport photo, signature, Aadhaar card, and marksheets into a single application PDF under 200KB with 100% client privacy.',
    intro: 'Universities and college admission portals frequently require applicants to upload all documents (photo, signature, identity proof, and 10th/12th marksheets) merged into a single PDF under 200 KB. This tool combines and compresses everything locally in your browser memory in one click.',
    badge: 'Admissions 2026',
    targetKeywords: ['college admission pdf packager', 'combine all documents in 1 pdf under 200kb', 'university form doc merger 200kb', 'student admission form compressor'],
    features: [
      'Combines photo, signature, ID proof, and marksheets into 1 PDF',
      'Includes applicant profile overview card with verification checklist',
      'Iterative compression guarantees final file stays strictly under 200 KB',
      '100% private in-browser RAM processing'
    ],
    howToSteps: [
      { name: 'Select College Admission Preset', text: 'Select "College & University Admission (< 200KB)".' },
      { name: 'Upload Student Documents', text: 'Add passport photo, signature, ID proof, and academic marksheets.' },
      { name: 'Package & Download PDF', text: 'Click "Generate Combined PDF" to save your admission dossier.' }
    ],
    faqs: [
      {
        question: 'What if my marksheets are blurry after compression?',
        answer: 'Our adaptive compression algorithm preserves high contrast on text areas while scaling background image compression, keeping roll numbers and marks readable.'
      }
    ],
    relatedSlugs: ['govt-exam-form-packager', 'compress-pdf-to-200kb', 'marksheet-to-pdf', 'convert-id-card-to-pdf']
  }
];


/**
 * Fast lookup helper by slug
 */
export function getSeoPageBySlug(slug: string): SeoPageData | undefined {
  const cleanSlug = slug.replace(/^\//, '').toLowerCase();
  return SEO_PAGES.find(p => p.slug === cleanSlug);
}
