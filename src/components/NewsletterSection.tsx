import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

const NewsletterSection = () => {
  const { t } = useLanguage();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || loading) return;
    setLoading(true);
    try {
      const { error } = await supabase.functions.invoke('mailchimp-subscribe', {
        body: { email, tag: 'newsletter-only' },
      });
      if (error) throw error;
      toast({ title: 'Takk!', description: 'Du er nå påmeldt nyhetsbrevet.' });
      setEmail('');
    } catch (err) {
      console.error(err);
      toast({
        title: 'Noe gikk galt',
        description: 'Kunne ikke melde deg på nå. Prøv igjen senere.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-20 bg-nature-sage/30">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-serif font-semibold mb-6">{t('newsletter.title')}</h2>
            <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
            <p className="text-lg max-w-2xl mx-auto mb-8">
              {t('newsletter.text')}
            </p>
            <form onSubmit={handleSubmit} className="w-full max-w-lg mx-auto">
              <div className="flex">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t('newsletter.placeholder')}
                  className="flex-grow px-4 py-3 border border-gray-200 focus:border-nature-green focus:ring-1 focus:ring-nature-green outline-none rounded-l"
                />
                <button
                  type="submit"
                  disabled={loading}
                  aria-label={t('newsletter.submitAria') || 'Meld meg på nyhetsbrevet'}
                  className="bg-nature-green text-white px-4 py-3 rounded-r hover:bg-nature-green/90 transition-custom disabled:opacity-60"
                >
                  <Send size={18} aria-hidden="true" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
