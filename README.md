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

---

# Creativi workshop "Professionista del Futuro"

Creativi 4:5 (1080×1350) per le sponsorizzate Meta del workshop
**Professionista del Futuro** (22–25 ottobre 2026, biglietto gratuito).
CTA verso `https://professionista-del-futuro.up.railway.app/`.

```bash
npm run build:workshop   # -> out/workshop/
```

## La regola del formato

Un creativo da feed non è una pagina rimpicciolita: è **un concetto solo**, che
si legge in un secondo col pollice in movimento. Quindi:

- **nome del workshop** in alto, in una pillola sopra la foto,
- **foto** (le stesse immagini della sales, scaricate in `assets/sales/`),
- **hook grande**: massimo tre righe, una frase sola,
- **barra CTA a tutta larghezza** — *Clicca su Scopri di più / per iscriverti
  gratis*, con le frecce rivolte verso il basso, dove Meta mette il suo bottone —
  e una riga di servizio. Nient'altro.

Niente citazioni, elenchi, chip, prezzi o URL nell'immagine: quella roba sta
nella pagina, che è a un tap di distanza. Il richiamo alla sales passa dalla
materia — stesse foto, stesso cream, stesso verde `#00CC66`, stesso display
*Bricolage Grotesque* — non dalla copia del layout.

## Struttura

```
src/workshop/ads.json     testi e configurazione dei creativi
src/workshop/template.js  layout + temi + auto-fit dell'headline
src/workshop/render.js    rendering con Playwright/Chromium
assets/sales/             immagini prese dalla sales page
assets/fonts/             Bricolage Grotesque, Newsreader, IBM Plex Mono
out/workshop/             PNG generati
```

Per ogni creativo in `ads.json`:

| campo | cosa fa |
|---|---|
| `theme` | `cream` (default), `deep` (verde profondo, stacca di più nel feed), `blush` (per i pain in cui il danno è già in corso) |
| `photo` | file in `assets/sales/` |
| `focus` / `zoom` | punto focale e ingrandimento del crop |
| `photoH` | quanta tela occupa la foto, in % |
| `head` | righe dell'headline: stringa = inchiostro, `{"hi":"..."}` = riga nel gradiente colorato |

L'headline si auto-dimensiona: cresce finché entra nella tela, quindi non serve
contare i caratteri quando si aggiunge un pain.

## I creativi

Uno per pain, **un'immagine diversa per ciascuno**, tutte prese dalla sales e
scaricate in `assets/sales/`. Su molti c'è una riga di soluzione (`sub`) sotto
l'hook, in Newsreader: è la risposta al pain, quasi sempre una frase della
pagina. Non c'è su tutti — dove l'hook si chiude da solo, la riga in più è
rumore.

| File | Pain | Peso | Immagine |
|---|---|---|---|
| `p00-onda` | — offerta, nessun pain | — | 09-onda |
| `p01-direzione` | Non so da dove iniziare | 13/124 | 24-bivio |
| `p02-passo-ai` | Paura di non stare al passo con l'AI | 12/124 | 01-hero (crop sulle mani) |
| `p03-tempo` | Non ho tempo, mi sento sopraffatto | 12/124 | 16-interno |
| `p04-prezzo` | Non posso permettermi la formazione | 12/124 | 17-esterno |
| `p05-eta` | «È tardi per me» | 10/124 | 14-anima |
| `p06-diffidenza` | Chi siete, chi è lui | 10/124 | 41-coaching-online |
| `p07-orario` | Conflitto di orario con l'evento | 10/124 | 19-workshop |
| `p08-potenziale` | Il lavoro mi sta stretto | 9/124 | 13-artista |
| `p09-reddito` | Non guadagno abbastanza | 9/124 | 25-valedieci |
| `p10-non-applicato` | Ho comprato e non l'ho applicato | 9/124 | 22-scatole |
| `p11-esami` | Gli esami come muro | 7/124 | 06-gabbia |
| `p12-procrastinazione` | Blocco motivazionale | 5/124 | 08-dino |
| `p13-invisibilita` | «Non mi cerca nessuno» | 5/124 | 21-porta |
| `p14-coraggio` | Paura di cambiare | 4/124 | 26-sera1-onda |
| `p15-ai-lavoro` | L'AI mi sta già togliendo il lavoro | 3/124 | 15-gia-successo |
| `p16-percorso` | Il percorso non fa per me | 3/124 | 07-stampo |
| `p18-contenuti` | Troppi contenuti | 2/124 | 04-radici |
| `p19-se-non-applico` | «E se poi non lo applico?» | 2/124 | 10-elemento-umano |

`_contact-sheet.png` è il provino di tutti e 19 insieme.

### Due pain che non sono diventati creativi

- **17 · Salute propria o di un familiare** (3/124). Non è materiale da
  advertising: oltre al lato umano, Meta vieta gli annunci che lasciano
  intendere di conoscere la condizione di salute di chi legge.
