import { NextResponse } from 'next/server';
import {
  normalizeError,
  sendAdminReplyEmail,
  sendBookingEmails,
  sendContactEmails,
} from '@/lib/email';

function asString(value: unknown) {
  return typeof value === 'string' ? value : '';
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const type = asString(body?.type) || 'booking';

    if (type === 'booking') {
      const name = asString(body?.name);
      const email = asString(body?.email);
      const phone = asString(body?.phone);
      const service = asString(body?.service);
      const date = asString(body?.date);
      const time = asString(body?.time);
      const message = asString(body?.message);

      if (!name || !email || !service || !date || !time) {
        return NextResponse.json({ error: 'Missing required booking fields.' }, { status: 400 });
      }

      const { adminEmail, clientEmail } = await sendBookingEmails({
        name,
        email,
        phone,
        service,
        date,
        time,
        message,
      });

      return NextResponse.json({ success: true, type, clientEmail, adminEmail });
    }

    if (type === 'contact') {
      const name = asString(body?.name);
      const email = asString(body?.email);
      const subject = asString(body?.subject) || 'General Inquiry';
      const message = asString(body?.message) || asString(body?.details);

      if (!name || !email || !message) {
        return NextResponse.json({ error: 'Missing required contact fields.' }, { status: 400 });
      }

      const { adminEmail, clientEmail } = await sendContactEmails({
        name,
        email,
        subject,
        message,
      });

      return NextResponse.json({ success: true, type, adminEmail, clientEmail });
    }

    if (type === 'admin-reply') {
      const name = asString(body?.name) || 'there';
      const email = asString(body?.email);
      const subject = asString(body?.subject) || 'Reply from Open Shore Studios';
      const message = asString(body?.message);

      if (!email || !message) {
        return NextResponse.json({ error: 'Missing required admin-reply fields.' }, { status: 400 });
      }

      const { replyEmail } = await sendAdminReplyEmail({
        name,
        email,
        subject,
        message,
      });

      return NextResponse.json({ success: true, type, replyEmail });
    }

    return NextResponse.json({ error: 'Unsupported email type.' }, { status: 400 });
  } catch (error) {
    const normalized = normalizeError(error);
    console.error('Email Error:', normalized);
    return NextResponse.json(
      { error: 'Failed to send email.', details: normalized.message },
      { status: 500 }
    );
  }
}
