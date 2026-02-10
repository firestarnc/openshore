'use client';

import Header from "@/components/header";
import Footer from "@/components/footer";
import { motion } from "framer-motion";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

function ContactForm() {
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  
  // FIX: Initialize state DIRECTLY from the URL
  // This ensures the data is there the exact moment the page opens.
  const [formData, setFormData] = useState(() => {
    const subjectParam = searchParams.get('subject');
    const cameraName = searchParams.get('camera');

    return {
      name: "",
      email: "",
      // If URL says 'rental', set it immediately. Otherwise empty.
      subject: subjectParam === 'rental' ? 'rental' : "",
      // If URL has a camera, set message immediately. Otherwise empty.
      message: cameraName 
        ? `Hi, I am interested in renting the ${cameraName}. Is it available for these dates?` 
        : ""
    };
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      alert("Please fill in all required fields.");
      return;
    }

    setLoading(true);

    try {
      // 1. Save to Database
      const { error } = await supabase.from('contact_messages').insert([{
          name: formData.name,
          email: formData.email,
          subject: formData.subject || "General Inquiry",
          message: formData.message,
          status: 'new'
      }]);

      if (error) throw error;

      // 2. Send Email
      await fetch('/api/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'contact',
          name: formData.name,
          email: formData.email,
          details: `Subject: ${formData.subject}\nMessage: ${formData.message}`
        })
      });

      alert("Message sent successfully! We will be in touch.");
      // Reset form (and clear the rental selection since it's sent)
      setFormData({ name: "", email: "", subject: "", message: "" });

    } catch (error: any) {
      alert("Something went wrong: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="bg-neutral-50 p-8 md:p-12 rounded-lg"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2 text-[#C19A6B]">
            <Label htmlFor="name" className="text-xs uppercase tracking-widest font-medium">Name</Label>
            <Input 
              id="name" placeholder="Your name" 
              className="bg-white border-gray-200 focus:border-[#C19A6B] focus:ring-[#C19A6B]" 
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              required
            />
          </div>
          <div className="space-y-2 text-[#C19A6B]">
            <Label htmlFor="email" className="text-xs uppercase tracking-widest font-medium">Email</Label>
            <Input 
              id="email" type="email" placeholder="your@email.com" 
              className="bg-white border-gray-200 focus:border-[#C19A6B] focus:ring-[#C19A6B]" 
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              required
            />
          </div>
        </div>
        
        <div className="space-y-2 text-[#C19A6B]">
          <Label htmlFor="subject" className="text-xs uppercase tracking-widest font-medium">Subject</Label>
          <Select 
            value={formData.subject} 
            onValueChange={(value) => setFormData(prev => ({...prev, subject: value}))}
          >
            <SelectTrigger className="bg-white border-gray-200 focus:ring-[#C19A6B]">
              <SelectValue placeholder="Select a topic" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="portrait">Portrait Session</SelectItem>
              <SelectItem value="wedding">Wedding Photography</SelectItem>
              <SelectItem value="commercial">Commercial/Brand</SelectItem>
              <SelectItem value="rental">Camera Rental</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2 text-[#C19A6B]">
          <Label htmlFor="message" className="text-xs uppercase tracking-widest font-medium">Message</Label>
          <Textarea 
            id="message" rows={4} 
            className="bg-white border-gray-200 focus:border-[#C19A6B] focus:ring-[#C19A6B] resize-none" 
            placeholder="Tell us about your vision..." 
            value={formData.message}
            onChange={(e) => setFormData({...formData, message: e.target.value})}
            required
          />
        </div>

        <button 
          disabled={loading}
          className="w-full bg-[#C19A6B] text-white py-4 text-sm tracking-widest font-medium hover:bg-neutral-800 transition-colors shadow-lg mt-4 disabled:opacity-70"
        >
          {loading ? "SENDING..." : "SEND MESSAGE"}
        </button>
      </form>
    </motion.div>
  );
}

export default function ContactPage() {
  return (
    <main className="bg-white text-black min-h-screen flex flex-col">
      <Header />

      <section className="pt-32 pb-24 px-6 grow">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            {/* Left: Info */}
            <div>
              <motion.h1 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-6xl text-[#C19A6B] md:text-7xl font-serif mb-8"
              >
                Let's <br /> Connect
              </motion.h1>
              <p className="text-[#C19A6B] text-lg mb-12 max-w-md">
                Have a project in mind or just want to say hi? We'd love to hear from you. Fill out the form or reach out directly.
              </p>
              
              <div className="space-y-8">
                <div>
                  <h4 className="text-xs text-[#C19A6B] font-bold tracking-widest uppercase mb-2">Location</h4>
                  <p className="text-[#C19A6B]">52b, Airport road Benin city</p>
                </div>
                <div>
                  <h4 className="text-xs text-[#C19A6B] font-bold tracking-widest uppercase mb-2">Inquiries</h4>
                  <p className="text-[#C19A6B]">hello@openshore.com</p>
                  <p className="text-[#C19A6B]">+234 (706) 644-6442</p>
                </div>
              </div>
            </div>

            {/* Right: Form wrapped in Suspense */}
            <Suspense fallback={<div>Loading form...</div>}>
              <ContactForm />
            </Suspense>

          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}