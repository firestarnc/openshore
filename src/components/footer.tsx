'use client';

import Link from 'next/link';
import { Camera } from 'lucide-react'; // Simulating the icon you mentioned

export default function Footer() {
  return (
    <>
      {/* CTA Section */}
      <section className="py-32 bg-white text-center px-6">
        <div className="max-w-3xl mx-auto flex flex-col items-center">
          {/* Icon */}
          <div className="mb-8 p-4 rounded-full bg-neutral-100">
            <Camera className="w-8 h-8 text-[#C19A6B]" strokeWidth={1} />
          </div>

          <h2 className="text-[#C19A6B] text-4xl md:text-6xl font-serif mb-6 leading-tight">
            Ready to Create <br /> Something Beautiful?
          </h2>
          
          <p className="text-lg text-[#C19A6B] font-light mb-10 max-w-xl">
            Let's discuss your vision and bring it to life. Whether it's a special occasion or a brand refresh, we're here to capture your story.
          </p>

          <Link 
            href="/booking" 
            className="px-10 py-4 bg-[#C19A6B]  text-black text-sm tracking-widest hover:bg-[#9B7A4F] transition-all duration-300"
          >
            BOOK YOUR SESSION
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#C19A6B]  text-black py-20 border-t border-white/10">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            
            {/* Brand */}
            <div className="md:col-span-2">
              <Link href="/" className="text-3xl font-serif font-bold tracking-tighter block mb-6">
                Open Shore
              </Link>
              <p className="text-black font-light max-w-xs">
                Capturing life's most beautiful moments with artistry and intention.
              </p>
            </div>

            {/* Links */}
            <div>
              <h4 className="text-sm font-bold tracking-widest mb-6">EXPLORE</h4>
              <ul className="space-y-4 text-black font-light text-sm">
                <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
                <li><Link href="/portfolio" className="hover:text-white transition-colors">Portfolio</Link></li>
                <li><Link href="/about" className="hover:text-white transition-colors">About</Link></li>
                <li><Link href="/rent-camera" className="hover:text-white transition-colors">Rent a Camera</Link></li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-sm font-bold tracking-widest mb-6">CONTACT</h4>
              <ul className="space-y-4 text-black font-light text-sm">
                
                {/* Email Link */}
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

                {/* Phone Link (Usually better to stay in same tab to trigger call) */}
                <li>
                  <a 
                    href="tel:+2347064426441" 
                    className="hover:text-white/70 transition-colors"
                  >
                    +234 (706) 442-6441
                  </a>
                </li>

                {/* Maps Link */}
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

          {/* Copyright */}
          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-xs text-black font-light">
            <p>&copy; {new Date().getFullYear()} Open Shore Studio. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
                <a 
                  href="https://www.instagram.com/open.shore/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-[#C19A6B] transition-colors"
                >
                  Instagram
                </a>
              <Link href="#">Twitter</Link>
              <Link href="#">LinkedIn</Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}