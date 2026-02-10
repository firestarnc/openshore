import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { type, name, email, details, date, time } = body;

    // 1. Define Email Content based on "type"
    let subject = "";
    let htmlContent = "";

    if (type === 'contact') {
      subject = `New Contact Inquiry from ${name}`;
      htmlContent = `
        <div style="font-family: sans-serif; padding: 20px;">
          <h2 style="color: #C19A6B;">New Message Received</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <div style="background: #f4f4f4; padding: 15px; border-radius: 5px; margin-top: 10px;">
            <p><strong>Details:</strong></p>
            <p style="white-space: pre-wrap;">${details}</p>
          </div>
        </div>
      `;
    } else if (type === 'booking') {
      subject = `New Booking Request: ${details} (${date})`;
      htmlContent = `
        <div style="font-family: sans-serif; padding: 20px;">
          <h2 style="color: #C19A6B;">New Session Booked!</h2>
          <p><strong>Client:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Session Type:</strong> ${details}</p>
          <p><strong>Date:</strong> ${date}</p>
          <p><strong>Time:</strong> ${time}</p>
        </div>
      `;
    }

    // 2. Send the Email (To YOU)
    const data = await resend.emails.send({
      from: 'Open Shore <onboarding@resend.dev>', // Change this once you verify your domain
      to: ['firestar.nc@gmail.com'], // <--- PUT YOUR ACTUAL EMAIL HERE
      subject: subject,
      html: htmlContent,
    });

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error });
  }
}