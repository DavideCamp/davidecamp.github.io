import { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { cn } from '../../lib/utils';

interface ParallaxBlockProps {
  children: React.ReactNode;
  className?: string;
  distance?: number;
  scaleFrom?: number;
  scaleTo?: number;
  opacityFrom?: number;
  opacityTo?: number;
}

export const ParallaxBlock = ({
  children,
  className,
  distance = 30,
  scaleFrom = 1,
  scaleTo = 1,
  opacityFrom = 1,
  opacityTo = 1,
}: ParallaxBlockProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const yRaw = useTransform(scrollYProgress, [0, 1], [distance, -distance]);
  const y = useSpring(yRaw, { stiffness: 90, damping: 24, mass: 0.45 });
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [scaleFrom, 1, scaleTo]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [opacityFrom, 1, opacityTo]);

  return (
    <div ref={ref} className={cn('relative overflow-visible', className)}>
      <motion.div style={{ y, scale, opacity }}>{children}</motion.div>
    </div>
  );
};
