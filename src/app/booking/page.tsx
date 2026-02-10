'use client';

import { useState } from 'react';
import Header from "@/components/header";
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { format } from 'date-fns';
import { motion } from 'framer-motion';
import { supabase } from '@/lib/supabase';
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
import Link from 'next/link';

// Data for session types
const sessionTypes = [
  { id: 'portrait', name: 'Portrait Session', price: '₦25,000', duration: '1.5 Hours', icons: ["/img/camera.png"] },
  { id: 'wedding', name: 'Wedding Photography', price: '₦250,000', duration: '8 Hours', icons: ["/img/love.png"] },
  { id: 'commercial', name: 'Commercial Work', price: 'Custom', duration: 'Full Day', icons: ["/img/guide-book.png"] },
];

const timeSlots = ["09:00 AM", "11:00 AM", "01:00 PM", "03:00 PM", "05:00 PM"];

export default function BookingPage() {
  const [selectedType, setSelectedType] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState('');
  const [loading, setLoading] = useState(false);

  // Added 'location' to formData
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
            message: `Location: ${formData.location || 'Studio'}\n\n${formData.message}`, // Combine location into message or add column if you prefer
            status: 'pending'
          },
        ]);

      if (error) throw error;

      // 3. Send Email Notification (Resend API)
      const emailResponse = await fetch('/api/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'booking',
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          service: sessionTypes.find(t => t.id === selectedType)?.name || selectedType,
          date: format(selectedDate, 'yyyy-MM-dd'),
          time: selectedTime,
          message: `Location: ${formData.location}\nNotes: ${formData.message}`
        })
      });

      if (!emailResponse.ok) {
        console.error("Email failed to send", await emailResponse.text());
      }

      alert('Booking request received! We sent a confirmation to your email.');
      // Reset form
      setSelectedType('');
      setSelectedTime('');
      setFormData({ name: "", email: "", phone: "", location: "", message: "" });

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
            
            {/* 01. Select Session Type */}
            <div className="space-y-6">
              <h2 className="text-xs font-bold tracking-widest uppercase text-gray-400">01. Select Service</h2>
              <div className="space-y-4">
                {sessionTypes.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setSelectedType(type.id)}
                    className={`
                      w-full text-left p-6 cursor-pointer border rounded-lg
                      transition-all duration-300 ease-out transform
                      hover:shadow-lg active:scale-[0.98]
                      ${
                        selectedType === type.id
                          ? "border-[#C19A6B] bg-[#C19A6B]/5 shadow-md scale-[1.02]"
                          : "border-gray-200 hover:border-[#C19A6B]"
                      }
                    `}
                  >
                    <div className="flex gap-4 items-center">
                      {/* Icons (Assuming you have these images in public/img) */}
                      <div className="flex flex-col gap-2">
                         {type.icons.map((icon, i) => (
                           <div key={i} className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                              {/* Using simplified img tag for icons */}
                              <img src={icon} alt="icon" className="w-4 h-4 opacity-60" />
                           </div>
                         ))}
                      </div>

                      <div className="flex-1">
                        <div className="flex justify-between items-center mb-1">
                          <span className={`font-serif font-medium ${selectedType === type.id ? 'text-[#C19A6B]' : 'text-black'}`}>
                            {type.name}
                          </span>
                          <span className="text-sm font-bold text-[#C19A6B]">{type.price}</span>
                        </div>
                        <span className="text-xs text-gray-400 block">{type.duration}</span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* 02. Select Date */}
            <div className="space-y-6">
              <h2 className="text-xs font-bold tracking-widest uppercase text-gray-400">02. Select Date</h2> 
              <div className="border border-gray-200 p-4 rounded-lg flex justify-center bg-white shadow-sm">
                <DayPicker
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  disabled={{ before: new Date() }}
                  modifiersClassNames={{
                    selected: 'bg-[#C19A6B] text-white hover:bg-[#C19A6B]',
                    today: 'text-[#C19A6B] font-bold'
                  }}
                  styles={{
                    head_cell: { color: '#C19A6B' },
                    day: { borderRadius: '50%' }
                  }}
                />
              </div>
            </div>

            {/* 03. Select Time */}
            <div className="space-y-6">
              <h2 className="text-xs font-bold tracking-widest uppercase text-gray-400">03. Select Time</h2>
              <div className="grid grid-cols-2 gap-3">
                {timeSlots.map((time) => (
                  <button
                    key={time}
                    onClick={() => setSelectedTime(time)}
                    className={`py-3 px-4 text-sm border rounded transition-all ${
                      selectedTime === time 
                        ? 'bg-[#C19A6B] text-white border-[#C19A6B] shadow-md' 
                        : 'bg-white text-gray-600 border-gray-200 hover:border-[#C19A6B]'
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* User Details Form */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-16 pt-16 border-t border-gray-100"
          >
            <h2 className="font-serif text-[#C19A6B] text-3xl mb-8">Your Details</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-[#C19A6B]">Full Name</Label>
                <Input
                  id="name"
                  placeholder="Your name"
                  className="border-gray-200 focus:border-[#C19A6B] focus:ring-[#C19A6B]"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-[#C19A6B]">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  className="border-gray-200 focus:border-[#C19A6B] focus:ring-[#C19A6B]"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="text-[#C19A6B]">Phone</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="(555) 000-0000"
                  className="border-gray-200 focus:border-[#C19A6B] focus:ring-[#C19A6B]"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="session-location" className="text-[#C19A6B]">Preferred Location</Label>
                <Select 
                  value={formData.location} 
                  onValueChange={(value) => setFormData({ ...formData, location: value })}
                >
                  <SelectTrigger className="border-gray-200 focus:ring-[#C19A6B]">
                    <SelectValue placeholder="Select location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="studio">Our Studio (Airport Road)</SelectItem>
                    <SelectItem value="outdoor">Outdoor / On-Site</SelectItem>
                    <SelectItem value="undecided">Undecided</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="md:col-span-2 space-y-2">
                <Label htmlFor="message" className="text-[#C19A6B]">Tell us about your vision</Label>
                <Textarea
                  id="message"
                  placeholder="Share any details about what you're looking for..."
                  className="border-gray-200 focus:border-[#C19A6B] focus:ring-[#C19A6B]"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={4}
                />
              </div>
            </div>
          </motion.div>

          {/* Booking Summary & Action */}
          {selectedType && selectedDate && selectedTime && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-12 p-8 bg-[#C19A6B] text-white rounded-lg shadow-xl"
            >
              <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                <div>
                  <h3 className="font-serif text-2xl mb-2">Ready to Book?</h3>
                  <div className="text-white/90 font-light space-y-1">
                    <p><strong>Service:</strong> {sessionTypes.find(t => t.id === selectedType)?.name}</p>
                    <p><strong>When:</strong> {format(selectedDate, 'PPPP')} at {selectedTime}</p>
                    <p><strong>Where:</strong> {formData.location ? (formData.location === 'studio' ? 'Our Studio' : 'Outdoor/On-Site') : 'Not selected'}</p>
                  </div>
                </div>

                <button 
                  onClick={handleBooking}
                  disabled={loading}
                  className="w-full md:w-auto px-8 py-4 bg-white text-[#C19A6B] text-sm tracking-widest font-bold hover:bg-neutral-100 transition-colors shadow-lg disabled:opacity-70 disabled:cursor-not-allowed rounded"
                >
                  {loading ? "PROCESSING..." : "CONFIRM BOOKING"}
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </section>

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
                <li>hello@openshore.com</li>
                <li>+234 (706) 644-6441</li>
                <li>52b, Airport road Benin city</li>
              </ul>
            </div>
          </div>

          {/* Copyright */}
          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-xs text-black font-light">
            <p>&copy; {new Date().getFullYear()} Open Shore Studio. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <Link href="https://www.instagram.com/open.shore/">Instagram</Link>
              <Link href="#">Twitter</Link>
              <Link href="#">LinkedIn</Link>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}