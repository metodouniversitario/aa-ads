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

- **foto in alto** (le stesse immagini della sales, scaricate in `assets/sales/`),
- **hook grande**: massimo tre righe, una frase sola,
- **bottone verde** e una riga di servizio. Nient'altro.

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

## Set di test (3 creativi)

| File | Pain | Perché |
|---|---|---|
| `p01-direzione-4x5.png` | Non so da dove iniziare, manca una direzione | 13/124, il più frequente |
| `p02-passo-ai-4x5.png` | Paura di non stare al passo con l'AI | 12/124, il pain che il tema della campagna intercetta meglio |
| `p15-ai-lavoro-4x5.png` | L'AI mi sta già togliendo il lavoro | 3/124, ma il più intenso e il più vicino all'acquisto |

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
