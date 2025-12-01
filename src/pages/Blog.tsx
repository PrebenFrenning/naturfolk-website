import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Calendar } from 'lucide-react';

interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featured_image: string | null;
  publish_date: string;
  created_at: string;
}

export default function Blog() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .eq('status', 'published')
      .order('publish_date', { ascending: false });

    if (!error && data) {
      setPosts(data);
    }
    setLoading(false);
  };

  return (
    <>
      <Helmet>
        <title>Blogg - Nettverket i Norge</title>
        <meta name="description" content="Les våre siste innlegg og oppdateringer" />
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Navbar />
        
        <main className="flex-1">
          <section className="py-20 px-4">
            <div className="container mx-auto max-w-6xl">
              <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">Blogg</h1>
              <p className="text-xl text-center text-muted-foreground mb-12">
                Les våre siste innlegg og oppdateringer
              </p>

              {loading ? (
                <div className="text-center py-12">Loading posts...</div>
              ) : posts.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  No posts published yet.
                </div>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {posts.map((post) => (
                    <Link key={post.id} to={`/blogg/${post.slug}`}>
                      <Card className="h-full hover:shadow-lg transition-shadow">
                        {post.featured_image && (
                          <img 
                            src={post.featured_image} 
                            alt={post.title}
                            className="w-full h-48 object-cover rounded-t-lg"
                          />
                        )}
                        <CardHeader>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                            <Calendar className="h-4 w-4" />
                            {new Date(post.publish_date || post.created_at).toLocaleDateString()}
                          </div>
                          <CardTitle className="hover:text-primary transition-colors">
                            {post.title}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-muted-foreground line-clamp-3">
                            {post.excerpt}
                          </p>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}
