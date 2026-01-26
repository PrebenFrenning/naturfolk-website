
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Globe, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Pages that have hero images (transparent navbar looks good)
const PAGES_WITH_HERO = ['/', '/about', '/trosgrunnlag', '/medlemskap', '/temagrupper', '/bli-medlem', '/betaling', '/kalender', '/aktuelt', '/contact'];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [language, setLanguage] = useState<'en' | 'no'>('no');
  const location = useLocation();

  // Check if current page has a hero image
  const hasHeroImage = PAGES_WITH_HERO.includes(location.pathname);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Hjem', path: '/', isExternal: false },
    { name: 'Om Oss', path: '/about', isExternal: false },
    { name: 'Trosgrunnlag', path: '/trosgrunnlag', isExternal: false },
    { name: 'Medlemskap', path: '/medlemskap', isExternal: false },
    { name: 'Kalender', path: '/kalender', isExternal: false },
    { name: 'Aktuelt', path: '/aktuelt', isExternal: false },
    { name: 'Kontakt', path: '/contact', isExternal: false },
  ];

  // Determine if navbar should show dark style (not scrolled, either has hero or needs solid dark bg)
  const showDarkStyle = !isScrolled;
  // On pages without hero, use solid dark background instead of transparent
  const darkBgClass = hasHeroImage ? 'bg-black/50 backdrop-blur-sm' : 'bg-nature-brown';

  return (
    <nav 
      className={cn(
        'fixed w-full z-50 transition-all duration-300',
        isScrolled 
          ? 'bg-white py-3 shadow-md' 
          : `${darkBgClass} py-5`
      )}
    >
      <div className="container-custom flex justify-between items-center">
        <Link to="/" className="flex items-center">
          {isScrolled ? (
            <img 
              src="/lovable-uploads/07d9355a-bf98-4a58-878d-1ce5e623810b.png" 
              alt="Naturfolk" 
              className="h-12 md:h-14 logo"
            />
          ) : (
            <img 
              src="/lovable-uploads/5a0d04c1-33b5-4628-841d-d6c3346896b0.png" 
              alt="Naturfolk" 
              className="h-12 md:h-14 logo"
            />
          )}
        </Link>

        {/* Desktop navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            link.isExternal ? (
              <a 
                key={link.name}
                href={link.path}
                className={cn(
                  "font-medium transition-custom underline-custom",
                  location.pathname === link.path && "underline-custom-active text-nature-green",
                  location.pathname !== link.path && (isScrolled 
                    ? "text-nature-brown hover:text-nature-green" 
                    : "text-white hover:text-nature-green")
                )}
              >
                {link.name}
              </a>
            ) : (
              <Link 
                key={link.name}
                to={link.path}
                className={cn(
                  "font-medium transition-custom underline-custom",
                  location.pathname === link.path && "underline-custom-active text-nature-green",
                  location.pathname !== link.path && (isScrolled 
                    ? "text-nature-brown hover:text-nature-green" 
                    : "text-white hover:text-nature-green")
                )}
              >
                {link.name}
              </Link>
            )
          ))}
          
          {/* Language Selector */}
          <DropdownMenu>
            <DropdownMenuTrigger className={cn(
              "flex items-center gap-1 font-medium transition-custom", 
              isScrolled ? "text-nature-brown" : "text-white"
            )}>
              <Globe size={18} />
              <span>{language.toUpperCase()}</span>
              <ChevronDown size={16} />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setLanguage('en')} className={language === 'en' ? 'bg-muted' : ''}>
                English
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLanguage('no')} className={language === 'no' ? 'bg-muted' : ''}>
                Norsk
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Mobile menu button */}
        <button
          className={cn("md:hidden", isScrolled ? "text-nature-green" : "text-white")}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white absolute w-full border-t border-gray-100 animate-fade-in">
          <div className="container-custom py-4">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                link.isExternal ? (
                  <a
                    key={link.name}
                    href={link.path}
                    className={cn(
                      "py-2 font-medium transition-custom",
                      location.pathname === link.path
                        ? "text-nature-green"
                        : "text-nature-brown hover:text-nature-green"
                    )}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.name}
                  </a>
                ) : (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={cn(
                      "py-2 font-medium transition-custom",
                      location.pathname === link.path
                        ? "text-nature-green"
                        : "text-nature-brown hover:text-nature-green"
                    )}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                )
              ))}
              
              {/* Mobile Language Selector */}
              <div className="flex gap-4 pt-4 border-t border-gray-100">
                <button 
                  onClick={() => setLanguage('en')} 
                  className={cn(
                    "py-2 font-medium transition-custom",
                    language === 'en' ? "text-nature-green" : "text-nature-brown"
                  )}
                >
                  English
                </button>
                <button 
                  onClick={() => setLanguage('no')} 
                  className={cn(
                    "py-2 font-medium transition-custom",
                    language === 'no' ? "text-nature-green" : "text-nature-brown"
                  )}
                >
                  Norsk
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
