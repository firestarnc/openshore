'use client';

import { useState } from 'react';
import Header from "@/components/header";
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { format } from 'date-fns';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '@/lib/supabase';
import { Label } from "@/components/ui/label";
import { Check, Users, Video, Clock, ArrowRight } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Link from 'next/link';

// --- CONFIGURATION: New Package Structure ---
const packages = [
  { 
    id: 'basic', 
    name: 'Basic Package', 
    icon: <Users className="w-5 h-5" />,
    features: ["1 Section of choice", "Maximum 4 People", "No heavy equipment showing"],
    options: [
      { id: 'basic-30', duration: '30 Mins', price: 20000, label: '30 Mins' },
      { id: 'basic-60', duration: '1 Hour', price: 35000, label: '1 Hour' },
    ]
  },
  { 
    id: 'standard', 
    name: 'Standard Package', 
    icon: <Users className="w-5 h-5" />,
    features: ["3 Sections of choice", "Maximum 6 People", "No heavy equipment showing"],
    options: [
      { id: 'std-1', duration: '1 Hour', price: 60000, label: '1 Hour' },
      { id: 'std-2', duration: '2 Hours', price: 110000, label: '2 Hours' },
    ]
  },
  { 
    id: 'premium', 
    name: 'Premium Package', 
    icon: <Users className="w-5 h-5" />,
    features: ["Full Access", "Maximum 10 People", "No heavy equipment showing"],
    options: [
      { id: 'prem-1', duration: '1 Hour', price: 85000, label: '1 Hour' },
      { id: 'prem-2', duration: '2 Hours', price: 150000, label: '2 Hours' },
    ]
  },
  { 
    id: 'video', 
    name: 'Video Production', 
    icon: <Video className="w-5 h-5" />,
    features: ["Full Studio Access", "Continuous Lighting", "Green Screen Access"],
    options: [
      { id: 'vid-half', duration: 'Half Day (5 Hours)', price: 250000, label: 'Half Day' },
      { id: 'vid-full', duration: 'Full Day (10 Hours)', price: 400000, label: 'Full Day' },
    ]
  },
];

const timeSlots = [
  "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", 
  "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM", 
  "05:00 PM", "06:00 PM"
];

