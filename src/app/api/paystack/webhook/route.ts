import { NextResponse } from 'next/server';
import crypto from 'crypto';

import { sendBookingEmails } from '@/lib/email';

type PaystackBookingMeta = {
  name?: string;
  email?: string;
  phone?: string;
  packageName?: string;
  duration?: string;
  date?: string;
  time?: string;
  message?: string;
  price?: number | string;
};

type PaystackEventData = {
  reference?: string;
  status?: string;
  metadata?: {
    booking?: PaystackBookingMeta;
  };
};

type PaystackEvent = {
  event?: string;
  data?: PaystackEventData;
};

const processedReferences = new Set<string>();

function toStringSafe(value: unknown) {
  return typeof value === 'string' ? value.trim() : '';
}

function verifyPaystackSignature(rawBody: string, signature: string | null) {
  const secret = process.env.PAYSTACK_SECRET_KEY;

  if (!secret) {
    throw new Error('Missing PAYSTACK_SECRET_KEY environment variable.');
  }

  if (!signature) {
    return false;
  }

  const hash = crypto.createHmac('sha512', secret).update(rawBody).digest('hex');
  return hash === signature;
}

function extractBookingPayload(event: PaystackEvent) {
  const data = event.data;
  const booking = data?.metadata?.booking;

  if (!booking) {
    throw new Error('Missing booking metadata in Paystack event.');
  }

  const name = toStringSafe(booking.name);
  const email = toStringSafe(booking.email);
  const date = toStringSafe(booking.date);
  const time = toStringSafe(booking.time);
  const packageName = toStringSafe(booking.packageName);
  const duration = toStringSafe(booking.duration);
  const phone = toStringSafe(booking.phone);
  const message = toStringSafe(booking.message);

  if (!name || !email || !date || !time || !packageName || !duration) {
    throw new Error('Booking metadata is incomplete.');
  }

  const service = `${packageName} (${duration})`;
  const reference = toStringSafe(data?.reference);
  const priceValue = booking.price;
  const formattedPrice =
    typeof priceValue === 'number'
      ? `₦${priceValue.toLocaleString()}`
      : toStringSafe(priceValue)
        ? `₦${toStringSafe(priceValue)}`
        : 'N/A';

  const bookingMessage = `Payment Ref: ${reference || 'N/A'}\nPackage: ${packageName}\nDuration: ${duration}\nPrice: ${formattedPrice}\n\nUser Notes: ${message || 'None'}`;

  return {
    reference,
    payload: {
      name,
      email,
      phone,
      service,
      date,
      time,
      message: bookingMessage,
    },
  };
}

export async function POST(request: Request) {
  try {
    const rawBody = await request.text();
    const signature = request.headers.get('x-paystack-signature');

    if (!verifyPaystackSignature(rawBody, signature)) {
      return NextResponse.json({ error: 'Invalid Paystack signature.' }, { status: 401 });
    }

    const event = JSON.parse(rawBody) as PaystackEvent;

    if (event.event !== 'charge.success') {
      return NextResponse.json({ received: true, ignored: true, reason: 'Unsupported event type.' });
    }

    if (toStringSafe(event.data?.status).toLowerCase() !== 'success') {
      return NextResponse.json({ received: true, ignored: true, reason: 'Charge not successful.' });
    }

    const { reference, payload } = extractBookingPayload(event);

    if (reference && processedReferences.has(reference)) {
      return NextResponse.json({ received: true, duplicate: true });
    }

    await sendBookingEmails(payload);

    if (reference) {
      processedReferences.add(reference);
    }

    return NextResponse.json({ received: true, emailed: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown webhook error';
    console.error('Paystack webhook error:', message);
    return NextResponse.json({ error: 'Webhook processing failed.', details: message }, { status: 500 });
  }
}
