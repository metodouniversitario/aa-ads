'use strict';
const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');
const { html, W, H } = require('./template');
const mu = require('./template-mu');
const perf = require('./template-perf');
const ticket = require('./template-ticket');

const ROOT = path.join(__dirname, '..', '..');
const BUILD = path.join(ROOT, 'build', 'workshop');
const OUT = path.join(ROOT, 'out', 'workshop');
const CHROME = process.env.CHROMIUM_PATH || '/opt/pw-browsers/chromium-1194/chrome-linux/chrome';

const LAYOUTS = [
  { dir: 'serie-a-testo-in-basso', opts: { layout: 'bottom' } },
  { dir: 'serie-b-testo-diviso', opts: { layout: 'split' } },
  // serie C: la barra torna, ma smontata — occhiello sopra l'headline, date
  // come timbro sulla fascia fotografica.
  { dir: 'serie-c-testo-diviso-marchio', opts: { layout: 'split', brandMark: true } },
  // serie D: stessa serie B, con il bottone verde maggiorato.
  { dir: 'serie-d-testo-diviso-cta-grande', opts: { layout: 'split', bigCta: true } },
  // serie MU: palette, carattere e logo di Metodo Universitario, sull'impianto
  // delle sponsorizzate già in uso (banda, corpo puntinato, barra CTA verde).
  { dir: 'serie-mu-metodo-universitario', opts: { layout: 'mu' }, onlySelected: true },
  // i tre format "performance": stessa struttura delle sponsorizzate OCME,
  // contenuti del workshop. Ogni pain esce in tutti e tre.
  { dir: 'perf-1-split', opts: { layout: 'perf', perf: 'split' } },
  { dir: 'perf-2-neon', opts: { layout: 'perf', perf: 'neon' } },
  { dir: 'perf-3-scena', opts: { layout: 'perf', perf: 'scena' } },
];

// il biglietto da solo, come asset a sé
const SOLO = [
  { name: 'biglietto-4x5', opts: {} },
  { name: 'biglietto-4x5-bianco', opts: { bg: 'bianco' } },
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
    const ads = L.onlySelected ? cfg.ads.filter((a) => a.selected) : cfg.ads;
    for (const ad of ads) {
      const file = path.join(bdir, ad.id + '.html');
      fs.writeFileSync(file,
        L.opts.layout === 'mu' ? mu.html(ad, cfg.brand)
        : L.opts.layout === 'perf' ? perf.html(ad, cfg.brand, L.opts.perf)
        : html(ad, cfg.brand, L.opts));
      await page.goto('file://' + file);
      await page.evaluate(async () => {
        await document.fonts.ready;
        await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
      });
      await page.screenshot({ path: path.join(odir, `${ad.id}-4x5.png`) });
    }
    console.log('✔', L.dir, '—', ads.length, 'creativi');
  }

  // biglietto da solo
  {
    const bdir = path.join(BUILD, 'biglietto');
    const odir = path.join(OUT, 'biglietto');
    fs.mkdirSync(bdir, { recursive: true });
    fs.mkdirSync(odir, { recursive: true });
    for (const v of SOLO) {
      const file = path.join(bdir, v.name + '.html');
      fs.writeFileSync(file, ticket.html(null, cfg.brand, v.opts));
      await page.goto('file://' + file);
      await page.evaluate(async () => {
        await document.fonts.ready;
        await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
      });
      await page.screenshot({ path: path.join(odir, v.name + '.png') });
    }
    console.log('✔ biglietto —', SOLO.length, 'versioni');
  }

  await browser.close();
})().catch((e) => { console.error(e); process.exit(1); });
