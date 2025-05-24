
import { Button } from '@/components/ui/button';
import { Github, Mail, MapPin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-background border-t border-border/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
              John Doe
            </h3>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Software Developer & AI Enthusiast building innovative solutions 
              at the intersection of technology and creativity.
            </p>
            <div className="flex gap-3">
              <Button variant="outline" size="icon" className="hover:bg-blue-50 dark:hover:bg-blue-950">
                <Github className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" className="hover:bg-blue-50 dark:hover:bg-blue-950">
                <Mail className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" className="hover:bg-blue-50 dark:hover:bg-blue-950">
                <MapPin className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <nav className="space-y-2">
              <button 
                onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
                className="block text-muted-foreground hover:text-foreground transition-colors"
              >
                About
              </button>
              <button 
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                className="block text-muted-foreground hover:text-foreground transition-colors"
              >
                Projects
              </button>
              <button 
                onClick={() => document.getElementById('blog')?.scrollIntoView({ behavior: 'smooth' })}
                className="block text-muted-foreground hover:text-foreground transition-colors"
              >
                Blog
              </button>
              <button 
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="block text-muted-foreground hover:text-foreground transition-colors"
              >
                Contact
              </button>
            </nav>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Get in Touch</h4>
            <div className="space-y-2 text-muted-foreground">
              <p>john@johndoe.dev</p>
              <p>+1 (555) 123-4567</p>
              <p>San Francisco, CA</p>
            </div>
            <Button 
              onClick={scrollToTop}
              variant="outline"
              className="mt-4 w-full hover:bg-blue-50 dark:hover:bg-blue-950"
            >
              Back to Top
            </Button>
          </div>
        </div>

        <div className="border-t border-border/50 mt-8 pt-8 text-center text-muted-foreground">
          <p>&copy; {currentYear} John Doe. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
