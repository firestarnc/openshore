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
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL('https://openshorestudios.com'),
  title: {
    default: "Open Shore Studios | Professional Photography & Camera Rentals in Benin City",
    template: "%s | Open Shore Studios",
  },
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
    "photography tips Benin City",
    "outdoor shoot locations Nigeria",
    "Sony camera rental Benin",
    "video production Benin City",
  ],
  description: "Premier photo studio in Benin City and equipment rental marketplace. Rent professional cameras (Sony, Canon) or book our creative content studio space. Expert tips and resources for creators.",
  icons: {
    icon: "/logo.svg",
    apple: "/apple-touch-icon.png",
  },
  alternates: {
    canonical: "https://openshorestudios.com",
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
    google: "your-google-verification-code", // Add your Google Search Console verification
  },
  openGraph: {
    title: "Open Shore Studios | Creative Space & Gear Rental",
    description: "Content studio on Airport Road serving creators across GRA, Uselu, and Ekenwan in Benin City. Professional photography, video production, and creator resources.",
    url: "https://openshorestudios.com",
    siteName: "Open Shore Studios",
    locale: "en_NG",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Open Shore Studios - Professional Photography Studio in Benin City",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Open Shore Studios | Photography & Camera Rentals",
    description: "Premier photo studio and equipment rental in Benin City, Nigeria.",
    images: ["/og-image.jpg"],
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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
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

        {/* Organization Schema */}
        <Script
          id="organization-schema"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Open Shore Studios",
              url: "https://openshorestudios.com",
              logo: "https://openshorestudios.com/logo.svg",
              sameAs: [
                "https://www.instagram.com/open.shore/",
                "https://www.youtube.com/@open.shore",
              ],
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+2347064426441",
                contactType: "customer service",
                areaServed: "NG",
                availableLanguage: "English",
              },
            }),
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

        {/* Website Schema with SearchAction */}
        <Script
          id="website-schema"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Open Shore Studios",
              url: "https://openshorestudios.com",
              potentialAction: {
                "@type": "SearchAction",
                target: {
                  "@type": "EntryPoint",
                  urlTemplate: "https://openshorestudios.com/resources?q={search_term_string}",
                },
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />

        {/* Blog/Publisher Schema for Creator Resources */}
        <Script
          id="blog-schema"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Blog",
              name: "Open Shore Creator Resources",
              description: "Photography tips, video production guides, and creative insights for content creators in Benin City and Nigeria.",
              url: "https://openshorestudios.com/resources",
              inLanguage: "en-NG",
              publisher: {
                "@type": "Organization",
                name: "Open Shore Studios",
                logo: {
                  "@type": "ImageObject",
                  url: "https://openshorestudios.com/logo.svg",
                },
              },
              blogPost: [
                {
                  "@type": "BlogPosting",
                  headline: "5 Best Locations for Outdoor Shoots in Benin City",
                  url: "https://openshorestudios.com/resources/5-best-locations-for-outdoor-shoots-in-benin-city",
                  datePublished: "2026-03-01",
                  dateModified: "2026-03-13",
                  author: {
                    "@type": "Organization",
                    name: "Open Shore Studios",
                  },
                  description: "Discover the top 5 spots for stunning outdoor photography and videography in Benin City, Nigeria.",
                },
                {
                  "@type": "BlogPosting",
                  headline: "Why We Use Sony for Cinematic Video at Open Shore",
                  url: "https://openshorestudios.com/resources/why-we-use-sony-for-cinematic-video",
                  datePublished: "2026-03-05",
                  dateModified: "2026-03-13",
                  author: {
                    "@type": "Organization",
                    name: "Open Shore Studios",
                  },
                  description: "Learn why Sony cameras are our go-to choice for professional cinematic video production.",
                },
                {
                  "@type": "BlogPosting",
                  headline: "Essential Tips for First-Time Studio Clients",
                  url: "https://openshorestudios.com/resources/essential-tips-for-first-time-clients",
                  datePublished: "2026-03-10",
                  dateModified: "2026-03-13",
                  author: {
                    "@type": "Organization",
                    name: "Open Shore Studios",
                  },
                  description: "Everything first-time clients need to know before their professional photo or video shoot.",
                },
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
              serviceType: ["Photography Studio Rental", "Content Creation Space", "Production Studio Rental"],
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
                  price: "35000.00",
                  unitText: "hour",
                  unitCode: "HUR",
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

        {/* BreadcrumbList Schema */}
        <Script
          id="breadcrumb-schema"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: "Home",
                  item: "https://openshorestudios.com",
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: "Resources",
                  item: "https://openshorestudios.com/resources",
                },
                {
                  "@type": "ListItem",
                  position: 3,
                  name: "Booking",
                  item: "https://openshorestudios.com/booking",
                },
                {
                  "@type": "ListItem",
                  position: 4,
                  name: "Camera Rental",
                  item: "https://openshorestudios.com/rent-camera",
                },
              ],
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