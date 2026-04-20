import { motion } from 'framer-motion';
import { CheckCircle2, Gauge, Rocket, ShieldCheck, TimerReset } from 'lucide-react';

const roadmap = [
  {
    title: 'Analisi operativa',
    text: 'Mappiamo attività ripetitive, errori frequenti e passaggi con più attrito nel tuo processo.',
    icon: Gauge,
  },
  {
    title: 'Implementazione guidata',
    text: 'Costruiamo e testiamo i workflow su casi reali, con rollout progressivo senza bloccare il team.',
    icon: Rocket,
  },
  {
    title: 'Controllo e ottimizzazione',
    text: 'Monitoriamo KPI e stabilità dei flussi per migliorare performance e affidabilità nel tempo.',
    icon: ShieldCheck,
  },
];

const outcomes = [
  { label: 'Tempo operativo risparmiato', value: '-35% / -60%' },
  { label: 'Errori manuali nei passaggi critici', value: '-40%+' },
  { label: 'Tempo medio di risposta al cliente', value: '-30%+' },
];

export const ServicesOutcomePanel = () => {
  return (
    <div>
      <div className="mb-5 flex items-center justify-between">
        <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">Dal problema al risultato</p>
        <span className="pill border-blue-200/70 bg-blue-100/55 text-blue-700 dark:border-blue-700/50 dark:bg-blue-900/35 dark:text-blue-200">
          Metodo operativo
        </span>
      </div>

      <div className="space-y-3">
        {roadmap.map((step, idx) => {
          const Icon = step.icon;
          return (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.4, delay: idx * 0.06 }}
              className="rounded-xl border border-white/65 bg-white/45 p-4 backdrop-blur dark:border-white/15 dark:bg-slate-900/40"
            >
              <div className="flex items-start gap-3">
                <div className="mt-0.5 inline-flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-900/35 dark:text-blue-200">
                  <Icon className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">{step.title}</p>
                  <p className="mt-1 text-xs leading-relaxed text-slate-600 dark:text-slate-300">{step.text}</p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="mt-5 rounded-xl border border-white/65 bg-white/45 p-4 backdrop-blur dark:border-white/15 dark:bg-slate-900/40">
        <div className="mb-3 flex items-center gap-2">
          <TimerReset className="h-4 w-4 text-emerald-600 dark:text-emerald-300" />
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">Risultati attesi</p>
        </div>

        <div className="space-y-2.5">
          {outcomes.map((item) => (
            <div key={item.label} className="flex items-center justify-between gap-3 rounded-lg border border-white/70 bg-white/55 px-3 py-2 text-xs dark:border-white/10 dark:bg-slate-800/45">
              <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 dark:text-emerald-300" />
                <span>{item.label}</span>
              </div>
              <span className="font-semibold text-slate-900 dark:text-slate-100">{item.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
