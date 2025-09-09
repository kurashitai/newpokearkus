"use client";

import { HeroStackScroller } from "@/components/hero-stack-scroller";
import { motion } from "framer-motion";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, MapPin, BookOpen, Download, Users, Trophy, Zap } from "lucide-react";

export const dynamic = 'force-dynamic';

const features = [
  {
    icon: <MapPin className="h-8 w-8" />,
    title: "Interactive Map",
    description: "Explore Pokemon locations with our premium interactive map interface featuring real-time data and advanced filtering.",
    href: "/mapa",
    color: "from-blue-500 to-cyan-500"
  },
  {
    icon: <BookOpen className="h-8 w-8" />,
    title: "Comprehensive Wiki",
    description: "Access detailed guides, mechanics explanations, and community-driven content to master every aspect of the game.",
    href: "/wiki",
    color: "from-green-500 to-emerald-500"
  },
  {
    icon: <Download className="h-8 w-8" />,
    title: "Download Game",
    description: "Get the latest version of PokeArkus with our secure download system. Available for Windows and Android.",
    href: "/download",
    color: "from-purple-500 to-pink-500"
  },
  {
    icon: <Users className="h-8 w-8" />,
    title: "Join Community",
    description: "Connect with fellow trainers, share strategies, and participate in community events and tournaments.",
    href: "/wiki/brotherhood",
    color: "from-orange-500 to-red-500"
  },
  {
    icon: <Trophy className="h-8 w-8" />,
    title: "Competitive Play",
    description: "Participate in ranked battles, tournaments, and clan wars. Climb the leaderboards and prove your skills.",
    href: "/wiki/clans",
    color: "from-yellow-500 to-amber-500"
  },
  {
    icon: <Zap className="h-8 w-8" />,
    title: "Advanced Features",
    description: "Discover unique mechanics like the boost system, awaken abilities, and mega evolution strategies.",
    href: "/wiki/boost",
    color: "from-indigo-500 to-purple-500"
  }
];

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <HeroStackScroller />
      
      {/* Features Section */}
      <section className="py-24 from-background via-primary/5 to-purple-500/5">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Experience the Ultimate
              <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                {" "}Pokemon Adventure
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Join thousands of trainers in the most immersive Pokemon experience ever created. 
              Explore vast regions, catch legendary Pokemon, and forge your legacy.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              // Função para lidar com movimento do mouse
              const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = ((e.clientX - rect.left) / rect.width) * 100;
                const y = ((e.clientY - rect.top) / rect.height) * 100;
                
                e.currentTarget.style.setProperty('--mouse-x', `${x}%`);
                e.currentTarget.style.setProperty('--mouse-y', `${y}%`);
              };

              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  onMouseMove={handleMouseMove}
                  whileHover={{ scale: 1.02, y: -5 }}
                  className="group feature-card"
                >
                  <Link href={feature.href}>
                    <Card className="h-full cursor-pointer transition-all duration-300 hover:shadow-xl border-2 hover:border-primary/20 glow-effect relative z-10">
                      <CardHeader className="pb-4 relative z-20">
                        <div className="flex items-center justify-between mb-4">
                          <div className={`p-3 rounded-xl bg-gradient-to-r ${feature.color} text-white group-hover:scale-110 transition-transform`}>
                            {feature.icon}
                          </div>
                          <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                        </div>
                        <CardTitle className="text-xl group-hover:text-primary transition-colors">
                          {feature.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="relative z-20">
                        <CardDescription className="text-muted-foreground group-hover:text-foreground transition-colors">
                          {feature.description}
                        </CardDescription>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section className="py-24 bg-card/50">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center max-w-4xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Built by Fans, for Fans
            </h2>
            <p className="text-xl text-muted-foreground mb-12">
              PokeArkus is a community-driven project created with passion by the Arkus Team. 
              Experience authentic Pokemon gameplay with modern features and an active community.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">10K+</div>
                <div className="text-muted-foreground">Active Trainers</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">500+</div>
                <div className="text-muted-foreground">Pokemon Species</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">24/7</div>
                <div className="text-muted-foreground">Community Support</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/download">
                <Button size="lg" className="text-lg px-8 py-4 h-auto font-semibold">
                  <Download className="h-5 w-5 mr-2" />
                  Download Now
                </Button>
              </Link>
              <Link href="/wiki">
                <Button variant="outline" size="lg" className="text-lg px-8 py-4 h-auto font-semibold">
                  <BookOpen className="h-5 w-5 mr-2" />
                  Explore Wiki
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}