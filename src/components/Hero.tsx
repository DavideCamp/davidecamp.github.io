
import { Button } from '@/components/ui/button';
import { ArrowDown } from 'lucide-react';

const Hero = () => {
  const scrollToChat = () => {
    const element = document.getElementById('ai-chat');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center pt-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="animate-fade-up">
          <h1 className="text-7xl md:text-9xl font-extralight mb-12 tracking-tight text-foreground">
            John Doe
          </h1>
          <p className="text-xl md:text-2xl font-light text-muted-foreground mb-16 tracking-wide">
            Software Developer & AI Enthusiast
          </p>
          <p className="text-lg text-muted-foreground/80 mb-20 max-w-2xl mx-auto leading-relaxed font-light">
            Building innovative solutions at the intersection of technology and creativity.
          </p>
          <Button 
            onClick={scrollToChat}
            variant="outline"
            size="lg"
            className="font-light border-foreground/10 hover:bg-foreground/5 hover:text-foreground transition-all duration-300 px-12 py-6 text-base"
          >
            Try AI Tool
            <ArrowDown className="ml-3 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
