import React, { useState, useEffect } from 'react';
import { ALL_TOOLS } from '../utils/seoHelpers';
import { ToolConfig, ToolId } from '../types';
import { 
  FileText, 
  ChevronDown, 
  Search, 
  Sun, 
  Moon, 
  ShieldCheck, 
  Menu, 
  X, 
  Sparkles,
  Layers,
  Eraser,
  Scissors,
  FilePenLine,
  Minimize2,
  FileSearch,
  Image,
  RotateCw,
  ShieldCheck as ShieldIcon
} from 'lucide-react';

interface HeaderProps {
  currentToolId?: ToolId;
  onNavigate: (path: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentToolId, onNavigate }) => {
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    return document.documentElement.classList.contains('dark') || 
      window.matchMedia('(prefers-color-scheme: dark)').matches;
  });
  const [menuOpen, setMenuOpen] = useState(false);
  const [toolsDropdownOpen, setToolsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const filteredTools = searchQuery.trim() === '' 
    ? ALL_TOOLS 
    : ALL_TOOLS.filter(t => 
        t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.keywords.some(k => k.toLowerCase().includes(searchQuery.toLowerCase()))
      );

  const getToolIcon = (iconName: string) => {
    switch (iconName) {
      case 'Minimize2': return <Minimize2 className="w-4 h-4" />;
      case 'FileSearch': return <FileSearch className="w-4 h-4" />;
      case 'Eraser': return <Eraser className="w-4 h-4" />;
      case 'Layers': return <Layers className="w-4 h-4" />;
      case 'Scissors': return <Scissors className="w-4 h-4" />;
      case 'FilePenLine': return <FilePenLine className="w-4 h-4" />;
      case 'Image': return <Image className="w-4 h-4" />;
      case 'RotateCw': return <RotateCw className="w-4 h-4" />;
      case 'ShieldCheck': return <ShieldIcon className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('/');
            }}
            className="flex items-center gap-2.5 cursor-pointer"
          >
            <div className="w-8 h-8 rounded bg-indigo-600 flex items-center justify-center text-white font-bold text-base shadow-sm">
              P
            </div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-xl tracking-tight text-slate-800 dark:text-white">
                PDF<span className="text-indigo-600 dark:text-indigo-400">UltraHub</span>
              </span>
              <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-green-100 dark:bg-emerald-950 text-green-700 dark:text-emerald-400 border border-green-200 dark:border-emerald-800">
                100% Client-Side
              </span>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600 dark:text-slate-300">
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('/');
              }}
              className={`hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors ${
                !currentToolId ? 'text-indigo-600 dark:text-indigo-400 font-bold border-b-2 border-indigo-600 pb-0.5' : ''
              }`}
            >
              All Tools
            </a>

            {/* Tools Dropdown */}
            <div className="relative">
              <button
                onClick={() => setToolsDropdownOpen(!toolsDropdownOpen)}
                onBlur={() => setTimeout(() => setToolsDropdownOpen(false), 200)}
                className="flex items-center gap-1.5 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
              >
                <span>Categories</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${toolsDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {toolsDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-80 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xl p-2 z-50 grid grid-cols-1 gap-1">
                  {ALL_TOOLS.map((tool) => (
                    <a
                      key={tool.id}
                      href={tool.path}
                      onClick={(e) => {
                        e.preventDefault();
                        onNavigate(tool.path);
                        setToolsDropdownOpen(false);
                      }}
                      className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-left transition-colors"
                    >
                      <div className="p-2 rounded-md bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400">
                        {getToolIcon(tool.iconName)}
                      </div>
                      <div>
                        <div className="font-semibold text-sm text-slate-800 dark:text-slate-100 flex items-center gap-2">
                          <span>{tool.shortName}</span>
                          {tool.badge && (
                            <span className="text-[9px] px-1.5 py-0.2 rounded bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 font-bold">
                              {tool.badge}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1">
                          {tool.tagline}
                        </p>
                      </div>
                    </a>
                  ))}
                </div>
              )}
            </div>

            {/* Direct Tool Links for popular tools */}
            {ALL_TOOLS.filter(t => t.popular).map(tool => (
              <a
                key={tool.id}
                href={tool.path}
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate(tool.path);
                }}
                className={`hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors ${
                  currentToolId === tool.id ? 'text-indigo-600 dark:text-indigo-400 font-bold border-b-2 border-indigo-600 pb-0.5' : ''
                }`}
              >
                {tool.shortName}
              </a>
            ))}
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center gap-3">
            {/* Quick Tool Search Trigger */}
            <button
              onClick={() => setSearchOpen(true)}
              className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center gap-2 border border-slate-200 dark:border-slate-800 text-xs font-medium"
              title="Search PDF Tools"
            >
              <Search className="w-4 h-4" />
              <span className="hidden sm:inline text-slate-400">Quick Search...</span>
            </button>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors border border-slate-200 dark:border-slate-800"
              title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
            </button>

            <button
              onClick={() => onNavigate('/')}
              className="hidden lg:block px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white text-sm font-semibold rounded transition-colors"
            >
              Get App
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 md:hidden rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {menuOpen && (
        <div className="md:hidden border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 pt-2 pb-6 space-y-2">
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('/');
              setMenuOpen(false);
            }}
            className="block w-full text-left px-3 py-2 rounded-lg font-bold text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            All PDF Tools ({ALL_TOOLS.length})
          </a>
          <div className="grid grid-cols-1 gap-1">
            {ALL_TOOLS.map((tool) => (
              <a
                key={tool.id}
                href={tool.path}
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate(tool.path);
                  setMenuOpen(false);
                }}
                className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-left"
              >
                <div className="p-2 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400">
                  {getToolIcon(tool.iconName)}
                </div>
                <div>
                  <div className="font-semibold text-sm text-slate-900 dark:text-slate-100">
                    {tool.name}
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1">
                    {tool.tagline}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Quick Search Modal */}
      {searchOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-start justify-center pt-20 px-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl w-full max-w-xl p-4 overflow-hidden">
            <div className="flex items-center gap-3 border-b border-slate-200 dark:border-slate-800 pb-3">
              <Search className="w-5 h-5 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Type tool name (e.g. compress, ocr, redact, merge)..."
                className="w-full bg-transparent text-slate-900 dark:text-slate-100 focus:outline-none text-base"
                autoFocus
              />
              <button
                onClick={() => setSearchOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="max-h-80 overflow-y-auto mt-3 space-y-1">
              {filteredTools.length === 0 ? (
                <p className="text-center py-8 text-sm text-slate-500">
                  No matching tools found for "{searchQuery}".
                </p>
              ) : (
                filteredTools.map((tool) => (
                  <a
                    key={tool.id}
                    href={tool.path}
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate(tool.path);
                      setSearchOpen(false);
                      setSearchQuery('');
                    }}
                    className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-left transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400">
                        {getToolIcon(tool.iconName)}
                      </div>
                      <div>
                        <span className="font-semibold text-sm text-slate-900 dark:text-white block">
                          {tool.name}
                        </span>
                        <span className="text-xs text-slate-500 dark:text-slate-400 block line-clamp-1">
                          {tool.tagline}
                        </span>
                      </div>
                    </div>
                    <span className="text-xs text-blue-600 dark:text-blue-400 font-medium">Open →</span>
                  </a>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
