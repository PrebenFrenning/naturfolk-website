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
import { useLanguage } from '@/lib/i18n/LanguageContext';

type ContactFormValues = {
  firstName: string;
  lastName: string;
  email: string;
  subject: string;
  message: string;
};

const ContactSection = () => {
  const { t } = useLanguage();
  
  const formSchema = z.object({
    firstName: z.string().min(2, { message: t('contact.form.firstName') + " min 2" }),
    lastName: z.string().min(2, { message: t('contact.form.lastName') + " min 2" }),
    email: z.string().email(),
    subject: z.string().min(5),
    message: z.string().min(10),
  });

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
      title: t('contact.form.success.title'),
      description: t('contact.form.success.description'),
    });
    form.reset();
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: t('contact.newsletter.success.title'),
      description: t('contact.newsletter.success.description'),
    });
    setEmail("");
  };

  return (
    <section id="contact" className="section-padding bg-nature-offwhite">
      <div className="container-custom">
        <div className="max-w-2xl mx-auto text-center mb-14">
          <p className="text-lg text-muted-foreground leading-relaxed">
            {t('contact.intro')}
          </p>
        </div>

        <div className="max-w-5xl mx-auto space-y-10">
          <Card>
            <CardContent className="p-8 md:p-10">
              <h3 className="text-2xl font-serif font-semibold mb-8 text-nature-green">{t('contact.form.title')}</h3>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t('contact.form.firstName')}</FormLabel>
                          <FormControl>
                            <Input placeholder={t('contact.form.firstName.placeholder')} {...field} />
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
                          <FormLabel>{t('contact.form.lastName')}</FormLabel>
                          <FormControl>
                            <Input placeholder={t('contact.form.lastName.placeholder')} {...field} />
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
                          <FormLabel>{t('contact.form.email')}</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder={t('contact.form.email.placeholder')} {...field} />
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
                          <FormLabel>{t('contact.form.subject')}</FormLabel>
                          <FormControl>
                            <Input placeholder={t('contact.form.subject.placeholder')} {...field} />
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
                        <FormLabel>{t('contact.form.message')}</FormLabel>
                        <FormControl>
                          <Textarea rows={5} placeholder={t('contact.form.message.placeholder')} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit" className="bg-nature-green hover:bg-nature-green/90 px-8">
                    {t('contact.form.submit')}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardContent className="p-8 flex items-start gap-4">
                <div className="w-10 h-10 bg-nature-sage/50 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <Mail className="text-nature-green" size={18} />
                </div>
                <div>
                  <h4 className="font-serif font-semibold text-lg mb-1">{t('contact.email.title')}</h4>
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
                <h4 className="font-serif font-semibold text-lg mb-2">{t('contact.newsletter.title')}</h4>
                <p className="text-sm text-muted-foreground mb-4">{t('contact.newsletter.text')}</p>
                <form onSubmit={handleSubscribe} className="flex">
                  <Input
                    type="email"
                    placeholder={t('contact.form.email.placeholder')}
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
