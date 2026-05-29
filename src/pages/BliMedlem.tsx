import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/hooks/use-toast";
import { membershipSignupSchema, type MembershipSignupData } from "@/lib/membershipValidation";
import { Users } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { supabase } from "@/integrations/supabase/client";

const COUNTRIES = [
  "Norge",
  "Sverige",
  "Danmark",
  "Finland",
  "Island",
  "Tyskland",
  "Storbritannia",
  "Frankrike",
  "Spania",
  "Italia",
  "Nederland",
  "Belgia",
  "Østerrike",
  "Sveits",
  "Polen",
  "USA",
  "Canada",
  "Australia",
  "Annet",
];

export default function BliMedlem() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<MembershipSignupData>({
    resolver: zodResolver(membershipSignupSchema),
    defaultValues: (() => {
      const saved = localStorage.getItem('membershipFormData');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {}
      }
      return {
        membership_type: "Hovedmedlem",
        country: "Norge",
        newsletter_subscribed: false,
      };
    })(),
  });

  const membershipType = watch("membership_type");

  // Auto-save form data to localStorage so user doesn't lose progress
  const allValues = watch();
  useEffect(() => {
    localStorage.setItem('membershipFormData', JSON.stringify(allValues));
  }, [allValues]);

  const onSubmit = async (data: MembershipSignupData) => {
    setLoading(true);
    try {
      // Store the membership data in sessionStorage to pass to payment page
      sessionStorage.setItem("membershipData", JSON.stringify(data));

      // If user opted in to newsletter, add them to Mailchimp (fire and forget)
      if (data.newsletter_subscribed) {
        supabase.functions
          .invoke("mailchimp-subscribe", {
            body: {
              email: data.email,
              tag: "lovable-member-signup",
              first_name: data.first_name,
              last_name: data.last_name,
            },
          })
          .catch((err) => console.error("Mailchimp subscribe failed:", err));
      }

      // Navigate to payment page
      navigate("/betaling");

      toast({
        title: "Informasjon lagret",
        description: "Vennligst velg betalingsmetode",
      });
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "Feil",
        description: "Noe gikk galt. Vennligst prøv igjen.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 pt-24 pb-12">
        <div className="container mx-auto px-4 max-w-3xl">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-muted-foreground">Steg 1 av 2</span>
              <span className="text-sm font-medium text-muted-foreground">50%</span>
            </div>
            <Progress value={50} className="h-2" />
          </div>

          <div className="mb-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-nature-green/10 rounded-full mb-4">
              <Users className="w-8 h-8 text-nature-green" />
            </div>
            <h1 className="text-4xl font-bold mb-2">Meld deg inn i Naturfolk</h1>
            <p className="text-muted-foreground">Fyll ut skjemaet under for å bli medlem</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-card p-8 rounded-lg border">
            {/* Membership Type */}
            <div className="space-y-2">
              <Label htmlFor="membership_type">
                Medlemstype <span className="text-destructive">*</span>
              </Label>
              <Select value={membershipType} onValueChange={(value) => setValue("membership_type", value as any)}>
                <SelectTrigger>
                  <SelectValue placeholder="Velg medlemstype" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Hovedmedlem">Hovedmedlem</SelectItem>
                  <SelectItem value="Støttemedlem">Støttemedlem</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">
                *For å bli hovedmedlem må du være utmeldt andre trossamfunn
              </p>
              {errors.membership_type && <p className="text-sm text-destructive">{errors.membership_type.message}</p>}
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">
                E-post <span className="text-destructive">*</span>
              </Label>
              <Input id="email" type="email" {...register("email")} />
              {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
            </div>

            {/* Name Fields */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="first_name">
                  Fornavn <span className="text-destructive">*</span>
                </Label>
                <Input id="first_name" {...register("first_name")} />
                {errors.first_name && <p className="text-sm text-destructive">{errors.first_name.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="middle_name">Mellomnavn</Label>
                <Input id="middle_name" {...register("middle_name")} />
                {errors.middle_name && <p className="text-sm text-destructive">{errors.middle_name.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="last_name">
                  Etternavn <span className="text-destructive">*</span>
                </Label>
                <Input id="last_name" {...register("last_name")} />
                {errors.last_name && <p className="text-sm text-destructive">{errors.last_name.message}</p>}
              </div>
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <Label htmlFor="phone">
                Telefon <span className="text-destructive">*</span>
              </Label>
              <Input id="phone" type="tel" {...register("phone")} />
              {errors.phone && <p className="text-sm text-destructive">{errors.phone.message}</p>}
            </div>

            {/* Personnummer */}
            <div className="space-y-2">
              <Label htmlFor="personnummer">
                Fødselsnummer <span className="text-destructive">*</span>
              </Label>
              <Input id="personnummer" {...register("personnummer")} />
              <p className="text-xs text-muted-foreground">
                {membershipType === 'Støttemedlem' 
                  ? 'Støttemedlem: Fyll inn fødselsdato (6 siffer, ddmmåå)' 
                  : 'Hovedmedlem: Fyll inn fullt personnummer (11 siffer)'}
              </p>
              {errors.personnummer && <p className="text-sm text-destructive">{errors.personnummer.message}</p>}
            </div>

            {/* Gender */}
            <div className="space-y-2">
              <Label htmlFor="gender">
                Kjønn <span className="text-destructive">*</span>
              </Label>
              <Select onValueChange={(value) => setValue("gender", value as any)}>
                <SelectTrigger>
                  <SelectValue placeholder="Velg kjønn" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Mann">Mann</SelectItem>
                  <SelectItem value="Kvinne">Kvinne</SelectItem>
                  <SelectItem value="Ønsker ikke å oppgi">Ønsker ikke å oppgi</SelectItem>
                </SelectContent>
              </Select>
              {errors.gender && <p className="text-sm text-destructive">{errors.gender.message}</p>}
            </div>

            {/* Country */}
            <div className="space-y-2">
              <Label htmlFor="country">
                Land <span className="text-destructive">*</span>
              </Label>
              <Select defaultValue="Norge" onValueChange={(value) => setValue("country", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Velg land" />
                </SelectTrigger>
                <SelectContent>
                  {COUNTRIES.map((country) => (
                    <SelectItem key={country} value={country}>
                      {country}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.country && <p className="text-sm text-destructive">{errors.country.message}</p>}
            </div>

            {/* Address */}
            <div className="space-y-2">
              <Label htmlFor="address">
                Adresse <span className="text-destructive">*</span>
              </Label>
              <Input id="address" {...register("address")} />
              {errors.address && <p className="text-sm text-destructive">{errors.address.message}</p>}
            </div>

            {/* Address 2 */}
            <div className="space-y-2">
              <Label htmlFor="address_2">Adresse 2</Label>
              <Input id="address_2" {...register("address_2")} />
              {errors.address_2 && <p className="text-sm text-destructive">{errors.address_2.message}</p>}
            </div>

            {/* Postal Code and City */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="postal_code">
                  Postnummer <span className="text-destructive">*</span>
                </Label>
                <Input id="postal_code" {...register("postal_code")} />
                {errors.postal_code && <p className="text-sm text-destructive">{errors.postal_code.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="city">
                  Poststed <span className="text-destructive">*</span>
                </Label>
                <Input id="city" {...register("city")} />
                {errors.city && <p className="text-sm text-destructive">{errors.city.message}</p>}
              </div>
            </div>

            {/* Newsletter Consent */}
            <div className="flex items-start space-x-3 space-y-0">
              <Checkbox
                id="newsletter_subscribed"
                onCheckedChange={(checked) => setValue("newsletter_subscribed", checked as boolean)}
              />
              <div className="space-y-1 leading-none">
                <Label htmlFor="newsletter_subscribed" className="font-normal cursor-pointer">
                  Samtykke nyhetsbrev
                </Label>
                <p className="text-sm text-muted-foreground">
                  Huk av denne for å gi ditt samtykke til at vi sender deg sporadiske nyhetsbrev. Dette er en viktig
                  kanal for å holde seg oppdatert, og vi sender sjelden mer enn en 1-2 nyhetsbrev i måneden. Du kan når
                  som helst melde deg av.
                </p>
              </div>
            </div>

            {/* How did you hear about us */}
            <div className="space-y-2">
              <Label htmlFor="how_heard_about_us">Hvordan hørte du om oss?</Label>
              <Textarea
                id="how_heard_about_us"
                {...register("how_heard_about_us")}
                placeholder="Vi prøver hele tiden å bli bedre, og å få flere medlemmer. Valgfritt å svare, men vi setter stor pris på all info 😊"
                rows={4}
              />
              {errors.how_heard_about_us && (
                <p className="text-sm text-destructive">{errors.how_heard_about_us.message}</p>
              )}
            </div>

            <Button type="submit" size="lg" className="w-full" disabled={loading}>
              {loading ? "Behandler..." : "Neste"}
            </Button>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}
