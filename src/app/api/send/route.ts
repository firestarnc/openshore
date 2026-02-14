import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, service, date, time, message } = body;

    // 1. Email to STUDIO OWNER (You)
    // Sending to your personal Gmail as requested in the old code
    const adminEmail = await resend.emails.send({
      from: 'Open Shore System <bookings@openshorestudios.com>', 
      to: ['openshore01@gmail.com'], // <--- Restored your working email
      subject: `NEW STUDIO BOOKING: ${name}`,
      html: `
        <h1>New Studio Rental Confirmed!</h1>
        <p><strong>Client:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <hr />
        <p><strong>Package:</strong> ${service}</p>
        <p><strong>Date:</strong> ${date}</p>
        <p><strong>Time:</strong> ${time}</p>
        <p><strong>Location:</strong> Open Shore Studios (Indoor)</p>
        <hr />
        <p><strong>Notes:</strong> ${message}</p>
      `,
    });

    // 2. Email to CLIENT (Receipt)
    // Sending from your verified domain
    const clientEmail = await resend.emails.send({
      from: 'Open Shore Studios <bookings@openshorestudios.com>', 
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

          <p>If you have any questions or need to reschedule, please contact us at <a href="tel:+2347066446441" style="color: #C19A6B;">+234 (706) 644-6441</a>.</p>
          
          <p>Warm regards,<br/>The Open Shore Team</p>
        </div>
      `,
    });

    // Return success for both emails (matching your old code style)
    return NextResponse.json({ success: true, clientEmail, adminEmail });

  } catch (error) {
    console.error("Email Error:", error);
    return NextResponse.json({ error }, { status: 500 });
  }
}