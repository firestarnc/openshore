import Image from "next/image";
import Link from "next/link";
import { X } from "lucide-react";

export default function PricelistPage() {
  return (
    <main className="bg-black min-h-screen w-full relative overflow-hidden">
      
      {/* Close Button (Returns to Booking) */}
      <Link 
        href="/booking" 
        className="absolute top-6 right-6 z-50 bg-white/20 backdrop-blur-md p-3 rounded-full text-white hover:bg-white/40 transition-all"
      >
        <X className="w-6 h-6" />
      </Link>

      {/* The Pricelist Image */}
      <div className="relative w-full h-dvh">
        <Image 
          src="/img/pricelist.png" // <--- Make sure you add this image!
          alt="Full Pricelist"
          fill
          // 'object-contain' ensures the WHOLE list is visible on mobile without cropping
          className="object-contain"
          priority
        />
      </div>
      
    </main>
  );
}