
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
      title: "Dyrking og sanking",
      description: "Multi-day journey through remote wilderness landscapes. Small groups, authentic challenges, and transformative experiences in wild nature."
    },
    {
      icon: <Map size={24} />,
      title: "Hellige steder",
      description: "Short but deep immersions in natural settings. Perfect for busy individuals seeking regular connection with wild places close to home."
    },
    {
      icon: <Users size={24} />,
      title: "Natursamfunn",
      description: "Mål for gruppen: Øke bevissthet omkring samfunnsbygging basert på Naturfolks kjerneverdier, inspirere til naturnært levesett og skape en visjon for natursamfunn for fremtiden. Vi ønsker og å trekke inn kunnskap og fakta i den grad det er mulig.  Tidsrommet vil være 2024-2025, men vi tar den tiden vi behøver."
    },
    {
      icon: <Star size={24} />,
      title: "Ritualer",
      description: "Guided experiences focused on deepening your relationship with the natural world through sensory awareness practices and mindful exploration."
    }//,
    //{
    //  icon: <BookOpen size={24} />,
    //  title: "Wilderness Skills",
     // description: "Learn practical skills for living in harmony with the natural world, from fire-making and tracking to wild food identification."
    //},
    //{
    //  icon: <Heart size={24} />,
    //  title: "Custom Programs",
    //  description: "Tailored experiences for organizations, families, and groups. We design custom programs to meet your specific goals and needs."
   // }
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
          <h2 className="text-3xl md:text-4xl font-serif font-semibold mb-6">Våre temagrupper</h2>
          <div className="w-24 h-1 bg-nature-green mx-auto mb-6"></div>
          <p className="text-lg text-balance">
            Vi tilbyr en hel del ulike undergrupper for våre medlemmer, hvor vi kan dykke dypere inn i flere ulike, spennende temaer. Temagruppene våre har regelmessige møter og events for medlemmene. Enten du er interessert i ritualer eller heller mer mot biologien, har vi noe for deg. 
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
          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
            {programs.map((program, index) => renderProgramCard(program, index))}
          </div>
        )}

        <div className="mt-16 text-center">
          <a href="#contact" className="btn-primary inline-flex items-center gap-2">
            Bli med i vårt trossamfunn
          </a>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
