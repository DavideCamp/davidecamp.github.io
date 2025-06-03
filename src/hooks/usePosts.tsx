
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getPosts, getPostBySlug, getUserPosts, createPost, updatePost, deletePost, Post, PostInsert, PostUpdate } from '@/api/posts';
import { useToast } from '@/hooks/use-toast';

export const usePosts = () => {
  return useQuery({
    queryKey: ['posts'],
    queryFn: getPosts,
  });
};

export const usePost = (slug: string) => {
  return useQuery({
    queryKey: ['post', slug],
    queryFn: () => getPostBySlug(slug),
    enabled: !!slug,
  });
};

export const useUserPosts = () => {
  return useQuery({
    queryKey: ['user-posts'],
    queryFn: getUserPosts,
  });
};

export const useCreatePost = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      queryClient.invalidateQueries({ queryKey: ['user-posts'] });
      toast({
        title: "Success",
        description: "Post created successfully!",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to create post. Please try again.",
        variant: "destructive",
      });
      console.error('Error creating post:', error);
    },
    
  });
};

export const useUpdatePost = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: PostUpdate }) => updatePost(id, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      queryClient.invalidateQueries({ queryKey: ['user-posts'] });
      toast({
        title: "Success",
        description: "Post updated successfully!",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to update post. Please try again.",
        variant: "destructive",
      });
      console.error('Error updating post:', error);
    },
  });
};

export const useDeletePost = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      queryClient.invalidateQueries({ queryKey: ['user-posts'] });
      toast({
        title: "Success",
        description: "Post deleted successfully!",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to delete post. Please try again.",
        variant: "destructive",
      });
      console.error('Error deleting post:', error);
    },
  });
};
