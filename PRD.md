PRD – Sito Portfolio di Daniele Vassallo (UX/UI Designer)
1. OVERVIEW

Il sito sarà un portfolio professionale per Daniele Vassallo (UX/UI Designer), finalizzato a presentare i suoi migliori progetti come casi di studio completi. Scopo principale è mostrare chi è Daniele, cosa fa e come lavora, attraverso una vetrina online organizzata in sezioni chiare. In home si avrà un hero introduttivo (es. “Ciao, sono Daniele Vassallo, UX/UI Designer”), seguito da una selezione di progetti in evidenza e un breve estratto biografico o call-to-action. L’intero sito adotterà uno stile minimalista, moderno e mobile-first: il design punterà alla chiarezza visiva, alla leggibilità e a mettere in risalto i progetti. In linea con il profilo personale di Daniele, il tono comunicativo sarà autorevole ma accessibile ed empatico. La struttura prevede pagine dedicate (Home, Portfolio, Dettaglio Progetto, Chi Sono, Contatti, Newsletter), con navigazione semplice e utenti guidati velocemente alle informazioni chiave. In sintesi, si punta a un sito che rifletta le competenze UX di Daniele: bello, intuitivo e professionale.

2. OBIETTIVI

Gli obiettivi del sito sono:

Mostrare i progetti di Daniele come case study completi, sottolineando contesto, processo di design, ruolo di Daniele e risultati raggiunti. Si preferiranno pochi progetti approfonditi (circa 3-5), di qualità superiore.

Valorizzare il profilo professionale di Daniele (bio, competenze, esperienze, valori) per consolidare la sua autorevolezza e distintività nel mercato. La sezione “Chi Sono” racconterà la sua formazione, soft e hard skill (es. user research, UI design, tool come Figma) in modo autentico.

Facilitare i contatti: il sito permetterà a potenziali clienti, recruiter o datori di lavoro di mettersi in contatto facilmente. Ci sarà un form di contatto (campi nome, email, messaggio) che invia una mail a Daniele. In aggiunta, saranno mostrati l’indirizzo email cliccabile e un eventuale numero di telefono professionale. Inoltre, saranno presenti link visibili ai suoi profili social professionali (es. LinkedIn, Behance) per approfondire il suo network.

Costruire e mantenere relazioni con la community attraverso una newsletter: gli utenti potranno iscriversi (campo email + pulsante) per ricevere aggiornamenti periodici sui nuovi progetti o articoli di Daniele.

Posizionare Daniele come designer affidabile e user-oriented: il portfolio deve trasmettere fiducia, chiarezza nei risultati e attenzione all’utente finale. L’obiettivo è bilanciare completezza delle informazioni e sintesi, evitando ridondanze.

3. TARGET USER

Gli utenti target principali sono:

Recruiter e datori di lavoro (in ambito digitale, UX/UI), interessati a valutare competenze e processi di design di Daniele.

Agenzie di design o studi UX/UI, che cercano professionisti capaci di svolgere progetti complessi e vogliono vedere case study ben strutturati.

Aziende/Clienti potenziali (start-up, PMI, istituzioni) che potrebbero richiedere servizi di UX/UI; vogliono esaminare l’esperienza di Daniele attraverso progetti concreti.

Designer e colleghi del settore, incluso il team Algios e mentor accademici: il portfolio serve anche a networking e collaborazioni professionali.

Studenti o aspiranti designer: pubblico secondario interessato a trarre ispirazione dalle case study e dall’approccio di Daniele.

In generale, il sito sarà orientato a chi cerca chiarezza, efficienza e una testimonianza di risultati reali, sia dal punto di vista dei recruiter (che apprezzano processi ben spiegati) sia degli utenti generici che vogliono informazioni facili da trovare.

4. ARCHITETTURA TECNICA

Frontend: Realizzato in Next.js (React) per la parte client/server-rendered, con styling tramite Tailwind CSS (o simili) per garantire design reattivo e componenti riutilizzabili.

Backend/API: Servizio Node.js con framework Express per gestire gli endpoint RESTful. Espone dati da recuperare/modificare (progetti, messaggi, iscrizioni newsletter).

Database: MongoDB (NoSQL) per memorizzare progetti, messaggi di contatto e iscritti alla newsletter. Le collezioni rifletteranno gli schemi dati definiti di seguito.

Hosting/Deployment: Frontend distribuito su piattaforma serverless come Vercel (o Netlify); backend su Railway (o Heroku). Entrambi su HTTPS per sicurezza.

Il sistema non utilizza un CMS tradizionale: i contenuti vengono gestiti direttamente tramite il database o file di configurazione (JSON/YAML).

5. SCHEMA DATABASE

Definiamo le entità principali e i loro campi chiave:

Progetto: {

_id (ObjectId),

titolo (string),

categoria (string),

descrizione (string breve),

immagini (array di URL o percorsi immagini),

createdAt (timestamp),

opzionali: tags (array di stringhe), contenuto (descrizione estesa del case study), external_link (es. link a prodotto finale)
}.

