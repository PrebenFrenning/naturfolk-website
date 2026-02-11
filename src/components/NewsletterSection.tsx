
import React from 'react';
import { Send } from 'lucide-react';

const NewsletterSection = () => {
  return (
    <section className="py-20 bg-nature-sage/30">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-serif font-semibold mb-6">Hold deg oppdatert</h2>
            <div className="w-24 h-1 bg-nature-green mx-auto mb-6"></div>
            <p className="text-lg max-w-2xl mx-auto mb-8">
              Få de siste oppdateringene om våre arrangementer, temaer og fellesskapsaktiviteter direkte i din innboks.
            </p>
            <div className="w-full max-w-lg mx-auto">
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Din e-postadresse" 
                  className="flex-grow px-4 py-3 border border-gray-200 focus:border-nature-green focus:ring-1 focus:ring-nature-green outline-none rounded-l"
                />
                <button className="bg-nature-green text-white px-4 py-3 rounded-r hover:bg-nature-green/90 transition-custom">
                  <Send size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
