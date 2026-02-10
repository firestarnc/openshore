'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';


export default function AdminPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('cameras');
  const [cameras, setCameras] = useState<any[]>([]);
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // 1. Security Check
  useEffect(() => {
    const session = localStorage.getItem('admin_session');
    if (!session) {
      router.push('/admin/login');
    } else {
      fetchData();
    }
  }, [activeTab]);

  const fetchData = async () => {
    setLoading(true);
    if (activeTab === 'cameras') {
      const { data } = await supabase.from('cameras').select('*').order('created_at', { ascending: false });
      setCameras(data || []);
    } else {
      const { data } = await supabase.from('bookings').select('*').order('created_at', { ascending: false });
      setBookings(data || []);
    }
    setLoading(false);
  };

  const toggleCameraStatus = async (id: string, currentStatus: string) => {
    const newStatus = currentStatus === 'pending' ? 'approved' : 'pending';
    const { error } = await supabase.from('cameras').update({ status: newStatus }).eq('id', id);
    if (!error) {
      setCameras(cameras.map(c => c.id === id ? { ...c, status: newStatus } : c));
    }
  };

  // 2. NEW: Logout Function
  const handleLogout = () => {
    localStorage.removeItem('admin_session'); // Clear the "key"
    router.push('/admin/login'); // Kick them out
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800 border-green-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <main className="bg-gray-50 text-black min-h-screen">
      
      {/* 3. CUSTOM ADMIN HEADER (Replaces the main site Header) */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="text-xl font-serif font-bold text-[#C19A6B]">Open Shore Admin</span>
            <span className="bg-neutral-100 text-xs px-2 py-1 rounded text-gray-500">v1.0</span>
          </div>
          
          <button 
            onClick={handleLogout}
            className="text-xs font-bold text-red-500 hover:text-red-700 tracking-widest uppercase border border-red-100 bg-red-50 px-4 py-2 rounded hover:bg-red-100 transition-colors"
          >
            Log Out
          </button>
        </div>
      </header>

      <section className="py-10 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-serif">Dashboard</h1>
              <p className="text-gray-500 text-sm mt-1">Overview of your studio operations.</p>
            </div>
            
            <div className="flex gap-2 bg-white p-1 rounded-lg border border-gray-200 shadow-sm">
              <button 
                onClick={() => setActiveTab('cameras')}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
                  activeTab === 'cameras' ? 'bg-[#C19A6B] text-white shadow-sm' : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                Inventory
              </button>
              <button 
                onClick={() => setActiveTab('bookings')}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
                  activeTab === 'bookings' ? 'bg-[#C19A6B] text-white shadow-sm' : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                Bookings
              </button>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            
            {/* INVENTORY TABLE */}
            {activeTab === 'cameras' && (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-gray-50 border-b border-gray-100">
                    <tr>
                      <th className="p-4 font-medium text-gray-500 w-1/4">Camera Details</th>
                      <th className="p-4 font-medium text-gray-500 w-1/4">Owner Contact</th>
                      <th className="p-4 font-medium text-gray-500">Price</th>
                      <th className="p-4 font-medium text-gray-500">Status</th>
                      <th className="p-4 font-medium text-gray-500 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {cameras.map((cam) => (
                      <tr key={cam.id} className="hover:bg-gray-50/50 transition-colors">
                        <td className="p-4">
                          <div className="font-bold text-gray-900">{cam.name}</div>
                          <div className="text-xs text-gray-500 truncate max-w-50">{cam.description}</div>
                        </td>
                        <td className="p-4">
                          {cam.owner_name ? (
                            <>
                              <div className="font-medium">{cam.owner_name}</div>
                              <div className="text-xs text-gray-500">{cam.owner_email}</div>
                              <div className="text-xs text-gray-500">{cam.owner_phone}</div>
                            </>
                          ) : (
                            <span className="text-xs text-red-400 italic">No owner info</span>
                          )}
                        </td>
                        <td className="p-4 font-medium">₦{cam.price_per_day}</td>
                        <td className="p-4">
                          <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${getStatusColor(cam.status)}`}>
                            {cam.status.toUpperCase()}
                          </span>
                        </td>
                        <td className="p-4 text-right">
                          <button 
                            onClick={() => toggleCameraStatus(cam.id, cam.status)}
                            className={`text-xs font-bold px-4 py-2 rounded-lg border transition-all ${
                              cam.status === 'pending'
                                ? 'bg-black text-white border-black hover:bg-gray-800'
                                : 'border-red-200 text-red-600 hover:bg-red-50'
                            }`}
                          >
                            {cam.status === 'pending' ? 'APPROVE' : 'UNPUBLISH'}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* BOOKINGS TABLE */}
            {activeTab === 'bookings' && (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-gray-50 border-b border-gray-100">
                    <tr>
                      <th className="p-4 font-medium text-gray-500">Client</th>
                      <th className="p-4 font-medium text-gray-500">Service</th>
                      <th className="p-4 font-medium text-gray-500">Date & Time</th>
                      <th className="p-4 font-medium text-gray-500">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {bookings.map((booking) => (
                      <tr key={booking.id} className="hover:bg-gray-50/50 transition-colors">
                        <td className="p-4">
                          <div className="font-medium text-gray-900">{booking.user_name}</div>
                          <div className="text-gray-500 text-xs">{booking.user_email}</div>
                          <div className="text-gray-500 text-xs">{booking.user_phone}</div>
                        </td>
                        <td className="p-4 font-medium">{booking.session_type}</td>
                        <td className="p-4">
                          <div>{booking.booking_date}</div> 
                          <div className="text-xs text-gray-400">{booking.booking_time}</div>
                        </td>
                        <td className="p-4">
                          <span className="bg-blue-50 text-blue-700 border border-blue-100 px-2.5 py-0.5 rounded-full text-xs font-bold uppercase">
                            {booking.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

        </div>
      </section>
    </main>
  );
}