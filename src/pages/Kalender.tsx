import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar as CalendarUI } from '@/components/ui/calendar';
import { Helmet } from 'react-helmet-async';
import { Calendar, MapPin, Clock, ExternalLink, Facebook, Ticket } from 'lucide-react';
import { format, isSameDay, startOfMonth, endOfMonth } from 'date-fns';
import { nb } from 'date-fns/locale';
import { sanitizeHtml } from '@/lib/sanitize';
import EventDialog from '@/components/EventDialog';
import { cn } from '@/lib/utils';
import kalenderHero from '@/assets/kalender-hero.jpg';

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
  registration_deadline: string | null;
}

export default function Kalender() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    // Load all events (past and future) for calendar display
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .eq('status', 'published')
      .order('start_date', { ascending: true });

    if (!error && data) {
      setEvents(data);
    }
    setLoading(false);
  };

  // Get dates that have events - separate past and future
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const pastEventDates = events
    .filter(event => new Date(event.start_date) < today)
    .map(event => new Date(event.start_date));
  
  const futureEventDates = events
    .filter(event => new Date(event.start_date) >= today)
    .map(event => new Date(event.start_date));
  
  // Filter events by selected date, but only show future events by default
  const filteredEvents = selectedDate
    ? events.filter(event => isSameDay(new Date(event.start_date), selectedDate))
    : events.filter(event => new Date(event.start_date) >= today);

  const handleEventClick = (event: Event) => {
    setSelectedEvent(event);
    setDialogOpen(true);
  };

  // Custom day renderer to show event indicators
  const modifiers = {
    hasPastEvent: pastEventDates,
    hasFutureEvent: futureEventDates,
  };

  const modifiersClassNames = {
    hasPastEvent: 'font-bold relative after:absolute after:bottom-1 after:left-1/2 after:-translate-x-1/2 after:w-1.5 after:h-1.5 after:bg-muted-foreground/50 after:rounded-full',
    hasFutureEvent: 'font-bold relative after:absolute after:bottom-1 after:left-1/2 after:-translate-x-1/2 after:w-1.5 after:h-1.5 after:bg-nature-green after:rounded-full',
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
          {/* Hero Section */}
          <section className="relative h-[40vh] min-h-[300px] flex items-center justify-center">
            <div className="absolute inset-0 z-0">
              <img 
                src={kalenderHero} 
                alt="Tradisjonell norsk primstav med runer" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60"></div>
            </div>
            <div className="relative z-10 text-center text-white px-4">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Kalender</h1>
              <p className="text-lg md:text-xl max-w-2xl mx-auto opacity-90">
                Kommende arrangementer og aktiviteter
              </p>
            </div>
          </section>

          <section className="py-16 px-4">
            <div className="container mx-auto max-w-6xl">
              <p className="text-lg md:text-xl text-center text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
                For Naturfolk er det fellesskapet som ligger i våre møter, ritualer, seremonier og samhandling med natur- og åndskraft, som er essensen av hva og hvem vi er. Her finner du aktiviteter du som medlem kan ta del i, både fysisk og digitalt.
              </p>

              {loading ? (
                <div className="text-center py-12">Laster arrangementer...</div>
              ) : (
                <>
                  {/* Calendar Section */}
                  <div className="mb-12 flex flex-col items-center">
                    <Card className="w-full max-w-md">
                      <CardContent className="p-6">
                        <CalendarUI
                          mode="single"
                          selected={selectedDate}
                          onSelect={setSelectedDate}
                          month={currentMonth}
                          onMonthChange={setCurrentMonth}
                          modifiers={modifiers}
                          modifiersClassNames={modifiersClassNames}
                          className="rounded-md border-0"
                          locale={nb}
                          weekStartsOn={1}
                        />
                        {selectedDate && (
                          <div className="mt-4 text-center">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setSelectedDate(undefined)}
                            >
                              Vis alle arrangementer
                            </Button>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                    {selectedDate && (
                      <p className="mt-4 text-sm text-muted-foreground">
                        Viser arrangementer for {format(selectedDate, 'd. MMMM yyyy', { locale: nb })}
                      </p>
                    )}
                  </div>

                  {/* Events Grid */}
                  {filteredEvents.length === 0 ? (
                    <div className="text-center py-12 text-muted-foreground">
                      {selectedDate 
                        ? 'Ingen arrangementer på denne datoen.'
                        : 'Ingen kommende arrangementer for øyeblikket. Kom tilbake snart!'}
                    </div>
                  ) : (
                    <div className="grid md:grid-cols-2 gap-6">
                      {filteredEvents.map((event) => {
                        const eventDate = new Date(event.start_date);
                        const endTime = event.end_date ? new Date(event.end_date) : null;
                        
                        return (
                          <Card 
                            key={event.id} 
                            className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group"
                            onClick={() => handleEventClick(event)}
                          >
                            {event.image_url && (
                              <div className="h-48 overflow-hidden">
                                <img 
                                  src={event.image_url} 
                                  alt={event.title}
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                              </div>
                            )}
                            <CardContent className="p-5">
                              <div className="flex justify-between items-start mb-3">
                                <h3 className="text-lg font-serif font-semibold">{event.title}</h3>
                                <span className="bg-nature-sage/20 text-nature-green text-xs px-2 py-1 rounded-full whitespace-nowrap ml-2">
                                  {format(eventDate, 'd. MMM', { locale: nb })}
                                </span>
                              </div>
                              
                              <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                                {event.description?.replace(/<[^>]*>/g, '')}
                              </p>
                              
                              <div className="flex flex-col gap-2 text-sm">
                                <div className="flex items-center gap-2">
                                  <Clock size={14} className="text-nature-green flex-shrink-0" />
                                  <span>
                                    {format(eventDate, 'HH:mm', { locale: nb })}
                                    {endTime && ` - ${format(endTime, 'HH:mm', { locale: nb })}`}
                                  </span>
                                </div>
                                {event.location && (
                                  <div className="flex items-center gap-2">
                                    <MapPin size={14} className="text-nature-green flex-shrink-0" />
                                    <span className="line-clamp-1">{event.location}</span>
                                  </div>
                                )}
                              </div>
                              
                              <div className="mt-4 pt-4 border-t border-gray-100">
                                <span className="text-nature-green hover:text-nature-green/80 font-medium text-sm flex items-center gap-1">
                                  Les mer <ExternalLink size={14} />
                                </span>
                              </div>
                            </CardContent>
                          </Card>
                        );
                      })}
                    </div>
                  )}
                </>
              )}
            </div>
          </section>
        </main>

        <Footer />
      </div>
      
      <EventDialog 
        event={selectedEvent} 
        open={dialogOpen} 
        onOpenChange={setDialogOpen} 
      />
    </>
  );
}
