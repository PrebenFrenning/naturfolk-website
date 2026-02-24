import React from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Leaf, Map, Users, Star } from 'lucide-react';
import dyrkingImage from '@/assets/temagruppe-dyrking.jpg';
import helligeStederImage from '@/assets/temagruppe-hellige-steder.jpg';
import natursamfunnImage from '@/assets/temagruppe-natursamfunn.jpg';
import ritualerImage from '@/assets/temagruppe-ritualer.jpg';
import { useLanguage } from '@/lib/i18n/LanguageContext';

const Temagrupper = () => {
  const { t, localePath } = useLanguage();
  
  const themeGroups = [
    {
      icon: <Leaf size={48} />,
      title: t('themeGroups.cultivation.title'),
      description: t('themeGroups.cultivation.description'),
      detailedInfo: t('themeGroups.cultivation.detailed'),
      image: dyrkingImage
    },
    {
      icon: <Map size={48} />,
      title: t('themeGroups.sacredPlaces.title'),
      description: t('themeGroups.sacredPlaces.description'),
      detailedInfo: t('themeGroups.sacredPlaces.detailed'),
      image: helligeStederImage
    },
    {
      icon: <Users size={48} />,
      title: t('themeGroups.natureCommunity.title'),
      description: t('themeGroups.natureCommunity.description'),
      detailedInfo: t('themeGroups.natureCommunity.detailed'),
      image: natursamfunnImage
    },
    {
      icon: <Star size={48} />,
      title: t('themeGroups.rituals.title'),
      description: t('themeGroups.rituals.description'),
      detailedInfo: t('themeGroups.rituals.detailed'),
      image: ritualerImage
    }
  ];

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>{t('themeGroups.hero.title')} - Naturfolk</title>
      </Helmet>

      <Navbar />

      <section className="relative pt-32 pb-16 bg-gradient-to-b from-nature-sage/30 to-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-serif font-semibold mb-6">{t('themeGroups.hero.title')}</h1>
            <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
            <p className="text-lg md:text-xl text-muted-foreground">{t('themeGroups.hero.subtitle')}</p>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid gap-12">
            {themeGroups.map((group, index) => (
              <Card key={index} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className={`grid md:grid-cols-2 gap-8 ${index % 2 === 1 ? 'md:grid-flow-dense' : ''}`}>
                    <div className={`p-8 md:p-12 flex flex-col justify-center ${index % 2 === 1 ? 'md:col-start-2' : ''}`}>
                      <div className="text-nature-green mb-6">{group.icon}</div>
                      <h2 className="text-3xl font-serif font-semibold mb-4">{group.title}</h2>
                      <p className="text-lg mb-4 text-foreground/80">{group.description}</p>
                      <p className="text-base text-muted-foreground leading-relaxed">{group.detailedInfo}</p>
                    </div>
                    <div className={`relative overflow-hidden ${index % 2 === 1 ? 'md:col-start-1' : ''}`}>
                      <img src={group.image} alt={group.title} className="w-full h-64 md:h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-nature-beige/30">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-semibold mb-6">{t('themeGroups.cta.title')}</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">{t('themeGroups.cta.text')}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={localePath('/medlemskap')} className="btn-primary">{t('themeGroups.cta.join')}</a>
            <a href={localePath('/contact')} className="btn-secondary">{t('themeGroups.cta.contact')}</a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Temagrupper;
