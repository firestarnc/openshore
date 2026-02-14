'use client';

import dynamic from 'next/dynamic';

// This imports your booking form but tells Next.js: 
// "Do NOT try to render this on the server. Wait for the browser."
const BookingClient = dynamic(
  () => import('./BookingClient'), 
  { ssr: false }
);

export default function BookingPageWrapper() {
  return (
    <>
      {/* We can put a loading spinner here if we want */}
      <BookingClient />
    </>
  );
}