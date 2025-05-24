
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
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="animate-fade-up">
          <h1 className="text-6xl md:text-8xl font-extralight mb-8 tracking-tight text-foreground">
            John Doe
          </h1>
          <p className="text-xl md:text-2xl font-light text-muted-foreground mb-12 tracking-wide">
            Software Developer & AI Enthusiast
          </p>
          <p className="text-base text-muted-foreground/70 mb-16 max-w-xl mx-auto leading-relaxed">
            Building innovative solutions at the intersection of technology and creativity.
          </p>
          <Button 
            onClick={scrollToChat}
            variant="outline"
            size="lg"
            className="font-light border-foreground/20 hover:bg-foreground hover:text-background transition-all duration-300"
          >
            Try AI Tool
            <ArrowDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
