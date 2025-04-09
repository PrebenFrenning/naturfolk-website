
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
  id: number;
  title: string;
  date: Date;
  time: string;
  location: string;
  description: string;
  image: string;
  maxParticipants?: number;
  registeredParticipants?: {
    name: string;
    email?: string;
  }[];
  detailedDescription?: string;
  requirements?: string[];
  organizer?: string;
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
  
  const registeredCount = event.registeredParticipants?.length || 0;
  const availableSpots = event.maxParticipants 
    ? event.maxParticipants - registeredCount 
    : 'Ubegrenset';
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-serif">{event.title}</DialogTitle>
          <DialogDescription className="flex items-center gap-2 text-sm text-nature-green">
            <CalendarDays size={14} />
            {format(event.date, 'PPP')} - {event.time}
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
          <div>
            <div className="rounded-lg overflow-hidden mb-4">
              <img 
                src={`${event.image}?auto=format&fit=crop&w=800&q=80`} 
                alt={event.title} 
                className="w-full h-52 object-cover"
              />
            </div>
            
            <div className="space-y-4">
              <div className="flex flex-col gap-2 text-sm">
                <div className="flex items-center gap-2">
                  <Clock size={16} className="text-nature-green" />
                  <span>{event.time}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={16} className="text-nature-green" />
                  <span>{event.location}</span>
                </div>
                {event.maxParticipants && (
                  <div className="flex items-center gap-2">
                    <Users size={16} className="text-nature-green" />
                    <span>
                      {registeredCount}/{event.maxParticipants} påmeldte
                      {availableSpots !== 'Ubegrenset' && availableSpots <= 3 && (
                        <span className="ml-2 text-orange-500 font-medium">
                          Kun {availableSpots} plasser igjen!
                        </span>
                      )}
                    </span>
                  </div>
                )}
                {event.organizer && (
                  <div className="flex items-center gap-2">
                    <Info size={16} className="text-nature-green" />
                    <span>Arrangør: {event.organizer}</span>
                  </div>
                )}
              </div>
              
              <Separator />
              
              <div>
                <h3 className="font-medium mb-2">Om arrangementet</h3>
                <p className="text-muted-foreground text-sm">
                  {event.detailedDescription || event.description}
                </p>
              </div>
              
              {event.requirements && event.requirements.length > 0 && (
                <>
                  <Separator />
                  <div>
                    <h3 className="font-medium mb-2">Det bør du ha med</h3>
                    <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                      {event.requirements.map((req, index) => (
                        <li key={index}>{req}</li>
                      ))}
                    </ul>
                  </div>
                </>
              )}
              
              {event.registeredParticipants && event.registeredParticipants.length > 0 && (
                <>
                  <Separator />
                  <div>
                    <h3 className="font-medium mb-2">Påmeldte deltakere</h3>
                    <div className="max-h-32 overflow-y-auto">
                      <ul className="text-sm text-muted-foreground space-y-1">
                        {event.registeredParticipants.map((person, index) => (
                          <li key={index} className="flex items-center gap-2">
                            <Users size={14} className="text-nature-green" />
                            {person.name}
                          </li>
                        ))}
                      </ul>
                    </div>
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
                    
                    {event.maxParticipants && availableSpots !== 'Ubegrenset' && availableSpots <= 0 ? (
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
