import React, { useState } from 'react';
import { ToolConfig, ToolSeoConfig } from '../types';
import { ALL_TOOLS, getToolByPath } from '../utils/seoHelpers';
import { SeoPageData, SEO_PAGES } from '../data/seoPages';
import { CheckCircle2, ChevronDown, HelpCircle, ArrowRight, Sparkles, Lightbulb, Link2 } from 'lucide-react';

interface SeoContentSectionProps {
  tool: ToolConfig;
  seoInfo: ToolSeoConfig;
  seoPage?: SeoPageData;
  onNavigate: (path: string) => void;
}

export const SeoContentSection: React.FC<SeoContentSectionProps> = ({
  tool,
  seoInfo,
  seoPage,
  onNavigate,
}) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Determine related programmatic pages or fallback tools
  const contextualLinks = seoPage?.relatedSlugs
    ? seoPage.relatedSlugs
        .map((slug) => SEO_PAGES.find((p) => p.slug === slug))
        .filter((p): p is SeoPageData => Boolean(p))
    : [];

  const relatedTools = ALL_TOOLS.filter((t) => t.id !== tool.id).slice(0, 4);

  return (
    <section className="mt-16 pt-12 border-t border-slate-200 dark:border-slate-800">
      
      {/* Preset Tip / Portal Guidance Callout */}
      {seoPage?.presetTip && (
        <div className="max-w-4xl mx-auto mb-10 p-5 rounded-2xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 flex items-start gap-4">
          <div className="p-2 rounded-xl bg-blue-600 text-white shrink-0">
            <Lightbulb className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-blue-900 dark:text-blue-200 mb-1">
              Optimization Advice & Portal Guidelines
            </h4>
            <p className="text-xs sm:text-sm text-blue-800 dark:text-blue-300 leading-relaxed">
              {seoPage.presetTip}
            </p>
          </div>
        </div>
      )}

      {/* Intro Header */}
      <div className="max-w-3xl mx-auto text-center mb-12">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 text-xs font-bold uppercase tracking-wider mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>100% Free & Unlimited Client-Side Utility</span>
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          About {seoInfo.h1Title}
        </h2>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-3 leading-relaxed">
          {seoInfo.descriptionText}
        </p>
      </div>

      {/* Key Features Grid */}
      <div className="max-w-4xl mx-auto bg-white/60 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm mb-12">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-500" />
          <span>Key Capabilities & Benefits</span>
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {seoInfo.features.map((feature, idx) => (
            <div key={idx} className="flex items-start gap-3 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50">
              <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                ✓
              </div>
              <span className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-medium leading-snug">
                {feature}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Step by Step How-To Guide */}
      <div className="max-w-4xl mx-auto mb-16">
        <h3 className="text-xl font-extrabold text-slate-900 dark:text-white text-center mb-8">
          How to Use {tool.name} in 3 Simple Steps
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {seoInfo.howToSteps.map((step, idx) => (
            <div key={idx} className="relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
              <div className="w-8 h-8 rounded-xl bg-blue-600 text-white font-extrabold text-sm flex items-center justify-center mb-4">
                {idx + 1}
              </div>
              <h4 className="font-bold text-slate-900 dark:text-white text-base mb-2">
                {step.name}
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                {step.text}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ Accordion */}
      {seoInfo.faqs && seoInfo.faqs.length > 0 && (
        <div className="max-w-3xl mx-auto mb-16">
          <div className="text-center mb-8">
            <div className="inline-flex p-2 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 mb-2">
              <HelpCircle className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">
              Frequently Asked Questions
            </h3>
          </div>

          <div className="space-y-3">
            {seoInfo.faqs.map((faq, idx) => (
              <div
                key={idx}
                className="border border-slate-200 dark:border-slate-800 rounded-2xl bg-white dark:bg-slate-900 overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 font-semibold text-slate-900 dark:text-white text-sm sm:text-base hover:bg-slate-50 dark:hover:bg-slate-800/50"
                >
                  <span>{faq.question}</span>
                  <ChevronDown className={`w-5 h-5 shrink-0 text-slate-400 transition-transform ${openFaq === idx ? 'rotate-180' : ''}`} />
                </button>

                {openFaq === idx && (
                  <div className="px-4 pb-5 sm:px-5 sm:pb-5 text-xs sm:text-sm text-slate-600 dark:text-slate-400 border-t border-slate-100 dark:border-slate-800/60 pt-3 leading-relaxed">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Contextual Programmatic SEO Internal Links */}
      {contextualLinks.length > 0 && (
        <div className="max-w-4xl mx-auto mb-12 bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm">
          <h3 className="text-base font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
            <Link2 className="w-4 h-4 text-blue-500" />
            <span>Related Tools & Popular Conversions</span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {contextualLinks.map((relPage) => (
              <a
                key={relPage.slug}
                href={`/${relPage.slug}`}
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate(`/${relPage.slug}`);
                }}
                className="group flex flex-col p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 hover:border-blue-500 transition-all hover:bg-blue-50/50 dark:hover:bg-blue-950/30"
              >
                <span className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
                  {relPage.shortName}
                </span>
                <span className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                  {relPage.subTitle}
                </span>
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Global Fallback Related Tools */}
      <div className="max-w-4xl mx-auto bg-slate-100 dark:bg-slate-900/40 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800">
        <h3 className="text-base font-bold text-slate-900 dark:text-white mb-4">
          Explore All Free Client-Side Tools
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {relatedTools.map((rel) => (
            <a
              key={rel.id}
              href={rel.path}
              onClick={(e) => {
                e.preventDefault();
                onNavigate(rel.path);
              }}
              className="flex items-center justify-between p-3.5 rounded-xl bg-white dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/60 hover:border-blue-500 text-left transition-all hover:scale-[1.01]"
            >
              <div>
                <span className="font-bold text-sm text-slate-900 dark:text-white block">
                  {rel.name}
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400 block line-clamp-1">
                  {rel.tagline}
                </span>
              </div>
              <ArrowRight className="w-4 h-4 text-blue-500 shrink-0 ml-2" />
            </a>
          ))}
        </div>
      </div>

    </section>
  );
};

