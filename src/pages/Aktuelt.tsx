import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Users, MapPin, ArrowRight } from 'lucide-react';
import { format } from 'date-fns';
import { nb } from 'date-fns/locale';
import { sanitizeHtml } from '@/lib/sanitize';
import aktueltHero from '@/assets/aktuelt-hero.jpg';

const Aktuelt = () => {
  // Fetch upcoming events (next 2)
  const { data: events = [] } = useQuery({
    queryKey: ['upcoming-events'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .eq('status', 'published')
        .gte('start_date', new Date().toISOString())
        .order('start_date', { ascending: true })
        .limit(2);
      
      if (error) throw error;
      return data;
    }
  });

  // Fetch latest blog posts
  const { data: posts = [] } = useQuery({
    queryKey: ['latest-posts'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('status', 'published')
        .order('publish_date', { ascending: false })
        .limit(4);
      
      if (error) throw error;
      return data;
    }
  });

  return (
    <>
      <Helmet>
        <title>Aktuelt - Naturfolk | Nyheter og arrangementer</title>
        <meta name="description" content="De nyeste nyhetene og arrangementene fra Trossamfunnet Naturfolk. Oppdag kommende seremonier, utesittinger og fellesskapsaktiviteter." />
        <meta name="keywords" content="Naturfolk, aktuelt, nyheter, arrangementer, seremonier, utesitting, trossamfunn" />
        <link rel="canonical" href={typeof window !== 'undefined' ? `${window.location.origin}/aktuelt` : '/aktuelt'} />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-b from-nature-light to-background">
        <Navbar />
        
        <main className="flex-1">
          {/* Hero Section */}
          <section className="relative h-[40vh] min-h-[300px] flex items-center justify-center">
            <div className="absolute inset-0 z-0">
              <img 
                src={aktueltHero} 
                alt="Norsk fjellandskap med brennende varde i skumringen" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/50"></div>
            </div>
            <div className="relative z-10 text-center text-white px-4">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Aktuelt</h1>
              <p className="text-lg md:text-xl max-w-2xl mx-auto opacity-90">
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
              
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                {events.map((event) => (
                  <Card key={event.id} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                    <div className="relative h-64">
                      <img 
                        src={event.image_url || '/images/fallback-bonfire.jpg'} 
                        alt={event.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    </div>
                    <CardHeader>
                      <div className="flex items-center gap-2 mb-2">
                        <Calendar className="h-4 w-4 text-nature-green" />
                        <Badge variant="secondary">
                          {format(new Date(event.start_date), 'd. MMMM yyyy', { locale: nb })}
                        </Badge>
                      </div>
                      <CardTitle className="text-nature-brown">{event.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div 
                        className="text-muted-foreground leading-relaxed mb-4 line-clamp-3"
                        dangerouslySetInnerHTML={{ __html: sanitizeHtml(event.description || '') }}
                      />
                      {event.location && (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <MapPin className="h-4 w-4" />
                          <span>{event.location}</span>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="text-center">
                <Link to="/kalender">
                  <Button size="lg" className="gap-2">
                    Se alle arrangementer
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
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
                {posts.map((post) => (
                  <Link key={post.id} to={`/blogg/${post.slug}`}>
                    <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow h-full">
                      <div className="relative h-64">
                        <img 
                          src={post.featured_image || '/images/fallback-bonfire.jpg'} 
                          alt={post.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      </div>
                      <CardHeader>
                        <div className="flex items-center gap-2 mb-2">
                          <Calendar className="h-4 w-4 text-nature-green" />
                          <Badge variant="secondary">
                            {post.publish_date && format(new Date(post.publish_date), 'd. MMMM yyyy', { locale: nb })}
                          </Badge>
                        </div>
                        <CardTitle className="text-nature-brown">{post.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground leading-relaxed line-clamp-3">
                          {post.excerpt}
                        </p>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>

              <div className="text-center mt-8">
                <Link to="/blogg">
                  <Button size="lg" className="gap-2">
                    Til bloggen
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
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