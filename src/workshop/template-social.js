'use strict';

// Tre format ripresi dalle immagini già prodotte su Higgsfield per i social di
// Andrea Acconcia / Metodo Universitario, adattati ai creativi del workshop.
//
//  'carta'   — quote card su carta invecchiata: immagine sopra, frase in
//              serif corsivo centrata sotto. È il format più ricorrente.
//  'banda'   — cover da carosello: foto a tutta pagina, banda nera nel terzo
//              basso con il testo in maiuscolo, riga in corsivo fra parentesi
//              e la fila di pallini in fondo.
//  'titolo'  — carta invecchiata con il titolo in serif nero in alto e
//              l'immagine sotto.
//
// Il verde resta quello di sempre: #00CC66.

const W = 1080;
const H = 1350;

const C = {
  green: '#00CC66',
  greenDeep: '#008040',
  greenInk: '#04351F',
  paper: '#EFE4D0',
  paper2: '#E4D7BE',
  ink: '#1A1510',
  inkSoft: '#4A4034',
  black: '#0D0D0D',
};

const face = (fam, w, st, file) => `
@font-face{font-family:'${fam}';font-style:${st};font-weight:${w};src:url('../../../assets/fonts/${file}') format('truetype');}`;
const fonts = [
  ['Newsreader', 400, 'normal', 'Newsreader-400.ttf'],
  ['Newsreader', 500, 'normal', 'Newsreader-500.ttf'],
  ['Newsreader', 400, 'italic', 'Newsreader-400i.ttf'],
  ['Inter', 700, 'normal', 'Inter-700.ttf'],
  ['Inter', 900, 'normal', 'Inter-900.ttf'],
  ['IBM Plex Mono', 500, 'normal', 'PlexMono-500.ttf'],
].map((f) => face(...f)).join('');

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// carta invecchiata: fibre, macchie e vignettatura, tutto in CSS
const PAPER = `
  background-color:${C.paper};
  background-image:
    radial-gradient(120% 90% at 50% 40%,rgba(255,250,236,.85) 0%,rgba(255,250,236,0) 62%),
    radial-gradient(ellipse at 12% 8%,rgba(158,131,86,.20) 0%,rgba(158,131,86,0) 42%),
    radial-gradient(ellipse at 88% 92%,rgba(158,131,86,.22) 0%,rgba(158,131,86,0) 45%),
    repeating-linear-gradient(94deg,rgba(140,116,76,.05) 0 2px,rgba(140,116,76,0) 2px 7px),
    repeating-linear-gradient(2deg,rgba(140,116,76,.04) 0 1px,rgba(140,116,76,0) 1px 6px),
    linear-gradient(160deg,${C.paper} 0%,${C.paper2} 100%);`;

const VIGNETTE = `
  content:'';position:absolute;inset:0;pointer-events:none;z-index:3;
  box-shadow:inset 0 0 220px 70px rgba(92,72,44,.30);`;

// la CTA verde, ridotta all'essenziale perché questi format sono più sobri
const ctaBar = (brand) => `
  <div class="cta">
    <span class="hand">
      <svg width="46" height="46" viewBox="0 0 24 24" fill="none" stroke="currentColor"
           stroke-width="2" stroke-linecap="round">
        <path d="M9 4.5V2M4.8 6.2 3 4.4M4.5 10.5H2M6.2 14.8 4.4 16.6"/>
        <path d="m9.2 8.6 10.4 4.1-4.5 1.7-1.7 4.5z" fill="currentColor" stroke-linejoin="round"/>
      </svg>
    </span>
    <span class="txt" id="cta"><span class="l1">${esc(brand.cta1)}</span><span class="l2">${esc(brand.cta2)}</span></span>
    <span class="chev">
      <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="currentColor"
           stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="m6 8 6 6 6-6M6 14l6 6 6-6"/></svg>
    </span>
  </div>`;

