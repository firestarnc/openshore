'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export default function AddCameraForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  
  // 1. Added 'brand' and 'model' to state
  const [formData, setFormData] = useState({
    name: '', 
    brand: '', // <-- NEW
    model: '', // <-- NEW (Good practice to have)
    price: '', 
    description: ''
  });
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let imageUrl = '';

      if (file) {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const { error: uploadError } = await supabase.storage
          .from('camera-images')
          .upload(fileName, file);

        if (uploadError) throw uploadError;
        
        const { data: urlData } = supabase.storage
          .from('camera-images')
          .getPublicUrl(fileName);
        
        imageUrl = urlData.publicUrl;
      }

      // 2. Include 'brand' and 'model' in the insert
      const { data, error: dbError } = await supabase
        .from('cameras')
        .insert([{
          name: formData.name,
          brand: formData.brand, // <-- FIX: Sending the brand now
          model: formData.model, // <-- FIX: Sending the model now
          price_per_day: parseFloat(formData.price),
          description: formData.description,
          image_url: imageUrl,
          status: 'pending' 
        }])
        .select()
        .single();

      if (dbError) throw dbError;

      if (data) {
        router.push(`/rent-camera/success?id=${data.id}`);
      }

    } catch (error: any) {
      console.error(error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-neutral-50 p-8 border border-neutral-200">
      <h3 className="text-xl font-serif mb-4">List Your Equipment</h3>
      
      {/* Name Input */}
      <input 
        type="text" placeholder="Camera Listing Title (e.g. Sony A7IV Kit)" 
        className="w-full p-3 border outline-none focus:border-black"
        onChange={(e) => setFormData({...formData, name: e.target.value})}
        required
      />

      {/* NEW: Brand & Model Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <select 
          className="p-3 border outline-none focus:border-black bg-white"
          onChange={(e) => setFormData({...formData, brand: e.target.value})}
          required
          defaultValue=""
        >
          <option value="" disabled>Select Brand</option>
          <option value="Canon">Canon</option>
          <option value="Sony">Sony</option>
          <option value="Nikon">Nikon</option>
          <option value="Fujifilm">Fujifilm</option>
          <option value="Blackmagic">Blackmagic</option>
          <option value="Other">Other</option>
        </select>

        <input 
          type="text" placeholder="Model (e.g. A7IV)" 
          className="p-3 border outline-none focus:border-black"
          onChange={(e) => setFormData({...formData, model: e.target.value})}
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
         <input 
          type="number" placeholder="Price per Day (₦)" 
          className="p-3 border outline-none focus:border-black"
          onChange={(e) => setFormData({...formData, price: e.target.value})}
          required
        />
         <input 
          type="file" 
          accept="image/*"
          onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
          className="block w-full text-sm text-gray-500 file:py-2 file:px-4 file:bg-[#C19A6B] file:text-white"
          required
        />
      </div>

      <textarea 
        placeholder="Describe the condition, included lenses, and any faults..."
        className="w-full p-3 border h-32 outline-none focus:border-black"
        onChange={(e) => setFormData({...formData, description: e.target.value})}
        required
      />

      <button 
        type="submit" 
        disabled={loading}
        className="w-full bg-[#C19A6B] text-white py-4 tracking-widest text-sm font-bold disabled:opacity-50"
      >
        {loading ? "UPLOADING..." : "CONTINUE TO NEXT STEP"}
      </button>
    </form>
  );
}