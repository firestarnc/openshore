import { NextResponse } from 'next/server';

import { saveBookingToSupabase } from '@/lib/bookings';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const name = typeof body?.name === 'string' ? body.name.trim() : '';
    const email = typeof body?.email === 'string' ? body.email.trim() : '';
    const phone = typeof body?.phone === 'string' ? body.phone.trim() : '';
    const service = typeof body?.service === 'string' ? body.service.trim() : '';
    const date = typeof body?.date === 'string' ? body.date.trim() : '';
    const time = typeof body?.time === 'string' ? body.time.trim() : '';
    const message = typeof body?.message === 'string' ? body.message : '';

    if (!name || !email || !service || !date || !time) {
      return NextResponse.json({ error: 'Missing required booking fields.' }, { status: 400 });
    }

    await saveBookingToSupabase({
      name,
      email,
      phone: phone || undefined,
      service,
      date,
      time,
      message: message || 'No additional notes.',
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown booking save error';
    console.error('Booking save error:', message);
    return NextResponse.json({ error: 'Failed to save booking.', details: message }, { status: 500 });
  }
}
