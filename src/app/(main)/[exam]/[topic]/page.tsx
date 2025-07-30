import { notFound } from "next/navigation";
import { topics } from "@/lib/data";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BookOpenCheck } from "lucide-react";

export async function generateStaticParams() {
  return topics.map((topic) => ({
    exam: topic.category.toLowerCase(),
    topic: topic.id,
  }));
}

export default function VocabularyListPage({ params }: { params: { exam: string; topic: string } }) {
  const { topic: topicId } = params;
  const topicData = topics.find((t) => t.id === topicId);

  if (!topicData) {
    notFound();
  }

  return (
    <div className="container py-12">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold font-headline sm:text-5xl md:text-6xl">{topicData.title}</h1>
        <p className="mt-4 text-lg text-muted-foreground">{topicData.description}</p>
      </div>

      <div className="flex justify-center mb-12">
        <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
          <Link href={`/study/${params.exam}/${params.topic}`}>
            <BookOpenCheck className="mr-2 h-5 w-5" />
            Start Practice Session
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Vocabulary List</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[20%]">Word</TableHead>
                <TableHead className="w-[20%]">Pronunciation</TableHead>
                <TableHead className="w-[60%]">Definition & Example</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {topicData.words.map((word) => (
                <TableRow key={word.word}>
                  <TableCell className="font-bold">{word.word}</TableCell>
                  <TableCell className="text-muted-foreground">{word.pronunciation}</TableCell>
                  <TableCell>
                    <p>{word.definition}</p>
                    <p className="text-sm text-muted-foreground mt-1"><em>e.g., "{word.example}"</em></p>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
