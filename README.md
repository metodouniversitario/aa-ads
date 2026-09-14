# aa-ads — creativi sponsorizzate "Guida alla Missione"

Generatore di creativi 4:5 (1080×1350) per le sponsorizzate del manuale gratuito
**Guida alla Missione** di Andrea Acconcia.

Il layout ricalca i creativi già in uso per il Metodo OCME (banda superiore con il
pain, corpo con copy + mockup della copertina, bottone CTA blu, strisce diagonali
in basso a sinistra), con la palette della Guida alla Missione:
oro `#F5B928` · verde di brand `#078001` · viola `#7C4DFF`.
Il pulsante CTA usa il verde di brand `#078001`; i verdi di "GRATIS!", del
filetto e della striscia restano su `#00A943`, il verde con cui è disegnata
la copertina, per non stonare col mockup che hanno accanto.

## Come si usa

```bash
npm install
# 1. metti lo screenshot reale della copertina in:
#    assets/cover-guida-missione.png
# 2. genera tutti i creativi in out/
npm run build
```

Se `assets/cover-guida-missione.png` non esiste, viene generato automaticamente un
**segnaposto** (utile solo per validare il layout): va sostituito con lo screenshot
vero prima di mandare in advertising.

## I creativi

| File | Tipo | Pain (da "I dolori dei clienti", punto 1) |
|---|---|---|
| `01-gratis-limitata-4x5.png` | offerta diretta | — (nessun pain, come da esempio) |
| `02-mille-cose-4x5.png` | pain | Fare mille cose e non portarne a termine nessuna — 18/29 |
| `03-non-sai-cosa-vuoi-4x5.png` | pain | Non sapere cosa si vuole — 16/29 |
| `04-mai-abbastanza-4x5.png` | pain | Non sentirsi mai abbastanza — 13/29 |
| `05-la-gabbia-4x5.png` | pain | La gabbia: prigionieri di una vita che va avanti lo stesso — 12/29 |
| `06-corpo-conto-4x5.png` | pain | Il corpo che presenta il conto — 12/29 |
| `07-sapere-tutto-4x5.png` | pain | Sapere tutto e non cambiare niente — 11/29 |
| `08-spiccioli-4x5.png` | pain | Dare tanto e monetizzare in spiccioli — 10/29 |
| `09-dipendenza-economica-4x5.png` | pain | Dipendere economicamente da qualcun altro — 10/29 |
| `10-orologio-eta-4x5.png` | pain | L'orologio: l'età come scadenza — 10/29 |
| `11-solitudine-4x5.png` | pain | La solitudine e il non essere visti — 9/29 |
| `12-lavoro-che-svuota-4x5.png` | pain | Il lavoro che non fa schifo e ti svuota lo stesso — 9/29 |
| `13-vivere-per-gli-altri-4x5.png` | pain | Vivere per gli altri e sentirsi in colpa quando si chiede per sé — 8/29 |
| `14-giudizio-4x5.png` | pain | Il giudizio della famiglia e dell'ambiente — 8/29 |
| `15-non-farcela-da-soli-4x5.png` | pain | Non farcela più da soli e cercare una guida — 7/29 |

Il corpo del creativo è **identico su tutti**: cambia solo la banda in alto, così
in fase di test l'unica variabile è il pain.

## Modificare i testi

Tutto sta in `src/ads.json`:

- `brand.price` — il prezzo barrato (default `19€`: **da confermare** per questa guida);
- `brand.cover` — percorso della copertina;
- `ads[].band` — le righe dell'headline. Per i pain: `lead` (riga bianca) e
  `hi` (righe gialle). Non serve preoccuparsi della lunghezza: un auto-fit riduce
  il corpo del testo finché ogni riga sta su una riga sola.

Per aggiungere un creativo basta aggiungere un oggetto all'array `ads`.

## Struttura

```
src/ads.json              testi e configurazione
src/template.js           layout HTML/CSS del creativo + auto-fit
src/cover-placeholder.js  segnaposto copertina
src/render.js             rendering con Playwright/Chromium
assets/fonts/             Montserrat + Poppins (SIL Open Font License)
out/                      PNG generati
```
