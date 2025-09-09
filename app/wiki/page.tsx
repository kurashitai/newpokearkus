"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, Users, Crown, MapPin, Star, Target, Gift, Swords, Shield, Trophy, HelpCircle, Calendar, Sparkles, Search } from "lucide-react";

export const dynamic = 'force-dynamic';

interface WikiCategory {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  items: WikiItem[];
}

interface WikiItem {
  name: string;
  href: string;
  description: string;
  badge?: string;
  icon: React.ReactNode;
}

const wikiCategories: WikiCategory[] = [
  {
    title: "Game Mechanics",
    description: "Core gameplay systems and mechanics",
    icon: <Zap className="h-6 w-6" />,
    color: "from-blue-500 to-cyan-500",
    items: [
      {
        name: "Boost System",
        href: "/wiki/boost",
        description: "Power up your Pokemon with the boost system",
        icon: <Zap className="h-4 w-4" />,
        badge: "Core"
      },
      {
        name: "Capture System",
        href: "/wiki/sistema-de-captura",
        description: "Learn how to catch Pokemon effectively",
        icon: <Target className="h-4 w-4" />,
        badge: "Essential"
      },
      {
        name: "Awaken System",
        href: "/wiki/awaken",
        description: "Unlock your Pokemon's hidden potential",
        icon: <Star className="h-4 w-4" />
      },
      {
        name: "Mega Evolution",
        href: "/wiki/megas",
        description: "Transform your Pokemon into Mega forms",
        icon: <Sparkles className="h-4 w-4" />
      },
      {
        name: "Shiny & Evolution",
        href: "/wiki/shinys-e-evolucoes",
        description: "Rare Pokemon and evolution guide",
        icon: <Star className="h-4 w-4" />
      }
    ]
  },
  {
    title: "Social & Community",
    description: "Multiplayer features and community content",
    icon: <Users className="h-6 w-6" />,
    color: "from-green-500 to-emerald-500",
    items: [
      {
        name: "Brotherhood",
        href: "/wiki/brotherhood",
        description: "Join forces with other trainers",
        icon: <Users className="h-4 w-4" />,
        badge: "Social"
      },
      {
        name: "Clans",
        href: "/wiki/clans",
        description: "Comprehensive clan system guide",
        icon: <Shield className="h-4 w-4" />,
        badge: "Popular"
      },
      {
        name: "Raids",
        href: "/wiki/raids",
        description: "Team up for epic raid battles",
        icon: <Swords className="h-4 w-4" />
      }
    ]
  },
  {
    title: "Items & Equipment",
    description: "Gear, items, and enhancement tools",
    icon: <Gift className="h-6 w-6" />,
    color: "from-purple-500 to-pink-500",
    items: [
      {
        name: "Held Items",
        href: "/wiki/helds",
        description: "Essential held items for your Pokemon",
        icon: <Gift className="h-4 w-4" />,
        badge: "Important"
      },
      {
        name: "Charms",
        href: "/wiki/charms",
        description: "Magical charms and their effects",
        icon: <Sparkles className="h-4 w-4" />
      },
      {
        name: "Relics",
        href: "/wiki/reliquias",
        description: "Ancient relics and artifacts",
        icon: <Crown className="h-4 w-4" />
      }
    ]
  },
  {
    title: "Locations & Exploration",
    description: "Discover new areas and special locations",
    icon: <MapPin className="h-6 w-6" />,
    color: "from-orange-500 to-red-500",
    items: [
      {
        name: "Outlands",
        href: "/wiki/outlands",
        description: "Explore the mysterious outlands region",
        icon: <MapPin className="h-4 w-4" />
      },
      {
        name: "Dimensional Zone",
        href: "/wiki/dimensional-zone",
        description: "Enter alternate dimensions",
        icon: <Star className="h-4 w-4" />,
        badge: "Advanced"
      },
      {
        name: "Bosses",
        href: "/wiki/bosses",
        description: "Challenge powerful boss Pokemon",
        icon: <Crown className="h-4 w-4" />
      }
    ]
  },
  {
    title: "Progression & Goals",
    description: "Advance your trainer journey",
    icon: <Trophy className="h-6 w-6" />,
    color: "from-yellow-500 to-amber-500",
    items: [
      {
        name: "Leveling Guide",
        href: "/wiki/guia-de-up",
        description: "Efficient leveling strategies",
        icon: <Trophy className="h-4 w-4" />,
        badge: "Guide"
      },
      {
        name: "Goals & Objectives",
        href: "/wiki/goal",
        description: "Set and achieve your trainer goals",
        icon: <Target className="h-4 w-4" />
      },
      {
        name: "Tasks & Quests",
        href: "/wiki/tasks",
        description: "Complete daily and weekly tasks",
        icon: <Calendar className="h-4 w-4" />
      },
      {
        name: "Quests",
        href: "/wiki/quests",
        description: "Story quests and side missions",
        icon: <Star className="h-4 w-4" />
      },
      {
        name: "Tier List",
        href: "/wiki/tier-list",
        description: "Pokemon rankings and meta analysis",
        icon: <Trophy className="h-4 w-4" />
      }
    ]
  },
  {
    title: "Special Features",
    description: "Unique game features and events",
    icon: <Star className="h-6 w-6" />,
    color: "from-indigo-500 to-purple-500",
    items: [
      {
        name: "Daily Login",
        href: "/wiki/daily-login",
        description: "Daily rewards and bonuses",
        icon: <Calendar className="h-4 w-4" />
      },
      {
        name: "Ditto",
        href: "/wiki/ditto",
        description: "Special Ditto mechanics and uses",
        icon: <Star className="h-4 w-4" />
      },
      {
        name: "Gentleman Brooks",
        href: "/wiki/gentleman-brooks",
        description: "Meet the mysterious Gentleman Brooks",
        icon: <Crown className="h-4 w-4" />
      },
      {
        name: "FAQ",
        href: "/wiki/faq",
        description: "Frequently asked questions",
        icon: <HelpCircle className="h-4 w-4" />,
        badge: "Help"
      }
    ]
  }
];

