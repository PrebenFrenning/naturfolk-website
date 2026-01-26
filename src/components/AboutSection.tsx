import React from 'react';

const AboutSection = () => {
  return (
    <section id="about" className="section-padding bg-white">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-semibold mb-6">Om Naturfolk</h2>
          <div className="w-24 h-1 bg-nature-green mx-auto mb-8"></div>
          <p className="text-lg md:text-xl leading-relaxed text-muted-foreground">
            Naturfolk er en levende vei som forener fortidens visdom med samtidens livsutfordringer. I en tid der naturen roper om vern, inviterer vårt fellesskap deg til å gjenoppdage vår urnordiske ånd – slik den springer ut av vårt naturlandskap og livet vi lever i balanse med vår indre natur og naturen omkring oss.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
