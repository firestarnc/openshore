'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

const heroImages = [
  {
    src: '/img/hero1.png',
    alt: 'Professional photography studio with modern lighting setup at Open Shore Studios, Airport Road, Benin City'
  },
  {
    src: '/img/hero2.png',
    alt: 'Content creator photoshoot in minimalist white studio at Open Shore Studios, Benin City'
  },
  {
    src: '/img/hero3.png',
    alt: 'Fashion photography session with professional Godox lighting at Open Shore Studios, Benin City'
  },
  {
    src: '/img/hero4.png',
    alt: 'Commercial brand photography in spacious content studio at Open Shore Studios, Benin City'
  },
  {
    src: '/img/hero5.png',
    alt: 'Portrait photography with natural light backdrop at Open Shore Studios, Airport Road, Benin City'
  },
];

export default function Hero() {
  const [index, setIndex] = useState(0);

  // Auto-rotate images every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
      
      {/* Background Image Slider */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode='wait'>
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            className="w-full h-full relative"
          >
            <Image
              src={heroImages[index].src}
              alt={heroImages[index].alt}
              fill
              priority
              sizes="100vw"
              className="object-cover brightness-[0.60]"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto mt-20">
        <motion.span 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="uppercase tracking-[0.2em] text-sm md:text-base font-medium mb-4 block"
        >
          Professional Photography Studio
        </motion.span>
        
        <motion.h1 
          initial={{ opacity: 0, y: 30 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 0.7 }} 
          className="text-5xl md:text-7xl font-serif font-regular mb-6 leading-tight"
        > 
          Capturing <br/> 
          <span className="italic font-extralight">Light & </span> 
          <span className="text-[#C19A6B]">Stories</span> 
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="text-lg md:text-xl font-light text-white/90 mb-10 max-w-2xl mx-auto"
        >
          We let you create timeless unique story. 
          Equipped with industry-standard lighting and infinite creative possibilities.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
          className="flex flex-col md:flex-row gap-6 justify-center"
        >
          <Link href="/booking" className="px-8 py-3 bg-[#C19A6B] text-black font-medium hover:bg-transparent transition-colors duration-300">
            BOOK A SESSION
          </Link>
          <Link href="/portfolio" className="px-8 py-3 border border-white text-white font-medium hover:bg-white/10 transition-colors duration-300">
            VIEW PORTFOLIO
          </Link>
        </motion.div>
      </div>
    </section>
  );
}