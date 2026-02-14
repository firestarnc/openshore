'use client';

import Header from "@/components/header";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Camera, Layers, Zap, Star } from "lucide-react";



// Animation variants for staggered revealing
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

export default function AboutPage() {
  return (
    <main className="bg-white text-black min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="container mx-auto">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="mb-12"
          >
            <motion.span variants={itemVariants} className="text-xs font-bold tracking-[0.2em] text-[#C19A6B] uppercase mb-4 block">
              Est. 2025
            </motion.span>
            <motion.h1 
              variants={itemVariants}
              className="text-5xl md:text-8xl font-serif text-[#C19A6B] leading-tight"
            >
              The Story <span className="text-black">Behind</span> <br /> Open Shore
            </motion.h1>
          </motion.div>

         <motion.div 
         initial={{ opacity: 0, scale: 0.98 }}
         animate={{ opacity: 1, scale: 1 }}  
         transition={{ duration: 0.8, delay: 0.4 }}
         className="relative w-full h-[60vh] md:h-[70vh] overflow-hidden rounded-sm"
         >
        <Image
          src="/img/about1.png"
           alt="Studio Space"
           fill
          className="object-cover"
          priority 
          />
        {/* Overlay for text readability if needed, or just style */}
      <div className="absolute inset-0 bg-black/10" />
      </motion.div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-24 px-6 bg-neutral-50">
        <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          
          {/* Left Column: The Hook */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="md:col-span-5 sticky top-24"
            >
              <span className="text-[#C19A6B] text-xs font-bold tracking-[0.2em] uppercase block mb-6">
                The Origin
              </span>
              <h2 className="text-4xl md:text-5xl font-serif text-black leading-tight mb-8">
                From a Camera Bag to <br/>
                <span className="italic text-[#C19A6B]">Benin City’s Hub.</span>
              </h2>
              <div className="h-1 w-20 bg-[#C19A6B]/30" />
            </motion.div>

            {/* Right Column: The Story Text */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="md:col-span-7 md:pl-12 border-l border-gray-100"
            >
              <p className="text-gray-600 text-lg font-light leading-relaxed mb-8 first-letter:text-5xl first-letter:font-serif first-letter:text-[#C19A6B] first-letter:mr-3 first-letter:float-left">
                Open Shore Studios didn't start as a facility; it started as a frustration.
                Years ago, we realized that creatives in Benin City were limited—not by their talent, but by their environment.
              </p>
              
              <p className="text-gray-600 text-lg font-light leading-relaxed mb-8">
                We saw photographers struggling with unpredictable weather. We saw videographers compromising on their vision because they couldn't find a quiet, controlled space. We saw artists with incredible ideas but no access to the high-end gear needed to execute them.
              </p>

              <div className="bg-[#C19A6B]/5 p-8 rounded-lg border-l-4 border-[#C19A6B] my-10">
                <h3 className="text-2xl font-serif text-black mb-3">We decided to build the solution.</h3>
                <p className="text-gray-700 italic">
                  "A sanctuary where the chaos of the outside world is silenced, and the artist constructs their own reality."
                </p>
              </div>

              <p className="text-gray-600 text-lg font-light leading-relaxed">
                That is why we transitioned to a dedicated <strong>Indoor Facility</strong>. Today, we are more than just a studio. With our new <strong>Gear Marketplace</strong>, we are democratizing access to professional equipment, ensuring that no creative in our city is ever held back by a lack of tools.
              </p>
              
              <div className="mt-12 pt-12 border-t border-[#C19A6B]/30 flex items-center gap-4">
                 <div className="text-sm font-bold tracking-widest text-[#C19A6B]">
                    Welcome to Open Shore
                 </div>
                 <div className="h-px bg-[#C19A6B] w-12" />
              </div>
            </motion.div>

        
         
          {/* Stats Grid */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-2 gap-4"
          >
             {/* Stat Card 1 */}
             <div className="bg-white p-10 border border-neutral-100 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-center items-center text-center aspect-square">
                <span className="text-5xl font-serif text-[#C19A6B] mb-2">200+</span>
                <span className="text-[10px] md:text-xs uppercase tracking-widest font-bold text-gray-400">Stories Captured</span>
             </div>
             {/* Stat Card 2 */}
             <div className="bg-[#C19A6B] p-10 flex flex-col justify-center items-center text-center aspect-square text-white">
                <span className="text-5xl font-serif mb-2">100%</span>
                <span className="text-[10px] md:text-xs uppercase tracking-widest font-bold opacity-80">Passion</span>
             </div>
             {/* Stat Card 3 */}
             <div className="bg-white p-10 border border-neutral-100 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-center items-center text-center aspect-square">
                <span className="text-5xl font-serif text-[#C19A6B] mb-2">1k</span>
                <span className="text-[10px] md:text-xs uppercase tracking-widest font-bold text-gray-400">Happy Clients</span>
             </div>
          </motion.div>
        </div>
      </section>


      {/* Call to Action */}
      <section className="py-24 bg-[#C19A6B] text-white text-center px-6">
        <div className="container mx-auto max-w-2xl">
          <h2 className="text-4xl md:text-5xl font-serif mb-6">Ready to tell your story?</h2>
          <p className="text-white/80 mb-10 text-lg font-light">
            Whether it's a rental or a full-scale production, we are ready to collaborate.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Link 
              href="/booking" 
              className="bg-white text-[#C19A6B] px-8 py-4 text-sm font-bold tracking-widest hover:bg-neutral-100 transition-colors"
            >
              BOOK A SESSION
            </Link>
            <div className="container mx-auto max-w-6xl">
          <div className="bg-[#C19A6B] rounded-2xl p-10 md:p-16 flex flex-col md:flex-row items-center justify-between gap-12 relative overflow-hidden">
            
            {/* Decorative Circle */}
            <div className="absolute -top-24 -left-24 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
            
            <div className="relative z-10 max-w-lg text-white">
              <div className="flex items-center gap-3 mb-4">
                 <Camera className="w-6 h-6" />
                 <span className="text-xs font-bold tracking-widest uppercase">Equipment Rental</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-serif mb-6">Don't have the right gear?</h2>
              <p className="text-white/80 font-light mb-8">
                We rent out industry-standard cameras, lenses, and lighting. 
                Already own gear? You can also list your equipment on our platform to earn extra income.
              </p>
              <div className="flex gap-4">
                  <Link 
                    href="/rent-camera" 
                    className="bg-white text-[#C19A6B] px-8 py-3 rounded text-xs font-bold tracking-widest hover:bg-black hover:text-white transition-all"
                  >
                    BROWSE GEAR
                  </Link>
              </div>
            </div>

            {/* Placeholder Visual for Gear */}
            <div className="relative z-10 grid grid-cols-2 gap-4 opacity-90">
                <div className="bg-black/20 p-6 rounded-lg backdrop-blur-sm">
                    <span className="block text-2xl font-bold text-white mb-1">Sony</span>
                    <span className="text-xs text-white/70">Alpha Series</span>
                </div>
                <div className="bg-black/20 p-6 rounded-lg backdrop-blur-sm mt-8">
                    <span className="block text-2xl font-bold text-white mb-1">Godox</span>
                    <span className="text-xs text-white/70">Professional Lighting</span>
                </div>
            </div>
          </div>
        </div>
          </div>
        </div>
      </section>

       

     
    </main>
  );
}