
import React from 'react';
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
              <li><a href={localePath('/temagrupper')} className="hover:text-nature-green transition-custom">{t('footer.themeGroups.cultivation')}</a></li>
              <li><a href={localePath('/temagrupper')} className="hover:text-nature-green transition-custom">{t('footer.themeGroups.sacredPlaces')}</a></li>
              <li><a href={localePath('/temagrupper')} className="hover:text-nature-green transition-custom">{t('footer.themeGroups.natureCommunity')}</a></li>
              <li><a href={localePath('/temagrupper')} className="hover:text-nature-green transition-custom">{t('footer.themeGroups.rituals')}</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 uppercase text-sm tracking-wider">{t('footer.aboutNaturfolk')}</h4>
            <ul className="space-y-2 opacity-80">
              <li><a href={localePath('/trosgrunnlag')} className="hover:text-nature-green transition-custom">{t('footer.faith')}</a></li>
              <li><a href={localePath('/about')} className="hover:text-nature-green transition-custom">{t('footer.aboutUs')}</a></li>
              <li><a href={localePath('/medlemskap')} className="hover:text-nature-green transition-custom">{t('footer.membership')}</a></li>
              <li><a href={localePath('/contact')} className="hover:text-nature-green transition-custom">{t('footer.contact')}</a></li>
              <li><a href={localePath('/blogg')} className="hover:text-nature-green transition-custom">{t('footer.blog')}</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 uppercase text-sm tracking-wider">{t('footer.member')}</h4>
            <ul className="space-y-2 opacity-80">
              <li><a href="/medlem-login" className="hover:text-nature-green transition-custom">{t('footer.memberLogin')}</a></li>
              <li><a href="/auth" className="hover:text-nature-green transition-custom">{t('footer.adminLogin')}</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/20 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="opacity-70 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Naturfolk. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm opacity-70">
            <a href={localePath('/personvern')} className="hover:text-nature-green transition-custom">{t('footer.privacy')}</a>
            <a href={localePath('/vilkar')} className="hover:text-nature-green transition-custom">{t('footer.terms')}</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
