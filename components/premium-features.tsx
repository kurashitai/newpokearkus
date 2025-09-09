'use client'

import { motion } from 'framer-motion'
import { Map, BookOpen, Users, Search, Zap, Shield, Star, Globe } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { motionVariants } from '@/components/providers/motion-provider'
import Link from 'next/link'

const features = [
  {
    icon: Map,
    title: 'Interactive Pokemon Map',
    description: 'Explore detailed maps with real-time Pokemon locations, spawn rates, and interactive markers.',
    features: ['Real-time tracking', 'Spawn predictions', 'Location filtering'],
    gradient: 'from-blue-500 to-cyan-500',
    href: '/mapa',
  },
  {
    icon: BookOpen,
    title: 'Comprehensive Wiki',
    description: 'Access detailed guides, strategies, and information about every aspect of the Pokemon world.',
    features: ['Strategy guides', 'Pokemon database', 'Battle tactics'],
    gradient: 'from-green-500 to-emerald-500',
    href: '/wiki',
  },
  {
    icon: Users,
    title: 'Community Hub',
    description: 'Connect with fellow trainers, share discoveries, and participate in community events.',
    features: ['Active community', 'Event participation', 'Knowledge sharing'],
    gradient: 'from-purple-500 to-pink-500',
    href: '/community',
  },
  {
    icon: Search,
    title: 'Advanced Search',
    description: 'Find exactly what you need with powerful search and filtering capabilities.',
    features: ['Smart filters', 'Quick search', 'Saved searches'],
    gradient: 'from-orange-500 to-red-500',
    href: '/search',
  },
  {
    icon: Zap,
    title: 'Performance Optimized',
    description: 'Lightning-fast experience with optimized loading and smooth interactions.',
    features: ['Fast loading', 'Smooth animations', 'Offline support'],
    gradient: 'from-yellow-500 to-orange-500',
    href: '/performance',
  },
  {
    icon: Shield,
    title: 'Secure & Reliable',
    description: 'Your data is protected with enterprise-grade security and reliable infrastructure.',
    features: ['Data protection', 'Reliable uptime', 'Secure access'],
    gradient: 'from-teal-500 to-blue-500',
    href: '/security',
  },
]

export function PremiumFeatures() {
  return (
    <section className="relative py-24 bg-gradient-to-b from-background to-muted/30">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-purple-500/5" />
      </div>

      <div className="container-premium relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="inline-flex items-center px-4 py-2 bg-primary/10 rounded-full text-primary font-medium text-sm mb-6"
          >
            <Star className="w-4 h-4 mr-2" />
            Premium Features
          </motion.div>
          
          <h2 className="text-4xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/60 bg-clip-text text-transparent">
            Everything you need for the ultimate Pokemon experience
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Discover powerful features designed to enhance your Pokemon journey with cutting-edge technology and community-driven insights.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={motionVariants.staggerContainer}
          initial="initial"
          whileInView="animate"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon
            
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.3 }}
                className="group"
              >
                <div className="glass-card h-full p-8 hover:scale-105 transition-transform duration-300">
                  {/* Icon */}
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>

                  {/* Content */}
                  <h3 className="text-2xl font-bold mb-4 text-foreground">
                    {feature.title}
                  </h3>
                  
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {feature.description}
                  </p>

                  {/* Feature List */}
                  <ul className="space-y-2 mb-6">
                    {feature.features.map((item, idx) => (
                      <li key={idx} className="flex items-center text-sm text-muted-foreground">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full mr-3" />
                        {item}
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <Link href={feature.href}>
                    <Button
                      variant="ghost"
                      className="w-full group-hover:bg-primary/10 group-hover:text-primary transition-colors"
                    >
                      Explore Feature
                    </Button>
                  </Link>
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-16"
        >
          <div className="inline-flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="btn-premium">
              Get Started Today
            </Button>
            <Button size="lg" variant="outline">
              View All Features
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default PremiumFeatures;