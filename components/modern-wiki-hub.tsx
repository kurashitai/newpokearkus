'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, BookOpen, Users, Sword, Shield, Zap, Trophy, Star, ArrowRight, Clock, TrendingUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { GlassCard, GlassButton, GlassInput } from '@/components/glass-morphism-ui'
import { motionVariants } from '@/components/providers/motion-provider'
import Link from 'next/link'
import Image from 'next/image'

// Wiki categories data
const wikiCategories = [
  {
    id: 'pokemon',
    title: 'Pokédex',
    description: 'Complete database with stats, locations, and evolution data',
    icon: BookOpen,
    gradient: 'from-blue-500 to-cyan-500',
    articles: 1247,
    href: '/wiki/pokemon',
    featured: true,
  },
  {
    id: 'guides',
    title: 'Strategy Guides',
    description: 'Expert guides for beginners and advanced players',
    icon: Trophy,
    gradient: 'from-green-500 to-emerald-500',
    articles: 89,
    href: '/wiki/guides',
  },
  {
    id: 'clans',
    title: 'Clans',
    description: 'Information about all clans and their specialties',
    icon: Users,
    gradient: 'from-purple-500 to-pink-500',
    articles: 12,
    href: '/wiki/clans',
  },
  {
    id: 'items',
    title: 'Items & Equipment',
    description: 'Complete catalog of items and equipment',
    icon: Shield,
    gradient: 'from-orange-500 to-red-500',
    articles: 342,
    href: '/wiki/helds',
  },
  {
    id: 'bosses',
    title: 'Bosses & Raids',
    description: 'Boss strategies and raid information',
    icon: Sword,
    gradient: 'from-red-500 to-pink-500',
    articles: 24,
    href: '/wiki/bosses',
  },
  {
    id: 'mechanics',
    title: 'Game Mechanics',
    description: 'Understanding core game systems',
    icon: Zap,
    gradient: 'from-yellow-500 to-orange-500',
    articles: 67,
    href: '/wiki/sistema-de-captura',
  },
]

// Recent articles data
const recentArticles = [
  {
    id: 1,
    title: 'Advanced Capture System Guide',
    excerpt: 'Master the art of Pokemon capturing with these advanced techniques...',
    category: 'Guides',
    readTime: '8 min read',
    updatedAt: '2 hours ago',
    views: 1247,
    href: '/wiki/sistema-de-captura',
  },
  {
    id: 2,
    title: 'Clan Strategies: Gardestrike',
    excerpt: 'Comprehensive guide to mastering the Gardestrike clan...',
    category: 'Clans',
    readTime: '12 min read',
    updatedAt: '5 hours ago',
    views: 892,
    href: '/wiki/clans',
  },
  {
    id: 3,
    title: 'Raid Boss: Elite Four Challenge',
    excerpt: 'Tips and strategies for defeating the Elite Four...',
    category: 'Bosses',
    readTime: '15 min read',
    updatedAt: '1 day ago',
    views: 2103,
    href: '/wiki/bosses',
  },
]

// Popular searches
const popularSearches = [
  'Tier List', 'Shiny Pokemon', 'Legendary Locations', 'Clan Guide', 
  'Held Items', 'Evolution Methods', 'Raid Strategies', 'Map Locations'
]

