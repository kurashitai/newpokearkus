interface CategoryCardProps {
  title: string;
  icon: string;
  items: string[];
}

export function CategoryCard({ title, icon, items }: CategoryCardProps) {
  return (
    <div className="rounded-lg border bg-card/40 backdrop-blur-sm p-4 hover:bg-card/60 transition-colors">
      <h2 className="text-lg font-semibold mb-2 flex items-center gap-2">
        <span>{icon}</span>
        {title}
      </h2>
      <ul className="space-y-1">
        {items.map((item) => (
          <li key={item}>
            <a
              href="#"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {item}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
