export default function TermsOfService() {
  return (
    <div className="max-w-3xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
      <p className="mb-4 text-gray-600">Last updated: March 2026</p>
      
      <div className="space-y-6 text-gray-700">
        <section>
          <h2 className="text-xl font-semibold mb-2">1. Studio Bookings and Cancellations</h2>
          <p>All studio bookings at Open Shore Studios are subject to availability. Cancellations made less than 24 hours before the scheduled session may be subject to a cancellation fee. The studio must be left in the condition it was found.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">2. Equipment Rental Liability</h2>
          <p>When renting camera equipment (including but not limited to camera bodies, lenses, and lighting), the renter assumes full financial responsibility for any damage, loss, or theft that occurs during the rental period. All gear must be returned by the agreed-upon time to avoid late fees.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">3. User Accounts and Verification</h2>
          <p>To rent equipment or book the facility, users must provide accurate identity and contact information. We reserve the right to decline a rental or booking if identity verification cannot be successfully completed.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">4. Payment and Fees</h2>
          <p>Payment for studio time and gear rentals must be completed prior to the session or equipment handover, unless otherwise agreed upon. Prices are subject to change, but confirmed bookings will be honored at the agreed rate.</p>
        </section>
      </div>
    </div>
  );
}