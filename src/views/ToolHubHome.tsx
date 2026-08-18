import React, { useState } from 'react';
import { ALL_TOOLS } from '../utils/seoHelpers';
import { ToolCard } from '../components/ToolCard';
import { PrivacyBadge } from '../components/PrivacyBadge';
import { AdBanner } from '../components/AdBanner';
import { Search, Sparkles, ShieldCheck, Zap, Lock, Infinity as InfinityIcon } from 'lucide-react';

interface ToolHubHomeProps {
  onNavigate: (path: string) => void;
}

export const ToolHubHome: React.FC<ToolHubHomeProps> = ({ onNavigate }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchFilter, setSearchFilter] = useState('');

  const filteredTools = ALL_TOOLS.filter((t) => {
    const matchesCategory = activeCategory === 'all' || t.category === activeCategory;
    const matchesSearch =
      searchFilter.trim() === '' ||
      t.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
      t.tagline.toLowerCase().includes(searchFilter.toLowerCase()) ||
      t.keywords.some((k) => k.toLowerCase().includes(searchFilter.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-12 py-8">
      
      {/* Top Monetization Ad Placement */}
      <AdBanner placement="top" />

      {/* Hero Section */}
      <section className="text-center max-w-4xl mx-auto px-4 pt-4 pb-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800 text-xs font-bold uppercase tracking-wider mb-4">
          <Sparkles className="w-4 h-4" />
          <span>Zero Server Cost • 100% Client-Side Memory</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
          Client-Side <br />
          <span className="text-indigo-600 dark:text-indigo-400">
            PDF Utility Hub
          </span>
        </h1>

        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 mt-4 max-w-2xl mx-auto leading-relaxed">
          Compress, OCR scanned pages, permanently redact sensitive data, merge, split, fill forms, and digitally sign PDFs completely in your browser. Zero uploads, zero daily limits, total privacy.
        </p>

        {/* Search Bar */}
        <div className="mt-8 max-w-xl mx-auto relative">
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-3.5" />
          <input
            type="text"
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            placeholder="Search PDF tools (e.g. compress, ocr, redact, sign, merge)..."
            className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
          />
        </div>
      </section>

      {/* Privacy Guarantee Badge */}
      <div className="max-w-5xl mx-auto px-4">
        <PrivacyBadge />
      </div>

      {/* Featured Tool Hero Card: 1-Click Govt Exam & College Form Packager */}
      <div className="max-w-5xl mx-auto px-4">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white p-6 sm:p-8 shadow-xl border border-blue-700/40 group">
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30 text-xs font-black uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                <span>New Student & Aspirant Tool</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                1-Click Govt Exam & College Form Packager
              </h2>
              <p className="text-xs sm:text-sm text-blue-200/80 leading-relaxed">
                Auto-crop passport photo (3.5x4.5cm under 50KB), whiten &amp; enhance signature (under 20KB), and merge all ID proofs &amp; marksheets into 1 clean PDF strictly under 200 KB.
              </p>

              <div className="flex flex-wrap items-center gap-2 pt-1">
                <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-white/10 text-white font-semibold">
                  ✓ UPSC / SSC
                </span>
                <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-white/10 text-white font-semibold">
                  ✓ NTA / JEE / NEET
                </span>
                <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-white/10 text-white font-semibold">
                  ✓ College Admissions (&lt; 200KB)
                </span>
              </div>
            </div>

            <button
              onClick={() => onNavigate('/govt-exam-form-packager')}
              className="px-6 py-3.5 rounded-2xl bg-blue-500 hover:bg-blue-400 text-slate-950 font-black text-sm shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition-all shrink-0 cursor-pointer self-start md:self-center"
            >
              Open Form Packager →
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid & Sidebar Layout */}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Left Core Tools Column */}
        <div className="lg:col-span-3 space-y-6">
          
          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-4">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
                activeCategory === 'all'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              All Tools ({ALL_TOOLS.length})
            </button>
            <button
              onClick={() => setActiveCategory('edit')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
                activeCategory === 'edit'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              Editing & Signing
            </button>
            <button
              onClick={() => setActiveCategory('convert')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
                activeCategory === 'convert'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              Convert & OCR
            </button>
            <button
              onClick={() => setActiveCategory('security')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
                activeCategory === 'security'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              Redaction & Security
            </button>
            <button
              onClick={() => setActiveCategory('organize')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
                activeCategory === 'organize'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              Merge & Split
            </button>
          </div>

          {/* Tools Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredTools.map((tool) => (
              <ToolCard
                key={tool.id}
                tool={tool}
                onClick={() => onNavigate(tool.path)}
              />
            ))}
          </div>
        </div>

        {/* Right Sidebar Ad & Info Panel */}
        <div className="space-y-6">
          {/* Feature Highlights Widget */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 space-y-4 shadow-sm">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
              Why PDF UltraHub?
            </h3>

            <ul className="space-y-3">
              <li className="flex items-start gap-2.5">
                <Lock className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-slate-800 dark:text-slate-200 block text-xs">
                    Military-Grade Privacy
                  </span>
                  <span className="text-[11px] text-slate-500 leading-normal block">
                    Files process locally in WebAssembly. No server ever touches your data.
                  </span>
                </div>
              </li>

              <li className="flex items-start gap-2.5">
                <InfinityIcon className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-slate-800 dark:text-slate-200 block text-xs">
                    Zero Daily Limits
                  </span>
                  <span className="text-[11px] text-slate-500 leading-normal block">
                    Convert, compress, and edit as many documents as you need for free.
                  </span>
                </div>
              </li>

              <li className="flex items-start gap-2.5">
                <Zap className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-slate-800 dark:text-slate-200 block text-xs">
                    Ultra-Fast Processing
                  </span>
                  <span className="text-[11px] text-slate-500 leading-normal block">
                    Instant performance with zero network transfer latency.
                  </span>
                </div>
              </li>
            </ul>
          </div>

          <AdBanner placement="sidebar" />
        </div>

      </div>

      {/* Global Drop/Action Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between p-6 sm:p-8 bg-indigo-900 rounded-2xl text-white shadow-xl gap-4">
          <div className="flex flex-col gap-1 text-center sm:text-left">
            <span className="text-xl font-extrabold tracking-tight">Drop your PDF anywhere to start</span>
            <span className="text-indigo-200 text-xs sm:text-sm">Supported formats: PDF, PNG, JPG, WEBP • 100% Client-Side Engine</span>
          </div>
          <a 
            href="/compress-pdf-unlimited"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('/compress-pdf-unlimited');
            }}
            className="px-8 py-3 bg-white text-indigo-900 font-extrabold text-sm rounded-xl shadow-lg hover:bg-slate-100 transition-all shrink-0 inline-block text-center"
          >
            Select Files
          </a>
        </div>
      </div>

    </div>
  );
};
