import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ScrollToTop from '../components/ScrollToTop';
import { Card, CardContent } from '../components/ui/card';
import omOssHero from '@/assets/om-oss-hero.jpg';

const About = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[350px] flex items-end justify-center pb-12">
        <div className="absolute inset-0 z-0">
          <img 
            src={omOssHero} 
            alt="Samling i villreinens rike, norsk natur" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/50"></div>
        </div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6">
            Om Oss
          </h1>
          <div className="w-24 h-1 bg-white mx-auto mb-8"></div>
          <p className="text-xl md:text-2xl leading-relaxed">
            Trossamfunnet Naturfolk er for alle som ser menneske, åndelighet og natur som en helhet.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-nature-offwhite">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto space-y-12">
            
            {/* Introduction */}
            <Card>
              <CardContent className="p-8">
                <p className="text-lg leading-relaxed mb-6">
                  Trossamfunnet Naturfolk er for alle som ser menneske, åndelighet og natur som en helhet. For dem som søker åndelig erfaring, utvikling, harmoni, mestring og glede i samspill med åndskrefter og naturkrefter.
                </p>
                <p className="text-lg leading-relaxed">
                  Natur, kultur og åndelighet er uløselig knyttet sammen hos Naturfolk, og vår åndelighet vil derfor finne sitt særegne uttrykk i de forskjellige naturlandskapene. Naturfolk trenger naturen for å utøve vår tro, vår kultur og vårt levesett. Naturen er vårt livskompass og veileder oss i våre valg i hverdagen og i vår trosutøvelse.
                </p>
              </CardContent>
            </Card>

            {/* Begynnelsen */}
            <Card>
              <CardContent className="p-8">
                <h2 className="text-3xl font-serif font-semibold mb-6 text-nature-green">Begynnelsen</h2>
                <p className="text-lg leading-relaxed mb-4">
                  Det startet i en sirkel rundt bålet i en làvvu i nord i en tid preget av mørke skyer og usikker fremtid for både folk og natur. Men vi ønsket å se bortenfor de mørke skyene og verne om det mest verdifulle vi har, naturen og det hellige naturlandskapet som har gjort og gjør oss til dem vi er.
                </p>
                <p className="text-lg leading-relaxed">
                  Vårt trosgrunnlag ble til i en prosess hvor fem forskjellige stemmer, med forskjellig bakgrunn, fant frem til det som er blitt kjernen i vår tro. Ut fra dette håper vi det vil vokse frem et livskraftig åndelig fellesskap langs fjord, fjell, skog, mark, by og landsby som deler vår tro og våre verdier – Naturfolk.
                </p>
              </CardContent>
            </Card>

            {/* Trossamfunnet */}
            <Card>
              <CardContent className="p-8">
                <h2 className="text-3xl font-serif font-semibold mb-6 text-nature-green">Trossamfunnet</h2>
                <p className="text-lg leading-relaxed mb-4">
                  Vi ble offisielt grunnlagt som trossamfunn i 2023 og hadde vår første samling senhøsten samme år. Vi har valgt å være et trossamfunn fordi naturen er hellig for oss, og fordi vi ser på natur og naturlandskap som besjelet noe større en summen av all delene i et rent materialistisk og biologisk perspektiv.
                </p>
                <p className="text-lg leading-relaxed mb-4">
                  For oss hører natur, kultur og åndlighet sammen i en helhet, hvor vi som mennesker har vår plass. Vi ser det som livsnødvendig at vi nå sammen søker å komme i balanse med naturen som kilde til alt liv og åndelighet, og dermed fundamentet for vår menneskelighet.
                </p>
                <p className="text-lg leading-relaxed mb-4">
                  Natur, kultur og åndelighet er uløselig knyttet sammen hos Naturfolk, og vår åndelighet vil derfor finne sitt særegne uttrykk i de forskjellige naturlandskapene. Naturfolk trenger naturen for å utøve vår tro, vår kultur og vårt levesett. Naturen er vårt livskompass og veileder oss i våre valg i hverdagen og i vår trosutøvelse.
                </p>
                <p className="text-lg leading-relaxed">
                  Vi er ikke-dogmatiske og ærer og lar oss inspirere av alle de opprinnelige åndstradisjoner som har sitt utgangspunkt i naturlandskapene her i nord. Samtidig så finner vi vår egen åndelige vei i samklang med hvem og hvor vi er i dag, og begynner der all menneskelig åndelig og religiøs praksis hadde sin begynnelse: naturen.
                </p>
              </CardContent>
            </Card>

            {/* Fellesskapet */}
            <Card>
              <CardContent className="p-8">
                <h2 className="text-3xl font-serif font-semibold mb-6 text-nature-green">Fellesskapet</h2>
                <p className="text-lg leading-relaxed mb-4">
                  Sentralt i dette arbeidet er et fellesskap som er rotfestet i våre medlemmers ulike lokale naturlandskap, slik at vi som naturfolk representere landets naturfolk fra det dypeste sør til ytterste nord. Samlinger, felles ritualer, kunnskapsdeling, aktiv naturtilknyting og felles aktivitet for å styrke våre verdier og beskytte naturens hellighet – er vesentlig for det fellesskapet vi bygger.
                </p>
                <p className="text-lg leading-relaxed">
                  Vi ønsker deg som deler våre verdier varmt velkommen til å bli en del av et voksende fellesskap på naturens side.
                </p>
              </CardContent>
            </Card>

            {/* Contact */}
            <Card>
              <CardContent className="p-8">
                <h2 className="text-3xl font-serif font-semibold mb-6 text-nature-green">Kontakt oss</h2>
                <p className="text-lg leading-relaxed mb-4">
                  For spørsmål og kontakt med oss: <a href="mailto:post@naturfolk.org" className="text-nature-green underline hover:no-underline">post@naturfolk.org</a>
                </p>
                <p className="text-lg leading-relaxed mb-2">
                  Du kan lese <a href="/trosgrunnlag" className="text-nature-green underline hover:no-underline">vårt trosgrunnlag her</a>
                </p>
                <p className="text-lg leading-relaxed">
                  Du kan lese om medlemskap her
                </p>
              </CardContent>
            </Card>

            {/* Styret */}
            <Card>
              <CardContent className="p-8">
                <h2 className="text-3xl font-serif font-semibold mb-6 text-nature-green">Styret</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <p className="text-lg"><strong>Lone Beate Ebeltoft</strong> - Styreleder</p>
                    <p className="text-lg"><strong>Preben Frenning</strong> - Styremedlem</p>
                    <p className="text-lg"><strong>Frode Tobiassen</strong> - Styremedlem</p>
                    <p className="text-lg"><strong>Sylvi Katrin Brandsæther</strong> - Styremedlem</p>
                    <p className="text-lg"><strong>Tord Viken</strong> - Styremedlem</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-lg"><strong>Trine Lise I. Eilertsen</strong> - Styremedlem</p>
                    <p className="text-lg"><strong>Christer T. Norman</strong> - Styremedlem</p>
                    <p className="text-lg"><strong>André Fagerheim</strong> - Varamedlem</p>
                    <p className="text-lg"><strong>Jorunn Iren Husby</strong> - Varamedlem</p>
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