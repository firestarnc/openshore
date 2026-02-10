import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { type, name, email, phone, service, date, time, message } = body;

    // 1. Email to the CLIENT (The Confirmation)
    const clientEmail = await resend.emails.send({
      from: 'Open Shore <bookings@openshorestudios.com>', // Make sure this domain is verified!
      to: [email], // Sends to the user
      subject: `Booking Confirmed: ${service} with Open Shore`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #C19A6B; font-family: serif;">Booking Confirmed</h1>
          <p>Hi ${name},</p>
          <p>Thank you for choosing Open Shore. Your session has been officially booked.</p>
          
          <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Service:</strong> ${service}</p>
            <p><strong>Date:</strong> ${date}</p>
            <p><strong>Time:</strong> ${time}</p>
            <p><strong>Location:</strong> 52b, Airport Road, Benin City</p>
          </div>

          <p>If you need to reschedule, please reply to this email or call us at +234 (706) 644-6442.</p>
          <p>See you soon,<br/>The Open Shore Team</p>
        </div>
      `,
    });

    // 2. Email to ADMIN (Notification for you)
    const adminEmail = await resend.emails.send({
      from: 'Open Shore System <system@openshorestudios.com>>',
      to: ['openshore01@gmail.com'], // <--- PUT YOUR PERSONAL EMAIL HERE
      subject: `New Booking: ${name} - ${date}`,
      html: `
        <h2>New Booking Received</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Service:</strong> ${service}</p>
        <p><strong>Date/Time:</strong> ${date} at ${time}</p>
        <p><strong>Notes:</strong> ${message || 'None'}</p>
      `,
    });

    return NextResponse.json({ success: true, clientEmail, adminEmail });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}