"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import type { VocabularyWord } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Volume2, RefreshCw } from "lucide-react";

interface FlashcardProps {
  word: VocabularyWord;
}

export function Flashcard({ word }: FlashcardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handlePronounce = (e: React.MouseEvent) => {
    e.stopPropagation();
    const utterance = new SpeechSynthesisUtterance(word.word);
    speechSynthesis.speak(utterance);
  };
  
  return (
    <div
      className="w-full max-w-xl h-80 rounded-xl cursor-pointer"
      style={{ perspective: "1000px" }}
      onClick={handleFlip}
    >
      <div
        className={cn(
          "relative w-full h-full rounded-xl shadow-xl transition-transform duration-700",
          isFlipped ? "[transform:rotateY(180deg)]" : ""
        )}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Front of the card */}
        <div className="absolute w-full h-full bg-card border rounded-xl flex flex-col items-center justify-center p-6 [backface-visibility:hidden]">
          <h2 className="text-4xl md:text-5xl font-bold font-headline text-center">{word.word}</h2>
          <p className="text-muted-foreground mt-2">{word.pronunciation}</p>
          <Button variant="ghost" size="icon" className="absolute top-4 right-4" onClick={handlePronounce}>
            <Volume2 className="h-6 w-6" />
          </Button>
           <div className="absolute bottom-4 text-xs text-muted-foreground flex items-center">
             <RefreshCw className="w-3 h-3 mr-1.5"/> Click to flip
           </div>
        </div>

        {/* Back of the card */}
        <div className="absolute w-full h-full bg-card border rounded-xl flex flex-col items-center justify-center p-6 [transform:rotateY(180deg)] [backface-visibility:hidden]">
          <div className="text-center">
            <h3 className="text-xl font-bold mb-4">{word.definition}</h3>
            <p className="text-muted-foreground italic">"{word.example}"</p>
          </div>
           <div className="absolute bottom-4 text-xs text-muted-foreground flex items-center">
             <RefreshCw className="w-3 h-3 mr-1.5"/> Click to flip
           </div>
        </div>
      </div>
    </div>
  );
}
