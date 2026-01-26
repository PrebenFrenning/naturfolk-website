import React from 'react';

const VisionSection = () => {
  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-serif font-semibold mb-6">Vår visjon</h2>
            <div className="w-24 h-1 bg-nature-green mb-6"></div>
            <p className="text-lg leading-relaxed text-muted-foreground">
              Et samfunn hvor menneske, ånd og natur inngår i en større helhet. Hvor vi som naturfolk lever i balanse med naturens sykluser, naturlandskapet vi lever i og alt levende. I en gjensidig avhengighet som vi tar ansvar for – hvor dualiteten mellom åndskraft og livskraft uttrykkes i vår levevei, ritualer og seremonier. Et større fellesskap der naturens puls slår i takt med din egen sjel.
            </p>
          </div>
          
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1518495973542-4542c06a5843?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80" 
              alt="Sollys gjennom trær i skogen" 
              className="w-full h-full object-cover rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisionSection;
