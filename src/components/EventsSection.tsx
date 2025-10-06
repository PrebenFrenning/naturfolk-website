import React, { useState, useEffect } from 'react';
import { Calendar, CalendarDays, MapPin, Clock, ExternalLink, ChevronDown, ChevronUp } from 'lucide-react';
import { format } from 'date-fns';
import { nb } from 'date-fns/locale';
import { supabase } from '@/integrations/supabase/client';
import { Calendar as CalendarUI } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useIsMobile } from '../hooks/use-mobile';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
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

const EventsSection = () => {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [showAllEvents, setShowAllEvents] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const isMobile = useIsMobile();

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

  const filteredEvents = date
    ? events.filter(event => {
        const eventDate = new Date(event.start_date);
        return date && eventDate.toDateString() === date.toDateString();
      })
    : events;

  const maxInitialEvents = 4;
  const displayedEvents = showAllEvents ? filteredEvents : filteredEvents.slice(0, maxInitialEvents);
  const hasMoreEvents = filteredEvents.length > maxInitialEvents;

  const handleEventClick = (event: Event) => {
    setSelectedEvent(event);
    setDialogOpen(true);
  };

  const EventCard = ({ event }: { event: Event }) => {
    const eventDate = new Date(event.start_date);
    const endTime = event.end_date ? new Date(event.end_date) : null;
    
    return (
      <div className="bg-white border border-gray-100 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-custom group h-full flex flex-col w-full">
        {event.image_url && (
          <div className="h-48 overflow-hidden">
            <img 
              src={`${event.image_url}?auto=format&fit=crop&w=600&q=80`} 
              alt={event.title} 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        )}
        <div className="p-5 flex flex-col flex-grow">
          <div className="flex justify-between items-start mb-3">
            <h3 className="text-lg font-serif font-semibold">{event.title}</h3>
            <span className="bg-nature-sage/20 text-nature-green text-xs px-2 py-1 rounded-full">
              {format(eventDate, 'd. MMM', { locale: nb })}
            </span>
          </div>
          <p className="text-muted-foreground text-sm mb-4 flex-grow line-clamp-2">
            {event.description?.replace(/<[^>]*>/g, '')}
          </p>
          <div className="flex flex-col gap-2 text-sm">
            <div className="flex items-center gap-2">
              <Clock size={14} className="text-nature-green" />
              <span>
                {format(eventDate, 'HH:mm', { locale: nb })}
                {endTime && ` - ${format(endTime, 'HH:mm', { locale: nb })}`}
              </span>
            </div>
            {event.location && (
              <div className="flex items-center gap-2">
                <MapPin size={14} className="text-nature-green" />
                <span>{event.location}</span>
              </div>
            )}
          </div>
          <div className="mt-4 pt-4 border-t border-gray-100">
            <button 
              onClick={() => handleEventClick(event)}
              className="text-nature-green hover:text-nature-green/80 font-medium text-sm flex items-center gap-1"
            >
              Les mer <ExternalLink size={14} />
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section id="events" className="section-padding bg-white relative overflow-hidden">
      <div className="container-custom max-w-full px-4 mx-auto sm:px-6 md:px-8 lg:px-12 xl:px-16">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-semibold mb-6">Eventer og arrangementer</h2>
          <div className="w-24 h-1 bg-nature-green mx-auto mb-6"></div>
          <p className="text-lg text-balance">
            Connect with our community through seasonal celebrations, educational workshops, and nature immersion experiences.
          </p>
        </div>
        
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <div className="bg-nature-offwhite p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-serif mb-4 flex items-center gap-2">
                <CalendarDays size={20} className="text-nature-green" />
                Eventkalender
              </h3>
              <Popover>
                <PopoverTrigger asChild>
                  <button className="w-full flex items-center justify-between bg-white border border-gray-200 p-3 rounded-md text-left">
                    <span className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 opacity-50" />
                      {date ? format(date, 'PPP') : <span>Velg dato</span>}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {date && filteredEvents.length > 0 
                        ? `${filteredEvents.length} event${filteredEvents.length !== 1 ? 's' : ''}` 
                        : ''}
                    </span>
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <CalendarUI
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                    className="p-3 pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
              
              <div className="mt-4">
                <button 
                  onClick={() => setDate(undefined)}
                  className="text-sm text-nature-green hover:text-nature-green/80 transition-custom"
                >
                  Vis all eventer
                </button>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-2 w-full overflow-hidden">
            {loading ? (
              <div className="text-center py-12">Laster arrangementer...</div>
            ) : filteredEvents.length > 0 ? (
              <>
                {isMobile ? (
                  <div className="w-full">
                    <Carousel className="w-full" opts={{ 
                      align: "start",
                      containScroll: "trimSnaps",
                      dragFree: false,
                      loop: false
                    }}>
                      <CarouselContent>
                        {displayedEvents.map(event => (
                          <CarouselItem key={event.id} className="w-full max-w-full">
                            <div className="px-1 box-border w-full">
                              <EventCard event={event} />
                            </div>
                          </CarouselItem>
                        ))}
                      </CarouselContent>
                      <div className="flex justify-center mt-4">
                        <CarouselPrevious className="static mr-2" />
                        <CarouselNext className="static ml-2" />
                      </div>
                    </Carousel>
                    
                    {hasMoreEvents && (
                      <div className="mt-6 text-center">
                        <button 
                          className="btn-secondary inline-flex items-center gap-2 mx-auto"
                          onClick={() => setShowAllEvents(!showAllEvents)}
                        >
                          {showAllEvents ? (
                            <>Vis færre <ChevronUp size={16} /></>
                          ) : (
                            <>Vis flere eventer <ChevronDown size={16} /></>
                          )}
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <>
                    <div className="grid md:grid-cols-2 gap-6">
                      {displayedEvents.map(event => (
                        <EventCard key={event.id} event={event} />
                      ))}
                    </div>
                    
                    {hasMoreEvents && (
                      <div className="mt-8 text-center">
                        <button 
                          className="btn-secondary inline-flex items-center gap-2 mx-auto"
                          onClick={() => setShowAllEvents(!showAllEvents)}
                        >
                          {showAllEvents ? (
                            <>Vis færre <ChevronUp size={16} /></>
                          ) : (
                            <>Vis flere eventer <ChevronDown size={16} /></>
                          )}
                        </button>
                      </div>
                    )}
                  </>
                )}
              </>
            ) : (
              <div className="bg-nature-offwhite/50 border border-gray-100 rounded-lg p-10 text-center">
                <CalendarDays size={40} className="mx-auto mb-4 text-gray-300" />
                <h3 className="text-xl font-serif mb-2">Ingen eventer på dene datoen</h3>
                <p className="text-muted-foreground">Prøv å velge en annen dato eller se alle fremtidige eventer.</p>
              </div>
            )}
          </div>
        </div>
        
        <div className="mt-16 text-center">
          <a href="/kalender" className="btn-primary inline-flex items-center gap-2">
            Vis alle eventer
          </a>
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

export default EventsSection;
