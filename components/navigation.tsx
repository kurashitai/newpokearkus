"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Moon, Sun, Menu, X, ChevronDown } from "lucide-react";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useMobileMenuOpen, useMobileMenuToggle } from "@/lib/store";
import { motionVariants } from "@/components/providers/motion-provider";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Navigation() {
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();
  const isOpen = useMobileMenuOpen();
  const toggle = useMobileMenuToggle();

  useEffect(() => {
    setMounted(true);
    
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      setScrolled(isScrolled);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    if (isOpen) toggle();
  }, [pathname, isOpen, toggle]); // Added missing dependencies

  const menuItems = [
    { 
      label: "Início", 
      href: "/",
      description: "Welcome to Poke Arkus"
    },
    { 
      label: "Download", 
      href: "/download",
      description: "Get the game"
    },
    { 
      label: "Mapa", 
      href: "/mapa",
      description: "Explore Pokemon locations"
    },
    { 
      label: "Wiki", 
      href: "/wiki",
      description: "Comprehensive guides"
    },
  ];

  const isActive = (href: string) => {
    if (href === "/") return pathname === href;
    return pathname.startsWith(href);
  };

  if (!mounted) return null;

  // Toggle dropdown function
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <>
      {/* Main Navigation */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={cn(
          "fixed top-4 left-0 right-0 flex justify-center z-50",
          "transition-all duration-500 ease-out"
        )}
      >
        <div className="flex h-16 items-center justify-between px-6 relative w-[95%] max-w-5xl">
          {/* Logo - Left Side */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex-shrink-0 z-10"
          >
            <Link href="/" className="flex items-center space-x-3">
              <div className="relative w-10 h-10">
                <Image
                  src="/logo.png"
                  alt="PokeArkus Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <span className="font-bold text-xl bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                PokeArkus
              </span>
            </Link>
          </motion.div>

          {/* Desktop Menu - Centered with flex-1 to take available space */}
          <div className="hidden md:flex flex-1 justify-center">
            <div className="flex items-center space-x-1 z-10">
              {menuItems.map((item, index) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.2 }}
                >
                  <Link
                    href={item.href}
                    className={cn(
                      "nav-link px-4 py-2 rounded-lg text-sm font-medium",
                      "transition-all duration-200 ease-out",
                      "hover:bg-accent hover:text-accent-foreground",
                      isActive(item.href) && "bg-primary/10 text-primary"
                    )}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center space-x-3 flex-shrink-0 z-10">

            {/* Theme Toggle */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                className="h-9 w-9 p-0"
              >
                <AnimatePresence mode="wait" initial={false}>
                  {theme === "light" ? (
                    <motion.div
                      key="moon"
                      initial={{ scale: 0, rotate: -90 }}
                      animate={{ scale: 1, rotate: 0 }}
                      exit={{ scale: 0, rotate: 90 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Moon className="h-4 w-4" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="sun"
                      initial={{ scale: 0, rotate: 90 }}
                      animate={{ scale: 1, rotate: 0 }}
                      exit={{ scale: 0, rotate: -90 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Sun className="h-4 w-4" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </Button>
            </motion.div>

            {/* Dropdown Menu - Visible only on smaller screens */}
            <div className="md:hidden">
              <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="px-3 ml-2 z-10" onClick={toggleDropdown}>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  {menuItems.map((item) => (
                    <DropdownMenuItem key={item.href} asChild>
                      <Link href={item.href}>{item.label}</Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          
          {/* Background highlight that only spans the navigation container */}
          <div 
            className={cn(
              "absolute inset-0 rounded-xl transition-all duration-500 ease-out -z-10",
              scrolled
                ? "bg-black/80 shadow-lg backdrop-blur-sm"
                : "bg-transparent"
            )}
          />
        </div>
      </motion.nav>

      {/* Spacer */}
      <div className="h-24" />
    </>
  );
}
