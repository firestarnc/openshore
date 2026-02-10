'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const navItems = [
  { name: 'Homepage', href: '/' },
  { name: 'Portfolio', href: '/portfolio' },
  { name: 'Rent a Camera', href: '/rent-camera' },
  { name: 'Booking', href: '/booking' },
  { name: 'About', href: '/about' },
];

export default function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled || isOpen ? 'bg-white/95 backdrop-blur-md py-4 shadow-sm' : 'bg-transparent py-6'
    }`}>
      <div className="container mx-auto px-6 flex items-center justify-between">
        
        {/* LOGO REPLACEMENT */}
        <Link href="/" className="z-50 relative block">
          {/* UPDATED CLASSES EXPLAINED:
              1. h-16 w-56: Increased Mobile size (was h-12 w-48)
              2. md:h-24 md:w-96: Increased Desktop size (was md:h-16 md:w-64)
              3. translate-y-4: Moves the logo down roughly 16px (vertical axis)
          */}
          <div className="relative h-16 w-56 md:h-24 md:w-96 translate-y-4">
            <Image 
              src="/logo.svg" 
              alt="Open Shore" 
              fill
              className="object-contain object-left" 
              priority 
            />
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link 
                key={item.name} 
                href={item.href}
                className="relative text-sm font-medium tracking-wide transition-colors text-[#C19A6B] group"
              >
                {item.name}
                <span className={`absolute left-0 -bottom-1 h-0.5 bg-current transition-all duration-300
                  ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}
                `} />
              </Link>
            );
          })}

          <Link 
            href="/contact"
            className={`px-6 py-2 text-sm font-medium border border-[#C19A6B] text-[#C19A6B] transition-all duration-300 hover:bg-[#C19A6B] hover:text-white`}
          >
            Contact
          </Link>
        </nav>

        {/* Mobile Toggle Button */}
        <button 
          onClick={() => setIsOpen(!isOpen)} 
          className="md:hidden z-50 text-[#C19A6B] p-2"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: '100vh' }}
              exit={{ opacity: 0, height: 0 }}
              className="fixed inset-0 bg-white z-40 flex flex-col items-center justify-center space-y-8 md:hidden overflow-hidden"
            >
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`text-2xl font-serif ${isActive ? 'text-[#C19A6B]' : 'text-neutral-500'}`}
                  >
                    {item.name}
                  </Link>
                );
              })}
              <Link 
                href="/contact"
                onClick={() => setIsOpen(false)}
                className="px-10 py-3 text-lg border border-[#C19A6B] text-[#C19A6B]"
              >
                Contact
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}