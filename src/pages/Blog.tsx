
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, ArrowRight, Plus } from 'lucide-react';
import { useCreatePost, usePosts } from '@/hooks/usePosts';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ThemeProvider } from 'next-themes';
import { generateSlug, getSchedulePost } from '@/hooks/useSchedulePost';

const BlogPage = () => {
  const { data: posts, isLoading, error } = usePosts();
  const [mounted, setMounted] = useState(false);
  const { mutateAsync: createPostMutation, isPending} = useCreatePost();


  useEffect(() => {
    setMounted(true);
  }, []);

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
              <p className="mt-4 text-muted-foreground">Loading posts...</p>
            </div>
          </div>
          <Footer />
        </div>
      </ThemeProvider>
    );
  }

  if (error) {
    return (
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
        <div className="min-h-screen gradient-bg">
          <Header />
          <div className="flex items-center justify-center min-h-screen">
            <div className="text-center">
              <p className="text-destructive">Error loading posts. Please try again later.</p>
            </div>
          </div>
          <Footer />
        </div>
      </ThemeProvider>
    );
  }

  // function generateNewPost() {
  //   getSchedulePost().then(async (res) => {
  //     try {
  //       const slug = generateSlug(res.title);
  //       await createPostMutation({
  //         title: res.title,
  //         content: res.content,
  //         excerpt: res.description || null,
  //         category: res.category || null,
  //         read_time: res.readTime || null,
  //         author_id: '1',
  //         slug,
  //         published: true
  //       });
  //     }
  //     catch (error) {
  //       console.error('Error saving post:', error);
  //     }
  //   });
  // }

  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <div className="min-h-screen gradient-bg">
        <Header />
        <main className="pt-16">
          <section className="py-32 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-20 animate-fade-up">
                <h1 className="text-4xl font-light mb-6 text-foreground">
                  Blog Posts
                </h1>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-light">
                  Insights, tutorials, and thoughts on software development, AI, and emerging technologies.
                </p>
                {/* {user && userProfile?.role === 'admin' && (
                  <div className="mt-8">
                    <Button disabled={isPending} className="font-light" onClick={generateNewPost}>
                      <Plus className="h-4 w-4 mr-2" />
                      Create New Post
                    </Button>
                  </div>
                )} */}
              </div>

              {posts && posts.length > 0 ? (
                <div className="grid md:grid-cols-2 gap-8">
                  {posts.map((post, index) => (
                    <Card
                      key={post.id}
                      className="group hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 cursor-pointer border-0 bg-card/50 backdrop-blur-sm"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <CardHeader className="pb-4">
                        <div className="flex items-start justify-between mb-3">
                          <Badge
                            variant="outline"
                            className="font-light border-foreground/10 text-xs"
                          >
                            {post.category || 'General'}
                          </Badge>
                          {post.featured && (
                            <Badge className="bg-primary/10 text-primary border-0 font-light">
                              Featured
                            </Badge>
                          )}
                        </div>
                        <CardTitle className="text-xl font-light group-hover:text-primary/80 transition-colors line-clamp-2">
                          {post.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <p className="text-muted-foreground mb-6 leading-relaxed font-light line-clamp-3">
                          {post.excerpt}
                        </p>

                        <div className="flex items-center justify-between text-sm text-muted-foreground mb-6 font-light">
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              <span>{new Date(post.created_at).toLocaleDateString()}</span>
                            </div>
                            {post.read_time && (
                              <div className="flex items-center gap-1">
                                <Clock className="h-4 w-4" />
                                <span>{post.read_time}</span>
                              </div>
                            )}
                          </div>
                        </div>

                        <Link to={`/blog/${post.slug}`}>
                          <Button
                            variant="ghost"
                            className="group-hover:bg-foreground/5 w-full justify-between font-light"
                          >
                            Read More
                            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                          </Button>
                        </Link>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-20">
                  <p className="text-muted-foreground font-light">
                    No blog posts available yet.
                  </p>
                  {/* user */}
                  {false && (
                    <Link to="/blog/create" className="mt-4 inline-block">
                      <Button className="font-light">
                        <Plus className="h-4 w-4 mr-2" />
                        Create Your First Post
                      </Button>
                    </Link>
                  )}
                </div>
              )}
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default BlogPage;
