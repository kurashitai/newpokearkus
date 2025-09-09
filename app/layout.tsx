import "./globals.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Navigation } from "@/components/navigation";
import { QueryProvider } from "@/components/providers/query-provider";
import { MotionProvider } from "@/components/providers/motion-provider";
import { PWAProvider, PWAUpdateBanner, PWAOfflineIndicator } from "@/components/providers/pwa-provider";
import { Toaster } from "@/components/ui/sonner";
import { StoreInitializer } from "@/components/store-initializer";

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter',
  display: 'swap',
  preload: true,
  fallback: ['-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://pokearkus.com'),
  title: {
    default: "Poke Arkus - Premium Pokemon Wiki & Interactive Map",
    template: "%s | Poke Arkus"
  },
  description:
    "Explore the world of PokeArkus with our premium interactive map, comprehensive guides, and modern wiki system. The ultimate Pokemon gaming experience.",
  keywords: [
    "Pokemon", "Pokedex", "Interactive Map", "Game Guide", "Wiki", 
    "Pokemon Locations", "Strategy Guide", "Gaming Community"
  ],
  authors: [{ name: "Arkus Team" }],
  creator: "Arkus Team",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://pokearkus.com",
    siteName: "Poke Arkus",
    title: "Poke Arkus - Premium Pokemon Wiki & Interactive Map",
    description: "The ultimate Pokemon gaming experience with interactive maps and comprehensive guides.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Poke Arkus - Premium Pokemon Experience",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Poke Arkus - Premium Pokemon Wiki & Interactive Map",
    description: "The ultimate Pokemon gaming experience with interactive maps and comprehensive guides.",
    images: ["/twitter-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: [
    { rel: 'icon', url: '/favicon.ico' },
    { rel: 'apple-touch-icon', url: '/apple-touch-icon.png' },
    { rel: 'icon', type: 'image/png', sizes: '32x32', url: '/favicon-32x32.png' },
    { rel: 'icon', type: 'image/png', sizes: '16x16', url: '/favicon-16x16.png' },
  ],
  manifest: '/manifest.json',
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0f172a' },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      </head>
      <body className={`${inter.className} font-sans antialiased`}>
        <PWAProvider>
          <QueryProvider>
            <ThemeProvider 
              attribute="class" 
              defaultTheme="system" 
              enableSystem
              disableTransitionOnChange={false}
            >
              <MotionProvider>
                <StoreInitializer />
                <PWAUpdateBanner />
                <div className="relative min-h-screen flex flex-col">
                  <Navigation />
                  <main className="flex-1 relative pt-36 md:pt-20">
                    {children}
                  </main>
                </div>
                <PWAOfflineIndicator />
                <Toaster 
                  position="bottom-right"
                  toastOptions={{
                    style: {
                      background: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      color: 'hsl(var(--card-foreground))',
                    },
                  }}
                />
              </MotionProvider>
            </ThemeProvider>
          </QueryProvider>
        </PWAProvider>
      </body>
    </html>
  );
}
