import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { AutomationScene } from './AutomationScene';
import { AnimatedWords } from './AnimatedWords';
import { ParallaxBlock } from './ParallaxBlock';

export const HeroSection = () => {
  return (
    <section id="hero" className="relative overflow-hidden px-5 pb-16 pt-14 md:px-8 md:pb-24 md:pt-18">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="pill"
        >
          <Sparkles className="mr-2 h-3.5 w-3.5 text-blue-600" /> Automazioni operative per aziende e freelance
        </motion.div>

        <h1 className="mt-6 mb-2 max-w-5xl text-balance text-4xl leading-[1.08] text-slate-900 dark:text-slate-100 md:mb-3 md:text-7xl md:leading-[1.04]">
          <AnimatedWords className="pb-2" text="Automatizza il lavoro operativo, senza aggiungere complessità." />
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-4 max-w-3xl text-lg leading-relaxed text-slate-600 dark:text-slate-300 md:mt-5 md:text-xl"
        >
          Progettiamo workflow che collegano i tuoi strumenti e i tuoi dati: riduci attività ripetitive, errori e tempi di risposta.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-8 flex flex-wrap items-center gap-3"
        >
          <a href="#contatti" className="primary-btn">
            Prenota una consulenza
            <ArrowRight className="ml-2 h-4 w-4" />
          </a>
          <a href="#come-funziona" className="soft-btn">
            Scopri come funziona
          </a>
          <span className="text-sm text-slate-500 dark:text-slate-400">Analisi iniziale senza impegno.</span>
        </motion.div>

        <ParallaxBlock distance={24} className="mt-12 md:mt-14">
          
            <AutomationScene className="h-auto min-h-[560px] rounded-2xl md:h-[68vh] md:min-h-[460px]" />
        </ParallaxBlock>
      </div>
    </section>
  );
};
