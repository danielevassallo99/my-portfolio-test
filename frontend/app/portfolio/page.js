import ProjectCard from '../../components/ProjectCard';

async function fetchProjects() {
  try {
    const res = await fetch('http://localhost:5000/api/projects', {
      next: { revalidate: 60 }
    });

    if (!res.ok) {
      throw new Error('Failed to fetch projects');
    }

    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error('Error fetching projects:', error);
    return [];
  }
}

export default async function PortfolioPage() {
  const projects = await fetchProjects();

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-3xl mb-12">
        <p className="text-sm uppercase tracking-[0.4em] text-primary-600 mb-3">Case Study</p>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Portfolio</h1>
        <p className="text-lg text-gray-600">
          Una raccolta di progetti UX/UI realizzati tra consulenze e master. Ogni case study unisce ricerca,
          design system e prototipazione per trasformare obiettivi di business in esperienze digitali misurabili.
        </p>
      </div>

      {projects.length > 0 ? (
        <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project._id} project={project} />
          ))}
        </div>
      ) : (
        <div className="bg-gray-50 border border-dashed border-gray-200 rounded-3xl p-12 text-center">
          <p className="text-gray-600 text-lg">Nessun progetto disponibile al momento.</p>
        </div>
      )}
    </div>
  );
}

