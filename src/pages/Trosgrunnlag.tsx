import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, List } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { cn } from '@/lib/utils';

const Trosgrunnlag = () => {
  const [activeSection, setActiveSection] = useState('');
  const [showToc, setShowToc] = useState(false);

  const sections = [
    { id: 'erklaring', title: 'Erklaring' },
    { id: 'naturfolkets-ed', title: 'Naturfolkets Ed' },
    { id: 'trosgrunnlag', title: '1. Trosgrunnlag' },
    { id: 'verdensbilde', title: '2. Verdensbilde og landskapets betydning' },
    { id: 'religioss-praksis', title: '3. Religiøs praksis - Åndereiser og kontakt' },
    { id: 'naturens-hellighet', title: '4. Naturens hellighet' },
    { id: 'seremonier', title: '5. Seremonier og overgangsritualer' },
    { id: 'forfedre', title: '6. Vi hedrer våre forfedre' },
    { id: 'maskulin-feminin', title: '7. Hellig maskulin og feminin kraft' },
    { id: 'helingsritualer', title: '8. Helingsritualer og renselse' },
    { id: 'hellige-steder', title: '9. Hellige steder' },
    { id: 'beskyttelse', title: '10. Beskyttelse mot destruktive krefter' },
    { id: 'etikk', title: '11. Etikk og livssyn' },
    { id: 'myter', title: '12. Myter og overlevering' },
    { id: 'naturfolks-rett', title: '13. Naturfolks rett' },
    { id: 'misjonering', title: '14. Misjonering og rekruttering' },
    { id: 'barn', title: '15. Barn og kunnskapsdeling' },
    { id: 'aandelig-fellesskap', title: '16. Åndelig fellesskap og praksis' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;
      
      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;
          
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setShowToc(false);
    }
  };

  return (
    <div className="min-h-screen bg-nature-offwhite">
      <Navbar />
      
      {/* Header */}
      <div className="bg-nature-green text-white py-24 mt-20">
        <div className="container-custom">
          <div className="flex items-center gap-4 mb-6">
            <Link to="/" className="flex items-center gap-2 text-white/80 hover:text-white transition-custom">
              <ArrowLeft size={20} />
              Tilbake til forsiden
            </Link>
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-semibold mb-4">
            Trosgrunnlag & Erklæring
          </h1>
          <p className="text-xl text-white/90 mb-8 max-w-2xl">
            Forankret i førkristen, urnordisk andelighet
          </p>
          
          {/* Table of Contents Toggle */}
          <button
            onClick={() => setShowToc(!showToc)}
            className="btn-secondary flex items-center gap-2 bg-white/10 border-white/30 text-white hover:bg-white/20"
          >
            <List size={20} />
            Innholdsfortegnelse
          </button>
        </div>
      </div>

      {/* Table of Contents */}
      {showToc && (
        <div className="bg-white border-b border-nature-beige sticky top-20 z-40 shadow-sm">
          <div className="container-custom py-6">
            <h3 className="text-lg font-semibold text-nature-brown mb-4">Innhold:</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-2">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={cn(
                    "text-left p-2 rounded text-sm transition-custom hover:bg-nature-beige",
                    activeSection === section.id ? "bg-nature-green text-white" : "text-nature-brown"
                  )}
                >
                  {section.title}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="container-custom py-16">
        <div className="max-w-4xl mx-auto">
          
          {/* Erklaring */}
          <section id="erklaring" className="mb-16">
            <h2 className="text-3xl font-serif font-semibold text-nature-brown mb-8">Erklæring</h2>
            <div className="prose prose-lg max-w-none">
              <ol className="grid md:grid-cols-2 gap-4 text-nature-brown">
                <li>Trosgrunnlag</li>
                <li>Verdensbilde og landskapets betydning</li>
                <li>Religiøs praksis - Åndereiser og kontakt</li>
                <li>Naturens hellighet</li>
                <li>Seremonier og overgangsritualer</li>
                <li>Vi hedrer våre forfedre</li>
                <li>Hellig maskulin og feminin kraft</li>
                <li>Helingsritualer og renselse</li>
                <li>Hellige steder</li>
                <li>Beskyttelse mot destruktive krefter</li>
                <li>Etikk og livssyn</li>
                <li>Myter og overlevering</li>
                <li>Naturfolks rett</li>
                <li>Misjonering og rekruttering</li>
                <li>Barn og kunnskapsdeling</li>
                <li>Åndelig fellesskap og praksis</li>
              </ol>
            </div>
          </section>

          {/* Naturfolkets Ed */}
          <section id="naturfolkets-ed" className="mb-16">
            <h2 className="text-3xl font-serif font-semibold text-nature-brown mb-8">Naturfolkets Ed</h2>
            <div className="prose prose-lg max-w-none text-nature-brown space-y-6">
              <p>
                Trossamfunnet Naturfolk bekjenner seg til en urnordisk andelig vei der livskraften og åndskraften er kjernen i vår tro. Livskraften er den iboende, selvopprettholdende kraften i alt levende. Åndskraften er den universelle, gjennomstrømmende kraften som forbinder alt med alt. Disse kreftene er likeverdige og utfyller hverandre. Vår tro bygger på dualiteten mellom disse kreftene, uttrykt gjennom naturens sykluser av liv, død og gjenfødelse. Vi er forankret i et verdensbilde der mennesket er en del av en større kosmisk helhet, og vår religiøse praksis skjer i samspill med naturen, dens ånder og våre forfedre.
              </p>
              <p>
                Vår åndelige arv har gjennom århundrer vært marginalisert og undertrykt, men lever videre gjennom oss. Den praktiseres nå i fellesskap, i en form som er tro mot kjernen, men tilpasset vår tid og våre omgivelser.
              </p>
            </div>
          </section>

          {/* 1. Trosgrunnlag */}
          <section id="trosgrunnlag" className="mb-16">
            <h2 className="text-3xl font-serif font-semibold text-nature-brown mb-8">1. Trosgrunnlag</h2>
            <div className="prose prose-lg max-w-none text-nature-brown space-y-6">
              <p>
                Vi tror at verden er lagdelt med flere nivåer av virkelighet. Vi tror at verden er besjelet, at naturen er hellig, og at mennesket er en del av et større kosmisk kretsløp.
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Besjelet:</strong> Vesener, steder, planter og dyr har egenverdi og iboende livskraft.</li>
                <li><strong>Hellig:</strong> Alt levende er innvevd i en større sammenheng, der universelle mønstre speiles i det enkelte.</li>
              </ul>
              <p>
                Troen er rotfestet i direkte erfaring med Nordens landskap, årstider og åndelige nærvær. Vi praktiserer gammel tro og væremåte i en moderne kontekst, med felles ritualer som gjenkjennes på tvers av landskap, men der verktøy, symboler og uttrykk tilpasses lokale tradisjoner, natur og kultur.
              </p>
            </div>
          </section>

          {/* 2. Verdensbilde og landskapets betydning */}
          <section id="verdensbilde" className="mb-16">
            <h2 className="text-3xl font-serif font-semibold text-nature-brown mb-8">2. Verdensbilde og landskapets betydning</h2>
            <div className="prose prose-lg max-w-none text-nature-brown space-y-6">
              <p>Verden forstås som lagdelt:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Mellomverden:</strong> Mennesker, planter, dyr og naturvesener.</li>
                <li><strong>Oververden:</strong> Guder og forfedre.</li>
                <li><strong>Underverden:</strong> Dødens og de destruktive kreftenes rike.</li>
              </ul>
              <p>
                Vår tro og kultur er formet av vårt nordlige landskap og årstider med store kontraster. Fjell, skog, vidder og hav former vår livsrytme, våre historier og vår åndelige forståelse. Vi trenger vårt landskap for å være i full kraft, og derfor er landskapet hellig. Natur, kultur og åndelighet må gå hånd i hånd.
              </p>
            </div>
          </section>

          {/* 3. Religiøs praksis */}
          <section id="religioss-praksis" className="mb-16">
            <h2 className="text-3xl font-serif font-semibold text-nature-brown mb-8">3. Religiøs praksis - Åndereiser og kontakt</h2>
            <div className="prose prose-lg max-w-none text-nature-brown space-y-6">
              <p>Åndereiser er sentrale for kontakt med våre forfedre. Praksisen kan omfatte:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Tromming, joik og seidsang.</li>
                <li>Bruk av ritualobjekter som stav, tromme og kniv både som verktøy og beskytter.</li>
                <li>Bruk av runer og hellige symboler som bærere av åndelig kraft og budskap.</li>
                <li>Utesitting, stillhet og visjonssøk.</li>
              </ul>
              <p>
                Åndereiser veileder, varsler og styrker, og er verktøy for heling, transformasjon, visjon og beslutningstaking.
              </p>
            </div>
          </section>

          {/* 4. Naturens hellighet */}
          <section id="naturens-hellighet" className="mb-16">
            <h2 className="text-3xl font-serif font-semibold text-nature-brown mb-8">4. Naturens hellighet</h2>
            <div className="prose prose-lg max-w-none text-nature-brown space-y-6">
              <p>
                Naturen er også gudenes, forfedrenes og åndenes hjem. Våre forfedres ånder vandrer fortsatt i landskapet. Hellige steder inkluderer blant annet fjell, gamle trær, offersteiner, gravhauger, kilder, og samspill med naturåndene. Stedene har kraft fordi åndene bor der, fordi forfedres graver finnes der, eller fordi de er blitt styrket gjennom åndelig praksis over lang tid.
              </p>
            </div>
          </section>

          {/* Continue with remaining sections... I'll add the rest */}
          <section id="seremonier" className="mb-16">
            <h2 className="text-3xl font-serif font-semibold text-nature-brown mb-8">5. Seremonier og overgangsritualer</h2>
            <div className="prose prose-lg max-w-none text-nature-brown space-y-6">
              <p>Vi markerer livets sykluser: fødsel, pubertet, partnerskap, visdomstid og død. Praksis kan omfatte:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Årstidsmarkeringer</li>
                <li>Ofringer ved hellige steder</li>
                <li>Hedring av forfedre</li>
                <li>Åndereiser</li>
                <li>Utesitting</li>
                <li>Seidsang</li>
                <li>Transformative overgangsriter</li>
                <li>Rituell sauna</li>
                <li>Sirkelarbeid og dialog</li>
              </ul>
            </div>
          </section>

          {/* Add placeholder sections for the remaining content */}
          {sections.slice(5).map((section, index) => (
            <section key={section.id} id={section.id} className="mb-16">
              <h2 className="text-3xl font-serif font-semibold text-nature-brown mb-8">{section.title}</h2>
              <div className="prose prose-lg max-w-none text-nature-brown space-y-6">
                <p>
                  [Innhold for denne seksjonen vil bli lagt til basert på det fullstendige dokumentet]
                </p>
              </div>
            </section>
          ))}

        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Trosgrunnlag;