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
    foot: 'rgba(31,46,38,.55)',
  },
  // verde profondo del blocco Premium: il taglio che stacca di più nel feed.
  deep: {
    base: '#0A4E31', rgb: '10,78,49', tail: '#06341F',
    ink: '#FFFFFF',
    glow: 'linear-gradient(96deg,#5CE6A0 0%,#00CC66 50%,#28D4E0 100%)',
    tagBg: 'rgba(4,42,25,.82)', tagInk: '#5CE6A0', dot: '#5CE6A0',
    pillBg: '#00CC66', pillInk: '#04351F', pillShadow: '#023D1F',
    foot: 'rgba(228,245,236,.62)',
  },
  // blush: per i pain in cui il danno è già in corso.
  blush: {
    base: '#FFF1EA', rgb: '255,241,234', tail: '#FFE7D9',
    ink: '#2A211E',
    glow: 'linear-gradient(96deg,#B93B22 0%,#E14A33 55%,#FF8A5C 100%)',
    tagBg: 'rgba(255,241,234,.92)', tagInk: '#B93B22', dot: '#E14A33',
    pillBg: '#00CC66', pillInk: '#04351F', pillShadow: '#045C2E',
    foot: 'rgba(42,33,30,.55)',
  },
};

const face = (family, weight, style, file) => `
@font-face{font-family:'${family}';font-style:${style};font-weight:${weight};src:url('../../assets/fonts/${file}') format('truetype');}`;

const fonts = [
  ['Bricolage Grotesque', 600, 'normal', 'Bricolage-600.ttf'],
  ['Bricolage Grotesque', 800, 'normal', 'Bricolage-800.ttf'],
  ['IBM Plex Mono', 500, 'normal', 'PlexMono-500.ttf'],
  ['IBM Plex Mono', 600, 'normal', 'PlexMono-600.ttf'],
].map((f) => face(...f)).join('');

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function html(ad, brand) {
  const t = THEME[ad.theme] || THEME.cream;
  const ph = ad.photoH || 58;
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
  object-position:${ad.focus || '50% 50%'};transform:scale(${ad.zoom || 1});
  transform-origin:${ad.focus || '50% 50%'}}
/* il fondo della pagina risale sulla foto e la chiude: niente taglio netto */
.veil{position:absolute;left:0;right:0;top:0;bottom:0;background:${veil}}

/* ---------- contenuto ---------- */
.in{position:absolute;inset:0;z-index:2;display:flex;flex-direction:column;padding:64px 72px 72px}

.tag{align-self:flex-start;display:inline-flex;align-items:center;gap:13px;
  background:${t.tagBg};border-radius:999px;padding:14px 26px 14px 22px;
  font-family:'IBM Plex Mono',monospace;font-weight:600;font-size:23px;letter-spacing:.13em;
  text-transform:uppercase;color:${t.tagInk};
  box-shadow:0 10px 26px -14px rgba(122,80,40,.55);backdrop-filter:blur(6px)}
.tag .dot{width:15px;height:15px;border-radius:50%;background:${t.dot}}

.hook{margin-top:auto;font-family:'Bricolage Grotesque',sans-serif;font-weight:800;
  font-size:112px;line-height:1.03;letter-spacing:-.035em}
.ln{display:block;white-space:nowrap}
.hi{background:${t.glow};-webkit-background-clip:text;background-clip:text;color:transparent}

.bottom{margin-top:44px;display:flex;align-items:center;gap:26px;flex-wrap:wrap}
.pill{display:inline-flex;align-items:center;gap:17px;background:${t.pillBg};color:${t.pillInk};
  border-radius:18px;padding:25px 36px;font-family:'Bricolage Grotesque',sans-serif;
  font-weight:800;font-size:40px;letter-spacing:-.02em;
  box-shadow:0 9px 0 ${t.pillShadow},0 24px 40px -22px rgba(4,92,46,.7)}
.foot{font-family:'IBM Plex Mono',monospace;font-weight:500;font-size:23px;
  letter-spacing:.01em;color:${t.foot}}
</style></head>
<body>
<div class="ad">
  <div class="photo"><img src="../../assets/sales/${esc(ad.photo)}" alt=""></div>
  <div class="veil"></div>
  <div class="in">
    <span class="tag"><span class="dot"></span>${esc(ad.tag || brand.tag)}</span>
    <h1 class="hook" id="hook">${lines}</h1>
    <div class="bottom">
      <span class="pill">${esc(brand.cta)}
        <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="currentColor"
             stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h13M12 5l7 7-7 7"/></svg>
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
}
document.fonts.ready.then(fit);
</script>
</body></html>`;
}

module.exports = { html, W, H, THEME };
