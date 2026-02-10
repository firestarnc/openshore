import type { Metadata } from "next";
import { EB_Garamond, Geist_Mono } from "next/font/google";
import "./globals.css";

// Configure the font
const ebGaramond = EB_Garamond({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-eb-garamond', // Define a CSS variable name
});


const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Open Shore Photography Studio",
  description: "Professional Photography Studio - Capturing Moments, Creating Memories.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${ebGaramond.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
