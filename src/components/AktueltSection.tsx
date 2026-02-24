import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, ArrowRight } from 'lucide-react';
import { format } from 'date-fns';
import { nb, enUS } from 'date-fns/locale';
import { useLanguage } from '@/lib/i18n/LanguageContext';

const AktueltSection = () => {
  const { t, localePath, language } = useLanguage();
  const dateLocale = language === 'en' ? enUS : nb;
  
  const { data: posts = [] } = useQuery({
    queryKey: ['homepage-aktuelt-posts'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('status', 'published')
        .order('publish_date', { ascending: false })
        .limit(3);
      
      if (error) throw error;
      return data;
    }
  });

  if (posts.length === 0) {
    return null;
  }

  return (
    <section className="section-padding bg-nature-offwhite">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-semibold mb-6">{t('aktuelt.title')}</h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {posts.map((post) => (
            <Link key={post.id} to={localePath(`/blogg/${post.slug}`)} className="group">
              <Card className="overflow-hidden shadow-sm hover:shadow-lg transition-shadow h-full">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={post.featured_image || '/images/fallback-bonfire.jpg'} 
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="h-4 w-4 text-nature-green" />
                    <Badge variant="secondary" className="text-xs">
                      {post.publish_date && format(new Date(post.publish_date), language === 'en' ? 'MMMM d, yyyy' : 'd. MMMM yyyy', { locale: dateLocale })}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg font-serif group-hover:text-nature-green transition-colors">
                    {post.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link to={localePath('/aktuelt')}>
            <Button size="lg" className="gap-2">
              {t('aktuelt.cta')}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default AktueltSection;
