'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

const services = [
  {
    title: "Portrait Sessions",
    description: "Individual, couple, and family portraits that capture personality and connection.",
    image: "/img/hero11.png",
    link: "/booking?type=portrait"
  },
  {
    title: "Wedding Photography",
    description: "Documenting your love story from engagement to celebration with artistry and care.",
    image: "/img/hero12.png",
    link: "/booking?type=wedding"
  },
  {
    title: "Commercial Work",
    description: "Brand photography, product shoots, and corporate headshots that elevate your business.",
    image: "/img/hero14.png",
    link: "/booking?type=commercial"
  }
];

export default function Services() {
  return (
    <section className="py-24 bg-white text-black">
      <div className="container mx-auto px-6">
        
        {/* Section Header */}
        <div className="mb-16 max-w-2xl">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="uppercase tracking-[0.2em] text-xs font-medium text-[#C19A6B] mb-4 block"
          >
            OUR SERVICES
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-serif mb-6"
          >
            What We Create
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-[#C19A6B] font-light"
          >
            Every project is approached with intention and artistry, ensuring your vision comes to life through our lens.
          </motion.p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
            >
              <Link href={service.link} className="group block">
                {/* Image Container */}
                <div className="relative overflow-hidden aspect-4/5 mb-6">
                  <div 
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                    style={{ backgroundImage: `url(${service.image})` }}
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
                </div>

                {/* Text Content */}
                <h3 className="text-2xl font-serif mb-3 group-hover:underline decoration-1 underline-offset-4">
                  {service.title}
                </h3>
                <p className="text-[#C19A6B] font-light leading-relaxed">
                  {service.description}
                </p>
              </Link>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}