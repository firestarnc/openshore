import 'server-only';

import { createServerSupabaseClient } from '@/lib/supabase-server';

export type BookingRecordPayload = {
  name: string;
  email: string;
  phone?: string;
  service: string;
  date: string;
  time: string;
  message: string;
};

export async function saveBookingToSupabase(payload: BookingRecordPayload) {
  const supabase = createServerSupabaseClient();

  const { error } = await supabase.from('bookings').insert([
    {
      session_type: payload.service,
      booking_date: payload.date,
      booking_time: payload.time,
      user_name: payload.name,
      user_email: payload.email,
      user_phone: payload.phone || null,
      message: payload.message,
      status: 'paid',
    },
  ]);

  if (error) {
    throw new Error(`Supabase booking insert failed: ${error.message}`);
  }
}
