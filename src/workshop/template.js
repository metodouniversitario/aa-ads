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
    kick: '#06803F', dash: '#00CC66', stampBg: 'rgba(255,251,244,.92)', stampInk: '#06803F',
    band: '#FBEEDC', edge: 'rgba(31,46,38,.10)',
    act: 'linear-gradient(170deg,#EBF9F1,#DCF2E6)', rule: '#00CC66', edge: 'rgba(31,46,38,.10)',
  },
  // verde profondo del blocco Premium: il taglio che stacca di più nel feed.
  deep: {
    base: '#0A4E31', rgb: '10,78,49', tail: '#06341F',
    ink: '#FFFFFF',
    glow: 'linear-gradient(96deg,#5CE6A0 0%,#00CC66 50%,#28D4E0 100%)',
    pillBg: '#00CC66', pillInk: '#04351F', pillShadow: '#023D1F',
    sub: 'rgba(228,245,236,.78)', foot: 'rgba(228,245,236,.62)',
    kick: '#5CE6A0', dash: '#5CE6A0', stampBg: 'rgba(4,42,25,.84)', stampInk: '#5CE6A0',
    band: '#06341F', edge: 'rgba(228,245,236,.14)',
    act: 'linear-gradient(170deg,#073B24,#04250F)', rule: '#5CE6A0', edge: 'rgba(255,255,255,.14)',
  },
  // blush: per i pain in cui il danno è già in corso.
  blush: {
    base: '#FFF1EA', rgb: '255,241,234', tail: '#FFE7D9',
    ink: '#2A211E',
    glow: 'linear-gradient(96deg,#B93B22 0%,#E14A33 55%,#FF8A5C 100%)',
    pillBg: '#00CC66', pillInk: '#04351F', pillShadow: '#045C2E',
    sub: 'rgba(42,33,30,.66)', foot: 'rgba(42,33,30,.55)',
    kick: '#B93B22', dash: '#E14A33', stampBg: 'rgba(255,241,234,.92)', stampInk: '#B93B22',
    band: '#FFE0CE', edge: 'rgba(42,33,30,.10)',
    act: 'linear-gradient(170deg,#FFE9DC,#FFDFCB)', rule: '#00CC66', edge: 'rgba(42,33,30,.10)',
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

const ctaMarkup = (brand, big, foot) => `
    <div class="bottom">
      <span class="foot">${esc(foot || brand.foot)}</span>
      <span class="pill${big ? ' big' : ''}">
        <span class="hand">
          <svg width="58" height="58" viewBox="0 0 24 24" fill="none" stroke="currentColor"
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
      </span>
    </div>`;

// stili condivisi dalle due impaginazioni
const common = (t, big) => `
*{margin:0;padding:0;box-sizing:border-box}
html,body{width:${W}px;height:${H}px}
body{overflow:hidden;background:${t.base};-webkit-font-smoothing:antialiased}
.ad{position:relative;width:${W}px;height:${H}px;overflow:hidden;background:${t.base};color:${t.ink}}
.hook{font-family:'Bricolage Grotesque',sans-serif;font-weight:800;
  font-size:112px;line-height:1.03;letter-spacing:-.035em}
.ln{display:block;white-space:nowrap}
.hi{background:${t.glow};-webkit-background-clip:text;background-clip:text;color:transparent}
.sub{position:relative;padding-left:30px;font-family:'Newsreader',Georgia,serif;font-weight:400;
  font-size:35px;line-height:1.42;color:${t.sub};max-width:25em}
.sub:before{content:'';position:absolute;left:0;top:.28em;bottom:.22em;width:6px;
  border-radius:3px;background:${t.dash}}
.sub b{font-weight:500;color:${t.ink}}
.pill{display:flex;align-items:center;gap:26px;background:${t.pillBg};color:${t.pillInk};
  border-radius:24px;padding:32px 38px;
  box-shadow:0 11px 0 ${t.pillShadow},0 28px 48px -22px rgba(4,92,46,.75)}
.pill .hand{flex:0 0 auto;display:flex}
.pill .txt{flex:1 1 auto;min-width:0;font-family:'Bricolage Grotesque',sans-serif;
  font-weight:800;font-size:46px;line-height:1.14;letter-spacing:-.025em}
.pill .txt .l1,.pill .txt .l2{display:block;white-space:nowrap}
.pill .txt .l2{font-weight:600;font-size:.87em;margin-top:3px;opacity:.9}
.pill .chev{flex:0 0 auto;display:flex;opacity:.85}
/* fascia di chiusura: fondo proprio e filetto verde, così non fa blocco unico
   con la foto e con l'headline */
.act{flex:0 0 auto;margin:40px -72px 0;padding:36px 72px 66px;
  background:${t.band};border-top:7px solid ${t.dash}}
.act .sub{margin:0 0 26px}
/* versione maggiorata: il bottone pesa quanto l'headline */
.pill.big{gap:30px;padding:44px 44px;border-radius:28px;
  box-shadow:0 14px 0 ${t.pillShadow},0 34px 56px -22px rgba(4,92,46,.8)}
.pill.big .txt{font-size:58px;line-height:1.1}
.pill.big .txt .l2{margin-top:5px}
.kicker{display:flex;align-items:center;gap:16px;flex:0 0 auto;margin-bottom:22px;
  font-family:'IBM Plex Mono',monospace;font-weight:600;font-size:24px;letter-spacing:.15em;
  text-transform:uppercase;color:${t.kick}}
.kicker:before{content:'';width:46px;height:3px;border-radius:2px;background:${t.dash};flex:0 0 46px}
.stamp{position:absolute;z-index:2;right:34px;bottom:34px;
  background:${t.stampBg};border-radius:999px;padding:14px 26px;backdrop-filter:blur(8px);
  font-family:'IBM Plex Mono',monospace;font-weight:600;font-size:23px;letter-spacing:.1em;
  text-transform:uppercase;color:${t.stampInk};
  box-shadow:0 12px 30px -16px rgba(122,80,40,.7)}
.stamp.bl{right:auto;left:34px}
.stamp.tr{bottom:auto;top:34px}
.stamp.tl{bottom:auto;top:34px;right:auto;left:34px}
.foot{display:flex;align-items:center;gap:14px;margin:0 0 22px;
  font-family:'IBM Plex Mono',monospace;font-weight:500;
  font-size:23px;letter-spacing:.01em;color:${t.foot}}
.foot:before{content:'';width:26px;height:2px;border-radius:2px;background:${t.dash};flex:0 0 26px}`;

// ---------- foto in alto, testo tutto sotto ----------
function bottomLayout(ad, brand, t, o) {
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
  justify-content:flex-end;padding:64px 72px 0}
.hook{margin-top:auto}`,
    body: `
  <div class="photo"><img src="../../../assets/sales/${esc(ad.photo)}" alt=""></div>
  <div class="veil"></div>
  <div class="in">
    <h1 class="hook" id="hook">__LINES__</h1>
    <div class="act">
      __SUB__
${ctaMarkup(brand, o.bigCta)}
    </div>
  </div>`,
  };
}

// ---------- hook in alto, foto a fascia nel mezzo, chiusura in fondo ----------
function splitLayout(ad, brand, t, o) {
  const focus = ad.focusSplit || ad.focus || '50% 45%';
  return {
    css: `
.in{position:absolute;inset:0;z-index:2;display:flex;flex-direction:column;padding:70px 72px 0}
.hook{flex:0 0 auto}
/* la foto è una fascia vera, a tutta larghezza e con i bordi netti */
.pic{flex:1 1 auto;min-height:0;position:relative;overflow:hidden;margin:44px -72px 0}
.pic img{width:100%;height:100%;object-fit:cover;display:block;
  object-position:${focus};transform:scale(${ad.zoomSplit || ad.zoom || 1});transform-origin:${focus}}`,
    body: `
  <div class="in">
    ${o.brandMark ? `<div class="kicker">${esc(brand.product)}</div>` : ''}
    <h1 class="hook" id="hook">__LINES__</h1>
    <div class="pic"><img src="../../../assets/sales/${esc(ad.photo)}" alt="">
      ${o.brandMark ? `<span class="stamp ${ad.stampPos || ''}">${esc(brand.stamp)}</span>` : ''}</div>
    <div class="act">
      __SUB__
${ctaMarkup(brand, o.bigCta, o.brandMark ? brand.footAlt : null)}
    </div>
  </div>`,
  };
}

function html(ad, brand, opts) {
  const o = typeof opts === 'string' ? { layout: opts } : (opts || {});
  const t = THEME[ad.theme] || THEME.cream;
  const L = o.layout === 'split' ? splitLayout(ad, brand, t, o) : bottomLayout(ad, brand, t, o);
  const lines = (o.layout === 'split' && ad.headSplit ? ad.headSplit : ad.head)
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
${common(t, o.bigCta)}
${L.css}
</style></head>
<body>
<div class="ad">${body}
</div>

<script>
var SPLIT = ${o.layout === 'split'};
var PIC_MIN = ${ad.picMin || (o.bigCta ? 290 : 350)};
var PIC_TARGET = ${ad.picTarget || (o.bigCta ? 380 : 440)};
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
    ? function () { return wide() || pic.clientHeight < PIC_MIN; }
    : function () { return wide() || box.scrollHeight > box.clientHeight; };
  var roomy = SPLIT
    ? function () { return !wide() && pic.clientHeight > PIC_TARGET; }
    : function () { return !tooBig(); };

  var s = parseFloat(getComputedStyle(h).fontSize);
  while (s > 44 && tooBig()) { s -= 2; h.style.fontSize = s + 'px'; }
  while (s < (SPLIT ? 118 : 150) && roomy()) { s += 2; h.style.fontSize = s + 'px'; }
  while (s > 44 && tooBig()) { s -= 2; h.style.fontSize = s + 'px'; }

  var cta = document.getElementById('cta');
  if (cta) {
    var over = function () {
      return [].some.call(cta.children, function (n) { return n.scrollWidth > cta.clientWidth; });
    };
    var c = parseFloat(getComputedStyle(cta).fontSize);
    while (c > 30 && over()) { c -= 1; cta.style.fontSize = c + 'px'; }
  }
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
