import React from "react";
import { Mail, Send } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";

// Define form validation schema
const formSchema = z.object({
  firstName: z.string().min(2, { message: "Fornavn må være minst 2 tegn." }),
  lastName: z.string().min(2, { message: "Etternavn må være minst 2 tegn." }),
  email: z.string().email({ message: "Vennligst oppgi en gyldig e-postadresse." }),
  subject: z.string().min(5, { message: "Emne må være minst 5 tegn." }),
  message: z.string().min(10, { message: "Melding må være minst 10 tegn." }),
});

type ContactFormValues = z.infer<typeof formSchema>;

const ContactSection = () => {
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const [email, setEmail] = React.useState("");

  const onSubmit = (data: ContactFormValues) => {
    console.log(data);
    toast({
      title: "Melding sendt!",
      description: "Takk for at du kontaktet oss. Vi svarer kort.",
    });
    form.reset();
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Abonnert!",
      description: "Du er nå lagt til i vårt nyhetsbrev.",
    });
    setEmail("");
  };

  return (
    <section id="contact" className="section-padding bg-nature-offwhite">
      <div className="container-custom">
        {/* Intro */}
        <div className="max-w-2xl mx-auto text-center mb-14">
          <p className="text-lg text-muted-foreground leading-relaxed">
            Har du spørsmål til Naturfolk? Ta kontakt med oss ved å bruke skjemaet nedenfor eller kontakt oss direkte på epost, så svarer vi så snart vi kan.
          </p>
        </div>

        <div className="max-w-5xl mx-auto space-y-10">
          {/* Contact Form */}
          <Card>
            <CardContent className="p-8 md:p-10">
              <h3 className="text-2xl font-serif font-semibold mb-8 text-nature-green">Send oss en melding</h3>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Fornavn</FormLabel>
                          <FormControl>
                            <Input placeholder="Ditt fornavn" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Etternavn</FormLabel>
                          <FormControl>
                            <Input placeholder="Ditt etternavn" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>E-post</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="Din e-postadresse" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="subject"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Emne</FormLabel>
                          <FormControl>
                            <Input placeholder="Hva gjelder henvendelsen?" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Melding</FormLabel>
                        <FormControl>
                          <Textarea rows={5} placeholder="Skriv din melding her" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit" className="bg-nature-green hover:bg-nature-green/90 px-8">
                    Send melding
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>

          {/* Bottom row: Email + Newsletter side by side */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardContent className="p-8 flex items-start gap-4">
                <div className="w-10 h-10 bg-nature-sage/50 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <Mail className="text-nature-green" size={18} />
                </div>
                <div>
                  <h4 className="font-serif font-semibold text-lg mb-1">E-post</h4>
                  <a
                    href="mailto:post@naturfolk.org"
                    className="text-muted-foreground hover:text-nature-green transition-colors"
                  >
                    post@naturfolk.org
                  </a>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-8">
                <h4 className="font-serif font-semibold text-lg mb-2">Nyhetsbrev</h4>
                <p className="text-sm text-muted-foreground mb-4">Hold deg oppdatert med arrangementer og nyheter.</p>
                <form onSubmit={handleSubscribe} className="flex">
                  <Input
                    type="email"
                    placeholder="Din e-postadresse"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="rounded-r-none border-r-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                    required
                  />
                  <Button className="bg-nature-green hover:bg-nature-green/90 rounded-l-none">
                    <Send size={18} />
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
