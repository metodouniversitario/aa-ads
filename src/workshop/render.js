'use strict';
const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');
const { html, W, H } = require('./template');

const ROOT = path.join(__dirname, '..', '..');
const BUILD = path.join(ROOT, 'build', 'workshop');
const OUT = path.join(ROOT, 'out', 'workshop');
const CHROME = process.env.CHROMIUM_PATH || '/opt/pw-browsers/chromium-1194/chrome-linux/chrome';

(async () => {
  const cfg = JSON.parse(fs.readFileSync(path.join(__dirname, 'ads.json'), 'utf8'));
  fs.mkdirSync(BUILD, { recursive: true });
  fs.mkdirSync(OUT, { recursive: true });

  const browser = await chromium.launch({ executablePath: CHROME, args: ['--font-render-hinting=none'] });
  const page = await browser.newPage({ deviceScaleFactor: 1 });
  await page.setViewportSize({ width: W, height: H });

  for (const ad of cfg.ads) {
    const file = path.join(BUILD, ad.id + '.html');
    fs.writeFileSync(file, html(ad, cfg.brand));
    await page.goto('file://' + file);
    await page.evaluate(async () => {
      await document.fonts.ready;
      await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
    });
    const out = path.join(OUT, `${ad.id}-4x5.png`);
    await page.screenshot({ path: out });
    console.log('✔', path.relative(ROOT, out), '—', ad.pain);
  }

  await browser.close();
})().catch((e) => { console.error(e); process.exit(1); });
