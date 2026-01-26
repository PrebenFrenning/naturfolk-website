
import React from 'react';
import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-nature-brown text-white">
      <div className="container-custom pt-16 pb-8">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="font-serif text-2xl font-semibold mb-4">Naturfolk</h3>
            <p className="mb-6 opacity-80 text-sm leading-relaxed">
              Naturfolk er en levende vei som forener fortidens visdom med samtidens livsutfordringer. I en tid der naturen roper om vern, inviterer vårt fellesskap deg til å gjenoppdage vår urnordiske ånd – slik den springer ut av vårt naturlandskap og livet vi lever i balanse med vår indre natur og naturen omkring oss.
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
            <h4 className="font-semibold mb-4 uppercase text-sm tracking-wider">Temagrupper</h4>
            <ul className="space-y-2 opacity-80">
              <li><a href="/temagrupper" className="hover:text-nature-green transition-custom">Dyrking & sanking</a></li>
              <li><a href="/temagrupper" className="hover:text-nature-green transition-custom">Hellige steder</a></li>
              <li><a href="/temagrupper" className="hover:text-nature-green transition-custom">Natursamfunn</a></li>
              <li><a href="/temagrupper" className="hover:text-nature-green transition-custom">Ritualer</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 uppercase text-sm tracking-wider">Om Naturfolk</h4>
            <ul className="space-y-2 opacity-80">
              <li><a href="/trosgrunnlag" className="hover:text-nature-green transition-custom">Trosgrunnlag</a></li>
              <li><a href="/about" className="hover:text-nature-green transition-custom">Om oss</a></li>
              <li><a href="/medlemskap" className="hover:text-nature-green transition-custom">Medlemskap</a></li>
              <li><a href="/kontakt" className="hover:text-nature-green transition-custom">Kontakt</a></li>
              <li><a href="/blogg" className="hover:text-nature-green transition-custom">Blogg</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 uppercase text-sm tracking-wider">Medlem</h4>
            <ul className="space-y-2 opacity-80">
              <li><a href="/medlem-login" className="hover:text-nature-green transition-custom">Medlemslogin</a></li>
              <li><a href="/auth" className="hover:text-nature-green transition-custom">Admin login</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/20 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="opacity-70 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Naturfolk. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm opacity-70">
            <a href="#" className="hover:text-nature-green transition-custom">Personvern</a>
            <a href="#" className="hover:text-nature-green transition-custom">Vilkår</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
