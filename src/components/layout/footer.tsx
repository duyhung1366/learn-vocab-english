import Link from "next/link";
import { Feather } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t">
      <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <Feather className="h-6 w-6 text-accent" />
          <p className="text-center text-sm leading-loose md:text-left text-muted-foreground">
            Built by your friendly AI assistant.
          </p>
        </div>
        <p className="text-sm text-muted-foreground">&copy; 2024 LexiLearn. All rights reserved.</p>
      </div>
    </footer>
  );
}
