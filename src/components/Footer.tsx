
import { Button } from '@/components/ui/button';
import { Github, Mail, MapPin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-background border-t border-border/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-3 gap-12">
          <div>
            <h3 className="text-2xl font-light text-foreground mb-6">
              Davide Campana
            </h3>
            <p className="text-muted-foreground mb-6 leading-relaxed font-light">
              Software Developer & AI Enthusiast building innovative solutions 
              at the intersection of technology and creativity.
            </p>
            <div className="flex gap-3">
              <Button variant="outline" size="icon" className="hover:bg-foreground/5 border-foreground/10">
                <Github className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" className="hover:bg-foreground/5 border-foreground/10">
                <Mail className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" className="hover:bg-foreground/5 border-foreground/10">
                <MapPin className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div>
            <h4 className="font-light mb-6 text-foreground">Quick Links</h4>
            <nav className="space-y-3">
              <button 
                onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
                className="block text-muted-foreground hover:text-foreground transition-colors font-light"
              >
                About
              </button>
              <button 
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                className="block text-muted-foreground hover:text-foreground transition-colors font-light"
              >
                Projects
              </button>
              <button 
                onClick={() => document.getElementById('blog')?.scrollIntoView({ behavior: 'smooth' })}
                className="block text-muted-foreground hover:text-foreground transition-colors font-light"
              >
                Blog
              </button>
              <button 
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="block text-muted-foreground hover:text-foreground transition-colors font-light"
              >
                Contact
              </button>
            </nav>
          </div>

          <div>
            <h4 className="font-light mb-6 text-foreground">Get in Touch</h4>
            <div className="space-y-2 text-muted-foreground font-light mb-6">
              <p>davidecampana@icloud.it</p>
              <p>Rome, IT</p>
            </div>
            <Button 
              onClick={scrollToTop}
              variant="outline"
              className="w-full hover:bg-foreground/5 border-foreground/10 font-light"
            >
              Back to Top
            </Button>
          </div>
        </div>

        <div className="border-t border-border/30 mt-12 pt-8 text-center text-muted-foreground font-light">
          <p>&copy; {currentYear} Davide Campana. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
