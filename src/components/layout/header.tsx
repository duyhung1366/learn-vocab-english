"use client";

import Link from "next/link";
import { BookMarked, Menu, Feather } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const mainNavLinks = [
  { href: "/toeic", label: "TOEIC" },
  { href: "/ielts", label: "IELTS" },
  { href: "/blog", label: "Blog" },
];

const authNavLinks = [
  { href: "/login", label: "Login" },
  { href: "/register", label: "Sign Up", isButton: true },
];

export function Header() {
  const pathname = usePathname();

  const renderNavLink = (link: { href: string; label: string; isButton?: boolean }) => {
    const isActive = pathname.startsWith(link.href);
    if (link.isButton) {
      return (
        <Button asChild size="sm">
          <Link href={link.href}>{link.label}</Link>
        </Button>
      );
    }
    return (
      <Link
        href={link.href}
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary-foreground text-muted-foreground",
          isActive && "text-primary-foreground"
        )}
      >
        {link.label}
      </Link>
    );
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Feather className="h-6 w-6 text-accent" />
            <span className="hidden font-bold sm:inline-block font-headline">LexiLearn</span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            {mainNavLinks.map((link) => (
               <Link
               key={link.href}
               href={link.href}
               className={cn(
                 "transition-colors hover:text-foreground/80",
                 pathname?.startsWith(link.href) ? "text-foreground" : "text-foreground/60"
               )}
             >
               {link.label}
             </Link>
            ))}
          </nav>
        </div>

        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <Link href="/" className="flex items-center space-x-2 mb-6">
                  <Feather className="h-6 w-6 text-accent" />
                  <span className="font-bold font-headline">LexiLearn</span>
                </Link>
                <nav className="flex flex-col space-y-4">
                  {[...mainNavLinks, ...authNavLinks].map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="text-muted-foreground hover:text-primary-foreground"
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
          <nav className="hidden md:flex items-center space-x-4">
            {authNavLinks.map(renderNavLink)}
          </nav>
        </div>
      </div>
    </header>
  );
}
