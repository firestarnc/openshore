import type { Metadata } from "next";
import { EB_Garamond, Geist_Mono } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const ebGaramond = EB_Garamond({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-eb-garamond',
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://openshorestudios.com'),
  title: "Open Shore Studios | Professional Photography & Camera Rentals",
  keywords: [
    "Studio Rental Benin City", 
    "content studio Benin City", 
    "Camera Rental Benin", 
    "Photography Studio", 
    "Indoor Studio", 
    "Gear Rental", 
    "Open Shore Studios", 
    "openshore studios", 
    "open shore", 
    "Open shore", 
    "open shore studios", 
    "GRA",
    "Airport Road",
    "Uselu",
    "Ekenwan",
    "Best content studio Benin City",
    "content studio near me",
  ],
  description: "Premier photo studio in Benin City and equipment rental marketplace. Rent professional cameras (Sony, Canon) or book our creative content studio space.",
  icons: {
    icon: "/logo.svg",
  },
  openGraph: {
    title: "Open Shore Studios | Creative Space & Gear Rental",
    description: "Content studio on Airport Road serving creators across GRA, Uselu, and Ekenwan in Benin City.",
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
        {/* Google Ads Tag */}
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=AW-17965129527"
        />
        <Script
          id="google-ads-tag"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'AW-17965129527');
            `,
          }}
        />

        {/* LocalBusiness Schema with Ratings */}
        <Script
          id="localbusiness-schema"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "@id": "https://openshorestudios.com",
              name: "Open Shore Studios",
              image: "https://openshorestudios.com/logo.svg",
              url: "https://openshorestudios.com",
              telephone: "+2347064426441",
              email: "contact@openshorestudios.com",
              priceRange: "₦₦",
              address: {
                "@type": "PostalAddress",
                streetAddress: "52b Airport Road",
                addressLocality: "Benin City",
                addressRegion: "Edo",
                postalCode: "300001",
                addressCountry: "NG",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: 6.3246442,
                longitude: 5.6136335,
              },
              openingHoursSpecification: [
                {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                  opens: "09:00",
                  closes: "18:00",
                },
                {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: "Sunday",
                  opens: "12:00",
                  closes: "18:00",
                },
              ],
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.9",
                reviewCount: "35",
                bestRating: "5",
                worstRating: "3",
              },
              review: [
                {
                  "@type": "Review",
                  reviewRating: {
                    "@type": "Rating",
                    ratingValue: "5",
                    bestRating: "5",
                  },
                  author: {
                    "@type": "Person",
                    name: "Sophia IZEKOR",
                  },
                  reviewBody: "I had a great experience at this content studio. The space was clean, organized, and perfect for creating content. The staff were amazing, friendly, attentive, and very supportive throughout. Highly recommended. 💥💥",
                },
              ],
              areaServed: [
                {
                  "@type": "City",
                  name: "Benin City",
                  containedInPlace: {
                    "@type": "AdministrativeArea",
                    name: "Edo State",
                  },
                },
                "GRA",
                "Airport Road",
                "Uselu",
                "Ekenwan",
                "Ugbowo",
                "Sapele Road",
                "Ring Road",
                "Siluko",
                "Ikpoba Hill",
              ],
              sameAs: [
                "https://www.instagram.com/open.shore/",
                "https://www.youtube.com/@open.shore",
              ],
            }),
          }}
        />

        {/* Service Schema - Studio Rental */}
        <Script
          id="service-studio-schema"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Service",
              serviceType: ["Photography Studio Rental", "Commercial Photography", "Content Creation Space", "Production Studio Rental"],
              name: "Content Studio Booking",
              description: "Professional photography and video studio space for content creators in Benin City.",
              provider: {
                "@type": "LocalBusiness",
                name: "Open Shore Studios",
              },
              areaServed: {
                "@type": "City",
                name: "Benin City",
              },
              offers: {
                "@type": "Offer",
                priceSpecification: {
                  "@type": "PriceSpecification",
                  priceCurrency: "NGN",
                  price: "35000",
                  unitText: "per hour",
                },
                availability: "https://schema.org/InStock",
              },
            }),
          }}
        />

        {/* Product Schema - Camera Rental */}
        <Script
          id="product-camera-schema"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Product",
              name: "Professional Camera Rental",
              description: "Rent Sony, Canon, and other professional cameras for photography and videography in Benin City.",
              brand: {
                "@type": "Brand",
                name: "Open Shore Studios",
              },
              offers: {
                "@type": "AggregateOffer",
                priceCurrency: "NGN",
                lowPrice: "20000",
                highPrice: "50000",
                offerCount: "15",
                availability: "https://schema.org/InStock",
              },
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.9",
                reviewCount: "32",
              },
            }),
          }}
        />

        {children}
        
        {/* Paystack Script */}
        <Script src="https://js.paystack.co/v1/inline.js" strategy="lazyOnload" />
      </body>
    </html>
  );
}