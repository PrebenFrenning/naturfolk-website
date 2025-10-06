import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { RichTextEditor } from '@/components/RichTextEditor';
import { Upload } from 'lucide-react';
import type { User } from '@supabase/supabase-js';

interface PageDialogProps {
  open: boolean;
  onClose: (refresh: boolean) => void;
  page: any | null;
  user: User | null;
}

export function PageDialog({ open, onClose, page, user }: PageDialogProps) {
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [slug, setSlug] = useState('');
  const [content, setContent] = useState('');
  const [heroImage, setHeroImage] = useState('');
  const [metaTitle, setMetaTitle] = useState('');
  const [metaDescription, setMetaDescription] = useState('');
  const [socialImage, setSocialImage] = useState('');
  const [status, setStatus] = useState<'draft' | 'published'>('draft');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadingHero, setUploadingHero] = useState(false);
  const [uploadingSocial, setUploadingSocial] = useState(false);

  useEffect(() => {
    if (page) {
      setTitle(page.title || '');
      setSubtitle(page.subtitle || '');
      setSlug(page.slug || '');
      setContent(page.content || '');
      setHeroImage(page.hero_image || '');
      setMetaTitle(page.meta_title || '');
      setMetaDescription(page.meta_description || '');
      setSocialImage(page.social_image || '');
      setStatus(page.status || 'draft');
    } else {
      resetForm();
    }
  }, [page, open]);

  const resetForm = () => {
    setTitle('');
    setSubtitle('');
    setSlug('');
    setContent('');
    setHeroImage('');
    setMetaTitle('');
    setMetaDescription('');
    setSocialImage('');
    setStatus('draft');
  };

  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/--+/g, '-')
      .trim();
  };

  const handleTitleChange = (value: string) => {
    setTitle(value);
    if (!page) {
      setSlug(generateSlug(value));
      setMetaTitle(value);
    }
  };

  const handleImageUpload = async (file: File, type: 'hero' | 'social') => {
    const setUploading = type === 'hero' ? setUploadingHero : setUploadingSocial;
    const setImage = type === 'hero' ? setHeroImage : setSocialImage;

    setUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const filePath = `${type}-${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('event-images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from('event-images')
        .getPublicUrl(filePath);

      setImage(data.publicUrl);
      toast.success('Image uploaded successfully');
    } catch (error) {
      console.error('Error uploading image:', error);
      toast.error('Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setIsSubmitting(true);

    const pageData = {
      title,
      subtitle,
      slug,
      content,
      hero_image: heroImage,
      meta_title: metaTitle,
      meta_description: metaDescription,
      social_image: socialImage,
      status,
      author_id: user.id,
    };

    try {
      if (page) {
        const { error } = await supabase
          .from('pages')
          .update(pageData)
          .eq('id', page.id);

        if (error) throw error;
        toast.success('Page updated successfully');
      } else {
        const { error } = await supabase
          .from('pages')
          .insert([pageData]);

        if (error) throw error;
        toast.success('Page created successfully');
      }

      onClose(true);
      resetForm();
    } catch (error) {
      console.error('Error saving page:', error);
      toast.error('Failed to save page');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose(false)}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {page ? 'Edit Page' : 'Create New Page'}
            {page?.is_static && <Badge className="ml-2">Site Page</Badge>}
          </DialogTitle>
          <DialogDescription>
            {page?.is_static 
              ? 'Edit metadata and content for this site page'
              : page ? 'Update the page details below' : 'Fill in the details to create a new page'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <Tabs defaultValue="content" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="content">Content</TabsTrigger>
              <TabsTrigger value="design">Design</TabsTrigger>
              <TabsTrigger value="seo">SEO & Social</TabsTrigger>
            </TabsList>

            <TabsContent value="content" className="space-y-4 mt-4">
              <div>
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  required
                />
              </div>

              <div>
                <Label htmlFor="subtitle">Subtitle</Label>
                <Input
                  id="subtitle"
                  value={subtitle}
                  onChange={(e) => setSubtitle(e.target.value)}
                  placeholder="Optional subtitle or tagline"
                />
              </div>

              <div>
                <Label htmlFor="slug">Slug *</Label>
                <Input
                  id="slug"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  required
                  disabled={page?.is_static}
                />
                {page?.is_static && (
                  <p className="text-sm text-muted-foreground mt-1">
                    Slug cannot be changed for site pages
                  </p>
                )}
              </div>

              {!page?.is_static && (
                <div>
                  <Label htmlFor="content">Content</Label>
                  <RichTextEditor content={content} onChange={setContent} />
                </div>
              )}

              <div>
                <Label htmlFor="status">Status</Label>
                <Select value={status} onValueChange={(value: 'draft' | 'published') => setStatus(value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </TabsContent>

            <TabsContent value="design" className="space-y-4 mt-4">
              <div>
                <Label>Hero Image</Label>
                {heroImage && (
                  <div className="mb-4 relative aspect-video rounded-lg overflow-hidden">
                    <img src={heroImage} alt="Hero" className="w-full h-full object-cover" />
                  </div>
                )}
                <div className="flex gap-2">
                  <Input
                    value={heroImage}
                    onChange={(e) => setHeroImage(e.target.value)}
                    placeholder="Image URL or upload below"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    disabled={uploadingHero}
                    onClick={() => document.getElementById('hero-upload')?.click()}
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    {uploadingHero ? 'Uploading...' : 'Upload'}
                  </Button>
                  <input
                    id="hero-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleImageUpload(file, 'hero');
                    }}
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="seo" className="space-y-4 mt-4">
              <div>
                <Label htmlFor="meta_title">Meta Title</Label>
                <Input
                  id="meta_title"
                  value={metaTitle}
                  onChange={(e) => setMetaTitle(e.target.value)}
                  placeholder="Page title for search engines"
                  maxLength={60}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  {metaTitle.length}/60 characters
                </p>
              </div>

              <div>
                <Label htmlFor="meta_description">Meta Description</Label>
                <Textarea
                  id="meta_description"
                  value={metaDescription}
                  onChange={(e) => setMetaDescription(e.target.value)}
                  placeholder="Page description for search engines"
                  maxLength={160}
                  rows={3}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  {metaDescription.length}/160 characters
                </p>
              </div>

              <div>
                <Label>Social Sharing Image</Label>
                {socialImage && (
                  <div className="mb-4 relative aspect-video rounded-lg overflow-hidden max-w-md">
                    <img src={socialImage} alt="Social" className="w-full h-full object-cover" />
                  </div>
                )}
                <div className="flex gap-2">
                  <Input
                    value={socialImage}
                    onChange={(e) => setSocialImage(e.target.value)}
                    placeholder="Image URL or upload below"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    disabled={uploadingSocial}
                    onClick={() => document.getElementById('social-upload')?.click()}
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    {uploadingSocial ? 'Uploading...' : 'Upload'}
                  </Button>
                  <input
                    id="social-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleImageUpload(file, 'social');
                    }}
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Recommended: 1200x630px for optimal social media display
                </p>
              </div>
            </TabsContent>
          </Tabs>

          <div className="flex justify-end gap-2 mt-6">
            <Button type="button" variant="outline" onClick={() => onClose(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Saving...' : 'Save Page'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
