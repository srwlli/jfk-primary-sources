import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display, Source_Sans_3 } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeContextProvider } from "@/contexts/theme-context";
import { Header } from "@/components/header";
import { Navigation } from "@/components/navigation";
import { ScrollToTop } from "@/components/scroll-to-top";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const sourceSans = Source_Sans_3({
  variable: "--font-source-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "JFK Primary Sources",
  description: "JFK Primary Sources Application - Historical documents and research",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "JFK Sources",
  },
  formatDetection: {
    telephone: false,
  },
  other: {
    "mobile-web-app-capable": "yes",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f0f2f5" },
    { media: "(prefers-color-scheme: dark)", color: "#1a1a2e" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Material Symbols */}
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />

        {/* iOS Splash Screens */}
        <link
          rel="apple-touch-startup-image"
          href="/icons/icon-512.png"
        />

        {/* Additional iOS meta tags for older Safari versions */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="JFK Sources" />
      </head>
      <body className={`${inter.variable} ${playfair.variable} ${sourceSans.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ThemeContextProvider>
            <ScrollToTop />
            <Header />
            <div className="relative flex min-h-screen w-full flex-col">
              <div className="flex-grow pt-[52px] pb-20">
                <main>{children}</main>
              </div>
            </div>
            <Navigation />
          </ThemeContextProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
