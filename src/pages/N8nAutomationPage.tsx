import { TopBar } from '../components/n8n/TopBar';
import { MarqueeStrip } from '../components/n8n/MarqueeStrip';
import { HeroSection } from '../components/n8n/HeroSection';
import { HowItWorksSection } from '../components/n8n/HowItWorksSection';
import { ServicesSection } from '../components/n8n/ServicesSection';
import { UseCasesSection } from '../components/n8n/UseCasesSection';
import { FooterSection } from '../components/n8n/FooterSection';
import { ParallaxBlock } from '../components/n8n/ParallaxBlock';
import { SectionReveal } from '../components/n8n/SectionReveal';
import { PageIntro } from '../components/n8n/PageIntro';
import { useEffect, useState } from 'react';

const N8nAutomationPage = () => {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('theme');
    if (saved === 'dark') return true;
    if (saved === 'light') return false;
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  return (
    <div className="ios-glass-bg text-slate-900 dark:text-slate-100">
      <PageIntro />
      <TopBar isDark={isDark} onToggleTheme={() => setIsDark((prev) => !prev)} />
      <MarqueeStrip />
      <HeroSection />

      <SectionReveal stacked>
        <ParallaxBlock distance={28} scaleFrom={0.98} scaleTo={1.01} opacityFrom={0.85} opacityTo={0.98}>
          <HowItWorksSection />
        </ParallaxBlock>
      </SectionReveal>

      <SectionReveal stacked>
        <ParallaxBlock distance={22} scaleFrom={0.985} scaleTo={1.01} opacityFrom={0.9} opacityTo={1}>
          <ServicesSection />
        </ParallaxBlock>
      </SectionReveal>

      <SectionReveal stacked>
        <ParallaxBlock distance={16} scaleFrom={0.99} scaleTo={1.005} opacityFrom={0.94} opacityTo={1}>
          <UseCasesSection />
        </ParallaxBlock>
      </SectionReveal>

      <div id="contatti">
        <SectionReveal stacked>
          <FooterSection />
        </SectionReveal>
      </div>
    </div>
  );
};

export default N8nAutomationPage;
