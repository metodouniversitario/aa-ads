'use strict';

// Creativo 4:5 per il workshop "Professionista del Futuro".
// La palette, i font e i componenti ricalcano la sales page
// professionista-del-futuro.up.railway.app (cream + verde, display
// Bricolage Grotesque, corpo Newsreader, dettagli in IBM Plex Mono).

const W = 1080;
const H = 1350;

const C = {
  cream: '#FFFBF4',
  cream2: '#FFF7EC',
  sand: '#FDF0E1',
  mint: '#EBF9F1',
  sky: '#EBF3FE',
  blush: '#FFEFE9',
  ink: '#1F2E26',
  ink2: '#33443A',
  muted: '#61716A',
  muted2: '#7B8A82',
  green: '#00CC66',
  greenDeep: '#06803F',
  greenDark: '#045C2E',
  blue: '#0C82EF',
  blueDeep: '#0A5FAE',
  red: '#E14A33',
  redDeep: '#B93B22',
  line: 'rgba(31,46,38,.11)',
  line2: 'rgba(31,46,38,.07)',
};

// per-pain: accento dell'eyebrow, gradiente dell'headline e tinta della citazione
const ACCENT = {
  green: { ink: C.greenDeep, dot: C.green, glow: `linear-gradient(96deg,${C.greenDeep} 0%,${C.green} 55%,#28D4E0 100%)`, card: C.mint, border: 'rgba(0,204,102,.28)', bar: C.green },
  blue: { ink: C.blueDeep, dot: C.blue, glow: `linear-gradient(96deg,${C.blueDeep} 0%,${C.blue} 58%,#28D4E0 100%)`, card: C.sky, border: 'rgba(12,130,239,.26)', bar: C.blue },
  red: { ink: C.redDeep, dot: C.red, glow: `linear-gradient(96deg,${C.redDeep} 0%,${C.red} 58%,#FF8A5C 100%)`, card: C.blush, border: 'rgba(225,74,51,.28)', bar: C.red },
};

const face = (family, weight, style, file) => `
@font-face{font-family:'${family}';font-style:${style};font-weight:${weight};src:url('../assets/fonts/${file}') format('truetype');}`;

