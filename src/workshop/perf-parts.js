'use strict';
// Pezzi condivisi dai tre format "performance": il biglietto del workshop al
// posto del mockup di prodotto, la riga delle quattro sere, gli evidenziatori
// disegnati a mano e la barra CTA.

const C = {
  green: '#00CC66', greenDeep: '#008040', greenDark: '#03662F',
  yellow: '#FFE24D', yellowInk: '#8A6B00',
  red: '#E4353B', redDeep: '#B21D23',
  ink: '#0E1512', ink2: '#3A4742',
  navy: '#0B1A2B', navy2: '#122A44',
  white: '#FFFFFF',
};

// le quattro sere, prese dal programma della sales
const SERE = [
  { n: '1', day: 'Gio 22', tag: 'Coscienza', txt: 'Il Risveglio della Coscienza', color: C.green },
  { n: '2', day: 'Ven 23', tag: 'Soldi', txt: 'I veri artisti non fanno la fame', color: C.yellow },
  { n: '3', day: 'Sab 24', tag: 'AI', txt: "L'IA dentro un'azienda vera", color: C.green },
  { n: '4', day: 'Dom 25', tag: 'Sblocco', txt: 'Elimina il blocco che ti ferma', color: C.yellow },
];

const ICONS = {
  Coscienza: '<circle cx="12" cy="12" r="9"/><path d="m15 9-4.5 1.5L9 15l4.5-1.5z"/>',
  Soldi: '<ellipse cx="12" cy="7" rx="7" ry="3"/><path d="M5 7v5c0 1.7 3.1 3 7 3s7-1.3 7-3V7M5 12v5c0 1.7 3.1 3 7 3s7-1.3 7-3v-5"/>',
  AI: '<rect x="7" y="7" width="10" height="10" rx="2"/><path d="M10 3v4M14 3v4M10 17v4M14 17v4M3 10h4M3 14h4M17 10h4M17 14h4"/>',
  Sblocco: '<circle cx="8" cy="15" r="4"/><path d="m11 12 8-8 2 2-2 2 2 2-2 2-2-2-2 2"/>',
};
const icon = (k, size, color) => `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none"
  stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${ICONS[k]}</svg>`;

// bordo irregolare, il trucco per far sembrare disegnato a mano un rettangolo
const ROUGH = '255px 15px 225px 15px/15px 225px 15px 255px';

