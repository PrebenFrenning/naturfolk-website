import React from 'react';
import visionGathering from '@/assets/vision-gathering.jpg';
import { useLanguage } from '@/lib/i18n/LanguageContext';

const VisionSection = () => {
  const { t } = useLanguage();
  
  return (
    <section className="bg-white">
      <div className="py-10 md:py-14 container-custom">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-semibold mb-6">{t('vision.title')}</h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-lg leading-relaxed text-muted-foreground">{t('vision.text')}</p>
        </div>
      </div>
      <div className="w-full">
        <img
          src={visionGathering}
          alt="Fellesskap samlet rundt bål i lavvo"
          className="w-full h-[400px] md:h-[500px] object-cover"
        />
      </div>
    </section>
  );
};

export default VisionSection;
