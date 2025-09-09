'use client'

import { motion } from 'framer-motion'
import { MessageCircle, Users, Trophy, Heart, Gamepad2, Share2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { motionVariants } from '@/components/providers/motion-provider'
import Image from 'next/image'

const communityFeatures = [
  {
    icon: MessageCircle,
    title: 'Active Discussions',
    description: 'Join conversations about strategies, discoveries, and Pokemon encounters.',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Trophy,
    title: 'Community Events',
    description: 'Participate in regular events, tournaments, and challenges.',
    color: 'from-yellow-500 to-orange-500',
  },
  {
    icon: Share2,
    title: 'Share Discoveries',
    description: 'Share your findings, rare catches, and helpful tips with the community.',
    color: 'from-green-500 to-emerald-500',
  },
]

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'Pokemon Master',
    avatar: '/avatars/sarah.jpg',
    content: 'This platform has completely transformed how I play Pokemon. The community is amazing and the guides are incredibly detailed.',
    rating: 5,
  },
  {
    name: 'Alex Rodriguez',
    role: 'Competitive Player',
    avatar: '/avatars/alex.jpg',
    content: 'The interactive map feature is a game-changer. Finding rare Pokemon has never been easier!',
    rating: 5,
  },
  {
    name: 'Emma Thompson',
    role: 'Casual Trainer',
    avatar: '/avatars/emma.jpg',
    content: 'Love how welcoming the community is. Always helpful and ready to share knowledge.',
    rating: 5,
  },
]

const recentActivity = [
  {
    user: 'DragonMaster99',
    action: 'discovered a rare Shiny Charizard',
    time: '2 hours ago',
    location: 'Mount Silver',
  },
  {
    user: 'PokeExplorer',
    action: 'shared a new strategy guide',
    time: '4 hours ago',
    location: 'Battle Tower',
  },
  {
    user: 'TeamRocket',
    action: 'completed the Elite Four challenge',
    time: '6 hours ago',
    location: 'Indigo Plateau',
  },
]

export function CommunitySection() {
  return (
    <section className="relative py-24 bg-gradient-to-b from-muted/30 to-background">
      <div className="container-premium">
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
            <Users className="w-4 h-4 mr-2" />
            Community Driven
          </motion.div>
          
          <h2 className="text-4xl lg:text-6xl font-bold mb-6">
            Join our thriving Pokemon community
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Connect with fellow trainers, share your adventures, and be part of a community that celebrates the Pokemon journey together.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left Column - Features */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ staggerChildren: 0.1, delayChildren: 0.1 }}
            whileInView="animate"
            className="space-y-8"
          >
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-2xl font-bold mb-8"
            >
              What makes our community special
            </motion.h3>

            {communityFeatures.map((feature, index) => {
              const Icon = feature.icon
              
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.3 }}
                  className="flex items-start space-x-4 group"
                >
                  <div className={`flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold mb-2">{feature.title}</h4>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </div>
                </motion.div>
              )
            })}

            {/* Recent Activity */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="glass-card p-6 mt-8"
            >
              <h4 className="text-lg font-semibold mb-4 flex items-center">
                <Gamepad2 className="w-5 h-5 mr-2 text-primary" />
                Recent Community Activity
              </h4>
              
              <div className="space-y-3">
                {recentActivity.map((activity, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-between py-2 border-b border-border/50 last:border-0"
                  >
                    <div className="flex-1">
                      <p className="text-sm">
                        <span className="font-medium text-primary">{activity.user}</span>
                        {' '}{activity.action}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {activity.location} • {activity.time}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column - Testimonials */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ staggerChildren: 0.1, delayChildren: 0.1 }}
            whileInView="animate"
            className="space-y-6"
          >
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-2xl font-bold mb-8"
            >
              What our trainers say
            </motion.h3>

            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.3 }}
                className="glass-card p-6 hover:scale-105 transition-transform duration-300"
              >
                {/* Rating Stars */}
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 + i * 0.05 }}
                    >
                      <Heart className="w-4 h-4 text-red-500 fill-current mr-1" />
                    </motion.div>
                  ))}
                </div>

                {/* Content */}
                <p className="text-muted-foreground mb-4 italic leading-relaxed">
                  "{testimonial.content}"
                </p>

                {/* Author */}
                <div className="flex items-center">
                  <Avatar className="w-10 h-10 mr-3">
                    <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                    <AvatarFallback>
                      {testimonial.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div>
                    <p className="font-medium text-foreground">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-center pt-6"
            >
              <Button size="lg" className="btn-premium">
                Join Our Community
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default CommunitySection;