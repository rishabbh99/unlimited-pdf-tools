import React from 'react';
import { ShieldCheck, Lock, Cpu, EyeOff } from 'lucide-react';

export const PrivacyBadge: React.FC<{ compact?: boolean }> = ({ compact = false }) => {
  if (compact) {
    return (
      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-100 text-green-700 dark:bg-emerald-950 dark:text-emerald-400 border border-green-200 dark:border-emerald-800 text-xs font-bold uppercase">
        <ShieldCheck className="w-3.5 h-3.5" />
        <span>100% Client-Side Memory</span>
      </div>
    );
  }

  return (
    <div className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 sm:p-5 my-6 shadow-sm">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-start sm:items-center gap-3">
          <div className="p-2.5 rounded-lg bg-emerald-500 text-white shadow-sm shrink-0">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-slate-800 dark:text-slate-100 text-base sm:text-lg">
                100% Client-Side Browser Native Privacy
              </h3>
              <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase bg-green-100 text-green-700 dark:bg-emerald-950 dark:text-emerald-300 border border-green-200 dark:border-emerald-800">
                Zero Server Uploads
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
              Your files are processed strictly inside your local browser memory using JavaScript & WebAssembly. No data ever leaves your computer.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 text-center text-[11px] sm:text-xs font-semibold text-slate-700 dark:text-slate-300 w-full md:w-auto shrink-0 border-t md:border-t-0 md:border-l border-slate-200 dark:border-slate-800 pt-3 md:pt-0 md:pl-4">
          <div className="flex flex-col items-center gap-1 p-1">
            <Lock className="w-4 h-4 text-emerald-500" />
            <span>Zero Server Logs</span>
          </div>
          <div className="flex flex-col items-center gap-1 p-1">
            <Cpu className="w-4 h-4 text-indigo-500" />
            <span>Local RAM Only</span>
          </div>
          <div className="flex flex-col items-center gap-1 p-1">
            <EyeOff className="w-4 h-4 text-indigo-600" />
            <span>GDPR/HIPAA Ready</span>
          </div>
        </div>
      </div>
    </div>
  );
};
