"use client";
import { useState } from "react";
import { SVGProps } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Search } from "lucide-react";
import { categories } from "../data/categories";

interface SubcategoryContent {
  title: string;
  content: string;
}

interface IconType extends React.FC<SVGProps<SVGSVGElement>> {}

export function MainContent() {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [filteredCategories, setFilteredCategories] = useState(categories);
  const router = useRouter();

  const handleSearch = (value: string) => {
    setSearchTerm(value);

    if (!value.trim()) {
      setFilteredCategories(categories);
      setSuggestions([]);
      return;
    }

    const allItems = categories
      .map(category => category.subcategories)
      .flat()
      .map(sub => sub.name);
    
    const searchLower = value.toLowerCase();
    const filtered = allItems.filter(item =>
      item.toLowerCase().includes(searchLower)
    );
    setSuggestions(filtered);

    const filteredCats = categories
      .map((category) => ({
        ...category,
        subcategories: category.subcategories.filter(
          (sub) =>
            sub.name.toLowerCase().includes(searchLower) ||
            sub.description.toLowerCase().includes(searchLower) ||
            sub.keywords.toLowerCase().includes(searchLower)
        ),
      }))
      .filter((category) => category.subcategories.length > 0);

    setFilteredCategories(filteredCats);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearchTerm(suggestion);
    setSuggestions([]);
    
    const filteredCats = categories
      .map((category) => ({
        ...category,
        subcategories: category.subcategories.filter(
          (sub) => sub.name === suggestion
        ),
      }))
      .filter((category) => category.subcategories.length > 0);

    setFilteredCategories(filteredCats);
  };

  const getSubcategorySlug = (name: string) => {
    return name.toLowerCase().replace(/\s+/g, "-");
  };

  return (
    <div className="space-y-8">
      <div className="rounded-lg border bg-card p-6">
        <h1 className="text-2xl font-semibold mb-2">Bem vindos à WikiArkus</h1>
        <p className="text-sm text-muted-foreground">
          Seu guia completo para o mundo do Poke Arkus. Encontre informações
          detalhadas sobre sistemas e muito mais no Poke Arkus, estratégias de
          batalha, guias de treinamento e muito mais.
        </p>
      </div>

      <div className="space-y-6">
        <div className="rounded-lg border bg-card p-4 relative">
          <Search className="absolute left-6 top-1/2 h-4 w-4 text-muted-foreground -translate-y-1/2" />
          <input
            type="text"
            placeholder="Pesquisar na wiki..."
            className="flex h-9 w-full rounded-md border border-input bg-background px-8 py-2 text-sm placeholder:text-muted-foreground/60 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
          />
          {suggestions.length > 0 && (
            <div className="absolute left-0 right-0 mt-1 bg-background border rounded-md shadow-lg z-10">
              {suggestions.map((suggestion) => (
                <div
                  key={suggestion}
                  className="px-4 py-2 text-sm hover:bg-accent cursor-pointer"
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  {suggestion}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredCategories.map((category) => {
          const Icon: IconType = category.icon;
          return (
            <div
              key={category.title}
              className="rounded-lg border bg-card p-6 transition-colors hover:bg-accent/98"
            >
              <div className="flex items-center gap-2 mb-4">
                <Icon className="h-5 w-5 text-primary" />
                <h2 className="text-lg font-medium">{category.title}</h2>
              </div>
              <ul className="space-y-2">
                {category.subcategories.map((sub) => (
                  <li key={sub.name}>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Link
                            href={sub.href || `/wiki/${getSubcategorySlug(sub.name)}`}
                            className="text-sm text-muted-foreground hover:text-primary transition-colors block"
                          >
                            {sub.name}
                          </Link>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="text-sm">{sub.description}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}
