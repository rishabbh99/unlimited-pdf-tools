import React, { useEffect } from 'react';
import { ALL_TOOLS, getToolByPath, getToolSeoDetails, updatePageSeo } from '../utils/seoHelpers';
import { getSeoPageBySlug } from '../data/seoPages';
import { ToolConfig, ToolId } from '../types';
import { CompressTool } from '../components/tools/CompressTool';
import { OcrTool } from '../components/tools/OcrTool';
import { RedactTool } from '../components/tools/RedactTool';
import { MergeSplitTool } from '../components/tools/MergeSplitTool';
import { SignFillTool } from '../components/tools/SignFillTool';
import { ImagesToPdfTool } from '../components/tools/ImagesToPdfTool';
import { PdfToImagesTool } from '../components/tools/PdfToImagesTool';
import { RotateOrganizeTool } from '../components/tools/RotateOrganizeTool';
import { ProtectTool } from '../components/tools/ProtectTool';
import { SeoContentSection } from '../components/SeoContentSection';
import { AdBanner } from '../components/AdBanner';
import { ArrowLeft, Sparkles, ShieldCheck, Zap, Award } from 'lucide-react';

interface ToolHubViewProps {
  toolId: ToolId;
  currentPath?: string;
  onNavigate: (path: string) => void;
}

export const ToolHubView: React.FC<ToolHubViewProps> = ({ toolId, currentPath, onNavigate }) => {
  const path = currentPath || `/${toolId}`;
  const tool = getToolByPath(path) || ALL_TOOLS.find((t) => t.id === toolId);
  const seoInfo = getToolSeoDetails(path) || getToolSeoDetails(toolId);
  
  const slug = path.replace(/^\//, '');
  const seoPage = getSeoPageBySlug(slug);

  useEffect(() => {
    updatePageSeo(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [path, toolId]);

  if (!tool || !seoInfo) {
    return (
      <div className="text-center py-16">
        <h2 className="text-xl font-bold">Tool Not Found</h2>
        <button
          onClick={() => onNavigate('/')}
          className="mt-4 px-4 py-2 rounded-xl bg-blue-600 text-white text-sm"
        >
          Return to All Tools
        </button>
      </div>
    );
  }

  const renderToolComponent = () => {
    switch (toolId) {
      case 'compress':
        return <CompressTool />;
      case 'ocr':
        return <OcrTool />;
      case 'redact':
        return <RedactTool />;
      case 'merge':
        return <MergeSplitTool initialMode="merge" />;
      case 'split':
        return <MergeSplitTool initialMode="split" />;
      case 'sign':
      case 'fill':
        return <SignFillTool />;
      case 'images-to-pdf':
        return <ImagesToPdfTool />;
      case 'pdf-to-images':
        return <PdfToImagesTool />;
      case 'rotate':
        return <RotateOrganizeTool />;
      case 'protect':
        return <ProtectTool />;
      default:
        return <CompressTool />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Top Banner Ad */}
      <AdBanner placement="top" />

      {/* Breadcrumb & Privacy Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 my-4">
        <div className="flex items-center gap-2 text-xs">
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('/');
            }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>All Tools</span>
          </a>
          <span className="text-slate-400">/</span>
          <span className="text-slate-600 dark:text-slate-400 font-medium truncate max-w-[200px] sm:max-w-xs">
            {tool.name}
          </span>
        </div>

        <div className="flex items-center gap-3">
          {seoPage?.targetAudience && (
            <span className="hidden md:inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-semibold">
              <Award className="w-3.5 h-3.5" />
              <span>{seoPage.targetAudience}</span>
            </span>
          )}
          <span className="text-xs text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1 bg-emerald-500/10 px-3 py-1.5 rounded-lg">
            <ShieldCheck className="w-4 h-4 shrink-0" />
            <span>100% Client-Side Private</span>
          </span>
        </div>
      </div>

      {/* Programmatic Dynamic Hero Header */}
      <div className="text-center max-w-4xl mx-auto my-6 space-y-3">
        {tool.badge && (
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 text-xs font-bold uppercase tracking-wider">
            <Zap className="w-3.5 h-3.5 fill-blue-500" />
            <span>{tool.badge}</span>
          </div>
        )}
        
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
          {seoInfo.h1Title}
        </h1>
        
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
          {seoInfo.subTitle}
        </p>
      </div>

      {/* Interactive Tool Component */}
      <div className="my-8">
        {renderToolComponent()}
      </div>

      {/* Programmatic SEO Content Section (How-To, Features, FAQs, Cross-Links) */}
      <SeoContentSection 
        tool={tool} 
        seoInfo={seoInfo} 
        seoPage={seoPage} 
        onNavigate={onNavigate} 
      />
    </div>
  );
};

