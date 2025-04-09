
import React from 'react';
import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-nature-brown text-white">
      <div className="container-custom pt-16 pb-8">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="font-serif text-2xl font-semibold mb-4">Naturfolk</h3>
            <p className="mb-6 opacity-80">
              Reconnect with wild nature. Transformative wilderness experiences that foster a deeper connection with the natural world, yourself, and others.
            </p>
            <div className="flex gap-4">
              <a href="https://www.facebook.com/naturfolk" className="text-white hover:text-nature-green transition-custom">
                <Facebook size={20} />
              </a>
              <a href="https://www.instagram.com/naturfolk/" className="text-white hover:text-nature-green transition-custom">
                <Instagram size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 uppercase text-sm tracking-wider">Programs</h4>
            <ul className="space-y-2 opacity-80">
              <li><a href="#" className="hover:text-nature-green transition-custom">Wilderness Expeditions</a></li>
              <li><a href="#" className="hover:text-nature-green transition-custom">Weekend Retreats</a></li>
              <li><a href="#" className="hover:text-nature-green transition-custom">Urban Nature Connection</a></li>
              <li><a href="#" className="hover:text-nature-green transition-custom">Nature Immersion</a></li>
              <li><a href="#" className="hover:text-nature-green transition-custom">Wilderness Skills</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 uppercase text-sm tracking-wider">About</h4>
            <ul className="space-y-2 opacity-80">
              <li><a href="#" className="hover:text-nature-green transition-custom">Our Vision</a></li>
              <li><a href="#" className="hover:text-nature-green transition-custom">Team</a></li>
              <li><a href="#" className="hover:text-nature-green transition-custom">Locations</a></li>
              <li><a href="#" className="hover:text-nature-green transition-custom">Testimonials</a></li>
              <li><a href="#" className="hover:text-nature-green transition-custom">Journal</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 uppercase text-sm tracking-wider">Support</h4>
            <ul className="space-y-2 opacity-80">
              <li><a href="#" className="hover:text-nature-green transition-custom">Contact</a></li>
              <li><a href="#" className="hover:text-nature-green transition-custom">FAQ</a></li>
              <li><a href="#" className="hover:text-nature-green transition-custom">Gift Cards</a></li>
              <li><a href="#" className="hover:text-nature-green transition-custom">Partnerships</a></li>
              <li><a href="#" className="hover:text-nature-green transition-custom">Newsletter</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/20 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="opacity-70 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Naturfolk. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm opacity-70">
            <a href="#" className="hover:text-nature-green transition-custom">Privacy Policy</a>
            <a href="#" className="hover:text-nature-green transition-custom">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