export default function WikiPage() {
  const [searchQuery, setSearchQuery] = useState("");

  // Filter wiki items based on search query
  const filteredCategories = useMemo(() => {
    if (!searchQuery.trim()) return wikiCategories;
    
    const query = searchQuery.toLowerCase();
    return wikiCategories.map(category => ({
      ...category,
      items: category.items.filter(item => 
        item.name.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        (item.badge && item.badge.toLowerCase().includes(query))
      )
    })).filter(category => category.items.length > 0);
  }, [searchQuery]);
  return (
    <div className="min-h-screen pb-24 from-background via-primary/5 to-purple-500/5">
      <div className="container mx-auto px-4">
        {/* Header with Search */}
        <div className="text-center mb-12">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold mb-4"
          >
            Pokemon Wiki
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8"
          >
            Your comprehensive guide to mastering the Pokemon world. Explore game mechanics, 
            social features, items, locations, and more.
          </motion.p>
          
          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-md mx-auto relative"
          >
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search wiki articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12 text-base"
              />
            </div>
            {searchQuery && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSearchQuery('')}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 px-2"
              >
                Clear
              </Button>
            )}
          </motion.div>
        </div>

        {/* Categories Grid */}
        <div className="space-y-12">
          {filteredCategories.length === 0 && searchQuery && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <p className="text-muted-foreground text-lg">No articles found for "{searchQuery}"</p>
              <Button 
                variant="outline" 
                onClick={() => setSearchQuery('')}
                className="mt-4"
              >
                Clear Search
              </Button>
            </motion.div>
          )}
          
          {filteredCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: categoryIndex * 0.1 + 0.2 }}
              className="space-y-6"
            >
              {/* Category Header */}
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-xl bg-gradient-to-r ${category.color} text-white`}>
                  {category.icon}
                </div>
                <div>
                  <h2 className="text-2xl font-bold">{category.title}</h2>
                  <p className="text-muted-foreground">{category.description}</p>
                </div>
              </div>

              {/* Category Items - More Square Layout */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-4">
                {category.items.map((item, itemIndex) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: categoryIndex * 0.1 + itemIndex * 0.05 + 0.3 }}
                    whileHover={{ scale: 1.02, y: -2 }}
                    className="group"
                  >
                    <Link href={item.href}>
                      <Card className="h-full cursor-pointer transition-all duration-200 hover:shadow-lg border-2 hover:border-primary/20 aspect-square">
                        <CardHeader className="pb-2 p-4">
                          <div className="flex flex-col items-center text-center space-y-2">
                            <div className="p-3 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-all">
                              {item.icon}
                            </div>
                            <div className="space-y-1">
                              <CardTitle className="text-base group-hover:text-primary transition-colors leading-tight">
                                {item.name}
                              </CardTitle>
                              {item.badge && (
                                <Badge variant="secondary" className="text-xs">
                                  {item.badge}
                                </Badge>
                              )}
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="p-4 pt-0">
                          <CardDescription className="text-xs text-center line-clamp-3">
                            {item.description}
                          </CardDescription>
                        </CardContent>
                      </Card>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-16 p-8 rounded-xl bg-card/50 backdrop-blur-sm border"
        >
          <h3 className="text-xl font-semibold mb-2">Need Help?</h3>
          <p className="text-muted-foreground mb-4">
            Can't find what you're looking for? Check our FAQ or explore the interactive map.
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/wiki/faq">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
              >
                View FAQ
              </motion.div>
            </Link>
            <Link href="/mapa">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 border border-primary text-primary rounded-lg hover:bg-primary/10 transition-colors"
              >
                Explorar Mapa
              </motion.div>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}