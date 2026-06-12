import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const ADMIN_NOTIFICATION_EMAIL = 'openshore01@gmail.com';
const BOOKINGS_FROM = 'Open Shore Studios <bookings@openshorestudios.com>';
const CONTACT_FROM = 'Open Shore Studios <contact@openshorestudios.com>';

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

      const adminEmail = await resend.emails.send({
        from: BOOKINGS_FROM,
        to: [ADMIN_NOTIFICATION_EMAIL],
        subject: `NEW STUDIO BOOKING: ${name}`,
        html: `
          <h1>New Studio Rental Confirmed!</h1>
          <p><strong>Client:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone || 'N/A'}</p>
          <hr />
          <p><strong>Package:</strong> ${service}</p>
          <p><strong>Date:</strong> ${date}</p>
          <p><strong>Time:</strong> ${time}</p>
          <p><strong>Location:</strong> Open Shore Studios (Indoor)</p>
          <hr />
          <p><strong>Notes:</strong> ${message || 'None'}</p>
        `,
      });

      const clientEmail = await resend.emails.send({
        from: BOOKINGS_FROM,
        to: [email],
        subject: 'Booking Confirmed - Open Shore Studios',
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
            <h1 style="color: #C19A6B; text-align: center;">Booking Confirmed</h1>
            <p>Hello ${name},</p>
            <p>Thank you for choosing Open Shore Studios. Your studio session has been successfully booked.</p>
            
            <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="margin-top: 0; color: #C19A6B;">Session Details</h3>
              <p><strong>Package:</strong> ${service}</p>
              <p><strong>Date:</strong> ${date}</p>
              <p><strong>Time:</strong> ${time}</p>
              <p><strong>Address:</strong> 52b, Airport road, Benin city</p>
            </div>

            <div style="border-left: 4px solid #C19A6B; padding-left: 15px; margin: 20px 0; color: #555;">
              <strong>Studio Guidelines:</strong><br/>
              Please arrive 10 minutes before your scheduled time.
              <br/>Note: This booking is strictly for <strong>Studio Photography</strong> only.
            </div>

            <p>If you have any questions or need to reschedule, contact us at <a href="tel:+2347064426441" style="color: #C19A6B;">+234 (706) 442-6441</a>.</p>
            <p>Warm regards,<br/>The Open Shore Team</p>
          </div>
        `,
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

      const adminEmail = await resend.emails.send({
        from: CONTACT_FROM,
        to: [ADMIN_NOTIFICATION_EMAIL],
        subject: `NEW CONTACT MESSAGE: ${subject}`,
        replyTo: email,
        html: `
          <h1>New Contact Message</h1>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <hr />
          <p style="white-space: pre-wrap;"><strong>Message:</strong><br/>${message}</p>
        `,
      });

      const clientEmail = await resend.emails.send({
        from: CONTACT_FROM,
        to: [email],
        subject: 'We received your message - Open Shore Studios',
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
            <h1 style="color: #C19A6B;">Thank you for contacting Open Shore Studios</h1>
            <p>Hello ${name},</p>
            <p>We have received your message and a team member will reach out to you soon.</p>
            <div style="background-color: #f9f9f9; padding: 16px; border-radius: 8px; margin: 16px 0;">
              <p><strong>Subject:</strong> ${subject}</p>
              <p style="white-space: pre-wrap;"><strong>Your Message:</strong><br/>${message}</p>
            </div>
            <p>You can also reach us directly at contact@openshorestudios.com or +234 (706) 442-6441.</p>
            <p>Warm regards,<br/>Open Shore Studios</p>
          </div>
        `,
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

      const replyEmail = await resend.emails.send({
        from: CONTACT_FROM,
        to: [email],
        subject,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
            <p>Hello ${name},</p>
            <p style="white-space: pre-wrap;">${message}</p>
            <p style="margin-top: 24px;">Best regards,<br/>Open Shore Studios<br/>contact@openshorestudios.com</p>
          </div>
        `,
      });

      return NextResponse.json({ success: true, type, replyEmail });
    }

    return NextResponse.json({ error: 'Unsupported email type.' }, { status: 400 });
  } catch (error) {
    console.error('Email Error:', error);
    return NextResponse.json({ error: 'Failed to send email.' }, { status: 500 });
  }
}
