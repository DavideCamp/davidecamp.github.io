import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const PageIntro = () => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const id = setTimeout(() => setShow(false), 980);
    return () => clearTimeout(id);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 0 }}
          exit={{ y: '-100%' }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[120] flex items-center justify-center bg-[#111317]"
        >
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="text-xs uppercase tracking-[0.35em] text-zinc-100"
          >
            n8n Automation Studio
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
