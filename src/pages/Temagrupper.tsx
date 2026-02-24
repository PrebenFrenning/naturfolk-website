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

const Temagrupper = () => {
  const themeGroups = [
    {
      icon: <Leaf size={48} />,
      title: "Dyrking og sanking",
      description: "Temagruppen for dyrking og sanking deler kunnskap og erfaringer rundt alt man kan spise og gjøre nytte av ellers.",
      detailedInfo: "I denne gruppen utforsker vi naturens rikdom gjennom både tradisjonell og moderne kunnskap om planter. Vi lærer om bærekraftig sanking, identifisering av spiselige planter, bevaring av mattradisjoner og økologisk dyrking. Gruppen møtes regelmessig for å dele erfaringer, organisere sankingsturer og diskutere sesongbaserte dyrkingsmetoder.",
      image: dyrkingImage
    },
    {
      icon: <Map size={48} />,
      title: "Hellige steder",
      description: "Her jobber vi med å kartlegge og dokumentere hellige steder vi kjenner til, med mål om å gi de et hellig vern gjennom bruk og glede.",
      detailedInfo: "Temagruppen for hellige steder arbeider med å identifisere, respektere og beskytte naturområder av åndelig betydning. Vi dokumenterer gamle kultplasser, naturlige helligdommer og steder med særegen energi. Gjennom vårt arbeid søker vi å skape bevissthet om disse stedenes betydning og sikre at de behandles med respekt og ærefrykt for fremtidige generasjoner.",
      image: helligeStederImage
    },
    {
      icon: <Users size={48} />,
      title: "Natursamfunn",
      description: "Øke bevissthet omkring samfunnsbygging basert på Naturfolks kjerneverdier, inspirere til naturnært levesett og skape en visjon for natursamfunn for fremtiden.",
      detailedInfo: "Denne gruppen fokuserer på hvordan vi kan bygge bærekraftige fellesskap i harmoni with naturen. Vi utforsker alternative boformer, økologisk økonomi, selvforsyning og fellesskapsdrevne løsninger. Målet er å inspirere til og konkretisere visjoner for hvordan fremtidens natursamfunn kan se ut, hvor mennesker lever i balanse med naturen og hverandre. Vi trekker inn både kunnskap og praktiske erfaringer i vårt arbeid, med tidsramme 2024-2025, men vi tar den tiden vi behøver.",
      image: natursamfunnImage
    },
    {
      icon: <Star size={48} />,
      title: "Ritualer",
      description: "Her lærer vi om, og utvikler ulike ritualer for enhver anledning og begivenhet.",
      detailedInfo: "Ritualgruppen jobber med å bevare gamle tradisjoner og skape nye meningsfulle ritualer tilpasset moderne liv. Vi utforsker sesongbaserte seremonier, overgangsritualer, naturbaserte helligdager og personlige markeringer. Gjennom ritualer skaper vi sammenheng, mening og dypere forbindelse til naturens sykluser og livets viktige øyeblikk. Alle medlemmer er velkomne til å bidra med egen kunnskap og kreativitet.",
      image: ritualerImage
    }
  ];

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Temagrupper - Naturfolk</title>
        <meta name="description" content="Utforsk våre temagrupper: Dyrking og sanking, Hellige steder, Natursamfunn og Ritualer. Engasjer deg i fellesskap som deler din lidenskap for natur og tradisjon." />
      </Helmet>

      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 bg-gradient-to-b from-nature-sage/30 to-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-serif font-semibold mb-6">Våre Temagrupper</h1>
            <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
            <p className="text-lg md:text-xl text-muted-foreground">
              Bli med i våre temagrupper og utforsk ulike aspekter av naturbasert livsførsel sammen med likesinnede. 
              Hver gruppe har sine egne møter, aktiviteter og prosjekter.
            </p>
          </div>
        </div>
      </section>

      {/* Theme Groups Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid gap-12">
            {themeGroups.map((group, index) => (
              <Card key={index} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className={`grid md:grid-cols-2 gap-8 ${index % 2 === 1 ? 'md:grid-flow-dense' : ''}`}>
                    <div className={`p-8 md:p-12 flex flex-col justify-center ${index % 2 === 1 ? 'md:col-start-2' : ''}`}>
                      <div className="text-nature-green mb-6">
                        {group.icon}
                      </div>
                      <h2 className="text-3xl font-serif font-semibold mb-4">{group.title}</h2>
                      <p className="text-lg mb-4 text-foreground/80">{group.description}</p>
                      <p className="text-base text-muted-foreground leading-relaxed">{group.detailedInfo}</p>
                    </div>
                    <div className={`relative overflow-hidden ${index % 2 === 1 ? 'md:col-start-1' : ''}`}>
                      <img 
                        src={group.image} 
                        alt={group.title}
                        className="w-full h-64 md:h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-nature-beige/30">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-semibold mb-6">Bli med i vårt fellesskap</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Som medlem av Naturfolk får du tilgang til alle våre temagrupper. Engasjer deg i de gruppene som appellerer til deg, eller utforsk dem alle.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/medlemskap" className="btn-primary">
              Bli medlem
            </a>
            <a href="/kontakt" className="btn-secondary">
              Kontakt oss
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Temagrupper;
