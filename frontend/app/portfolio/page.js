'use client';

import { useEffect, useMemo, useState } from 'react';
import ProjectCard from '../../components/ProjectCard';

const categories = ['Tutti', 'UX', 'UI', 'Branding', 'Web Design', 'App'];

export default function PortfolioPage() {
  const [projects, setProjects] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('Tutti');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchProjects() {
      try {
        setIsLoading(true);
        const res = await fetch('http://localhost:5000/api/projects');
        if (!res.ok) {
          throw new Error('Impossibile caricare i progetti');
        }
        const data = await res.json();
        setProjects(Array.isArray(data) ? data : []);
        setError('');
      } catch (err) {
        console.error('Error fetching projects:', err);
        setError('Non riesco a recuperare i progetti in questo momento.');
      } finally {
        setIsLoading(false);
      }
    }

    fetchProjects();
  }, []);

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesCategory =
        selectedCategory === 'Tutti' || project.category === selectedCategory;

      const keyword = searchTerm.trim().toLowerCase();
      const matchesSearch =
        keyword.length === 0 ||
        project.title?.toLowerCase().includes(keyword) ||
        project.description?.toLowerCase().includes(keyword);

      return matchesCategory && matchesSearch;
    });
  }, [projects, selectedCategory, searchTerm]);

  const handleReset = () => {
    setSelectedCategory('Tutti');
    setSearchTerm('');
  };

  return (
    <div className="container mx-auto px-4 py-16 space-y-12">
      <div className="max-w-3xl">
        <p className="text-sm uppercase tracking-[0.4em] text-primary-600 mb-3">Case Study</p>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Portfolio</h1>
            <p className="text-lg text-gray-600">
              Una raccolta di progetti UX/UI realizzati tra consulenze e master. Filtra per categoria o cerca
              parole chiave per scoprire il case study che ti interessa.
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-6">
        <div className="flex flex-wrap gap-3">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-colors ${
                selectedCategory === category
                  ? 'bg-primary-600 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
          <button
            onClick={handleReset}
            className="px-5 py-2 rounded-full text-sm font-semibold border border-gray-300 text-gray-700 hover:border-primary-300 hover:text-primary-600 transition-colors"
          >
            Reset
          </button>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <div className="flex-1 w-full">
            <label htmlFor="portfolio-search" className="sr-only">
              Cerca progetti
            </label>
            <input
              id="portfolio-search"
              type="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Cerca per titolo o descrizione..."
              className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-200 focus:border-primary-400"
            />
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="bg-gray-50 border border-gray-100 rounded-3xl p-12 text-center text-gray-600">
          Sto caricando i progetti...
        </div>
      ) : error ? (
        <div className="bg-red-50 border border-red-200 rounded-3xl p-12 text-center text-red-600">
          {error}
        </div>
      ) : filteredProjects.length > 0 ? (
        <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
          {filteredProjects.map((project) => (
            <ProjectCard key={project._id} project={project} />
          ))}
        </div>
      ) : (
        <div className="bg-gray-50 border border-dashed border-gray-200 rounded-3xl p-12 text-center">
          <p className="text-gray-600 text-lg">
            Nessun progetto corrisponde ai filtri impostati. Prova a cambiare categoria o parole chiave.
          </p>
        </div>
      )}
    </div>
  );
}

