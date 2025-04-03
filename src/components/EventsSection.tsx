import React, { useState } from 'react';
import { Calendar, CalendarDays, MapPin, Clock, ExternalLink, ChevronDown, ChevronUp } from 'lucide-react';
import { format } from 'date-fns';
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

const EventsSection = () => {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [showAllEvents, setShowAllEvents] = useState(false);
  const isMobile = useIsMobile();
  
  const events = [
    {
      id: 1,
      title: "Forest Therapy Walk",
      date: new Date(2023, 6, 15),
      time: "10:00 - 12:00",
      location: "Nordmarka Forest",
      description: "Experience the healing power of nature with our certified forest therapy guide.",
      image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e"
    },
    {
      id: 2,
      title: "Summer Solstice Celebration",
      date: new Date(2023, 5, 21),
      time: "19:00 - 22:00",
      location: "Botanical Gardens",
      description: "Join us for a community gathering to honor the longest day of the year.",
      image: "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8"
    },
    {
      id: 3,
      title: "Native Plant Workshop",
      date: new Date(2023, 7, 5),
      time: "14:00 - 16:30",
      location: "Community Garden Center",
      description: "Learn about local plant species and their ecological importance.",
      image: "https://images.unsplash.com/photo-1485067801970-70573e3f77d0"
    },
    {
      id: 4,
      title: "Watershed Clean-up Day",
      date: new Date(2023, 7, 19),
      time: "09:00 - 13:00",
      location: "Oslo Fjord",
      description: "Help restore our local watershed through this community clean-up event.",
      image: "https://images.unsplash.com/photo-1475924156734-496f6cac6ec1"
    },
    {
      id: 5,
      title: "Nature Photography Workshop",
      date: new Date(2023, 7, 25),
      time: "13:00 - 17:00",
      location: "Frogner Park",
      description: "Learn composition techniques for stunning nature photography.",
      image: "https://images.unsplash.com/photo-1500531279542-fc8490c8ea4d"
    },
    {
      id: 6,
      title: "Sustainable Living Seminar",
      date: new Date(2023, 8, 2),
      time: "18:00 - 20:00",
      location: "Oslo Community Center",
      description: "Practical tips for reducing your environmental impact in everyday life.",
      image: "https://images.unsplash.com/photo-1504387432042-5b51b7c1c3e7"
    },
    {
      id: 7,
      title: "Bird Watching Expedition",
      date: new Date(2023, 8, 10),
      time: "07:00 - 10:00",
      location: "Maridalen Valley",
      description: "Join our expert ornithologist to spot and identify local bird species.",
      image: "https://images.unsplash.com/photo-1522926193341-e9ffd686c60f"
    },
    {
      id: 8,
      title: "Fall Equinox Nature Retreat",
      date: new Date(2023, 8, 22),
      time: "10:00 - 16:00",
      location: "Østmarka Forest",
      description: "A full-day retreat to connect with nature during the changing seasons.",
      image: "https://images.unsplash.com/photo-1475113548554-5a36f1f523d6"
    }
  ];

  const sortedEvents = [...events].sort((a, b) => a.date.getTime() - b.date.getTime());

  const filteredEvents = date
    ? events.filter(event => date && event.date.toDateString() === date.toDateString())
    : sortedEvents;

  const maxInitialEvents = 4;
  const displayedEvents = showAllEvents ? filteredEvents : filteredEvents.slice(0, maxInitialEvents);
  const hasMoreEvents = filteredEvents.length > maxInitialEvents;

  const EventCard = ({ event }: { event: typeof events[0] }) => (
    <div className="bg-white border border-gray-100 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-custom group h-full flex flex-col">
      <div className="h-48 overflow-hidden">
        <img 
          src={`${event.image}?auto=format&fit=crop&w=600&q=80`} 
          alt={event.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-lg font-serif font-semibold">{event.title}</h3>
          <span className="bg-nature-sage/20 text-nature-green text-xs px-2 py-1 rounded-full">
            {format(event.date, 'MMM d')}
          </span>
        </div>
        <p className="text-muted-foreground text-sm mb-4 flex-grow">{event.description}</p>
        <div className="flex flex-col gap-2 text-sm">
          <div className="flex items-center gap-2">
            <Clock size={14} className="text-nature-green" />
            <span>{event.time}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin size={14} className="text-nature-green" />
            <span>{event.location}</span>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-gray-100">
          <a 
            href="#" 
            className="text-nature-green hover:text-nature-green/80 font-medium text-sm flex items-center gap-1"
          >
            Learn more <ExternalLink size={14} />
          </a>
        </div>
      </div>
    </div>
  );

  return (
    <section id="events" className="section-padding bg-white relative overflow-hidden">
      <div className="container-custom max-w-full px-0 sm:px-4 md:px-8 lg:px-16 xl:px-24">
        <div className="max-w-3xl mx-auto text-center mb-16 px-4">
          <h2 className="text-3xl md:text-4xl font-serif font-semibold mb-6">Upcoming Events</h2>
          <div className="w-24 h-1 bg-nature-green mx-auto mb-6"></div>
          <p className="text-lg text-balance">
            Connect with our community through seasonal celebrations, educational workshops, and nature immersion experiences.
          </p>
        </div>
        
        <div className="grid lg:grid-cols-3 gap-8 px-4">
          <div className="lg:col-span-1">
            <div className="bg-nature-offwhite p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-serif mb-4 flex items-center gap-2">
                <CalendarDays size={20} className="text-nature-green" />
                Event Calendar
              </h3>
              <Popover>
                <PopoverTrigger asChild>
                  <button className="w-full flex items-center justify-between bg-white border border-gray-200 p-3 rounded-md text-left">
                    <span className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 opacity-50" />
                      {date ? format(date, 'PPP') : <span>Pick a date</span>}
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
                  View all events
                </button>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-2">
            {filteredEvents.length > 0 ? (
              <>
                {isMobile ? (
                  <div className="max-w-full overflow-hidden">
                    <Carousel className="w-full" opts={{ 
                      loop: true, 
                      align: "center",
                      containScroll: "keepSnaps"
                    }}>
                      <CarouselContent className="px-4">
                        {displayedEvents.map(event => (
                          <CarouselItem key={event.id} className="w-full px-1">
                            <EventCard event={event} />
                          </CarouselItem>
                        ))}
                      </CarouselContent>
                      <div className="flex justify-center mt-4">
                        <CarouselPrevious className="static translate-y-0 mr-2" />
                        <CarouselNext className="static translate-y-0 ml-2" />
                      </div>
                    </Carousel>
                    
                    {hasMoreEvents && (
                      <div className="mt-6 text-center">
                        <button 
                          className="btn-secondary flex items-center gap-2 mx-auto"
                          onClick={() => setShowAllEvents(!showAllEvents)}
                        >
                          {showAllEvents ? (
                            <>Show less <ChevronUp size={16} /></>
                          ) : (
                            <>View more events <ChevronDown size={16} /></>
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
                          className="btn-secondary flex items-center gap-2 mx-auto"
                          onClick={() => setShowAllEvents(!showAllEvents)}
                        >
                          {showAllEvents ? (
                            <>Show less <ChevronUp size={16} /></>
                          ) : (
                            <>View more events <ChevronDown size={16} /></>
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
                <h3 className="text-xl font-serif mb-2">No events on this date</h3>
                <p className="text-muted-foreground">Try selecting another date or view all upcoming events.</p>
              </div>
            )}
          </div>
        </div>
        
        <div className="mt-16 text-center">
          <a href="#contact" className="btn-primary inline-flex items-center gap-2">
            Request Event Information
          </a>
        </div>
      </div>
    </section>
  );
};

export default EventsSection;