const fonts = [
  ['Bricolage Grotesque', 500, 'normal', 'Bricolage-500.ttf'],
  ['Bricolage Grotesque', 600, 'normal', 'Bricolage-600.ttf'],
  ['Bricolage Grotesque', 800, 'normal', 'Bricolage-800.ttf'],
  ['Newsreader', 400, 'normal', 'Newsreader-400.ttf'],
  ['Newsreader', 500, 'normal', 'Newsreader-500.ttf'],
  ['Newsreader', 400, 'italic', 'Newsreader-400i.ttf'],
  ['IBM Plex Mono', 500, 'normal', 'PlexMono-500.ttf'],
  ['IBM Plex Mono', 600, 'normal', 'PlexMono-600.ttf'],
].map((f) => face(...f)).join('');

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function html(ad, brand) {
  const a = ACCENT[ad.accent] || ACCENT.green;
  const head = ad.head.map((l) => `<span class="ln">${esc(l)}</span>`).join('');
  const glow = ad.glow.map((l) => `<span class="ln glow">${esc(l)}</span>`).join('');
  const chips = brand.chips.map((c) => `<span class="chip">${esc(c)}</span>`).join('');

  return `<!doctype html>
<html lang="it"><head><meta charset="utf-8"><style>
${fonts}
*{margin:0;padding:0;box-sizing:border-box}
html,body{width:${W}px;height:${H}px}
body{overflow:hidden;background:${C.cream};color:${C.ink};
  font-family:'Newsreader',Georgia,serif;-webkit-font-smoothing:antialiased}

.ad{position:relative;width:${W}px;height:${H}px;overflow:hidden;
  display:flex;flex-direction:column;padding:70px 72px 64px;
  background:
    radial-gradient(120% 78% at 92% 2%,rgba(255,214,178,.85) 0%,rgba(255,214,178,0) 58%),
    radial-gradient(92% 72% at 2% 99%,rgba(0,204,102,.20) 0%,rgba(0,204,102,0) 62%),
    linear-gradient(168deg,${C.cream2},${C.sand});}
/* bolla morbida come sulla pagina */
.blob{position:absolute;border-radius:50%;filter:blur(90px);pointer-events:none;z-index:0}
.blob.a{width:520px;height:520px;right:-170px;top:180px;background:rgba(0,204,102,.13)}
.blob.b{width:460px;height:460px;left:-190px;bottom:80px;background:rgba(255,167,110,.20)}
.ad > *{position:relative;z-index:2}

/* ---------- brandbar ---------- */
.brandbar{display:flex;align-items:center;gap:14px;flex:0 0 auto;
  font-family:'IBM Plex Mono',monospace;font-weight:600;font-size:23px;letter-spacing:.13em;
  text-transform:uppercase;color:${C.greenDeep}}
.brandbar .dot{width:16px;height:16px;border-radius:50%;background:${C.green};
  box-shadow:0 0 0 8px rgba(0,204,102,.16)}

/* ---------- eyebrow del pain ---------- */
.eyebrow{display:flex;align-items:center;gap:14px;margin-top:44px;flex:0 0 auto;
  font-family:'IBM Plex Mono',monospace;font-weight:600;font-size:21px;letter-spacing:.14em;
  text-transform:uppercase;color:${a.ink}}
.eyebrow:before{content:'';width:40px;height:3px;border-radius:2px;background:${a.dot};flex:0 0 40px}

/* ---------- headline ---------- */
h1{margin-top:24px;flex:0 0 auto;font-family:'Bricolage Grotesque',sans-serif;font-weight:800;
  font-size:84px;line-height:1.05;letter-spacing:-.028em}
h1 .ln{display:block;white-space:nowrap}
h1 .glow{background:${a.glow};-webkit-background-clip:text;background-clip:text;color:transparent}

.lede{margin-top:28px;flex:0 0 auto;font-size:34px;line-height:1.46;color:${C.muted};max-width:24em}

/* ---------- citazione (componente .pull della pagina) ---------- */
.pull{position:relative;margin-top:auto;flex:0 0 auto;padding:36px 38px 34px 44px;
  background:linear-gradient(140deg,#fff,${a.card});border-radius:24px;border:2px solid ${a.border};
  box-shadow:0 26px 56px -32px rgba(122,80,40,.5)}
.pull:before{content:'';position:absolute;left:0;top:26px;bottom:26px;width:7px;
  background:${a.bar};border-radius:0 6px 6px 0}
.pull q{display:block;font-size:35px;line-height:1.38;font-style:italic;color:${C.ink}}
.pull cite{display:block;font-style:normal;font-family:'IBM Plex Mono',monospace;
  font-size:19px;color:${C.muted2};margin-top:18px;letter-spacing:.03em}

/* ---------- chiusura ---------- */
.close{margin-top:30px;flex:0 0 auto;font-family:'Bricolage Grotesque',sans-serif;font-weight:600;
  font-size:36px;line-height:1.24;letter-spacing:-.02em;color:${C.ink2}}

/* ---------- chips ---------- */
.chips{display:flex;flex-wrap:wrap;gap:12px;margin-top:28px;flex:0 0 auto}
.chip{font-family:'IBM Plex Mono',monospace;font-weight:500;font-size:21px;
  background:#fff;border:2px solid ${C.line};border-radius:999px;padding:11px 22px;color:${C.ink2};
  box-shadow:0 4px 12px -7px rgba(122,80,40,.5)}

/* ---------- CTA ---------- */
.cta{margin-top:30px;flex:0 0 auto;display:flex;align-items:center;justify-content:center;gap:20px;
  background:${C.green};color:#04351F;border-radius:20px;padding:30px 36px;
  font-family:'Bricolage Grotesque',sans-serif;font-weight:800;font-size:46px;letter-spacing:-.02em;
  box-shadow:0 10px 0 ${C.greenDark},0 26px 44px -22px rgba(4,92,46,.75)}
.cta svg{flex:0 0 auto}
.url{margin-top:20px;flex:0 0 auto;text-align:center;font-family:'IBM Plex Mono',monospace;
  font-weight:500;font-size:21px;letter-spacing:.02em;color:${C.muted}}
</style></head>
<body>
<div class="ad">
  <span class="blob a"></span><span class="blob b"></span>
  <div class="brandbar"><span class="dot"></span>${esc(brand.kicker)}</div>
  <div class="eyebrow">${esc(ad.eyebrow)}</div>
  <h1 id="head">${head}${glow}</h1>
  <p class="lede" id="lede">${esc(ad.lede)}</p>
  <figure class="pull">
    <q id="quote">${esc(ad.quote)}</q>
    <cite>${esc(ad.cite)}</cite>
  </figure>
  <p class="close" id="close">${esc(ad.close)}</p>
  <div class="chips">${chips}</div>
  <div class="cta">
    ${esc(brand.cta)}
    <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor"
         stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round">
      <path d="M5 12h13M12 5l7 7-7 7"/>
    </svg>
  </div>
  <div class="url">${esc(brand.url)}</div>
</div>

<script>
// Auto-fit: nessun testo esce dalla tela, qualunque sia la lunghezza del pain.
function shrink(el, over, min) {
  var s = parseFloat(getComputedStyle(el).fontSize);
  while (s > min && over()) { s -= 1; el.style.fontSize = s + 'px'; }
}
function fit() {
  var ad = document.querySelector('.ad');
  var avail = ad.clientWidth - 144; // padding orizzontale
  var h = document.getElementById('head');
  shrink(h, function () {
    return [].some.call(h.children, function (n) { return n.scrollWidth > avail; });
  }, 40);
  // poi si riduce il resto finché la colonna non sfora in altezza
  var order = ['quote', 'lede', 'close'];
  for (var i = 0; i < order.length; i++) {
    var el = document.getElementById(order[i]);
    shrink(el, function () { return ad.scrollHeight > ad.clientHeight; }, 20);
  }
  shrink(h, function () { return ad.scrollHeight > ad.clientHeight; }, 40);
}
document.fonts.ready.then(fit);
</script>
</body></html>`;
}

module.exports = { html, W, H, C };
