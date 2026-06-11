import { Helmet } from 'react-helmet-async';

interface PageSEOProps {
  title: string;
  description: string;
  canonicalPath: string;
  image?: string;
  type?: 'website' | 'article';
}

export function PageSEO({
  title,
  description,
  canonicalPath,
  image = 'https://naturfolk.org/og-image.png',
  type = 'website',
}: PageSEOProps) {
  const canonicalUrl = `https://naturfolk.org${canonicalPath}`;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="Naturfolk" />
      <meta property="og:locale" content="nb_NO" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@naturfolk" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
}
