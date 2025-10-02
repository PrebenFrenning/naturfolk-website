
import React, { useState } from 'react';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { format } from 'date-fns';
import { Calendar, CalendarDays, MapPin, Clock, Users, Info, AlertCircle } from 'lucide-react';
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";

type EventType = {
  id: string;
  title: string;
  description: string;
  start_date: string;
  end_date: string | null;
  location: string | null;
  image_url: string | null;
  max_participants: number | null;
  price: string | null;
  ticket_link: string | null;
  facebook_link: string | null;
  organized_by: string | null;
  what_to_bring: string | null;
  registration_deadline: string | null;
};

interface EventDialogProps {
  event: EventType | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const EventDialog = ({ event, open, onOpenChange }: EventDialogProps) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      // Reset form after successful submission
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: '',
      });
      
      // Reset submission status after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    }, 1000);
  };
  
  if (!event) return null;
  
  const eventDate = new Date(event.start_date);
  const endTime = event.end_date ? new Date(event.end_date) : null;
  const deadline = event.registration_deadline ? new Date(event.registration_deadline) : null;
  const registeredCount = 0; // TODO: Track registrations in database
  const availableSpots = event.max_participants 
    ? event.max_participants - registeredCount 
    : 'Ubegrenset';
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-serif">{event.title}</DialogTitle>
          <DialogDescription className="flex items-center gap-2 text-sm text-nature-green">
            <CalendarDays size={14} />
            {format(eventDate, 'PPP')} {endTime && `- ${format(eventDate, 'HH:mm')} - ${format(endTime, 'HH:mm')}`}
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
          <div>
            {event.image_url && (
              <div className="rounded-lg overflow-hidden mb-4">
                <img 
                  src={`${event.image_url}?auto=format&fit=crop&w=800&q=80`} 
                  alt={event.title} 
                  className="w-full h-52 object-cover"
                />
              </div>
            )}
            
            <div className="space-y-4">
              <div className="flex flex-col gap-2 text-sm">
                <div className="flex items-center gap-2">
                  <Clock size={16} className="text-nature-green" />
                  <span>
                    {format(eventDate, 'HH:mm')}
                    {endTime && ` - ${format(endTime, 'HH:mm')}`}
                  </span>
                </div>
                {event.location && (
                  <div className="flex items-center gap-2">
                    <MapPin size={16} className="text-nature-green" />
                    <span>{event.location}</span>
                  </div>
                )}
                {event.max_participants && (
                  <div className="flex items-center gap-2">
                    <Users size={16} className="text-nature-green" />
                    <span>
                      Maks {event.max_participants} deltakere
                    </span>
                  </div>
                )}
                {event.organized_by && (
                  <div className="flex items-center gap-2">
                    <Info size={16} className="text-nature-green" />
                    <span>Arrangør: {event.organized_by}</span>
                  </div>
                )}
                {event.price && (
                  <div className="flex items-center gap-2">
                    <span className="font-medium">Pris:</span>
                    <span>{event.price}</span>
                  </div>
                )}
                {deadline && (
                  <div className="flex items-center gap-2">
                    <CalendarDays size={16} className="text-nature-green" />
                    <span>Påmeldingsfrist: {format(deadline, 'PPP')}</span>
                  </div>
                )}
              </div>
              
              <Separator />
              
              {event.description && (
                <div>
                  <h3 className="font-medium mb-2">Om arrangementet</h3>
                  <div 
                    className="text-muted-foreground text-sm prose prose-sm max-w-none"
                    dangerouslySetInnerHTML={{ __html: event.description }}
                  />
                </div>
              )}
              
              {event.what_to_bring && (
                <>
                  <Separator />
                  <div>
                    <h3 className="font-medium mb-2">Det bør du ha med</h3>
                    <div 
                      className="text-muted-foreground text-sm prose prose-sm max-w-none"
                      dangerouslySetInnerHTML={{ __html: event.what_to_bring }}
                    />
                  </div>
                </>
              )}
            </div>
          </div>
          
          <div>
            <Card>
              <CardContent className="pt-6">
                {isSubmitted ? (
                  <div className="text-center py-6">
                    <div className="mb-4 mx-auto bg-green-100 text-green-800 rounded-full w-12 h-12 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="font-serif text-lg mb-2">Takk for din påmelding!</h3>
                    <p className="text-sm text-muted-foreground">Vi har sendt en bekreftelse til din e-postadresse.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <h3 className="font-serif text-lg mb-2">Meld deg på</h3>
                    
                    {event.max_participants && availableSpots !== 'Ubegrenset' && availableSpots <= 0 ? (
                      <div className="bg-orange-100 border border-orange-200 text-orange-800 p-4 rounded-md flex items-start gap-3">
                        <AlertCircle size={20} className="mt-0.5" />
                        <div>
                          <p className="font-medium">Dette arrangementet er fulltegnet</p>
                          <p className="text-sm">Vennligst prøv et annet arrangement eller kom tilbake senere.</p>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="space-y-2">
                          <Label htmlFor="name">Navn</Label>
                          <Input 
                            type="text" 
                            id="name" 
                            name="name" 
                            value={formData.name} 
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="email">E-post</Label>
                          <Input 
                            type="email" 
                            id="email" 
                            name="email" 
                            value={formData.email} 
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="phone">Telefon (valgfritt)</Label>
                          <Input 
                            type="tel" 
                            id="phone" 
                            name="phone" 
                            value={formData.phone} 
                            onChange={handleInputChange}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="message">Melding (valgfritt)</Label>
                          <Textarea 
                            id="message" 
                            name="message" 
                            value={formData.message} 
                            onChange={handleInputChange}
                            rows={3}
                          />
                        </div>
                        
                        <Button 
                          type="submit" 
                          className="w-full bg-nature-green hover:bg-nature-green/90"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? 'Sender...' : 'Meld meg på'}
                        </Button>
                      </>
                    )}
                  </form>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
        
        <DialogFooter className="flex flex-col sm:flex-row gap-2">
          <a 
            href="#contact" 
            className="text-sm text-nature-green hover:underline inline-flex items-center gap-1"
            onClick={() => onOpenChange(false)}
          >
            Har du spørsmål? Kontakt oss
          </a>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EventDialog;
