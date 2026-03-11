import Link from 'next/link';
import Header from "@/components/header";
import { CheckCircle } from 'lucide-react';

export default function SuccessPage() {
  return (
    <main className="bg-white text-black min-h-screen">
      <Header />
      <div className="flex flex-col items-center justify-center min-h-[70vh] px-6 text-center">
        <CheckCircle className="w-20 h-20 text-[#C19A6B] mb-6" />
        <h1 className="text-4xl font-serif text-[#C19A6B] mb-4">Booking Confirmed!</h1>
        <p className="text-gray-600 max-w-md mb-8">
          Thank you for choosing Open Shore Studios. Your payment was successful, and we have emailed your receipt and booking details.
        </p>
        <Link 
          href="/"
          className="bg-[#C19A6B] text-white px-8 py-3 rounded text-sm tracking-widest font-bold hover:bg-[#C19A6B]/50 transition-colors"
        >
          RETURN HOME
        </Link>
      </div>
    </main>
  );
}