'use strict';
// Genera le immagini dei creativi con l'API di Gemini e le scrive in assets/gen/.
//
// La chiave si passa nell'ambiente, mai nel repo:
//   GEMINI_API_KEY=... node src/workshop/gen-images.js [id ...]
//
// L'API restituisce i byte dell'immagine in base64 dentro la risposta JSON,
// quindi non serve scaricare nulla da una CDN: è l'unico canale che la policy
// di rete di questo ambiente lascia passare.

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..', '..');
const OUTDIR = path.join(ROOT, 'assets', 'gen');
const HOST = 'https://generativelanguage.googleapis.com';
const KEY = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;

const STYLE = 'Warm cinematic editorial photograph, natural late-afternoon golden light, '
  + 'cream and sand and terracotta colour palette, 35mm film look with soft grain, '
  + 'shallow depth of field. No text, no lettering, no logos, no watermarks.';

const SHOTS = {
  'eta.png':
    'A confident woman in her late fifties with grey-streaked hair, sitting at a sunlit wooden '
    + 'desk in a bright Mediterranean studio, laptop open, hands relaxed, looking slightly '
    + 'off-camera with a calm determined half-smile. Dignified and hopeful, never defeated. ' + STYLE,
  'potenziale.png':
    'A man in his mid thirties in a linen shirt, in a plain beige office, sitting at an ordinary '
    + 'desk with a computer, leaning back and looking out of the window past his screen. '
    + 'Thoughtful and restless rather than sad. ' + STYLE,
  'reddito.png':
    'A woman in her forties working late at a wooden kitchen table with a laptop and an open '
    + 'notebook, warm lamp light and a cup of coffee, thoughtful determined expression, modest '
    + 'Mediterranean home interior. ' + STYLE,
};

async function api(pathname, init) {
  const r = await fetch(HOST + pathname, {
    ...init,
    headers: { 'x-goog-api-key': KEY, 'content-type': 'application/json', ...(init && init.headers) },
  });
  const body = await r.json();
  if (!r.ok) throw new Error(`${r.status} ${JSON.stringify(body.error || body).slice(0, 400)}`);
  return body;
}

// Sceglie da solo il modello immagine disponibile sulla chiave: così lo script
// non invecchia insieme al nome del modello del momento.
async function pickModel() {
  if (process.env.GEMINI_IMAGE_MODEL) return process.env.GEMINI_IMAGE_MODEL;
  const { models = [] } = await api('/v1beta/models?pageSize=200');
  const usable = models
    .filter((m) => /image/i.test(m.name) && !/embedding|vision|upscal/i.test(m.name))
    .filter((m) => (m.supportedGenerationMethods || []).includes('generateContent'));
  if (!usable.length) throw new Error('nessun modello immagine disponibile su questa chiave');
  // preferisce la generazione più recente, poi "pro" su "flash"
  const score = (m) => {
    const v = parseFloat((m.name.match(/gemini-(\d+(?:\.\d+)?)/) || [0, 0])[1]) || 0;
    return v * 10 + (/pro/.test(m.name) ? 2 : 0) + (/preview|exp/.test(m.name) ? -1 : 0);
  };
  usable.sort((a, b) => score(b) - score(a));
  return usable[0].name.replace(/^models\//, '');
}

(async () => {
  if (!KEY) {
    console.error('manca GEMINI_API_KEY nell\'ambiente');
    process.exit(2);
  }
  const only = process.argv.slice(2);
  const model = await pickModel();
  console.log('modello:', model);
  fs.mkdirSync(OUTDIR, { recursive: true });

  for (const [file, prompt] of Object.entries(SHOTS)) {
    if (only.length && !only.includes(file)) continue;
    const body = await api(`/v1beta/models/${model}:generateContent`, {
      method: 'POST',
      body: JSON.stringify({
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        generationConfig: { responseModalities: ['IMAGE'], imageConfig: { aspectRatio: '4:3' } },
      }),
    });
    const parts = (((body.candidates || [])[0] || {}).content || {}).parts || [];
    const img = parts.find((p) => p.inlineData && /^image\//.test(p.inlineData.mimeType || ''));
    if (!img) throw new Error(`nessuna immagine per ${file}: ${JSON.stringify(body).slice(0, 300)}`);
    const out = path.join(OUTDIR, file);
    fs.writeFileSync(out, Buffer.from(img.inlineData.data, 'base64'));
    console.log('✔', path.relative(ROOT, out), `${(fs.statSync(out).size / 1024).toFixed(0)} KB`);
  }
})().catch((e) => { console.error('errore:', e.message); process.exit(1); });
