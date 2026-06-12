'use client';

import Header from "@/components/header";
import Link from "next/link";
import { Camera, Zap, Aperture, ArrowRight, CheckCircle2, PlusCircle } from "lucide-react";
import Image from "next/image";
import { supabase } from "@/lib/supabase";

const CAMERA_IMAGE_BUCKET = "camera-images";

type EquipmentItem = {
  name: string;
  price: string;
  imagePath?: string;
  originalPrice?: string;
  badge?: string;
};

type EquipmentCategory = {
  category: string;
  items: EquipmentItem[];
};

function getCameraImageUrl(imagePath?: string) {
  if (!imagePath) {
    return null;
  }

  const { data } = supabase.storage.from(CAMERA_IMAGE_BUCKET).getPublicUrl(imagePath);
  return data.publicUrl;
}

const equipment = [
  {
    category: "Cameras",
    items: [
      { name: "Sony A7 siii", price: "N38,000", imagePath: "sonya7siii.jpg" },
      { name: "Sony A7iii", price: "N15,000", imagePath: "sonya7iii.JPG" },
      {
        name: "Canon G7x mark iii",
        price: "N20,000",
        originalPrice: "N35,000",
        badge: "Website Launch Discount",
        imagePath: "canonG7x.JPG",
      },
    ],
  },
  {
    category: "Lens (Sony)",
    items: [
      { name: "Sony Gmaster 24-70mm (2.8)", price: "N18,000", imagePath: "sonygmaster2470.JPG" },
      { name: "Sony Gmaster 16-35mm (2.8)", price: "N18,000", imagePath: "sonysigma1635.JPG" },
      { name: "Sony Sigma 85mm (f1.4)", price: "N18,000", imagePath: "sonysigma85.jpg" },
      { name: "Sony Sigma 35mm (f1.4)", price: "N18,000", imagePath: "sonysigma35.JPG" },
    ],
  },
  {
    category: "Other Gears",
    items: [
      { name: "Drone (DJI mini 3 pro)", price: "N30,000", imagePath: "djimini3d.jpg" },
      { name: "Drone (DJI mini 3 pro & pilot)", price: "N60,000", imagePath: "djimini3.JPG" },
      { name: "Osmos Pocket 3", price: "N20,000", imagePath: "osmopoc3.JPG" },
    ],
  },
] satisfies EquipmentCategory[];

const combos = [
  { name: "A7siii & 24-70mm", price: "N50,000" },
  { name: "A7iii & 16-35mm", price: "N30,000" },
];