export default function BookingClient() {
  const [selectedPackageId, setSelectedPackageId] = useState('');
  const [selectedOptionId, setSelectedOptionId] = useState(''); 
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState('');
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const getSelectedPackage = () => packages.find(p => p.id === selectedPackageId);
  const getSelectedOption = () => getSelectedPackage()?.options.find(o => o.id === selectedOptionId);

  const getPriceInKobo = () => {
    const option = getSelectedOption();
    return option ? option.price * 100 : 0;
  };

  const processBooking = async (reference: any, snapshotData: any) => {
    if (reference.reference !== 'COMMERCIAL-QUOTE') {
       alert(`Payment Verified! Ref: ${reference.reference}. Saving booking...`);
    }
    
    setLoading(true);

    try {
      const fullMessage = `Payment Ref: ${reference.reference || 'N/A'}\nPackage: ${snapshotData.packageName}\nDuration: ${snapshotData.duration}\nPrice: ₦${snapshotData.price}\n\nUser Notes: ${snapshotData.message}`;
      
      console.log("Saving to Supabase...", snapshotData);

      const { data, error } = await supabase
        .from('bookings')
        .insert([
          {
            session_type: `${snapshotData.packageName} - ${snapshotData.duration}`,
            booking_date: format(snapshotData.date, 'yyyy-MM-dd'),
            booking_time: snapshotData.time,
            user_name: snapshotData.name,
            user_email: snapshotData.email,
            user_phone: snapshotData.phone,
            message: fullMessage,
            status: 'paid'
          },
        ])
        .select(); 

      if (error) {
        console.error("Supabase Error:", error); 
        throw new Error(`Database Error: ${error.message}`);
      }

      const emailRes = await fetch('/api/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'booking',
          name: snapshotData.name,
          email: snapshotData.email,
          phone: snapshotData.phone,
          service: `${snapshotData.packageName} (${snapshotData.duration})`,
          date: format(snapshotData.date, 'yyyy-MM-dd'),
          time: snapshotData.time,
          message: fullMessage
        })
      });
      
      if (!emailRes.ok) console.warn("Email warning:", await emailRes.text());

      alert('SUCCESS! Studio Booking Confirmed.');
      window.location.reload();

    } catch (error: any) {
      console.error('FULL ERROR:', error);
      alert('Error: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleBookingTrigger = () => {
    if (!selectedDate || !selectedPackageId || !selectedOptionId || !selectedTime || !formData.name || !formData.email || !formData.phone) {
      alert("Please fill in all required fields: Package, Duration, Date, Time, and Details.");
      return;
    }

    const pkg = getSelectedPackage();
    const opt = getSelectedOption();
    const amount = getPriceInKobo();

    const currentData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: formData.message,
        packageName: pkg?.name,
        duration: opt?.duration,
        price: opt?.price,
        date: selectedDate,
        time: selectedTime
    };

    // @ts-ignore
    if (typeof window.PaystackPop === 'undefined') {
      alert("Paystack connection failed. Please refresh and try again.");
      return;
    }

    // @ts-ignore
    const handler = window.PaystackPop.setup({
      key: process.env.NEXT_PUBLIC_PAYSTACK_KEY,
      email: currentData.email,
      amount: amount,
      metadata: {
        custom_fields: [
            { display_name: "Package", variable_name: "package", value: currentData.packageName },
            { display_name: "Duration", variable_name: "duration", value: currentData.duration }
        ]
      },
      callback: (transaction: any) => {
        processBooking(transaction, currentData);
      },
      onClose: () => {
        alert("Payment cancelled.");
      }
    });

    handler.openIframe();
  };

  return (
    <main className="bg-white text-black min-h-screen">
      <Header />
      
      <section className="pt-32 pb-20 px-6">
        <div className="container mx-auto max-w-6xl">
        
          <h1 className="text-[#C19A6B] text-5xl font-serif mb-12 text-center">Book a Session</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* 1. Select Package & Duration */}
            <div className="space-y-8">
              {/* Package Selection */}
              <div className="space-y-4">
                <h2 className="text-xs font-bold tracking-widest uppercase text-gray-400">01. Select Package</h2>
                <div className="grid grid-cols-1 gap-4">
                  {packages.map((pkg) => (
                    <button
                      key={pkg.id}
                      onClick={() => {
                          setSelectedPackageId(pkg.id);
                          setSelectedOptionId(''); 
                      }}
                      className={`
                        w-full text-left p-5 cursor-pointer border-2 rounded-lg relative overflow-hidden
                        transition-all duration-300 ease-out 
                        ${
                          selectedPackageId === pkg.id
                            ? "border-[#C19A6B] bg-[#C19A6B]/5 shadow-lg"
                            : "border-gray-100 hover:border-[#C19A6B]/50"
                        }
                      `}
                    >
                      <div className="flex justify-between items-start mb-3">
                         <div className="flex items-center gap-2 text-[#C19A6B]">
                            {pkg.icon}
                            <span className="font-serif font-bold text-lg">{pkg.name}</span>
                         </div>
                         {selectedPackageId === pkg.id && <Check className="w-5 h-5 text-[#C19A6B]" />}
                      </div>
                      
                      <ul className="space-y-1">
                        {pkg.features.map((feature, idx) => (
                            <li key={idx} className="text-xs text-gray-500 flex items-center gap-2">
                                <span className="w-1 h-1 rounded-full bg-gray-300" />
                                {feature}
                            </li>
                        ))}
                      </ul>
                    </button>
                  ))}
                </div>

                {/* ADDED: View Pricelist Button */}
                <div className="flex justify-end mt-2">
                  <Link 
                    href="/pricelist" 
                    className="group flex items-center gap-2 text-[#C19A6B] text-xs tracking-widest font-bold border-b border-transparent hover:border-[#C19A6B] pb-1 transition-all"
                  >
                    VIEW FULL PRICELIST
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>

              {/* Price/Duration Selection */}
              <AnimatePresence>
                  {selectedPackageId && (
                    <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="space-y-4 pt-4 border-t border-dashed border-gray-200"
                    >
                        <h2 className="text-xs font-bold tracking-widest uppercase text-[#C19A6B]"> Select Duration</h2>
                        <div className="grid grid-cols-1 gap-3">
                            {getSelectedPackage()?.options.map((opt) => (
                                <button
                                    key={opt.id}
                                    onClick={() => setSelectedOptionId(opt.id)}
                                    className={`
                                        py-3 px-4 text-sm border rounded transition-all font-medium flex justify-between items-center
                                        ${
                                            selectedOptionId === opt.id 
                                            ? 'bg-[#C19A6B] text-white border-[#C19A6B] shadow-md' 
                                            : 'bg-white text-[#C19A6B] border-[#C19A6B] hover:bg-[#C19A6B]/5'
                                        }
                                    `}
                                >
                                    <div className="flex items-center gap-2">
                                        <Clock className="w-4 h-4 opacity-70" />
                                        <span>{opt.label}</span>
                                    </div>
                                    <span className="font-bold">₦{opt.price.toLocaleString()}</span>
                                </button>
                            ))}
                        </div>
                    </motion.div>
                  )}
              </AnimatePresence>
            </div>

            {/* 2. Select Date & Time */}
            <div className="space-y-8">
              <div className="space-y-4">
                 <h2 className="text-xs font-bold tracking-widest uppercase text-gray-400">02. Select Date</h2> 
                 <div className="border border-[#C19A6B]/30 p-4 rounded-lg flex justify-center bg-white shadow-sm">
                    <DayPicker
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    disabled={{ before: new Date() }}
                    modifiersStyles={{
                        selected: { backgroundColor: '#C19A6B', color: 'white' }
                    }}
                    />
                 </div>
              </div>
                    {/* 03. Select Time */}
              <div className="space-y-4">
                <h2 className="text-xs font-bold tracking-widest uppercase text-gray-400">03. Select Start Time</h2>
                <div className="grid grid-cols-3 gap-2">
                  {timeSlots.map((time) => (
                    <button
                      key={time}
                      onClick={() => setSelectedTime(time)}
                      className={`
                        py-2 px-1 text-xs border rounded transition-all font-medium
                        ${
                          selectedTime === time 
                          ? 'bg-[#C19A6B] text-white border-[#C19A6B] shadow-md' 
                          : 'bg-white text-[#C19A6B] border-[#C19A6B] hover:bg-[#C19A6B]/5'
                        }
                      `}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* 3. User Details & Payment */}
            <div className="space-y-8">
                <h2 className="text-xs font-bold tracking-widest uppercase text-gray-400">04. Your Details</h2>
                
                <div className="space-y-4 bg-gray-50 p-6 rounded-xl border border-gray-100">
                    <div className="space-y-2">
                        <Label className="text-xs uppercase text-[#C19A6B] font-bold">Full Name</Label>
                        <Input 
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="bg-white border-gray-200 focus:border-[#C19A6B]"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label className="text-xs uppercase text-[#C19A6B] font-bold">Email Address</Label>
                        <Input 
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="bg-white border-gray-200 focus:border-[#C19A6B]"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label className="text-xs uppercase text-[#C19A6B] font-bold">Phone Number</Label>
                        <Input 
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            className="bg-white border-gray-200 focus:border-[#C19A6B]"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label className="text-xs uppercase text-[#C19A6B] font-bold">Notes / Requirements</Label>
                        <Textarea 
                            placeholder="Any specific requests?"
                            value={formData.message}
                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                            className="bg-white border-gray-200 focus:border-[#C19A6B]"
                        />
                    </div>
                </div>

                <motion.div 
                    layout
                    className="bg-[#1a1a1a] text-white p-6 rounded-xl shadow-2xl"
                >
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="font-serif text-xl">Total</h3>
                        <span className="text-2xl font-bold text-[#C19A6B]">
                            ₦{getSelectedOption()?.price.toLocaleString() || '0'}
                        </span>
                    </div>

                    <div className="space-y-2 text-sm text-gray-400 mb-6 font-light">
                        <div className="flex justify-between">
                            <span>Package:</span>
                            <span className="text-white">{getSelectedPackage()?.name || '-'}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Option:</span>
                            <span className="text-white">{getSelectedOption()?.label || '-'}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Date:</span>
                            <span className="text-white">{selectedDate ? format(selectedDate, 'PPP') : '-'}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Time:</span>
                            <span className="text-white">{selectedTime || '-'}</span>
                        </div>
                    </div>

                    <button 
                        onClick={handleBookingTrigger} 
                        disabled={loading || !selectedPackageId || !selectedOptionId}
                        className="w-full py-4 bg-[#C19A6B] text-white font-bold tracking-widest rounded hover:bg-[#a68257] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? "PROCESSING..." : "PAY & CONFIRM BOOKING"}
                    </button>
                    
                    <p className="text-[10px] text-center mt-4 text-gray-500">
                        Strictly Studio Photography. No Outdoor sessions.
                    </p>
                </motion.div>

            </div>
          </div>
        </div>
      </section>

      <footer className="bg-[#C19A6B] text-black py-20 border-t border-white/10">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="md:col-span-2">
              <Link href="/" className="text-3xl font-serif font-bold tracking-tighter block mb-6">
                Open Shore
              </Link>
              <p className="text-black font-light max-w-xs">
                Capturing life's most beautiful moments with artistry and intention.
              </p>
            </div>
            <div>
              <h4 className="text-sm font-bold tracking-widest mb-6">EXPLORE</h4>
              <ul className="space-y-4 text-black font-light text-sm">
                <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
                <li><Link href="/portfolio" className="hover:text-white transition-colors">Portfolio</Link></li>
                <li><Link href="/about" className="hover:text-white transition-colors">About</Link></li>
                <li><Link href="/rent-camera" className="hover:text-white transition-colors">Rent a Camera</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-bold tracking-widest mb-6">CONTACT</h4>
              <ul className="space-y-4 text-black font-light text-sm">
                <li><a href="mailto:contact@openshorestudios.com" className="hover:text-white/70">contact@openshorestudios.com</a></li>
                <li><a href="tel:+2347066446441" className="hover:text-white/70">+234 (706) 644-6441</a></li>
                <li><span className="opacity-70">52b, Airport road Benin city</span></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-white/10 flex justify-between items-center text-xs text-black font-light">
            <p>© {new Date().getFullYear()} Open Shore Studio. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}