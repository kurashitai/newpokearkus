"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";

export function Navigation() {
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
    
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      setScrolled(isScrolled);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    { label: "Início", href: "/" },
    { label: "Download", href: "/download" },
    { label: "Mapa", href: "/mapa" },
    { label: "Wiki", href: "/wiki" },
  ];

  const isActive = (href: string) => {
    if (href === "/") return pathname === href;
    return pathname.startsWith(href);
  };

  if (!mounted) return null;

  return (
    <>
      <nav
        className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-2xl rounded-lg transition-all duration-300 ease-in-out ${
          scrolled
            ? "border border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-lg"
            : "bg-transparent border-transparent"
        }`}
      >
        <div className="flex h-14 items-center justify-between px-4">
          <Link href="/" className="flex items-center h-8">
            <Image
              src="/logo.png"
              alt="PokeArkus Logo"
              width={80}
              height={32}
              className="object-contain h-full w-auto"
              priority
            />
          </Link>

          <div className="flex gap-8">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`relative text-base font-medium transition-all duration-300 group ${
                  isActive(item.href)
                    ? "text-primary"
                    : "text-foreground/80 hover:text-primary"
                }`}
              >
                {item.label}
                <span className="absolute left-0 bottom-0 w-full h-0.5 bg-primary transform scale-x-0 transition-transform duration-300 origin-left group-hover:scale-x-100" />
              </Link>
            ))}
          </div>

          <button
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className={`rounded-md w-8 h-8 flex items-center justify-center transition-all duration-300 ${
              scrolled ? "hover:bg-accent" : "hover:bg-white/10"
            }`}
          >
            {theme === "light" ? (
              <Moon className="h-5 w-5" />
            ) : (
              <Sun className="h-5 w-5" />
            )}
          </button>
        </div>
      </nav>
      <div className="h-20" />
    </>
  );
}
