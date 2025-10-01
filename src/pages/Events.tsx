import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Helmet } from 'react-helmet-async';
import { Calendar, MapPin } from 'lucide-react';
import { sanitizeHtml } from '@/lib/sanitize';

interface Event {
  id: string;
  title: string;
  description: string;
  start_date: string;
  end_date: string | null;
  location: string | null;
  image_url: string | null;
}

export default function Events() {
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
        <title>Events - Nettverket i Norge</title>
        <meta name="description" content="Upcoming events from Nettverket i Norge" />
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Navbar />
        
        <main className="flex-1">
          <section className="py-20 px-4">
            <div className="container mx-auto max-w-6xl">
              <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">Upcoming Events</h1>
              <p className="text-xl text-center text-muted-foreground mb-12">
                Join us at our upcoming events and gatherings
              </p>

              {loading ? (
                <div className="text-center py-12">Loading events...</div>
              ) : events.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  No upcoming events at the moment. Check back soon!
                </div>
              ) : (
                <div className="grid md:grid-cols-2 gap-6">
                  {events.map((event) => (
                    <Card key={event.id} className="hover:shadow-lg transition-shadow">
                      {event.image_url && (
                        <img 
                          src={event.image_url} 
                          alt={event.title}
                          className="w-full h-48 object-cover rounded-t-lg"
                        />
                      )}
                      <CardHeader>
                        <CardTitle>{event.title}</CardTitle>
                        <div className="flex flex-col gap-2 text-sm text-muted-foreground mt-2">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            {new Date(event.start_date).toLocaleDateString('nb-NO', {
                              weekday: 'long',
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </div>
                          {event.location && (
                            <div className="flex items-center gap-2">
                              <MapPin className="h-4 w-4" />
                              {event.location}
                            </div>
                          )}
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div 
                          className="prose prose-sm max-w-none line-clamp-3"
                          dangerouslySetInnerHTML={{ __html: sanitizeHtml(event.description) }}
                        />
                      </CardContent>
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
