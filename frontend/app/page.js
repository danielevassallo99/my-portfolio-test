import Link from 'next/link';

async function fetchFeaturedProjects() {
  try {
    const res = await fetch('http://localhost:5000/api/projects', {
      next: { revalidate: 60 }
    });

    if (!res.ok) {
      throw new Error('Failed to fetch projects');
    }

    const data = await res.json();
    const featuredProjects = Array.isArray(data)
      ? data.filter((project) => project.featured).slice(0, 3)
      : [];

    return featuredProjects;
  } catch (error) {
    console.error('Error fetching projects:', error);
    return [];
  }
}

const profileText = `Daniele Vassallo possiede un ampio ventaglio di competenze nell’ambito del design di esperienze utente: dalla user research alla prototipazione, dal design system all’accessibilità. Precisione, creatività e pensiero critico guidano ogni progetto, unendo rigore metodologico e visione umana. Collabora come UX/UI Designer consultant presso Algios, dove progetta interfacce scalabili e user-centered per clienti in settori turistici, fintech, healthcare e pubblica amministrazione.`;

export default async function Home() {
  const projects = await fetchFeaturedProjects();

  return (
    <div className="space-y-16 pb-16">
      <section className="bg-gradient-to-br from-primary-50 to-white">
        <div className="container mx-auto px-4 py-16 lg:py-24 grid lg:grid-cols-2 gap-12">
          <div>
            <p className="text-sm uppercase tracking-[0.4em] text-primary-600 mb-3">
              UX/UI Designer
            </p>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Ciao, sono Daniele Vassallo
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              UX/UI Designer con base a Palermo, specializzato nel creare esperienze digitali accessibili,
              scalabili e centrate sulle persone.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/portfolio"
                className="inline-flex items-center px-6 py-3 rounded-full bg-primary-600 text-white font-semibold hover:bg-primary-700 transition-colors"
              >
                Guarda il mio portfolio completo
              </Link>
              <Link
                href="/contatti"
                className="inline-flex items-center px-6 py-3 rounded-full border border-gray-300 text-gray-800 font-semibold hover:border-primary-300 hover:text-primary-600 transition-colors"
              >
                Contattami
              </Link>
            </div>
          </div>
          <div className="bg-white border border-gray-100 rounded-3xl shadow-lg p-8">
            <h2 className="text-xl font-semibold mb-4 text-gray-900">Chi sono</h2>
            <p className="text-gray-600 leading-relaxed">{profileText}</p>
            <div className="mt-6 grid gap-4 text-sm text-gray-700">
              <div>
                <p className="font-semibold text-gray-900">Focus</p>
                <p>Design system · Accessibility · User Research · Prototyping</p>
              </div>
              <div>
                <p className="font-semibold text-gray-900">Strumenti</p>
                <p>Figma · Miro · Notion · Adobe CC · VS Code · ChatGPT</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-10">
          <div>
            <p className="text-sm uppercase tracking-[0.4em] text-primary-600">In evidenza</p>
            <h2 className="text-3xl font-bold text-gray-900">Progetti selezionati</h2>
          </div>
          <Link href="/portfolio" className="text-primary-600 font-semibold hover:text-primary-700">
            Vedi tutti →
          </Link>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.length > 0 ? (
            projects.map((project) => (
              <Link
                key={project._id}
                href={`/portfolio/${project._id}`}
                className="group bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden hover:shadow-lg transition-shadow flex flex-col"
              >
                <div className="aspect-video bg-gray-100 overflow-hidden">
                  {project.images && project.images.length > 0 ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={project.images[0]}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
                      Immagine non disponibile
                    </div>
                  )}
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <span className="text-sm uppercase tracking-widest text-primary-500 mb-2">
                    {project.category}
                  </span>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors line-clamp">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed max-h-16 overflow-hidden">
                    {project.description}
                  </p>
                </div>
              </Link>
            ))
          ) : (
            <div className="col-span-full bg-gray-50 border border-dashed border-gray-200 rounded-2xl p-8 text-center">
              <p className="text-gray-600">Nessun progetto in evidenza disponibile al momento.</p>
            </div>
          )}
        </div>
      </section>

      <section className="container mx-auto px-4 grid lg:grid-cols-2 gap-10">
        <div className="bg-white border border-gray-100 rounded-3xl p-8 shadow-lg">
          <p className="text-sm uppercase tracking-[0.4em] text-primary-600 mb-2">Bio</p>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Design con metodo e cuore</h2>
          <p className="text-gray-600 leading-relaxed">
            Precisione, documentazione rigorosa e creatività guidano ogni progetto. Con un approccio human-centered,
            trasformo insight di ricerca in interfacce pulite, inclusive e ad alto impatto. Dal concept alla prototipazione,
            accompagno team e stakeholder con una comunicazione chiara e orientata ai risultati.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            {['User Research', 'Design System', 'Accessibility', 'Prototyping', 'Agile Collaboration'].map((pill) => (
              <span
                key={pill}
                className="px-4 py-2 rounded-full bg-primary-50 text-primary-700 text-sm font-medium"
              >
                {pill}
              </span>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-br from-secondary-50 to-white border border-secondary-100 rounded-3xl p-8 shadow-lg">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Newsletter</h2>
          <p className="text-gray-600 mb-6">
            Insight su UX, processi e case study direttamente nella tua inbox. Nessun rumore, solo contenuti curati e pratici.
          </p>
          <form className="space-y-4">
            <div>
              <label htmlFor="newsletter-email" className="sr-only">
                Email
              </label>
              <input
                type="email"
                id="newsletter-email"
                placeholder="Inserisci la tua email"
                className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-secondary-200 focus:border-secondary-400"
              />
            </div>
            <button
              type="submit"
              className="w-full inline-flex items-center justify-center px-6 py-3 rounded-2xl bg-secondary-600 text-white font-semibold hover:bg-secondary-700 transition-colors"
            >
              Iscriviti alla newsletter
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}



