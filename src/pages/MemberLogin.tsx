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
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { Loader2, Mail, CheckCircle } from 'lucide-react';

type Step = 'email' | 'code' | 'success';

export default function MemberLogin() {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [step, setStep] = useState<Step>('email');
  const [loading, setLoading] = useState(false);
  const [memberFound, setMemberFound] = useState<boolean | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleCheckMember = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke('send-verification-code', {
        body: { email: email.toLowerCase() },
      });

      if (error) throw error;

      if (data?.error === 'not_found') {
        setMemberFound(false);
        setLoading(false);
        return;
      }

      if (data?.success) {
        setMemberFound(true);
        setStep('code');
        toast({
          title: 'Kode sendt!',
          description: 'Sjekk e-posten din for innloggingskoden.',
        });
      }
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: 'Feil',
        description: 'Noe gikk galt. Vennligst prøv igjen.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyCode = async () => {
    if (code.length !== 6) return;
    setLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke('verify-login-code', {
        body: { email: email.toLowerCase(), code },
      });

      if (error) throw error;

      if (data?.error) {
        toast({
          title: 'Ugyldig kode',
          description: data.error,
          variant: 'destructive',
        });
        setLoading(false);
        return;
      }

      if (data?.success && data?.token_hash) {
        // Use the token hash to verify OTP and get a session
        const { error: otpError } = await supabase.auth.verifyOtp({
          type: 'magiclink',
          token_hash: data.token_hash,
        });

        if (otpError) {
          console.error('OTP verify error:', otpError);
          toast({
            title: 'Innlogging feilet',
            description: 'Kunne ikke fullføre innloggingen. Prøv igjen.',
            variant: 'destructive',
          });
          setLoading(false);
          return;
        }

        setStep('success');
        toast({
          title: 'Innlogget!',
          description: 'Velkommen tilbake!',
        });

        // Redirect to member profile after short delay
        setTimeout(() => {
          navigate('/medlem');
        }, 1500);
      }
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: 'Feil',
        description: 'Noe gikk galt. Vennligst prøv igjen.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleResendCode = async () => {
    setLoading(true);
    setCode('');
    try {
      const { data, error } = await supabase.functions.invoke('send-verification-code', {
        body: { email: email.toLowerCase() },
      });
      if (error) throw error;
      toast({
        title: 'Ny kode sendt!',
        description: 'Sjekk e-posten din.',
      });
    } catch {
      toast({
        title: 'Feil',
        description: 'Kunne ikke sende ny kode.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setStep('email');
    setEmail('');
    setCode('');
    setMemberFound(null);
  };

  return (
    <>
      <Helmet>
        <title>Medlemsinnlogging - Naturfolk</title>
        <meta name="description" content="Logg inn som medlem i Naturfolk" />
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Navbar />

        <main className="flex-1 flex items-center justify-center p-4 pt-24">
          <Card className="w-full max-w-md">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold text-center">
                Medlemsinnlogging
              </CardTitle>
              <CardDescription className="text-center">
                {step === 'email' && 'Skriv inn eposten du registrerte deg med'}
                {step === 'code' && 'Skriv inn koden du mottok på e-post'}
                {step === 'success' && 'Du er nå logget inn!'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Step 1: Email */}
              {step === 'email' && (
                <form onSubmit={handleCheckMember} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">E-postadresse</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="din@epost.no"
                      value={email}
                      onChange={(e) => { setEmail(e.target.value); setMemberFound(null); }}
                      disabled={loading}
                      required
                    />
                  </div>

                  {memberFound === null && (
                    <Button type="submit" className="w-full" disabled={loading}>
                      {loading ? (
                        <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sjekker...</>
                      ) : (
                        <><Mail className="mr-2 h-4 w-4" /> Fortsett</>
                      )}
                    </Button>
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
                        <Button type="button" variant="outline" onClick={resetForm}>
                          Prøv på nytt
                        </Button>
                        <Button type="button" onClick={() => navigate('/medlemskap')}>
                          Bli medlem
                        </Button>
                      </div>
                    </div>
                  )}
                </form>
              )}

              {/* Step 2: Enter verification code */}
              {step === 'code' && (
                <div className="space-y-6">
                  <div className="p-4 bg-nature-green/10 border border-nature-green/20 rounded-lg text-center">
                    <Mail className="h-8 w-8 mx-auto mb-2 text-nature-green" />
                    <p className="text-sm font-medium">
                      Vi har sendt en 6-sifret kode til
                    </p>
                    <p className="text-sm font-bold">{email}</p>
                  </div>

                  <div className="flex justify-center">
                    <InputOTP maxLength={6} value={code} onChange={setCode}>
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                  </div>

                  <div className="space-y-2">
                    <Button
                      className="w-full"
                      disabled={code.length !== 6 || loading}
                      onClick={handleVerifyCode}
                    >
                      {loading ? (
                        <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Verifiserer...</>
                      ) : (
                        'Logg inn'
                      )}
                    </Button>

                    <Button
                      type="button"
                      variant="ghost"
                      className="w-full"
                      onClick={handleResendCode}
                      disabled={loading}
                    >
                      Send kode på nytt
                    </Button>

                    <Button
                      type="button"
                      variant="ghost"
                      className="w-full text-muted-foreground"
                      onClick={resetForm}
                    >
                      Prøv med annen e-post
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 3: Success */}
              {step === 'success' && (
                <div className="text-center space-y-4 py-4">
                  <CheckCircle className="h-16 w-16 mx-auto text-nature-green" />
                  <p className="text-lg font-medium">Velkommen tilbake!</p>
                  <p className="text-sm text-muted-foreground">Du blir nå videresendt...</p>
                </div>
              )}

              {step === 'email' && (
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
              )}
            </CardContent>
          </Card>
        </main>

        <Footer />
      </div>
    </>
  );
}
