import Link from 'next/link';
import { Gamepad, Sword, Shield, Map } from 'lucide-react';

const links = [
  { icon: Gamepad, label: 'Getting Started', href: '/getting-started' },
  { icon: Sword, label: 'Battle Guide', href: '/battle-guide' },
  { icon: Shield, label: 'Training', href: '/training' },
  { icon: Map, label: 'World Map', href: '/world-map' },
];

export function QuickLinks() {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
      {links.map((link) => {
        const Icon = link.icon;
        return (
          <Link
            key={link.href}
            href={link.href}
            className="flex items-center gap-2 rounded-lg border bg-card p-4 transition-colors hover:bg-accent"
          >
            <Icon className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium">{link.label}</span>
          </Link>
        );
      })}
    </div>
  );
}