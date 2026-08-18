import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { ALL_TOOLS, PATH_TO_TOOL_MAP } from '../src/utils/seoHelpers';
import { SEO_PAGES } from '../src/data/seoPages';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Base canonical URL for production / live deployment
const BASE_URL = (process.env.SITE_URL || 'https://pdfmakerr.vercel.app').replace(/\/$/, '');

export function generateSitemap() {
  const pathSet = new Set<string>();

  // 1. Root homepage path
  pathSet.add('/');

  // 2. Programmatic SEO Dataset Pages
  SEO_PAGES.forEach(page => {
    pathSet.add(`/${page.slug}`);
  });

  // 3. Paths defined in ALL_TOOLS
  ALL_TOOLS.forEach(tool => {
    if (tool.path) {
      pathSet.add(tool.path);
    }
  });

  // 4. Paths defined in PATH_TO_TOOL_MAP
  Object.keys(PATH_TO_TOOL_MAP).forEach(p => {
    pathSet.add(p);
  });

  const currentDate = new Date().toISOString().split('T')[0];

  const urlsXml = Array.from(pathSet)
    .sort()
    .map(routePath => {
      const isHome = routePath === '/';
      const isHighPriority = routePath.includes('compress') || 
                             routePath.includes('convert') || 
                             routePath.includes('aadhaar') || 
                             routePath.includes('jpg-to-pdf') || 
                             routePath.includes('ocr');
      const priority = isHome ? '1.0' : isHighPriority ? '0.9' : '0.8';
      const fullUrl = `${BASE_URL}${routePath === '/' ? '' : routePath}`;
      return `  <url>
    <loc>${fullUrl}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${isHome ? 'daily' : 'weekly'}</changefreq>
    <priority>${priority}</priority>
  </url>`;
    })
    .join('\n');

  const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlsXml}
</urlset>
`;

  const publicDir = path.resolve(__dirname, '../public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  const sitemapPath = path.join(publicDir, 'sitemap.xml');
  fs.writeFileSync(sitemapPath, xmlContent, 'utf-8');
  console.log(`[Sitemap Generator] Successfully generated sitemap.xml with ${pathSet.size} programmatic and core URLs.`);
}

generateSitemap();

