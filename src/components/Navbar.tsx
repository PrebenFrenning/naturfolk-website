
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Globe, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [language, setLanguage] = useState<'en' | 'no'>('en');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '#about' },
    { name: 'Programs', path: '#programs' },
    { name: 'Events', path: '#events' },
    { name: 'Impact', path: '#impact' },
    { name: 'Contact', path: '#contact' },
  ];

  return (
    <nav 
      className={cn(
        'fixed w-full z-50 transition-all duration-300',
        isScrolled 
          ? 'bg-white py-3 shadow-md' 
          : 'bg-black/30 backdrop-blur-sm py-5'
      )}
    >
      <div className="container-custom flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <span className="font-serif text-2xl font-semibold text-nature-green">Naturfolk</span>
        </Link>

        {/* Desktop navigation */}
        <div className="hidden md:flex gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.name}
              href={link.path}
              className={cn(
                "font-medium transition-custom underline-custom",
                isScrolled 
                  ? "text-nature-brown hover:text-nature-green" 
                  : "text-white hover:text-nature-green"
              )}
            >
              {link.name}
            </a>
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
                <a
                  key={link.name}
                  href={link.path}
                  className="py-2 font-medium text-nature-brown hover:text-nature-green transition-custom"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </a>
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
