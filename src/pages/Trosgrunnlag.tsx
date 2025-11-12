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
      <div className="bg-nature-green text-white py-16">
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
      <div className="container-custom py-8 md:py-16">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm p-6 md:p-12">
          
          {/* Erklæring */}
          <section id="erklaring" className="mb-16">
            <h2 className="text-3xl font-serif font-semibold text-nature-brown mb-8">Erklæring</h2>
            <div className="prose prose-lg max-w-none text-nature-brown space-y-6">
              <p>
                Trossamfunnet Naturfolk bekjenner seg til en urnordisk åndelig vei der livskraften og åndskraften er kjernen i vår tro. Livskraften er den iboende, selvopprettholdende kraften i alt levende. Åndskraften er den universelle, gjennomstrømmende kraften som forbinder alt med alt. Disse kreftene er likeverdige og utfyller hverandre. Vår tro bygger på dualiteten mellom disse kreftene, uttrykt gjennom naturens sykluser av liv, død og gjenfødelse. Vi er forankret i et verdensbilde der mennesket er en del av en større kosmisk helhet, og vår religiøse praksis skjer i samspill med naturen, dens ånder og våre forfedre.
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
                Vi tror at verden er lagdelt – med flere nivåer av virkelighet. Vi tror at verden er besjelet, at naturen er hellig, og at mennesket er en del av et større kosmisk kretsløp.
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Besjelet:</strong> Vesener, steder, planter og dyr har egenverdi og iboende livskraft.</li>
                <li><strong>Hellig:</strong> Alt levende er innvevd i en større sammenheng, der universelle mønstre speiles i det enkelte.</li>
              </ul>
              <p>
                Troen er rotfestet i direkte erfaring med Nordens landskap, årstider og åndelige nærvær. Vi praktiserer gammel tro og væremåte i en moderne kontekst, med felles ritualer som gjenkjennes på tvers av landskap – men der verktøy, symboler og uttrykk tilpasses lokale tradisjoner, natur og kultur.
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
            <h2 className="text-3xl font-serif font-semibold text-nature-brown mb-8">3. Religiøs praksis – Åndereiser og kontakt</h2>
            <div className="prose prose-lg max-w-none text-nature-brown space-y-6">
              <p>Åndereiser er sentrale for kontakt med ånder, guder og forfedre. Praksisene veves inn i landskapet de tilhører, og kan omfatte:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Tromming, joik og seidsang</li>
                <li>Kontakt med planteånder og dyreånder</li>
                <li>Bruk av ritualobjekter som stav, tromme og kniv – både som verktøy og beskytter</li>
                <li>Bruk av runer og hellige symboler som bærere av åndelig kraft og budskap</li>
                <li>Utesitting, stillhet og visjonssøk</li>
              </ul>
              <p>
                Åndereisen gir veiledning, varsler og styrke – og er et verktøy for heling, transformative overganger, visjon og beslutningstaking.
              </p>
            </div>
          </section>

          {/* 4. Naturens hellighet */}
          <section id="naturens-hellighet" className="mb-16">
            <h2 className="text-3xl font-serif font-semibold text-nature-brown mb-8">4. Naturens hellighet</h2>
            <div className="prose prose-lg max-w-none text-nature-brown space-y-6">
              <p>
                Naturen er også gudenes, forfedrenes og åndenes hjem. Våre forfedres ånder vandrer fortsatt i landskapet. Hellige steder inkluderer blant annet fjell, gamle trær, offersteiner, gravhauger, kilder, lunder, innsjøer og holmer. Vi utfører ofringer, seremonier og åndereiser på slike steder, i respekt og samspill med naturåndene. Stedene har kraft fordi åndene bor der, fordi forfedres graver finnes der, eller fordi de er blitt styrket gjennom åndelig praksis over lang tid.
              </p>
            </div>
          </section>

          {/* 5. Seremonier og overgangsritualer */}
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

          {/* 6. Vi hedrer våre forfedre */}
          <section id="forfedre" className="mb-16">
            <h2 className="text-3xl font-serif font-semibold text-nature-brown mb-8">6. Vi hedrer våre forfedre</h2>
            <div className="prose prose-lg max-w-none text-nature-brown space-y-6">
              <p>
                Forfedres ånder kan gi veiledning og beskyttelse, og er til stede i våre landskap. Forbindelse oppnås blant annet gjennom utesitting/haugsitting, åndereiser og ritualer i tråd med urnordiske tradisjoner – for rådføring, overføring av immateriell kunnskap og liv i balanse mellom fortid og nåtid.
              </p>
            </div>
          </section>

          {/* 7. Hellig maskulin og feminin kraft */}
          <section id="maskulin-feminin" className="mb-16">
            <h2 className="text-3xl font-serif font-semibold text-nature-brown mb-8">7. Hellig maskulin og feminin kraft</h2>
            <div className="prose prose-lg max-w-none text-nature-brown space-y-6">
              <p>
                Livskraften (feminin) og åndskraften (maskulin) er nødvendige, likeverdige og komplementære. Balansen mellom dem søker vi å opprettholde i vår praksis for helhet og harmoni.
              </p>
            </div>
          </section>

          {/* 8. Helingsritualer og renselse */}
          <section id="helingsritualer" className="mb-16">
            <h2 className="text-3xl font-serif font-semibold text-nature-brown mb-8">8. Helingsritualer og renselse</h2>
            <div className="prose prose-lg max-w-none text-nature-brown space-y-6">
              <p>
                Heling skjer blant annet ved hjelp av ild, urter, ville vekster, damp, røyk, symboler og kniv som verktøy og beskytter. Rituell damp og varme – som i sauna eller laugarhus – brukes for renselse, fødsel og visjon. I disse hellige rommene søker vi kontakt med åndene, og lar kropp og sjel helbredes.
              </p>
            </div>
          </section>

          {/* 9. Hellige steder */}
          <section id="hellige-steder" className="mb-16">
            <h2 className="text-3xl font-serif font-semibold text-nature-brown mb-8">9. Hellige steder</h2>
            <div className="prose prose-lg max-w-none text-nature-brown space-y-6">
              <p>
                Hellige steder er naturlige kraftsentre, noen med iboende kraft forsterket av samspillet mellom kosmos, sol, måne og himmelvelvingens bevegelser. Stedene er ikke løsrevet fra sine landskap – naturen selv former våre hellige rom.
              </p>
            </div>
          </section>

          {/* 10. Beskyttelse mot destruktive krefter */}
          <section id="beskyttelse" className="mb-16">
            <h2 className="text-3xl font-serif font-semibold text-nature-brown mb-8">10. Beskyttelse mot destruktive krefter</h2>
            <div className="prose prose-lg max-w-none text-nature-brown space-y-6">
              <p>
                Ikke alle åndskrefter er hjelpsomme. Ritualer for beskyttelse kan omfatte besvergelser, symboler, ild og allianser med hjelpende ånder. Vi lærer våre medlemmer å skille mellom veiledende og villedende krefter, beskytte seg og sine – og å bruke sin egen kraft med visdom og respekt.
              </p>
            </div>
          </section>

          {/* 11. Etikk og livssyn */}
          <section id="etikk" className="mb-16">
            <h2 className="text-3xl font-serif font-semibold text-nature-brown mb-8">11. Etikk og livssyn</h2>
            <div className="prose prose-lg max-w-none text-nature-brown space-y-6">
              <p>
                Vår etikk bygger på gjensidighet, respekt for naturen, forvaltning av åndelig og kulturell arv, ansvar for kommende generasjoner og vern av hellige steder. Handlingene våre bør bygge fred og harmoni mellom dimensjoner, mennesker og ånder. Samtykke og valgfrihet står sentralt, sammen med personlig ansvar for eget liv, fellesskapet og relasjonene vi inngår i.
              </p>
            </div>
          </section>

          {/* 12. Myter og overlevering */}
          <section id="myter" className="mb-16">
            <h2 className="text-3xl font-serif font-semibold text-nature-brown mb-8">12. Myter og overlevering</h2>
            <div className="prose prose-lg max-w-none text-nature-brown space-y-6">
              <p>
                Mytene er ikke historisk avgrenset, men levende og relevante. De overleverer åndelige erfaringer, etiske rettesnorer og gir form til vår forståelse av hvordan ånds- og livskraften utspiller seg i menneskenes verden. Myter og eventyr er også verktøy for å gjøre vår tro levende og inkluderende for barn og kommende generasjoner.
              </p>
            </div>
          </section>

          {/* 13. Naturfolks rett */}
          <section id="naturfolks-rett" className="mb-16">
            <h2 className="text-3xl font-serif font-semibold text-nature-brown mb-8">13. Naturfolks rett</h2>
            <div className="prose prose-lg max-w-none text-nature-brown space-y-6">
              <ul className="list-disc pl-6 space-y-2">
                <li>Retten til å samles og utøve ritualer og seremonier i naturen</li>
                <li>Tilgang til hellige steder og gravplasser</li>
                <li>Bruk av våre åndelige verktøy og symboler</li>
                <li>Fri formidling av vår tro</li>
                <li>Retten til å leve i tråd med vår åndelige overbevisning og naturtilhørighet</li>
                <li>Velge fødsels- og dødsritualer i samsvar med naturfolks tradisjoner</li>
              </ul>
            </div>
          </section>

          {/* 14. Misjonering og rekruttering */}
          <section id="misjonering" className="mb-16">
            <h2 className="text-3xl font-serif font-semibold text-nature-brown mb-8">14. Misjonering og rekruttering</h2>
            <div className="prose prose-lg max-w-none text-nature-brown space-y-6">
              <p>
                Vi deler troen vår gjennom jevnlige bålsamlinger, naturvandringer og åpne ritualer, også for ikke-medlemmer. Vi tilgjengeliggjør ritualer, myter og tradisjonskunnskap digitalt for å styrke fellesskapet. Vi er et aktivt misjonerende trossamfunn med tilstedeværelse på festivaler og arrangementer, lokale rekrutteringssamlinger, nasjonale digitale møter, personlig rekruttering, kommunikasjon i egne og lånte kanaler – og samarbeid med relevante organisasjoner.
              </p>
            </div>
          </section>

          {/* 15. Barn og kunnskapsdeling */}
          <section id="barn" className="mb-16">
            <h2 className="text-3xl font-serif font-semibold text-nature-brown mb-8">15. Barn og kunnskapsdeling</h2>
            <div className="prose prose-lg max-w-none text-nature-brown space-y-6">
              <p>
                Barn og ungdom inkluderes i alle aktiviteter sammen med sine foresatte. Læring skjer i takt med alder og modning, med vekt på lek, naturferdigheter og nærvær i hel og hellig natur. Gjennom myter og fortellinger får de ta del i naturfolks etiske og åndelige grunnlag, og gjennom seremonier får de selv erfare natur- og åndskrefter slik de utspiller seg i Nordens naturlandskap. Familien er hellig, og kunnskapsdeling på tvers av generasjoner er grunnleggende.
              </p>
            </div>
          </section>

          {/* 16. Åndelig fellesskap og praksis */}
          <section id="aandelig-fellesskap" className="mb-16">
            <h2 className="text-3xl font-serif font-semibold text-nature-brown mb-8">16. Åndelig fellesskap og praksis</h2>
            <div className="prose prose-lg max-w-none text-nature-brown space-y-6">
              <p>
                Likeverd og fellesskap er viktige verdier. Sirkelen er både symbol og verktøy for å sikre at alles stemmer blir hørt. Praksisen vår henter næring fra førkristen, urnordisk åndelighet – med rik variasjon, men felles kjerne: respekt for naturen og kontakt med åndskrefter gjennom direkte erfaring. Vi forener disse uttrykkene i ett åndelig fellesskap som praktiserer et enhetlig sett av ritualer tilpasset de unike naturlandskapene vi lever i.
              </p>
            </div>
          </section>

          {/* Naturfolkets Ed */}
          <section id="naturfolkets-ed-full" className="mb-16">
            <h2 className="text-3xl font-serif font-semibold text-nature-brown mb-8">Naturfolkets Ed</h2>
            <div className="prose prose-lg max-w-none text-nature-brown space-y-6">
              <div className="text-center italic text-lg">
                <p>Med føttene på jorda</p>
                <p>med hodet i himmelen</p>
                <p>med hånda på hjertet</p>
                <p className="font-semibold">Jeg lover!</p>
                <br />
                <p>Å holde vannet friskt og rennende</p>
                <p>å holde ilden varm og brennende</p>
                <p>å holde lufta klar og svevende</p>
                <p>å holde jorda rik og levende</p>
                <p className="font-semibold">Jeg lover!</p>
              </div>
            </div>
          </section>

        </div>
      </div>

      <Footer />
     
    </div>
  );
};

export default Trosgrunnlag;