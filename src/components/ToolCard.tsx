import React from 'react';
import { ToolConfig } from '../types';
import { 
  Minimize2, 
  FileSearch, 
  Eraser, 
  Layers, 
  Scissors, 
  FilePenLine, 
  Image, 
  RotateCw, 
  ShieldCheck, 
  FileText,
  FileCheck2,
  ArrowRight,
  Sparkles
} from 'lucide-react';


interface ToolCardProps {
  tool: ToolConfig;
  onClick: () => void;
}

export const ToolCard: React.FC<ToolCardProps> = ({ tool, onClick }) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Minimize2': return <Minimize2 className="w-6 h-6" />;
      case 'FileSearch': return <FileSearch className="w-6 h-6" />;
      case 'Eraser': return <Eraser className="w-6 h-6" />;
      case 'Layers': return <Layers className="w-6 h-6" />;
      case 'Scissors': return <Scissors className="w-6 h-6" />;
      case 'FilePenLine': return <FilePenLine className="w-6 h-6" />;
      case 'Image': return <Image className="w-6 h-6" />;
      case 'RotateCw': return <RotateCw className="w-6 h-6" />;
      case 'ShieldCheck': return <ShieldCheck className="w-6 h-6" />;
      case 'FileCheck2': return <FileCheck2 className="w-6 h-6" />;
      default: return <FileText className="w-6 h-6" />;

    }
  };

  return (
    <a
      href={tool.path}
      onClick={(e) => {
        e.preventDefault();
        onClick();
      }}
      className="group relative cursor-pointer bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 transition-all duration-300 hover:border-indigo-400 dark:hover:border-indigo-500 hover:shadow-md hover:-translate-y-0.5 flex flex-col justify-between shadow-sm block"
    >
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="w-10 h-10 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-all">
            {getIcon(tool.iconName)}
          </div>

          {tool.badge && (
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase bg-indigo-50 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
              {tool.badge}
            </span>
          )}
        </div>

        <h3 className="text-base font-bold text-slate-800 dark:text-slate-100 tracking-tight mb-1.5 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
          {tool.name}
        </h3>

        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-2">
          {tool.tagline}
        </p>
      </div>

      <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs font-bold text-indigo-600 dark:text-indigo-400">
        <span>Use Tool Free</span>
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </div>
    </a>
  );
};
