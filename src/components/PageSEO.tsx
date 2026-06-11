import { Helmet } from 'react-helmet-async';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import {
  getEnglishPath,
  getNorwegianPath,
  stripLocalePrefix,
} from '@/lib/i18n/LanguageContext';

interface PageSEOProps {
  title: string;
  description: string;
  /**
   * Path for the current page. May be already localized (e.g. "/en/about",
   * "/sa/medlemskap") or the raw Norwegian path (e.g. "/blogg"). PageSEO
   * normalizes it and emits hreflang alternates for all supported locales.
   */
  canonicalPath: string;
  image?: string;
  type?: 'website' | 'article';
}

const SITE = 'https://naturfolk.org';
const OG_LOCALE: Record<string, string> = {
  no: 'nb_NO',
  en: 'en_US',
  sa: 'se_NO',
};

export function PageSEO({
  title,
  description,
  canonicalPath,
  image = 'https://naturfolk.org/og-image.png',
  type = 'website',
}: PageSEOProps) {
  const { language } = useLanguage();

  // Normalize to the underlying Norwegian path so we can derive every locale.
  const stripped = stripLocalePrefix(canonicalPath);
  const norwegianPath = getNorwegianPath(stripped);

  const noUrl = `${SITE}${norwegianPath}`;
  const enUrl = `${SITE}/en${getEnglishPath(norwegianPath)}`;
  const saUrl = `${SITE}/sa${norwegianPath === '/' ? '' : norwegianPath}`;

  const canonicalUrl =
    language === 'en' ? enUrl : language === 'sa' ? saUrl : noUrl;

  return (
    <Helmet>
      <html lang={language === 'sa' ? 'se' : language} />
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />

      <link rel="alternate" hrefLang="no" href={noUrl} />
      <link rel="alternate" hrefLang="nb" href={noUrl} />
      <link rel="alternate" hrefLang="en" href={enUrl} />
      <link rel="alternate" hrefLang="se" href={saUrl} />
      <link rel="alternate" hrefLang="x-default" href={noUrl} />

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="Naturfolk" />
      <meta property="og:locale" content={OG_LOCALE[language] ?? 'nb_NO'} />
      {language !== 'no' && <meta property="og:locale:alternate" content="nb_NO" />}
      {language !== 'en' && <meta property="og:locale:alternate" content="en_US" />}
      {language !== 'sa' && <meta property="og:locale:alternate" content="se_NO" />}

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@naturfolk" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
}
