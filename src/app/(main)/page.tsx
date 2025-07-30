import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BrainCircuit, BookCopy, GraduationCap, ArrowRight } from "lucide-react";
import Image from "next/image";

const features = [
  {
    icon: <BookCopy className="w-8 h-8 text-accent" />,
    title: "Curated Word Lists",
    description: "Master vocabulary for TOEIC and IELTS with lists curated by experts.",
  },
  {
    icon: <GraduationCap className="w-8 h-8 text-accent" />,
    title: "Effective Practice",
    description: "Use flashcards and quizzes to reinforce your learning and track progress.",
  },
  {
    icon: <BrainCircuit className="w-8 h-8 text-accent" />,
    title: "AI-Powered Suggestions",
    description: "Get personalized blog content recommendations to fill your knowledge gaps.",
  },
];

const featuredTopics = [
    { name: "Business Contracts", category: "TOEIC", link: "/toeic/business-contracts"},
    { name: "Marketing", category: "TOEIC", link: "/toeic/marketing"},
    { name: "Environment", category: "IELTS", link: "/ielts/environment"},
    { name: "Technology", category: "IELTS", link: "/ielts/technology"},
]

export default function HomePage() {
  return (
    <div className="flex flex-col">
      <section className="w-full py-20 md:py-32 lg:py-40 bg-primary/20">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:gap-16 items-center">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl font-headline text-foreground">
                Unlock Your Potential with LexiLearn
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                Master TOEIC and IELTS vocabulary with our interactive platform.
                Personalized learning paths, effective practice tools, and AI-driven insights.
              </p>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                  <Link href="/register">Start Learning Now</Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link href="/toeic">Explore Topics</Link>
                </Button>
              </div>
            </div>
            <Image
              src="https://placehold.co/600x400.png"
              width="600"
              height="400"
              alt="Hero"
              data-ai-hint="language learning"
              className="mx-auto aspect-video overflow-hidden rounded-xl object-cover"
            />
          </div>
        </div>
      </section>

      <section id="features" className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Key Features</div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">
              Everything You Need to Succeed
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Our platform is designed to provide a comprehensive and engaging learning experience.
            </p>
          </div>
          <div className="mx-auto grid items-start gap-8 sm:max-w-4xl sm:grid-cols-2 md:gap-12 lg:max-w-5xl lg:grid-cols-3">
            {features.map((feature, index) => (
              <div key={index} className="grid gap-1 text-center">
                <div className="flex justify-center mb-2">{feature.icon}</div>
                <h3 className="text-lg font-bold font-headline">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <section id="topics" className="w-full py-12 md:py-24 lg:py-32 bg-muted">
        <div className="container px-4 md:px-6">
           <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">
              Featured Topics
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Get started with our most popular vocabulary topics for TOEIC and IELTS.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featuredTopics.map((topic) => (
                 <Card key={topic.name} className="transform transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl">
                    <CardHeader>
                        <CardTitle className="font-headline text-xl">{topic.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                       <div className="flex justify-between items-center">
                         <span className={`text-xs font-semibold px-2 py-1 rounded-full ${topic.category === 'TOEIC' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}`}>{topic.category}</span>
                         <Link href={topic.link} className="flex items-center text-sm font-semibold text-accent hover:text-accent/80">
                            Study <ArrowRight className="w-4 h-4 ml-1" />
                         </Link>
                       </div>
                    </CardContent>
                </Card>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
