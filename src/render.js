'use strict';
const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');
const { html, W, H } = require('./template');

const ROOT = path.join(__dirname, '..');
const BUILD = path.join(ROOT, 'build');
const OUT = path.join(ROOT, 'out');
const CHROME = process.env.CHROMIUM_PATH || '/opt/pw-browsers/chromium-1194/chrome-linux/chrome';

async function shot(page, file, width, height) {
  await page.setViewportSize({ width, height });
  await page.goto('file://' + file);
  await page.evaluate(async () => { await document.fonts.ready; await new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r))); });
  await page.waitForLoadState('networkidle');
  return page;
}

(async () => {
  const cfg = JSON.parse(fs.readFileSync(path.join(__dirname, 'ads.json'), 'utf8'));
  fs.mkdirSync(BUILD, { recursive: true });
  fs.mkdirSync(OUT, { recursive: true });

  const browser = await chromium.launch({ executablePath: CHROME, args: ['--font-render-hinting=none'] });
  const page = await browser.newPage({ deviceScaleFactor: 1 });

  // 1) copertina: usa il file reale se c'è, altrimenti genera un segnaposto
  const coverPath = path.join(ROOT, cfg.brand.cover);
  if (!fs.existsSync(coverPath)) {
    const ph = path.join(BUILD, 'cover-placeholder.html');
    fs.writeFileSync(ph, require('./cover-placeholder.js'));
    await shot(page, ph, 1190, 1512);
    fs.mkdirSync(path.dirname(coverPath), { recursive: true });
    await page.screenshot({ path: coverPath });
    console.log('! copertina reale mancante -> generato segnaposto:', cfg.brand.cover);
  }

  // 2) creativi
  for (const ad of cfg.ads) {
    const file = path.join(BUILD, ad.id + '.html');
    fs.writeFileSync(file, html(ad, cfg.brand));
    await shot(page, file, W, H);
    const out = path.join(OUT, `${ad.id}-4x5.png`);
    await page.screenshot({ path: out });
    console.log('✔', path.relative(ROOT, out), '—', ad.pain || ad.note);
  }

  await browser.close();
})().catch((e) => { console.error(e); process.exit(1); });
