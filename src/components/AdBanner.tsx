import React from 'react';

interface AdBannerProps {
  placement: 'top' | 'sidebar' | 'download';
  className?: string;
}

export const AdBanner: React.FC<AdBannerProps> = ({ placement, className = '' }) => {
  if (placement === 'top') {
    return (
      <div
        id="ad-slot-top"
        className={`w-full max-w-5xl mx-auto my-2 min-h-[90px] flex items-center justify-center overflow-hidden ${className}`}
      >
        {/* Clean reserved slot for Google AdSense or Native Ad scripts */}
      </div>
    );
  }

  if (placement === 'sidebar') {
    return (
      <div
        id="ad-slot-sidebar"
        className={`w-full min-h-[250px] bg-slate-100/50 dark:bg-slate-800/30 border border-slate-200/60 dark:border-slate-800 rounded-2xl flex items-center justify-center overflow-hidden ${className}`}
      >
        {/* Clean reserved slot for Google AdSense or Sidebar Ad scripts */}
      </div>
    );
  }

  // Download screen placement
  return (
    <div
      id="ad-slot-download"
      className={`w-full max-w-xl mx-auto my-3 min-h-[90px] flex items-center justify-center overflow-hidden ${className}`}
    >
      {/* Clean reserved slot for Download Page Ad scripts */}
    </div>
  );
};

