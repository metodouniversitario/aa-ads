'use strict';

const W = 1080;
const H = 1350; // formato 4:5

const C = {
  gold: '#F5B928',
  green: '#00A943',      // verde di brand (campionato dalla copertina)
  purple: '#7C4DFF',
  ctaFrom: '#00A943',    // pulsante CTA: verde di brand
  ctaTo: '#00C752',      // stessa tinta, piu chiara, per il gradiente
  ink: '#101828',
  paper: '#F6F8FA',
  painFrom: '#A8151F',
  painTo: '#6E0C13',
  offerFrom: '#0C6130',
  offerTo: '#053F1D',
  yellow: '#FFC629',
};

const fontFace = (family, weight, file) => `
@font-face{font-family:'${family}';font-style:normal;font-weight:${weight};src:url('../assets/fonts/${file}') format('truetype');}`;

const fonts = [
  ['Montserrat', 700, 'Montserrat-700.ttf'],
  ['Montserrat', 800, 'Montserrat-800.ttf'],
  ['Montserrat', 900, 'Montserrat-900.ttf'],
  ['Poppins', 400, 'Poppins-400.ttf'],
  ['Poppins', 500, 'Poppins-500.ttf'],
  ['Poppins', 600, 'Poppins-600.ttf'],
  ['Poppins', 700, 'Poppins-700.ttf'],
  ['Poppins', 800, 'Poppins-800.ttf'],
  ['Poppins', 900, 'Poppins-900.ttf'],
].map((f) => fontFace(...f)).join('');

// Banda superiore: pain (rosso) oppure offerta diretta (verde)
function band(ad) {
  if (ad.kind === 'offer') {
    return `
    <header class="band band--offer">
      <div class="offer-row">
        <span class="offer-strike">${ad.band.strike}</span>
        <span class="offer-big">${ad.band.big}</span>
      </div>
      <div class="offer-badge"><span class="hourglass">&#9203;</span> ${ad.band.badge}</div>
    </header>`;
  }
  const hi = ad.band.hi.map((l) => `<span class="hl">${l}</span>`).join('');
  return `
    <header class="band band--pain">
      <h1 id="headline"><span class="lead">${ad.band.lead}</span>${hi}</h1>
    </header>`;
}

