import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function MemberLogin() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [memberFound, setMemberFound] = useState<boolean | null>(null);
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleCheckMember = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast({
        title: "E-post påkrevd",
        description: "Vennligst fyll inn din e-postadresse.",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);

    try {
      // Check if email exists in profiles table
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('email, phone')
        .eq('email', email.toLowerCase())
        .maybeSingle();

      if (error) throw error;

      if (profile) {
        setMemberFound(true);
        setPhoneNumber(profile.phone || '');
        toast({
          title: "Medlem funnet!",
          description: "Vi har funnet din profil i vårt system.",
        });
      } else {
        setMemberFound(false);
        toast({
          title: "Ikke registrert medlem",
          description: "Vi finner ingen profil med denne e-postadressen.",
        });
      }
    } catch (error) {
      console.error('Error checking member:', error);
      toast({
        title: "Feil",
        description: "Noe gikk galt. Vennligst prøv igjen.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGoToMembership = () => {
    navigate('/medlemskap');
  };

  return (
    <>
      <Helmet>
        <title>Medlemsinnlogging - Naturfolk</title>
        <meta name="description" content="Logg inn som medlem i Naturfolk" />
      </Helmet>
      
      <div className="min-h-screen flex flex-col">
        <Navbar />
        
        <main className="flex-1 flex items-center justify-center p-4">
          <Card className="w-full max-w-md">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold text-center">
                Medlemsinnlogging
              </CardTitle>
              <CardDescription className="text-center">
                Skriv inn eposten du registrerte deg med
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleCheckMember} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">E-postadresse</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="din@epost.no"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={loading || memberFound !== null}
                    required
                  />
                </div>

                {memberFound === null && (
                  <Button 
                    type="submit" 
                    className="w-full"
                    disabled={loading}
                  >
                    {loading ? 'Sjekker...' : 'Fortsett'}
                  </Button>
                )}

                {memberFound === true && (
                  <div className="space-y-4">
                    <div className="p-4 bg-nature-green/10 border border-nature-green/20 rounded-lg">
                      <p className="text-sm text-center mb-2">
                        Vi har funnet din profil!
                      </p>
                      {phoneNumber && (
                        <p className="text-sm text-center text-muted-foreground">
                          En bekreftelseskode vil bli sendt til: {phoneNumber.slice(0, 3)}***{phoneNumber.slice(-2)}
                        </p>
                      )}
                      <p className="text-sm text-center text-muted-foreground mt-2">
                        (SMS-verifisering kommer snart)
                      </p>
                    </div>
                    <Button 
                      type="button"
                      className="w-full"
                      onClick={() => {
                        setMemberFound(null);
                        setEmail('');
                      }}
                    >
                      Prøv på nytt
                    </Button>
                  </div>
                )}

                {memberFound === false && (
                  <div className="space-y-4">
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm text-center mb-2">
                        Vi finner ingen profil med denne e-postadressen.
                      </p>
                      <p className="text-sm text-center text-muted-foreground">
                        Er du ikke medlem ennå?
                      </p>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <Button 
                        type="button"
                        variant="outline"
                        onClick={() => {
                          setMemberFound(null);
                          setEmail('');
                        }}
                      >
                        Prøv på nytt
                      </Button>
                      <Button 
                        type="button"
                        onClick={handleGoToMembership}
                      >
                        Bli medlem
                      </Button>
                    </div>
                  </div>
                )}
              </form>

              <div className="mt-6 space-y-2 text-center">
                <p className="text-sm text-muted-foreground">
                  Ikke medlem ennå?{' '}
                  <a href="/medlemskap" className="text-nature-green hover:underline">
                    Meld deg inn her
                  </a>
                </p>
                <p className="text-sm text-muted-foreground">
                  Er du admin?{' '}
                  <a href="/auth" className="text-nature-green hover:underline">
                    Logg inn her
                  </a>
                </p>
              </div>
            </CardContent>
          </Card>
        </main>

        <Footer />
      </div>
    </>
  );
}
