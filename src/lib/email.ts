import 'server-only';

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const ADMIN_NOTIFICATION_EMAIL = 'openshore01@gmail.com';
const BOOKINGS_FROM = 'Open Shore Studios <bookings@openshorestudios.com>';
const CONTACT_FROM = 'Open Shore Studios <contact@openshorestudios.com>';

type BookingEmailPayload = {
  name: string;
  email: string;
  phone?: string;
  service: string;
  date: string;
  time: string;
  message?: string;
};

type ContactEmailPayload = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

type AdminReplyPayload = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

function getErrorMessage(error: unknown) {
  if (error instanceof Error) return error.message;
  if (typeof error === 'string') return error;

  try {
    return JSON.stringify(error);
  } catch {
    return 'Unknown error';
  }
}

async function sendEmailOrThrow(payload: Parameters<typeof resend.emails.send>[0], label: string) {
  const result = await resend.emails.send(payload);

  if (result.error) {
    throw new Error(`Resend ${label} failed: ${getErrorMessage(result.error)}`);
  }

  return result.data;
}

export function normalizeError(error: unknown) {
  if (error instanceof Error) {
    return { name: error.name, message: error.message };
  }

  return { name: 'UnknownError', message: getErrorMessage(error) };
}

export async function sendBookingEmails(payload: BookingEmailPayload) {
  const adminEmail = await sendEmailOrThrow(
    {
      from: BOOKINGS_FROM,
      to: [ADMIN_NOTIFICATION_EMAIL],
      subject: `NEW STUDIO BOOKING: ${payload.name}`,
      html: `
        <h1>New Studio Rental Confirmed!</h1>
        <p><strong>Client:</strong> ${payload.name}</p>
        <p><strong>Email:</strong> ${payload.email}</p>
        <p><strong>Phone:</strong> ${payload.phone || 'N/A'}</p>
        <hr />
        <p><strong>Package:</strong> ${payload.service}</p>
        <p><strong>Date:</strong> ${payload.date}</p>
        <p><strong>Time:</strong> ${payload.time}</p>
        <p><strong>Location:</strong> Open Shore Studios (Indoor)</p>
        <hr />
        <p><strong>Notes:</strong> ${payload.message || 'None'}</p>
      `,
    },
    'admin booking email'
  );

  const clientEmail = await sendEmailOrThrow(
    {
      from: BOOKINGS_FROM,
      to: [payload.email],
      subject: 'Booking Confirmed - Open Shore Studios',
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
          <h1 style="color: #C19A6B; text-align: center;">Booking Confirmed</h1>
          <p>Hello ${payload.name},</p>
          <p>Thank you for choosing Open Shore Studios. Your studio session has been successfully booked.</p>

          <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #C19A6B;">Session Details</h3>
            <p><strong>Package:</strong> ${payload.service}</p>
            <p><strong>Date:</strong> ${payload.date}</p>
            <p><strong>Time:</strong> ${payload.time}</p>
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
    },
    'client booking email'
  );

  return { adminEmail, clientEmail };
}

export async function sendContactEmails(payload: ContactEmailPayload) {
  const adminEmail = await sendEmailOrThrow(
    {
      from: CONTACT_FROM,
      to: [ADMIN_NOTIFICATION_EMAIL],
      subject: `NEW CONTACT MESSAGE: ${payload.subject}`,
      replyTo: payload.email,
      html: `
        <h1>New Contact Message</h1>
        <p><strong>Name:</strong> ${payload.name}</p>
        <p><strong>Email:</strong> ${payload.email}</p>
        <p><strong>Subject:</strong> ${payload.subject}</p>
        <hr />
        <p style="white-space: pre-wrap;"><strong>Message:</strong><br/>${payload.message}</p>
      `,
    },
    'admin contact email'
  );

  const clientEmail = await sendEmailOrThrow(
    {
      from: CONTACT_FROM,
      to: [payload.email],
      subject: 'We received your message - Open Shore Studios',
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
          <h1 style="color: #C19A6B;">Thank you for contacting Open Shore Studios</h1>
          <p>Hello ${payload.name},</p>
          <p>We have received your message and a team member will reach out to you soon.</p>
          <div style="background-color: #f9f9f9; padding: 16px; border-radius: 8px; margin: 16px 0;">
            <p><strong>Subject:</strong> ${payload.subject}</p>
            <p style="white-space: pre-wrap;"><strong>Your Message:</strong><br/>${payload.message}</p>
          </div>
          <p>You can also reach us directly at contact@openshorestudios.com or +234 (706) 442-6441.</p>
          <p>Warm regards,<br/>Open Shore Studios</p>
        </div>
      `,
    },
    'client contact email'
  );

  return { adminEmail, clientEmail };
}

export async function sendAdminReplyEmail(payload: AdminReplyPayload) {
  const replyEmail = await sendEmailOrThrow(
    {
      from: CONTACT_FROM,
      to: [payload.email],
      subject: payload.subject,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
          <p>Hello ${payload.name},</p>
          <p style="white-space: pre-wrap;">${payload.message}</p>
          <p style="margin-top: 24px;">Best regards,<br/>Open Shore Studios<br/>contact@openshorestudios.com</p>
        </div>
      `,
    },
    'admin reply email'
  );

  return { replyEmail };
}