export default function RentCameraClient() {
  return (
    <main className="bg-white text-black min-h-screen">
      <Header />

      <section className="pt-32 pb-20 px-6 ">
        <div className="container mx-auto text-center max-w-3xl">
          <h1 className="text-[#C19A6B] text-5xl font-serif mb-6">Gear Rental</h1>
          <p className="text-gray-400 font-light leading-relaxed text-lg">
            Need extra gear for your shoot? We rent out our professional cameras, lenses,
            and lighting equipment to trusted creatives.
          </p>
        </div>
      </section>

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
                rel="noopener noreferrer"
                className="border-2 border-[#C19A6B] text-[#C19A6B] px-6 py-3 rounded text-xs font-bold tracking-widest hover:bg-[#C19A6B] hover:text-white transition-colors"
              >
                START VERIFICATION
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="container mx-auto max-w-6xl space-y-20">
          {equipment.map((category, idx) => (
            <div key={idx}>
              <div className="flex items-center gap-4 mb-8">
                <h2 className="text-3xl font-serif text-[#C19A6B]">{category.category}</h2>
                <div className="h-px bg-gray-200 flex-1"></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {category.items.map((item, i) => {
                  const imageUrl = getCameraImageUrl(item.imagePath);

                  return (
                    <div key={i} className="group flex flex-col h-full border border-gray-100 rounded-xl p-6 hover:shadow-xl transition-all hover:border-[#C19A6B]/30">
                      <div className="relative h-48 w-full bg-gray-50 rounded-lg mb-6 flex items-center justify-center overflow-hidden">
                        <div className="absolute inset-0 flex items-center justify-center text-gray-300 group-hover:text-[#C19A6B] transition-colors z-0">
                          {category.category === "Cameras" && <Camera className="w-12 h-12" />}
                          {category.category === "Lens (Sony)" && <Aperture className="w-12 h-12" />}
                          {category.category === "Other Gears" && <Zap className="w-12 h-12" />}
                        </div>

                        {imageUrl && (
                          <Image
                            src={imageUrl}
                            alt={item.name}
                            fill
                            className="object-contain p-4 z-10 transition-transform duration-500 group-hover:scale-105"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.style.opacity = "0";
                            }}
                          />
                        )}
                      </div>

                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="font-bold text-[#C19A6B] text-lg">{item.name}</h3>
                          <p className="text-[#C19A6B] text-sm font-medium flex items-center gap-2 flex-wrap">
                            {item.originalPrice && (
                              <span className="text-gray-400 line-through">{item.originalPrice}</span>
                            )}
                            <span>{item.price}</span>
                            <span className="text-gray-400 font-light">/ Day</span>
                            {item.badge && (
                              <span className="px-2 py-1 rounded bg-[#C19A6B]/15 text-[#C19A6B] text-[10px] font-bold tracking-wide uppercase">
                                {item.badge}
                              </span>
                            )}
                          </p>
                        </div>
                      </div>

                      <a
                        href={`https://wa.me/2347064426441?text=Hello, I would like to rent the ${item.name} for...`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-auto block w-full py-3 border border-[#C19A6B] text-[#C19A6B] text-center text-xs font-bold tracking-widest rounded hover:bg-[#C19A6B] hover:text-white transition-all"
                      >
                        RENT NOW
                      </a>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="pb-20 px-6">
        <div className="container mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 border border-[#C19A6B]/30 rounded-xl p-6 md:p-8 bg-[#C19A6B]/5">
            <h3 className="text-[#C19A6B] font-bold uppercase tracking-widest text-sm mb-5">Combo Deals</h3>
            <div className="space-y-3">
              {combos.map((combo) => (
                <div
                  key={combo.name}
                  className="flex items-center justify-between rounded-lg border border-[#C19A6B]/20 bg-white p-4"
                >
                  <p className="text-sm md:text-base text-black font-medium">{combo.name}</p>
                  <p className="text-[#C19A6B] font-bold text-sm md:text-base">{combo.price}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="border-2 border-[#C19A6B] rounded-xl p-6 md:p-8 bg-white shadow-sm">
            <h3 className="text-[#C19A6B] font-bold uppercase tracking-widest text-sm mb-4">Notes</h3>
            <p className="text-black text-sm md:text-base font-semibold leading-relaxed">
              N3,000 discount on your first order of the month.
            </p>
            <p className="text-gray-700 text-sm md:text-base mt-2 font-medium">
              Only for returning customers.
            </p>
          </div>
        </div>
      </section>

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
              rel="noopener noreferrer"
              className="bg-[#C19A6B] text-white px-8 py-4 rounded text-xs font-bold tracking-widest hover:bg-[#a68257] transition-all flex items-center gap-2 shadow-lg hover:shadow-[#C19A6B]/20"
            >
              CONTACT TO LIST GEAR
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      <footer className="bg-[#C19A6B]  text-black py-20 border-t border-white/10">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="md:col-span-2">
              <Link href="/" className="text-3xl font-serif font-bold tracking-tighter block mb-6">
                Open Shore
              </Link>
              <p className="text-black font-light max-w-xs">
                Capturing life&#39;s most beautiful moments with artistry and intention, serving creators across Benin City GRA, Airport Road, Uselu, Ekenwan, Ugbowo, and beyond.
              </p>
            </div>

            <div>
              <h4 className="text-sm font-bold tracking-widest mb-6">EXPLORE</h4>
              <ul className="space-y-4 text-black font-light text-sm">
                <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
                <li><Link href="/portfolio" className="hover:text-white transition-colors">Portfolio</Link></li>
                <li><Link href="/about" className="hover:text-white transition-colors">About</Link></li>
                <li><Link href="/rent-camera" className="hover:text-white transition-colors">Rent a Camera</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-bold tracking-widest mb-6">CONTACT</h4>
              <ul className="space-y-4 text-black font-light text-sm">
                <li>
                  <a
                    href="mailto:contact@openshorestudios.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white/70 transition-colors"
                  >
                    contact@openshorestudios.com
                  </a>
                </li>
                <li>
                  <a
                    href="tel:+2347064426441"
                    className="hover:text-white/70 transition-colors"
                  >
                    +234 (706) 442-6441
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=52b+Airport+road+Benin+city"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white/70 transition-colors"
                  >
                    52b, Airport road Benin city
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-xs text-black font-light">
            <div className="flex gap-6 mt-4 md:mt-0">
              <a
                href="https://www.instagram.com/open.shore/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#C19A6B] transition-colors"
              >
                Instagram
              </a>
              <a
                href="https://www.youtube.com/@OpenShore-u9z"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#C19A6B] transition-colors"
              >
                Youtube
              </a>
              <a
                href="https://www.tiktok.com/@open.shore?_r=1&_t=ZS-96v3r77QF5F"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#C19A6B] transition-colors"
              >
                Tiktok
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-col py-6 items-center justify-center space-y-2 md:flex-row md:space-x-4 md:space-y-0">
          <p>&copy; {new Date().getFullYear()} Open Shore Studio. All rights reserved.</p>
          <div className="flex space-x-4">
            <a href="/privacy" className="hover:underline">Privacy Policy</a>
            <a href="/terms" className="hover:underline">Terms of Service</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
