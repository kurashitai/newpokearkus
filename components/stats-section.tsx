'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Users, MapPin, BookOpen, Star } from 'lucide-react'
import { motionVariants } from '@/components/providers/motion-provider'

const stats = [
  {
    icon: Users,
    value: 25000,
    label: 'Active Trainers',
    description: 'Join our growing community',
    suffix: '+',
  },
  {
    icon: MapPin,
    value: 1500,
    label: 'Pokemon Locations',
    description: 'Mapped and verified',
    suffix: '+',
  },
  {
    icon: BookOpen,
    value: 850,
    label: 'Wiki Articles',
    description: 'Comprehensive guides',
    suffix: '+',
  },
  {
    icon: Star,
    value: 98,
    label: 'Satisfaction Rate',
    description: 'From our community',
    suffix: '%',
  },
]

function AnimatedCounter({ 
  value, 
  suffix = '', 
  duration = 2000 
}: { 
  value: number
  suffix?: string
  duration?: number 
}) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (!isInView) return

    let startTime: number
    const startValue = 0
    const endValue = value

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / duration, 1)
      
      // Easing function for smooth animation
      const easeOutCubic = 1 - Math.pow(1 - progress, 3)
      const currentValue = Math.floor(startValue + (endValue - startValue) * easeOutCubic)
      
      setCount(currentValue)

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    requestAnimationFrame(animate)
  }, [isInView, value, duration])

  return (
    <span ref={ref} className="text-4xl lg:text-5xl font-bold">
      {count.toLocaleString()}{suffix}
    </span>
  )
}

export function StatsSection() {
  return (
    <section className="relative py-24 from-primary/5 via-purple-500/5 to-blue-500/5">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating Orbs */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-32 h-32 rounded-full bg-gradient-to-r from-primary/10 to-purple-500/10 blur-xl"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, 100, 0],
              y: [0, -100, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 10 + Math.random() * 10,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        ))}
      </div>

      <div className="container-premium relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Trusted by trainers worldwide
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Join thousands of Pokemon enthusiasts who rely on our platform for their gaming adventures.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          variants={motionVariants.staggerContainer}
          initial="initial"
          whileInView="animate"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon
            
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.3 }}
                className="text-center group"
              >
                <div className="glass-card p-8 hover:scale-105 transition-all duration-300">
                  {/* Icon */}
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    transition={{ 
                      delay: index * 0.1,
                      duration: 0.6,
                      type: 'spring',
                      stiffness: 200 
                    }}
                    className="inline-flex items-center justify-center w-16 h-16 from-primary to-purple-600 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300"
                  >
                    <Icon className="w-8 h-8 text-white" />
                  </motion.div>

                  {/* Animated Counter */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 + 0.2 }}
                    className="mb-2 text-primary"
                  >
                    <AnimatedCounter 
                      value={stat.value} 
                      suffix={stat.suffix}
                      duration={2000 + index * 200}
                    />
                  </motion.div>

                  {/* Label */}
                  <motion.h3
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 + 0.3 }}
                    className="text-lg font-semibold mb-2 text-foreground"
                  >
                    {stat.label}
                  </motion.h3>

                  {/* Description */}
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 + 0.4 }}
                    className="text-muted-foreground text-sm"
                  >
                    {stat.description}
                  </motion.p>
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Bottom Message */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-16"
        >
          <div className="glass-card inline-block px-8 py-6">
            <p className="text-lg font-medium text-foreground mb-2">
              Ready to become part of our community?
            </p>
            <p className="text-muted-foreground">
              Join thousands of trainers exploring the Pokemon world together.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default StatsSection;