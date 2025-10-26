
import { useState } from 'react';
import { useTheme } from 'next-themes';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sun, Moon, Menu, X, User, LogOut, Github } from 'lucide-react';

const Header = () => {
  const { theme, setTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleSignOut =  () => {
    
    setIsMenuOpen(false);
  };

  const scrollToSection = (sectionId: string) => {
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsMenuOpen(false);
  };

  const menuItems = [
    { label: 'About', sectionId: 'about' },
    { label: 'Projects', sectionId: 'projects' },
    { label: 'Blog', url: '/blog' },
    { label: 'Contact', sectionId: 'contact' },
  ];

  const renderMenuItems = (className: string) => (
    <nav className={className}>
      {menuItems.map((menuItem) => (
        <button
          key={menuItem.label}
          onClick={() => (menuItem.url ? navigate(menuItem.url) : scrollToSection(menuItem.sectionId))}
          className="text-left text-foreground/60 hover:text-foreground transition-colors duration-200 font-light"
        >
          {menuItem.label}
        </button>
      ))}
    </nav>
  );

  const renderAuthButton = (style?: string) => (
    <div className={`${style} space-y-4 border-t border-border/30`}>
      {false ? (
        <>
          <div className="flex items-center space-x-2 text-foreground/60">
            <User className="h-4 w-4" />
            <span className="text-sm font-light">John Doe</span>
          </div>
          <button
            onClick={handleSignOut}
            className="flex items-center space-x-2 text-left text-foreground/60 hover:text-foreground transition-colors duration-200 font-light"
          >
            <LogOut className="h-4 w-4" />
            <span>Sign Out</span>
          </button>
        </>
      ) : (
        <Link
          to="/auth"
          className="text-left text-foreground/60 hover:text-foreground transition-colors duration-200 font-light"
          onClick={() => setIsMenuOpen(false)}
        >
          Sign In
        </Link>
      )}
    </div>
  );

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link to="/" className="text-xl font-light text-foreground">
              🎲
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {renderMenuItems('space-x-8')}
            {renderAuthButton()}
            <a
              href="https://github.com/davideCamp"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground/60 hover:text-foreground transition-colors duration-200"
            >
              <Github className="h-5 w-5" />
            </a>
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
            {renderMenuItems('flex flex-col space-y-4')}
            <a
              href="https://github.com/davideCamp"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center my-4 space-x-2 text-left text-foreground/60 hover:text-foreground transition-colors duration-200 font-light"
              onClick={() => setIsMenuOpen(false)}
            >
              <Github className="h-4 w-4" />
              <span>GitHub</span>
            </a>
            {renderAuthButton('pt-2')}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
