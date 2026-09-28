'use strict';

// Tre format "performance" ricalcati dalle sponsorizzate del Metodo OCME,
// adattati al workshop: il prodotto non è un eBook ma le quattro sere, quindi
// al posto del mockup c'è il biglietto del workshop; i pain e i benefici sono
// i nostri; il frontman è Andrea. Verde di brand, con giallo e rosso come
// evidenziatori.
//
//   'split'  — fondo bianco, headline a sinistra con evidenziatore, copy con
//              sottolineature, pennellata "workshop gratuito", riga delle
//              quattro sere, biglietto a destra sulla scena, annotazioni a mano.
//   'neon'   — fondo scuro con saette, titolo in maiuscolo, card coi quattro
//              bullet al neon, foto a destra, CTA.
//   'scena'  — biglietto in alto a sinistra, testo a destra, grande foto della
//              scena che occupa i due terzi bassi, CTA luminosa in fondo.

const P = require('./perf-parts');
const C = P.C;

const W = 1080;
const H = 1350;

const face = (fam, w, st, file) => `
@font-face{font-family:'${fam}';font-style:${st};font-weight:${w};src:url('../../../assets/fonts/${file}') format('truetype');}`;
const fonts = [
  ['Inter', 600, 'normal', 'Inter-500.ttf'],
  ['Inter', 700, 'normal', 'Inter-700.ttf'],
  ['Inter', 800, 'normal', 'Inter-800.ttf'],
  ['Inter', 900, 'normal', 'Inter-900.ttf'],
  ['Archivo Black', 400, 'normal', 'ArchivoBlack.ttf'],
  ['Caveat', 700, 'normal', 'Caveat-700.ttf'],
].map((f) => face(...f)).join('');

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// l'headline arriva come righe; `hl` evidenzia in giallo, `rd` colora di rosso
const head = (ad) => (ad.perfHead || ad.head).map((l) => {
  if (typeof l === 'string') return `<span class="ln">${esc(l)}</span>`;
  if (l.hl) return `<span class="ln"><span class="hl">${esc(l.hl)}</span></span>`;
  if (l.rd) return `<span class="ln rd">${esc(l.rd)}</span>`;
  return `<span class="ln gr">${esc(l.hi)}</span>`;
}).join('');

const arrow = (rot) => `<svg width="70" height="58" viewBox="0 0 70 58" fill="none" stroke="#0E1512"
  stroke-width="3" stroke-linecap="round" stroke-linejoin="round" style="transform:rotate(${rot}deg)">
  <path d="M4 6c18 2 34 14 44 34"/><path d="M40 40l9 2 1-11"/></svg>`;

// ------------------------------------------------------------------ split
function split(ad, brand) {
  return { css: `
.ad{background:
  radial-gradient(120% 80% at 80% 10%,rgba(0,204,102,.09) 0%,rgba(0,204,102,0) 55%),
  radial-gradient(90% 70% at 5% 95%,rgba(255,226,77,.16) 0%,rgba(255,226,77,0) 60%),
  linear-gradient(170deg,#FFFFFF 0%,#F3F6F4 100%);
  display:flex;flex-direction:column;padding:56px 56px 48px}
.scene{position:absolute;right:-90px;top:70px;width:760px;height:760px;z-index:0;
  border-radius:50%;overflow:hidden;opacity:.85;filter:saturate(.95)}
.scene img{width:100%;height:100%;object-fit:cover;object-position:${ad.focus || '50% 40%'}}
.scene:after{content:'';position:absolute;inset:0;
  background:radial-gradient(circle at 50% 50%,rgba(255,255,255,0) 46%,rgba(255,255,255,.96) 74%)}
.row{position:relative;z-index:2;flex:1 1 auto;min-height:0;display:flex;gap:26px}
.left{width:57%;display:flex;flex-direction:column}
.right{width:43%;display:flex;align-items:center}
h1{font-family:'Inter',sans-serif;font-weight:900;font-size:80px;line-height:1.02;
  letter-spacing:-3px;color:${C.ink}}
h1 .ln{display:block;white-space:nowrap}
.body{margin-top:26px;font-family:'Inter',sans-serif;font-weight:700;font-size:33px;
  line-height:1.34;color:${C.ink};letter-spacing:-.5px}
.brush{margin-top:auto}
.sere{margin-top:26px}
.cta-wrap{position:relative;z-index:3;flex:0 0 auto;margin-top:26px}`,
  body: `
  <div class="scene"><img src="../../../assets/sales/${esc(ad.photo)}" alt=""></div>
  <div class="row">
    <div class="left">
      <h1 id="hook">${head(ad)}</h1>
      <p class="body" id="sub">${ad.perfBody || ad.sub}</p>
      <div class="brush"><span class="s1">Il biglietto è</span><span class="s2">GRATUITO!</span></div>
      ${P.sere(42)}
    </div>
    <div class="right">${P.ticket(brand, ad.ticketPhoto || '41-coaching-online-5.jpg')}</div>
  </div>
  <div class="cta-wrap">${P.cta(brand)}</div>
  <div class="note" style="right:52px;top:44px;text-align:right">Quattro sere<br>in diretta ${arrow(18)}</div>` };
}

