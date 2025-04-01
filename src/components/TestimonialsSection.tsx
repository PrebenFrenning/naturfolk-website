
import React from 'react';
import { Quote } from 'lucide-react';

const TestimonialsSection = () => {
  const testimonials = [
    {
      quote: "Naturfolk has completely transformed my relationship with the outdoors. The guided forest walks taught me to notice the small wonders I'd been missing all my life.",
      author: "Sarah Johnson",
      title: "Community Member",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1400&q=80"
    },
    {
      quote: "The conservation workshops gave me practical skills to apply in my own garden. Now it's a thriving habitat for pollinators and birds!",
      author: "Michael Chen",
      title: "Workshop Participant",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1400&q=80"
    },
    {
      quote: "My children have developed a deep appreciation for nature through Naturfolk's youth programs. It's amazing to see them identify plants and understand ecosystems.",
      author: "Emma Rodriguez",
      title: "Parent",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1400&q=80"
    }
  ];

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
          <h2 className="text-3xl md:text-4xl font-serif font-semibold mb-6">Our Impact</h2>
          <div className="w-24 h-1 bg-nature-green mx-auto mb-6"></div>
          <p className="text-lg opacity-90 text-balance">
            Hear from members of our community about how connecting with nature has transformed their lives.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="bg-white/10 backdrop-blur-sm p-8 rounded-lg border border-white/20 hover:bg-white/20 transition-custom"
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
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="inline-block bg-white/10 backdrop-blur-sm p-6 rounded-lg border border-white/20">
            <div className="grid grid-cols-3 gap-8 md:gap-16 items-center text-white">
              <div className="text-center">
                <p className="font-serif text-4xl font-semibold text-nature-green">5,000+</p>
                <p className="text-white/80">Program Participants</p>
              </div>
              <div className="text-center">
                <p className="font-serif text-4xl font-semibold text-nature-green">12,000</p>
                <p className="text-white/80">Trees Planted</p>
              </div>
              <div className="text-center">
                <p className="font-serif text-4xl font-semibold text-nature-green">20+</p>
                <p className="text-white/80">Community Partners</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
