import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { LayoutLabyrinth } from "@/components/LayoutLabyrinth";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Natheo's Weird Portfolio Labyrinth",
  description: "An intentionally non-professional, gamified portfolio with NFT easter eggs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <LayoutLabyrinth>
          {children}
        </LayoutLabyrinth>
      </body>
    </html>
  );
}