const css = `
/* ---------- evidenziatori ---------- */
.hl{position:relative;z-index:1;white-space:nowrap}
.hl:before{content:'';position:absolute;z-index:-1;left:-.08em;right:-.08em;top:.16em;bottom:-.02em;
  background:${C.yellow};border-radius:${ROUGH};transform:rotate(-.6deg)}
.rd{color:${C.red}}
.gr{color:${C.greenDeep}}
.und{position:relative;white-space:nowrap}
.und:after{content:'';position:absolute;left:-.04em;right:-.04em;bottom:-.12em;height:.09em;
  border-radius:${ROUGH};background:currentColor;opacity:.85;transform:rotate(-.4deg)}

/* ---------- pennellata verde "workshop gratuito" ---------- */
.brush{display:inline-block;position:relative;padding:16px 34px 20px;transform:rotate(-1.4deg)}
.brush:before{content:'';position:absolute;inset:0;background:${C.green};
  border-radius:${ROUGH};box-shadow:0 10px 28px -14px rgba(0,128,64,.9)}
.brush span{position:relative;display:block;font-family:'Inter',sans-serif;font-weight:900;
  color:#fff;line-height:1.02;letter-spacing:-1.2px;text-shadow:0 2px 0 rgba(0,0,0,.18)}
.brush .s1{font-size:38px}
.brush .s2{font-size:62px;color:${C.yellow}}

/* ---------- biglietto del workshop ---------- */
.ticket{position:relative;background:#fff;border-radius:22px;overflow:hidden;
  box-shadow:0 30px 60px -28px rgba(10,30,20,.55),0 0 0 1px rgba(14,21,18,.07)}
.ticket .top{background:linear-gradient(150deg,${C.green} 0%,${C.greenDark} 100%);
  padding:20px 24px 18px;color:#fff;text-align:center}
.ticket .top .kick{font-family:'Inter',sans-serif;font-weight:800;font-size:17px;letter-spacing:2.6px;
  text-transform:uppercase;opacity:.92}
.ticket .top .name{font-family:'Archivo Black',sans-serif;font-size:34px;line-height:1.02;
  letter-spacing:-1px;margin-top:6px;text-transform:uppercase}
.ticket .shot{width:100%;aspect-ratio:1/.82;object-fit:cover;object-position:50% 28%;display:block}
.ticket .who{text-align:center;font-family:'Inter',sans-serif;font-weight:700;font-size:20px;
  color:${C.ink2};padding:14px 16px 0}
.ticket .when{text-align:center;font-family:'Archivo Black',sans-serif;font-size:36px;
  color:${C.ink};letter-spacing:-1px;padding:4px 10px 2px}
.ticket .hour{text-align:center;font-family:'Inter',sans-serif;font-weight:700;font-size:20px;
  color:${C.ink2};padding-bottom:16px}
.ticket .perf{position:relative;height:2px;margin:0 22px;
  background:repeating-linear-gradient(90deg,rgba(14,21,18,.28) 0 10px,transparent 10px 20px)}
.ticket .perf:before,.ticket .perf:after{content:'';position:absolute;top:-13px;width:26px;height:26px;
  border-radius:50%;background:var(--notch,#fff)}
.ticket .perf:before{left:-35px}.ticket .perf:after{right:-35px}
.ticket .free{background:${C.yellow};color:${C.ink};text-align:center;
  font-family:'Archivo Black',sans-serif;font-size:30px;letter-spacing:-.5px;padding:16px 10px 18px}

/* ---------- riga delle quattro sere ---------- */
.sere{display:flex;gap:14px}
.sere .s{flex:1 1 0;min-width:0;text-align:center}
.sere .box{display:grid;place-items:center;height:84px;border-radius:16px;background:#fff;
  border:2px solid rgba(14,21,18,.10);box-shadow:0 10px 22px -16px rgba(10,30,20,.6)}
.sere .lab{margin-top:9px;font-family:'Inter',sans-serif;font-weight:800;font-size:19px;
  color:${C.ink};line-height:1.15}
.sere .day{font-family:'Inter',sans-serif;font-weight:600;font-size:16px;color:${C.ink2};opacity:.8}

/* ---------- annotazioni a mano ---------- */
.note{position:absolute;z-index:4;font-family:'Caveat',cursive;font-weight:700;
  font-size:34px;line-height:1.1;color:${C.ink};text-transform:uppercase;letter-spacing:.5px}
.note svg{display:block}

/* ---------- barra CTA ---------- */
.cta{display:flex;align-items:center;gap:24px;background:linear-gradient(180deg,${C.green},${C.greenDeep});
  border-radius:60px;padding:26px 40px;border:4px solid #fff;
  box-shadow:0 14px 0 ${C.greenDark},0 30px 50px -22px rgba(0,128,64,.9)}
.cta .hand,.cta .chev{flex:0 0 auto;display:flex;color:#fff}
.cta .txt{flex:1 1 auto;min-width:0;font-family:'Inter',sans-serif;font-weight:900;color:#fff;
  font-size:44px;line-height:1.1;letter-spacing:-1.2px;text-shadow:0 2px 0 rgba(0,0,0,.2)}
.cta .txt .l1,.cta .txt .l2{display:block;white-space:nowrap}
.cta .txt .l2{font-size:.88em}
.cta .txt em{font-style:normal;color:${C.yellow}}`;

const ticket = (brand, photo, notch) => `
  <div class="ticket" style="--notch:${notch || '#fff'}">
    <div class="top">
      <div class="kick">Workshop online</div>
      <div class="name">${brand.product}</div>
    </div>
    <img class="shot" src="../../../assets/sales/${photo}" alt="">
    <div class="who">con <b>Andrea Acconcia</b></div>
    <div class="when">22–25 ottobre</div>
    <div class="hour">4 sere · 20:00 → 22:00</div>
    <div class="perf"></div>
    <div class="free">BIGLIETTO GRATUITO</div>
  </div>`;

const sere = (size) => `
  <div class="sere">${SERE.map((s) => `
    <div class="s">
      <div class="box">${icon(s.tag, size || 44, s.tag === 'Soldi' || s.tag === 'Sblocco' ? C.yellowInk : C.greenDeep)}</div>
      <div class="lab">${s.tag}</div>
      <div class="day">${s.day}</div>
    </div>`).join('')}</div>`;

const cta = (brand) => `
  <div class="cta">
    <span class="hand">
      <svg width="54" height="54" viewBox="0 0 24 24" fill="none" stroke="currentColor"
           stroke-width="2" stroke-linecap="round">
        <path d="M9 4.5V2M4.8 6.2 3 4.4M4.5 10.5H2M6.2 14.8 4.4 16.6"/>
        <path d="m9.2 8.6 10.4 4.1-4.5 1.7-1.7 4.5z" fill="currentColor" stroke-linejoin="round"/>
      </svg>
    </span>
    <span class="txt" id="cta"><span class="l1">Clicca su Scopri di più</span><span class="l2">e iscriviti <em>GRATIS</em> al Workshop</span></span>
    <span class="chev">
      <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor"
           stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="m6 8 6 6 6-6M6 14l6 6 6-6"/></svg>
    </span>
  </div>`;

module.exports = { C, SERE, ICONS, icon, css, ticket, sere, cta, ROUGH };
