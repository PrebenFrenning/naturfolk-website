
import React from 'react';
import { Seedling, BookOpen, Users, Heart, Map, CalendarDays } from 'lucide-react';

const FeaturesSection = () => {
  const programs = [
    {
      icon: <Seedling size={24} />,
      title: "Conservation Initiatives",
      description: "Participate in habitat restoration, tree planting, and wildlife protection programs to support local ecosystems."
    },
    {
      icon: <BookOpen size={24} />,
      title: "Environmental Education",
      description: "Engaging workshops, courses, and resources that deepen understanding of natural systems and sustainability."
    },
    {
      icon: <Users size={24} />,
      title: "Community Programs",
      description: "Connect with like-minded individuals through regular gatherings, skill-sharing, and collaborative projects."
    },
    {
      icon: <Heart size={24} />,
      title: "Wellness in Nature",
      description: "Experience the healing benefits of nature through guided forest bathing, mindfulness walks, and outdoor yoga."
    },
    {
      icon: <Map size={24} />,
      title: "Nature Expeditions",
      description: "Join expert-led excursions to discover local biodiversity, geology, and ecological wonders."
    },
    {
      icon: <CalendarDays size={24} />,
      title: "Seasonal Celebrations",
      description: "Honor natural cycles through seasonal festivals, harvest celebrations, and solstice gatherings."
    }
  ];

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
            Discover the many ways you can engage with nature and our community through our diverse range of programs and initiatives.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {programs.map((program, index) => (
            <div 
              key={index} 
              className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-custom hover:-translate-y-1"
            >
              <div className="text-nature-green mb-4">{program.icon}</div>
              <h3 className="text-xl font-serif font-semibold mb-3">{program.title}</h3>
              <p className="text-muted-foreground">{program.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <a href="#contact" className="btn-primary inline-flex items-center gap-2">
            Get Involved
          </a>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