Messaggio (Contatto): {

_id,

nome (string),

email (string),

messaggio (string),

createdAt (timestamp)
} – cattura i messaggi inviati dal form di contatto.

IscrittoNewsletter: {

_id,

email (string),

createdAt (timestamp di iscrizione)
} – elenca gli utenti che hanno sottoscritto la newsletter (solo email e data).

Nota: Tutte le informazioni variabili (nuovi progetti, iscrizioni, messaggi) possono essere inserite manualmente nel database o gestite tramite file JSON. Non è necessario un CMS esterno: fornendo gli schemi dati si può inserire direttamente un nuovo record per aggiungere contenuti. Si dovranno comunque prevedere misure di sicurezza e conformità GDPR (HTTPS, double opt-in per newsletter, form di consenso, ecc.).

6. API ENDPOINTS

Di seguito alcuni endpoint RESTful principali del backend (tutti sotto /api):

GET /api/projects – Recupera la lista di tutti i progetti. Descrizione: Restituisce un array di oggetti Progetto. Output JSON (esempio):

[
  {
    "_id": "abc123",
    "titolo": "Progetto HealthApp",
    "categoria": "App Mobile",
    "descrizione": "App per la salute preventiva...",
    "immagini": ["url1.jpg", "url2.jpg"],
    "createdAt": "2025-11-01T12:00:00Z"
  },
  { ... }
]


(I campi riflettono lo schema dati sopra.)

GET /api/projects/:id – Recupera i dettagli di un singolo progetto. Descrizione: Riceve l’_id del progetto nella route e restituisce l’oggetto Progetto completo (con eventuali campi estesi, es. contenuto, tags). Output JSON (esempio):

{
  "_id": "abc123",
  "titolo": "Progetto HealthApp",
  "categoria": "App Mobile",
  "descrizione": "App per la salute preventiva...",
  "immagini": ["url1.jpg","url2.jpg"],
  "createdAt": "2025-11-01T12:00:00Z",
  "contenuto": "Dettagli del progetto, risultati, metriche, ecc.",
  "tags": ["Salute", "Mobile"]
}


POST /api/projects – Crea un nuovo progetto. Descrizione: Accetta in input JSON i campi essenziali del progetto. Input JSON (esempio):

{
  "titolo": "Nuovo Progetto",
  "categoria": "Fintech",
  "descrizione": "Breve descrizione...",
  "immagini": ["url3.jpg","url4.jpg"]
}


Dopo la validazione, salva il record nel DB e restituisce conferma (es. {"success": true, "id": "newId"}) o l’oggetto creato.

POST /api/messages – Invia un messaggio di contatto. Descrizione: Riceve i dati del form contatti (nome, email, messaggio) in input JSON. Input JSON (esempio):

{
  "nome": "Mario Rossi",
  "email": "mario@example.com",
  "messaggio": "Ciao Daniele, mi piacerebbe discutere di una collaborazione."
}


L’endpoint inserisce il messaggio nella collezione Messaggi e restituisce un JSON di conferma:

{ "success": true }


POST /api/newsletter – Iscrive un’email alla newsletter. Descrizione: Riceve l’email dell’utente in input JSON. Input JSON (esempio):

{ "email": "lisa@example.com" }


L’endpoint aggiunge l’email alla collezione IscrittiNewsletter e restituisce {"success": true}. In caso di email già presente o form non valido, ritorna errore.

(Eventuali altri endpoint opzionali: GET /api/messages per consultare i messaggi ricevuti, PATCH/PUT/DELETE /api/projects/:id per gestire progetti – dipende da requisiti interni, anche se i dati sono gestiti manualmente.)

7. PAGINE E COMPONENTI

Home: Hero iniziale con presentazione di Daniele (titolo e breve slogan), preferibilmente con foto o visual coerente. Sotto, una mini-vetrina dei progetti: una griglia ridotta con 3 progetti in evidenza (thumbnail + titolo + categoria), ciascuno cliccabile per andare alla pagina dettaglio. Al termine della home può esserci un breve paragrafo bio/intro e un’ultima call-to-action (es. “Hai un progetto in mente? Contattami”). È consigliato inserire anche un riquadro per l’iscrizione newsletter (campo email + pulsante) o un banner finale di contatto.

Portfolio: Pagina principale con l’elenco di tutti i progetti. Mostra progetti in un layout a griglia responsiva (2-3 colonne desktop, 1 su mobile). Ogni card contiene immagine di copertina di alta qualità, titolo, e, se serve, una breve descrizione. In cima alla pagina ci saranno filtri per categoria/tag (pulsanti orizzontali tipo “Tutti”, “App”, “Web”, ecc.) per filtrare i progetti; cliccando un filtro la griglia si aggiorna mostra solo i progetti corrispondenti. Opzionalmente può esserci anche una barra di ricerca testuale per parole chiave. L’utente deve poter scorrere facilmente i progetti e scegliere quale approfondire.

