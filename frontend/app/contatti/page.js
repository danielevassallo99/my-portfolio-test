'use client';

import Link from 'next/link';
import { useState } from 'react';

const initialForm = {
  nome: '',
  email: '',
  messaggio: '',
  privacy: false
};

export default function ContactPage() {
  const [formData, setFormData] = useState(initialForm);
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const resetWithDelay = () => {
    setTimeout(() => {
      setFormData(initialForm);
      setStatus({ type: '', message: '' });
    }, 3000);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus({ type: '', message: '' });

    const trimmedName = formData.nome.trim();
    const trimmedEmail = formData.email.trim();
    const trimmedMessage = formData.messaggio.trim();

    if (!trimmedName || !trimmedEmail || !trimmedMessage) {
      setStatus({ type: 'error', message: 'Tutti i campi sono obbligatori.' });
      return;
    }

    if (trimmedMessage.length < 10) {
      setStatus({ type: 'error', message: 'Il messaggio deve contenere almeno 10 caratteri.' });
      return;
    }

    if (!formData.privacy) {
      setStatus({ type: 'error', message: 'Devi accettare l’informativa sulla privacy.' });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      setStatus({ type: 'error', message: 'Formato email non valido.' });
      return;
    }

    try {
      setIsSubmitting(true);
      const res = await fetch('http://localhost:5000/api/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: trimmedName,
          email: trimmedEmail,
          message: trimmedMessage
        })
      });

      const payload = await res.json();

      if (!res.ok) {
        throw new Error(payload.error || 'Si è verificato un errore inatteso.');
      }

      setStatus({ type: 'success', message: '✅ Messaggio inviato! Ti risponderò presto.' });
      resetWithDelay();
    } catch (error) {
      setStatus({ type: 'error', message: `❌ Errore: ${error.message}` });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-16 max-w-3xl">
      <div className="mb-10">
        <p className="text-sm uppercase tracking-[0.4em] text-primary-600 mb-3">Restiamo in contatto</p>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Contatti</h1>
        <p className="text-lg text-gray-600">
          Raccontami il tuo progetto o le tue esigenze: ti risponderò entro 48 ore con idee, processo e
          prossimi passi per collaborare.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white border border-gray-100 rounded-3xl shadow-lg p-8 space-y-6"
        noValidate
      >
        <div>
          <label htmlFor="nome" className="block text-sm font-semibold text-gray-800 mb-2">
            Nome
          </label>
          <input
            id="nome"
            name="nome"
            type="text"
            value={formData.nome}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-200 focus:border-primary-400"
            placeholder="Il tuo nome"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-gray-800 mb-2">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-200 focus:border-primary-400"
            placeholder="nome@esempio.com"
          />
        </div>

        <div>
          <label htmlFor="messaggio" className="block text-sm font-semibold text-gray-800 mb-2">
            Messaggio
          </label>
          <textarea
            id="messaggio"
            name="messaggio"
            value={formData.messaggio}
            onChange={handleChange}
            required
            minLength={10}
            rows={6}
            className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-200 focus:border-primary-400 resize-none"
            placeholder="Descrivi brevemente cosa hai in mente..."
          />
        </div>

        <div className="flex items-start gap-3 text-sm text-gray-600">
          <input
            id="privacy"
            name="privacy"
            type="checkbox"
            checked={formData.privacy}
            onChange={handleChange}
            className="mt-1 size-5 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
          />
          <label htmlFor="privacy" className="leading-relaxed">
            Accetto il trattamento dei miei dati secondo la{' '}
            <Link href="/privacy" className="text-primary-600 font-semibold hover:text-primary-700">
              Privacy Policy
            </Link>
            .
          </label>
        </div>

        {status.message && (
          <div
            className={`rounded-2xl px-4 py-3 text-sm font-medium ${
              status.type === 'success'
                ? 'bg-green-50 text-green-700 border border-green-200'
                : 'bg-red-50 text-red-700 border border-red-200'
            }`}
          >
            {status.message}
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full inline-flex items-center justify-center px-6 py-3 rounded-2xl bg-primary-600 text-white font-semibold hover:bg-primary-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Invio in corso…' : 'Invia'}
        </button>
      </form>
    </div>
  );
}

