import { motion } from 'framer-motion';

interface AnimatedWordsProps {
  text: string;
  className?: string;
  delay?: number;
}

export const AnimatedWords = ({ text, className, delay = 0 }: AnimatedWordsProps) => {
  const words = text.split(' ');

  return (
    <motion.span
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.045,
            delayChildren: delay,
          },
        },
      }}
      className={className}
    >
      {words.map((word, index) => (
        <span key={`${word}-${index}`} className="mr-[0.26em] inline-block overflow-hidden align-bottom">
          <motion.span
            variants={{
              hidden: { y: '110%', opacity: 0 },
              visible: {
                y: '0%',
                opacity: 1,
                transition: { duration: 0.72, ease: [0.22, 1, 0.36, 1] },
              },
            }}
            className="inline-block"
          >
            {word}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
};
