"use client";

import { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const featuredPokemon = [
  {
    id: 1,
    name: 'Charizard',
    type: 'Fire/Flying',
    image: 'https://images.unsplash.com/photo-1613771404784-3a5686aa2be3?auto=format&fit=crop&q=80&w=300&h=300',
  },
  {
    id: 2,
    name: 'Mewtwo',
    type: 'Psychic',
    image: 'https://images.unsplash.com/photo-1613771404784-3a5686aa2be3?auto=format&fit=crop&q=80&w=300&h=300',
  },
  {
    id: 3,
    name: 'Pikachu',
    type: 'Electric',
    image: 'https://images.unsplash.com/photo-1613771404784-3a5686aa2be3?auto=format&fit=crop&q=80&w=300&h=300',
  },
];

export function FeaturedPokemon() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => {
    setCurrentIndex((current) =>
      current === featuredPokemon.length - 1 ? 0 : current + 1
    );
  };

  const previous = () => {
    setCurrentIndex((current) =>
      current === 0 ? featuredPokemon.length - 1 : current - 1
    );
  };

  return (
    <section className="container py-8">
      <h2 className="text-3xl font-bold tracking-tighter mb-8">Featured Pokémon</h2>
      <div className="relative">
        <div className="overflow-hidden rounded-lg">
          <div
            className="flex transition-transform duration-300 ease-in-out"
            style={{
              transform: `translateX(-${currentIndex * 100}%)`,
            }}
          >
            {featuredPokemon.map((pokemon) => (
              <div
                key={pokemon.id}
                className="w-full flex-none"
              >
                <div className="grid gap-8 md:grid-cols-2">
                  <div className="relative aspect-square">
                    <Image
                      src={pokemon.image}
                      alt={pokemon.name}
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>
                  <div className="flex flex-col justify-center space-y-4">
                    <h3 className="text-2xl font-bold">{pokemon.name}</h3>
                    <p className="text-muted-foreground">{pokemon.type}</p>
                    <p className="text-muted-foreground">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                      do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua.
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <button
          onClick={previous}
          className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-background/80 p-2 text-foreground backdrop-blur-sm transition-colors hover:bg-background/90"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button
          onClick={next}
          className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-background/80 p-2 text-foreground backdrop-blur-sm transition-colors hover:bg-background/90"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>
    </section>
  );
}