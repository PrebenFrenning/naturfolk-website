import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ScrollToTop from '../components/ScrollToTop';
import { Card, CardContent } from '../components/ui/card';
import { Leaf } from 'lucide-react';
import heroImage from '@/assets/vision-gathering.jpg';
import { useLanguage } from '@/lib/i18n/LanguageContext';

const NatureDivider = () => (
  <div className="flex items-center justify-center gap-3">
    <div className="w-12 h-[1px] bg-nature-green/30"></div>
    <Leaf className="text-nature-green/50" size={18} strokeWidth={1.5} />
    <div className="w-12 h-[1px] bg-nature-green/30"></div>
  </div>
);

const About = () => {
  const { t, localePath } = useLanguage();
  
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <section className="relative min-h-[50vh] flex items-center justify-center">
        <img src={heroImage} alt="Mektig nordnorsk fjordlandskap med bål" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/60"></div>
        <div className="relative z-10 container-custom">
          <div className="max-w-4xl mx-auto text-center text-white mt-16">
            <h1 className="text-2xl md:text-4xl font-serif font-bold mb-6">{t('aboutPage.hero.title')}</h1>
            <div className="w-24 h-1 bg-white mx-auto mb-8"></div>
            <p className="text-base md:text-lg leading-relaxed">{t('aboutPage.hero.subtitle')}</p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-nature-offwhite">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto space-y-12">
            
            <Card>
              <CardContent className="p-8">
                <h2 className="text-3xl font-serif font-semibold mb-6 text-nature-green">{t('aboutPage.forAll.title')}</h2>
                <p className="text-lg leading-relaxed mb-6">{t('aboutPage.forAll.p1')}</p>
                <p className="text-lg leading-relaxed">{t('aboutPage.forAll.p2')}</p>
              </CardContent>
            </Card>

            <NatureDivider />

            <Card>
              <CardContent className="p-8">
                <h2 className="text-3xl font-serif font-semibold mb-6 text-nature-green">{t('aboutPage.beginning.title')}</h2>
                <p className="text-lg leading-relaxed mb-4">{t('aboutPage.beginning.p1')}</p>
                <p className="text-lg leading-relaxed">{t('aboutPage.beginning.p2')}</p>
              </CardContent>
            </Card>

            <NatureDivider />

            <Card>
              <CardContent className="p-8">
                <h2 className="text-3xl font-serif font-semibold mb-6 text-nature-green">{t('aboutPage.faithCommunity.title')}</h2>
                <p className="text-lg leading-relaxed mb-4">{t('aboutPage.faithCommunity.p1')}</p>
                <p className="text-lg leading-relaxed mb-4">{t('aboutPage.faithCommunity.p2')}</p>
                <p className="text-lg leading-relaxed mb-4">{t('aboutPage.faithCommunity.p3')}</p>
                <p className="text-lg leading-relaxed">{t('aboutPage.faithCommunity.p4')}</p>
              </CardContent>
            </Card>

            <NatureDivider />

            <Card>
              <CardContent className="p-8">
                <h2 className="text-3xl font-serif font-semibold mb-6 text-nature-green">{t('aboutPage.community.title')}</h2>
                <p className="text-lg leading-relaxed mb-4">{t('aboutPage.community.p1')}</p>
                <p className="text-lg leading-relaxed">{t('aboutPage.community.p2')}</p>
              </CardContent>
            </Card>

            <NatureDivider />

            <Card>
              <CardContent className="p-8">
                <h2 className="text-3xl font-serif font-semibold mb-6 text-nature-green">{t('aboutPage.contact.title')}</h2>
                <p className="text-lg leading-relaxed mb-4">
                  {t('aboutPage.contact.p1')} <a href="mailto:post@naturfolk.org" className="text-nature-green underline hover:no-underline">post@naturfolk.org</a>
                </p>
                <p className="text-lg leading-relaxed mb-2">
                  {t('aboutPage.contact.readFaith')} <a href={localePath('/trosgrunnlag')} className="text-nature-green underline hover:no-underline">{t('aboutPage.contact.faithLink')}</a>
                </p>
                <p className="text-lg leading-relaxed">{t('aboutPage.contact.membershipText')}</p>
              </CardContent>
            </Card>

            <NatureDivider />

            <Card>
              <CardContent className="p-8">
                <h2 className="text-3xl font-serif font-semibold mb-6 text-nature-green">{t('aboutPage.board.title')}</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <p className="text-lg"><strong>Lone Beate Ebeltoft</strong> - {t('aboutPage.board.chair')}</p>
                    <p className="text-lg"><strong>Preben Frenning</strong> - {t('aboutPage.board.member')}</p>
                    <p className="text-lg"><strong>Frode Tobiassen</strong> - {t('aboutPage.board.member')}</p>
                    <p className="text-lg"><strong>Sylvi Katrin Brandsæther</strong> - {t('aboutPage.board.member')}</p>
                    <p className="text-lg"><strong>Tord Viken</strong> - {t('aboutPage.board.member')}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-lg"><strong>Trine Lise I. Eilertsen</strong> - {t('aboutPage.board.member')}</p>
                    <p className="text-lg"><strong>Christer T. Norman</strong> - {t('aboutPage.board.member')}</p>
                    <p className="text-lg"><strong>André Fagerheim</strong> - {t('aboutPage.board.deputy')}</p>
                    <p className="text-lg"><strong>Jorunn Iren Husby</strong> - {t('aboutPage.board.deputy')}</p>
                  </div>
                </div>
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

export default About;
