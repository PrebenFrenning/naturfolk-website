import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import type { Tables } from '@/integrations/supabase/types';

type Profile = Tables<'profiles'>;

const THEME_GROUPS = [
  'Dyrking & sanking',
  'Hellige steder',
  'Natursamfunn',
  'Ritualer',
];

interface MemberDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  member: Profile | null;
  onSaved: () => void;
}

export function MemberDialog({ open, onOpenChange, member, onSaved }: MemberDialogProps) {
  const { toast } = useToast();
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    first_name: '',
    middle_name: '',
    last_name: '',
    email: '',
    phone: '',
    address: '',
    postal_code: '',
    city: '',
    country: '',
    membership_type: 'Støttemedlem',
    theme_groups: [] as string[],
    newsletter_subscribed: true,
    community_opt_out: false,
  });

  useEffect(() => {
    if (member) {
      setForm({
        first_name: member.first_name || '',
        middle_name: member.middle_name || '',
        last_name: member.last_name || '',
        email: member.email,
        phone: member.phone || '',
        address: member.address || '',
        postal_code: member.postal_code || '',
        city: member.city || '',
        country: member.country || 'Norge',
        membership_type: member.membership_type || 'Støttemedlem',
        theme_groups: member.theme_groups || [],
        newsletter_subscribed: member.newsletter_subscribed ?? true,
        community_opt_out: member.community_opt_out ?? false,
      });
    }
  }, [member]);

  const handleSave = async () => {
    if (!member) return;
    setSaving(true);

    const { error } = await supabase
      .from('profiles')
      .update({
        first_name: form.first_name || null,
        middle_name: form.middle_name || null,
        last_name: form.last_name || null,
        phone: form.phone || null,
        address: form.address || null,
        postal_code: form.postal_code || null,
        city: form.city || null,
        country: form.country || null,
        membership_type: form.membership_type,
        theme_groups: form.theme_groups,
        newsletter_subscribed: form.newsletter_subscribed,
        community_opt_out: form.community_opt_out,
      })
      .eq('id', member.id);

    setSaving(false);

    if (error) {
      toast({ title: 'Feil', description: 'Kunne ikke lagre endringer.', variant: 'destructive' });
    } else {
      toast({ title: 'Lagret', description: 'Medlemsprofilen er oppdatert.' });
      onSaved();
    }
  };

  const toggleThemeGroup = (group: string) => {
    setForm((f) => ({
      ...f,
      theme_groups: f.theme_groups.includes(group)
        ? f.theme_groups.filter((g) => g !== group)
        : [...f.theme_groups, group],
    }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Rediger medlem</DialogTitle>
          <DialogDescription>Oppdater medlemsdetaljer nedenfor.</DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-3 gap-3">
            <div>
              <Label>Fornavn</Label>
              <Input value={form.first_name} onChange={(e) => setForm({ ...form, first_name: e.target.value })} />
            </div>
            <div>
              <Label>Mellomnavn</Label>
              <Input value={form.middle_name} onChange={(e) => setForm({ ...form, middle_name: e.target.value })} />
            </div>
            <div>
              <Label>Etternavn</Label>
              <Input value={form.last_name} onChange={(e) => setForm({ ...form, last_name: e.target.value })} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label>E-post</Label>
              <Input value={form.email} disabled className="bg-muted" />
            </div>
            <div>
              <Label>Telefon</Label>
              <Input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
            </div>
          </div>

          <div>
            <Label>Adresse</Label>
            <Input value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <Label>Postnr.</Label>
              <Input value={form.postal_code} onChange={(e) => setForm({ ...form, postal_code: e.target.value })} />
            </div>
            <div>
              <Label>By</Label>
              <Input value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} />
            </div>
            <div>
              <Label>Land</Label>
              <Input value={form.country} onChange={(e) => setForm({ ...form, country: e.target.value })} />
            </div>
          </div>

          <div>
            <Label>Medlemstype</Label>
            <Select value={form.membership_type} onValueChange={(v) => setForm({ ...form, membership_type: v })}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Støttemedlem">Støttemedlem</SelectItem>
                <SelectItem value="Hovedmedlem">Hovedmedlem</SelectItem>
                <SelectItem value="Utmelding">Utmelding</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="mb-2 block">Temagrupper</Label>
            <div className="grid grid-cols-2 gap-2">
              {THEME_GROUPS.map((group) => (
                <label key={group} className="flex items-center gap-2 text-sm cursor-pointer">
                  <Checkbox
                    checked={form.theme_groups.includes(group)}
                    onCheckedChange={() => toggleThemeGroup(group)}
                  />
                  {group}
                </label>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <Label>Nyhetsbrev</Label>
              <Switch checked={form.newsletter_subscribed} onCheckedChange={(v) => setForm({ ...form, newsletter_subscribed: v })} />
            </div>
            <div className="flex items-center justify-between">
              <Label>Fellesskaps-opt-out</Label>
              <Switch checked={form.community_opt_out} onCheckedChange={(v) => setForm({ ...form, community_opt_out: v })} />
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Avbryt</Button>
          <Button onClick={handleSave} disabled={saving}>
            {saving ? 'Lagrer...' : 'Lagre'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
