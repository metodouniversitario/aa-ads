'use strict';

// Creativo 4:5 (1080×1350) per le sponsorizzate Meta del workshop
// "Professionista del Futuro".
//
// Regola: UN concetto solo, leggibile col pollice in movimento su uno schermo
// alto cinque centimetri. Immagine della sales in alto, hook grande sotto,
// bottone. Niente citazioni, elenchi, chip o URL: quelli stanno nella pagina.
//
// Il richiamo alla sales è nella materia — stesse foto, stesso cream, stesso
// verde, stesso Bricolage Grotesque — non nella copia del layout.

const W = 1080;
const H = 1350;

const THEME = {
  // cream: il fondo della pagina. Default.
  cream: {
    base: '#FFFBF4', rgb: '255,251,244', tail: '#FFF7EC',
    ink: '#1F2E26',
    glow: 'linear-gradient(96deg,#06803F 0%,#00CC66 55%,#28D4E0 100%)',
    tagBg: 'rgba(255,251,244,.92)', tagInk: '#06803F', dot: '#00CC66',
    pillBg: '#00CC66', pillInk: '#04351F', pillShadow: '#045C2E',
    sub: 'rgba(31,46,38,.66)', foot: 'rgba(31,46,38,.55)',
  },
  // verde profondo del blocco Premium: il taglio che stacca di più nel feed.
  deep: {
    base: '#0A4E31', rgb: '10,78,49', tail: '#06341F',
    ink: '#FFFFFF',
    glow: 'linear-gradient(96deg,#5CE6A0 0%,#00CC66 50%,#28D4E0 100%)',
    tagBg: 'rgba(4,42,25,.82)', tagInk: '#5CE6A0', dot: '#5CE6A0',
    pillBg: '#00CC66', pillInk: '#04351F', pillShadow: '#023D1F',
    sub: 'rgba(228,245,236,.78)', foot: 'rgba(228,245,236,.62)',
  },
  // blush: per i pain in cui il danno è già in corso.
  blush: {
    base: '#FFF1EA', rgb: '255,241,234', tail: '#FFE7D9',
    ink: '#2A211E',
    glow: 'linear-gradient(96deg,#B93B22 0%,#E14A33 55%,#FF8A5C 100%)',
    tagBg: 'rgba(255,241,234,.92)', tagInk: '#B93B22', dot: '#E14A33',
    pillBg: '#00CC66', pillInk: '#04351F', pillShadow: '#045C2E',
    sub: 'rgba(42,33,30,.66)', foot: 'rgba(42,33,30,.55)',
  },
};

const face = (family, weight, style, file) => `
@font-face{font-family:'${family}';font-style:${style};font-weight:${weight};src:url('../../assets/fonts/${file}') format('truetype');}`;

