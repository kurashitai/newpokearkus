"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Download, Monitor, Smartphone, CheckCircle, Star, Shield, Zap, Users } from "lucide-react";

export const dynamic = 'force-dynamic';

interface PlatformFeature {
  title: string;
  description: string;
  icon: React.ReactNode;
}

interface DownloadOption {
  platform: string;
  icon: React.ReactNode;
  version: string;
  size: string;
  requirements: string[];
  features: PlatformFeature[];
  downloads: {
    primary: {
      label: string;
      url: string;
      recommended?: boolean;
    };
    secondary?: {
      label: string;
      url: string;
    };
  };
  color: string;
}

const downloadOptions: DownloadOption[] = [
  {
    platform: "Windows",
    icon: <Monitor className="h-8 w-8" />,
    version: "v2.1.0",
    size: "245 MB",
    requirements: [
      "Windows 7 or higher",
      "DirectX 9.0 or OpenGL 1.2+",
      "4GB+ RAM",
      "1GB+ Storage",
      "Stable internet connection"
    ],
    features: [
      {
        title: "Full Game Experience",
        description: "Complete Pokemon adventure with all features",
        icon: <Star className="h-5 w-5" />
      },
      {
        title: "Auto-Updates",
        description: "Automatic game updates and patches",
        icon: <Zap className="h-5 w-5" />
      },
      {
        title: "Community Features",
        description: "Full multiplayer and social features",
        icon: <Users className="h-5 w-5" />
      }
    ],
    downloads: {
      primary: {
        label: "Download with Launcher",
        url: "/downloads/poke-arkus-launcher.exe",
        recommended: true
      },
      secondary: {
        label: "Download Standalone",
        url: "/downloads/poke-arkus.zip"
      }
    },
    color: "from-blue-500 to-cyan-500"
  },
  {
    platform: "Android",
    icon: <Smartphone className="h-8 w-8" />,
    version: "v2.1.0",
    size: "198 MB",
    requirements: [
      "Android 7.0 or higher",
      "OpenGL ES 2.0+",
      "4GB+ RAM",
      "500MB+ Storage",
      "Stable internet connection"
    ],
    features: [
      {
        title: "Mobile Optimized",
        description: "Designed specifically for mobile devices",
        icon: <Smartphone className="h-5 w-5" />
      },
      {
        title: "Touch Controls",
        description: "Intuitive touch-based gameplay",
        icon: <Zap className="h-5 w-5" />
      },
      {
        title: "Cross-Platform",
        description: "Play with PC and other mobile users",
        icon: <Users className="h-5 w-5" />
      }
    ],
    downloads: {
      primary: {
        label: "Download x64",
        url: "/downloads/poke-arkus-x64.apk",
        recommended: true
      },
      secondary: {
        label: "Download x32",
        url: "/downloads/poke-arkus-x32.apk"
      }
    },
    color: "from-green-500 to-emerald-500"
  }
];

const gameFeatures = [
  {
    icon: <Shield className="h-6 w-6" />,
    title: "Secure & Safe",
    description: "Virus-free downloads with digital signatures"
  },
  {
    icon: <Zap className="h-6 w-6" />,
    title: "Optimized Performance",
    description: "Smooth gameplay on all supported devices"
  },
  {
    icon: <Users className="h-6 w-6" />,
    title: "Active Community",
    description: "Join 10,000+ active players worldwide"
  },
  {
    icon: <Star className="h-6 w-6" />,
    title: "Regular Updates",
    description: "New content and features added monthly"
  }
];

export default function DownloadPage() {
  return (
    <div className="min-h-screen pb-24 from-background via-primary/5 to-purple-500/5">
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Download
            <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              {" "}PokeArkus
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Start your Pokemon journey today. Download PokeArkus and experience the ultimate 
            Pokemon adventure with interactive maps, comprehensive guides, and community features.
          </p>
        </motion.div>

        {/* Download Options */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mb-16">
          {downloadOptions.map((option, index) => (
            <motion.div
              key={option.platform}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              whileHover={{ scale: 1.02, y: -5 }}
              className="group w-full"
            >
              <Card className="h-full border-2 hover:border-primary/20 transition-all duration-300 hover:shadow-xl">
                <CardHeader className="text-center pb-6">
                  <div className="flex items-center justify-center mb-4">
                    <div className={`p-3 sm:p-4 rounded-full bg-gradient-to-r ${option.color} text-white mb-4 group-hover:scale-110 transition-transform`}>
                      {option.icon}
                    </div>
                  </div>
                  <CardTitle className="text-xl sm:text-2xl mb-2">{option.platform}</CardTitle>
                  <div className="flex items-center justify-center gap-2 sm:gap-4 text-sm text-muted-foreground flex-wrap">
                    <Badge variant="secondary">{option.version}</Badge>
                    <span>{option.size}</span>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-6">
                  {/* Requirements */}
                  <div>
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      System Requirements
                    </h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      {option.requirements.map((req, reqIndex) => (
                        <li key={reqIndex} className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Separator />

                  {/* Features */}
                  <div>
                    <h4 className="font-semibold mb-3">Platform Features</h4>
                    <div className="space-y-3">
                      {option.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-start gap-3">
                          <div className="p-1.5 rounded bg-primary/10 text-primary">
                            {feature.icon}
                          </div>
                          <div>
                            <div className="font-medium text-sm">{feature.title}</div>
                            <div className="text-xs text-muted-foreground">{feature.description}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Separator />

                  {/* Download Buttons */}
                  <div className="space-y-3">
                    <a
                      href={option.downloads.primary.url}
                      download
                      className="block"
                    >
                      <Button size="lg" className="w-full text-base sm:text-lg font-semibold group/btn px-4 py-3">
                        <Download className="h-4 w-4 sm:h-5 sm:w-5 mr-2 group-hover/btn:animate-bounce" />
                        <span className="truncate">{option.downloads.primary.label}</span>
                        {option.downloads.primary.recommended && (
                          <Badge className="ml-2 bg-green-500 hover:bg-green-600 text-xs hidden sm:inline-flex">Recommended</Badge>
                        )}
                      </Button>
                    </a>
                    
                    {option.downloads.secondary && (
                      <a
                        href={option.downloads.secondary.url}
                        download
                        className="block"
                      >
                        <Button variant="outline" size="lg" className="w-full text-base sm:text-lg font-semibold px-4 py-3">
                          <Download className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                          <span className="truncate">{option.downloads.secondary.label}</span>
                        </Button>
                      </a>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Game Features */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose PokeArkus?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Experience the most comprehensive Pokemon adventure with cutting-edge features 
              and an active community.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {gameFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center p-4 sm:p-6 rounded-xl bg-card/50 backdrop-blur-sm border"
              >
                <div className="p-2 sm:p-3 rounded-full bg-primary/10 text-primary w-fit mx-auto mb-3 sm:mb-4">
                  {feature.icon}
                </div>
                <h3 className="font-semibold mb-2 text-sm sm:text-base">{feature.title}</h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Installation Guide */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center bg-card/30 backdrop-blur-sm rounded-2xl p-8 border"
        >
          <h2 className="text-3xl font-bold mb-6">Need Help Installing?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Check our comprehensive installation guide or join our community for support.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Button variant="outline" size="lg" className="text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4">
              Installation Guide
            </Button>
            <Button variant="outline" size="lg" className="text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4">
              Community Support
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
