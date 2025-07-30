'use server';

/**
 * @fileOverview An AI agent that suggests relevant blog content based on the user's practice history and identified knowledge gaps.
 *
 * - suggestRelevantContent - A function that suggests relevant content.
 * - SuggestRelevantContentInput - The input type for the suggestRelevantContent function.
 * - SuggestRelevantContentOutput - The return type for the suggestRelevantContent function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestRelevantContentInputSchema = z.object({
  practiceHistory: z
    .string()
    .describe('The user’s practice history, including topics studied and scores.'),
  knowledgeGaps: z
    .string()
    .describe('The user’s identified knowledge gaps based on practice results.'),
  availableContent: z
    .string()
    .describe('A list of available blog content with brief descriptions.'),
});
export type SuggestRelevantContentInput = z.infer<typeof SuggestRelevantContentInputSchema>;

const SuggestRelevantContentOutputSchema = z.object({
  suggestedContent: z
    .string()
    .describe('A list of suggested blog content IDs, tailored to the user’s needs.'),
});
export type SuggestRelevantContentOutput = z.infer<typeof SuggestRelevantContentOutputSchema>;

export async function suggestRelevantContent(
  input: SuggestRelevantContentInput
): Promise<SuggestRelevantContentOutput> {
  return suggestRelevantContentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestRelevantContentPrompt',
  input: {schema: SuggestRelevantContentInputSchema},
  output: {schema: SuggestRelevantContentOutputSchema},
  prompt: `You are an AI content suggestion agent designed to provide personalized blog content recommendations.

  Based on the user's practice history, identified knowledge gaps, and available content, determine the most relevant blog content to suggest.

  Practice History: {{{practiceHistory}}}
  Knowledge Gaps: {{{knowledgeGaps}}}
  Available Content: {{{availableContent}}}

  Suggest blog content IDs that will help the user improve their knowledge and address their gaps.
  Return the suggested content as a list of IDs.`,
});

const suggestRelevantContentFlow = ai.defineFlow(
  {
    name: 'suggestRelevantContentFlow',
    inputSchema: SuggestRelevantContentInputSchema,
    outputSchema: SuggestRelevantContentOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
