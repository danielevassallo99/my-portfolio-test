'use client';

import Link from 'next/link';

const categoryStyles = {
  UX: 'bg-blue-50 text-blue-700',
  UI: 'bg-rose-50 text-rose-700',
  Branding: 'bg-emerald-50 text-emerald-700',
  'Web Design': 'bg-indigo-50 text-indigo-700',
  App: 'bg-amber-50 text-amber-700'
};

export default function ProjectCard({ project }) {
  const { _id, title, category, images, description } = project;
  const badgeClass = categoryStyles[category] || 'bg-gray-100 text-gray-700';

  return (
    <Link
      href={`/portfolio/${_id}`}
      className="group flex flex-col rounded-3xl border border-gray-100 bg-white shadow-sm overflow-hidden hover:shadow-xl transition-shadow duration-300"
    >
      <div className="relative overflow-hidden">
        {images && images.length > 0 ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={images[0]}
            alt={title}
            className="h-64 w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="h-64 w-full bg-gray-100 flex items-center justify-center text-gray-400 text-sm">
            Immagine non disponibile
          </div>
        )}
      </div>
      <div className="flex-1 p-6 flex flex-col">
        <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold mb-4 ${badgeClass}`}>
          {category || 'Progetto'}
        </span>
        <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors">
          {title}
        </h3>
        {description && <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">{description}</p>}
      </div>
    </Link>
  );
}

