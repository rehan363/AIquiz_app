import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import BackToTop from "@/components/ui/BackToTop";
import ErrorBoundary from "@/components/ErrorBoundary";
import PWAInstaller from "@/components/PWAInstaller";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#4F46E5",
};

export const metadata: Metadata = {
  title: "Quizzly.ai - AI-Powered Quiz Platform",
  description: "Transform any topic into interactive quizzes with AI. Learn smarter, not harder with personalized quiz generation by Rehan Ahmed.",
  keywords: "AI quiz, learning platform, education, quiz generator, artificial intelligence, Rehan Ahmed",
  authors: [{ name: "Rehan Ahmed" }],
  creator: "Rehan Ahmed",
  manifest: "/manifest.json",
  openGraph: {
    title: "Quizzly.ai - AI-Powered Quiz Platform",
    description: "Transform any topic into interactive quizzes with AI",
    url: "https://quizzly.ai",
    siteName: "Quizzly.ai",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Quizzly.ai - AI-Powered Quiz Platform",
    description: "Transform any topic into interactive quizzes with AI",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Quizzly.ai",
  },
  other: {
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "default",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-cosmic-bg text-white`}
      >
        <ErrorBoundary>
          <Navigation />
          <main className="min-h-screen" id="main-content">
            {children}
          </main>
          <Footer />
          <BackToTop />

        </ErrorBoundary>
      </body>
    </html>
  );
}
