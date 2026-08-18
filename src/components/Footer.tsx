import React from 'react';
import { ALL_TOOLS } from '../utils/seoHelpers';
import { ShieldCheck, Heart, Sparkles, Lock, Zap } from 'lucide-react';

interface FooterProps {
  onNavigate: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-slate-900 text-slate-400 border-t border-slate-800 pt-12 pb-8 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          {/* Brand Info */}
          <div className="md:col-span-1 space-y-4">
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('/');
              }}
              className="flex items-center gap-2 cursor-pointer"
            >
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold">
                P
              </div>
              <span className="font-bold text-xl text-white">
                PDF<span className="text-blue-400">UltraHub</span>
              </span>
            </a>
            <p className="text-xs text-slate-400 leading-relaxed">
              100% Free & Unlimited Client-Side PDF Utility Tool Hub. Zero file size limits, zero server uploads, total privacy guaranteed.
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-400 font-medium pt-1">
              <ShieldCheck className="w-4 h-4" />
              <span>100% Native Browser Sandbox</span>
            </div>
          </div>

          {/* Edit & Security Tools */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider text-xs">
              PDF Editing & Security
            </h4>
            <ul className="space-y-2 text-xs">
              {ALL_TOOLS.filter(t => t.category === 'edit' || t.category === 'security').map(tool => (
                <li key={tool.id}>
                  <a
                    href={tool.path}
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate(tool.path);
                    }}
                    className="hover:text-white transition-colors text-left block"
                  >
                    {tool.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Convert & Organize Tools */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider text-xs">
              Conversion & Organization
            </h4>
            <ul className="space-y-2 text-xs">
              {ALL_TOOLS.filter(t => t.category === 'convert' || t.category === 'organize').map(tool => (
                <li key={tool.id}>
                  <a
                    href={tool.path}
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate(tool.path);
                    }}
                    className="hover:text-white transition-colors text-left block"
                  >
                    {tool.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* SEO Privacy Statement & Keywords */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider text-xs">
              Privacy & Compliance
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed mb-3">
              Unlike traditional PDF tools, PDF UltraHub operates entirely inside your local browser memory using modern WebAssembly and HTML5 Canvas API.
            </p>
            <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/60 text-[11px] space-y-1">
              <div className="flex items-center gap-1.5 text-slate-200 font-semibold">
                <Lock className="w-3.5 h-3.5 text-emerald-400" />
                <span>GDPR & HIPAA Compliant</span>
              </div>
              <p className="text-slate-400">
                No tracking, no storage, no remote server processing.
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} PDF UltraHub. All rights reserved. 100% Free Client-Side Utilities.</p>
          <div className="flex items-center gap-4">
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('/');
              }}
              className="hover:text-slate-300"
            >
              Home
            </a>
            <span>•</span>
            <span className="flex items-center gap-1 text-slate-400">
              Made with <Heart className="w-3 h-3 text-red-500 fill-red-500" /> for privacy lovers
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
};
