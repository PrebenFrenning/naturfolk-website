import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Flame, MapPinned, Phone, Wallet } from "lucide-react";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import {
  bonfireCeremonyApplicationSchema,
  type BonfireCeremonyApplicationValues,
} from "@/lib/validation";

export default function BalseremoniSkjema() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<BonfireCeremonyApplicationValues>({
    resolver: zodResolver(bonfireCeremonyApplicationSchema),
    defaultValues: {
      requestedAt: "",
      locationAddress: "",
      applicantFullName: "",
      requestedAmount: undefined as unknown as number,
      vippsPhone: "",
      theme: "",
      shortDescription: "",
      additionalInfo: "",
    },
  });

  const onSubmit = async (values: BonfireCeremonyApplicationValues) => {
    setIsSubmitting(true);

    try {
      const { data, error } = await supabase.functions.invoke("send-bonfire-ceremony-application", {
        body: values,
      });

      if (error) throw error;

      if (data?.success) {
        toast.success("Søknaden er sendt", {
          description: "Vi har sendt søknaden videre til Naturfolk og lagret en kopi i systemet.",
        });
        form.reset({
          requestedAt: "",
          locationAddress: "",
          applicantFullName: "",
          requestedAmount: undefined as unknown as number,
          vippsPhone: "",
          theme: "",
          shortDescription: "",
          additionalInfo: "",
        });
        return;
      }

      if (data?.saved) {
        toast("Søknaden er mottatt", {
          description: "E-posten ble forsinket, men søknaden er lagret og kan følges opp manuelt.",
        });
        form.reset({
          requestedAt: "",
          locationAddress: "",
            applicantFullName: "",
          requestedAmount: undefined as unknown as number,
            vippsPhone: "",
          additionalInfo: "",
        });
        return;
      }

      throw new Error(data?.error || "Noe gikk galt");
    } catch {
      toast.error("Kunne ikke sende søknaden", {
        description: "Prøv igjen om litt, eller kontakt oss direkte på post@naturfolk.org.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Helmet>
        <title>Bålseremoni-skjema | Naturfolk</title>
        <meta
          name="description"
          content="Skjema for medlemmer som vil søke om midler til å holde egne bålsamlinger i Naturfolk."
        />
      </Helmet>

      <Navbar />

      <main className="flex-1 pt-28 pb-16">
        <section className="container mx-auto px-4 max-w-5xl">
          <div className="grid gap-8 lg:grid-cols-[0.95fr_1.25fr] items-start">
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm text-muted-foreground">
                  <Flame className="h-4 w-4 text-primary" />
                  Skjult underside for søknader om bålsamling
                </div>
                <div className="space-y-3">
                  <h1 className="text-4xl md:text-5xl font-semibold text-foreground">Søk om midler til bålseremoni</h1>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    Send inn ønsket tidspunkt, lokasjon og praktisk info, så går søknaden direkte til Naturfolk for vurdering.
                  </p>
                </div>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Dette trenger vi</CardTitle>
                  <CardDescription>Gi oss nok informasjon til å vurdere samlingen og utbetalingen.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 text-sm text-muted-foreground">
                  <div className="flex items-start gap-3">
                    <MapPinned className="mt-0.5 h-4 w-4 text-primary" />
                    <p>Adresse eller tydelig oppmøtested for bålsamlingen.</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <Wallet className="mt-0.5 h-4 w-4 text-primary" />
                    <p>Ønsket beløp i kroner og et telefonnummer som kan motta Vipps.</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone className="mt-0.5 h-4 w-4 text-primary" />
                    <p>Ekstra detaljer i kommentarfeltet dersom noe bør tas hensyn til.</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Søknadsskjema</CardTitle>
                <CardDescription>Alle søknader sendes til post@naturfolk.org med emnet “Søknad om midler til bålseremoni”.</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                  <div className="space-y-2">
                    <Label htmlFor="requestedAt">Dato og klokkeslett for ønsket bålsamling</Label>
                    <Input id="requestedAt" type="datetime-local" {...form.register("requestedAt")} />
                    <p className="text-sm text-destructive">{form.formState.errors.requestedAt?.message}</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="locationAddress">Lokasjon for bålsamlingen</Label>
                    <Input
                      id="locationAddress"
                      placeholder="Adresse for oppmøte"
                      {...form.register("locationAddress")}
                    />
                    <p className="text-sm text-destructive">{form.formState.errors.locationAddress?.message}</p>
                  </div>

                  <div className="grid gap-5 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="applicantFullName">Fullt navn</Label>
                      <Input id="applicantFullName" {...form.register("applicantFullName")} />
                      <p className="text-sm text-destructive">{form.formState.errors.applicantFullName?.message}</p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="requestedAmount">Ønsket beløp</Label>
                      <Input id="requestedAmount" type="number" min="1" step="1" {...form.register("requestedAmount")} />
                      <p className="text-sm text-destructive">{form.formState.errors.requestedAmount?.message}</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="vippsPhone">Telefonnummer for Vipps</Label>
                    <Input id="vippsPhone" type="tel" {...form.register("vippsPhone")} />
                    <p className="text-sm text-destructive">{form.formState.errors.vippsPhone?.message}</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="additionalInfo">Kommentar</Label>
                    <Textarea
                      id="additionalInfo"
                      rows={6}
                      placeholder="Relevant praktisk info, ønsker eller annen kontekst"
                      {...form.register("additionalInfo")}
                    />
                    <p className="text-sm text-destructive">{form.formState.errors.additionalInfo?.message}</p>
                  </div>

                  <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
                    {isSubmitting ? "Sender søknad..." : "Send søknad"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <Footer />
      <ScrollToTop />
    </div>
  );
}