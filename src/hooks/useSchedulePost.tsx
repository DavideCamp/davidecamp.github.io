import { getSimpleResponse } from "@/api/gemini";

const prompt = import.meta.env.VITE_PROMPT_BLOG as string


export function getSchedulePost() {
    return getSimpleResponse(prompt, false).then(response => {
        console.log(response.text)
        return parseBlogPost(response.text);
    });
}



export function parseBlogPost(blogPost: string) {
    if (!blogPost) {
        return {
            title: '',
            content: '',
            description: '',
            category: '',
            readTime: '',
        };
    }
    const lines = blogPost ? blogPost.split('\n') : [];
    console.log(lines)
    const title = lines[0] || '';
    const description = lines[2] || '';
    const category = lines[4] || '';
    const readTime = lines[6] || '';
    const content = lines.slice(4).join('\n');

    return {
        title,
        description,
        category,
        readTime,
        content,
    };
}

export const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };
