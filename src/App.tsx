import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { PDFToolsFooter } from './components/PDFToolsFooter';
import { ToolHubHome } from './views/ToolHubHome';
import { ToolHubView } from './views/ToolHubView';
import { ALL_TOOLS, getToolByPath, updatePageSeo } from './utils/seoHelpers';

export default function App() {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    // Read window location pathname or hash
    const path = window.location.pathname;
    const hash = window.location.hash.replace('#', '');
    return path !== '/' && path !== '' ? path : (hash ? '/' + hash : '/');
  });

  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      const hash = window.location.hash.replace('#', '');
      setCurrentPath(path !== '/' && path !== '' ? path : (hash ? '/' + hash : '/'));
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateTo = (path: string) => {
    setCurrentPath(path);
    window.history.pushState({}, '', path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Find active tool matching path or dynamic keyword alias
  const activeTool = getToolByPath(currentPath);

  useEffect(() => {
    updatePageSeo(currentPath);
  }, [currentPath]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors duration-200">
      {/* Navbar */}
      <Header
        currentToolId={activeTool?.id}
        onNavigate={navigateTo}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {activeTool ? (
          <ToolHubView 
            toolId={activeTool.id} 
            currentPath={currentPath} 
            onNavigate={navigateTo} 
          />
        ) : (
          <ToolHubHome onNavigate={navigateTo} />
        )}
      </main>

      {/* Cross-Linking Silo Grid */}
      <PDFToolsFooter onNavigate={navigateTo} />

      {/* Footer */}
      <Footer onNavigate={navigateTo} />
    </div>
  );
}

