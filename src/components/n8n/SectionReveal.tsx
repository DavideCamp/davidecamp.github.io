import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

interface SectionRevealProps {
  children: React.ReactNode;
  className?: string;
  stacked?: boolean;
}

export const SectionReveal = ({ children, className, stacked = false }: SectionRevealProps) => {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: stacked ? 110 : 70,
        filter: 'blur(9px)',
        clipPath: stacked ? 'inset(18% 0% 0% 0%)' : 'inset(0% 0% 0% 0%)',
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        clipPath: 'inset(0% 0% 0% 0%)',
      }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: stacked ? 1.05 : 0.95, ease: [0.22, 1, 0.36, 1] }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
};
