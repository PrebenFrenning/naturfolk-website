import React, { createContext, useContext, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { translations, Language, TranslationKey } from './translations';

interface LanguageContextType {
  language: Language;
  t: (key: TranslationKey) => string;
  localePath: (path: string) => string;
  /** Strips the /en or /se prefix from a path to get the base Norwegian path */
  basePath: (path: string) => string;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

// Route mapping: Norwegian path -> English path
const routeMap: Record<string, string> = {
  '/': '/',
  '/about': '/about',
  '/trosgrunnlag': '/faith',
  '/medlemskap': '/membership',
  '/kalender': '/calendar',
  '/aktuelt': '/news',
  '/contact': '/contact',
  '/temagrupper': '/theme-groups',
  '/blogg': '/blog',
  '/bli-medlem': '/join',
  '/betaling': '/payment',
  '/personvern': '/privacy',
  '/vilkar': '/terms',
  '/events': '/events',
  '/medlem-login': '/member-login',
  '/medlem': '/member',
  '/medlem/profil': '/member/profile',
  '/auth': '/auth',
};

// Reverse map: English path -> Norwegian path
const reverseRouteMap: Record<string, string> = {};
Object.entries(routeMap).forEach(([no, en]) => {
  reverseRouteMap[en] = no;
});

export function getEnglishPath(norwegianPath: string): string {
  // Check exact match first
  if (routeMap[norwegianPath]) return routeMap[norwegianPath];
  
  // Check for dynamic routes like /blogg/:slug
  if (norwegianPath.startsWith('/blogg/')) {
    return '/blog/' + norwegianPath.slice(7);
  }
  
  return norwegianPath;
}

export function getNorwegianPath(englishPath: string): string {
  if (reverseRouteMap[englishPath]) return reverseRouteMap[englishPath];
  
  if (englishPath.startsWith('/blog/')) {
    return '/blogg/' + englishPath.slice(6);
  }
  
  return englishPath;
}

/** Strip a /en or /se locale prefix to the underlying Norwegian path */
export function stripLocalePrefix(pathname: string): string {
  if (pathname.startsWith('/en/')) return pathname.slice(3);
  if (pathname === '/en') return '/';
  if (pathname.startsWith('/se/')) return pathname.slice(3);
  if (pathname === '/se') return '/';
  return pathname;
}

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();

  const language: Language = location.pathname.startsWith('/en')
    ? 'en'
    : location.pathname.startsWith('/se')
    ? 'se'
    : 'no';

  const value = useMemo(() => {
    const t = (key: TranslationKey): string => {
      const entry = translations[key];
      if (!entry) return key;
      const val = (entry as Record<string, string>)[language];
      // Fallback to Norwegian if a specific translation is missing
      return val ?? entry.no ?? key;
    };

    const localePath = (path: string): string => {
      if (language === 'en') {
        const englishPath = getEnglishPath(path);
        return '/en' + englishPath;
      }
      if (language === 'se') {
        // Sami uses the same slugs as Norwegian, just prefixed with /se
        return '/se' + (path === '/' ? '' : path);
      }
      return path;
    };

    const basePath = (path: string): string => stripLocalePrefix(path);

    return { language, t, localePath, basePath };
  }, [language]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
