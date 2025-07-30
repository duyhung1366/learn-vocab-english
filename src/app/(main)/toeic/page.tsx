import { topics } from "@/lib/data";
import { Topic } from "@/lib/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function ToeicTopicsPage() {
  const toeicTopics = topics.filter((topic) => topic.category === "TOEIC");

  return (
    <div className="container py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold font-headline sm:text-5xl md:text-6xl">TOEIC Vocabulary Topics</h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          Enhance your professional vocabulary for the TOEIC test. Select a topic to begin.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {toeicTopics.map((topic: Topic) => (
          <Card key={topic.id} className="flex flex-col transform transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl">
            <CardHeader>
              <CardTitle className="font-headline text-2xl">{topic.title}</CardTitle>
              <CardDescription>{topic.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow flex flex-col justify-end">
              <Link href={`/toeic/${topic.id}`} passHref>
                <Button className="w-full bg-accent hover:bg-accent/90">
                  Start Topic <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