export function ModernWikiHub() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  return (
    <div className="min-h-screen py-24">
      <div className="container-premium">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="inline-flex items-center px-4 py-2 bg-primary/10 rounded-full text-primary font-medium text-sm mb-6"
          >
            <BookOpen className="w-4 h-4 mr-2" />
            Knowledge Base
          </motion.div>
          
          <h1 className="text-4xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/60 bg-clip-text text-transparent">
            Wiki
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-8">
            Your comprehensive guide to mastering the Pokemon world. Find strategies, guides, and detailed information about every aspect of the game.
          </p>

          {/* Quick Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="max-w-2xl mx-auto mb-8"
          >
            <div className="relative">
              <GlassInput
                placeholder="Quick search wiki content..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="text-lg py-4 pl-12 pr-16"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <GlassButton
                variant="primary"
                className="absolute right-2 top-1/2 -translate-y-1/2"
              >
                Search
              </GlassButton>
            </div>
            
            {/* Popular Searches */}
            <div className="flex flex-wrap gap-2 mt-4 justify-center">
              <span className="text-sm text-muted-foreground mr-2">Popular:</span>
              {popularSearches.slice(0, 4).map((search, index) => (
                <button
                  key={search}
                  onClick={() => setSearchQuery(search)}
                  className="text-sm text-primary hover:text-primary/80 transition-colors"
                >
                  {search}
                </button>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Featured Categories Grid */}
        <motion.div
          variants={motionVariants.staggerContainer}
          initial="initial"
          whileInView="animate"
          className="mb-16"
        >
          <h2 className="text-3xl font-bold mb-8 text-center">Browse Categories</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6 max-w-7xl mx-auto">
            {wikiCategories.map((category, index) => {
              const Icon = category.icon
              
              return (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.3 }}
                  className="group"
                >
                  <Link href={category.href}>
                    <GlassCard className="h-full p-4 lg:p-6 hover:scale-105 transition-all duration-300 relative overflow-hidden max-w-sm mx-auto">
                      {category.featured && (
                        <div className="absolute top-3 right-3">
                          <Badge variant="outline" className="bg-primary/20 text-primary border-primary/30 text-xs">
                            <Star className="w-3 h-3 mr-1" />
                            Featured
                          </Badge>
                        </div>
                      )}
                      
                      {/* Icon */}
                      <div className={`inline-flex items-center justify-center w-12 h-12 lg:w-16 lg:h-16 rounded-2xl bg-gradient-to-br ${category.gradient} mb-4 lg:mb-6 group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className="w-6 h-6 lg:w-8 lg:h-8 text-white" />
                      </div>

                      {/* Content */}
                      <h3 className="text-lg lg:text-2xl font-bold mb-2 lg:mb-3 text-foreground group-hover:text-primary transition-colors line-clamp-2">
                        {category.title}
                      </h3>
                      
                      <p className="text-muted-foreground mb-4 lg:mb-6 leading-relaxed text-sm lg:text-base line-clamp-3">
                        {category.description}
                      </p>

                      {/* Stats */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-sm text-muted-foreground">
                          <BookOpen className="w-4 h-4 mr-1" />
                          {category.articles} articles
                        </div>
                        <ArrowRight className="w-4 h-4 lg:w-5 lg:h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                      </div>
                    </GlassCard>
                  </Link>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* Recent Articles & Popular Content */}
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Recent Articles */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold flex items-center">
                <Clock className="w-6 h-6 mr-2 text-primary" />
                Recent Updates
              </h2>
              <Link href="/wiki/recent">
                <Button variant="ghost" size="sm">
                  View All
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>

            <div className="space-y-4">
              {recentArticles.map((article, index) => (
                <motion.div
                  key={article.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link href={article.href}>
                    <GlassCard className="p-6 hover:scale-102 transition-all duration-300">
                      <div className="flex items-start justify-between mb-3">
                        <Badge variant="outline" className="text-xs">
                          {article.category}
                        </Badge>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <TrendingUp className="w-3 h-3 mr-1" />
                          {article.views} views
                        </div>
                      </div>
                      
                      <h3 className="font-bold mb-2 text-lg hover:text-primary transition-colors">
                        {article.title}
                      </h3>
                      
                      <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                        {article.excerpt}
                      </p>
                      
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>{article.readTime}</span>
                        <span>Updated {article.updatedAt}</span>
                      </div>
                    </GlassCard>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Quick Links & Stats */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            {/* Quick Access */}
            <div>
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <Zap className="w-6 h-6 mr-2 text-primary" />
                Quick Access
              </h2>
              
              <div className="grid grid-cols-2 gap-4">
                {[
                  { name: 'Tier List', href: '/wiki/tier-list', icon: Trophy },
                  { name: 'Shiny Guide', href: '/wiki/shinys-e-evolucoes', icon: Star },
                  { name: 'FAQ', href: '/wiki/faq', icon: BookOpen },
                  { name: 'Tasks', href: '/wiki/tasks', icon: Zap },
                ].map((item) => {
                  const Icon = item.icon
                  return (
                    <Link key={item.name} href={item.href}>
                      <GlassButton
                        variant="secondary"
                        className="w-full h-16 flex-col space-y-1"
                      >
                        <Icon className="w-5 h-5" />
                        <span className="text-sm">{item.name}</span>
                      </GlassButton>
                    </Link>
                  )
                })}
              </div>
            </div>

            {/* Community Contribution */}
            <GlassCard className="p-6">
              <h3 className="font-bold mb-3 flex items-center">
                <Users className="w-5 h-5 mr-2 text-primary" />
                Community Driven
              </h3>
              <p className="text-muted-foreground text-sm mb-4">
                Our wiki is maintained by the community. Contribute your knowledge to help fellow trainers.
              </p>
              <GlassButton variant="primary" size="sm" className="w-full">
                Contribute to Wiki
              </GlassButton>
            </GlassCard>

            {/* Wiki Stats */}
            <GlassCard className="p-6">
              <h3 className="font-bold mb-4">Wiki Statistics</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Articles</span>
                  <span className="font-medium">1,781</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Contributors</span>
                  <span className="font-medium">127</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Last Updated</span>
                  <span className="font-medium">2 hours ago</span>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default ModernWikiHub;