"use client";

import Link from "next/link";

const sections = [
  {
    title: "1. Titolare del trattamento",
    content:
      "Il titolare del trattamento è Daniele Vassallo, UX/UI Designer con sede a Palermo. Per qualsiasi richiesta relativa ai tuoi dati puoi scrivere a daniele@example.com."
  },
  {
    title: "2. Dati raccolti",
    content:
      "Raccolgo esclusivamente i dati inseriti nei form del sito: nome, email e contenuto del messaggio nella pagina contatti; indirizzo email per l’iscrizione alla newsletter. Nessun dato viene ceduto a terze parti per finalità commerciali."
  },
  {
    title: "3. Finalità e base giuridica",
    content:
      "I dati del form contatti vengono utilizzati per rispondere alle tue richieste e proporre collaborazioni professionali (art. 6.1.b GDPR). I dati della newsletter sono trattati per inviarti aggiornamenti su progetti, articoli e contenuti professionali previa esplicita richiesta (art. 6.1.a GDPR)."
  },
  {
    title: "4. Modalità di trattamento",
    content:
      "I dati sono conservati in database sicuri (MongoDB Atlas) e in strumenti di comunicazione conformi alle normative europee. Implemento misure tecniche e organizzative per ridurre il rischio di accessi non autorizzati, cancellazione o divulgazione."
  },
  {
    title: "5. Diritti dell’interessato",
    content:
      "Puoi richiedere in qualsiasi momento l’accesso, la rettifica, la cancellazione o la portabilità dei tuoi dati, nonché limitare o opporti al trattamento inviando una mail a daniele@example.com. Le richieste vengono soddisfatte entro 30 giorni."
  },
  {
    title: "6. Conservazione",
    content:
      "I messaggi inviati dal form contatti vengono conservati per il tempo necessario a gestire la richiesta e al massimo per 24 mesi. I contatti newsletter vengono conservati finché rimane attiva l’iscrizione; puoi cancellarti in ogni momento."
  },
  {
    title: "7. Consenso e revoca",
    content:
      "Il consenso espresso nei form può essere revocato in qualsiasi momento tramite richiesta email o usando il link di disiscrizione presente in ogni newsletter. La revoca non pregiudica la liceità del trattamento effettuato prima della revoca stessa."
  }
];

export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl space-y-10">
      <header>
        <p className="text-sm uppercase tracking-[0.4em] text-primary-600 mb-3">Trasparenza</p>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
        <p className="text-lg text-gray-600">
          Questa informativa descrive come tratto i dati personali raccolti tramite il portfolio e in che modo puoi esercitare i tuoi diritti secondo il GDPR.
        </p>
      </header>

      <section className="space-y-8">
        {sections.map((section) => (
          <article key={section.title} className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm">
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">{section.title}</h2>
            <p className="text-gray-700 leading-relaxed">{section.content}</p>
          </article>
        ))}
      </section>

      <section className="bg-primary-50 border border-primary-100 rounded-3xl p-8 shadow-inner">
        <h2 className="text-2xl font-semibold text-primary-900 mb-3">Contatti per la privacy</h2>
        <p className="text-primary-800">
          Per dubbi o richieste relative ai tuoi dati personali scrivi a{" "}
          <Link href="mailto:daniele@example.com" className="font-semibold underline hover:text-primary-900">
            daniele@example.com
          </Link>
          . Risponderò entro 30 giorni.
        </p>
      </section>
    </div>
  );
}

