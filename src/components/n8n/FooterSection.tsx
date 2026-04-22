import { motion } from 'framer-motion';
import { Check, Clock3, Linkedin, Mail, Github, Send } from 'lucide-react';
import { FormEvent, useEffect, useMemo, useState } from 'react';
import { cn } from '../../lib/utils';
import { getRunningIndex, getWorkflowAnchorPositions, getWorkflowMarker, getWorkflowProgressFromCenters, WORKFLOW_SECTION_IDS } from './workflowState';

const CONTACT_ENDPOINT = 'https://formsubmit.co/ajax/davide.campana99@gmail.com';
const RATE_KEY = 'contact_form_rate';
const RATE_LIMIT_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX = 3;
const MIN_FILL_TIME_MS = 2500;

type FormState = {
  name: string;
  email: string;
  company: string;
  message: string;
  website: string; // honeypot
};

const initialState: FormState = {
  name: '',
  email: '',
  company: '',
  message: '',
  website: '',
};

export const FooterSection = () => {
  const [form, setForm] = useState<FormState>(initialState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [runningIndex, setRunningIndex] = useState(0);
  const startedAt = useMemo(() => Date.now(), []);

  useEffect(() => {
    const update = () => {
      const anchors = getWorkflowAnchorPositions();
      if (anchors.length < 2) return;

      const marker = getWorkflowMarker();
      const rawProgress = getWorkflowProgressFromCenters(marker, anchors);
      const pageBottomReached = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2;
      const progress = pageBottomReached ? 1 : rawProgress;
      setRunningIndex(getRunningIndex(progress, anchors.length));
    };

    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  const contattiIndex = WORKFLOW_SECTION_IDS.indexOf('contatti');
  const ctaStatus: 'pending' | 'running' | 'success' =
    contattiIndex < runningIndex ? 'success' : contattiIndex === runningIndex ? 'running' : 'pending';

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFeedback(null);

    if (form.website.trim()) {
      setFeedback({ type: 'success', text: 'Messaggio inviato.' });
      return;
    }

    if (Date.now() - startedAt < MIN_FILL_TIME_MS) {
      setFeedback({ type: 'error', text: 'Compilazione troppo veloce. Riprova tra qualche secondo.' });
      return;
    }

    try {
      const now = Date.now();
      const existing = JSON.parse(localStorage.getItem(RATE_KEY) || '[]') as number[];
      const recent = existing.filter((t) => now - t < RATE_LIMIT_MS);

      if (recent.length >= RATE_LIMIT_MAX) {
        setFeedback({ type: 'error', text: 'Hai raggiunto il limite di invii. Riprova più tardi.' });
        return;
      }

      setIsSubmitting(true);

      const response = await fetch(CONTACT_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          company: form.company,
          message: form.message,
          _subject: 'Nuova richiesta dal sito - D-Automazioni',
          _captcha: 'true',
          _template: 'table',
          _honey: form.website,
        }),
      });

      if (!response.ok) {
        throw new Error('submit_failed');
      }

      localStorage.setItem(RATE_KEY, JSON.stringify([...recent, now]));
      setForm(initialState);
      setFeedback({ type: 'success', text: 'Richiesta inviata con successo. Ti rispondo al più presto.' });
    } catch {
      setFeedback({ type: 'error', text: 'Invio non riuscito. Scrivimi a davide.campana99@gmail.com' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="section-divider px-5 py-16 md:px-8 md:py-24">
      <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[1.1fr_1fr]">
        <div className="surface-card p-8 md:p-12">
          <div
            id="workflow-anchor-contatti"
            className="inline-flex w-[280px] rounded-2xl border border-white/65 bg-gradient-to-br from-emerald-50 to-teal-50 px-4 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.75),0_14px_28px_-20px_rgba(15,23,42,0.4)] backdrop-blur-xl dark:border-white/15 dark:from-emerald-950/35 dark:to-teal-950/30 md:w-[340px]"
          >
            <div className="w-full">
              <div className="mb-2 flex items-center justify-between gap-2">
                <div className="inline-flex items-center gap-1.5 rounded-md border border-white/65 bg-white/45 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-600 backdrop-blur dark:border-white/15 dark:bg-slate-800/45 dark:text-slate-300">
                  <Send className="h-3 w-3" />
                  output
                </div>
                <div
                  className={cn(
                    'inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.14em]',
                    ctaStatus === 'pending' && 'border-slate-200 bg-slate-100 text-slate-600 dark:border-slate-700 dark:bg-slate-800/80 dark:text-slate-300',
                    ctaStatus === 'running' && 'border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-700/70 dark:bg-blue-900/45 dark:text-blue-200',
                    ctaStatus === 'success' && 'border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-700/70 dark:bg-emerald-900/45 dark:text-emerald-200',
                  )}
                >
                  {ctaStatus === 'pending' && <Clock3 className="h-3 w-3" />}
                  {ctaStatus === 'running' && (
                    <motion.span
                      className="h-1.5 w-1.5 rounded-full bg-blue-500"
                      animate={{ scale: [1, 1.35, 1], opacity: [0.65, 1, 0.65] }}
                      transition={{ duration: 1.05, repeat: Infinity }}
                    />
                  )}
                  {ctaStatus === 'success' && <Check className="h-3 w-3" />}
                  {ctaStatus === 'success' ? 'Done' : ctaStatus === 'running' ? 'Running' : 'Pending'}
                </div>
              </div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-blue-600 dark:text-cyan-300">Step 04</p>
              <p className="mt-1.5 text-sm font-semibold text-slate-900 dark:text-slate-100 md:text-[15px]">Call to action</p>
              <p className="mt-1 text-[11px] leading-relaxed text-slate-600 dark:text-slate-300 md:text-xs">Prenota la call e avvia il workflow.</p>
            </div>
          </div>
          <h3 className="mt-4 max-w-4xl text-4xl leading-tight text-slate-900 dark:text-slate-100 md:text-6xl">Parti da un processo. Trasformalo in vantaggio.</h3>
          <p className="mt-4 max-w-2xl text-slate-600 dark:text-slate-300">
            Compila il form e raccontami il tuo caso: ti rispondo con una prima proposta operativa.
          </p>
        </div>

        <div className="surface-card p-6 md:p-8">
          <p className="mb-5 text-sm font-semibold text-slate-900 dark:text-slate-100">Prenota una consulenza</p>

          <form onSubmit={onSubmit} className="space-y-3">
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
              placeholder="Nome"
              required
              className="w-full rounded-xl border border-white/70 bg-white/45 px-3 py-2.5 text-sm text-slate-800 outline-none transition focus:border-blue-300 dark:border-white/15 dark:bg-slate-800/45 dark:text-slate-100"
            />

            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
              placeholder="Email"
              required
              className="w-full rounded-xl border border-white/70 bg-white/45 px-3 py-2.5 text-sm text-slate-800 outline-none transition focus:border-blue-300 dark:border-white/15 dark:bg-slate-800/45 dark:text-slate-100"
            />

            <input
              type="text"
              value={form.company}
              onChange={(e) => setForm((prev) => ({ ...prev, company: e.target.value }))}
              placeholder="Azienda (opzionale)"
              className="w-full rounded-xl border border-white/70 bg-white/45 px-3 py-2.5 text-sm text-slate-800 outline-none transition focus:border-blue-300 dark:border-white/15 dark:bg-slate-800/45 dark:text-slate-100"
            />

            <textarea
              value={form.message}
              onChange={(e) => setForm((prev) => ({ ...prev, message: e.target.value }))}
              placeholder="Descrivi il processo che vuoi automatizzare"
              required
              rows={4}
              className="w-full resize-none rounded-xl border border-white/70 bg-white/45 px-3 py-2.5 text-sm text-slate-800 outline-none transition focus:border-blue-300 dark:border-white/15 dark:bg-slate-800/45 dark:text-slate-100"
            />

            {/* Honeypot anti-bot */}
            <input
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={form.website}
              onChange={(e) => setForm((prev) => ({ ...prev, website: e.target.value }))}
              className="hidden"
              aria-hidden="true"
            />

            <motion.button
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.99 }}
              type="submit"
              disabled={isSubmitting}
              className="primary-btn w-full disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSubmitting ? 'Invio in corso...' : 'Invia richiesta'}
              <Send className="ml-2 h-4 w-4" />
            </motion.button>
          </form>

          <p className="mt-3 text-[11px] leading-relaxed text-slate-500 dark:text-slate-400">
            Protezione anti-spam attiva: honeypot, controllo tempo minimo compilazione e rate limit client-side.
          </p>

          {feedback && (
            <div
              className={`mt-3 rounded-lg border px-3 py-2 text-xs ${
                feedback.type === 'success'
                  ? 'border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-700/60 dark:bg-emerald-900/40 dark:text-emerald-200'
                  : 'border-red-200 bg-red-50 text-red-700 dark:border-red-700/60 dark:bg-red-900/40 dark:text-red-200'
              }`}
            >
              {feedback.text}
            </div>
          )}
        </div>
      </div>

      <div className="mx-auto mt-10 flex max-w-7xl flex-col gap-4 border-t border-white/65 pt-6 text-sm text-slate-500 dark:border-white/15 dark:text-slate-400 md:flex-row md:items-center md:justify-between">
        <p>© {new Date().getFullYear()} D-Automazioni</p>
        <div className="flex items-center gap-4">
          <a href="mailto:davide.campana99@gmail.com" className="transition hover:text-slate-900 dark:hover:text-slate-100"><Mail className="h-4 w-4" /></a>
          <a href="#" className="transition hover:text-slate-900 dark:hover:text-slate-100"><Linkedin className="h-4 w-4" /></a>
          <a href="#" className="transition hover:text-slate-900 dark:hover:text-slate-100"><Github className="h-4 w-4" /></a>
        </div>
      </div>
    </footer>
  );
};
