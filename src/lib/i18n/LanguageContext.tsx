import React, { createContext, useContext, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { translations, Language, TranslationKey } from './translations';

interface LanguageContextType {
  language: Language;
  t: (key: TranslationKey) => string;
  localePath: (path: string) => string;
  /** Strips the /en prefix from a path to get the base Norwegian path */
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

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  
  const language: Language = location.pathname.startsWith('/en') ? 'en' : 'no';

  const value = useMemo(() => {
    const t = (key: TranslationKey): string => {
      const entry = translations[key];
      return entry ? entry[language] : key;
    };

    const localePath = (path: string): string => {
      if (language === 'en') {
        const englishPath = getEnglishPath(path);
        return '/en' + englishPath;
      }
      return path;
    };

    const basePath = (path: string): string => {
      if (path.startsWith('/en/')) return path.slice(3);
      if (path === '/en') return '/';
      return path;
    };

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
