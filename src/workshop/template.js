'use strict';

// Creativi 4:5 (1080×1350) per le sponsorizzate Meta del workshop
// "Professionista del Futuro".
//
// Regola: UN concetto solo, leggibile col pollice in movimento su uno schermo
// alto cinque centimetri. Della sales restano la materia — stesse foto, stesso
// cream, stesso verde, stesso Bricolage Grotesque — non la copia del layout.
//
// Due impaginazioni, stessa sostanza:
//   'bottom' — foto in alto, testo tutto sotto;
//   'split'  — hook in alto, foto a fascia nel mezzo, soluzione e CTA sotto.

const W = 1080;
const H = 1350;

const THEME = {
  // cream: il fondo della pagina. Default.
  cream: {
    base: '#FFFBF4', rgb: '255,251,244', tail: '#FFF7EC',
    ink: '#1F2E26',
    glow: 'linear-gradient(96deg,#06803F 0%,#00CC66 55%,#28D4E0 100%)',
    pillBg: '#00CC66', pillInk: '#04351F', pillShadow: '#045C2E',
    sub: 'rgba(31,46,38,.66)', foot: 'rgba(31,46,38,.55)',
  },
  // verde profondo del blocco Premium: il taglio che stacca di più nel feed.
  deep: {
    base: '#0A4E31', rgb: '10,78,49', tail: '#06341F',
    ink: '#FFFFFF',
    glow: 'linear-gradient(96deg,#5CE6A0 0%,#00CC66 50%,#28D4E0 100%)',
    pillBg: '#00CC66', pillInk: '#04351F', pillShadow: '#023D1F',
    sub: 'rgba(228,245,236,.78)', foot: 'rgba(228,245,236,.62)',
  },
  // blush: per i pain in cui il danno è già in corso.
  blush: {
    base: '#FFF1EA', rgb: '255,241,234', tail: '#FFE7D9',
    ink: '#2A211E',
    glow: 'linear-gradient(96deg,#B93B22 0%,#E14A33 55%,#FF8A5C 100%)',
    pillBg: '#00CC66', pillInk: '#04351F', pillShadow: '#045C2E',
    sub: 'rgba(42,33,30,.66)', foot: 'rgba(42,33,30,.55)',
  },
};

const face = (family, weight, style, file) => `
@font-face{font-family:'${family}';font-style:${style};font-weight:${weight};src:url('../../../assets/fonts/${file}') format('truetype');}`;

const fonts = [
  ['Bricolage Grotesque', 600, 'normal', 'Bricolage-600.ttf'],
  ['Bricolage Grotesque', 800, 'normal', 'Bricolage-800.ttf'],
  ['Newsreader', 400, 'normal', 'Newsreader-400.ttf'],
  ['Newsreader', 500, 'normal', 'Newsreader-500.ttf'],
  ['IBM Plex Mono', 500, 'normal', 'PlexMono-500.ttf'],
  ['IBM Plex Mono', 600, 'normal', 'PlexMono-600.ttf'],
].map((f) => face(...f)).join('');

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const ctaMarkup = (brand) => `
    <div class="bottom">
      <span class="pill">
        <span class="hand">
          <svg width="58" height="58" viewBox="0 0 24 24" fill="none" stroke="currentColor"
               stroke-width="2" stroke-linecap="round">
            <path d="M9 4.5V2M4.8 6.2 3 4.4M4.5 10.5H2M6.2 14.8 4.4 16.6"/>
            <path d="m9.2 8.6 10.4 4.1-4.5 1.7-1.7 4.5z" fill="currentColor" stroke-linejoin="round"/>
          </svg>
        </span>
        <span class="txt">${esc(brand.cta1)}<span class="l2">${esc(brand.cta2)}</span></span>
        <span class="chev">
          <svg width="46" height="46" viewBox="0 0 24 24" fill="none" stroke="currentColor"
               stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="m6 8 6 6 6-6M6 14l6 6 6-6"/></svg>
        </span>
      </span>
      <span class="foot">${esc(brand.foot)}</span>
    </div>`;

// stili condivisi dalle due impaginazioni
const common = (t) => `
*{margin:0;padding:0;box-sizing:border-box}
html,body{width:${W}px;height:${H}px}
body{overflow:hidden;background:${t.base};-webkit-font-smoothing:antialiased}
.ad{position:relative;width:${W}px;height:${H}px;overflow:hidden;background:${t.base};color:${t.ink}}
.hook{font-family:'Bricolage Grotesque',sans-serif;font-weight:800;
  font-size:112px;line-height:1.03;letter-spacing:-.035em}
.ln{display:block;white-space:nowrap}
.hi{background:${t.glow};-webkit-background-clip:text;background-clip:text;color:transparent}
.sub{font-family:'Newsreader',Georgia,serif;font-weight:400;
  font-size:35px;line-height:1.42;color:${t.sub};max-width:25em}
.sub b{font-weight:500;color:${t.ink}}
.pill{display:flex;align-items:center;gap:26px;background:${t.pillBg};color:${t.pillInk};
  border-radius:24px;padding:32px 38px;
  box-shadow:0 11px 0 ${t.pillShadow},0 28px 48px -22px rgba(4,92,46,.75)}
.pill .hand{flex:0 0 auto;display:flex}
.pill .txt{flex:1 1 auto;min-width:0;font-family:'Bricolage Grotesque',sans-serif;
  font-weight:800;font-size:46px;line-height:1.14;letter-spacing:-.025em}
.pill .txt .l2{display:block;font-weight:600;font-size:40px;margin-top:3px;opacity:.88}
.pill .chev{flex:0 0 auto;display:flex;opacity:.85}
.foot{display:block;margin-top:22px;font-family:'IBM Plex Mono',monospace;font-weight:500;
  font-size:23px;letter-spacing:.01em;color:${t.foot}}`;

