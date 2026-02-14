'use client'; // Required for the image error handling to work

import Header from "@/components/header";
import Link from "next/link";
import { Camera, Zap, Aperture, ArrowRight, CheckCircle2, PlusCircle } from "lucide-react";
import Image from "next/image"; 

// --- INVENTORY DATA ---
const equipment = [
  {
    category: "Cameras",
    items: [
      // Only "sony.png" exists. If others are missing, the code gracefully falls back to the Icon.
      { name: "Sony A7S III", price: "₦35,000", image: "/img/sony.png" }, 
      { name: "Canon R5", price: "₦45,000" },
      { name: "Blackmagic 6K", price: "₦50,000", image: "/img/bmpcc.png" },
    ]
  },
  {
    category: "Lenses",
    items: [
      { name: "Sony 24-70mm GM II", price: "₦15,000", image: "/img/lens1.png" },
      { name: "Sigma 85mm Art", price: "₦10,000", image: "/img/lens2.png" },
      { name: "Canon 70-200mm", price: "₦12,000",  },
    ]
  }
  // Lighting & Grip section has been deleted
];

export default function RentCameraPage() {
  return (
    <main className="bg-white text-black min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 ">
        <div className="container mx-auto text-center max-w-3xl">
          <h1 className="text-[#C19A6B] text-5xl font-serif mb-6">Gear Rental</h1>
          <p className="text-gray-400 font-light leading-relaxed text-lg">
            Need extra gear for your shoot? We rent out our professional cameras, lenses, 
            and lighting equipment to trusted creatives.
          </p>
        </div>
      </section>

      {/* Requirements Section */}
      <section className="py-12 px-6 border-b border-gray-100">
        <div className="container mx-auto max-w-5xl">
            <div className="bg-gray-50 rounded-xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                    <h3 className="text-[#C19A6B] font-bold uppercase tracking-widest text-sm mb-4">Rental Requirements</h3>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3 text-sm text-gray-700">
                        <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#C19A6B]" /> Valid Government ID Card</li>
                        <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#C19A6B]" /> Refundable Security Deposit</li>
                        <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#C19A6B]" /> Signed Rental Agreement</li>
                        <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#C19A6B]" /> Physical Verification</li>
                    </ul>
                </div>
                <div className="shrink-0">
                    <a 
                        href="https://wa.me/2347064426441?text=Hello, I want to verify my identity for a rental..." 
                        target="_blank" 
                        className="border-2 border-[#C19A6B] text-[#C19A6B] px-6 py-3 rounded text-xs font-bold tracking-widest hover:bg-[#C19A6B] hover:text-white transition-colors"
                    >
                        START VERIFICATION
                    </a>
                </div>
            </div>
        </div>
      </section>

      {/* Inventory Grid */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-6xl space-y-20">
            
            {equipment.map((category, idx) => (
                <div key={idx}>
                    <div className="flex items-center gap-4 mb-8">
                        <h2 className="text-3xl font-serif text-[#C19A6B]">{category.category}</h2>
                        <div className="h-px bg-gray-200 flex-1"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {category.items.map((item, i) => (
                            // 'h-full' ensures the card stretches to match the tallest neighbor
                            <div key={i} className="group flex flex-col h-full border border-gray-100 rounded-xl p-6 hover:shadow-xl transition-all hover:border-[#C19A6B]/30">
                                
                                <div className="relative h-48 w-full bg-gray-50 rounded-lg mb-6 flex items-center justify-center overflow-hidden">
                                    
                                    {/* 1. The Fallback Icon (Always sits behind) */}
                                    <div className="absolute inset-0 flex items-center justify-center text-gray-300 group-hover:text-[#C19A6B] transition-colors z-0">
                                        {category.category === "Cameras" && <Camera className="w-12 h-12" />}
                                        {category.category === "Lenses" && <Aperture className="w-12 h-12" />}
                                    </div>

                                    {/* 2. The Actual Image (Overlays the icon) */}
                                    {item.image && (
                                        <Image 
                                            src={item.image} 
                                            alt={item.name}
                                            fill
                                            className="object-contain p-4 z-10 transition-transform duration-500 group-hover:scale-105"
                                            onError={(e) => { 
                                                const target = e.target as HTMLImageElement;
                                                target.style.opacity = '0'; 
                                            }}
                                        />
                                    )}
                                </div>
                                
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h3 className="font-bold text-[#C19A6B] text-lg">{item.name}</h3>
                                        <p className="text-[#C19A6B] text-sm font-medium">{item.price} <span className="text-gray-400 font-light">/ Day</span></p>
                                    </div>
                                </div>

                                {/* 'mt-auto' pushes this button to the bottom, aligning all buttons in the row */}
                                <a 
                                    href={`https://wa.me/2347064426441?text=Hello, I would like to rent the ${item.name} for...`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="mt-auto block w-full py-3 border border-[#C19A6B] text-[#C19A6B] text-center text-xs font-bold tracking-widest rounded hover:bg-[#C19A6B] hover:text-white transition-all"
                                >
                                    RENT NOW
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
            ))}

        </div>
      </section>

      {/* List Your Gear CTA */}
      <section className=" border-t border-white/10 py-12 px-6">
        <div className="container mx-auto max-w-5xl flex flex-col md:flex-row items-center justify-between gap-8 bg-[#C19A6B]/10 p-8 rounded-xl border border-[#C19A6B]/30">
            <div>
              <h3 className="text-[#C19A6B] text-2xl font-serif mb-2 flex items-center gap-2">
                 <PlusCircle className="w-6 h-6" /> 
                 Have Gear Gathering Dust?
              </h3>
              <p className="text-gray-30 font-light text-sm max-w-md">
                Partner with Open Shore Studios. List your unused camera equipment on our platform and earn extra income. We handle the client verification for you.
              </p>
            </div>
            <div className="shrink-0">
                <a 
                href="https://wa.me/2347064426441?text=Hi, I have camera gear I would like to list on Open Shore Studios..."
                target="_blank" 
                className="bg-[#C19A6B] text-white px-8 py-4 rounded text-xs font-bold tracking-widest hover:bg-[#a68257] transition-all flex items-center gap-2 shadow-lg hover:shadow-[#C19A6B]/20"
                >
                CONTACT TO LIST GEAR
                <ArrowRight className="w-4 h-4" />
                </a>
            </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#C19A6B] text-black py-20 border-t border-white/10">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="md:col-span-2">
              <Link href="/" className="text-3xl font-serif font-bold tracking-tighter block mb-6">
                Open Shore
              </Link>
              <p className="text-black font-light max-w-xs">
                Capturing life's most beautiful moments with artistry and intention.
              </p>
            </div>
            <div>
              <h4 className="text-sm font-bold tracking-widest mb-6">EXPLORE</h4>
              <ul className="space-y-4 text-black font-light text-sm">
                <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
                <li><Link href="/portfolio" className="hover:text-white transition-colors">Portfolio</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-bold tracking-widest mb-6">CONTACT</h4>
              <ul className="space-y-4 text-black font-light text-sm">
                <li><a href="mailto:contact@openshorestudios.com" className="hover:text-white/70">contact@openshorestudios.com</a></li>
                <li><a href="tel:+2347064426441" className="hover:text-white/70">+234 (706) 442-6441</a></li>
                <li><span className="opacity-70">52b, Airport road Benin city</span></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-white/10 flex justify-between items-center text-xs text-black font-light">
            <p>© {new Date().getFullYear()} Open Shore Studio. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}