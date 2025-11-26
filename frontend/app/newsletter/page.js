"use client";

import NewsletterForm from "../../components/NewsletterForm";

export default function NewsletterPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-3xl">
      <div className="mb-10">
        <p className="text-sm uppercase tracking-[0.4em] text-primary-600 mb-3">Newsletter</p>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Iscriviti agli aggiornamenti</h1>
        <p className="text-lg text-gray-600">
          Insight su UX, processi e case study direttamente nella tua inbox. Nessun rumore —
          solo contenuti curati e pratici.
        </p>
      </div>
      <div className="bg-white border border-gray-100 rounded-3xl p-8 shadow-lg">
        <NewsletterForm />
      </div>
    </div>
  );
}

