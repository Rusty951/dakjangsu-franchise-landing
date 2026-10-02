import { readFile, rm, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const scriptDir = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(scriptDir, '..');
const distDir = resolve(projectRoot, 'dist');
const serverDir = resolve(distDir, 'server');
const indexPath = resolve(distDir, 'index.html');
const serverEntryPath = resolve(serverDir, 'entry-server.js');

const [{ render }, template] = await Promise.all([
  import(pathToFileURL(serverEntryPath).href),
  readFile(indexPath, 'utf8')
]);

const appHtml = render().replace(/<link rel="preload" as="image" href="[^"]+"(?: fetchPriority="high")?\/>/g, '');
const reviewTemplate = process.env.VITE_REVIEW_ONLY === 'true'
  ? template
    .replace(/<meta name="robots"[^>]+>/, '<meta name="robots" content="noindex,nofollow" />')
    .replace(/<link rel="preload"[^>]+as="image"[^>]*>/g, '')
    .replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/g, '')
  : template;
const prerenderedHtml = reviewTemplate.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);

await writeFile(indexPath, prerenderedHtml);
await rm(serverDir, { recursive: true, force: true });
