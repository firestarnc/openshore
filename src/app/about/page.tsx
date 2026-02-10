'use client';

import Header from "@/components/header";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";


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
              Est. 2018
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
          
          {/* Text Content */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            <motion.span variants={itemVariants} className="uppercase tracking-widest text-xs font-bold text-[#C19A6B] mb-6 block">
              OUR PHILOSOPHY
            </motion.span>
            <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-serif mb-8 leading-tight">
              Capturing the <span className="italic text-[#C19A6B]">Unseen</span> Moments
            </motion.h2>
            <motion.div variants={itemVariants} className="space-y-6 text-gray-600 font-light text-lg leading-relaxed">
              <p>
                Open Shore began with a simple mission: to document the world not just as it looks, but as it feels. We believe that every shutter click is an opportunity to freeze a moment of genuine emotion.
              </p>
              <p>
                Whether it’s the quiet anticipation before a wedding or the bold energy of a commercial brand, we bring the same level of artistry and intention to every frame. We don't just take photos; we craft visual legacies.
              </p>
            </motion.div>

            {/* Signature / Decorative Element */}
            <motion.div variants={itemVariants} className="mt-12 pt-8 border-t border-[#C19A6B]/30">
              <p className="font-serif text-2xl text-[#C19A6B]">The Open Shore Team</p>
            </motion.div>
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
                <span className="text-5xl font-serif text-[#C19A6B] mb-2">150+</span>
                <span className="text-[10px] md:text-xs uppercase tracking-widest font-bold text-gray-400">Weddings Captured</span>
             </div>
             {/* Stat Card 2 */}
             <div className="bg-[#C19A6B] p-10 flex flex-col justify-center items-center text-center aspect-square text-white">
                <span className="text-5xl font-serif mb-2">12</span>
                <span className="text-[10px] md:text-xs uppercase tracking-widest font-bold opacity-80">Global Awards</span>
             </div>
             {/* Stat Card 3 */}
             <div className="bg-white p-10 border border-neutral-100 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-center items-center text-center aspect-square">
                <span className="text-5xl font-serif text-[#C19A6B] mb-2">8k</span>
                <span className="text-[10px] md:text-xs uppercase tracking-widest font-bold text-gray-400">Happy Clients</span>
             </div>
             {/* Stat Card 4 */}
             <div className="bg-white p-10 border border-neutral-100 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-center items-center text-center aspect-square">
                <span className="text-5xl font-serif text-[#C19A6B] mb-2">100%</span>
                <span className="text-[10px] md:text-xs uppercase tracking-widest font-bold text-gray-400">Passion</span>
             </div>
          </motion.div>
        </div>
      </section>

      {/* Team / Vision Section */}
      <section className="py-24 px-6">
        <div className="container mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="uppercase tracking-widest text-xs font-bold text-[#C19A6B] mb-4 block">THE VISIONARIES</span>
            <h2 className="text-4xl md:text-5xl font-serif mb-6">Meet the Creators</h2>
            <p className="text-gray-500 font-light">
              We are a collective of photographers, filmmakers, and storytellers obsessed with light, composition, and the perfect moment.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
              <div key={item} className="group cursor-pointer">
                <div className="relative overflow-hidden aspect-3/4 mb-6 bg-gray-100">
                  <Image 
                    src={`https://images.unsplash.com/photo-${item === 1 ? '1534528741775-53994a69daeb' : item === 2 ? '1507003211169-0a1dd7228f2d' : '1500917293891-ef795e70e1f6'}?auto=format&fit=crop&q=80&w=800`}
                    alt="Team Member"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500 grayscale group-hover:grayscale-0"
                  />
                </div>
                <h3 className="text-xl font-serif">
                  {item === 1 ? 'Sarah Jenkins' : item === 2 ? 'David Oyelowo' : 'Elena Rodriguez'}
                </h3>
                <p className="text-[#C19A6B] text-xs tracking-widest uppercase mt-1">
                  {item === 1 ? 'Lead Photographer' : item === 2 ? 'Creative Director' : 'Cinematographer'}
                </p>
              </div>
            ))}
          </div>
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
            <Link 
              href="/rent-camera" 
              className="border border-white text-white px-8 py-4 text-sm font-bold tracking-widest hover:bg-white hover:text-[#C19A6B] transition-colors"
            >
              RENT GEAR
            </Link>
          </div>
        </div>
      </section>

     
    </main>
  );
}