Dettaglio Progetto: Pagina dedicata a ciascun progetto (case study completo). Conterrà almeno: titolo del progetto e immagine hero grande (es. mockup del prodotto); un’introduzione con descrizione breve, ruolo di Daniele, contesto (es. cliente, durata, strumenti usati); una sezione di immagini aggiuntive (wireframe, screenshot) o media; testo che illustra il processo di design (ricerche svolte, iterazioni, outcome) e i risultati concreti. Tutto organizzato in sezioni chiare: obiettivi, sfide, soluzioni. È la pagina dove documentare il valore concreto del lavoro di Daniele.

Chi Sono (About): Pagina con la bio personale e professionale. Includerà una descrizione di Daniele (percorso formativo, filosofia di design, punti di forza come rigore analitico e creatività); elenco delle competenze tecniche (hard skills: UX research, UI design, prototipazione, ecc.) e soft skills; strumenti conosciuti (Figma, Adobe, CMS, ecc.). Eventualmente una foto professionale. Lo scopo è dare un volto umano al portfolio e comunicare i valori e l’unicità di Daniele.

Contatti: Pagina con il modulo di contatto e i riferimenti. Il form raccoglierà i campi Nome, Email, Messaggio. Sotto il form verranno visualizzati l’indirizzo email di Daniele (cliccabile) e un eventuale numero di telefono professionale. Questa ridondanza (form + contatti diretti) migliora l’accessibilità. Nella pagina contatti si possono inserire brevi CTA cordiali (es. “Interessato a collaborare? Scrivimi!”). In questa sezione e nel footer saranno presenti anche link ai profili social (LinkedIn, Behance, ecc.).

Newsletter: Pagina dedicata (o sezione) con un singolo campo email e pulsante per iscriversi alla newsletter. Qui l’utente lascia la propria email per ricevere aggiornamenti. Il form includerà validazione del formato email e messaggi di conferma/errore (es. “Grazie per esserti iscritto!”). Il design sarà molto semplice (un campo e un bottone). Possono essere ripetuti elementi (es. box di iscrizione) anche in home o nel footer per migliorare la visibilità.

Footer: Area presente in fondo a tutte le pagine. Contiene un menu di navigazione secondario (link a Home, Portfolio, Chi Sono, Contatti, Newsletter), collegamenti social (icona LinkedIn, Behance, ecc.) e i dati di contatto principali (email). Riporta anche note legali (copyright, link a Privacy Policy/ Cookie). Il footer garantisce accesso rapido a info essenziali da ogni pagina.

8. FASI DI SVILUPPO

MVP (Minimo): Realizzare le funzionalità core. Include la creazione del database iniziale con i progetti da mostrare. Pagine front-end: Home (hero con introduzione, 2-3 progetti in evidenza, breve bio o CTA) e Chi Sono (bio e competenze), Portfolio (griglia base dei progetti), Contatti (form con campi nome/email/messaggio). Back-end/API di base per recuperare progetti e ricevere messaggi. Nessun filtro o ricerca al momento, nessuna newsletter. I dati saranno inseriti manualmente in DB (o file JSON) senza CMS.

Versione 1.0: Aggiungere funzionalità avanzate.

Filtri e ricerca: sulla pagina Portfolio implementare filtri per categoria/tag e/o una barra di ricerca.

Pagina Dettaglio Progetto: rendere disponibile la pagina di approfondimento per ogni progetto.

Newsletter: integrare il form (pagina Newsletter) con endpoint API dedicato e gestire opt-in doppio.

Migliorie UX: rendere il sito responsive, ottimizzare le performance (immagini compresse, codice snello) e curare i dettagli di design (hover, transizioni).

Infrastruttura: configurare l’infrastruttura di deployment (Vercel/Railway) e le eventuali chiavi di API (es. Google Analytics).

Future Features:

Dark/Light Mode: implementare uno switch per cambiare tema colore del sito (supporto a preferenze utente).

Versione in inglese: tradurre i contenuti principali del sito in una seconda lingua (pubblicare come /en path).

Blog/Testimonianze (opzionale): se Daniele lo desidera, aggiungere sezioni extra come un blog personale o una pagina di testimonianze/clienti, per aumentare l’autorevolezza.

CMS headless (opzionale): valutare in futuro l’uso di un CMS headless per semplificare l’aggiornamento dei contenuti, anche se inizialmente non è necessario.

Altri migliorie: integrazione di analytics (GA4), PWA (per uso offline), o funzionalità demo extra (video embedding, download CV).

Tutte le fasi saranno eseguite tenendo conto dell’usabilità e della privacy: il sito userà HTTPS e fornirà meccanismi di consenso per GDPR (es. double opt-in newsletter, cancellazione iscrizione).

Fonti: Le specifiche e i requisiti sopra riportati si basano sulle linee guida fornite da Daniele Vassallo nel documento “Linee guida portfolio” e sui dati del profilo professionale, opportunamente adattati per uso del team di sviluppo.