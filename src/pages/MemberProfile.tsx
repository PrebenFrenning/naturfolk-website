import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User, Settings, Shield } from 'lucide-react';

const THEME_GROUPS = [
  'Dyrking & sanking',
  'Hellige steder',
  'Natursamfunn',
  'Ritualer'
];

const INTERESTS = [
  'Fjellvandring',
  'Sjamanisme',
  'Meditasjon',
  'Norrøn spiritualitet',
  'Urtemedisin',
  'Naturterapi',
  'Vildmarksliv'
];

export default function MemberProfile() {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [avatarFile, setAvatarFile] = useState<File | null>(null);

  const { data: profile } = useQuery({
    queryKey: ['profile', user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user?.id)
        .single();
      if (error) throw error;
      return data;
    },
    enabled: !!user?.id,
  });

  const updateProfileMutation = useMutation({
    mutationFn: async (updates: any) => {
      const { error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', user?.id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile', user?.id] });
      toast({
        title: 'Profil oppdatert',
        description: 'Dine endringer er lagret.',
      });
    },
    onError: (error) => {
      toast({
        title: 'Feil',
        description: 'Kunne ikke oppdatere profilen.',
        variant: 'destructive',
      });
    },
  });

  const uploadAvatarMutation = useMutation({
    mutationFn: async (file: File) => {
      const fileExt = file.name.split('.').pop();
      const filePath = `${user?.id}-${Math.random()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('event-images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from('event-images')
        .getPublicUrl(filePath);

      return data.publicUrl;
    },
    onSuccess: (avatarUrl) => {
      updateProfileMutation.mutate({ avatar_url: avatarUrl });
    },
  });

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const file = e.target.files[0];
      setAvatarFile(file);
      uploadAvatarMutation.mutate(file);
    }
  };

  const handleThemeGroupToggle = (group: string) => {
    const currentGroups = profile?.theme_groups || [];
    const newGroups = currentGroups.includes(group)
      ? currentGroups.filter((g: string) => g !== group)
      : [...currentGroups, group];
    updateProfileMutation.mutate({ theme_groups: newGroups });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const updates: any = {};

    formData.forEach((value, key) => {
      if (key === 'social_facebook' || key === 'social_instagram' || key === 'social_linkedin') {
        const socialKey = key.replace('social_', '');
        const currentLinks = typeof profile?.social_links === 'object' && profile?.social_links !== null 
          ? profile.social_links as Record<string, any>
          : {};
        updates.social_links = {
          ...currentLinks,
          [socialKey]: value,
        };
      } else {
        updates[key] = value;
      }
    });

    updateProfileMutation.mutate(updates);
  };

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="container mx-auto px-4 pt-32 pb-12 max-w-4xl">
          <h1 className="text-4xl font-bold text-foreground mb-8">Min profil</h1>

          <Tabs defaultValue="profile" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="profile">
                <User className="w-4 h-4 mr-2" />
                Profil
              </TabsTrigger>
              <TabsTrigger value="membership">
                <Shield className="w-4 h-4 mr-2" />
                Medlemskap
              </TabsTrigger>
              <TabsTrigger value="settings">
                <Settings className="w-4 h-4 mr-2" />
                Innstillinger
              </TabsTrigger>
            </TabsList>

            <form onSubmit={handleSubmit}>
              <TabsContent value="profile" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Profilinformasjon</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center gap-4">
                      <Avatar className="w-24 h-24">
                        <AvatarImage src={profile.avatar_url} />
                        <AvatarFallback>{profile.full_name?.[0] || 'U'}</AvatarFallback>
                      </Avatar>
                      <div>
                        <Label htmlFor="avatar" className="cursor-pointer">
                          <Button type="button" variant="outline" size="sm" asChild>
                            <span>Last opp bilde</span>
                          </Button>
                        </Label>
                        <Input
                          id="avatar"
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleAvatarChange}
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="full_name">Fullt navn</Label>
                        <Input
                          id="full_name"
                          name="full_name"
                          defaultValue={profile.full_name || ''}
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">E-post</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          defaultValue={profile.email || ''}
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">Telefon</Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          defaultValue={profile.phone || ''}
                        />
                      </div>
                      <div>
                        <Label htmlFor="address">Adresse</Label>
                        <Input
                          id="address"
                          name="address"
                          defaultValue={profile.address || ''}
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="bio">Om meg</Label>
                      <Textarea
                        id="bio"
                        name="bio"
                        defaultValue={profile.bio || ''}
                        placeholder="Fortell litt om deg selv..."
                        rows={4}
                      />
                    </div>

                    <div>
                      <Label htmlFor="website">Nettside</Label>
                      <Input
                        id="website"
                        name="website"
                        type="url"
                        defaultValue={profile.website || ''}
                        placeholder="https://..."
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Sosiale medier</Label>
                      <div className="grid gap-2">
                        <Input
                          name="social_facebook"
                          placeholder="Facebook URL"
                          defaultValue={
                            typeof profile.social_links === 'object' && profile.social_links !== null
                              ? (profile.social_links as Record<string, any>).facebook || ''
                              : ''
                          }
                        />
                        <Input
                          name="social_instagram"
                          placeholder="Instagram URL"
                          defaultValue={
                            typeof profile.social_links === 'object' && profile.social_links !== null
                              ? (profile.social_links as Record<string, any>).instagram || ''
                              : ''
                          }
                        />
                        <Input
                          name="social_linkedin"
                          placeholder="LinkedIn URL"
                          defaultValue={
                            typeof profile.social_links === 'object' && profile.social_links !== null
                              ? (profile.social_links as Record<string, any>).linkedin || ''
                              : ''
                          }
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="membership" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Medlemskapstype</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="membership_type">Type</Label>
                      <select
                        id="membership_type"
                        name="membership_type"
                        defaultValue={profile.membership_type || 'Støttemedlem'}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      >
                        <option value="Støttemedlem">Støttemedlem</option>
                        <option value="Hovedmedlem">Hovedmedlem</option>
                        <option value="Utmelding">Utmelding</option>
                      </select>
                    </div>

                    {profile.membership_type === 'Hovedmedlem' && (
                      <div>
                        <Label htmlFor="personnummer">Personnummer (11 siffer)</Label>
                        <Input
                          id="personnummer"
                          name="personnummer"
                          defaultValue={profile.personnummer || ''}
                          placeholder="DDMMYYXXXXX"
                          maxLength={11}
                        />
                      </div>
                    )}

                    <div>
                      <Label className="mb-4 block">Temagrupper</Label>
                      <div className="space-y-2">
                        {THEME_GROUPS.map((group) => (
                          <div key={group} className="flex items-center space-x-2">
                            <Switch
                              id={group}
                              checked={profile.theme_groups?.includes(group)}
                              onCheckedChange={() => handleThemeGroupToggle(group)}
                            />
                            <Label htmlFor={group} className="cursor-pointer">
                              {group}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <Label className="mb-4 block">Interests</Label>
                      <div className="space-y-2">
                        {INTERESTS.map((interest) => (
                          <div key={interest} className="flex items-center space-x-2">
                            <Switch
                              id={interest}
                              checked={profile.theme_groups?.includes(interest)}
                              onCheckedChange={() => handleThemeGroupToggle(interest)}
                            />
                            <Label htmlFor={interest} className="cursor-pointer">
                              {interest}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="settings" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Preferanser</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="newsletter">Nyhetsbrev</Label>
                        <p className="text-sm text-muted-foreground">
                          Motta oppdateringer og nyheter på e-post
                        </p>
                      </div>
                      <Switch
                        id="newsletter"
                        checked={profile.newsletter_subscribed}
                        onCheckedChange={(checked) =>
                          updateProfileMutation.mutate({ newsletter_subscribed: checked })
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="community_opt_out">Opt ut av felleskap</Label>
                        <p className="text-sm text-muted-foreground">
                          Skjul profilen din fra andre medlemmer
                        </p>
                      </div>
                      <Switch
                        id="community_opt_out"
                        checked={profile.community_opt_out}
                        onCheckedChange={(checked) =>
                          updateProfileMutation.mutate({ community_opt_out: checked })
                        }
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Passord</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={async () => {
                        const { error } = await supabase.auth.resetPasswordForEmail(
                          profile.email,
                          { redirectTo: `${window.location.origin}/auth` }
                        );
                        if (error) {
                          toast({
                            title: 'Feil',
                            description: 'Kunne ikke sende tilbakestillings-e-post.',
                            variant: 'destructive',
                          });
                        } else {
                          toast({
                            title: 'E-post sendt',
                            description: 'Sjekk e-posten din for å tilbakestille passordet.',
                          });
                        }
                      }}
                    >
                      Send tilbakestillings-e-post
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <div className="flex justify-end">
                <Button type="submit" disabled={updateProfileMutation.isPending}>
                  {updateProfileMutation.isPending ? 'Lagrer...' : 'Lagre endringer'}
                </Button>
              </div>
            </form>
          </Tabs>
        </div>
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}
