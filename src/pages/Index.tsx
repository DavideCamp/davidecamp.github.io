
import { useState, useEffect } from 'react';
import { ThemeProvider } from 'next-themes';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import AIChat from '@/components/AIChat';
import About from '@/components/About';
import Projects from '@/components/Projects';
import Blog from '@/components/Blog';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

const Index = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <div className="min-h-screen gradient-bg">
        <Header />
        <main>
          <Hero />
          <AIChat />
          <About />
          <Projects />
          <Blog />
          <Contact />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default Index;
