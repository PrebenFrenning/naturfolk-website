
import React from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

const ContactSection = () => {
  return (
    <section id="contact" className="section-padding bg-white">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-semibold mb-6">Get In Touch</h2>
          <div className="w-24 h-1 bg-nature-green mx-auto mb-6"></div>
          <p className="text-lg text-balance">
            Have questions about our programs or want to get involved? Reach out to us using the form below or contact us directly.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-serif font-semibold mb-6">Contact Information</h3>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-nature-sage rounded-full flex items-center justify-center flex-shrink-0">
                  <Mail className="text-nature-green" size={18} />
                </div>
                <div>
                  <h4 className="font-medium mb-1">Email</h4>
                  <p className="text-muted-foreground">info@naturfolk.org</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-nature-sage rounded-full flex items-center justify-center flex-shrink-0">
                  <Phone className="text-nature-green" size={18} />
                </div>
                <div>
                  <h4 className="font-medium mb-1">Phone</h4>
                  <p className="text-muted-foreground">(123) 456-7890</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-nature-sage rounded-full flex items-center justify-center flex-shrink-0">
                  <MapPin className="text-nature-green" size={18} />
                </div>
                <div>
                  <h4 className="font-medium mb-1">Location</h4>
                  <p className="text-muted-foreground">123 Nature Way, Greenville, CA 95501</p>
                </div>
              </div>
            </div>

            <div className="mt-12">
              <h3 className="text-2xl font-serif font-semibold mb-6">Join Our Newsletter</h3>
              <p className="mb-4">Stay updated with our latest programs, events, and conservation efforts.</p>
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

          <div>
            <h3 className="text-2xl font-serif font-semibold mb-6">Send Us a Message</h3>
            <form className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">First Name</label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-3 border border-gray-200 rounded focus:border-nature-green focus:ring-1 focus:ring-nature-green outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Last Name</label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-3 border border-gray-200 rounded focus:border-nature-green focus:ring-1 focus:ring-nature-green outline-none"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input 
                  type="email" 
                  className="w-full px-4 py-3 border border-gray-200 rounded focus:border-nature-green focus:ring-1 focus:ring-nature-green outline-none"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Subject</label>
                <input 
                  type="text" 
                  className="w-full px-4 py-3 border border-gray-200 rounded focus:border-nature-green focus:ring-1 focus:ring-nature-green outline-none"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Message</label>
                <textarea 
                  rows={5}
                  className="w-full px-4 py-3 border border-gray-200 rounded focus:border-nature-green focus:ring-1 focus:ring-nature-green outline-none"
                ></textarea>
              </div>
              
              <button 
                type="submit" 
                className="btn-primary w-full"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
