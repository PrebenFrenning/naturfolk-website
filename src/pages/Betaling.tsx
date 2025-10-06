import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { CreditCard, Smartphone, ArrowLeft } from 'lucide-react';
import type { MembershipSignupData } from '@/lib/membershipValidation';

// Membership prices
const MEMBERSHIP_PRICES = {
  Hovedmedlem: 500, // NOK per year
  Støttemedlem: 300, // NOK per year
};

export default function Betaling() {
  const navigate = useNavigate();
  const [membershipData, setMembershipData] = useState<MembershipSignupData | null>(null);
  const [loading, setLoading] = useState(false);
  const [processingMethod, setProcessingMethod] = useState<'stripe' | 'vipps' | null>(null);

  useEffect(() => {
    // Get membership data from sessionStorage
    const storedData = sessionStorage.getItem('membershipData');
    if (!storedData) {
      toast({
        title: 'Ingen data funnet',
        description: 'Vennligst fyll ut registreringsskjemaet først',
        variant: 'destructive',
      });
      navigate('/bli-medlem');
      return;
    }

    try {
      const data = JSON.parse(storedData);
      setMembershipData(data);
    } catch (error) {
      console.error('Error parsing membership data:', error);
      navigate('/bli-medlem');
    }
  }, [navigate]);

  const handleStripePayment = async () => {
    if (!membershipData) return;

    setLoading(true);
    setProcessingMethod('stripe');

    try {
      // First, check if user is authenticated
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        // User needs to create an account first
        toast({
          title: 'Opprett konto',
          description: 'Du må opprette en konto før du kan betale',
        });
        
        // Store data and redirect to auth page
        navigate('/auth', { state: { from: '/betaling', membershipData } });
        return;
      }

      // Create Stripe checkout session
      const { data, error } = await supabase.functions.invoke('create-membership-payment', {
        body: {
          membershipData,
          paymentMethod: 'stripe',
        },
      });

      if (error) throw error;

      if (data?.url) {
        // Redirect to Stripe Checkout
        window.open(data.url, '_blank');
      }
    } catch (error) {
      console.error('Stripe payment error:', error);
      toast({
        title: 'Betalingsfeil',
        description: 'Kunne ikke starte Stripe-betaling. Vennligst prøv igjen.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
      setProcessingMethod(null);
    }
  };

  const handleVippsPayment = async () => {
    if (!membershipData) return;

    setLoading(true);
    setProcessingMethod('vipps');

    try {
      toast({
        title: 'Vipps-integrasjon kommer snart',
        description: 'Vipps-betaling er under utvikling. Vennligst bruk Stripe i mellomtiden.',
      });
      
      // TODO: Implement Vipps payment integration
      // This will require Vipps API credentials and setup
    } catch (error) {
      console.error('Vipps payment error:', error);
      toast({
        title: 'Betalingsfeil',
        description: 'Kunne ikke starte Vipps-betaling. Vennligst prøv igjen.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
      setProcessingMethod(null);
    }
  };

  if (!membershipData) {
    return null;
  }

  const price = MEMBERSHIP_PRICES[membershipData.membership_type];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-24 pb-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <Button
            variant="ghost"
            onClick={() => navigate('/bli-medlem')}
            className="mb-6"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Tilbake til skjema
          </Button>

          <div className="mb-8 text-center">
            <h1 className="text-4xl font-bold mb-2">Velg betalingsmetode</h1>
            <p className="text-muted-foreground">
              Du registrerer deg som <strong>{membershipData.membership_type}</strong>
            </p>
            <p className="text-2xl font-bold text-nature-green mt-4">
              {price} NOK / år
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Stripe Payment */}
            <Card className="hover:border-nature-green transition-colors">
              <CardHeader>
                <div className="flex items-center justify-center w-12 h-12 bg-nature-green/10 rounded-full mb-4 mx-auto">
                  <CreditCard className="w-6 h-6 text-nature-green" />
                </div>
                <CardTitle className="text-center">Betal med Stripe</CardTitle>
                <CardDescription className="text-center">
                  Betal trygt med kort via Stripe
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  onClick={handleStripePayment}
                  disabled={loading}
                  className="w-full"
                  size="lg"
                >
                  {processingMethod === 'stripe' ? 'Behandler...' : 'Betal med Stripe'}
                </Button>
                <p className="text-xs text-muted-foreground text-center mt-4">
                  Støtter Visa, Mastercard, American Express
                </p>
              </CardContent>
            </Card>

            {/* Vipps Payment */}
            <Card className="hover:border-nature-green transition-colors opacity-60">
              <CardHeader>
                <div className="flex items-center justify-center w-12 h-12 bg-nature-green/10 rounded-full mb-4 mx-auto">
                  <Smartphone className="w-6 h-6 text-nature-green" />
                </div>
                <CardTitle className="text-center">Betal med Vipps</CardTitle>
                <CardDescription className="text-center">
                  Rask og enkel betaling med Vipps
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  onClick={handleVippsPayment}
                  disabled={true}
                  variant="outline"
                  className="w-full"
                  size="lg"
                >
                  Kommer snart
                </Button>
                <p className="text-xs text-muted-foreground text-center mt-4">
                  Vipps-integrasjon er under utvikling
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="mt-8 p-6 bg-muted/30 rounded-lg border">
            <h3 className="font-semibold mb-2">Sammendrag av din registrering:</h3>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li><strong>Navn:</strong> {membershipData.first_name} {membershipData.middle_name} {membershipData.last_name}</li>
              <li><strong>E-post:</strong> {membershipData.email}</li>
              <li><strong>Medlemstype:</strong> {membershipData.membership_type}</li>
              <li><strong>Adresse:</strong> {membershipData.address}, {membershipData.postal_code} {membershipData.city}</li>
            </ul>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
