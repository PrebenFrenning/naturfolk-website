import React from 'react';
import visionImage from '@/assets/vision-yggdrasil.jpg';

const VisionSection = () => {
  return (
    <section className="pt-0 pb-0 bg-white">
      <div className="container-custom py-10 md:py-14">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-semibold mb-6">Vår visjon</h2>
          <div className="w-24 h-1 bg-nature-green mx-auto mb-6"></div>
          <p className="text-base leading-relaxed text-muted-foreground">Et fellesskap hvor menneske, ånd og natur inngår i en større helhet. Hvor vi som naturfolk lever i balanse med naturens sykluser, naturlandskapet vi lever i og alt levende. I en gjensidig avhengighet som vi tar ansvar for – hvor dualiteten mellom åndskraft og livskraft uttrykkes i vår levevei, ritualer og seremonier. Et større fellesskap der naturens puls slår i takt med din egen sjel.

          </p>
        </div>
      </div>
      
      <div className="w-full">
        <img
          src={visionImage}
          alt="Kvinne i strikkejakke ser ut over en bekk i norsk fjellandskap"
          className="w-full h-[400px] md:h-[500px] object-cover object-bottom" />

      </div>
    </section>);

};

export default VisionSection;