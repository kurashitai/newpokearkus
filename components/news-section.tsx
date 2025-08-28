import { CalendarDays } from 'lucide-react';

const newsItems = [
  {
    title: 'New Pokémon Games Announced',
    date: '2024-03-20',
    excerpt: 'Game Freak reveals exciting new titles coming to Nintendo Switch...',
  },
  {
    title: 'Pokémon Trading Card Game Update',
    date: '2024-03-18',
    excerpt: 'Latest expansion set introduces powerful new mechanics...',
  },
  {
    title: 'World Championship Results',
    date: '2024-03-15',
    excerpt: 'Top trainers from around the globe compete for the title...',
  },
];

export function NewsSection() {
  return (
    <section className="space-y-6">
      <h2 className="text-2xl font-bold tracking-tighter">Latest News</h2>
      <div className="space-y-4">
        {newsItems.map((item, index) => (
          <article
            key={index}
            className="group rounded-lg border p-4 transition-colors hover:bg-accent"
          >
            <h3 className="font-semibold">{item.title}</h3>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mt-2">
              <CalendarDays className="h-4 w-4" />
              <time dateTime={item.date}>
                {new Date(item.date).toLocaleDateString()}
              </time>
            </div>
            <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
              {item.excerpt}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}