function html(ad, brand) {
  return `<!doctype html>
<html lang="it"><head><meta charset="utf-8"><style>
${fonts}
*{margin:0;padding:0;box-sizing:border-box}
html,body{width:${W}px;height:${H}px}
body{font-family:'Poppins',sans-serif;background:${C.paper};overflow:hidden}
.ad{position:relative;width:${W}px;height:${H}px;display:flex;flex-direction:column;overflow:hidden}

/* ---------- banda superiore ---------- */
.band{position:relative;z-index:2;flex:0 0 430px;height:430px;overflow:hidden;
  display:flex;flex-direction:column;justify-content:center}
.band::after{content:'';position:absolute;inset:0;pointer-events:none;
  background-image:radial-gradient(rgba(255,255,255,.10) 2px, transparent 2px);
  background-size:26px 26px;opacity:.45}
.band--pain{padding:0 70px;background:linear-gradient(140deg,${C.painFrom} 0%,${C.painTo} 100%)}
.band--pain h1{position:relative;z-index:1;font-family:'Montserrat',sans-serif;font-weight:900;
  font-size:88px;line-height:1.04;letter-spacing:-1px;text-transform:uppercase}
.band--pain .lead,.band--pain .hl{display:block;white-space:nowrap}
.band--pain .lead{color:#fff}
.band--pain .hl{color:${C.yellow}}

.band--offer{padding:0 70px;background:linear-gradient(140deg,${C.offerFrom} 0%,${C.offerTo} 100%);
  align-items:flex-start}
.offer-row{position:relative;z-index:1;display:flex;align-items:baseline;gap:26px}
.offer-strike{position:relative;font-family:'Montserrat',sans-serif;font-weight:900;font-size:100px;color:#fff}
.offer-strike::after{content:'';position:absolute;left:-10px;right:-10px;top:44%;height:9px;
  background:#E4353B;transform:rotate(-9deg);border-radius:6px}
.offer-big{font-family:'Montserrat',sans-serif;font-weight:900;font-size:168px;color:${C.yellow};letter-spacing:-3px}
.offer-badge{position:relative;z-index:1;margin-top:24px;display:inline-flex;align-items:center;gap:16px;
  background:${C.yellow};color:#0B4A25;font-family:'Montserrat',sans-serif;font-weight:800;
  font-size:38px;letter-spacing:3px;padding:18px 38px;border-radius:16px}
.hourglass{font-size:36px;line-height:1}

/* ---------- corpo ---------- */
.body{position:relative;z-index:2;flex:1 1 auto;min-height:0;display:flex;gap:30px;
  padding:52px 64px 10px;
  background:${C.paper};
  background-image:radial-gradient(rgba(16,24,40,.10) 2px, transparent 2px);
  background-size:30px 30px}
.left{width:53%;min-width:0;display:flex;flex-direction:column;overflow:hidden}
.copy{font-weight:700;font-size:38px;line-height:1.32;color:${C.ink};letter-spacing:-.4px}
.copy .blue{color:#1D6FE0}
.copy .mark{background:${C.yellow};box-shadow:0 0 0 5px ${C.yellow};border-radius:3px}
.copy .gold{color:#D99400}
.copy .green{color:${C.green}}
.copy .purple{color:${C.purple}}
.rule{flex:0 0 auto;width:140px;height:8px;border-radius:6px;background:${C.green};margin:26px 0 22px}
.price{font-weight:700;font-size:40px;color:${C.ink};line-height:1.18}
.price .old{position:relative;font-family:'Montserrat',sans-serif;font-weight:900;padding:0 4px}
.price .old::after{content:'';position:absolute;left:-4px;right:-4px;top:44%;height:7px;
  background:#E4353B;transform:rotate(-8deg);border-radius:5px}
.price .sub{display:block;font-weight:600;font-size:36px;color:#3A4455;margin-top:2px}
.free{font-family:'Montserrat',sans-serif;font-weight:900;font-size:104px;color:${C.green};
  line-height:1;letter-spacing:-2px;margin-top:8px}

.right{width:47%;display:flex;align-items:center;justify-content:center}
.tablet{position:relative;width:430px;height:540px;background:#15171C;
  border-radius:32px;padding:12px;box-shadow:0 30px 56px rgba(16,24,40,.28);transform:rotate(.6deg)}
.tablet::before{content:'';position:absolute;top:13px;left:50%;transform:translateX(-50%);
  width:54px;height:5px;border-radius:3px;background:#2C2F36;z-index:1}
.tablet img{width:100%;height:100%;object-fit:cover;border-radius:22px;display:block;background:#EAF6EE}

/* ---------- CTA ---------- */
.cta-wrap{position:relative;z-index:2;flex:0 0 auto;padding:0 54px 64px}
.cta{display:flex;align-items:center;gap:28px;padding:30px 40px;border-radius:24px;
  background:linear-gradient(135deg,${C.ctaFrom} 0%,${C.ctaTo} 100%);
  box-shadow:0 20px 40px rgba(0,169,67,.34)}
.cta .click{flex:0 0 auto;color:#fff;opacity:.95;display:flex}
.cta .txt{flex:1 1 auto;min-width:0;color:#fff;font-weight:800;font-size:46px;line-height:1.14;letter-spacing:-.5px}
.cta .txt .l2{display:block;font-weight:700;font-size:37px;margin-top:4px}
.cta .txt .y{color:${C.yellow}}
.cta .txt .g{color:#fff;font-weight:800}
.cta .chev{flex:0 0 auto;color:${C.yellow};display:flex}

/* strisce diagonali in basso a sinistra */
.stripes{position:absolute;z-index:1;left:-140px;bottom:-126px;width:430px;height:300px;
  transform:rotate(-45deg);display:flex;flex-direction:column;gap:12px;justify-content:flex-end}
.stripes i{display:block;height:16px;border-radius:4px}
.stripes i:nth-child(1){background:${C.gold};width:70%}
.stripes i:nth-child(2){background:${C.green};width:84%}
.stripes i:nth-child(3){background:${C.purple};width:98%}
</style></head>
<body>
<div class="ad">
  ${band(ad)}
  <section class="body">
    <div class="left" id="left">
      <p class="copy" id="copy">
        Questa guida, <span class="blue">scorrevole e diretta</span>
        <span class="mark">(si legge in meno di mezz'ora)</span>, ti aiuta a trovare il
        <b>blocco</b> che ti tiene lontano da una vita con
        <span class="gold">Denaro</span>, <span class="green">Senso</span> e
        <span class="purple">Variet&agrave;</span>.
      </p>
      <div class="rule"></div>
      <p class="price">
        Costerà <span class="old">${brand.price}</span>
        <span class="sub">ma oggi ce l'hai</span>
      </p>
      <div class="free">GRATIS!</div>
    </div>
    <div class="right">
      <div class="tablet"><img src="../${brand.cover}" alt="${brand.product}"></div>
    </div>
  </section>
  <div class="cta-wrap">
    <div class="cta">
      <span class="click">
        <svg width="58" height="58" viewBox="0 0 24 24" fill="none" stroke="currentColor"
             stroke-width="2" stroke-linecap="round">
          <path d="M9 4.5V2M4.8 6.2 3 4.4M4.5 10.5H2M6.2 14.8 4.4 16.6"/>
          <path d="m9.2 8.6 10.4 4.1-4.5 1.7-1.7 4.5z" fill="currentColor" stroke-linejoin="round"/>
        </svg>
      </span>
      <span class="txt">
        Clicca su <span class="y">Scopri di più</span>
        <span class="l2">e scaricala subito <span class="g">GRATIS</span></span>
      </span>
      <span class="chev">
        <svg width="54" height="54" viewBox="0 0 24 24" fill="none" stroke="currentColor"
             stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
          <path d="m6 8 6 6 6-6M6 14l6 6 6-6"/>
        </svg>
      </span>
    </div>
  </div>
  <div class="stripes"><i></i><i></i><i></i></div>
</div>

<script>
// Auto-fit: nessun testo deve mai uscire dalla tela, qualunque sia la lunghezza del pain.
function shrink(el, test, min) {
  var size = parseFloat(getComputedStyle(el).fontSize);
  while (size > min && test()) { size -= 1; el.style.fontSize = size + 'px'; }
}
function fitAll() {
  var h1 = document.getElementById('headline');
  if (h1) {
    var box = h1.parentElement;
    var avail = box.clientWidth - 140; // padding orizzontale della banda
    shrink(h1, function () {
      var wide = [].some.call(h1.children, function (s) { return s.scrollWidth > avail; });
      return wide || h1.scrollHeight > box.clientHeight;
    }, 44);
  }
  var left = document.getElementById('left');
  var copy = document.getElementById('copy');
  shrink(copy, function () { return left.scrollHeight > left.clientHeight; }, 24);
}
document.fonts.ready.then(fitAll);
</script>
</body></html>`;
}

module.exports = { html, W, H, C };
