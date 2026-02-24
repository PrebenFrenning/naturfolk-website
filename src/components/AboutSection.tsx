import React from 'react';
import visionImage from '@/assets/vision-yggdrasil.jpg';
import { useLanguage } from '@/lib/i18n/LanguageContext';

const AboutSection = () => {
  const { t } = useLanguage();
  
  return (
    <section id="about" className="pt-10 md:pt-14 pb-0 bg-white">
      <div className="container-custom pb-10 md:pb-14">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-semibold mb-6">{t('about.title')}</h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-8"></div>
          <p className="text-lg md:text-xl leading-relaxed text-muted-foreground">
            {t('about.text')}
          </p>
        </div>
      </div>
      <div className="w-full">
        <img
          src={visionImage}
          alt="Kvinne i strikkejakke ser ut over en bekk i norsk fjellandskap"
          className="w-full h-[400px] md:h-[500px] object-cover object-bottom"
        />
      </div>
    </section>
  );
};

export default AboutSection;
