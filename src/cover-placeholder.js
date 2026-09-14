'use strict';
// Genera un segnaposto della copertina finché non viene caricata
// assets/cover-guida-missione.png (lo screenshot reale fornito da Andrea).
module.exports = `<!doctype html><html><head><meta charset="utf-8"><style>
@font-face{font-family:'Montserrat';font-weight:800;src:url('../assets/fonts/Montserrat-800.ttf') format('truetype')}
@font-face{font-family:'Montserrat';font-weight:900;src:url('../assets/fonts/Montserrat-900.ttf') format('truetype')}
@font-face{font-family:'Poppins';font-weight:600;src:url('../assets/fonts/Poppins-600.ttf') format('truetype')}
@font-face{font-family:'Poppins';font-weight:700;src:url('../assets/fonts/Poppins-700.ttf') format('truetype')}
*{margin:0;padding:0;box-sizing:border-box}
body{width:1190px;height:1512px;font-family:'Poppins',sans-serif;
  background:linear-gradient(160deg,#F2FBF5 0%,#E7F6EC 55%,#F7FBFF 100%);position:relative;overflow:hidden}
.kicker{text-align:center;padding-top:58px;font-family:'Montserrat';font-weight:800;font-size:34px;
  letter-spacing:7px;color:#101828}
.kicker .dot{color:#00A550}.kicker .g{color:#00A550}
h1{text-align:center;font-family:'Montserrat';font-weight:900;line-height:.9;margin-top:34px}
h1 .a{display:block;font-size:104px;color:#101828}
h1 .b{display:block;font-size:186px;color:#00A550;letter-spacing:-4px}
.badges{position:absolute;left:52px;top:490px;display:flex;flex-direction:column;gap:28px}
.badge{display:flex;align-items:center;gap:22px;background:#fff;border-radius:999px;
  padding:18px 40px 18px 18px;box-shadow:0 12px 26px rgba(16,24,40,.10)}
.ic{width:76px;height:76px;border-radius:999px;display:flex;align-items:center;justify-content:center;font-size:38px}
.t{font-family:'Montserrat';font-weight:800;font-size:34px;letter-spacing:1px}
.s{font-weight:600;font-size:27px;color:#475467}
.ph{position:absolute;right:60px;bottom:210px;width:660px;height:900px;border-radius:40px;
  background:repeating-linear-gradient(45deg,#D8EEE0 0 22px,#CDE8D6 22px 44px);
  display:flex;align-items:center;justify-content:center;font-family:'Montserrat';font-weight:900;
  font-size:46px;color:#7A9A86;text-align:center;line-height:1.3}
.foot{position:absolute;left:0;right:0;bottom:56px;text-align:center}
.foot p{font-weight:600;font-size:36px;color:#101828;line-height:1.45}
.bar{margin:26px auto 18px;width:420px;height:11px;border-radius:8px;
  background:linear-gradient(90deg,#F5B928 0 33%,#00A550 33% 66%,#7C4DFF 66% 100%)}
.name{font-family:'Montserrat';font-weight:800;font-size:36px;letter-spacing:9px;color:#101828}
</style></head><body>
<div class="kicker"><span class="dot">&#9679;</span> ANDREA <span class="g">ACCONCIA</span></div>
<h1><span class="a">Guida alla</span><span class="b">MISSIONE</span></h1>
<div class="badges">
  <div class="badge"><div class="ic" style="background:#FFD34D">&#128176;</div>
    <div><div class="t" style="color:#D99400">DENARO</div><div class="s">per essere indipendente</div></div></div>
  <div class="badge"><div class="ic" style="background:#00A550">&#10024;</div>
    <div><div class="t" style="color:#00A550">SENSO</div><div class="s">per sentire che conta</div></div></div>
  <div class="badge"><div class="ic" style="background:#7C4DFF">&#128274;</div>
    <div><div class="t" style="color:#7C4DFF">VARIET&Agrave;</div><div class="s">per non morire dentro</div></div></div>
</div>
<div class="ph">SEGNAPOSTO<br>copertina reale</div>
<div class="foot">
  <p>Trova il <b>blocco</b> che ti tiene lontano dal tuo <b>Successo</b>.</p>
  <div class="bar"></div><div class="name">ANDREA ACCONCIA</div>
</div>
</body></html>`;
