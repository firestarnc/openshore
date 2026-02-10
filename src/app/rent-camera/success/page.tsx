'use client';

import { useState, Suspense } from 'react';
import { supabase } from '@/lib/supabase';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

function SuccessForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const cameraId = searchParams.get('id');

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!cameraId) {
      alert("Error: Camera ID missing.");
      return;
    }

    try {
      // UPDATE the existing camera row with the owner's contact info
      const { error } = await supabase
        .from('cameras')
        .update({
          owner_name: formData.name,
          owner_email: formData.email,
          owner_phone: formData.phone
        })
        .eq('id', cameraId);

      if (error) throw error;
      
      // Redirect to main page or show success message
      alert("Listing submitted for Admin Review!");
      router.push('/rent-camera'); 
      
    } catch (error: any) {
      console.error("Error saving contact info:", error.message);
      alert("Error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="bg-white min-h-screen text-black">
      <section className="pt-32 pb-20 px-6">
        <div className="container mx-auto max-w-2xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="text-xs uppercase tracking-widest text-green-600 font-bold mb-2 block">Step 2: Owner Verification</span>
            <h1 className="text-4xl font-serif mb-6">Almost there!</h1>
            <p className="text-gray-500 mb-10">
              Your camera details are saved. Please provide your contact information so our Admin can verify you before publishing the listing.
            </p>

            <form onSubmit={handleContactSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <label className="text-xs uppercase font-bold mb-2">Full Name</label>
                  <input 
                    required type="text" placeholder="Your name"
                    className="p-3 border focus:border-black outline-none bg-neutral-50" 
                    onChange={(e) => setFormData({...formData, name: e.target.value})} 
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-xs uppercase font-bold mb-2">Phone</label>
                  <input 
                    required type="tel" placeholder="+234..."
                    className="p-3 border focus:border-black outline-none bg-neutral-50" 
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <label className="text-xs uppercase font-bold mb-2">Email Address</label>
                <input 
                  required type="email" placeholder="your@email.com"
                  className="p-3 border focus:border-black outline-none bg-neutral-50" 
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
              <button disabled={loading} className="w-full bg-black text-white py-4 tracking-widest text-sm font-bold disabled:opacity-50">
                {loading ? "SAVING..." : "SUBMIT FOR APPROVAL"}
              </button>
            </form>
          </motion.div>
        </div>
      </section>
    </main>
  );
}

export default function RentSuccessPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SuccessForm />
    </Suspense>
  );
}