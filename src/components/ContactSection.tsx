
import React from 'react';
import { Mail, Send } from 'lucide-react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card } from "@/components/ui/card";
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
  // Initialize form with validation schema
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

  // Newsletter form state
  const [email, setEmail] = React.useState("");

  // Handle form submission
  const onSubmit = (data: ContactFormValues) => {
    // For demonstration purposes - would connect to an API in production
    console.log(data);
    toast({
      title: "Melding sendt!",
      description: "Takk for at du kontaktet oss. Vi svarer kort.",
    });
    form.reset();
  };

  // Handle newsletter subscription
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // For demonstration purposes - would connect to an API in production
    toast({
      title: "Abonnert!",
      description: "Du er nå lagt til i vårt nyhetsbrev.",
    });
    setEmail("");
  };

  return (
    <section id="contact" className="section-padding bg-white">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-semibold mb-6">Ta kontakt</h2>
          <div className="w-24 h-1 bg-nature-green mx-auto mb-6"></div>
          <p className="text-lg text-balance">
            Har du spørsmål om Naturfolk? Ta kontakt med oss ved å bruke skjemaet nedenfor eller kontakt oss direkte.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-serif font-semibold mb-6">Kontaktinformasjon</h3>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-nature-sage rounded-full flex items-center justify-center flex-shrink-0">
                  <Mail className="text-nature-green" size={18} />
                </div>
                <div>
                  <h4 className="font-medium mb-1">E-post</h4>
                  <a href="mailto:post@naturfolk.org" className="text-muted-foreground hover:text-nature-green transition-colors">
                    post@naturfolk.org
                  </a>
                </div>
              </div>
            </div>

            <Card className="mt-12 p-6 border-nature-sage">
              <h3 className="text-2xl font-serif font-semibold mb-4">Abonner på vårt nyhetsbrev</h3>
              <p className="mb-4">Hold deg oppdatert med kommende arrangementer og nyheter fra Naturfolk.</p>
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
            </Card>
          </div>

          <div>
            <h3 className="text-2xl font-serif font-semibold mb-6">Send oss en melding</h3>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Fornavn</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Ditt fornavn" 
                            {...field} 
                          />
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
                          <Input 
                            placeholder="Ditt etternavn" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>E-post</FormLabel>
                      <FormControl>
                        <Input 
                          type="email" 
                          placeholder="Din e-postadresse" 
                          {...field} 
                        />
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
                        <Input 
                          placeholder="Hva gjelder henvendelsen?" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Melding</FormLabel>
                      <FormControl>
                        <Textarea 
                          rows={5}
                          placeholder="Skriv din melding her" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button 
                  type="submit" 
                  className="w-full bg-nature-green hover:bg-nature-green/90"
                >
                  Send melding
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
