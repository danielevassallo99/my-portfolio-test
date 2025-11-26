'use client';

import { useState } from 'react';

export default function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus({ type: '', message: '' });

    const trimmedEmail = email.trim();
    if (!trimmedEmail) {
      setStatus({ type: 'error', message: 'Inserisci un indirizzo email.' });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      setStatus({ type: 'error', message: 'Formato email non valido.' });
      return;
    }

    try {
      setIsSubmitting(true);
      const res = await fetch('http://localhost:5000/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: trimmedEmail })
      });

      const payload = await res.json();

      if (!res.ok) {
        if (payload.message && payload.message.toLowerCase().includes('già iscritta')) {
          setStatus({ type: 'warning', message: '⚠️ Email già iscritta' });
        } else {
          throw new Error(payload.message || 'Errore sconosciuto');
        }
      } else {
        setStatus({ type: 'success', message: '✅ Grazie! Iscritto alla newsletter' });
        setEmail('');
      }
    } catch (error) {
      setStatus({ type: 'error', message: `❌ Errore: ${error.message}` });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="flex flex-col sm:flex-row gap-3">
        <label htmlFor="newsletter-email" className="sr-only">
          Email
        </label>
        <input
          id="newsletter-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="Inserisci la tua email"
          className="flex-1 px-4 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-secondary-200 focus:border-secondary-400"
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center justify-center px-6 py-3 rounded-2xl bg-secondary-600 text-white font-semibold hover:bg-secondary-700 transition-colors disabled:opacity-70"
        >
          {isSubmitting ? 'Invio…' : 'Iscriviti alla newsletter'}
        </button>
      </div>

      {status.message && (
        <div
          className={`rounded-2xl px-4 py-3 text-sm font-medium ${
            status.type === 'success'
              ? 'bg-green-50 text-green-700 border border-green-200'
              : status.type === 'warning'
              ? 'bg-amber-50 text-amber-700 border border-amber-200'
              : 'bg-red-50 text-red-700 border border-red-200'
          }`}
        >
          {status.message}
        </div>
      )}
    </form>
  );
}

