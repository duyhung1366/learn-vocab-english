"use client";

import { useState, useEffect } from "react";
import { notFound, useParams } from "next/navigation";
import { topics } from "@/lib/data";
import type { Topic, VocabularyWord } from "@/lib/types";
import { Flashcard } from "@/components/practice/flashcard";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import {
  Card,
  CardContent,
} from "@/components/ui/card"

export default function StudyPage() {
  const params = useParams();
  const { exam, topic: topicId } = params;

  const [topicData, setTopicData] = useState<Topic | null>(null);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  useEffect(() => {
    const foundTopic = topics.find(
      (t) => t.id === topicId && t.category.toLowerCase() === exam
    );
    if (foundTopic) {
      setTopicData(foundTopic);
    }
  }, [topicId, exam]);

  if (!topicData) {
     // You can return a loading spinner here
     return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }
  
  const words: VocabularyWord[] = topicData.words;
  const progress = ((currentWordIndex + 1) / words.length) * 100;

  const goToNextWord = () => {
    setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
  };

  const goToPreviousWord = () => {
    setCurrentWordIndex((prevIndex) => (prevIndex - 1 + words.length) % words.length);
  };

  return (
    <div className="container py-12 flex flex-col items-center">
      <div className="w-full max-w-xl text-center mb-8">
        <Link href={`/${exam}/${topicId}`} className="text-sm text-accent hover:underline mb-2 inline-block">&larr; Back to Vocabulary List</Link>
        <h1 className="text-3xl font-bold font-headline sm:text-4xl">{topicData.title}</h1>
        <p className="text-muted-foreground mt-2">Practice Session</p>
      </div>

      <Flashcard word={words[currentWordIndex]} />

      <div className="w-full max-w-xl mt-8">
        <div className="flex items-center justify-between mb-4">
          <Button variant="outline" size="icon" onClick={goToPreviousWord}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div className="text-sm font-medium text-muted-foreground">
            Word {currentWordIndex + 1} of {words.length}
          </div>
          <Button variant="outline" size="icon" onClick={goToNextWord}>
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
        <Progress value={progress} className="w-full" />
      </div>

       {currentWordIndex === words.length - 1 && (
        <Card className="mt-12 w-full max-w-xl text-center">
          <CardContent className="p-6">
            <h2 className="text-2xl font-headline font-semibold mb-4">Topic Complete!</h2>
            <p className="text-muted-foreground mb-6">You've reviewed all the words. Ready for another round or a new challenge?</p>
            <div className="flex gap-4 justify-center">
              <Button onClick={() => setCurrentWordIndex(0)}>Practice Again</Button>
              <Button variant="outline" asChild>
                <Link href={`/${exam}`}>Choose Another Topic</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
