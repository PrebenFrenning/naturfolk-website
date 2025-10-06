import { useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useQuery } from '@tanstack/react-query';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, CheckCircle, Clock, CreditCard } from 'lucide-react';
import { format } from 'date-fns';
import { nb } from 'date-fns/locale';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export default function MemberOverview() {
  const { user } = useAuth();

  const { data: profile } = useQuery({
    queryKey: ['profile', user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user?.id)
        .single();
      if (error) throw error;
      return data;
    },
    enabled: !!user?.id,
  });

  const { data: upcomingEvents } = useQuery({
    queryKey: ['upcoming-events', user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('event_registrations')
        .select('*, events(*)')
        .eq('user_id', user?.id)
        .gte('events.start_date', new Date().toISOString())
        .order('events.start_date', { ascending: true });
      if (error) throw error;
      return data;
    },
    enabled: !!user?.id,
  });

  const { data: pastEvents } = useQuery({
    queryKey: ['past-events', user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('event_registrations')
        .select('*, events(*)')
        .eq('user_id', user?.id)
        .lt('events.start_date', new Date().toISOString())
        .order('events.start_date', { ascending: false });
      if (error) throw error;
      return data;
    },
    enabled: !!user?.id,
  });

  const { data: payments } = useQuery({
    queryKey: ['payments', user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('membership_payments')
        .select('*')
        .eq('user_id', user?.id)
        .order('payment_date', { ascending: false })
        .limit(1);
      if (error) throw error;
      return data;
    },
    enabled: !!user?.id,
  });

  const latestPayment = payments?.[0];
  const isPaymentCurrent = latestPayment?.status === 'paid' && 
    new Date(latestPayment.period_end) > new Date();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="container mx-auto px-4 pt-32 pb-12 max-w-6xl">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-2">Medlemsoversikt</h1>
            <p className="text-muted-foreground">Velkommen tilbake, {profile?.full_name}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  Kontoinfo
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div>
                  <p className="text-sm text-muted-foreground">Medlem siden</p>
                  <p className="font-medium">
                    {profile?.created_at 
                      ? format(new Date(profile.created_at), 'PPP', { locale: nb })
                      : 'N/A'}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Sist innlogget</p>
                  <p className="font-medium">
                    {profile?.last_login_at 
                      ? format(new Date(profile.last_login_at), 'PPP', { locale: nb })
                      : 'N/A'}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5" />
                  Betalingsstatus
                </CardTitle>
              </CardHeader>
              <CardContent>
                {latestPayment ? (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Status</span>
                      <Badge variant={isPaymentCurrent ? "default" : "destructive"}>
                        {isPaymentCurrent ? 'Betalt' : 'Utløpt'}
                      </Badge>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Gyldig til</p>
                      <p className="font-medium">
                        {format(new Date(latestPayment.period_end), 'PPP', { locale: nb })}
                      </p>
                    </div>
                  </div>
                ) : (
                  <p className="text-muted-foreground">Ingen betalingsinformasjon tilgjengelig</p>
                )}
              </CardContent>
            </Card>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Kommende arrangementer
              </CardTitle>
            </CardHeader>
            <CardContent>
              {upcomingEvents && upcomingEvents.length > 0 ? (
                <div className="space-y-4">
                  {upcomingEvents.map((registration: any) => (
                    <div key={registration.id} className="flex items-start justify-between border-b pb-4 last:border-0">
                      <div>
                        <Link to={`/kalender`} className="font-medium hover:text-nature-green transition-colors">
                          {registration.events.title}
                        </Link>
                        <p className="text-sm text-muted-foreground">
                          {format(new Date(registration.events.start_date), 'PPP', { locale: nb })}
                        </p>
                      </div>
                      <Badge variant="outline">Påmeldt</Badge>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground mb-4">Du er ikke påmeldt noen kommende arrangementer</p>
                  <Button asChild>
                    <Link to="/kalender">Se arrangementer</Link>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                Tidligere arrangementer
              </CardTitle>
            </CardHeader>
            <CardContent>
              {pastEvents && pastEvents.length > 0 ? (
                <div className="space-y-4">
                  {pastEvents.map((registration: any) => (
                    <div key={registration.id} className="flex items-start justify-between border-b pb-4 last:border-0">
                      <div>
                        <p className="font-medium">{registration.events.title}</p>
                        <p className="text-sm text-muted-foreground">
                          {format(new Date(registration.events.start_date), 'PPP', { locale: nb })}
                        </p>
                      </div>
                      {registration.attended && (
                        <Badge variant="secondary">Deltatt</Badge>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground text-center py-8">Ingen tidligere arrangementer</p>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}
