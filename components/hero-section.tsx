import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      <div className="container relative z-10 py-24 md:py-32">
        <div className="grid gap-8 md:grid-cols-2 md:gap-12">
          <div className="flex flex-col justify-center space-y-4">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
              Discover the World of <span className="text-primary">Pokémon</span>
            </h1>
            <p className="text-lg text-muted-foreground md:text-xl">
              Your comprehensive guide to Pokémon species, moves, abilities, and more. Join our community of trainers!
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Link
                href="/pokedex"
                className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Explore Pokédex
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link
                href="/community"
                className="inline-flex items-center justify-center rounded-lg border border-input bg-background px-6 py-3 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                Join Community
              </Link>
            </div>
          </div>
          <div className="relative hidden md:block">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent rounded-3xl" />
            <Image
              src="https://images.unsplash.com/photo-1613771404784-3a5686aa2be3?auto=format&fit=crop&q=80&w=800&h=600"
              alt="Pokémon Trading Cards"
              width={800}
              height={600}
              className="rounded-3xl object-cover"
              priority
            />
          </div>
        </div>
      </div>
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
    </section>
  );
}