import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ScrollToTop from '../components/ScrollToTop';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';

const Medlemskap = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-br from-nature-green to-nature-green/80 text-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6">
              Bli med i Naturfolk
            </h1>
            <div className="w-24 h-1 bg-white mx-auto mb-8"></div>
            <p className="text-xl md:text-2xl leading-relaxed">
              For deg som ønsker å finne din åndelighet i balanse med naturlandskap og naturkrefter.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-nature-offwhite">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto space-y-12">
            
            {/* Introduction */}
            <Card>
              <CardContent className="p-8">
                <p className="text-lg leading-relaxed mb-4">
                  Trossamfunnet Naturfolk ble etter en grundig og spennende prosess grunnlagt i 2023. Vi er i vekst og bygger vår forening steg for steg, og nærmer oss nå 400 medlemmer. Vårt mål er at vi som fellesskap skal kunne møtes regelmessig for samlinger, ritualer og kunnskapsdeling - lokalt, regionalt og nasjonalt, både digitalt og fysisk.
                </p>
                <p className="text-lg leading-relaxed">
                  Vi ønsker varmt velkommen alle som ønsker å stå sammen med oss på den hellige naturens side.
                </p>
              </CardContent>
            </Card>

            {/* Medlemskapstyper */}
            <Card>
              <CardContent className="p-8">
                <h2 className="text-3xl font-serif font-semibold mb-8 text-nature-green">Medlemskapstyper</h2>
                
                {/* Hovedmedlem */}
                <div className="mb-8">
                  <h3 className="text-2xl font-serif font-semibold mb-4 text-nature-brown">Hovedmedlem:</h3>
                  <p className="text-lg leading-relaxed">
                    For de over 15 år og som er utmeldt av andre trossamfunn. Innmeldingen hos oss må være med personnummer (11 siffer) og fullt navn/adresse/mobilnummer. Her vil årsavgiften være gratis så fort vi får godkjent statsstøtte for ditt medlemsskap. Foreldre kan melde inn (egne) barn under 15 år. Du vil få tilgang til seremonier og samlinger, samt kunne delta i våre digitale grupper sammen med de andre medlemmene. Vi vil også holde deg oppdatert via nyhetsmail m.m.
                  </p>
                </div>

                {/* Støttemedlem */}
                <div>
                  <h3 className="text-2xl font-serif font-semibold mb-4 text-nature-brown">Støttemedlem:</h3>
                  <p className="text-lg leading-relaxed">
                    Som støttemedlem kan du stå som hovedmedlem i et annet trossamfunn, og likevel få nesten de samme fordelene som hovedmedlemmer med tilgang til seremonier, samlinger, medlemsgrupper m.m. Innmelding med navn/adresse/kontaktinfo. Her vil det bli en liten årsavgift å betale siden vi ikke kan få statsstøtte for ditt medlemsskap. Du kan velge ulike støttebeløp, og betaling enten årlig eller månedlig.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Hvordan bli medlem */}
            <Card>
              <CardContent className="p-8">
                <h2 className="text-3xl font-serif font-semibold mb-6 text-nature-green">Hvordan bli medlem?</h2>
                <p className="text-lg leading-relaxed mb-6">
                  Vi trenger litt midler i oppstarten og har valgt å sette innmeldingsavgift i 2025 til kr 200,- for begge typer medlemskap.
                </p>
                
                <div className="bg-nature-beige/50 p-6 rounded-lg mb-6">
                  <p className="text-lg leading-relaxed mb-4">
                    <strong>Utmelding fra andre trossamfunn:</strong>
                  </p>
                  <p className="text-base leading-relaxed mb-4">
                    Hvis du skal være hovedmedlem hos oss, må du først melde deg ut av andre trossamfunn. Dette gjør du enklest ved å gå til <a href="https://www.kirken.no/innmelding" target="_blank" rel="noopener noreferrer" className="text-nature-green underline hover:no-underline">kirken.no/innmelding</a> og følge instruksjonene der.
                  </p>
                </div>

                <div className="text-center">
                  <Button size="lg" className="mb-4">
                    Bli medlem nå
                  </Button>
                  <p className="text-sm text-muted-foreground">
                    Du vil bli videresendt til vårt medlemssystem
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Medlemsfordeler */}
            <Card>
              <CardContent className="p-8">
                <h2 className="text-3xl font-serif font-semibold mb-6 text-nature-green">Medlemsfordeler</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <ul className="space-y-3 text-lg">
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-nature-green rounded-full mt-3 mr-3 flex-shrink-0"></span>
                        Tilgang til seremonier og samlinger
                      </li>
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-nature-green rounded-full mt-3 mr-3 flex-shrink-0"></span>
                        Delta i digitale medlemsgrupper
                      </li>
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-nature-green rounded-full mt-3 mr-3 flex-shrink-0"></span>
                        Kunnskapsdeling og læring
                      </li>
                    </ul>
                  </div>
                  <div>
                    <ul className="space-y-3 text-lg">
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-nature-green rounded-full mt-3 mr-3 flex-shrink-0"></span>
                        Nyhetsmail og oppdateringer
                      </li>
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-nature-green rounded-full mt-3 mr-3 flex-shrink-0"></span>
                        Lokale, regionale og nasjonale møter
                      </li>
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-nature-green rounded-full mt-3 mr-3 flex-shrink-0"></span>
                        Åndelig fellesskap og støtte
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact Info */}
            <Card>
              <CardContent className="p-8 text-center">
                <h2 className="text-3xl font-serif font-semibold mb-6 text-nature-green">Har du spørsmål?</h2>
                <p className="text-lg leading-relaxed mb-6">
                  Ta gjerne kontakt med oss hvis du lurer på noe om medlemskap eller Naturfolk generelt.
                </p>
                <Button variant="outline" size="lg">
                  <a href="mailto:post@naturfolk.org" className="text-inherit no-underline">
                    Kontakt oss: post@naturfolk.org
                  </a>
                </Button>
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

export default Medlemskap;