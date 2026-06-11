import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ScrollToTop from '../components/ScrollToTop';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import heroImage from '@/assets/medlemskap-hero-new.jpg';
import { useLanguage } from '@/lib/i18n/LanguageContext';

const Medlemskap = () => {
  const { t, localePath } = useLanguage();

  const faqData = [
    { q: t('membershipPage.faq.q1'), a: t('membershipPage.faq.a1') },
    { q: t('membershipPage.faq.q2'), a: t('membershipPage.faq.a2') },
    { q: t('membershipPage.faq.q3'), a: t('membershipPage.faq.a3') },
    { q: t('membershipPage.faq.q4'), a: t('membershipPage.faq.a4') },
    { q: t('membershipPage.faq.q5'), a: t('membershipPage.faq.a5') },
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqData.map(item => ({
      "@type": "Question",
      "name": item.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.a,
      },
    })),
  };
  
  return (
    <div className="min-h-screen">
      <Helmet>
        <title>{t('membershipPage.hero.title')} – Naturfolk</title>
        <meta name="description" content={t('membershipPage.welcome.p1')} />
        <link rel="canonical" href={`https://naturfolk.org${localePath('/medlemskap')}`} />
        <meta property="og:title" content={`${t('membershipPage.hero.title')} – Naturfolk`} />
        <meta property="og:description" content={t('membershipPage.welcome.p1')} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://naturfolk.org${localePath('/medlemskap')}`} />
        <meta property="og:image" content="https://naturfolk.org/og-image.png" />
        <meta property="og:site_name" content="Naturfolk" />
        <meta property="og:locale" content="nb_NO" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@naturfolk" />
        <meta name="twitter:title" content={`${t('membershipPage.hero.title')} – Naturfolk`} />
        <meta name="twitter:description" content={t('membershipPage.welcome.p1')} />
        <meta name="twitter:image" content="https://naturfolk.org/og-image.png" />
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>
      <Navbar />
      
      <section className="relative min-h-[50vh] flex items-center justify-center">
        <img src={heroImage} alt="Fellesskap rundt bål i norsk natur" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/60"></div>
        <div className="relative z-10 container-custom">
          <div className="max-w-4xl mx-auto text-center text-white mt-16">
            <h1 className="text-2xl md:text-4xl font-serif font-bold mb-6">{t('membershipPage.hero.title')}</h1>
            <p className="text-base md:text-lg leading-relaxed mb-8">{t('membershipPage.hero.subtitle')}</p>
            <Link to={localePath('/bli-medlem')}>
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 text-lg">
                {t('testimonials.cta')}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 bg-nature-offwhite">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto space-y-12">
            
            <Card>
              <CardContent className="p-8">
                <h2 className="text-3xl font-serif font-semibold mb-8 text-nature-green">{t('membershipPage.welcome.title')}</h2>
                <p className="text-lg leading-relaxed mb-4">{t('membershipPage.welcome.p1')}</p>
                <p className="text-lg leading-relaxed">{t('membershipPage.welcome.p2')}</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-8">
                <h2 className="text-3xl font-serif font-semibold mb-8 text-nature-green">{t('membershipPage.types.title')}</h2>
                <div className="mb-8">
                  <h3 className="text-2xl font-serif font-semibold mb-4 text-nature-brown">{t('membershipPage.types.main.title')}</h3>
                  <p className="text-lg leading-relaxed mb-4">{t('membershipPage.types.main.text')}</p>
                  <div className="bg-nature-beige/50 p-4 rounded-lg mt-4">
                    {t('membershipPage.types.main.rules').split('\n').map((line: string, i: number) => (
                      <p key={i} className="text-base leading-relaxed mb-1 last:mb-0">• {line}</p>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-serif font-semibold mb-4 text-nature-brown">{t('membershipPage.types.support.title')}</h3>
                  <p className="text-lg leading-relaxed">{t('membershipPage.types.support.text')}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-8">
                <h2 className="text-3xl font-serif font-semibold mb-6 text-nature-green">{t('membershipPage.howTo.title')}</h2>
                <p className="text-lg leading-relaxed mb-6">{t('membershipPage.howTo.text')}</p>
                
                <div className="bg-nature-beige/50 p-6 rounded-lg mb-6">
                  <p className="text-lg leading-relaxed mb-4">
                    <strong>{t('membershipPage.howTo.leaveOther.title')}</strong>
                  </p>
                  <p className="text-base leading-relaxed mb-4">
                    {t('membershipPage.howTo.leaveOther.text')} <a href="https://www.kirken.no/innmelding" target="_blank" rel="noopener noreferrer" className="text-nature-green underline hover:no-underline">kirken.no/innmelding</a>
                  </p>
                </div>

                <div className="text-center">
                  <Link to={localePath('/bli-medlem')}>
                    <Button size="lg" className="mb-4">{t('membershipPage.howTo.cta')}</Button>
                  </Link>
                  <p className="text-sm text-muted-foreground">{t('membershipPage.howTo.ctaSubtext')}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-8">
                <h2 className="text-3xl font-serif font-semibold mb-6 text-nature-green">{t('membershipPage.benefits.title')}</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <ul className="space-y-3 text-lg">
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-nature-green rounded-full mt-3 mr-3 flex-shrink-0"></span>
                        {t('membershipPage.benefits.ceremonies')}
                      </li>
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-nature-green rounded-full mt-3 mr-3 flex-shrink-0"></span>
                        {t('membershipPage.benefits.digital')}
                      </li>
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-nature-green rounded-full mt-3 mr-3 flex-shrink-0"></span>
                        {t('membershipPage.benefits.knowledge')}
                      </li>
                    </ul>
                  </div>
                  <div>
                    <ul className="space-y-3 text-lg">
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-nature-green rounded-full mt-3 mr-3 flex-shrink-0"></span>
                        {t('membershipPage.benefits.news')}
                      </li>
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-nature-green rounded-full mt-3 mr-3 flex-shrink-0"></span>
                        {t('membershipPage.benefits.meetings')}
                      </li>
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-nature-green rounded-full mt-3 mr-3 flex-shrink-0"></span>
                        {t('membershipPage.benefits.spiritual')}
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-8">
                <h2 className="text-2xl font-serif font-semibold mb-4 text-nature-green">Utmelding</h2>
                <p className="text-lg leading-relaxed">
                  For utmelding av Naturfolk, send epost med navn og registrert epostadresse til{' '}
                  <a href="mailto:post@naturfolk.org" className="text-primary underline hover:no-underline">post@naturfolk.org</a>.
                  Oppgi gjerne årsak om ønskelig.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-8">
                <h2 className="text-3xl font-serif font-semibold mb-8 text-nature-green">{t('membershipPage.faq.title')}</h2>
                <div className="space-y-6">
                  {faqData.map((item, i) => (
                    <div key={i}>
                      <h3 className="text-lg font-semibold text-nature-brown mb-2">{item.q}</h3>
                      <p className="text-base leading-relaxed text-muted-foreground">{item.a}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-8 text-center">
                <h2 className="text-3xl font-serif font-semibold mb-6 text-nature-green">{t('membershipPage.questions.title')}</h2>
                <p className="text-lg leading-relaxed mb-6">{t('membershipPage.questions.text')}</p>
                <a href="mailto:post@naturfolk.org">
                  <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                    {t('membershipPage.questions.cta')}
                  </Button>
                </a>
              </CardContent>
            </Card>

          </div>
        </div>
      </section>

      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Medlemskap;
