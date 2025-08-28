import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Navigation } from "@/components/navigation";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({ 
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Poke Arkus Wiki - Modern Pokemon Guide",
    template: "%s | Poke Arkus Wiki",
  },
  description: "The ultimate modern guide for Poke Arkus with interactive maps, comprehensive wiki, and beautiful UI/UX design.",
  keywords: ["pokemon", "poke arkus", "wiki", "guide", "map", "interactive"],
  authors: [{ name: "Poke Arkus Team" }],
  creator: "Poke Arkus Team",
  metadataBase: new URL("https://poke-arkus-wiki.com"),
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://poke-arkus-wiki.com",
    title: "Poke Arkus Wiki - Modern Pokemon Guide",
    description: "The ultimate modern guide for Poke Arkus with interactive maps, comprehensive wiki, and beautiful UI/UX design.",
    siteName: "Poke Arkus Wiki",
  },
  twitter: {
    card: "summary_large_image",
    title: "Poke Arkus Wiki - Modern Pokemon Guide",
    description: "The ultimate modern guide for Poke Arkus with interactive maps, comprehensive wiki, and beautiful UI/UX design.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-body antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="relative min-h-screen bg-background">
            {/* Background Pattern */}
            <div className="fixed inset-0 bg-grid-pattern opacity-[0.02] pointer-events-none" />
            
            {/* App Structure */}
            <div className="relative z-10 flex min-h-screen flex-col">
              <Navigation />
              
              <main className="flex-1 relative">
                {children}
              </main>
              
              {/* Footer could go here in the future */}
            </div>
          </div>
          
          {/* Toast Notifications */}
          <Toaster 
            position="top-right"
            expand
            richColors
            closeButton
          />
        </ThemeProvider>
      </body>
    </html>
  );
}