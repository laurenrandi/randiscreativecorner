import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import MusicPlayer from "@/components/MusicPlayer";
import Navigation from "@/components/Navigation/Navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: "https://randiscreativecorner.netlify.app/",
  title: {
    default: "Randi's Creative Corner",
    template: "%s | Randi's Creative Corner",
  },
  description:
    "Randi's interactive creative portfolio featuring art, photography, dance, crafts, and personal projects.",
  keywords: [
    "Randi Williams",
    "Randi's Creative Corner",
    "creative portfolio",
    "art portfolio",
    "photography portfolio",
    "interactive portfolio",
    "digital scrapbook",
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <MusicPlayer />
        <Navigation />
        {children}
      </body>
    </html>
  );
}