// ------------------------------------------------------------------- neon
function neon(ad, brand) {
  return { css: `
.ad{background:
  radial-gradient(90% 70% at 78% 18%,rgba(0,204,102,.28) 0%,rgba(0,204,102,0) 58%),
  linear-gradient(165deg,${C.navy2} 0%,${C.navy} 62%,#060F19 100%);
  display:flex;flex-direction:column;padding:56px 56px 48px;color:#fff}
.bolts{position:absolute;inset:0;z-index:0;opacity:.5}
.shot{position:absolute;right:0;top:0;width:47%;height:80%;z-index:1;overflow:hidden}
.shot img{width:100%;height:100%;object-fit:cover;object-position:${ad.focus || '50% 35%'}}
.shot:after{content:'';position:absolute;inset:0;background:
  linear-gradient(90deg,${C.navy} 0%,rgba(11,26,43,.35) 42%,rgba(11,26,43,0) 70%),
  linear-gradient(0deg,${C.navy} 2%,rgba(11,26,43,0) 40%)}
.top{position:relative;z-index:2;flex:0 0 auto;width:60%}
h1{font-family:'Archivo Black',sans-serif;font-size:86px;line-height:1.0;letter-spacing:-2.5px;
  text-transform:uppercase;text-shadow:0 4px 0 rgba(0,0,0,.35)}
h1 .ln{display:block;white-space:nowrap}
h1 .rd{color:${C.red};text-shadow:0 0 26px rgba(228,53,59,.65),0 4px 0 rgba(0,0,0,.35)}
h1 .gr{color:${C.green};text-shadow:0 0 26px rgba(0,204,102,.6),0 4px 0 rgba(0,0,0,.35)}
h1 .hl:before{background:${C.yellow}}
h1 .hl{color:${C.ink}}
.brush{margin-top:28px}
.card{position:relative;z-index:2;flex:0 0 auto;margin-top:auto;background:rgba(6,18,30,.82);
  border:2px solid rgba(0,204,102,.35);border-radius:26px;padding:28px 32px;
  box-shadow:0 0 44px -10px rgba(0,204,102,.35) inset,0 26px 50px -26px #000}
.card .r{display:flex;align-items:center;gap:20px;padding:17px 0}
.card .r + .r{border-top:1px solid rgba(255,255,255,.09)}
.card .ic{flex:0 0 auto;display:grid;place-items:center;width:56px;height:56px;border-radius:14px;
  background:rgba(255,255,255,.06)}
.card .tx{font-family:'Inter',sans-serif;font-weight:800;font-size:31px;letter-spacing:-.6px;color:#fff}
.card .tx b{font-weight:900}
.card .day{margin-left:auto;font-family:'Inter',sans-serif;font-weight:700;font-size:22px;
  color:rgba(255,255,255,.62);white-space:nowrap}
.cta-wrap{position:relative;z-index:3;flex:0 0 auto;margin-top:26px}
.cta{border-color:rgba(255,255,255,.9)}`,
  body: `
  <svg class="bolts" viewBox="0 0 1080 1350" fill="none">
    <g stroke="#7CFFC0" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" opacity=".8">
      <path d="M120 0 60 300l90-40-70 320"/><path d="M980 60l-70 240 80-30-60 250"/>
      <path d="M700 0l-40 160 60-20-45 190"/>
    </g>
  </svg>
  <div class="shot"><img src="../../../assets/sales/${esc(ad.photo)}" alt=""></div>
  <div class="top">
    <h1 id="hook">${head(ad)}</h1>
    <div class="brush"><span class="s1">4 sere online</span><span class="s2">GRATIS!</span></div>
  </div>
  <div class="card">
    ${P.SERE.map((s) => `<div class="r">
      <span class="ic">${P.icon(s.tag, 34, s.color)}</span>
      <span class="tx"><b style="color:${s.color}">${s.tag.toUpperCase()}</b> · ${s.txt}</span>
      <span class="day">${s.day}</span>
    </div>`).join('')}
  </div>
  <div class="cta-wrap">${P.cta(brand)}</div>` };
}

