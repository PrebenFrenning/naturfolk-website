import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Helmet } from 'react-helmet-async';
import { Calendar, MapPin, Users, Facebook, Ticket } from 'lucide-react';
import { format } from 'date-fns';
import { nb } from 'date-fns/locale';
import { sanitizeHtml } from '@/lib/sanitize';

interface Event {
  id: string;
  title: string;
  description: string;
  start_date: string;
  end_date: string | null;
  location: string | null;
  image_url: string | null;
  max_participants: number | null;
  price: string | null;
  ticket_link: string | null;
  facebook_link: string | null;
  organized_by: string | null;
  what_to_bring: string | null;
}

export default function Kalender() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .eq('status', 'published')
      .gte('start_date', new Date().toISOString())
      .order('start_date', { ascending: true });

    if (!error && data) {
      setEvents(data);
    }
    setLoading(false);
  };

  return (
    <>
      <Helmet>
        <title>Kalender - Nettverket i Norge</title>
        <meta name="description" content="Kommende arrangementer og aktiviteter fra Nettverket i Norge" />
      </Helmet>

      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        
        <main className="flex-1">
          <section className="py-20 px-4">
            <div className="container mx-auto max-w-6xl">
              <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">Kalender</h1>
              <p className="text-xl text-center text-muted-foreground mb-12">
                Bli med på våre kommende arrangementer og samlinger
              </p>

              {loading ? (
                <div className="text-center py-12">Laster arrangementer...</div>
              ) : events.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  Ingen kommende arrangementer for øyeblikket. Kom tilbake snart!
                </div>
              ) : (
                <div className="space-y-8">
                  {events.map((event) => (
                    <Card key={event.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="md:flex">
                        {event.image_url && (
                          <div className="md:w-1/3">
                            <img 
                              src={event.image_url} 
                              alt={event.title}
                              className="w-full h-64 md:h-full object-cover"
                            />
                          </div>
                        )}
                        <div className={event.image_url ? "md:w-2/3" : "w-full"}>
                          <CardHeader>
                            <CardTitle className="text-2xl">{event.title}</CardTitle>
                            <div className="flex flex-col gap-3 text-sm text-muted-foreground mt-4">
                              <div className="flex items-center gap-2">
                                <Calendar className="h-4 w-4 flex-shrink-0" />
                                <span>
                                  {format(new Date(event.start_date), "EEEE d. MMMM yyyy 'kl.' HH:mm", { locale: nb })}
                                  {event.end_date && ` - ${format(new Date(event.end_date), "HH:mm", { locale: nb })}`}
                                </span>
                              </div>
                              
                              {event.location && (
                                <div className="flex items-center gap-2">
                                  <MapPin className="h-4 w-4 flex-shrink-0" />
                                  {event.location}
                                </div>
                              )}

                              {event.max_participants && (
                                <div className="flex items-center gap-2">
                                  <Users className="h-4 w-4 flex-shrink-0" />
                                  Maks {event.max_participants} deltakere
                                </div>
                              )}

                              {event.price && (
                                <div className="flex items-center gap-2">
                                  <span className="font-semibold">Pris:</span>
                                  {event.price}
                                </div>
                              )}

                              {event.organized_by && (
                                <div className="text-sm">
                                  <strong>Arrangør:</strong> {event.organized_by}
                                </div>
                              )}
                            </div>
                          </CardHeader>
                          
                          <CardContent className="space-y-4">
                            {event.description && (
                              <div>
                                <h3 className="font-semibold mb-2">Om arrangementet</h3>
                                <div 
                                  className="prose prose-sm max-w-none"
                                  dangerouslySetInnerHTML={{ __html: sanitizeHtml(event.description) }}
                                />
                              </div>
                            )}

                            {event.what_to_bring && (
                              <div>
                                <h3 className="font-semibold mb-2">Det bør du ha med</h3>
                                <div 
                                  className="prose prose-sm max-w-none"
                                  dangerouslySetInnerHTML={{ __html: sanitizeHtml(event.what_to_bring) }}
                                />
                              </div>
                            )}

                            <div className="flex flex-wrap gap-3 pt-4">
                              {event.ticket_link && (
                                <Button asChild>
                                  <a href={event.ticket_link} target="_blank" rel="noopener noreferrer">
                                    <Ticket className="h-4 w-4 mr-2" />
                                    Kjøp billett
                                  </a>
                                </Button>
                              )}
                              {event.facebook_link && (
                                <Button variant="outline" asChild>
                                  <a href={event.facebook_link} target="_blank" rel="noopener noreferrer">
                                    <Facebook className="h-4 w-4 mr-2" />
                                    Facebook-event
                                  </a>
                                </Button>
                              )}
                            </div>
                          </CardContent>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}
