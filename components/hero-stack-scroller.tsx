"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronDown, Play, Download, MapPin } from "lucide-react";

interface Banner {
  id: string;
  image: string;
  title: string;
  subtitle: string;
  description: string;
  cta: {
    primary: {
      text: string;
      href: string;
      icon?: React.ReactNode;
    };
    secondary?: {
      text: string;
      href: string;
      icon?: React.ReactNode;
    };
  };
  gradient: string;
}

const banners: Banner[] = [
  {
    id: "pokearkus",
    image: "/POKEARKUS.jpg",
    title: "PokeArkus",
    subtitle: "The Ultimate Pokemon Experience",
    description: "Embark on an epic journey in the most immersive Pokemon world ever created. Discover new regions, catch legendary Pokemon, and become the ultimate trainer.",
    cta: {
      primary: {
        text: "Start Playing",
        href: "/download",
        icon: <Play className="h-5 w-5" />
      },
      secondary: {
        text: "Explorar Mapa",
        href: "/mapa",
        icon: <MapPin className="h-5 w-5" />
      }
    },
    gradient: "from-blue-600/80 to-purple-800/80"
  },
  {
    id: "goals",
    image: "/GOAL_SITE.jpg", 
    title: "Set Your Goals",
    subtitle: "Track Your Progress",
    description: "Define your trainer objectives and track your progress through comprehensive goal-setting tools. Achieve milestones and unlock exclusive rewards.",
    cta: {
      primary: {
        text: "View Goals",
        href: "/wiki/goal",
        icon: <Play className="h-5 w-5" />
      },
      secondary: {
        text: "Learn More",
        href: "/wiki/tasks",
        icon: <ChevronDown className="h-5 w-5" />
      }
    },
    gradient: "from-green-600/80 to-emerald-800/80"
  },
  {
    id: "lich",
    image: "/LICH.jpg",
    title: "Face the Lich",
    subtitle: "Ultimate Challenge Awaits",
    description: "Prepare for the most challenging boss battle in PokeArkus. Gather your strongest team and face the legendary Lich in epic combat.",
    cta: {
      primary: {
        text: "Boss Guide",
        href: "/wiki/bosses",
        icon: <Play className="h-5 w-5" />
      },
      secondary: {
        text: "Raid Teams",
        href: "/wiki/raids",
        icon: <ChevronDown className="h-5 w-5" />
      }
    },
    gradient: "from-red-600/80 to-orange-800/80"
  }
];

export function HeroStackScroller() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const { scrollY } = useScroll();
  
  // Parallax effect
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0.3]);

  // Auto-scroll effect
  useEffect(() => {
    if (!isAutoScrolling) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % banners.length);
    }, 7000);
    
    return () => clearInterval(interval);
  }, [isAutoScrolling]);

  const handleManualNavigation = useCallback((index: number) => {
    setCurrentIndex(index);
    setIsAutoScrolling(false);
    
    // Resume auto-scrolling after 15 seconds
    setTimeout(() => {
      setIsAutoScrolling(true);
    }, 15000);
  }, []);

  const currentBanner = banners[currentIndex];

  return (
    <div className="relative h-[70vh] lg:h-[80vh] overflow-hidden">
      {/* Background Images Stack */}
      <div className="absolute inset-0">
        <AnimatePresence mode="wait">
          {banners.map((banner, index) => (
            <motion.div
              key={banner.id}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ 
                opacity: index === currentIndex ? 1 : 0,
                scale: index === currentIndex ? 1 : 1.1 
              }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
              className="absolute inset-0"
              style={{ y: index === currentIndex ? y : 0 }}
            >
              <Image
                src={banner.image}
                alt={banner.title}
                fill
                className="object-cover"
                priority={index === 0}
                quality={90}
                sizes="100vw"
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Content */}
      <motion.div 
        className="relative z-10 h-full flex items-end"
        style={{ opacity }}
      >
        <div className="container mx-auto px-6 lg:px-8 pb-20">
          <div className="max-w-2xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentBanner.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="space-y-6"
              >
                {/* Subtitle */}
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="inline-block"
                >
                  <span className="px-4 py-2 bg-black/70 backdrop-blur-sm rounded-full text-white text-sm font-medium border border-white/20">
                    {currentBanner.subtitle}
                  </span>
                </motion.div>

                {/* Title */}
                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight drop-shadow-lg"
                >
                  {currentBanner.title}
                </motion.h1>

                {/* Description */}
                <motion.p
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-lg md:text-xl text-white max-w-xl leading-relaxed drop-shadow-md"
                >
                  {currentBanner.description}
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="flex flex-col sm:flex-row gap-4 pt-6"
                >
                  <Link href={currentBanner.cta.primary.href}>
                    <Button
                      size="lg"
                      className="bg-white text-black hover:bg-white/90 text-lg px-8 py-4 h-auto font-semibold group"
                    >
                      {currentBanner.cta.primary.icon}
                      <span className="ml-2">{currentBanner.cta.primary.text}</span>
                    </Button>
                  </Link>
                  
                  {currentBanner.cta.secondary && (
                    <Link href={currentBanner.cta.secondary.href}>
                      <Button
                        variant="outline"
                        size="lg"
                        className="bg-transparent border-white/30 text-white hover:bg-white/10 text-lg px-8 py-4 h-auto font-semibold backdrop-blur-sm"
                      >
                        {currentBanner.cta.secondary.icon}
                        <span className="ml-2">{currentBanner.cta.secondary.text}</span>
                      </Button>
                    </Link>
                  )}
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </motion.div>

      {/* Navigation Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex space-x-3">
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={() => handleManualNavigation(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? "bg-white scale-125"
                  : "bg-white/50 hover:bg-white/75"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/20 z-20">
        <motion.div
          className="h-full bg-white"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ 
            duration: 7, 
            ease: "linear",
            repeat: Infinity,
            repeatDelay: 0
          }}
          key={currentIndex}
        />
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 right-8 z-20"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center text-white/70"
        >
          <span className="text-sm mb-2">Scroll</span>
          <ChevronDown className="h-5 w-5" />
        </motion.div>
      </motion.div>
    </div>
  );
}

export default HeroStackScroller;