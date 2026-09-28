'use strict';

// Creativo 4:5 (1080×1350) nello stile **Metodo Universitario**.
//
// La palette e il carattere vengono dal brand MU (pagamenti-mu): Inter,
// verde #00CC66 e blu #0A82EF — i due colori del logo — su fondi bianchi e
// azzurrini. L'impianto è quello delle sponsorizzate già in uso in questo
// repo: banda colorata in alto col pain, corpo chiaro puntinato, barra CTA
// verde con cursore e doppia freccia, strisce diagonali in basso a sinistra.

const W = 1080;
const H = 1350;

const C = {
  blue: '#0A82EF',
  blueDeep: '#065FB5',
  blueInk: '#0A5FAE',
  green: '#00CC66',
  greenDeep: '#008040',
  ink: '#000807',
  ink2: '#2B3A44',
  muted: '#5A6B78',
  paper: '#FFFFFF',
  tint: '#F7FAFF',
  tint2: '#EDF4FF',
  line: '#E0EDFF',
  line2: '#D0E3FF',
  red: '#E4353B',
};

const face = (w, file) => `
@font-face{font-family:'Inter';font-style:normal;font-weight:${w};src:url('../../../assets/fonts/${file}') format('truetype');}`;
const fonts = [[500, 'Inter-500.ttf'], [700, 'Inter-700.ttf'], [800, 'Inter-800.ttf'], [900, 'Inter-900.ttf']]
  .map((f) => face(...f)).join('');

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function html(ad, brand) {
  // la banda prende il verde quando il creativo è di sola offerta, il blu sui pain
  const offer = !!ad.offer;
  const bandFrom = offer ? '#00B85C' : C.blue;
  const bandTo = offer ? C.greenDeep : C.blueDeep;
  const hiColor = offer ? '#FFFFFF' : C.green;

  const lines = ad.head
    .map((l) => (typeof l === 'string'
      ? `<span class="ln">${esc(l)}</span>`
      : `<span class="ln hi">${esc(l.hi)}</span>`))
    .join('');

  return `<!doctype html>
<html lang="it"><head><meta charset="utf-8"><style>
${fonts}
*{margin:0;padding:0;box-sizing:border-box}
html,body{width:${W}px;height:${H}px}
body{overflow:hidden;background:${C.paper};font-family:'Inter',sans-serif;
  -webkit-font-smoothing:antialiased;color:${C.ink}}
.ad{position:relative;width:${W}px;height:${H}px;overflow:hidden;display:flex;flex-direction:column}

/* ---------- banda del pain ---------- */
.band{position:relative;flex:0 0 auto;padding:58px 68px 54px;
  background:linear-gradient(140deg,${bandFrom} 0%,${bandTo} 100%);overflow:hidden}
.band:after{content:'';position:absolute;inset:0;pointer-events:none;
  background-image:radial-gradient(rgba(255,255,255,.14) 2px,transparent 2px);
  background-size:26px 26px;opacity:.55}
.band h1{position:relative;z-index:1;font-weight:900;font-size:92px;line-height:1.02;
  letter-spacing:-2.5px;text-transform:uppercase}
.band .ln{display:block;white-space:nowrap;color:#fff}
.band .hi{color:${hiColor}}

/* ---------- corpo ---------- */
.body{position:relative;flex:1 1 auto;min-height:0;display:flex;flex-direction:column;
  padding:34px 68px 0;background:${C.paper};
  background-image:radial-gradient(rgba(10,130,239,.13) 2px,transparent 2px);
  background-size:30px 30px}
.logo{flex:0 0 auto;display:flex;align-items:center;justify-content:space-between;gap:24px;
  margin-bottom:26px}
.logo img{height:46px;width:auto;display:block}
.logo .when{font-weight:800;font-size:22px;letter-spacing:1.6px;text-transform:uppercase;
  color:${C.blueInk};background:${C.tint2};border:2px solid ${C.line};
  border-radius:999px;padding:11px 22px;white-space:nowrap}

.shot{flex:1 1 auto;min-height:0;position:relative;overflow:hidden;
  border-radius:20px;border:3px solid ${C.line};box-shadow:0 18px 38px -24px rgba(10,95,174,.55)}
.shot img{width:100%;height:100%;object-fit:cover;display:block;
  object-position:${ad.focusMu || ad.focus || '50% 45%'};
  transform:scale(${ad.zoomMu || ad.zoom || 1});transform-origin:${ad.focusMu || ad.focus || '50% 45%'}}

.note{flex:0 0 auto;margin-top:26px;background:${C.tint};border:2px solid ${C.line};
  border-radius:16px;padding:22px 26px}
.note .tag{display:block;font-weight:800;font-size:19px;letter-spacing:1.8px;
  text-transform:uppercase;color:${C.blue};margin-bottom:10px}
.note p{font-weight:700;font-size:31px;line-height:1.34;color:${C.ink2};letter-spacing:-.3px}
.note b{color:${C.ink};background:linear-gradient(transparent 62%,rgba(0,204,102,.32) 62%)}

/* ---------- CTA ---------- */
.cta-wrap{position:relative;z-index:2;flex:0 0 auto;padding:26px 68px 56px}
.cta{display:flex;align-items:center;gap:26px;padding:28px 34px;border-radius:22px;
  background:${C.green};box-shadow:0 12px 0 ${C.greenDeep},0 26px 44px -22px rgba(0,128,64,.75)}
.cta .hand,.cta .chev{flex:0 0 auto;display:flex;color:#fff}
.cta .txt{flex:1 1 auto;min-width:0;color:#fff;font-weight:900;font-size:46px;line-height:1.12;
  letter-spacing:-1px}
.cta .txt .l1,.cta .txt .l2{display:block;white-space:nowrap}
.cta .txt .l2{font-weight:700;font-size:.85em;margin-top:3px}
.foot{display:block;margin-top:18px;font-weight:700;font-size:21px;letter-spacing:.4px;
  color:${C.muted};text-align:center}

/* strisce diagonali, firma della casa */
.stripes{position:absolute;z-index:1;left:-158px;bottom:-148px;width:400px;height:280px;
  transform:rotate(-45deg);display:flex;flex-direction:column;gap:11px;justify-content:flex-end}
.stripes i{display:block;height:15px;border-radius:4px}
.stripes i:nth-child(1){background:${C.blue};width:70%}
.stripes i:nth-child(2){background:${C.green};width:86%}
.stripes i:nth-child(3){background:${C.blueDeep};width:100%}
</style></head>
<body>
<div class="ad">
  <header class="band"><h1 id="hook">${lines}</h1></header>
  <section class="body">
    <div class="logo">
      <img src="../../../assets/mu/logo-metodo-universitario.png" alt="Metodo Universitario">
      <span class="when">${esc(brand.when)} · Gratis</span>
    </div>
    <div class="shot"><img src="../../../assets/sales/${esc(ad.photo)}" alt=""></div>
    ${ad.sub ? `<div class="note"><span class="tag">${esc(ad.muTag || 'Il workshop')}</span><p id="sub">${ad.sub}</p></div>` : ''}
  </section>
  <div class="cta-wrap">
    <div class="cta">
      <span class="hand">
        <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor"
             stroke-width="2" stroke-linecap="round">
          <path d="M9 4.5V2M4.8 6.2 3 4.4M4.5 10.5H2M6.2 14.8 4.4 16.6"/>
          <path d="m9.2 8.6 10.4 4.1-4.5 1.7-1.7 4.5z" fill="currentColor" stroke-linejoin="round"/>
        </svg>
      </span>
      <span class="txt" id="cta"><span class="l1">${esc(brand.cta1)}</span><span class="l2">${esc(brand.cta2)}</span></span>
      <span class="chev">
        <svg width="46" height="46" viewBox="0 0 24 24" fill="none" stroke="currentColor"
             stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="m6 8 6 6 6-6M6 14l6 6 6-6"/></svg>
      </span>
    </div>
    <span class="foot">${esc(brand.footMu)}</span>
  </div>
  <div class="stripes"><i></i><i></i><i></i></div>
</div>

<script>
function fit() {
  var h = document.getElementById('hook');
  var band = h.parentElement;
  var avail = h.clientWidth;
  var wide = function () {
    return [].some.call(h.children, function (n) { return n.scrollWidth > avail; });
  };
  var s = parseFloat(getComputedStyle(h).fontSize);
  while (s > 44 && wide()) { s -= 2; h.style.fontSize = s + 'px'; }
  while (s < 118 && !wide()) { s += 2; h.style.fontSize = s + 'px'; }
  while (s > 44 && wide()) { s -= 2; h.style.fontSize = s + 'px'; }

  var cta = document.getElementById('cta');
  var over = function () {
    return [].some.call(cta.children, function (n) { return n.scrollWidth > cta.clientWidth; });
  };
  var c = parseFloat(getComputedStyle(cta).fontSize);
  while (c > 28 && over()) { c -= 1; cta.style.fontSize = c + 'px'; }

  // la foto non deve schiacciarsi: se serve, si riduce la nota
  var shot = document.querySelector('.shot');
  var sub = document.getElementById('sub');
  if (sub) {
    var v = parseFloat(getComputedStyle(sub).fontSize);
    while (v > 22 && shot.clientHeight < 400) { v -= 1; sub.style.fontSize = v + 'px'; }
  }
  while (s > 44 && shot.clientHeight < 360) { s -= 2; h.style.fontSize = s + 'px'; }
}
document.fonts.ready.then(fit);
</script>
</body></html>`;
}

module.exports = { html, W, H, C };
