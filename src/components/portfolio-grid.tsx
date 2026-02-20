'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';


// 1. Define your categories and dummy data
const categories = ["All", "Portrait", "Wedding", "Commercial", "Editorial"];

const portfolioItems = [
  { id: 1, category: "Portrait", src: "/img/hero11.png", title: "Neta in Studio" },
  { id: 2, category: "Wedding", src: "/img/hero12.png", title: "The Waves" },
  { id: 3, category: "Commercial", src: "/img/hero13.png", title: "Timeless Lace" },
  { id: 4, category: "Editorial", src: "/img/hero14.png", title: "Office Set" },
  { id: 5, category: "Portrait", src: "/img/hero15.png", title: "Golden Hour" },
  { id: 6, category: "Wedding", src: "/img/hero16.png", title: "First Dance" },
  { id: 7, category: "Commercial", src: "/img/hero17.png", title: "Growing Love" },
   { id: 8, category: "Wedding", src: "/img/hero020.png", title: "Timeless Affection" },
  { id: 9, category: "Editorial", src: "/img/hero18.png", title: "Cloud Corner" },
  { id: 10, category: "Portrait", src: "/img/hero19.png", title: "Crystal Light" },
  { id: 11, category: "Wedding", src: "/img/hero021.png", title: "Intimate Gaze" },
  { id: 12, category: "Commercial", src: "/img/hero022.png", title: "Golden Year" },
];

export default function PortfolioGrid() {
  const [activeCategory, setActiveCategory] = useState("All");

  // Filter logic
  const filteredItems = activeCategory === "All" 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === activeCategory);

  return (
    <section className="py-20 min-h-screen">
      <div className="container mx-auto px-6">

        
        {/* Page Title */}
        <div className=" text-center mb-16 pt-20">
          <h1 className="text-[#C19A6B] text-6xl md:text-8xl font-serif mb-8 italic">The Gallery</h1>
          <p className="text-[#C19A6B] max-w-2xl mx-auto">
            A curation of moments, light, and stories captured across the globe.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-8 mb-16">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`text-sm tracking-widest transition-all duration-300 relative pb-2
                ${activeCategory === cat ? 'text-[#C19A6B] font-medium' : 'text-[#C19A6B] hover:text-black'}
              `}
            >
              {cat.toUpperCase()}
              {activeCategory === cat && (
                <motion.span 
                  layoutId="underline"
                  className="absolute left-0 bottom-0 w-full h-px bg-[#C19A6B]"
                />
              )}
            </button>
          ))}
        </div>

        {/* The Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence>
            {filteredItems.map((item) => (
              <motion.div
                layout
                key={item.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="group cursor-pointer"
              >
                <div className="relative overflow-hidden aspect-3/4 mb-4 bg-gray-100">
                  <div 
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                    style={{ backgroundImage: `url(${item.src})` }}
                  />
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-lg text-[#C19A6B] font-serif">{item.title}</span>
                  <span className="text-xs text-gray-400 uppercase tracking-wider">{item.category}</span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>


    </section>
  );
}