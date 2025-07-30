import { blogPosts } from "@/lib/data";
import { PostCard } from "@/components/blog/post-card";
import { ContentSuggester } from "@/components/blog/content-suggester";

export default function BlogPage() {
  return (
    <div className="container py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold font-headline sm:text-5xl md:text-6xl">LexiLearn Blog</h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          Tips, strategies, and insights to help you master vocabulary for your exams.
        </p>
      </div>

      <div className="mb-12">
        <ContentSuggester />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogPosts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