- **Nessun altro.** Il 10 (`p10-non-applicato`) c'è, ma parla a chi ha già
  comprato: va tenuto sul retargeting della lista Metodo, non sul freddo.

### Immagini rimaste libere

`05-onda-prima`, `11-medico`, `35-andrea-giuseppe-androidi-4`,
`36-animatore-marlusa-2013` — disponibili per le varianti. Su `05-onda-prima`
attenzione: il crop verticale fa entrare la testata *millionaire* tagliata, che
su Meta è un problema doppio (marchio di terzi + promessa di ricchezza).

### Generare immagini nuove invece di usare quelle della sales

I creativi `p05`, `p08`, `p09` usano immagini generate apposta (Higgsfield,
`gpt_image_2_5`) invece delle foto della sales, e le cercano in `assets/gen/`.
I prompt stanno in `src/workshop/PROMPTS.md`.

Il modo più comodo per rigenerarle è l'API di Gemini, che restituisce i byte
dell'immagine dentro la risposta JSON:

```bash
GEMINI_API_KEY=... node src/workshop/gen-images.js   # -> assets/gen/
npm run build:workshop
```

Lo script sceglie da solo il modello immagine disponibile sulla chiave
(`GEMINI_IMAGE_MODEL` per forzarne uno); i prompt stanno lì dentro e sono
documentati in `src/workshop/PROMPTS.md`. La chiave va passata dall'ambiente e
non finisce mai nel repo.

**Nota sull'ambiente remoto**: le CDN di generazione immagini (per esempio
`d8j0ntlcm91z4.cloudfront.net` di Higgsfield) sono fuori dalla policy di rete, e
il download viene rifiutato con un 403. Per questo si passa da Gemini, che non
richiede di scaricare nulla. In alternativa i PNG si copiano a mano in
`assets/gen/` con i nomi `eta.png`, `potenziale.png`, `reddito.png`: finché
mancano, il renderer disegna un riquadro di attesa al posto della foto e segna
il creativo con `○` invece che `✔`.

Nota su `01-hero.jpg`: l'immagine intera contiene un nudo (l'Adamo di
Michelangelo). Il crop è stretto sulle due mani, che è anche il fotogramma più
forte — ma va tenuto stretto, o l'inserzione rischia il rifiuto.

## Gli altri pain, pronti da aggiungere

Dalla "Mappa dei pain" (estrazione Chattino del 14 settembre 2026, 124
conversazioni: 84 Arianna / lista AA, 40 Ambra / lista Metodo).

| # | Pain | Tot | AR | AM | Note per il copy |
|---|---|---|---|---|---|
| 1 | Non so da dove iniziare, manca una direzione | 13 | 10 | 3 | dispersione, non pigrizia |
| 2 | Paura di non stare al passo con l'AI | 12 | 10 | 2 | paura anticipata |
| 3 | Non ho tempo, mi sento sopraffatto | 12 | 5 | 7 | condizione strutturale, non scusa |
| 4 | Non posso permettermi la formazione | 12 | 9 | 3 | arriva spesso *prima* di sapere che è gratis → insistere sul gratuito |
| 5 | Età, "è tardi per me" | 10 | 5 | 5 | unico pain trasversale; oggi la comunicazione non gli parla |
| 6 | Diffidenza: chi siete, chi è lui | 10 | 7 | 3 | deficit di autorità sul freddo → creativo di brand, non di pain |
| 7 | Conflitto di orario con l'evento | 10 | 7 | 3 | basterebbe rispondere sulle registrazioni |
| 8 | Potenziale inespresso, il lavoro mi sta stretto | 9 | 7 | 2 | saturazione, non infelicità |
| 9 | Non guadagno abbastanza, precarietà economica | 9 | 7 | 2 | in alcuni casi emergenza vera |
| 10 | Ho comprato e non sono riuscito ad applicarlo | 9 | 2 | 7 | è vergogna: non usarlo a freddo |
| 11 | Gli esami come muro | 7 | 0 | 7 | solo lista Metodo (studenti) |
| 12 | Blocco motivazionale, procrastinazione | 5 | 4 | 1 | |
| 13 | Invisibilità, "non mi cerca nessuno" | 5 | 4 | 1 | il pain espresso con più sofferenza, solo P.IVA |
| 14 | Paura di cambiare, manca il coraggio | 4 | 4 | 0 | resistenza interiore |
| 15 | L'AI mi sta già togliendo il lavoro | 3 | 3 | 0 | danno già contabilizzato |
| 16 | Il percorso che ho scelto non fa per me | 3 | 1 | 2 | |
| 17 | Salute propria o di un familiare | 3 | 0 | 3 | **da non usare in copy** |
| 18 | Troppi contenuti, non riesco a starci dietro | 2 | 0 | 2 | |
| 19 | "E se poi non lo applico?" | 2 | 2 | 0 | sfiducia in sé, non nel prodotto |

Le due liste non condividono quasi nulla: su Arianna dominano i pain
professionali e identitari, su Ambra quelli di esecuzione. Un solo set di
creativi per entrambe parla ogni volta a metà del pubblico.
