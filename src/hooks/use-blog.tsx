
export const posts = [
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
  ] as any[];
export const useGetBlogPost = () => {
    return {posts}
}