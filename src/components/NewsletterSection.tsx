
import React from 'react';
import { Send, Mail } from 'lucide-react';

const NewsletterSection = () => {
  return (
    <section className="py-16 bg-nature-sage/30">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-8 bg-white rounded-lg shadow-sm p-8">
            <div className="w-16 h-16 bg-nature-sage/50 rounded-full flex items-center justify-center flex-shrink-0 mx-auto md:mx-0">
              <Mail className="text-nature-green" size={28} />
            </div>
            
            <div className="flex-grow text-center md:text-left">
              <h3 className="text-2xl font-serif font-semibold mb-2">Stay Connected with Nature</h3>
              <p className="text-muted-foreground mb-0">
                Join our newsletter for seasonal updates, event notifications, and nature connection tips.
              </p>
            </div>
            
            <div className="w-full md:w-auto">
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Your email address" 
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