const ctaCss = `
.cta{flex:0 0 auto;display:flex;align-items:center;gap:22px;background:${C.green};color:#fff;
  border-radius:18px;padding:24px 28px;box-shadow:0 9px 0 ${C.greenDeep},0 22px 38px -20px rgba(0,128,64,.8)}
.cta .hand,.cta .chev{flex:0 0 auto;display:flex}
.cta .chev{opacity:.85}
.cta .txt{flex:1 1 auto;min-width:0;font-family:'Inter',sans-serif;font-weight:900;
  font-size:38px;line-height:1.12;letter-spacing:-1px}
.cta .txt .l1,.cta .txt .l2{display:block;white-space:nowrap}
.cta .txt .l2{font-weight:700;font-size:.84em;margin-top:2px;opacity:.95}`;

const headLines = (ad, cls) => (ad.head
  .map((l) => (typeof l === 'string'
    ? `<span class="ln">${esc(l)}</span>`
    : `<span class="ln hi">${esc(l.hi)}</span>`))
  .join(''));

// ---------------------------------------------------------------- carta
function carta(ad, brand) {
  return { css: `
.ad{${PAPER};display:flex;flex-direction:column;padding:56px 72px 56px}
.ad:after{${VIGNETTE}}
.kick{flex:0 0 auto;text-align:center;font-family:'IBM Plex Mono',monospace;font-weight:500;
  font-size:21px;letter-spacing:.24em;text-transform:uppercase;color:rgba(26,21,16,.5);
  margin-bottom:26px}
.shot{flex:1 1 auto;min-height:0;position:relative;overflow:hidden;border-radius:6px;
  box-shadow:0 22px 44px -26px rgba(70,52,28,.85)}
.shot img{width:100%;height:100%;object-fit:cover;display:block;
  object-position:${ad.focusSocial || ad.focus || '50% 45%'};
  filter:sepia(.34) saturate(.88) contrast(1.03) brightness(1.02)}
.shot:after{content:'';position:absolute;inset:0;background:rgba(185,150,96,.16);mix-blend-mode:multiply}
.quote{flex:0 0 auto;margin:36px 0 30px;text-align:center;font-family:'Newsreader',Georgia,serif;
  font-style:italic;font-weight:400;font-size:52px;line-height:1.28;color:${C.ink};letter-spacing:-.4px}
.quote .ln{display:block}
.quote .hi{color:${C.greenDeep}}
${ctaCss}
.cta{position:relative;z-index:4}`,
  body: `
  <div class="kick">${esc(brand.product)} · ${esc(brand.when)}</div>
  <div class="shot"><img src="../../../assets/sales/${esc(ad.photo)}" alt=""></div>
  <div class="quote" id="hook">${headLines(ad)}</div>
${ctaBar(brand)}` };
}

// ---------------------------------------------------------------- banda
function banda(ad, brand) {
  return { css: `
.ad{background:#0D0D0D;display:block}
.shot{position:absolute;inset:0}
.shot img{width:100%;height:100%;object-fit:cover;display:block;
  object-position:${ad.focusSocial || ad.focus || '50% 40%'};filter:saturate(.92) contrast(1.04)}
.shot:after{content:'';position:absolute;inset:0;
  background:linear-gradient(180deg,rgba(13,13,13,.34) 0%,rgba(13,13,13,0) 34%,rgba(13,13,13,.55) 100%)}
.bar{position:absolute;left:0;right:0;bottom:0;background:${C.black};padding:52px 66px 40px;z-index:2}
.bar h1{font-family:'Inter',sans-serif;font-weight:900;font-size:78px;line-height:1.05;
  letter-spacing:-2.2px;text-transform:uppercase;text-align:center;color:#fff}
.bar .ln{display:block;white-space:nowrap}
.bar .hi{color:${C.green}}
.bar .sub{display:block;margin-top:20px;text-align:center;font-family:'Newsreader',Georgia,serif;
  font-style:italic;font-size:34px;color:${C.green}}
.dots{display:flex;justify-content:center;gap:11px;margin-top:30px}
.dots i{width:11px;height:11px;border-radius:50%;background:rgba(255,255,255,.34)}
.dots i.on{background:${C.green};width:15px;height:15px;margin-top:-2px}
.tag{position:absolute;top:44px;left:50%;transform:translateX(-50%);z-index:2;
  font-family:'IBM Plex Mono',monospace;font-weight:500;font-size:22px;letter-spacing:.2em;
  text-transform:uppercase;color:#fff;background:rgba(13,13,13,.55);border-radius:999px;
  padding:12px 26px;white-space:nowrap;backdrop-filter:blur(6px)}`,
  body: `
  <div class="shot"><img src="../../../assets/sales/${esc(ad.photo)}" alt=""></div>
  <div class="tag">${esc(brand.product)} · ${esc(brand.when)}</div>
  <div class="bar">
    <h1 id="hook">${headLines(ad)}</h1>
    <span class="sub">( clicca su Scopri di più per iscriverti gratis )</span>
    <div class="dots"><i class="on"></i><i></i><i></i><i></i><i></i></div>
  </div>` };
}

