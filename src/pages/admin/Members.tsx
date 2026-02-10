import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Pencil, Search, Users } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { MemberDialog } from '@/components/admin/MemberDialog';
import type { Tables } from '@/integrations/supabase/types';

type Profile = Tables<'profiles'>;

export default function Members() {
  const [members, setMembers] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [editingMember, setEditingMember] = useState<Profile | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    loadMembers();
  }, [search, typeFilter]);

  const loadMembers = async () => {
    setLoading(true);
    let query = supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false });

    if (search.trim()) {
      query = query.or(`first_name.ilike.%${search}%,last_name.ilike.%${search}%,email.ilike.%${search}%`);
    }

    if (typeFilter !== 'all') {
      query = query.eq('membership_type', typeFilter);
    }

    const { data, error } = await query;
    if (!error && data) {
      setMembers(data);
    }
    setLoading(false);
  };

  const handleEdit = (member: Profile) => {
    setEditingMember(member);
    setDialogOpen(true);
  };

  const handleSaved = () => {
    setDialogOpen(false);
    setEditingMember(null);
    loadMembers();
  };

  const formatDate = (date: string | null) => {
    if (!date) return '—';
    return new Date(date).toLocaleDateString('nb-NO');
  };

  const membershipBadgeVariant = (type: string | null) => {
    switch (type) {
      case 'Hovedmedlem': return 'default';
      case 'Støttemedlem': return 'secondary';
      case 'Utmelding': return 'destructive';
      default: return 'outline';
    }
  };

  return (
    <>
      <Helmet>
        <title>Medlemmer - Admin</title>
      </Helmet>

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Medlemmer</h1>
            <p className="text-muted-foreground mt-1">
              {members.length} medlem{members.length !== 1 ? 'mer' : ''} totalt
            </p>
          </div>
          <Users className="h-8 w-8 text-muted-foreground" />
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Søk og filtrer</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Søk på navn eller e-post..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-9"
                />
              </div>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-full sm:w-[200px]">
                  <SelectValue placeholder="Alle typer" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Alle typer</SelectItem>
                  <SelectItem value="Støttemedlem">Støttemedlem</SelectItem>
                  <SelectItem value="Hovedmedlem">Hovedmedlem</SelectItem>
                  <SelectItem value="Utmelding">Utmelding</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Navn</TableHead>
                  <TableHead>E-post</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead className="hidden md:table-cell">By</TableHead>
                  <TableHead className="hidden lg:table-cell">Telefon</TableHead>
                  <TableHead className="hidden lg:table-cell">Registrert</TableHead>
                  <TableHead className="w-[60px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                      Laster medlemmer...
                    </TableCell>
                  </TableRow>
                ) : members.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                      Ingen medlemmer funnet
                    </TableCell>
                  </TableRow>
                ) : (
                  members.map((member) => (
                    <TableRow key={member.id}>
                      <TableCell className="font-medium">
                        {[member.first_name, member.last_name].filter(Boolean).join(' ') || member.full_name || '—'}
                      </TableCell>
                      <TableCell className="text-muted-foreground">{member.email}</TableCell>
                      <TableCell>
                        <Badge variant={membershipBadgeVariant(member.membership_type)}>
                          {member.membership_type || 'Ukjent'}
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">{member.city || '—'}</TableCell>
                      <TableCell className="hidden lg:table-cell">{member.phone || '—'}</TableCell>
                      <TableCell className="hidden lg:table-cell">{formatDate(member.created_at)}</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="icon" onClick={() => handleEdit(member)}>
                          <Pencil className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      <MemberDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        member={editingMember}
        onSaved={handleSaved}
      />
    </>
  );
}
