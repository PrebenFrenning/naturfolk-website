import React from 'react';
import { Leaf, Users, Globe } from 'lucide-react';

const AboutSection = () => {
  return (
    <section id="about" className="section-padding bg-white">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-semibold mb-6">Om Naturfolk</h2>
          <div className="w-24 h-1 bg-nature-green mx-auto mb-6"></div>
          <p className="text-lg text-balance">
            Naturfolk er en bevegelse som inspirerer mennesker til å gjenoppdage sitt forhold til naturen gjennom ekte naturopplevelser, fellesskap og sesongbasert livsrytme.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <h3 className="text-2xl md:text-3xl font-serif font-semibold mb-6">Vår Visjon</h3>
            <p className="mb-6">
              Vi drømmer om en verden hvor mennesker lever i dyp forbindelse med naturen, seg selv og hverandre. Gjennom våre samlinger og aktiviteter skaper vi rom for tilhørighet, tilstedeværelse og indre vekst.
            </p>
            <p className="mb-8">
              Naturfolk er et fellesskap i vekst som søker å gjenopplive gamle tradisjoner og visdom, og samtidig skape nye former for livskraftig samspill med jorda og dens sykluser.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-nature-sage rounded-full flex items-center justify-center mb-4">
                  <Leaf className="text-nature-green" size={24} />
                </div>
                <h4 className="font-semibold mb-2">Naturforbindelse</h4>
              </div>
              
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-nature-sage rounded-full flex items-center justify-center mb-4">
                  <Users className="text-nature-green" size={24} />
                </div>
                <h4 className="font-semibold mb-2">Fellesskap</h4>
              </div>
              
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-nature-sage rounded-full flex items-center justify-center mb-4">
                  <Globe className="text-nature-green" size={24} />
                </div>
                <h4 className="font-semibold mb-2">Villmarkserfaringer</h4>
              </div>
            </div>
          </div>
          
          <div className="order-1 md:order-2">
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1501854140801-50d01698950b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2400&q=80" 
                alt="Naturlandskap" 
                className="w-full h-full object-cover rounded-lg shadow-lg"
              />
              <div className="absolute -bottom-8 -left-8 bg-nature-green p-6 rounded-lg shadow-lg hidden md:block">
                <p className="text-white font-serif text-xl">"Vi gjenoppretter forbindelsen til vill natur."</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
