import { BookOpen, Sword, Shield, Zap } from 'lucide-react';

const guides = [
  {
    title: 'Beginner\'s Guide',
    icon: BookOpen,
    description: 'Start your Pokémon journey with essential tips...',
  },
  {
    title: 'Battle Strategies',
    icon: Sword,
    description: 'Master competitive battling with advanced tactics...',
  },
  {
    title: 'Team Building',
    icon: Shield,
    description: 'Learn how to create balanced and effective teams...',
  },
  {
    title: 'Move Sets',
    icon: Zap,
    description: 'Optimize your Pokémon\'s moves for maximum impact...',
  },
];

export function GuideSection() {
  return (
    <section className="space-y-6">
      <h2 className="text-2xl font-bold tracking-tighter">Popular Guides</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        {guides.map((guide, index) => {
          const Icon = guide.icon;
          return (
            <div
              key={index}
              className="group rounded-lg border p-4 transition-colors hover:bg-accent"
            >
              <Icon className="h-6 w-6 mb-2 text-primary" />
              <h3 className="font-semibold">{guide.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {guide.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}