const fonts = [
  ['Bricolage Grotesque', 600, 'normal', 'Bricolage-600.ttf'],
  ['Bricolage Grotesque', 800, 'normal', 'Bricolage-800.ttf'],
  ['Newsreader', 400, 'normal', 'Newsreader-400.ttf'],
  ['Newsreader', 500, 'normal', 'Newsreader-500.ttf'],
  ['IBM Plex Mono', 500, 'normal', 'PlexMono-500.ttf'],
  ['IBM Plex Mono', 600, 'normal', 'PlexMono-600.ttf'],
].map((f) => face(...f)).join('');

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function html(ad, brand) {
  const t = THEME[ad.theme] || THEME.cream;
  const ph = ad.photoH || 58;
  // photoShift: spinge la foto verso il basso di N% della sua altezza, così il
  // soggetto esce da sotto la pillola del nome. Lo zoom cresce quanto basta a
  // non scoprire il bordo alto.
  const shift = ad.photoShift || 0;
  const zoom = Math.max(ad.zoom || 1, shift ? 1 + (2 * shift) / 100 + 0.06 : 1);
  const origin = shift ? '50% 50%' : (ad.focus || '50% 50%');
  // la foto resta pulita per i suoi primi due terzi, poi sfuma nel fondo della pagina
  const veil = `linear-gradient(to bottom,`
    + `rgba(${t.rgb},0) 0%,`
    + `rgba(${t.rgb},0) ${(ph * 0.56).toFixed(1)}%,`
    + `rgba(${t.rgb},.5) ${(ph * 0.8).toFixed(1)}%,`
    + `${t.base} ${ph}%,${t.tail} 100%)`;
  // righe dell'headline: stringa = inchiostro, {hi:"..."} = frase chiave nel gradiente
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
body{overflow:hidden;background:${t.base};-webkit-font-smoothing:antialiased}
.ad{position:relative;width:${W}px;height:${H}px;overflow:hidden;background:${t.base};color:${t.ink}}

/* ---------- foto della sales, a tutta larghezza ---------- */
.photo{position:absolute;left:0;right:0;top:0;height:${ph}%}
.photo img{width:100%;height:100%;object-fit:cover;display:block;
  object-position:${ad.focus || '50% 50%'};
  transform:scale(${zoom.toFixed(3)}) translateY(${shift}%);
  transform-origin:${origin}}
/* il fondo della pagina risale sulla foto e la chiude: niente taglio netto */
.veil{position:absolute;left:0;right:0;top:0;bottom:0;background:${veil}}

.wait{width:100%;height:100%;display:grid;place-items:center;text-align:center;
  background:repeating-linear-gradient(45deg,rgba(31,46,38,.05) 0 22px,rgba(31,46,38,.09) 22px 44px);
  font-family:'IBM Plex Mono',monospace;font-size:26px;line-height:1.6;color:rgba(31,46,38,.5)}

/* ---------- contenuto ---------- */
.in{position:absolute;inset:0;z-index:2;display:flex;flex-direction:column;padding:64px 72px 72px}

.tag{align-self:flex-start;display:flex;align-items:center;gap:15px;
  background:${t.tagBg};border-radius:999px;padding:15px 30px 15px 24px;
  box-shadow:0 12px 30px -14px rgba(122,80,40,.55);backdrop-filter:blur(6px)}
.tag .dot{width:16px;height:16px;border-radius:50%;background:${t.dot};flex:0 0 16px}
.tag .name{font-family:'Bricolage Grotesque',sans-serif;font-weight:800;font-size:31px;
  letter-spacing:-.02em;color:${t.tagInk}}
.tag .when{font-family:'IBM Plex Mono',monospace;font-weight:500;font-size:22px;
  letter-spacing:.06em;color:${t.tagInk};opacity:.72}

.hook{margin-top:auto;font-family:'Bricolage Grotesque',sans-serif;font-weight:800;
  font-size:112px;line-height:1.03;letter-spacing:-.035em}
.ln{display:block;white-space:nowrap}
.hi{background:${t.glow};-webkit-background-clip:text;background-clip:text;color:transparent}

.sub{margin-top:26px;font-family:'Newsreader',Georgia,serif;font-weight:400;
  font-size:35px;line-height:1.42;color:${t.sub};max-width:25em}
.sub b{font-weight:500;color:${t.ink}}

.bottom{margin-top:36px}
.pill{display:flex;align-items:center;gap:26px;background:${t.pillBg};color:${t.pillInk};
  border-radius:24px;padding:32px 38px;
  box-shadow:0 11px 0 ${t.pillShadow},0 28px 48px -22px rgba(4,92,46,.75)}
.pill .hand{flex:0 0 auto;display:flex}
.pill .txt{flex:1 1 auto;min-width:0;font-family:'Bricolage Grotesque',sans-serif;
  font-weight:800;font-size:46px;line-height:1.14;letter-spacing:-.025em}
.pill .txt .l2{display:block;font-weight:600;font-size:40px;margin-top:3px;opacity:.88}
.pill .chev{flex:0 0 auto;display:flex;opacity:.85}
.foot{display:block;margin-top:22px;font-family:'IBM Plex Mono',monospace;font-weight:500;
  font-size:23px;letter-spacing:.01em;color:${t.foot}}
</style></head>
<body>
<div class="ad">
  <div class="photo">${ad.photoMissing
    ? `<div class="wait">foto da inserire:<br>${esc(ad.photo)}</div>`
    : `<img src="../../${esc(ad.photoDir || 'assets/sales')}/${esc(ad.photo)}" alt="">`}</div>
  <div class="veil"></div>
  <div class="in">
    <span class="tag"><span class="dot"></span><span class="name">${esc(brand.product)}</span><span class="when">${esc(brand.when)}</span></span>
    <h1 class="hook" id="hook">${lines}</h1>
    ${ad.sub ? `<p class="sub" id="sub">${ad.sub}</p>` : ''}
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
    </div>
  </div>
</div>

<script>
// L'hook occupa tutto lo spazio che ha, senza mai sforare la tela.
function fit() {
  var h = document.getElementById('hook');
  var box = document.querySelector('.in');
  var avail = box.clientWidth - 144;
  var over = function () {
    if (box.scrollHeight > box.clientHeight) return true;
    return [].some.call(h.children, function (n) { return n.scrollWidth > avail; });
  };
  var s = parseFloat(getComputedStyle(h).fontSize);
  while (s > 44 && over()) { s -= 2; h.style.fontSize = s + 'px'; }
  while (s < 150 && !over()) { s += 2; h.style.fontSize = s + 'px'; }
  while (s > 44 && over()) { s -= 2; h.style.fontSize = s + 'px'; }
  var sub = document.getElementById('sub');
  if (sub) {
    var v = parseFloat(getComputedStyle(sub).fontSize);
    while (v > 24 && box.scrollHeight > box.clientHeight) { v -= 1; sub.style.fontSize = v + 'px'; }
  }
}
document.fonts.ready.then(fit);
</script>
</body></html>`;
}

module.exports = { html, W, H, THEME };
