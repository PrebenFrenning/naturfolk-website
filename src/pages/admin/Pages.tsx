import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { Pencil, Trash2, Star } from 'lucide-react';
import { PageDialog } from '@/components/admin/PageDialog';
import { useAuth } from '@/hooks/useAuth';
import { Helmet } from 'react-helmet-async';

interface Page {
  id: string;
  title: string;
  slug: string;
  subtitle?: string;
  is_static?: boolean;
  status: 'draft' | 'published' | 'scheduled';
  created_at: string;
  updated_at: string;
}

export default function Pages() {
  const [pages, setPages] = useState<Page[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingPage, setEditingPage] = useState<Page | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    loadPages();
  }, []);

  const loadPages = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('pages')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      toast.error('Failed to load pages');
      console.error(error);
    } else {
      setPages(data || []);
    }
    setLoading(false);
  };

  const handleDelete = async (id: string, isStatic: boolean) => {
    if (isStatic) {
      toast.error('Cannot delete site pages');
      return;
    }
    
    if (!confirm('Are you sure you want to delete this page?')) return;

    const { error } = await supabase
      .from('pages')
      .delete()
      .eq('id', id);

    if (error) {
      toast.error('Failed to delete page');
      console.error(error);
    } else {
      toast.success('Page deleted successfully');
      loadPages();
    }
  };

  const handleEdit = (page: Page) => {
    setEditingPage(page);
    setDialogOpen(true);
  };

  const handleDialogClose = (refresh: boolean) => {
    setDialogOpen(false);
    setEditingPage(null);
    if (refresh) {
      loadPages();
    }
  };

  return (
    <>
      <Helmet>
        <title>Pages - Admin Dashboard</title>
      </Helmet>

      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Pages</h1>
          <Button onClick={() => setDialogOpen(true)}>New Page</Button>
        </div>

        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Slug</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Updated</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center">Loading...</TableCell>
                </TableRow>
              ) : pages.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center">No pages found</TableCell>
                </TableRow>
              ) : (
                pages.map((page) => (
                  <TableRow key={page.id}>
                    <TableCell className="font-medium">
                      {page.is_static && <Star className="w-4 h-4 inline mr-2 text-yellow-500" />}
                      {page.title}
                    </TableCell>
                    <TableCell>{page.slug}</TableCell>
                    <TableCell>
                      <Badge variant={page.is_static ? 'default' : 'outline'}>
                        {page.is_static ? 'Site Page' : 'Custom'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={page.status === 'published' ? 'default' : 'secondary'}>
                        {page.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{new Date(page.updated_at).toLocaleDateString()}</TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEdit(page)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      {!page.is_static && (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(page.id, page.is_static || false)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </Card>

        <PageDialog
          open={dialogOpen}
          onClose={handleDialogClose}
          page={editingPage}
          user={user}
        />
      </div>
    </>
  );
}
