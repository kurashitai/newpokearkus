"use client";

import { Search } from "lucide-react";
import { useState, useRef } from "react";
import Link from "next/link";
import { categories as wikiCategories } from "@/data/categories";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Suggestion {
  name: string;
  href: string;
  category: string;
}

export function SearchButton() {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  // Função para gerar sugestões baseadas no input do usuário
  const handleSearch = (value: string) => {
    setSearchTerm(value);
    
    if (!value.trim()) {
      setSuggestions([]);
      return;
    }

    const newSuggestions: Suggestion[] = [];
    const searchValue = value.toLowerCase();
    
    wikiCategories.forEach((category) => {
      category.subcategories.forEach((subcategory) => {
        if (
          subcategory.name.toLowerCase().includes(searchValue) ||
          subcategory.description.toLowerCase().includes(searchValue) ||
          subcategory.keywords.toLowerCase().includes(searchValue)
        ) {
          newSuggestions.push({
            name: subcategory.name,
            href: subcategory.href,
            category: category.title,
          });
        }
      });
    });

    setSuggestions(newSuggestions);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className="p-2 text-foreground/80 hover:text-primary"
        >
          <Search className="h-6 w-6" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        className="w-[300px] p-0" 
        align="end"
        onCloseAutoFocus={() => {
          setSearchTerm("");
          setSuggestions([]);
        }}
      >
        <div className="flex flex-col">
          <input
            ref={inputRef}
            type="text"
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Pesquisar..."
            className="w-full rounded-t-md border-b bg-background px-3 py-2 text-sm focus:outline-none"
            autoFocus
          />
          {suggestions.length > 0 && (
            <div className="max-h-[300px] overflow-y-auto py-1">
              {suggestions.map((suggestion, index) => (
                <Link
                  key={`${suggestion.href}-${index}`}
                  href={suggestion.href}
                  className="flex flex-col px-3 py-2 text-sm hover:bg-accent"
                >
                  <span className="font-medium">{suggestion.name}</span>
                  <span className="text-xs text-muted-foreground">
                    {suggestion.category}
                  </span>
                </Link>
              ))}
            </div>
          )}
          {searchTerm && suggestions.length === 0 && (
            <div className="px-3 py-2 text-sm text-muted-foreground">
              Nenhum resultado encontrado
            </div>
          )}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
