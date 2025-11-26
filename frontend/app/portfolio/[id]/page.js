import Image from 'next/image';
import Link from 'next/link';

async function fetchProject(id) {
  try {
    const res = await fetch(`http://localhost:5000/api/projects/${id}`, {
      next: { revalidate: 60 }
    });

    if (!res.ok) {
      throw new Error('Failed to fetch project');
    }

    return await res.json();
  } catch (error) {
    console.error('Error fetching project:', error);
    return null;
  }
}

export default async function ProjectDetailPage({ params }) {
  const { id } = params;
  const project = await fetchProject(id);

  if (!project) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="bg-red-50 border border-red-200 text-red-600 rounded-3xl p-8 text-center">
          <p>Progetto non trovato o temporaneamente non disponibile.</p>
          <Link href="/portfolio" className="inline-block mt-4 text-primary-600 font-semibold">
            Torna al portfolio →
          </Link>
        </div>
      </div>
    );
  }

  const { title, category, description, images = [], process, results } = project;
  const heroImage = images[0];
  const galleryImages = images.slice(1);

  return (
    <div className="space-y-12 pb-16">
      <section className="relative bg-gray-900 text-white">
        {heroImage ? (
          <Image
            src={heroImage}
            alt={title}
            fill
            loading="lazy"
            className="object-cover opacity-40"
            sizes="100vw"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-primary-500 to-primary-700 opacity-40" />
        )}
        <div className="relative container mx-auto px-4 py-24">
          <span className="inline-flex px-4 py-1 rounded-full bg-white/20 text-sm font-semibold tracking-widest uppercase mb-4">
            {category || 'Case Study'}
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">{title}</h1>
          <p className="text-lg md:text-xl text-white/90 max-w-3xl">
            {description ||
              'Case study completo focalizzato su ricerca, strategia e interfacce ad alto impatto.'}
          </p>
        </div>
      </section>

      {galleryImages.length > 0 && (
        <section className="container mx-auto px-4">
          <div className="grid gap-4 md:grid-cols-2">
            {galleryImages.map((img, idx) => (
              <div key={idx} className="rounded-3xl overflow-hidden border border-gray-100 shadow-sm">
                <Image
                  src={img}
                  alt={`${title} immagine ${idx + 2}`}
                  width={1200}
                  height={768}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="container mx-auto px-4 grid lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white border border-gray-100 rounded-3xl p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Descrizione</h2>
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">
              {description ||
                'Progetto focalizzato sulla creazione di un’esperienza utente coerente, accessibile e orientata agli obiettivi di business, unendo ricerca, design di interfacce e prototipazione.'}
            </p>
          </div>

          <div className="bg-white border border-gray-100 rounded-3xl p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Processo di design</h2>
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">
              {process ||
                `Approccio human-centered basato su ricerca qualitativa/quantitativa, definizione dei requisiti,
wireframing, prototipazione ad alta fedeltà in Figma e test iterativi con gli utenti. Il design system garantisce coerenza visiva e scalabilità, con particolare attenzione ad accessibilità e performance.`}
            </p>
          </div>

          <div className="bg-white border border-gray-100 rounded-3xl p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Risultati</h2>
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">
              {results ||
                `Il redesign ha portato a un incremento dell'engagement del 30% nei test interni, riducendo attriti nei flussi critici.
Gli stakeholder hanno ottenuto una documentazione chiara e un'interfaccia pronta all'implementazione, con guideline scalabili e focus sull'accessibilità.`}
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-gray-50 border border-gray-100 rounded-3xl p-6 shadow-inner">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Dettagli progetto</h3>
            <ul className="space-y-3 text-gray-700">
              <li>
                <span className="font-semibold text-gray-900">Categoria:</span> {category || 'UX/UI Case Study'}
              </li>
              <li>
                <span className="font-semibold text-gray-900">Focus:</span> Ricerca utenti, Design System, Prototyping
              </li>
              <li>
                <span className="font-semibold text-gray-900">Strumenti:</span> Figma, Miro, Notion, Adobe CC
              </li>
            </ul>
          </div>

          <div className="bg-primary-50 rounded-3xl p-6 border border-primary-100">
            <h3 className="text-lg font-semibold text-primary-900 mb-3">Hai un progetto simile?</h3>
            <p className="text-primary-800 mb-4">
              Lavoriamo insieme per portare la tua esperienza digitale al livello successivo.
            </p>
            <Link
              href="/contatti"
              className="inline-flex items-center justify-center w-full px-4 py-3 rounded-2xl bg-primary-600 text-white font-semibold hover:bg-primary-700 transition-colors"
            >
              Contattami
            </Link>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4">
        <Link
          href="/portfolio"
          className="inline-flex items-center px-6 py-3 rounded-full border border-gray-300 text-gray-800 font-semibold hover:border-primary-300 hover:text-primary-600 transition-colors"
        >
          ← Indietro al Portfolio
        </Link>
      </section>
    </div>
  );
}

