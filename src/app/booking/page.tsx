'use client';

import { useState } from 'react';
import Header from "@/components/header";
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { format } from 'date-fns';
import { motion } from 'framer-motion';
import { supabase } from '@/lib/supabase';
import { Label } from "@/components/ui/label";
import { ArrowRight } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Link from 'next/link';

const sessionTypes = [
  { id: 'portrait', name: 'Portrait Session', price: '₦35,000', duration: '1 Hour', icons: ["/img/camera.png"] },
  { id: 'wedding', name: 'Wedding Photography', price: '₦250,000', duration: '5 Hours', icons: ["/img/love.png"] },
  { id: 'commercial', name: 'Commercial Work', price: 'Custom', duration: 'Full Day', icons: ["/img/guide-book.png"] },
];

const timeSlots = ["09:00 AM", "11:00 AM", "01:00 PM", "03:00 PM", "05:00 PM"];

export default function BookingPage() {
  const [selectedType, setSelectedType] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState('');
  const [loading, setLoading] = useState(false);

  // FIX 1: Added 'location' to state so we can capture it
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "", 
    message: "",
  });

  const handleBooking = async () => {
    // 1. Validation
    if (!selectedDate || !selectedType || !selectedTime || !formData.name || !formData.email) {
      alert("Please fill in all required fields.");
      return;
    }

    setLoading(true);

    try {
      // FIX 2: Construct a message that includes the location
      // This ensures the location is saved to the DB without changing your database schema
      const fullMessage = `Location: ${formData.location || 'Not specified'}\n\nUser Notes: ${formData.message}`;

      // 2. Save to Supabase
      const { error } = await supabase
        .from('bookings')
        .insert([
          {
            session_type: selectedType,
            booking_date: format(selectedDate, 'yyyy-MM-dd'),
            booking_time: selectedTime,
            user_name: formData.name,
            user_email: formData.email,
            user_phone: formData.phone,
            message: fullMessage, // Saving the combined message
            status: 'pending'
          },
        ]);

      if (error) throw error;

      // 3. Send Email Notification (Resend API)
      // FIX 3: Updated to send 'service', 'phone', and 'message' so the email template works
      const emailResponse = await fetch('/api/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'booking',
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          service: sessionTypes.find(t => t.id === selectedType)?.name || selectedType, // Changed 'details' to 'service' to match API
          date: format(selectedDate, 'yyyy-MM-dd'),
          time: selectedTime,
          message: fullMessage // Sending the full details
        })
      });

      if (!emailResponse.ok) {
        console.error("Email failed to send", await emailResponse.text());
      }

      alert('Booking request received! We sent a confirmation to your email.');
      // Optional: Reset form or redirect
      // window.location.href = '/';
      // REFRESH THE PAGE
      window.location.reload();

    } catch (error: any) {
      console.error('Error saving booking:', error);
      alert('Something went wrong: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="bg-white text-black min-h-screen">
      <Header />
      
      <section className="pt-32 pb-20 px-6">
        <div className="container mx-auto max-w-6xl">
        
          <h1 className="text-[#C19A6B] text-5xl font-serif mb-12 text-center">Book a Session</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* 1. Select Session Type */}
            <div className="space-y-6">
              <h2 className="text-xs font-bold tracking-widest uppercase text-gray-400">01. Select Service</h2>
              <div className="space-y-4 relative">
                {sessionTypes.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setSelectedType(type.id)}
                    className={`
                      w-full text-left p-6 cursor-pointer border-2 rounded-lg
                      transition-all duration-300 ease-out transform
                      hover:scale-[1.03] hover:shadow-xl active:scale-[0.98]

                      ${
                        selectedType === type.id
                          ? "border-neutral-200 bg-neutral-50 scale-[1.05] shadow-2xl"
                          : "border-[#C19A6B] hover:border-neutral-200"
                      }
                    `}
                  >
                    <div className="flex gap-4">
                      <div className="flex flex-col items-center gap-3">
                        {type.icons.map((icon, index) => (
                          <div
                            key={index}
                            className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center"
                          >
                            <img
                              src={icon}
                              alt=""
                              className="h-5 w-5 object-contain"
                            />
                          </div>
                        ))}
                      </div>
                      <div className="flex-1">
                        {selectedType === type.id && (
                          <span className="text-xs px-2 py-1 rounded bg-neutral-50 text-[#C19A6B]">
                            Selected
                          </span>
                        )}
                        <div className="flex justify-between items-center mb-1">
                          <span className="font-medium text-[#C19A6B]">{type.name}</span>
                          <span className="text-sm text-[#C19A6B] font-serif">{type.price}</span>
                        </div>
                        <span className="text-xs text-gray-500">{type.duration}</span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
             {/* NEW: Link to the Pricelist Page */}
                <div className="flex justify-end">
                  <Link 
                    href="/pricelist" 
                    className="group flex items-center gap-2 text-[#C19A6B] text-xs tracking-widest font-bold border-b border-transparent hover:border-[#C19A6B] pb-1 transition-all"
                  >
                    VIEW FULL PRICELIST
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
            </div>

            {/* 2. Select Date */}
            <div className="space-y-6">
              <h2 className="text-xs font-bold tracking-widest uppercase text-gray-400">02. Select Date</h2> 
              <div className="border border-[#C19A6B] p-4 rounded-lg flex justify-center">
                <DayPicker
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  disabled={{ before: new Date() }}
                />
              </div>
            </div>

          {/* 03. Select Time */}
            <div className="space-y-6">
              <h2 className="text-xs font-bold tracking-widest uppercase text-gray-400">03. Select Time</h2>
              
              {/* LOGIC: If Commercial, show "Full Day" or Custom Input. Else, show standard slots. */}
              {selectedType === 'commercial' ? (
                <div className="space-y-4">
                  {/* Option A: Full Day Button */}
                  <button
                  type="button" // Important to prevent form submission
                  onClick={() => {
                    const fullDayText = "Full Day (9:00 AM - 5:00 PM)";
                    // TOGGLE LOGIC: If already selected, clear it (''). Else, select it.
                    if (selectedTime === fullDayText) {
                      setSelectedTime(""); 
                    } else {
                      setSelectedTime(fullDayText);
                    }
                  }}
                  className={`w-full py-4 px-4 text-sm border rounded transition-all flex justify-between items-center group ${
                    selectedTime === "Full Day (9:00 AM - 5:00 PM)"
                      ? 'bg-[#C19A6B] text-white border-[#C19A6B] shadow-md' 
                      : 'bg-white text-[#C19A6B] border-[#C19A6B] hover:bg-[#C19A6B]/5'
                  }`}
                >
                  <span className="font-bold">Full Day Session</span>
                  <span className="opacity-80 text-xs">8 Hours</span>
                </button>

                  {/* Option B: Custom Time Input */}
                  <div>
                    <label className="text-[10px] font-bold tracking-widest text-gray-400 uppercase mb-2 block">
                      Or Enter Custom Time
                    </label>
                    <Input 
                      placeholder="e.g. 10:00 AM - 2:00 PM"
                      className="border-[#C19A6B] focus:ring-[#C19A6B] text-[#C19A6B] placeholder:text-gray-300"
                      // If the user types here, we override the selectedTime state
                      onChange={(e) => setSelectedTime(e.target.value)} 
                    />
                  </div>
                </div>
              ) : (
                /* STANDARD SLOTS (For Portrait/Wedding) */
                <div className="grid grid-cols-2 gap-3">
                  {timeSlots.map((time) => (
                    <button
                      key={time}
                      onClick={() => setSelectedTime(time)}
                      className={`
                        py-3 px-4 text-sm border rounded transition-all font-medium
                        ${
                          selectedTime === time 
                            ? 'bg-[#C19A6B] text-white border-[#C19A6B]' 
                            : 'bg-white text-[#C19A6B] border-[#C19A6B] hover:bg-neutral-50'
                        }
                      `}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* User Details Form - OUTSIDE GRID */}
          <div className="mt-12">
            <h2 className="font-serif text-[#C19A6B] text-2xl font-medium text-foreground mb-6">
              Your Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="text-[#C19A6B] space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                />
              </div>
              <div className="text-[#C19A6B] space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  required
                />
              </div>
              <div className="text-[#C19A6B] space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="(555) 000-0000"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                />
              </div>
              <div className="text-[#C19A6B] space-y-2">
                <Label htmlFor="session-location">Preferred Location</Label>
                {/* FIX 4: Connected Select to state using value and onValueChange */}
                <Select 
                  value={formData.location} 
                  onValueChange={(val) => setFormData({...formData, location: val})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="studio">Our Studio</SelectItem>
                    <SelectItem value="outdoor">Outdoor Location</SelectItem>
                    <SelectItem value="your-location">Your Location</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="md:col-span-2 text-[#C19A6B] space-y-2">
                <Label htmlFor="message">Tell us about your vision</Label>
                <Textarea
                  id="message"
                  placeholder="Share any details about what you're looking for..."
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  rows={4}
                />
              </div>
            </div>
          </div>

          {/* Summary Box - OUTSIDE GRID */}
          {selectedType && selectedDate && selectedTime && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 p-6 bg-[#C19A6B] text-white"
            >
              <h3 className="font-serif text-lg mb-4">Booking Summary</h3>
              <div className="text-sm space-y-2 opacity-80 font-light">
                <p>Service: {sessionTypes.find(t => t.id === selectedType)?.name}</p>
                <p>Date: {format(selectedDate, 'PPP')}</p>
                <p>Time: {selectedTime}</p>
              </div>
              <button 
                onClick={handleBooking}
                disabled={loading}
                className="w-full cursor-pointer mt-6 py-3 bg-white text-[#C19A6B] text-xs tracking-widest font-bold hover:bg-gray-200 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? "PROCESSING..." : "CONFIRM BOOKING"}
              </button>
            </motion.div>
          )}
        </div>
      </section>
       {/* Footer */}
      <footer className="bg-[#C19A6B]  text-black py-20 border-t border-white/10">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            
            {/* Brand */}
            <div className="md:col-span-2">
              <Link href="/" className="text-3xl font-serif font-bold tracking-tighter block mb-6">
                Open Shore
              </Link>
              <p className="text-black font-light max-w-xs">
                Capturing life's most beautiful moments with artistry and intention.
              </p>
            </div>

            {/* Links */}
            <div>
              <h4 className="text-sm font-bold tracking-widest mb-6">EXPLORE</h4>
              <ul className="space-y-4 text-black font-light text-sm">
                <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
                <li><Link href="/portfolio" className="hover:text-white transition-colors">Portfolio</Link></li>
                <li><Link href="/about" className="hover:text-white transition-colors">About</Link></li>
                <li><Link href="/rent-camera" className="hover:text-white transition-colors">Rent a Camera</Link></li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-sm font-bold tracking-widest mb-6">CONTACT</h4>
              <ul className="space-y-4 text-black font-light text-sm">
                
                {/* Email Link */}
                <li>
                  <a 
                    href="mailto:contact@openshorestudios.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:text-white/70 transition-colors"
                  >
                    contact@openshorestudios.com
                  </a>
                </li>

                {/* Phone Link (Usually better to stay in same tab to trigger call) */}
                <li>
                  <a 
                    href="tel:+2347066446441" 
                    className="hover:text-white/70 transition-colors"
                  >
                    +234 (706) 644-6441
                  </a>
                </li>

                {/* Maps Link */}
                <li>
                  <a 
                    href="https://www.google.com/maps/search/?api=1&query=52b+Airport+road+Benin+city" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:text-white/70 transition-colors"
                  >
                    52b, Airport road Benin city
                  </a>
                </li>

              </ul>
            </div>

          </div>

          {/* Copyright */}
          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-xs text-black font-light">
            <p>&copy; {new Date().getFullYear()} Open Shore Studio. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
                <a 
                  href="https://www.instagram.com/open.shore/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-[#C19A6B] transition-colors"
                >
                  Instagram
                </a>
              <Link href="#">Twitter</Link>
              <Link href="#">LinkedIn</Link>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}