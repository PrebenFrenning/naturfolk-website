
import React from 'react';
import { Quote } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";

const TestimonialsSection = () => {
  const isMobile = useIsMobile();
  const testimonials = [
    {
      quote: "The wilderness expedition with Naturfolk was truly life-changing. I developed a deeper connection with myself and gained a greater appreciation for wild places. The guides were exceptional.",
      author: "Aina Mumbi",
      title: "Wilderness Expedition Participant",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1400&q=80"
    },
    {
      quote: "The weekend retreat provided exactly what I needed - time to disconnect from technology and reconnect with nature. I left feeling rejuvenated and with practical tools to maintain that connection.",
      author: "André Fagerheim",
      title: "Weekend Retreat Participant",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1400&q=80"
    },
    {
      quote: "After participating in the Urban Nature Connection program, I'm amazed at how much wild nature exists right in our city. I now notice and appreciate the natural world around me every day.",
      author: "Sturla Ellingvåg",
      title: "Urban Nature Connection Participant",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1400&q=80"
    }
  ];

  const renderTestimonialCard = (testimonial, index) => (
    <div 
      key={index} 
      className="bg-white/10 backdrop-blur-sm p-8 rounded-lg border border-white/20 hover:bg-white/20 transition-custom h-full"
    >
      <Quote className="text-nature-green mb-4" size={28} />
      <p className="text-white mb-6 italic">"{testimonial.quote}"</p>
      <div className="flex items-center gap-4">
        <img 
          src={testimonial.image} 
          alt={testimonial.author} 
          className="w-12 h-12 rounded-full object-cover"
        />
        <div>
          <h4 className="text-white font-medium">{testimonial.author}</h4>
          <p className="text-white/70 text-sm">{testimonial.title}</p>
        </div>
      </div>
    </div>
  );

  return (
    <section id="impact" className="relative py-32">
      {/* Background image with overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2400&q=80" 
          alt="Nature landscape" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      <div className="container-custom relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16 text-white">
          <h2 className="text-3xl md:text-4xl font-serif font-semibold mb-6">Våre medlemmer</h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-lg opacity-90 text-balance">
            Hør hva våre medlemmer har å si om sine erfaringer med Naturfolk, og hvordan det påvirker deres liv.
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
                {testimonials.map((testimonial, index) => (
                  <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                    {renderTestimonialCard(testimonial, index)}
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
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => renderTestimonialCard(testimonial, index))}
          </div>
        )}

        <div className="mt-16 text-center meta-numbers">
          <div className="inline-block bg-white/10 backdrop-blur-sm p-6 rounded-lg border border-white/20">
            <div className="grid grid-cols-3 gap-8 md:gap-16 items-center text-white">
              <div className="text-center">
                <p className="font-serif text-4xl font-semibold text-nature-green">1,500+</p>
                <p className="text-white/80">Program Participants</p>
              </div>
              <div className="text-center">
                <p className="font-serif text-4xl font-semibold text-nature-green">25+</p>
                <p className="text-white/80">Wilderness Locations</p>
              </div>
              <div className="text-center">
                <p className="font-serif text-4xl font-semibold text-nature-green">8+</p>
                <p className="text-white/80">Countries</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Added "Bli medlem" button */}
        <div className="mt-12 text-center">
          <a href="/medlemskap" className="btn-primary inline-flex items-center gap-2 text-lg px-8 py-4">
            Bli medlem &rarr;
          </a>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
