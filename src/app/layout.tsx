import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { config } from "@/lib/config";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: `${config.app.name} - Discover & Explore Pokemon`,
  description: "A comprehensive Pokemon exploration platform with detailed information, stats, abilities, and more. Discover your favorite Pokemon with beautiful, modern interface.",
  keywords: "pokemon, pokedex, pokemon stats, pokemon abilities, pokemon explorer",
  authors: [{ name: `${config.app.name} Team` }],
};



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${jetbrainsMono.variable} bg-gray-50 text-gray-900 font-sans antialiased`}>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">
            <div className="max-w-7xl mx-auto">
              {children}
            </div>
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
