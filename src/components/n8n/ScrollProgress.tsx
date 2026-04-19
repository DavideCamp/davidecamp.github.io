import { motion, useScroll, useSpring } from 'framer-motion';

export const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 24,
    mass: 0.35,
  });

  return <motion.div style={{ scaleX }} className="absolute inset-x-0 bottom-0 h-[2px] origin-left bg-gradient-to-r from-blue-500 to-cyan-400" />;
};
