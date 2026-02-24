import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ScrollToTop from '../components/ScrollToTop';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import heroImage from '@/assets/medlemskap-hero-new.jpg';
import { useLanguage } from '@/lib/i18n/LanguageContext';

const Medlemskap = () => {
  const { t, localePath } = useLanguage();
  
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <section className="relative min-h-[50vh] flex items-center justify-center">
        <img src={heroImage} alt="Fellesskap rundt bål i norsk natur" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/60"></div>
        <div className="relative z-10 container-custom">
          <div className="max-w-4xl mx-auto text-center text-white mt-16">
            <h1 className="text-2xl md:text-4xl font-serif font-bold mb-6">{t('membershipPage.hero.title')}</h1>
            <p className="text-base md:text-lg leading-relaxed mb-8">{t('membershipPage.hero.subtitle')}</p>
            <Link to={localePath('/bli-medlem')}>
              <Button className="bg-nature-green hover:bg-nature-green/90 text-white px-8 py-3 text-lg">
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
                  <p className="text-lg leading-relaxed">{t('membershipPage.types.main.text')}</p>
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
              <CardContent className="p-8 text-center">
                <h2 className="text-3xl font-serif font-semibold mb-6 text-nature-green">{t('membershipPage.questions.title')}</h2>
                <p className="text-lg leading-relaxed mb-6">{t('membershipPage.questions.text')}</p>
                <a href="mailto:post@naturfolk.org">
                  <Button size="lg" className="bg-nature-green hover:bg-nature-green/90 text-white">
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
