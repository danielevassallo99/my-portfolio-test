import Link from 'next/link';
import NewsletterForm from './NewsletterForm';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/portfolio', label: 'Portfolio' },
    { href: '/chi-sono', label: 'Chi Sono' },
    { href: '/contatti', label: 'Contatti' },
    { href: '/newsletter', label: 'Newsletter' },
  ];

  const socialLinks = [
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/danielevassallo',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
    },
    {
      name: 'Behance',
      url: 'https://www.behance.net/danielevassallo',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M6.947 4.084c2.871 0 4.813 1.224 4.813 3.721a3.124 3.124 0 0 1-1.778 2.932c1.684.486 2.58 1.842 2.58 3.56 0 2.574-1.942 4.703-5.535 4.703H0V4.084zm-.235 5.697c1.135 0 1.734-.583 1.734-1.403 0-.802-.558-1.39-1.734-1.39H2.761v2.793zm.361 5.423c1.573 0 2.344-.813 2.344-1.94 0-1.064-.771-1.673-2.344-1.673h-2.33v3.613zm12.663-6.953c2.901 0 4.632 1.915 4.971 4.64.077.61.09 1.092.064 1.646h-7.699c.072 1.11.747 2.12 2.07 2.12.9 0 1.579-.4 1.766-1.078h3.305c-.297 2.036-2.221 3.291-4.972 3.291-3.318 0-5.708-2.287-5.708-5.8 0-3.561 2.39-5.819 6.203-5.819zm1.724 4.433c-.15-1.046-.888-1.66-1.924-1.66-1.103 0-1.852.67-2.03 1.66zM21.62 5.122h-5.976v1.527h5.976z" />
        </svg>
      ),
    },
  ];

  return (
    <footer className="bg-gray-900 text-white mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Navigazione */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Navigazione</h3>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contatti */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contatti</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="mailto:daniele@example.com"
                  className="text-gray-400 hover:text-white transition-colors flex items-center"
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  daniele@example.com
                </a>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-4">Seguimi</h3>
              <div className="flex space-x-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-colors"
                    aria-label={social.name}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
            <NewsletterForm />
          </div>
        </div>

        {/* Copyright e Privacy */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              &copy; {currentYear} Daniele Vassallo. Tutti i diritti riservati.
            </p>
            <div className="flex space-x-6 text-sm">
              <Link
                href="/privacy"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/cookie"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

