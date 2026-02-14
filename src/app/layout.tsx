import type { Metadata } from "next";
import { EB_Garamond, Geist_Mono } from "next/font/google";
import "./globals.css";
import Script from "next/script";

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
  metadataBase: new URL('https://openshorestudios.com'),
  title: "Open Shore Studios | Professional Photography & Camera Rentals",
  keywords: ["Studio Rental Benin City", "Camera Rental Benin", "Photography Studio", "Indoor Studio", "Gear Rental", "Open Shore Studios", "openshore studios", "open shore studios"],
  description: "Premier photo studio in Benin City and equipment rental marketplace. Rent professional cameras (Sony, Canon) or book our creative studio space.",
  icons: {
    icon: "/logo.svg", // Shows your logo in the browser tab
  },
  openGraph: {
    title: "Open Shore Studios | Creative Space & Gear Rental",
    description: "Strictly indoor professional studio. Rent the space or rent the gear.",
    url: "https://openshorestudios.com",
    siteName: "Open Shore Studios",
    locale: "en_NG",
    type: "website",
  },
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
        {/* 2. Add this Script tag here */}
        <Script src="https://js.paystack.co/v1/inline.js" strategy="lazyOnload" />
      </body>
    </html>
  );
}
