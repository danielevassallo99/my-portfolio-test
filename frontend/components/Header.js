export default function Header() {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="text-xl font-bold text-gray-900">
            Portfolio
          </div>
          <ul className="flex space-x-6">
            <li>
              <a href="/" className="text-gray-700 hover:text-gray-900 transition-colors">
                Home
              </a>
            </li>
            <li>
              <a href="/projects" className="text-gray-700 hover:text-gray-900 transition-colors">
                Progetti
              </a>
            </li>
            <li>
              <a href="/contact" className="text-gray-700 hover:text-gray-900 transition-colors">
                Contatti
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}

