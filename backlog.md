# Backlog Portfolio

## ✅ COMPLETATO
Task 1: Setup Repository e Struttura Base
Descrizione: Inizializzare il progetto monorepo con frontend (Next.js) e backend (Express). Creare struttura cartelle, configurare package.json, .gitignore, README.md e variabili d'ambiente.
Cosa fare: Creare /frontend (Next.js), /backend (Node.js/Express), file .gitignore, README.md, .env.example con variabili (DB_URI, PORT, API_URL)
Criterio: npm install funziona in entrambe le cartelle senza errori
Dipendenze: Nessuna
Task 2: Setup Backend Express e Connessione MongoDB
Descrizione: Configurare server Express base con middleware (cors, express.json), connessione a MongoDB e gestione errori. Creare endpoint di health check.
Cosa fare: File backend/server.js, backend/config/db.js (connessione MongoDB), middleware, endpoint GET /api/health
Criterio: Server parte su porta configurata e connessione MongoDB riesce
Dipendenze: Task 1
Task 3: Schema Database MongoDB (Models)
Descrizione: Definire i modelli Mongoose per Progetto, Messaggio e IscrittoNewsletter secondo lo schema PRD. Includere validazioni base (required, unique per email).
Cosa fare: File backend/models/Project.js, backend/models/Message.js, backend/models/Newsletter.js con schema completi
Criterio: Modelli importabili senza errori, validazioni funzionanti
Dipendenze: Task 2
Task 4: API Endpoints Progetti (GET)
Descrizione: Implementare GET /api/projects (lista completa) e GET /api/projects/:id (singolo progetto). Gestire errori 404 e validazione ID.
Cosa fare: File backend/routes/projects.js, controller backend/controllers/projectController.js con logica GET
Criterio: Endpoint restituiscono JSON corretto, status 200 per successo, 404 se progetto non trovato
Dipendenze: Task 3
Task 5: API Endpoint Messaggi Contatto (POST)
Descrizione: Implementare POST /api/messages per salvare messaggi da form contatti. Validare campi obbligatori (nome, email valida, messaggio) e restituire conferma.
Cosa fare: File backend/routes/messages.js, controller con validazione input e salvataggio DB
Criterio: POST salva messaggio nel DB, risponde {"success": true}, valida email formato e campi required
Dipendenze: Task 3
Task 6: API Endpoint Newsletter (POST)
Descrizione: Implementare POST /api/newsletter per iscrizioni newsletter. Validare email (formato e unicità), gestire duplicati, preparare logica double opt-in base.
Cosa fare: File backend/routes/newsletter.js, controller che controlla email già esistente e salva nuova iscrizione
Criterio: POST salva email unica, errore se duplicata, risponde {"success": true} o messaggio errore
Dipendenze: Task 3
Task 7: API Endpoint Creazione Progetto (POST)
Descrizione: Implementare POST /api/projects per inserire nuovi progetti. Validare campi obbligatori (titolo, categoria, descrizione, immagini array).
Cosa fare: Aggiungere route POST in backend/routes/projects.js, controller con validazione e creazione progetto
Criterio: POST crea progetto nel DB, restituisce oggetto creato con _id
Dipendenze: Task 4
Task 8: Setup Frontend Next.js e Tailwind CSS
Descrizione: Inizializzare app Next.js con routing pages, configurare Tailwind CSS, creare layout base e file di configurazione globali (fonts, colors).
Cosa fare: Setup Next.js in /frontend, tailwind.config.js, globals.css, /pages/_app.js e /pages/_document.js
Criterio: npm run dev avvia Next.js, Tailwind funziona con classi di utility
Dipendenze: Task 1
Task 9: Componente Header con Navigazione
Descrizione: Creare header responsive con logo/nome Daniele, menu principale (Home, Portfolio, Chi Sono, Contatti, Newsletter). Su mobile hamburger menu.
Cosa fare: Componente frontend/components/Header.jsx con Link Next.js, stato menu mobile, styling Tailwind
Criterio: Header visibile su tutte le pagine, navigazione funzionante, responsive su mobile
Dipendenze: Task 8
Task 10: Componente Footer
Descrizione: Creare footer con link navigazione secondari, social icons (LinkedIn, Behance), email contatto e note copyright/privacy. Presente su tutte le pagine.
Cosa fare: Componente frontend/components/Footer.jsx, icone social, link esterni, styling coerente
Criterio: Footer appare su ogni pagina, link funzionanti, icone social cliccabili
Dipendenze: Task 8
Task 11: Pagina Home
Descrizione: Creare homepage con hero section (titolo + slogan Daniele), griglia 3 progetti in evidenza (fetch da API), breve bio/intro e CTA contatto. Box newsletter opzionale.
Cosa fare: File frontend/pages/index.jsx, fetch GET /api/projects (filtro featured), sezioni hero/progetti/bio/CTA, componenti riutilizzabili
Criterio: Home carica e mostra 3 progetti con immagini/titoli, hero visibile, layout responsive
Dipendenze: Task 4, Task 9, Task 10
Task 12: Pagina Chi Sono (About)
Descrizione: Pagina con bio completa di Daniele, foto professionale, elenco competenze (hard/soft skills), strumenti, esperienze lavorative e CTA contatto finale.
Cosa fare: File frontend/pages/about.jsx o chi-sono.jsx, sezioni testo + lista skills + esperienze, styling Tailwind
Criterio: Pagina accessibile da menu, contenuto leggibile, foto mostrata, skills organizzate visivamente
Dipendenze: Task 9, Task 10
Task 13: Pagina Portfolio con Griglia Progetti
Descrizione: Pagina con griglia responsiva di tutti i progetti (fetch API). Ogni card con thumbnail, titolo, categoria. Layout 2-3 colonne desktop, 1 colonna mobile.
Cosa fare: File frontend/pages/portfolio.jsx, fetch GET /api/projects, componente ProjectCard riutilizzabile, grid Tailwind responsive
Criterio: Griglia mostra tutti i progetti, card cliccabili (link a dettaglio), immagini caricate, responsive
Dipendenze: Task 4, Task 9, Task 10
Task 14: Pagina Dettaglio Progetto (Case Study)
Descrizione: Pagina dinamica per ogni progetto [id] con hero image, titolo, descrizione, sezioni processo design, immagini aggiuntive, risultati. Recupera dati da GET /api/projects/:id.
Cosa fare: File frontend/pages/portfolio/[id].jsx, fetch per singolo progetto, rendering contenuto esteso, galleria immagini
Criterio: Cliccando progetto da Portfolio/Home apre dettaglio, mostra tutte info, immagini, torna indietro funziona
Dipendenze: Task 4, Task 13
Task 15: Filtri e Ricerca nella Pagina Portfolio
Descrizione: Aggiungere filtri per categoria/tag (pulsanti) e barra di ricerca testuale nella pagina Portfolio. Filtraggio client-side dei progetti visualizzati.
Cosa fare: Aggiornare frontend/pages/portfolio.jsx con stato filtri, input ricerca, logica filtraggio array progetti, UI pulsanti filtro
Criterio: Cliccando filtro mostra solo progetti categoria selezionata, ricerca filtra per keywords, reset "Tutti" funziona
Dipendenze: Task 13
Task 16: Pagina Contatti con Form
Descrizione: Pagina con form contatto (campi nome, email, messaggio, checkbox privacy GDPR). POST a /api/messages, feedback successo/errore. Mostrare anche email e telefono diretti.
Cosa fare: File frontend/pages/contatti.jsx o contact.jsx, form con validazione client, submit POST, messaggi conferma/errore, link social
Criterio: Form invia dati, salva messaggio in DB, mostra "Grazie" su successo, errori validati
Dipendenze: Task 5, Task 9, Task 10
Task 17: Componente/Pagina Newsletter
Descrizione: Form iscrizione newsletter (solo campo email + pulsante). POST a /api/newsletter, validazione email, messaggio conferma iscrizione. Integrabile come componente in Home/Footer.
Cosa fare: File frontend/components/NewsletterForm.jsx e/o pagina frontend/pages/newsletter.jsx, submit POST, feedback utente
Criterio: Form invia email a API, salva in DB, mostra conferma, gestisce duplicati con messaggio
Dipendenze: Task 6, Task 9, Task 10
Task 18: Ottimizzazioni Responsive e Performance
Descrizione: Verificare responsive design su tutti i breakpoint (mobile/tablet/desktop), ottimizzare immagini (format WebP, lazy loading), minify CSS/JS, migliorare performance Lighthouse.
Cosa fare: Testare tutte le pagine su device diversi, aggiungere next/image per ottimizzazione, lazy load, compressione asset
Criterio: Sito utilizzabile su mobile senza scroll orizzontale, Lighthouse score >90 performance/accessibility, immagini caricate veloci
Dipendenze: Task 11, Task 12, Task 13, Task 14, Task 16, Task 17

## 📝 DA FARE
Task 19: Deploy e Configurazione HTTPS
Descrizione: Deploy frontend su Vercel e backend su Railway. Configurare variabili d'ambiente produzione, HTTPS automatico, collegare frontend a backend API, testare funzionamento live.
Cosa fare: Setup account Vercel/Railway, push repo, configurare env vars (DB_URI prod, CORS origins), verificare HTTPS
Criterio: Sito accessibile pubblicamente via HTTPS, API chiamate da frontend funzionano, no errori CORS
Dipendenze: Task 2, Task 18
Task 20: Popolamento Database Iniziale e Testing Completo
Descrizione: Inserire 3-5 progetti reali di Daniele nel database con tutti i campi (immagini, contenuto, tags). Testare tutti i flussi utente end-to-end, validare conformità GDPR (privacy policy, consensi).
Cosa fare: Script seed o inserimento manuale progetti, creare pagina Privacy Policy, testing completo (form, filtri, navigazione), validazione UX
Criterio: Portfolio mostra progetti reali completi, tutti i form funzionano, link Privacy Policy presente, nessun bug critico
Dipendenze: Task 7, Task 19

## 🔧 IN PROGRESS
(nessuno per ora)