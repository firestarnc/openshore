'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import Header from "@/components/header";
import AddCameraForm from "@/components/rent/add-camera-form";
import Image from 'next/image';
import Link from 'next/link'; // 1. Import Link

export default function RentCameraPage() {
  const [cameras, setCameras] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCameras();
  }, []);

  async function fetchCameras() {
    const { data } = await supabase
      .from('cameras')
      .select('*')
      .eq('status', 'approved') 
      .order('created_at', { ascending: false });
      
    if (data) setCameras(data);
    setLoading(false);
  }

  return (
    <main className="bg-white min-h-screen text-[#C19A6B]">
      <Header />
      
      <section className="pt-32 pb-20 px-6">
        <div className="container mx-auto">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h1 className="text-5xl font-serif">Rent Gear</h1>
              <p className="text-gray-500 mt-2">Professional equipment from the Open Shore community.</p>
            </div>
            <button 
              onClick={() => setShowForm(!showForm)}
              className="px-6 py-3 border border-[#C19A6B] hover:bg-black hover:text-white transition-all text-sm tracking-widest"
            >
              {showForm ? "VIEW LISTINGS" : "ADD MY CAMERA"}
            </button>
          </div>

          {showForm ? (
            <div className="max-w-2xl mx-auto">
              <AddCameraForm />
            </div>
          ) : (
            <>
              {loading && <p>Loading gear...</p>}
              {!loading && cameras.length === 0 && (
                <p className="text-gray-400">No approved cameras available yet.</p>
              )}
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {cameras.map((camera) => (
                  <div key={camera.id} className="group border border-neutral-100 flex flex-col hover:shadow-xl transition-shadow duration-300">
                    <div className="relative aspect-square overflow-hidden bg-neutral-100">
                      {camera.image_url ? (
                        <Image 
                          src={camera.image_url} 
                          alt={camera.name} 
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">No Image</div>
                      )}
                    </div>
                    <div className="p-6 flex flex-col grow">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-xl font-serif text-black">{camera.name}</h3>
                        <span className="font-bold text-[#C19A6B]">₦{camera.price_per_day}/day</span>
                      </div>
                      <p className="text-gray-500 text-sm line-clamp-2 mb-6">{camera.description}</p>
                      
                      {/* 2. UPDATED BUTTON: Passes data to Contact Page */}
                      <Link 
                        href={`/contact?subject=rental&camera=${encodeURIComponent(camera.name)}`}
                        className="mt-auto w-full py-3 border border-[#C19A6B] text-[#C19A6B] text-center text-xs tracking-widest hover:bg-black hover:text-white hover:border-black transition-colors"
                      >
                        RENT NOW
                      </Link>

                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </main>
  );
}