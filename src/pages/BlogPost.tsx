import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Helmet } from 'react-helmet-async';
import { Calendar, ArrowLeft } from 'lucide-react';
import { sanitizeHtml } from '@/lib/sanitize';

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

interface RecentPost {
  id: string;
  title: string;
  slug: string;
  publish_date: string;
  created_at: string;
}

interface Category {
  id: string;
  name: string;
  slug: string;
  post_count: number;
}

export default function BlogPost() {
  const { slug } = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [recentPosts, setRecentPosts] = useState<RecentPost[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    if (slug) {
      loadPost();
      loadRecentPosts();
      loadCategories();
    }
  }, [slug]);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrolled = window.scrollY;
      const progress = (scrolled / (documentHeight - windowHeight)) * 100;
      setScrollProgress(Math.min(progress, 100));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const loadPost = async () => {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .eq('slug', slug)
      .eq('status', 'published')
      .single();

    if (!error && data) {
      setPost(data);
    }
    setLoading(false);
  };

  const loadRecentPosts = async () => {
    const { data, error } = await supabase
      .from('posts')
      .select('id, title, slug, publish_date, created_at')
      .eq('status', 'published')
      .neq('slug', slug)
      .order('publish_date', { ascending: false })
      .limit(5);

    if (!error && data) {
      setRecentPosts(data);
    }
  };

  const loadCategories = async () => {
    // First, get all categories
    const { data: categoriesData, error: categoriesError } = await supabase
      .from('categories')
      .select('id, name, slug')
      .order('name');

    if (categoriesError || !categoriesData) return;

    // Then, get post counts for each category
    const categoriesWithCounts = await Promise.all(
      categoriesData.map(async (category) => {
        const { count } = await supabase
          .from('posts')
          .select('*', { count: 'exact', head: true })
          .eq('status', 'published')
          .eq('category_id', category.id);

        return {
          ...category,
          post_count: count || 0
        };
      })
    );

    setCategories(categoriesWithCounts.filter(cat => cat.post_count > 0));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!post) {
    return (
      <>
        <Navbar />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
          <Link to="/blogg">
            <Button>Back to Blog</Button>
          </Link>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>{post.title} - Nettverket i Norge</title>
        <meta name="description" content={post.excerpt} />
      </Helmet>

      <div className="min-h-screen flex flex-col">
        {/* Scroll Progress Bar */}
        <div className="fixed top-0 left-0 right-0 h-1 bg-nature-beige/30 z-[100]">
          <div 
            className="h-full bg-nature-green transition-all duration-150 ease-out"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>
        
        <Navbar />
        
        <main className="flex-1 pt-24">
          <div className="py-8 px-4">
            <div className="container mx-auto max-w-7xl">
              <Link to="/blogg" className="inline-block mb-8">
                <Button variant="outline" size="lg" className="bg-background hover:bg-accent shadow-sm">
                  <ArrowLeft className="mr-2 h-5 w-5" />
                  Tilbake til blog
                </Button>
              </Link>

              <div className="grid lg:grid-cols-3 gap-8">
                {/* Main Content */}
                <article className="lg:col-span-2">
                  {post.featured_image && (
                    <img 
                      src={post.featured_image} 
                      alt={post.title}
                      className="w-full h-96 object-cover rounded-lg mb-8"
                    />
                  )}

                  <div className="flex items-center gap-2 text-muted-foreground mb-4">
                    <Calendar className="h-4 w-4" />
                    {new Date(post.publish_date || post.created_at).toLocaleDateString('nb-NO', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </div>

                  <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6 text-foreground">{post.title}</h1>

                  {post.excerpt && (
                    <p className="text-xl text-muted-foreground mb-8 font-sans">
                      {post.excerpt}
                    </p>
                  )}

                  <div 
                    className="prose prose-lg max-w-none font-sans [&_h1]:font-serif [&_h2]:font-serif [&_h3]:font-serif [&_h4]:font-serif [&_h5]:font-serif [&_h6]:font-serif [&_h1]:text-foreground [&_h2]:text-foreground [&_h3]:text-foreground [&_p]:text-foreground [&_li]:text-foreground [&_strong]:text-foreground [&_em]:text-foreground"
                    dangerouslySetInnerHTML={{ __html: sanitizeHtml(post.content) }}
                  />
                </article>

                {/* Sidebar */}
                <aside className="lg:col-span-1">
                  <div className="sticky top-28 space-y-6">
                    {/* Recent Posts */}
                    <div className="bg-muted/30 rounded-lg p-6 border border-border">
                      <h3 className="text-lg font-bold mb-4">Siste artikler</h3>
                      {recentPosts.length > 0 ? (
                        <ul className="space-y-4">
                          {recentPosts.map((recentPost) => (
                            <li key={recentPost.id}>
                              <Link 
                                to={`/blogg/${recentPost.slug}`}
                                className="group block"
                              >
                                <h4 className="font-medium text-sm group-hover:text-nature-green transition-colors line-clamp-2">
                                  {recentPost.title}
                                </h4>
                                <p className="text-xs text-muted-foreground mt-1">
                                  {new Date(recentPost.publish_date || recentPost.created_at).toLocaleDateString('nb-NO', {
                                    year: 'numeric',
                                    month: 'short',
                                    day: 'numeric'
                                  })}
                                </p>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-sm text-muted-foreground">Ingen flere artikler</p>
                      )}
                    </div>

                    {/* Categories */}
                    {categories.length > 0 && (
                      <div className="bg-muted/30 rounded-lg p-6 border border-border">
                        <h3 className="text-lg font-bold mb-4">Kategorier</h3>
                        <ul className="space-y-3">
                          {categories.map((category) => (
                            <li key={category.id}>
                              <Link 
                                to={`/blogg?category=${category.slug}`}
                                className="group flex items-center justify-between hover:text-nature-green transition-colors"
                              >
                                <span className="text-sm font-medium">{category.name}</span>
                                <span className="text-xs bg-muted px-2 py-1 rounded-full">
                                  {category.post_count}
                                </span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </aside>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
