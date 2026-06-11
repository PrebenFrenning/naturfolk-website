
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Globe, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { getEnglishPath, getNorwegianPath } from '@/lib/i18n/LanguageContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Pages that have hero images (transparent navbar looks good)
const PAGES_WITH_HERO = ['/', '/about', '/trosgrunnlag', '/medlemskap', '/temagrupper', '/bli-medlem', '/betaling', '/kalender', '/aktuelt', '/contact',
  '/en', '/en/about', '/en/faith', '/en/membership', '/en/theme-groups', '/en/join', '/en/payment', '/en/calendar', '/en/news', '/en/contact',
  '/se', '/se/about', '/se/trosgrunnlag', '/se/medlemskap', '/se/temagrupper', '/se/bli-medlem', '/se/betaling', '/se/kalender', '/se/aktuelt', '/se/contact'];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { language, t, localePath, basePath } = useLanguage();

  const hasHeroImage = PAGES_WITH_HERO.includes(location.pathname);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: t('nav.home'), path: '/' },
    { name: t('nav.about'), path: '/about' },
    { name: t('nav.faith'), path: '/trosgrunnlag' },
    { name: t('nav.membership'), path: '/medlemskap' },
    { name: t('nav.calendar'), path: '/kalender' },
    { name: t('nav.news'), path: '/aktuelt' },
    { name: t('nav.contact'), path: '/contact' },
  ];

  // Hero image preload map
  const heroImages: Record<string, string> = {
    '/': '/src/assets/hero-fjord-bonfire.png',
    '/about': '/src/assets/om-oss-hero.jpg',
    '/trosgrunnlag': '/src/assets/trosgrunnlag-hero.jpg',
    '/medlemskap': '/src/assets/medlemskap-hero-new.jpg',
    '/kalender': '/src/assets/kalender-hero.jpg',
    '/aktuelt': '/src/assets/aktuelt-hero.jpg',
    '/contact': '/src/assets/kontakt-hero-new.jpg',
  };

  const preloadImage = (path: string) => {
    const src = heroImages[path];
    if (src) {
      const img = new Image();
      img.src = src;
    }
  };

  // Check if a nav link is active (matching both NO and EN paths)
  const isActive = (noPath: string) => {
    const currentBase = basePath(location.pathname);
    return currentBase === noPath;
  };

  // Switch language: navigate to equivalent path in the other language
  const switchLanguage = (targetLang: 'en' | 'no' | 'se') => {
    if (targetLang === language) return;

    const currentPath = location.pathname;

    // First, strip any existing locale prefix to get the Norwegian base path
    let noPath: string;
    if (currentPath.startsWith('/en/')) {
      noPath = getNorwegianPath(currentPath.slice(3));
    } else if (currentPath === '/en') {
      noPath = '/';
    } else if (currentPath.startsWith('/se/')) {
      noPath = currentPath.slice(3);
    } else if (currentPath === '/se') {
      noPath = '/';
    } else {
      noPath = currentPath;
    }

    if (targetLang === 'en') {
      navigate('/en' + getEnglishPath(noPath));
    } else if (targetLang === 'se') {
      navigate('/se' + (noPath === '/' ? '' : noPath));
    } else {
      navigate(noPath);
    }
    setIsMenuOpen(false);
  };

  const showDarkStyle = !isScrolled;
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
        <Link to={localePath('/')} className="flex items-center">
          {isScrolled ? (
            <img 
              src="/lovable-uploads/07d9355a-bf98-4a58-878d-1ce5e623810b.png" 
              alt="Naturfolk trossamfunn logo" 
              className="h-12 md:h-14 logo"
            />
          ) : (
            <img 
              src="/lovable-uploads/5a0d04c1-33b5-4628-841d-d6c3346896b0.png" 
              alt="Naturfolk trossamfunn logo" 
              className="h-12 md:h-14 logo"
            />
          )}
        </Link>

        {/* Desktop navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link 
              key={link.name}
              to={localePath(link.path)}
              onMouseEnter={() => preloadImage(link.path)}
              className={cn(
                "font-medium transition-custom underline-custom",
                isActive(link.path) && "underline-custom-active text-nature-green",
                !isActive(link.path) && (isScrolled 
                  ? "text-nature-brown hover:text-nature-green" 
                  : "text-white hover:text-nature-green")
              )}
            >
              {link.name}
            </Link>
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
              <DropdownMenuItem onClick={() => switchLanguage('no')} className={language === 'no' ? 'bg-muted' : ''}>
                Norsk
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => switchLanguage('en')} className={language === 'en' ? 'bg-muted' : ''}>
                English
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => switchLanguage('se')} className={language === 'se' ? 'bg-muted' : ''}>
                Davvisámegiella
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
                <Link
                  key={link.name}
                  to={localePath(link.path)}
                  className={cn(
                    "py-2 font-medium transition-custom",
                    isActive(link.path)
                      ? "text-nature-green"
                      : "text-nature-brown hover:text-nature-green"
                  )}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              
              {/* Mobile Language Selector */}
              <div className="flex flex-wrap gap-4 pt-4 border-t border-gray-100">
                <button
                  onClick={() => switchLanguage('no')}
                  className={cn(
                    "py-2 font-medium transition-custom",
                    language === 'no' ? "text-nature-green" : "text-nature-brown"
                  )}
                >
                  Norsk
                </button>
                <button
                  onClick={() => switchLanguage('en')}
                  className={cn(
                    "py-2 font-medium transition-custom",
                    language === 'en' ? "text-nature-green" : "text-nature-brown"
                  )}
                >
                  English
                </button>
                <button
                  onClick={() => switchLanguage('se')}
                  className={cn(
                    "py-2 font-medium transition-custom",
                    language === 'se' ? "text-nature-green" : "text-nature-brown"
                  )}
                >
                  Davvisámegiella
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
