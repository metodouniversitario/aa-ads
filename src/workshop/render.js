'use strict';
const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');
const { html, W, H } = require('./template');

const ROOT = path.join(__dirname, '..', '..');
const BUILD = path.join(ROOT, 'build', 'workshop');
const OUT = path.join(ROOT, 'out', 'workshop');
const CHROME = process.env.CHROMIUM_PATH || '/opt/pw-browsers/chromium-1194/chrome-linux/chrome';

const LAYOUTS = [
  { key: 'bottom', dir: 'serie-a-testo-in-basso' },
  { key: 'split', dir: 'serie-b-testo-diviso' },
];

(async () => {
  const cfg = JSON.parse(fs.readFileSync(path.join(__dirname, 'ads.json'), 'utf8'));
  const browser = await chromium.launch({ executablePath: CHROME, args: ['--font-render-hinting=none'] });
  const page = await browser.newPage({ deviceScaleFactor: 1 });
  await page.setViewportSize({ width: W, height: H });

  for (const L of LAYOUTS) {
    const bdir = path.join(BUILD, L.dir);
    const odir = path.join(OUT, L.dir);
    fs.mkdirSync(bdir, { recursive: true });
    fs.mkdirSync(odir, { recursive: true });
    for (const ad of cfg.ads) {
      const file = path.join(bdir, ad.id + '.html');
      fs.writeFileSync(file, html(ad, cfg.brand, L.key));
      await page.goto('file://' + file);
      await page.evaluate(async () => {
        await document.fonts.ready;
        await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
      });
      await page.screenshot({ path: path.join(odir, `${ad.id}-4x5.png`) });
    }
    console.log('✔', L.dir, '—', cfg.ads.length, 'creativi');
  }

  await browser.close();
})().catch((e) => { console.error(e); process.exit(1); });
