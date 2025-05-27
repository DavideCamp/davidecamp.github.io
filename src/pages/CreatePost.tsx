
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Save } from 'lucide-react';
import { useCreatePost, useUpdatePost, usePost } from '@/hooks/usePosts';
import { useAuth } from '@/contexts/AuthContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ThemeProvider } from 'next-themes';
import { Link } from 'react-router-dom';

const CreatePost = () => {
  const navigate = useNavigate();
  const { slug } = useParams<{ slug: string }>();
  const { user, userProfile } = useAuth();
  const isEditing = !!slug;

  const { data: existingPost, isLoading: isLoadingPost } = usePost(slug || '');
  const createPostMutation = useCreatePost();
  const updatePostMutation = useUpdatePost();

  const [mounted, setMounted] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    excerpt: '',
    category: '',
    read_time: '',
    published: false,
    featured: false,
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isEditing && existingPost) {
      setFormData({
        title: existingPost.title,
        content: existingPost.content,
        excerpt: existingPost.excerpt || '',
        category: existingPost.category || '',
        read_time: existingPost.read_time || '',
        published: existingPost.published || false,
        featured: existingPost.featured || false,
      });
    }
  }, [isEditing, existingPost]);

  // Redirect if not authenticated
  useEffect(() => {
    if (mounted && !user) {
      navigate('/auth');
    } else if (mounted && user && userProfile.role !== 'admin') {
      navigate('/');
    }
  }, [mounted, user, navigate, userProfile]);

  if (!mounted) {
    return null;
  }

  if (!user) {
    return null; // Will redirect
  }

  if (isEditing && isLoadingPost) {
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

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title.trim() || !formData.content.trim()) {
      return;
    }

    try {
      if (isEditing && existingPost) {
        await updatePostMutation.mutateAsync({
          id: existingPost.id,
          updates: {
            title: formData.title,
            content: formData.content,
            excerpt: formData.excerpt || null,
            category: formData.category || null,
            read_time: formData.read_time || null,
            published: formData.published,
            featured: formData.featured,
          },
        });
        navigate(`/blog/${existingPost.slug}`);
      } else {
        const slug = generateSlug(formData.title);
        const newPost = await createPostMutation.mutateAsync({
          title: formData.title,
          content: formData.content,
          excerpt: formData.excerpt || null,
          author_id: user.id,
          slug,
          category: formData.category || null,
          read_time: formData.read_time || null,
          published: formData.published,
          featured: formData.featured,
        });
        navigate('/blog');
      }
    } catch (error) {
      console.error('Error saving post:', error);
    }
  };

  const isLoading = createPostMutation.isPending || updatePostMutation.isPending;

  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <div className="min-h-screen gradient-bg">
        <Header />
        <main className="pt-16">
          <div className="py-32 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="mb-8">
                <Link to="/blog">
                  <Button variant="ghost" className="font-light mb-6">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Blog
                  </Button>
                </Link>

                <h1 className="text-4xl font-light mb-6 text-foreground">
                  {isEditing ? 'Edit Post' : 'Create New Post'}
                </h1>
              </div>

              <Card className="border-0 bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="font-light">Post Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <Label htmlFor="title" className="font-light">Title *</Label>
                      <Input
                        id="title"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        placeholder="Enter post title"
                        required
                        className="font-light"
                      />
                    </div>

                    <div>
                      <Label htmlFor="excerpt" className="font-light">Excerpt</Label>
                      <Textarea
                        id="excerpt"
                        value={formData.excerpt}
                        onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                        placeholder="Brief description of the post"
                        rows={3}
                        className="font-light"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="category" className="font-light">Category</Label>
                        <Input
                          id="category"
                          value={formData.category}
                          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                          placeholder="e.g., Web Development"
                          className="font-light"
                        />
                      </div>
                      <div>
                        <Label htmlFor="readTime" className="font-light">Read Time</Label>
                        <Input
                          id="readTime"
                          value={formData.read_time}
                          onChange={(e) => setFormData({ ...formData, read_time: e.target.value })}
                          placeholder="e.g., 5 min read"
                          className="font-light"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="content" className="font-light">Content *</Label>
                      <Textarea
                        id="content"
                        value={formData.content}
                        onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                        placeholder="Write your post content here..."
                        rows={15}
                        required
                        className="font-light"
                      />
                    </div>

                    <div className="flex items-center space-x-6">
                      <div className="flex items-center space-x-2">
                        <Switch
                          id="published"
                          checked={formData.published}
                          onCheckedChange={(checked) => setFormData({ ...formData, published: checked })}
                        />
                        <Label htmlFor="published" className="font-light">Published</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch
                          id="featured"
                          checked={formData.featured}
                          onCheckedChange={(checked) => setFormData({ ...formData, featured: checked })}
                        />
                        <Label htmlFor="featured" className="font-light">Featured</Label>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <Button
                        type="submit"
                        disabled={isLoading || !formData.title.trim() || !formData.content.trim()}
                        className="font-light"
                      >
                        <Save className="h-4 w-4 mr-2" />
                        {isLoading ? 'Saving...' : isEditing ? 'Update Post' : 'Create Post'}
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default CreatePost;
