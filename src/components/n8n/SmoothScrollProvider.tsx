import { useEffect } from 'react';
import Lenis from 'lenis';

interface SmoothScrollProviderProps {
  children: React.ReactNode;
}

export const SmoothScrollProvider = ({ children }: SmoothScrollProviderProps) => {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.15,
      smoothWheel: true,
      smoothTouch: false,
      lerp: 0.08,
      wheelMultiplier: 0.9,
    });

    let raf = 0;

    const onFrame = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(onFrame);
    };

    raf = requestAnimationFrame(onFrame);

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
};
