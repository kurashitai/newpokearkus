"use client";

import React from "react";
import { motion } from "framer-motion";
import { StackScrollHero } from "@/components/hero/stack-scroll-hero";
import { CategoryGrid } from "@/components/wiki/category-grid";
import { FeaturedSection } from "@/components/home/featured-section";
import { QuickActions } from "@/components/home/quick-actions";
import { StatsSection } from "@/components/home/stats-section";

export default function HomePage() {
  return (
    <div className="relative w-full">
      {/* Stack Scroll Hero Section */}
      <StackScrollHero />
      
      {/* Content Sections */}
      <div className="relative z-20">
        {/* Quick Actions */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent">
                Explore Poke Arkus
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Discover everything you need to know about the Poke Arkus universe with our comprehensive guides, interactive maps, and modern tools.
              </p>
            </motion.div>
            
            <QuickActions />
          </div>
        </section>

        {/* Category Grid */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Wiki Categories
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Browse through our organized categories to find exactly what you're looking for.
              </p>
            </motion.div>
            
            <CategoryGrid />
          </div>
        </section>

        {/* Featured Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-6">
            <FeaturedSection />
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-950 dark:to-primary-900">
          <div className="container mx-auto px-6">
            <StatsSection />
          </div>
        </section>
      </div>
    </div>
  );
}