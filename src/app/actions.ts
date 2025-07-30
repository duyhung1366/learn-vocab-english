'use server';

import { suggestRelevantContent } from '@/ai/flows/suggest-relevant-content';
import { blogPosts } from '@/lib/data';

export async function getSuggestedContent() {
  try {
    // In a real application, this data would come from the user's profile and session.
    const practiceHistory = "User has practiced 'Business Contracts' (Score: 80%) and 'Marketing' (Score: 65%).";
    const knowledgeGaps = "User shows weakness in marketing terminology, specifically related to digital campaigns.";
    
    const availableContent = blogPosts.map(post => `ID: ${post.id}, Title: ${post.title}, Tags: ${post.tags.join(', ')}`).join('\n');

    const result = await suggestRelevantContent({
      practiceHistory,
      knowledgeGaps,
      availableContent,
    });
    
    // The AI returns a string of IDs. We need to parse it.
    const suggestedIds = result.suggestedContent.split(',').map(id => id.trim());
    
    const suggestedPosts = blogPosts.filter(post => suggestedIds.includes(post.id));

    return { success: true, posts: suggestedPosts };
  } catch (error) {
    console.error('Error getting suggested content:', error);
    return { success: false, error: 'Failed to get suggestions. Please try again.' };
  }
}