// ------------------------------------------------------------------ scena
function scena(ad, brand) {
  return { css: `
.ad{background:linear-gradient(170deg,#FFFFFF 0%,#F2F5F3 100%);display:flex;flex-direction:column}
.head{position:relative;z-index:3;flex:0 0 auto;display:flex;gap:26px;padding:46px 48px 24px}
.tk{flex:0 0 300px;filter:drop-shadow(0 0 34px rgba(0,204,102,.45))}
.tx{flex:1 1 auto;min-width:0;display:flex;flex-direction:column;justify-content:center}
h1{font-family:'Inter',sans-serif;font-weight:900;font-size:62px;line-height:1.04;
  letter-spacing:-2.2px;color:${C.ink}}
h1 .ln{display:block;white-space:nowrap}
.body{margin-top:18px;font-family:'Inter',sans-serif;font-weight:700;font-size:28px;
  line-height:1.34;color:${C.ink2};letter-spacing:-.4px}
.free{margin-top:16px;font-family:'Archivo Black',sans-serif;font-size:31px;color:${C.greenDeep};
  letter-spacing:-1.2px;white-space:nowrap}
.scene{position:relative;z-index:1;flex:1 1 auto;min-height:0;overflow:hidden}
.scene img{width:100%;height:100%;object-fit:cover;object-position:${ad.focus || '50% 40%'}}
.scene:before{content:'';position:absolute;inset:0;z-index:2;
  background:linear-gradient(180deg,#F2F5F3 0%,rgba(242,245,243,0) 16%,rgba(242,245,243,0) 62%,rgba(10,20,15,.55) 100%)}
.cta-wrap{position:absolute;left:0;right:0;bottom:0;z-index:4;padding:0 48px 46px}`,
  body: `
  <div class="head">
    <div class="tk">${P.ticket(brand, ad.ticketPhoto || '41-coaching-online-5.jpg')}</div>
    <div class="tx">
      <h1 id="hook">${head(ad)}</h1>
      <p class="body" id="sub">${ad.perfBody || ad.sub}</p>
      <div class="free">Workshop gratuito · 22–25 ottobre</div>
    </div>
  </div>
  <div class="scene"><img src="../../../assets/sales/${esc(ad.photo)}" alt=""></div>
  <div class="cta-wrap">${P.cta(brand)}</div>` };
}

const FORMATS = { split, neon, scena };

function html(ad, brand, format) {
  const F = (FORMATS[format] || split)(ad, brand);
  return `<!doctype html>
<html lang="it"><head><meta charset="utf-8"><style>
${fonts}
*{margin:0;padding:0;box-sizing:border-box}
html,body{width:${W}px;height:${H}px}
body{overflow:hidden;background:#000;-webkit-font-smoothing:antialiased}
.ad{position:relative;width:${W}px;height:${H}px;overflow:hidden}
${P.css}
${F.css}
</style></head>
<body><div class="ad">${F.body}</div>
<script>
function fitOne(el, min, over) {
  var s = parseFloat(getComputedStyle(el).fontSize);
  while (s > min && over()) { s -= 2; el.style.fontSize = s + 'px'; }
}
function fit() {
  var h = document.getElementById('hook');
  var wide = function () {
    return [].some.call(h.querySelectorAll('.ln'), function (n) { return n.scrollWidth > h.clientWidth; });
  };
  fitOne(h, 34, wide);
  var ad = document.querySelector('.ad');
  var over = function () { return ad.scrollHeight > ad.clientHeight; };
  var sub = document.getElementById('sub');
  if (sub) fitOne(sub, 20, over);
  fitOne(h, 34, over);
  var cta = document.getElementById('cta');
  if (cta) fitOne(cta, 26, function () {
    return [].some.call(cta.children, function (n) { return n.scrollWidth > cta.clientWidth; });
  });
}
document.fonts.ready.then(fit);
</script>
</body></html>`;
}

module.exports = { html, W, H, FORMATS: Object.keys(FORMATS) };
