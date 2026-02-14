import Header from "@/components/header";
import Link from "next/link";
import { Check, Video, Users, Clock } from "lucide-react";

const packages = [
  {
    name: "Basic Package",
    description: "Perfect for quick sessions and simple portraits.",
    price: "₦20,000",
    subPrice: "per 30 mins",
    features: [
      "1 Section of Choice",
      "Maximum 4 People",
      "No heavy equipment allowed",
      "Option: 1 Hour for ₦35,000"
    ],
    highlight: false,
    color: "bg-white"
  },
  {
    name: "Standard Package",
    description: "Ideal for creative sessions with more variety.",
    price: "₦60,000",
    subPrice: "per 1 Hour",
    features: [
      "3 Sections of Choice",
      "Maximum 6 People",
      "No heavy equipment allowed",
      "Option: 2 Hours for ₦110,000"
    ],
    highlight: true, // Highlights this card as "Popular"
    color: "bg-[#fafafa]"
  },
  {
    name: "Premium Package",
    description: "The ultimate studio experience with no limits.",
    price: "₦85,000",
    subPrice: "per 1 Hour",
    features: [
      "Full Studio Access (All Sections)",
      "Maximum 10 People",
      "No heavy equipment allowed",
      "Option: 2 Hours for ₦150,000"
    ],
    highlight: false,
    color: "bg-white"
  },
  {
    name: "Video Production",
    description: "Professional environment for music videos & commercials.",
    price: "₦250,000",
    subPrice: "Half Day (5 Hours)",
    features: [
      "Full Studio Access",
      "Continuous Lighting Included",
      "Green Screen Access",
      "Option: Full Day (10 Hours) for ₦400,000"
    ],
    highlight: false,
    color: "bg-black text-white", // Dark theme for Video
    isDark: true
  }
];

export default function PricelistPage() {
  return (
    <main className="bg-white text-black min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-12 px-6 bg-[#C19A6B]/5">
        <div className="container mx-auto text-center max-w-3xl">
          <h1 className="text-[#C19A6B] text-5xl font-serif mb-6">Studio Rental Rates</h1>
          <p className="text-gray-600 font-light leading-relaxed">
            Transparent pricing for photographers and creators. 
            All rentals include access to our professional lighting and studio amenities.
            <br /><strong>Note:</strong> Strictly indoor studio photography only.
          </p>
        </div>
      </section>

      {/* Pricing Grid */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            
            {packages.map((pkg, index) => (
              <div 
                key={index}
                className={`
                  relative p-8 rounded-2xl border transition-all duration-300 hover:-translate-y-2
                  ${pkg.highlight ? 'border-[#C19A6B] shadow-xl scale-105 z-10' : 'border-gray-100 hover:shadow-lg'}
                  ${pkg.color}
                `}
              >
                {pkg.highlight && (
                  <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#C19A6B] text-white text-[10px] font-bold uppercase tracking-widest py-1 px-3 rounded-full">
                    Most Popular
                  </span>
                )}

                <div className="mb-6">
                  <h3 className={`font-serif text-xl mb-2 ${pkg.isDark ? 'text-[#C19A6B]' : 'text-gray-900'}`}>
                    {pkg.name}
                  </h3>
                  <p className={`text-xs ${pkg.isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    {pkg.description}
                  </p>
                </div>

                <div className="mb-8">
                  <span className={`text-3xl font-bold ${pkg.isDark ? 'text-white' : 'text-[#C19A6B]'}`}>
                    {pkg.price}
                  </span>
                  <span className={`block text-xs mt-1 ${pkg.isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                    {pkg.subPrice}
                  </span>
                </div>

                <ul className="space-y-4 mb-8">
                  {pkg.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm">
                      <Check className={`w-4 h-4 mt-0.5 shrink-0 ${pkg.isDark ? 'text-[#C19A6B]' : 'text-green-600'}`} />
                      <span className={pkg.isDark ? 'text-gray-300' : 'text-gray-600'}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <Link 
                  href="/booking" 
                  className={`
                    block w-full py-3 text-center text-xs font-bold tracking-widest rounded transition-colors
                    ${pkg.isDark 
                      ? 'bg-[#C19A6B] text-white hover:bg-[#a68257]' 
                      : 'bg-[#C19A6B] text-white hover:bg-[#C19A6B]'
                    }
                  `}
                >
                  BOOK NOW
                </Link>
              </div>
            ))}

          </div>
        </div>
      </section>

      {/* Rules Section */}
      <section className="pb-20 px-6">
        <div className="container mx-auto max-w-4xl border-t border-gray-100 pt-12">
            <h3 className="text-[#C19A6B] font-serif text-2xl mb-6 text-center">Studio Rules</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-600 font-light">
                <div className="bg-gray-50 p-6 rounded-lg">
                    <strong className="block text-black mb-2">🚫 No Heavy Equipment</strong>
                    Standard and Basic packages prohibit heavy cinema rigs, dollies, or complex set builds that may damage the floor or cyclorama.
                </div>
                <div className="bg-gray-50 p-6 rounded-lg">
                    <strong className="block text-black mb-2">⏰ Timing</strong>
                    Your booking time includes setup and teardown. Please arrive 10-15 minutes early to check in, but shooting must stop exactly when your session ends.
                </div>
                <div className="bg-gray-50 p-6 rounded-lg">
                    <strong className="block text-black mb-2">👥 Guest Limit</strong>
                    Strict adherence to the people limit (4, 6, or 10) is enforced to maintain safety and comfort. Extra guests will incur a fee.
                </div>
                <div className="bg-gray-50 p-6 rounded-lg">
                    <strong className="block text-black mb-2">🧹 Cleanup</strong>
                    The studio must be left in the same condition it was found. Props should be returned to their designated areas.
                </div>
            </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#C19A6B] text-black py-12">
        <div className="container mx-auto text-center">
            <h2 className="font-serif text-2xl font-bold mb-4">Ready to Create?</h2>
            <Link href="/booking" className="inline-block border-b-2 border-black pb-1 hover:text-white hover:border-white transition-all">
                BOOK YOUR SLOT NOW →
            </Link>
        </div>
      </footer>
    </main>
  );
}