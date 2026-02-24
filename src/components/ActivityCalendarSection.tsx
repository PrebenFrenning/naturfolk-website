import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Clock, ArrowRight } from 'lucide-react';
import { format } from 'date-fns';
import { nb } from 'date-fns/locale';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import EventDialog from './EventDialog';

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

const ActivityCalendarSection = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .eq('status', 'published')
      .gte('start_date', new Date().toISOString())
      .order('start_date', { ascending: true })
      .limit(3);

    if (!error && data) {
      setEvents(data);
    }
    setLoading(false);
  };

  const handleEventClick = (event: Event) => {
    setSelectedEvent(event);
    setDialogOpen(true);
  };

  if (loading) {
    return (
      <section className="section-padding bg-white">
        <div className="container-custom text-center">
          <p>Laster aktiviteter...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-semibold mb-6">Aktivitetskalender</h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-lg text-muted-foreground">
            Kommende arrangementer og samlinger
          </p>
        </div>
        
        {events.length > 0 ? (
          <div className="grid md:grid-cols-3 gap-6">
            {events.map((event) => {
              const eventDate = new Date(event.start_date);
              const endTime = event.end_date ? new Date(event.end_date) : null;
              
              return (
                <div 
                  key={event.id}
                  className="bg-nature-offwhite border border-gray-100 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer group"
                  onClick={() => handleEventClick(event)}
                >
                  {event.image_url && (
                    <div className="h-40 overflow-hidden">
                      <img 
                        src={`${event.image_url}?auto=format&fit=crop&w=600&q=80`} 
                        alt={event.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  )}
                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <Calendar className="h-4 w-4 text-nature-green" />
                      <span className="text-sm font-medium text-nature-green">
                        {format(eventDate, 'd. MMMM yyyy', { locale: nb })}
                      </span>
                    </div>
                    <h3 className="text-lg font-serif font-semibold mb-2 group-hover:text-nature-green transition-colors">
                      {event.title}
                    </h3>
                    <div className="flex flex-col gap-1 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Clock size={14} />
                        <span>
                          {format(eventDate, 'HH:mm', { locale: nb })}
                          {endTime && ` - ${format(endTime, 'HH:mm', { locale: nb })}`}
                        </span>
                      </div>
                      {event.location && (
                        <div className="flex items-center gap-2">
                          <MapPin size={14} />
                          <span>{event.location}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12 bg-nature-offwhite rounded-lg">
            <Calendar className="h-12 w-12 mx-auto mb-4 text-gray-300" />
            <p className="text-muted-foreground">Ingen kommende arrangementer.</p>
          </div>
        )}

        <div className="text-center mt-10">
          <Link to="/kalender">
            <Button size="lg" className="gap-2">
              Se full kalender
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
      
      <EventDialog 
        event={selectedEvent} 
        open={dialogOpen} 
        onOpenChange={setDialogOpen} 
      />
    </section>
  );
};

export default ActivityCalendarSection;
