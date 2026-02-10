'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { images } from '@/lib/constant';

// Placeholders - replace with your best portfolio shots
const works = [
    '/img/hero21.png',
    '/img/hero22.png',
    '/img/hero23.png',
    '/img/hero24.png',
];

export default function FeaturedWork() {
  return (
    <section className="py-24 bg-neutral-50">
      <div className="container mx-auto px-6">
        
        {/* Header with Button */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <span className="uppercase tracking-[0.2em] text-xs font-medium text-[#C19A6B] mb-4 block">
              FEATURED WORK
            </span>
            <h2 className="text-4xl md:text-5xl font-serif text-black">
              Recent Projects
            </h2>
          </div>
          
          <Link 
            href="/portfolio" 
            className="group flex items-center gap-2 text-[#C19A6B] text-sm tracking-widest font-medium border-b border-[#C19A6B] pb-1 hover:text-[#654321] hover:border-[#654321] transition-all"
          >
            VIEW ALL WORK
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {works.map((src, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`relative overflow-hidden group cursor-pointer ${index % 2 === 0 ? 'md:mt-0' : 'md:mt-12'}`} // Staggered look
            >
              <div className="aspect-3/4 overflow-hidden">
                <div 
                  className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  style={{ backgroundImage: `url(${src})` }}
                />
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}