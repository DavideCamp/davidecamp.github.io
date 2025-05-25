
import { useState } from 'react';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import { Sun, Moon, Menu, X } from 'lucide-react';

const Header = () => {
  const { theme, setTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <h1 className="text-xl font-light text-foreground">
              🎲
            </h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection('about')}
              className="text-foreground/60 hover:text-foreground transition-colors duration-200 font-light"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection('projects')}
              className="text-foreground/60 hover:text-foreground transition-colors duration-200 font-light"
            >
              Projects
            </button>
            <button
              onClick={() => scrollToSection('blog')}
              className="text-foreground/60 hover:text-foreground transition-colors duration-200 font-light"
            >
              Blog
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="text-foreground/60 hover:text-foreground transition-colors duration-200 font-light"
            >
              Contact
            </button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="ml-4 hover:bg-foreground/5"
            >
              {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="hover:bg-foreground/5"
            >
              {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="hover:bg-foreground/5"
            >
              {isMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-border/30 py-4 animate-fade-up">
            <nav className="flex flex-col space-y-4">
              <button
                onClick={() => scrollToSection('about')}
                className="text-left text-foreground/60 hover:text-foreground transition-colors duration-200 font-light"
              >
                About
              </button>
              <button
                onClick={() => scrollToSection('projects')}
                className="text-left text-foreground/60 hover:text-foreground transition-colors duration-200 font-light"
              >
                Projects
              </button>
              <button
                onClick={() => scrollToSection('blog')}
                className="text-left text-foreground/60 hover:text-foreground transition-colors duration-200 font-light"
              >
                Blog
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="text-left text-foreground/60 hover:text-foreground transition-colors duration-200 font-light"
              >
                Contact
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
