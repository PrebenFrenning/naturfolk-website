import React from 'react';
import visionImage from '@/assets/vision-yggdrasil.jpg';

const AboutSection = () => {
  return (
    <section id="about" className="pt-10 md:pt-14 pb-0 bg-white">
      <div className="container-custom pb-10 md:pb-14">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-semibold mb-6">Om Naturfolk</h2>
          <div className="w-24 h-1 bg-nature-green mx-auto mb-8"></div>
          <p className="text-base md:text-lg leading-relaxed text-muted-foreground">
            Naturfolk er en levende vei som forener fortidens visdom med samtidens livsutfordringer. I en tid der naturen roper om vern, inviterer vårt fellesskap deg til å gjenoppdage vår urnordiske ånd – slik den springer ut av vårt naturlandskap og livet vi lever i balanse med vår indre natur og naturen omkring oss.
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
