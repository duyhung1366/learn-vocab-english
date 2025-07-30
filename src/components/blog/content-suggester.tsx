'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Wand2 } from 'lucide-react';
import { getSuggestedContent } from '@/app/actions';
import { BlogPost } from '@/lib/types';
import Link from 'next/link';

export function ContentSuggester() {
  const [suggestedPosts, setSuggestedPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSuggestContent = async () => {
    setIsLoading(true);
    setError(null);
    setSuggestedPosts([]);

    const result = await getSuggestedContent();

    if (result.success) {
      setSuggestedPosts(result.posts || []);
    } else {
      setError(result.error || 'An unknown error occurred.');
    }
    setIsLoading(false);
  };

  return (
    <Card className="bg-primary/20 border-accent/50">
      <CardHeader>
        <CardTitle className="font-headline flex items-center gap-2">
          <Wand2 className="h-6 w-6 text-accent" />
          Personalized Reading
        </CardTitle>
        <CardDescription>
          Get AI-powered blog post suggestions based on your recent practice and identified knowledge gaps.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Button onClick={handleSuggestContent} disabled={isLoading} className="bg-accent hover:bg-accent/90">
          {isLoading ? 'Analyzing...' : 'Suggest Content for Me'}
        </Button>
        {error && <p className="text-destructive mt-4 text-sm">{error}</p>}
        {suggestedPosts.length > 0 && (
          <div className="mt-6">
            <h4 className="font-bold mb-2">Here are your suggestions:</h4>
            <ul className="list-disc list-inside space-y-1">
              {suggestedPosts.map((post) => (
                <li key={post.id}>
                  <Link href={`/blog/${post.slug}`} className="text-foreground hover:underline">
                    {post.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
