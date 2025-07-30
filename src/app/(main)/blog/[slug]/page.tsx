import { notFound } from "next/navigation";
import Image from "next/image";
import { blogPosts } from "@/lib/data";
import { Badge } from "@/components/ui/badge";

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = blogPosts.find((p) => p.slug === params.slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="container max-w-3xl py-12">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold font-headline sm:text-5xl">{post.title}</h1>
        <p className="mt-4 text-muted-foreground">
          By {post.author} on {post.date}
        </p>
         <div className="mt-4 flex justify-center flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="secondary">{tag}</Badge>
            ))}
          </div>
      </div>
      <Image
        src={post.imageUrl}
        alt={post.title}
        width={800}
        height={400}
        className="w-full rounded-lg aspect-video object-cover mb-8"
        data-ai-hint="language learning"
      />
      <div
        className="prose dark:prose-invert max-w-none text-foreground font-body"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </article>
  );
}
