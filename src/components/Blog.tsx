
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, ArrowRight } from 'lucide-react';

const Blog = () => {
  const posts = [
    {
      title: "Building AI-Powered Web Applications: A Complete Guide",
      excerpt: "Explore how to integrate AI capabilities into modern web applications, from setup to deployment with practical examples.",
      date: "2024-01-15",
      readTime: "8 min read",
      category: "AI Development",
      featured: true
    },
    {
      title: "The Future of Web Development: Trends to Watch in 2024",
      excerpt: "Discover the emerging technologies and methodologies that are shaping the future of web development.",
      date: "2024-01-10",
      readTime: "6 min read",
      category: "Web Development",
      featured: false
    },
    {
      title: "Optimizing React Performance: Advanced Techniques",
      excerpt: "Learn advanced optimization techniques for React applications including code splitting, memoization, and performance monitoring.",
      date: "2024-01-05",
      readTime: "12 min read",
      category: "React",
      featured: true
    },
    {
      title: "Machine Learning in the Browser: WebAssembly and TensorFlow.js",
      excerpt: "Explore how to run machine learning models directly in the browser using modern web technologies.",
      date: "2023-12-28",
      readTime: "10 min read",
      category: "Machine Learning",
      featured: false
    }
  ];

  return (
    <section id="blog" className="py-32 px-4 sm:px-6 lg:px-8 bg-muted/20">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-20 animate-fade-up">
          <h2 className="text-4xl font-light mb-6 text-foreground">
            Latest Blog Posts
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-light">
            Insights, tutorials, and thoughts on software development, AI, and emerging technologies.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {posts.map((post, index) => (
            <Card 
              key={post.title} 
              className="group hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 cursor-pointer border-0 bg-card/50 backdrop-blur-sm"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between mb-3">
                  <Badge 
                    variant="outline" 
                    className="font-light border-foreground/10 text-xs"
                  >
                    {post.category}
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
                      <span>{new Date(post.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                </div>

                <Button 
                  variant="ghost" 
                  className="group-hover:bg-foreground/5 w-full justify-between font-light"
                >
                  Read More
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-16">
          <Button 
            variant="outline" 
            size="lg"
            className="font-light border-foreground/10 hover:bg-foreground/5 px-8"
          >
            View All Posts
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Blog;
