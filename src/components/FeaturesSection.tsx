
import React from 'react';
import { Leaf, BookOpen, Users, Heart, Map, CalendarDays } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";

const FeaturesSection = () => {
  const isMobile = useIsMobile();
  const programs = [
    {
      icon: <Leaf size={24} />,
      title: "Ecological Restoration",
      description: "Join us in restoring damaged ecosystems through native plant reintroduction, invasive species removal, and sustainable land management practices."
    },
    {
      icon: <BookOpen size={24} />,
      title: "Nature Education",
      description: "Discover our workshops on ecological literacy, regenerative practices, and traditional ecological knowledge that foster a deeper connection with nature."
    },
    {
      icon: <Users size={24} />,
      title: "Community Building",
      description: "Participate in our monthly gatherings, skill-sharing events, and collaborative projects that strengthen social resilience and ecological awareness."
    },
    {
      icon: <Heart size={24} />,
      title: "Wellbeing Practices",
      description: "Experience the healing benefits of nature through our forest therapy walks, mindfulness sessions, and nature connection exercises for all ages."
    },
    {
      icon: <Map size={24} />,
      title: "Local Bioregion Awareness",
      description: "Learn about your local watershed, native species, and ecological systems through guided hikes, mapping exercises, and phenology studies."
    },
    {
      icon: <CalendarDays size={24} />,
      title: "Seasonal Celebrations",
      description: "Honor the natural cycles through our solstice gatherings, harvest festivals, and seasonal rituals that reconnect us with earth's rhythms."
    }
  ];

  const renderProgramCard = (program, index) => (
    <div 
      key={index} 
      className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-custom hover:-translate-y-1 h-full"
    >
      <div className="text-nature-green mb-4">{program.icon}</div>
      <h3 className="text-xl font-serif font-semibold mb-3">{program.title}</h3>
      <p className="text-muted-foreground">{program.description}</p>
    </div>
  );

  return (
    <section id="programs" className="section-padding bg-nature-offwhite relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-nature-sage rounded-full opacity-20 -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-nature-beige rounded-full opacity-40 translate-x-1/3 translate-y-1/3"></div>
      
      <div className="container-custom relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-semibold mb-6">Our Programs</h2>
          <div className="w-24 h-1 bg-nature-green mx-auto mb-6"></div>
          <p className="text-lg text-balance">
            At Naturfolk, we facilitate meaningful connections between people and the natural world through diverse programming designed to build ecological literacy, community resilience, and personal wellbeing.
          </p>
        </div>

        {isMobile ? (
          <div className="px-4">
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full"
            >
              <CarouselContent>
                {programs.map((program, index) => (
                  <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                    {renderProgramCard(program, index)}
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="flex justify-center mt-6">
                <CarouselPrevious className="static translate-y-0 mr-2" />
                <CarouselNext className="static translate-y-0 ml-2" />
              </div>
            </Carousel>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {programs.map((program, index) => renderProgramCard(program, index))}
          </div>
        )}

        <div className="mt-16 text-center">
          <a href="#contact" className="btn-primary inline-flex items-center gap-2">
            Join Our Community
          </a>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