// ---------------------------------------------------------------- titolo
function titolo(ad, brand) {
  return { css: `
.ad{${PAPER};display:flex;flex-direction:column;padding:60px 72px 56px}
.ad:after{${VIGNETTE}}
.title{flex:0 0 auto;text-align:center;font-family:'Newsreader',Georgia,serif;font-weight:500;
  font-size:76px;line-height:1.1;color:${C.ink};letter-spacing:-1px;margin-bottom:12px}
.title .ln{display:block}
.title .hi{color:${C.greenDeep};font-style:italic}
.rule{flex:0 0 auto;width:120px;height:4px;border-radius:2px;background:rgba(26,21,16,.35);
  margin:14px auto 30px}
.shot{flex:1 1 auto;min-height:0;position:relative;overflow:hidden;border-radius:6px;
  box-shadow:0 22px 44px -26px rgba(70,52,28,.85)}
.shot img{width:100%;height:100%;object-fit:cover;display:block;
  object-position:${ad.focusSocial || ad.focus || '50% 45%'};
  filter:sepia(.34) saturate(.88) contrast(1.03) brightness(1.02)}
.shot:after{content:'';position:absolute;inset:0;background:rgba(185,150,96,.16);mix-blend-mode:multiply}
.note{flex:0 0 auto;margin:28px 0 26px;text-align:center;font-family:'Newsreader',Georgia,serif;
  font-size:33px;line-height:1.4;color:${C.inkSoft}}
${ctaCss}
.cta{position:relative;z-index:4}`,
  body: `
  <h1 class="title" id="hook">${headLines(ad)}</h1>
  <div class="rule"></div>
  <div class="shot"><img src="../../../assets/sales/${esc(ad.photo)}" alt=""></div>
  ${ad.sub ? `<p class="note" id="sub">${ad.sub}</p>` : ''}
${ctaBar(brand)}` };
}

const FORMATS = { carta, banda, titolo };

function html(ad, brand, format) {
  const F = (FORMATS[format] || carta)(ad, brand);
  return `<!doctype html>
<html lang="it"><head><meta charset="utf-8"><style>
${fonts}
*{margin:0;padding:0;box-sizing:border-box}
html,body{width:${W}px;height:${H}px}
body{overflow:hidden;background:#000;-webkit-font-smoothing:antialiased}
.ad{position:relative;width:${W}px;height:${H}px;overflow:hidden}
${F.css}
</style></head>
<body><div class="ad">${F.body}</div>
<script>
function fit() {
  var h = document.getElementById('hook');
  var shot = document.querySelector('.shot');
  var box = h.parentElement;
  var wide = function () {
    return [].some.call(h.children, function (n) { return n.scrollWidth > h.clientWidth; });
  };
  var s = parseFloat(getComputedStyle(h).fontSize);
  while (s > 30 && wide()) { s -= 2; h.style.fontSize = s + 'px'; }
  // nei format su carta la foto non deve schiacciarsi
  if (shot && shot.parentElement.classList.contains('ad')) {
    while (s > 30 && shot.clientHeight < 430) { s -= 2; h.style.fontSize = s + 'px'; }
  }
  var cta = document.getElementById('cta');
  if (cta) {
    var over = function () {
      return [].some.call(cta.children, function (n) { return n.scrollWidth > cta.clientWidth; });
    };
    var c = parseFloat(getComputedStyle(cta).fontSize);
    while (c > 24 && over()) { c -= 1; cta.style.fontSize = c + 'px'; }
  }
}
document.fonts.ready.then(fit);
</script>
</body></html>`;
}

module.exports = { html, W, H, FORMATS: Object.keys(FORMATS) };
