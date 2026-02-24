
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram } from 'lucide-react';
import { useLanguage } from '@/lib/i18n/LanguageContext';

const Footer = () => {
  const { t, localePath } = useLanguage();
  
  return (
    <footer className="bg-nature-brown text-white">
      <div className="container-custom pt-16 pb-8">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div>
            <h4 className="font-semibold mb-4 uppercase text-sm tracking-wider">Naturfolk</h4>
            <p className="mb-6 opacity-80 text-sm leading-relaxed">
              {t('footer.description')}
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
            <h4 className="font-semibold mb-4 uppercase text-sm tracking-wider">{t('footer.themeGroups')}</h4>
            <ul className="space-y-2 opacity-80">
              <li><Link to={localePath('/temagrupper')} className="hover:text-nature-green transition-custom">{t('footer.themeGroups.cultivation')}</Link></li>
              <li><Link to={localePath('/temagrupper')} className="hover:text-nature-green transition-custom">{t('footer.themeGroups.sacredPlaces')}</Link></li>
              <li><Link to={localePath('/temagrupper')} className="hover:text-nature-green transition-custom">{t('footer.themeGroups.natureCommunity')}</Link></li>
              <li><Link to={localePath('/temagrupper')} className="hover:text-nature-green transition-custom">{t('footer.themeGroups.rituals')}</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 uppercase text-sm tracking-wider">{t('footer.aboutNaturfolk')}</h4>
            <ul className="space-y-2 opacity-80">
              <li><Link to={localePath('/trosgrunnlag')} className="hover:text-nature-green transition-custom">{t('footer.faith')}</Link></li>
              <li><Link to={localePath('/about')} className="hover:text-nature-green transition-custom">{t('footer.aboutUs')}</Link></li>
              <li><Link to={localePath('/medlemskap')} className="hover:text-nature-green transition-custom">{t('footer.membership')}</Link></li>
              <li><Link to={localePath('/contact')} className="hover:text-nature-green transition-custom">{t('footer.contact')}</Link></li>
              <li><Link to={localePath('/blogg')} className="hover:text-nature-green transition-custom">{t('footer.blog')}</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 uppercase text-sm tracking-wider">{t('footer.member')}</h4>
            <ul className="space-y-2 opacity-80">
              <li><Link to="/medlem-login" className="hover:text-nature-green transition-custom">{t('footer.memberLogin')}</Link></li>
              <li><Link to="/auth" className="hover:text-nature-green transition-custom">{t('footer.adminLogin')}</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/20 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="opacity-70 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Naturfolk. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm opacity-70">
            <Link to={localePath('/personvern')} className="hover:text-nature-green transition-custom">{t('footer.privacy')}</Link>
            <Link to={localePath('/vilkar')} className="hover:text-nature-green transition-custom">{t('footer.terms')}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
