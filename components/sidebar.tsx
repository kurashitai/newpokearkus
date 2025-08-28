"use client";
import { Search, ChevronDown, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { usePathname } from "next/navigation";
import { categories as wikiCategories } from "@/data/categories";
import Link from "next/link";

interface Subcategory {
  name: string;
  description: string;
  keywords: string;
  href: string;
}

interface Category {
  title: string;
  icon: any; 
  subcategories: Subcategory[];
}

export function Sidebar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [openCategories, setOpenCategories] = useState<{ [key: string]: boolean }>({});
  const [suggestions, setSuggestions] = useState<Array<{
    name: string;
    href: string;
    category: string;
  }>>([]);
  const pathname = usePathname();
  const [showSearch, setShowSearch] = useState(true);

  // Carrega o estado do localStorage e expande a categoria atual baseado no pathname
  useEffect(() => {
    const saved = localStorage.getItem('sidebarState');
    let initialState = saved ? JSON.parse(saved) : {};

    // Encontra a categoria que contém a página atual
    const currentCategory = wikiCategories.find(category =>
      category.subcategories.some(sub => sub.href === pathname)
    );

    if (currentCategory) {
      initialState = {
        ...initialState,
        [currentCategory.title]: true
      };
    }

    setOpenCategories(initialState);
  }, [pathname]);

  useEffect(() => {
    setShowSearch(pathname !== "/wiki");
  }, [pathname]);

  // Salva o estado no localStorage quando mudar
  useEffect(() => {
    if (Object.keys(openCategories).length > 0) {
      localStorage.setItem('sidebarState', JSON.stringify(openCategories));
    }
  }, [openCategories]);

  const toggleCategory = (category: string) => {
    setOpenCategories((prev) => {
      const newState = {
        ...prev,
        [category]: !prev[category],
      };
      return newState;
    });
  };

  // Função para gerar sugestões baseadas no input do usuário
  const handleSearch = (value: string) => {
    setSearchTerm(value);
    
    if (!value.trim()) {
      setSuggestions([]);
      return;
    }

    const newSuggestions: Array<{ name: string; href: string; category: string }> = [];
    
    wikiCategories.forEach((category: Category) => {
      category.subcategories.forEach((subcategory: Subcategory) => {
        if (
          subcategory.name.toLowerCase().includes(value.toLowerCase()) ||
          subcategory.description.toLowerCase().includes(value.toLowerCase()) ||
          subcategory.keywords.toLowerCase().includes(value.toLowerCase())
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

    // Expande automaticamente as categorias que têm resultados
    const categoriesToExpand: { [key: string]: boolean } = {};
    newSuggestions.forEach((suggestion) => {
      categoriesToExpand[suggestion.category] = true;
    });
    setOpenCategories((prev) => ({
      ...prev,
      ...categoriesToExpand,
    }));
  };

  const filteredCategories = wikiCategories.reduce((acc, category: Category) => {
    const filteredSubcategories = category.subcategories.filter(
      (subcategory: Subcategory) =>
        subcategory.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        subcategory.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        subcategory.keywords.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (filteredSubcategories.length > 0) {
      return {
        ...acc,
        [category.title]: filteredSubcategories,
      };
    }

    return acc;
  }, {});

  return (
    <div className="space-y-6">
      {showSearch && (
        <div className="rounded-lg border bg-card p-4">
          <div className="relative">
            <div className="flex items-center gap-2 rounded-md border bg-background px-3 py-2">
              <Search className="h-4 w-4 text-muted-foreground" />
              <input
                type="search"
                placeholder="Procurar na Wiki..."
                className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </div>
            {suggestions.length > 0 && (
              <div className="absolute w-full mt-1 bg-background border rounded-md shadow-lg z-10">
                {suggestions.map((suggestion, index) => (
                  <Link
                    key={`${suggestion.name}-${index}`}
                    href={suggestion.href}
                    className="block px-3 py-2 text-sm hover:bg-accent cursor-pointer"
                    onClick={() => {
                      setSearchTerm("");
                      setSuggestions([]);
                    }}
                  >
                    <span className="text-muted-foreground text-xs">{suggestion.category} / </span>
                    {suggestion.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      <div className="rounded-lg border bg-card p-4">
        <h3 className="font-medium mb-4">Categorias</h3>
        <div className="space-y-4">
          {Object.entries(filteredCategories).map(([category, subcategories]) => (
            <div key={category} className="space-y-2">
              <div
                className="flex items-center gap-1 cursor-pointer"
                onClick={() => toggleCategory(category)}
              >
                {openCategories[category] ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
                <span className="text-sm font-medium">{category}</span>
              </div>
              {openCategories[category] && (
                <div className="ml-4 space-y-1">
                  {(wikiCategories.find(cat => cat.title === category)?.subcategories || []).map((subcategory: Subcategory) => (
                    <TooltipProvider key={subcategory.name}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Link
                            href={subcategory.href}
                            className={`block w-full text-left text-sm ${
                              pathname === subcategory.href
                                ? "text-primary font-medium"
                                : "text-muted-foreground hover:text-primary"
                            } transition-colors`}
                            onClick={() => {
                              setSearchTerm("");
                              setSuggestions([]);
                            }}
                          >
                            {subcategory.name}
                          </Link>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="text-sm">{subcategory.description}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
