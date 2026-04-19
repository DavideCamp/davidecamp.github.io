import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const steps = ['Lead captured', 'Qualify lead', 'Enrich company', 'Sync CRM', 'Notify team'];

export const WorkflowMock = () => {
  return (
    <div>
      <div className="mb-5 flex items-center justify-between">
        <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">Automation Sequence</p>
        <span className="pill border-emerald-200/70 bg-emerald-100/60 text-emerald-700">Live</span>
      </div>

      <div className="grid gap-2">
        {steps.map((step, index) => (
          <motion.div
            key={step}
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.42, delay: index * 0.05 }}
            whileHover={{ x: 2 }}
            className="flex items-center justify-between rounded-xl border border-white/65 bg-white/45 px-4 py-3 backdrop-blur dark:border-white/15 dark:bg-slate-900/40"
          >
            <span className="text-sm text-slate-700 dark:text-slate-200">{step}</span>
            {index < steps.length - 1 ? <ArrowRight className="h-4 w-4 text-slate-400 dark:text-slate-500" /> : <span className="text-xs text-emerald-600 dark:text-emerald-400">Done</span>}
          </motion.div>
        ))}
      </div>
    </div>
  );
};
