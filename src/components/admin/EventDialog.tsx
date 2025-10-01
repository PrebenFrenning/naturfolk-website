import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { User } from '@supabase/supabase-js';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { eventSchema } from '@/lib/validation';
import { sanitizeUrl } from '@/lib/sanitize';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RichTextEditor } from '@/components/RichTextEditor';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface Event {
  id?: string;
  title: string;
  description: string;
  start_date: string;
  end_date?: string;
  location?: string;
  image_url?: string;
  max_participants?: number;
  price?: string;
  ticket_link?: string;
  facebook_link?: string;
  organized_by?: string;
  what_to_bring?: string;
  status: 'draft' | 'published' | 'scheduled';
  author_id?: string;
}

interface EventDialogProps {
  open: boolean;
  onClose: (refresh: boolean) => void;
  event: Event | null;
  user: User | null;
}

export function EventDialog({ open, onClose, event, user }: EventDialogProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [location, setLocation] = useState('');
  const [status, setStatus] = useState<'draft' | 'published' | 'scheduled'>('draft');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState('');
  const [maxParticipants, setMaxParticipants] = useState('');
  const [price, setPrice] = useState('');
  const [ticketLink, setTicketLink] = useState('');
  const [facebookLink, setFacebookLink] = useState('');
  const [organizedBy, setOrganizedBy] = useState('Naturfolk');
  const [whatToBring, setWhatToBring] = useState('');
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (event) {
      setTitle(event.title || '');
      setDescription(event.description || '');
      setStartDate(event.start_date ? new Date(event.start_date) : undefined);
      setEndDate(event.end_date ? new Date(event.end_date) : undefined);
      setLocation(event.location || '');
      setStatus(event.status || 'draft');
      setImageUrl(event.image_url || '');
      setMaxParticipants(event.max_participants?.toString() || '');
      setPrice(event.price || '');
      setTicketLink(event.ticket_link || '');
      setFacebookLink(event.facebook_link || '');
      setOrganizedBy(event.organized_by || 'Naturfolk');
      setWhatToBring(event.what_to_bring || '');
    } else {
      resetForm();
    }
  }, [event, open]);

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setStartDate(undefined);
    setEndDate(undefined);
    setLocation('');
    setStatus('draft');
    setImageFile(null);
    setImageUrl('');
    setMaxParticipants('');
    setPrice('');
    setTicketLink('');
    setFacebookLink('');
    setOrganizedBy('Naturfolk');
    setWhatToBring('');
  };

  const handleImageUpload = async (file: File) => {
    setUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError, data } = await supabase.storage
        .from('event-images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('event-images')
        .getPublicUrl(filePath);

      setImageUrl(publicUrl);
      toast({ title: 'Image uploaded successfully' });
    } catch (error: any) {
      toast({
        title: 'Error uploading image',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!startDate) {
      toast({
        title: 'Start date required',
        description: 'Please select a start date for the event',
        variant: 'destructive',
      });
      return;
    }

    // Validate input
    const validation = eventSchema.safeParse({
      title,
      description,
      location,
      organizedBy,
      price,
      ticketLink: ticketLink || undefined,
      facebookLink: facebookLink || undefined,
      whatToBring,
      maxParticipants: maxParticipants ? parseInt(maxParticipants) : undefined,
    });

    if (!validation.success) {
      const errors = validation.error.errors;
      toast({
        title: 'Validation Error',
        description: errors[0]?.message || 'Please check your input',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);

    const eventData = {
      title: validation.data.title,
      description: validation.data.description,
      start_date: startDate.toISOString(),
      end_date: endDate?.toISOString() || null,
      location: validation.data.location,
      status,
      image_url: imageUrl || null,
      max_participants: validation.data.maxParticipants || null,
      price: validation.data.price || null,
      ticket_link: validation.data.ticketLink ? sanitizeUrl(validation.data.ticketLink) : null,
      facebook_link: validation.data.facebookLink ? sanitizeUrl(validation.data.facebookLink) : null,
      organized_by: validation.data.organizedBy,
      what_to_bring: validation.data.whatToBring || null,
      author_id: user?.id,
    };

    const { error } = event
      ? await supabase.from('events').update(eventData).eq('id', event.id)
      : await supabase.from('events').insert([eventData]);

    setLoading(false);

    if (error) {
      toast({
        title: 'Error saving event',
        description: error.message,
        variant: 'destructive',
      });
    } else {
      toast({ title: `Event ${event ? 'updated' : 'created'} successfully` });
      onClose(true);
    }
  };

  return (
    <Dialog open={open} onOpenChange={() => onClose(false)}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{event ? 'Edit Event' : 'Create Event'}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="image">Event Image</Label>
            <div className="space-y-2">
              <Input
                id="image"
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    setImageFile(file);
                    handleImageUpload(file);
                  }
                }}
                disabled={uploading}
              />
              {uploading && <p className="text-sm text-muted-foreground">Uploading...</p>}
              {imageUrl && (
                <img src={imageUrl} alt="Preview" className="w-full h-48 object-cover rounded-md" />
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">About the Event</Label>
            <RichTextEditor content={description} onChange={setDescription} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="what_to_bring">What to Bring</Label>
            <RichTextEditor content={whatToBring} onChange={setWhatToBring} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Start Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      'w-full justify-start text-left font-normal',
                      !startDate && 'text-muted-foreground'
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {startDate ? format(startDate, 'PPP') : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={startDate}
                    onSelect={setStartDate}
                    initialFocus
                    className="pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label>End Date (Optional)</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      'w-full justify-start text-left font-normal',
                      !endDate && 'text-muted-foreground'
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {endDate ? format(endDate, 'PPP') : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={endDate}
                    onSelect={setEndDate}
                    initialFocus
                    className="pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="organized_by">Arranged By</Label>
              <Input
                id="organized_by"
                value={organizedBy}
                onChange={(e) => setOrganizedBy(e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="max_participants">Max Participants</Label>
              <Input
                id="max_participants"
                type="number"
                value={maxParticipants}
                onChange={(e) => setMaxParticipants(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="price">Price</Label>
              <Input
                id="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="e.g., Free, 100 kr, or 50-100 kr"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="ticket_link">Ticket Link (Optional)</Label>
              <Input
                id="ticket_link"
                type="url"
                value={ticketLink}
                onChange={(e) => setTicketLink(e.target.value)}
                placeholder="https://..."
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="facebook_link">Facebook Event (Optional)</Label>
              <Input
                id="facebook_link"
                type="url"
                value={facebookLink}
                onChange={(e) => setFacebookLink(e.target.value)}
                placeholder="https://facebook.com/..."
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select value={status} onValueChange={(v: any) => setStatus(v)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="published">Published</SelectItem>
                <SelectItem value="scheduled">Scheduled</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => onClose(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Saving...' : 'Save Event'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
