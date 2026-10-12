import { readdir, readFile, stat } from 'node:fs/promises';
import { join, relative } from 'node:path';
import assert from 'node:assert/strict';

async function htmlFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = await Promise.all(entries.map((entry) => entry.isDirectory()
    ? htmlFiles(join(directory, entry.name))
    : entry.name.endsWith('.html') ? [join(directory, entry.name)] : []));
  return files.flat();
}
const pages = new Map(await Promise.all((await htmlFiles('dist')).map(async (path) => [path, await readFile(path, 'utf8')])));
for (const [path, html] of pages) {
  for (const match of html.matchAll(/<a\b[^>]*href="([^"]+)"/g)) {
    const url = new URL(match[1].replaceAll('&amp;', '&'), `https://thewristjournal.com/${relative('dist', path)}`);
    if (url.origin !== 'https://thewristjournal.com') continue;
    let target = join('dist', decodeURIComponent(url.pathname));
    const info = await stat(target).catch(() => null);
    assert(info, `${path}: missing internal destination ${url.pathname}`);
    if (info.isDirectory()) target = join(target, 'index.html');
    assert(await stat(target).catch(() => null), `${path}: missing page ${target}`);
    if (url.hash && pages.has(target)) {
      const ids = [...pages.get(target).matchAll(/\bid="([^"]+)"/g)].map((item) => item[1]);
      assert(ids.includes(decodeURIComponent(url.hash.slice(1))), `${path}: missing anchor ${url.href}`);
    }
  }
  if (!/^dist\/blog\/[^/]+\/index\.html$/.test(path)) continue;
  assert.equal([...html.matchAll(/<h1[ >]/g)].length, 1, `${path}: expected one article H1`);
  const related = [...html.matchAll(/<a class="related-card" href="([^"]+)"/g)].map((item) => item[1]);
  assert.equal(related.length, 3, `${path}: expected three reading recommendations`);
  assert.equal(new Set(related).size, 3, `${path}: duplicate reading recommendation`);
  assert(!related.includes('/' + relative('dist', path).replace('index.html', '')), `${path}: self recommendation`);
  assert(related.every((url) => !/prime-day|great-indian-festival/.test(url)), `${path}: seasonal reading recommendation`);
  const canonical = [...html.matchAll(/<link rel="canonical" href="([^"]+)"/g)].map((item) => item[1]);
  assert.deepEqual(canonical, ['https://thewristjournal.com/' + relative('dist', path).replace('index.html', '')]);
}
assert((await readFile('dist/sitemap-0.xml', 'utf8')).includes('https://thewristjournal.com/watch-buying-guides/'));
console.log(`Checked ${pages.size} pages: internal links, section anchors, article headings, recommendations, canonicals and hub sitemap entry.`);
