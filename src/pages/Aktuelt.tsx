import React from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Users, MapPin } from 'lucide-react';

const Aktuelt = () => {
  return (
    <>
      <Helmet>
        <title>Aktuelt - Naturfolk | Nyheter og arrangementer</title>
        <meta name="description" content="De nyeste nyhetene og arrangementene fra Trossamfunnet Naturfolk. Oppdag kommende seremonier, utesittinger og fellesskapsaktiviteter." />
        <meta name="keywords" content="Naturfolk, aktuelt, nyheter, arrangementer, seremonier, utesitting, trossamfunn" />
        <link rel="canonical" href={`${window.location.origin}/aktuelt`} />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-b from-nature-light to-white">
        <Navbar />
        
        <main className="pt-20">
          {/* Hero Section */}
          <section className="section-padding bg-gradient-to-r from-nature-primary to-nature-secondary text-white">
            <div className="container-custom text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Aktuelt
              </h1>
              <p className="text-xl max-w-3xl mx-auto leading-relaxed">
                De nyeste nyhetene og arrangementene fra Naturfolk
              </p>
            </div>
          </section>

          {/* Kommende Arrangementer */}
          <section className="section-padding">
            <div className="container-custom">
              <h2 className="text-3xl font-bold text-nature-brown mb-8 text-center">
                Kommende Arrangementer
              </h2>
              
              <div className="grid md:grid-cols-2 gap-8 mb-12">
                <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                  <div className="relative h-64">
                    <img 
                      src="/lovable-uploads/07d9355a-bf98-4a58-878d-1ce5e623810b.png" 
                      alt="Nordlys under Alveblot og Utesitting"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  </div>
                  <CardHeader>
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="h-4 w-4 text-nature-green" />
                      <Badge variant="secondary">1. November 2024</Badge>
                    </div>
                    <CardTitle className="text-nature-brown">Alveblot og Utesitting</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 leading-relaxed mb-4">
                      Trossamfunnet Naturfolk inviterer deg til felles utesitting fredag den 1. november, 
                      kjent som Allehelgensdag og Samhain, med røtter i tradisjonen om alveblot. 
                      Bli med oss i naturen for å ære åndelige krefter og forfedres tradisjoner.
                    </p>
                  </CardContent>
                </Card>

                <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                  <div className="relative h-64">
                    <img 
                      src="/lovable-uploads/5a0d04c1-33b5-4628-841d-d6c3346896b0.png" 
                      alt="Bål i skogen under Vårjevndøgn 2025"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  </div>
                  <CardHeader>
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="h-4 w-4 text-nature-green" />
                      <Badge variant="secondary">Mars 2025</Badge>
                    </div>
                    <CardTitle className="text-nature-brown">Kommende Seremoni – Vårjevndøgn 2025</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 leading-relaxed mb-4">
                      Bli med på vår årlige seremoni i skogen for å feire vårens ankomst. 
                      Mer informasjon kommer snart!
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          {/* Siste Nyheter */}
          <section className="section-padding bg-nature-light/30">
            <div className="container-custom">
              <h2 className="text-3xl font-bold text-nature-brown mb-8 text-center">
                Siste Nyheter
              </h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                  <div className="relative h-64">
                    <img 
                      src="/lovable-uploads/07d9355a-bf98-4a58-878d-1ce5e623810b.png" 
                      alt="Nordlige landskap som inspirerer Naturfolk"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  </div>
                  <CardHeader>
                    <div className="flex items-center gap-2 mb-2">
                      <Users className="h-4 w-4 text-nature-green" />
                      <Badge variant="secondary">Medlemskap</Badge>
                    </div>
                    <CardTitle className="text-nature-brown">Naturfolk Vekst i 2025</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 leading-relaxed mb-4">
                      Vi nærmer oss 400 medlemmer og fortsetter å bygge et sterkt fellesskap for å 
                      beskytte naturens hellighet. Les mer om vår reise og planer for fremtiden.
                    </p>
                  </CardContent>
                </Card>

                <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                  <div className="relative h-64">
                    <img 
                      src="/lovable-uploads/5a0d04c1-33b5-4628-841d-d6c3346896b0.png" 
                      alt="Medlemmer samles under Ny Medlemsdag i Oslo"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  </div>
                  <CardHeader>
                    <div className="flex items-center gap-2 mb-2">
                      <MapPin className="h-4 w-4 text-nature-green" />
                      <Badge variant="secondary">Oslo</Badge>
                    </div>
                    <CardTitle className="text-nature-brown">Ny Medlemsdag i Oslo</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 leading-relaxed mb-4">
                      Åpent hus 15. mars i Oslo. Kom og møt oss for å lære mer om Naturfolk!
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          {/* Call to Action */}
          <section className="section-padding bg-gradient-to-r from-nature-primary to-nature-secondary text-white">
            <div className="container-custom text-center">
              <h2 className="text-3xl font-bold mb-6">
                Bli med i vårt fellesskap
              </h2>
              <p className="text-xl mb-8 max-w-2xl mx-auto">
                Ønsker du å delta på våre arrangementer eller bli medlem av Naturfolk?
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="/medlemskap" 
                  className="bg-white text-nature-primary px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                >
                  Bli Medlem
                </a>
                <a 
                  href="/contact" 
                  className="border border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors"
                >
                  Kontakt Oss
                </a>
              </div>
            </div>
          </section>
        </main>

        <Footer />
        <ScrollToTop />
      </div>
    </>
  );
};

export default Aktuelt;