import React, { useRef, useState } from 'react';
import { UploadCloud, FileText, Image as ImageIcon, AlertCircle } from 'lucide-react';

interface FileUploaderProps {
  accept?: string;
  multiple?: boolean;
  onFilesSelected: (files: File[]) => void;
  title?: string;
  subtitle?: string;
  buttonText?: string;
  isImageOnly?: boolean;
}

export const FileUploader: React.FC<FileUploaderProps> = ({
  accept = '.pdf,application/pdf',
  multiple = false,
  onFilesSelected,
  title = 'Drag & drop your PDF file here',
  subtitle = 'Or click to browse files on your device (100% Client-Side Privacy)',
  buttonText = 'Choose File',
  isImageOnly = false,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const processFiles = (fileList: FileList | File[]) => {
    setErrorMsg(null);
    const validFiles: File[] = [];
    const filesArray = Array.from(fileList);

    for (const file of filesArray) {
      if (isImageOnly) {
        if (!file.type.startsWith('image/')) {
          setErrorMsg('Please select valid image files (JPG, PNG, WEBP).');
          return;
        }
      } else {
        if (file.type !== 'application/pdf' && !file.name.toLowerCase().endsWith('.pdf')) {
          setErrorMsg('Please select valid PDF documents.');
          return;
        }
      }
      validFiles.push(file);
    }

    if (validFiles.length > 0) {
      onFilesSelected(multiple ? validFiles : [validFiles[0]]);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFiles(e.dataTransfer.files);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFiles(e.target.files);
    }
  };

  return (
    <div className="w-full">
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`relative cursor-pointer border-2 border-dashed rounded-2xl p-8 sm:p-12 text-center transition-all duration-300 ${
          isDragging
            ? 'border-indigo-500 bg-indigo-500/10 scale-[1.01]'
            : 'border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900/80 hover:border-indigo-400 dark:hover:border-indigo-500 hover:bg-slate-50 dark:hover:bg-slate-800/80 shadow-sm'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={handleFileChange}
          className="hidden"
        />

        <div className="flex flex-col items-center justify-center space-y-4">
          <div className={`p-4 rounded-xl ${
            isDragging ? 'bg-indigo-600 text-white' : 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400'
          } shadow-sm transition-colors`}>
            {isImageOnly ? (
              <ImageIcon className="w-10 h-10" />
            ) : (
              <UploadCloud className="w-10 h-10" />
            )}
          </div>

          <div>
            <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {title}
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-md mx-auto">
              {subtitle}
            </p>
          </div>

          <button
            type="button"
            className="px-6 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm shadow-md transition-all hover:scale-105"
          >
            {buttonText}
          </button>
        </div>
      </div>

      {errorMsg && (
        <div className="mt-3 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}
    </div>
  );
};