// ---------- foto in alto, testo tutto sotto ----------
function bottomLayout(ad, brand, t) {
  const ph = ad.photoH || 58;
  const veil = `linear-gradient(to bottom,`
    + `rgba(${t.rgb},0) 0%,`
    + `rgba(${t.rgb},0) ${(ph * 0.56).toFixed(1)}%,`
    + `rgba(${t.rgb},.5) ${(ph * 0.8).toFixed(1)}%,`
    + `${t.base} ${ph}%,${t.tail} 100%)`;
  return {
    css: `
.photo{position:absolute;left:0;right:0;top:0;height:${ph}%}
.photo img{width:100%;height:100%;object-fit:cover;display:block;
  object-position:${ad.focus || '50% 50%'};transform:scale(${ad.zoom || 1});
  transform-origin:${ad.focus || '50% 50%'}}
.veil{position:absolute;inset:0;background:${veil}}
.in{position:absolute;inset:0;z-index:2;display:flex;flex-direction:column;
  justify-content:flex-end;padding:64px 72px 72px}
.hook{margin-top:auto}
.sub{margin-top:26px}
.bottom{margin-top:36px}`,
    body: `
  <div class="photo"><img src="../../../assets/sales/${esc(ad.photo)}" alt=""></div>
  <div class="veil"></div>
  <div class="in">
    <h1 class="hook" id="hook">__LINES__</h1>
    __SUB__
${ctaMarkup(brand)}
  </div>`,
  };
}

// ---------- hook in alto, foto a fascia nel mezzo, soluzione e CTA sotto ----------
function splitLayout(ad, brand, t) {
  const focus = ad.focusSplit || ad.focus || '50% 45%';
  return {
    css: `
.in{position:absolute;inset:0;z-index:2;display:flex;flex-direction:column;padding:70px 72px 72px}
.hook{flex:0 0 auto}
.pic{flex:1 1 auto;min-height:0;position:relative;overflow:hidden;margin:40px -72px 0}
.pic img{width:100%;height:100%;object-fit:cover;display:block;
  object-position:${focus};transform:scale(${ad.zoomSplit || ad.zoom || 1});transform-origin:${focus}}
/* la fascia si dissolve nel fondo sopra e sotto: nessun taglio netto */
.pic:after{content:'';position:absolute;inset:0;background:linear-gradient(to bottom,
  ${t.base} 0%,rgba(${t.rgb},0) 17%,rgba(${t.rgb},0) 83%,${t.base} 100%)}
.sub{margin-top:34px;flex:0 0 auto}
.bottom{margin-top:32px;flex:0 0 auto}`,
    body: `
  <div class="in">
    <h1 class="hook" id="hook">__LINES__</h1>
    <div class="pic"><img src="../../../assets/sales/${esc(ad.photo)}" alt=""></div>
    __SUB__
${ctaMarkup(brand)}
  </div>`,
  };
}

function html(ad, brand, layout) {
  const t = THEME[ad.theme] || THEME.cream;
  const L = layout === 'split' ? splitLayout(ad, brand, t) : bottomLayout(ad, brand, t);
  const lines = ad.head
    .map((l) => (typeof l === 'string'
      ? `<span class="ln">${esc(l)}</span>`
      : `<span class="ln hi">${esc(l.hi)}</span>`))
    .join('');
  const body = L.body
    .replace('__LINES__', lines)
    .replace('__SUB__', ad.sub ? `<p class="sub" id="sub">${ad.sub}</p>` : '');

  return `<!doctype html>
<html lang="it"><head><meta charset="utf-8"><style>
${fonts}
${common(t)}
${L.css}
</style></head>
<body>
<div class="ad">${body}
</div>

<script>
var SPLIT = ${layout === 'split'};
function fit() {
  var h = document.getElementById('hook');
  var sub = document.getElementById('sub');
  var box = document.querySelector('.in');
  var pic = document.querySelector('.pic');
  var avail = h.clientWidth; // larghezza utile reale: il contenitore include i margini
  var wide = function () {
    return [].some.call(h.children, function (n) { return n.scrollWidth > avail; });
  };
  // nel 'split' il vincolo è la fascia della foto, che non deve schiacciarsi;
  // nel 'bottom' è la tela, che non deve sforare.
  var tooBig = SPLIT
    ? function () { return wide() || pic.clientHeight < 350; }
    : function () { return wide() || box.scrollHeight > box.clientHeight; };
  var roomy = SPLIT
    ? function () { return !wide() && pic.clientHeight > 440; }
    : function () { return !tooBig(); };

  var s = parseFloat(getComputedStyle(h).fontSize);
  while (s > 44 && tooBig()) { s -= 2; h.style.fontSize = s + 'px'; }
  while (s < (SPLIT ? 118 : 150) && roomy()) { s += 2; h.style.fontSize = s + 'px'; }
  while (s > 44 && tooBig()) { s -= 2; h.style.fontSize = s + 'px'; }

  if (sub) {
    var v = parseFloat(getComputedStyle(sub).fontSize);
    while (v > 24 && tooBig()) { v -= 1; sub.style.fontSize = v + 'px'; }
  }
}
document.fonts.ready.then(fit);
</script>
</body></html>`;
}

module.exports = { html, W, H, THEME };
