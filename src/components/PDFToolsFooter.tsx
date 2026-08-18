import React from 'react';
import { SEO_PAGES, SEO_CATEGORIES } from '../data/seoPages';
import { Sparkles, Layers, ShieldCheck, Zap, FileText } from 'lucide-react';

interface PDFToolsFooterProps {
  onNavigate: (path: string) => void;
}

export const PDFToolsFooter: React.FC<PDFToolsFooterProps> = ({ onNavigate }) => {
  return (
    <div className="w-full bg-slate-900 border-t border-slate-800 text-slate-300 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Directory Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="p-1 rounded bg-indigo-500/20 text-indigo-400">
                <Sparkles className="w-4 h-4" />
              </span>
              <h3 className="text-sm font-extrabold uppercase tracking-wider text-indigo-400">
                Programmatic SEO Directory & Silo Hub
              </h3>
            </div>
            <p className="text-xs text-slate-400 max-w-2xl leading-relaxed">
              Fast, 100% private client-side PDF conversions and utilities. All tools execute locally inside browser memory without file uploads.
            </p>
          </div>
          
          <div className="flex items-center gap-4 text-xs font-semibold text-emerald-400">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4" />
              100% Client-Side Privacy
            </span>
            <span className="flex items-center gap-1.5 text-blue-400">
              <Zap className="w-4 h-4" />
              Zero File Uploads
            </span>
          </div>
        </div>

        {/* Categorized Silos Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {SEO_CATEGORIES.map((cat) => {
            const categoryPages = SEO_PAGES.filter((p) => p.category === cat.id);
            return (
              <div key={cat.id} className="space-y-3">
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-white flex items-center gap-2 border-b border-slate-800 pb-2">
                  <FileText className="w-3.5 h-3.5 text-indigo-400" />
                  <span>{cat.title}</span>
                  <span className="ml-auto text-[10px] px-1.5 py-0.5 rounded-full bg-slate-800 text-slate-400">
                    {categoryPages.length}
                  </span>
                </h4>
                
                <ul className="space-y-1.5">
                  {categoryPages.map((page) => (
                    <li key={page.slug}>
                      <a
                        href={`/${page.slug}`}
                        onClick={(e) => {
                          e.preventDefault();
                          onNavigate(`/${page.slug}`);
                        }}
                        className="group flex items-center justify-between py-1.5 px-2 rounded-lg hover:bg-slate-800/80 transition-colors text-left"
                      >
                        <span className="text-xs text-slate-300 group-hover:text-indigo-300 font-medium truncate">
                          {page.shortName}
                        </span>
                        {page.badge && (
                          <span className="text-[10px] px-1.5 py-0.2 rounded bg-indigo-500/10 text-indigo-400 font-bold shrink-0 ml-1">
                            {page.badge}
                          </span>
                        )}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* AdSense / Banner Placement Container */}
        <div id="ad-slot-footer" className="w-full min-h-[90px] flex items-center justify-center overflow-hidden border-t border-slate-800/80 pt-6">
          {/* Reserved clean container slot for AdSense or Header Bidding script */}
        </div>
      </div>
    </div>
  );
};

