'use strict';

// Il biglietto del workshop da solo, sulla tela 4:5 degli altri creativi.
// Serve come asset a sé: per le storie, per i post, o per essere montato altrove.
//
// Il biglietto è disegnato per stare largo ~416px dentro i creativi: qui viene
// ingrandito con `zoom`, che scala anche la tipografia e i raggi, invece di
// ridefinire ogni misura.

const P = require('./perf-parts');
const C = P.C;

const W = 1080;
const H = 1350;
const BASE = 416;   // larghezza nativa del biglietto nei creativi

const face = (fam, w, st, file) => `
@font-face{font-family:'${fam}';font-style:${st};font-weight:${w};src:url('../../../assets/fonts/${file}') format('truetype');}`;
const fonts = [
  ['Inter', 700, 'normal', 'Inter-700.ttf'],
  ['Inter', 800, 'normal', 'Inter-800.ttf'],
  ['Inter', 900, 'normal', 'Inter-900.ttf'],
  ['Archivo Black', 400, 'normal', 'ArchivoBlack.ttf'],
].map((f) => face(...f)).join('');

function html(ad, brand, opts) {
  const o = opts || {};
  const width = o.width || 880;              // larghezza massima del biglietto
  const marginY = o.marginY || 74;           // aria sopra e sotto
  const bg = o.bg === 'bianco'
    ? '#FFFFFF'
    : `radial-gradient(120% 80% at 80% 8%,rgba(0,204,102,.10) 0%,rgba(0,204,102,0) 58%),
       radial-gradient(90% 70% at 4% 96%,rgba(255,226,77,.16) 0%,rgba(255,226,77,0) 62%),
       linear-gradient(170deg,#FFFFFF 0%,#F2F5F3 100%)`;

  return `<!doctype html>
<html lang="it"><head><meta charset="utf-8"><style>
${fonts}
*{margin:0;padding:0;box-sizing:border-box}
html,body{width:${W}px;height:${H}px}
body{overflow:hidden;background:#000;-webkit-font-smoothing:antialiased}
.ad{position:relative;width:${W}px;height:${H}px;overflow:hidden;background:${bg};
  display:grid;place-items:center}
${P.css}
.tk{width:${BASE}px}
/* l'ombra va applicata fuori dallo zoom, o cresce anche lei */
.tk .ticket{box-shadow:0 18px 34px -16px rgba(10,30,20,.45),0 0 0 1px rgba(14,21,18,.06)}
</style></head>
<body><div class="ad"><div class="tk">
${P.ticket(brand, (ad && ad.ticketPhoto) || '41-coaching-online-5.jpg', null, ad && ad.ticketFocus)}
</div></div>
<script>
// lo zoom si calcola sul posto: il biglietto deve stare dentro la tela sia in
// larghezza sia in altezza, qualunque sia la lunghezza del nome del workshop
(function () {
  var tk = document.querySelector('.tk');
  var h = tk.getBoundingClientRect().height;
  var z = Math.min(${width} / ${BASE}, (${H} - ${marginY} * 2) / h);
  tk.style.zoom = z;
})();
</script>
</body></html>`;
}

module.exports = { html, W, H };
