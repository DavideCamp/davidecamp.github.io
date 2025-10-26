
import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, ArrowLeft, Edit, Trash2 } from 'lucide-react';
import { usePost, useDeletePost } from '@/hooks/usePosts';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ThemeProvider } from 'next-themes';

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { data: post, isLoading, error } = usePost(slug!);
  const deletePostMutation = useDeletePost();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleDelete = async () => {
    if (post && window.confirm('Are you sure you want to delete this post?')) {
      try {
        await deletePostMutation.mutateAsync('1');
        navigate('/blog');
      } catch (error) {
        console.error('Error deleting post:', error);
      }
    }
  };

  if (!mounted) {
    return null;
  }

  if (isLoading) {
    return (
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
        <div className="min-h-screen gradient-bg">
          <Header />
          <div className="flex items-center justify-center min-h-screen">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
              <p className="mt-4 text-muted-foreground">Loading post...</p>
            </div>
          </div>
          <Footer />
        </div>
      </ThemeProvider>
    );
  }

  if (error || !post) {
    return (
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
        <div className="min-h-screen gradient-bg">
          <Header />
          <div className="flex items-center justify-center min-h-screen">
            <div className="text-center">
              <p className="text-destructive mb-4">Post not found or error loading post.</p>
              <Link to="/blog">
                <Button variant="outline">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Blog
                </Button>
              </Link>
            </div>
          </div>
          <Footer />
        </div>
      </ThemeProvider>
    );
  }

  const isAuthor = false;

  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <div className="min-h-screen gradient-bg">
        <Header />
        <main className="pt-16">
          <article className="py-32 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="mb-8">
                <Link to="/blog">
                  <Button variant="ghost" className="font-light mb-6">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Blog
                  </Button>
                </Link>

                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <Badge
                      variant="outline"
                      className="font-light border-foreground/10"
                    >
                      {post.category || 'General'}
                    </Badge>
                    {post.featured && (
                      <Badge className="bg-primary/10 text-primary border-0 font-light">
                        Featured
                      </Badge>
                    )}
                  </div>

                  {isAuthor && (
                    <div className="flex items-center gap-2">
                      <Link to={`/blog/${post.slug}/edit`}>
                        <Button variant="outline" size="sm" className="font-light">
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </Button>
                      </Link>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={handleDelete}
                        disabled={deletePostMutation.isPending}
                        className="font-light"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </Button>
                    </div>
                  )}
                </div>

                <h1 className="text-4xl md:text-5xl font-light mb-6 text-foreground leading-tight">
                  {post.title}
                </h1>

                {post.excerpt && (
                  <p className="text-xl text-muted-foreground mb-8 font-light leading-relaxed">
                    {post.excerpt}
                  </p>
                )}

                <div className="flex items-center gap-6 text-sm text-muted-foreground mb-12 font-light">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>{new Date(post.created_at).toLocaleDateString()}</span>
                  </div>
                  {post.read_time && (
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      <span>{post.read_time}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="prose prose-lg max-w-none font-light leading-relaxed">
                <div
                  className="whitespace-pre-wrap text-foreground"
                  dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br />') }}
                />
              </div>
            </div>
          </article>
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default BlogPost;
