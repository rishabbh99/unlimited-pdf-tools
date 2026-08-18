import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { FileUploader } from '../FileUploader';
import { PrivacyBadge } from '../PrivacyBadge';
import { AdBanner } from '../AdBanner';
import { ShieldCheck, Download, RefreshCw, CheckCircle, Lock, LockOpen } from 'lucide-react';
import { encryptPDF, AlreadyEncryptedError } from '@pdfsmaller/pdf-encrypt';
import { PDFDocument } from 'pdf-lib';

export const ProtectTool: React.FC = () => {
  const [mode, setMode] = useState<'protect' | 'unlock'>('protect');
  const [file, setFile] = useState<File | null>(null);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [processedBytes, setProcessedBytes] = useState<Uint8Array | null>(null);

  const handleFileSelected = (files: File[]) => {
    if (files.length > 0) {
      setFile(files[0]);
      setPassword('');
      setConfirmPassword('');
      setProcessedBytes(null);
    }
  };

  const triggerFileDownload = (bytes: Uint8Array) => {
    if (!file) return;
    const blob = new Blob([bytes], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    const suffix = mode === 'protect' ? '_protected.pdf' : '_unlocked.pdf';
    link.download = file.name.replace(/\.pdf$/i, suffix);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleProtect = async () => {
    if (!file || !password) return;
    if (password !== confirmPassword) {
      alert('Passwords do not match. Please check and try again.');
      return;
    }
    setIsProcessing(true);
    try {
      const buffer = await file.arrayBuffer();
      const inputBytes = new Uint8Array(buffer);

      // Apply AES-256 password encryption to PDF
      const bytes = await encryptPDF(inputBytes, password, {
        ownerPassword: password,
        algorithm: 'AES-256',
        allowPrinting: true,
        allowModifying: true,
        allowCopying: true,
        allowFillingForms: true,
      });

      setProcessedBytes(bytes);
      confetti({ particleCount: 70, spread: 60, origin: { y: 0.7 } });
      triggerFileDownload(bytes);
    } catch (err: any) {
      console.error('Protect Error:', err);
      if (err instanceof AlreadyEncryptedError || err?.code === 'ALREADY_ENCRYPTED') {
        alert('This PDF file is already password-protected! Switch to "Unlock PDF" tab to remove protection.');
      } else {
        alert('Failed to encrypt PDF: ' + (err?.message || 'Unknown error'));
      }
    } finally {
      setIsProcessing(false);
    }
  };

  const handleUnlock = async () => {
    if (!file || !password) return;
    setIsProcessing(true);
    try {
      const buffer = await file.arrayBuffer();
      // Load encrypted PDF with supplied password and resave unencrypted
      const pdfDoc = await PDFDocument.load(buffer, { password } as any);
      const bytes = await pdfDoc.save();

      setProcessedBytes(bytes);
      confetti({ particleCount: 70, spread: 60, origin: { y: 0.7 } });
      triggerFileDownload(bytes);
    } catch (err: any) {
      console.error('Unlock Error:', err);
      alert('Incorrect password or failed to unlock PDF. Please check the password and try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (processedBytes) {
      triggerFileDownload(processedBytes);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-6 px-4">
      <PrivacyBadge compact />

      {/* Mode Switcher Tabs */}
      <div className="flex justify-center mb-6">
        <div className="inline-flex p-1.5 bg-slate-200 dark:bg-slate-800 rounded-2xl">
          <button
            onClick={() => {
              setMode('protect');
              setProcessedBytes(null);
            }}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
              mode === 'protect'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Lock className="w-4 h-4" />
            <span>Lock / Protect PDF</span>
          </button>
          <button
            onClick={() => {
              setMode('unlock');
              setProcessedBytes(null);
            }}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
              mode === 'unlock'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <LockOpen className="w-4 h-4" />
            <span>Unlock PDF</span>
          </button>
        </div>
      </div>

      {!file ? (
        <FileUploader
          onFilesSelected={handleFileSelected}
          title={mode === 'protect' ? 'Password Protect & Encrypt PDF' : 'Unlock Password Protected PDF'}
          subtitle={
            mode === 'protect'
              ? 'Set a secure password on your confidential PDF files. 100% Client-Side AES-256 Encryption.'
              : 'Remove password restrictions from your protected PDF file in seconds.'
          }
          buttonText="Select PDF File"
        />
      ) : (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-base line-clamp-1">
                    {file.name}
                  </h3>
                  <p className="text-xs text-slate-500">
                    {mode === 'protect' ? 'PDF Encryption' : 'PDF Decryption'}
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

            {!processedBytes && (
              <div className="mt-6 space-y-4 max-w-md mx-auto">
                {mode === 'protect' ? (
                  <>
                    <div>
                      <label className="text-xs font-bold text-slate-500 uppercase block mb-1">
                        Set Password:
                      </label>
                      <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter password..."
                        className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-semibold focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-500 uppercase block mb-1">
                        Confirm Password:
                      </label>
                      <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirm password..."
                        className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-semibold focus:outline-none"
                      />
                    </div>

                    <div className="pt-2">
                      <button
                        onClick={handleProtect}
                        disabled={isProcessing || !password}
                        className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-sm shadow-lg flex items-center justify-center gap-2 disabled:opacity-50"
                      >
                        {isProcessing ? (
                          <>
                            <RefreshCw className="w-4 h-4 animate-spin" />
                            <span>Encrypting Document...</span>
                          </>
                        ) : (
                          <>
                            <Lock className="w-4 h-4" />
                            <span>Encrypt & Lock PDF</span>
                          </>
                        )}
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <label className="text-xs font-bold text-slate-500 uppercase block mb-1">
                        Enter Existing PDF Password:
                      </label>
                      <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter file password..."
                        className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-semibold focus:outline-none"
                      />
                    </div>

                    <div className="pt-2">
                      <button
                        onClick={handleUnlock}
                        disabled={isProcessing || !password}
                        className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-sm shadow-lg flex items-center justify-center gap-2 disabled:opacity-50"
                      >
                        {isProcessing ? (
                          <>
                            <RefreshCw className="w-4 h-4 animate-spin" />
                            <span>Unlocking PDF...</span>
                          </>
                        ) : (
                          <>
                            <LockOpen className="w-4 h-4" />
                            <span>Unlock & Remove Password</span>
                          </>
                        )}
                      </button>
                    </div>
                  </>
                )}
              </div>
            )}

            {processedBytes && (
              <div className="mt-6 p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-center space-y-4 animate-fade-in">
                <div className="w-12 h-12 mx-auto rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-lg">
                  <CheckCircle className="w-6 h-6" />
                </div>
                <h4 className="text-xl font-extrabold text-slate-900 dark:text-white">
                  {mode === 'protect' ? 'PDF Password Protection Applied!' : 'PDF Unlocked Successfully!'}
                </h4>
                <div className="pt-2 flex flex-col sm:flex-row justify-center gap-3">
                  <button
                    onClick={handleDownload}
                    className="px-8 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm shadow-lg flex items-center justify-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download {mode === 'protect' ? 'Protected' : 'Unlocked'} PDF</span>
                  </button>
                  <button
                    onClick={() => {
                      setFile(null);
                      setProcessedBytes(null);
                    }}
                    className="px-5 py-3.5 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold text-sm"
                  >
                    Process Another File
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
