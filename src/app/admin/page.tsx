'use client';

import { useEffect, useMemo, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

type BookingRow = {
  id: string;
  user_name: string | null;
  user_email: string | null;
  user_phone: string | null;
  session_type: string | null;
  booking_date: string | null;
  booking_time: string | null;
  status: string | null;
  created_at?: string | null;
};

type ContactRow = {
  id: string;
  name: string | null;
  email: string | null;
  subject: string | null;
  message: string | null;
  status: string | null;
  sent_at?: string | null;
  replied_at?: string | null;
  created_at?: string | null;
};

type ReplyDraft = {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
};

export default function AdminPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'bookings' | 'contacts'>('bookings');
  const [bookings, setBookings] = useState<BookingRow[]>([]);
  const [contacts, setContacts] = useState<ContactRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [sendingReply, setSendingReply] = useState(false);
  const [replyDraft, setReplyDraft] = useState<ReplyDraft | null>(null);

  useEffect(() => {
    const session = localStorage.getItem('admin_session');
    if (!session) {
      router.push('/admin/login');
      return;
    }

    void fetchData(activeTab);
  }, [activeTab, router]);

  const getNormalizedContactStatus = (contact: ContactRow) => {
    const status = (contact.status ?? 'new').toLowerCase();

    if (status === 'contacted' || contact.replied_at) {
      return 'replied';
    }

    return status;
  };

  const contactCount = useMemo(
    () => contacts.filter((contact) => getNormalizedContactStatus(contact) === 'new').length,
    [contacts]
  );

  const fetchData = async (tab: 'bookings' | 'contacts') => {
    setLoading(true);

    if (tab === 'bookings') {
      const { data, error } = await supabase
        .from('bookings')
        .select('id, user_name, user_email, user_phone, session_type, booking_date, booking_time, status, created_at')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Failed to load bookings:', error.message);
      }

      setBookings((data ?? []) as BookingRow[]);
    }

    if (tab === 'contacts') {
      let data: ContactRow[] | null = null;

      const fullQuery = await supabase
        .from('contact_messages')
        .select('id, name, email, subject, message, status, sent_at, replied_at, created_at')
        .order('created_at', { ascending: false });

      if (fullQuery.error) {
        const isAuditColumnMissing =
          fullQuery.error.message.includes('sent_at') ||
          fullQuery.error.message.includes('replied_at');

        if (isAuditColumnMissing) {
          const fallbackQuery = await supabase
            .from('contact_messages')
            .select('id, name, email, subject, message, status, created_at')
            .order('created_at', { ascending: false });

          if (fallbackQuery.error) {
            console.error('Failed to load contact messages:', fallbackQuery.error.message);
          } else {
            data = (fallbackQuery.data ?? []) as ContactRow[];
          }
        } else {
          console.error('Failed to load contact messages:', fullQuery.error.message);
        }
      } else {
        data = (fullQuery.data ?? []) as ContactRow[];
      }

      const normalizedContacts = (data ?? []).map((contact) => ({
        ...contact,
        status: getNormalizedContactStatus(contact),
      }));

      setContacts(normalizedContacts);
    }

    setLoading(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_session');
    router.push('/admin/login');
  };

  const openReplyDraft = (contact: ContactRow) => {
    if (!contact.email) {
      alert('This contact has no email address to reply to.');
      return;
    }

    setReplyDraft({
      id: contact.id,
      name: contact.name ?? 'there',
      email: contact.email,
      subject: `Re: ${contact.subject ?? 'Your message to Open Shore Studios'}`,
      message: `Hi ${contact.name ?? 'there'},\n\nThanks for reaching out to Open Shore Studios.\n\n`,
    });
  };

  const closeReplyDraft = () => {
    setReplyDraft(null);
  };

  const updateContactStatus = async (contactId: string, nextStatus: string, markReplied = false) => {
    const updatePayload: { status: string; replied_at?: string } = {
      status: nextStatus,
    };

    if (markReplied) {
      updatePayload.replied_at = new Date().toISOString();
    }

    const { error } = await supabase
      .from('contact_messages')
      .update(updatePayload)
      .eq('id', contactId);

    if (error) {
      const isRepliedAtMissing = markReplied && error.message.includes('replied_at');

      if (isRepliedAtMissing) {
        const fallbackUpdate = await supabase
          .from('contact_messages')
          .update({ status: nextStatus })
          .eq('id', contactId);

        if (fallbackUpdate.error) {
          console.warn('Contact status update failed:', fallbackUpdate.error.message);
          return false;
        }
      } else {
        console.warn('Contact status update failed:', error.message);
        return false;
      }
    }

    setContacts((prev) =>
      prev.map((contact) =>
        contact.id === contactId
          ? {
              ...contact,
              status: nextStatus,
              replied_at: markReplied ? updatePayload.replied_at ?? contact.replied_at : contact.replied_at,
            }
          : contact
      )
    );

    return true;
  };

  const sendReply = async () => {
    if (!replyDraft || !replyDraft.message.trim()) {
      alert('Reply message cannot be empty.');
      return;
    }

    setSendingReply(true);

    try {
      const response = await fetch('/api/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'admin-reply',
          name: replyDraft.name,
          email: replyDraft.email,
          subject: replyDraft.subject,
          message: replyDraft.message,
        }),
      });

      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload?.error ?? 'Failed to send admin reply email.');
      }

      const updated = await updateContactStatus(replyDraft.id, 'replied', true);

      if (!updated) {
        throw new Error('Reply email sent, but status update failed. Please refresh and try again.');
      }

      alert('Reply sent successfully.');
      closeReplyDraft();
    } catch (error: any) {
      console.error(error);
      alert(error.message ?? 'Failed to send reply.');
    } finally {
      setSendingReply(false);
    }
  };

  return (
    <main className="bg-gray-50 text-black min-h-screen">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="text-xl font-serif font-bold text-[#C19A6B]">Open Shore Admin</span>
            <span className="bg-neutral-100 text-xs px-2 py-1 rounded text-gray-500">v2.0</span>
          </div>

          <button
            onClick={handleLogout}
            className="text-xs font-bold text-red-500 hover:text-red-700 tracking-widest uppercase border border-red-100 bg-red-50 px-4 py-2 rounded hover:bg-red-100 transition-colors"
          >
            Log Out
          </button>
        </div>
      </header>

      <section className="py-10 px-6">
        <div className="container mx-auto max-w-6xl space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl border border-gray-200 p-6 lg:col-span-2">
              <h2 className="text-xl font-serif text-[#C19A6B] mb-2">Contact Information</h2>
              <p className="text-gray-500 text-sm mb-4">Reference details used by your team to handle bookings and inquiries.</p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="text-gray-400 uppercase tracking-widest text-xs mb-1">Email</p>
                  <p className="font-medium text-gray-800">contact@openshorestudios.com</p>
                </div>
                <div>
                  <p className="text-gray-400 uppercase tracking-widest text-xs mb-1">Phone</p>
                  <p className="font-medium text-gray-800">+234 (706) 442-6441</p>
                </div>
                <div>
                  <p className="text-gray-400 uppercase tracking-widest text-xs mb-1">Address</p>
                  <p className="font-medium text-gray-800">52b, Airport road Benin city</p>
                </div>
              </div>
            </div>

            <div className="bg-[#C19A6B]/10 rounded-xl border border-[#C19A6B]/30 p-6">
              <h3 className="text-[#C19A6B] text-xs font-bold tracking-widest uppercase mb-3">Inbox Snapshot</h3>
              <p className="text-gray-700 text-sm">New contact messages</p>
              <p className="text-3xl font-serif text-[#C19A6B] mt-2">{contactCount}</p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-end gap-4">
            <div>
              <h1 className="text-3xl font-serif">Dashboard</h1>
              <p className="text-gray-500 text-sm mt-1">Manage bookings and customer contact messages.</p>
            </div>

            <div className="flex gap-2 bg-white p-1 rounded-lg border border-gray-200 shadow-sm">
              <button
                onClick={() => setActiveTab('bookings')}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
                  activeTab === 'bookings' ? 'bg-[#C19A6B] text-white shadow-sm' : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                Bookings
              </button>
              <button
                onClick={() => setActiveTab('contacts')}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
                  activeTab === 'contacts' ? 'bg-[#C19A6B] text-white shadow-sm' : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                Contacts
              </button>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            {loading && (
              <div className="p-8 text-center text-sm text-gray-500">Loading records...</div>
            )}

            {!loading && activeTab === 'bookings' && (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-gray-50 border-b border-gray-100">
                    <tr>
                      <th className="p-4 font-medium text-gray-500">Client</th>
                      <th className="p-4 font-medium text-gray-500">Service</th>
                      <th className="p-4 font-medium text-gray-500">Date and Time</th>
                      <th className="p-4 font-medium text-gray-500">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {bookings.map((booking) => (
                      <tr key={booking.id} className="hover:bg-gray-50/50 transition-colors">
                        <td className="p-4">
                          <div className="font-medium text-gray-900">{booking.user_name ?? 'N/A'}</div>
                          <div className="text-gray-500 text-xs">{booking.user_email ?? 'N/A'}</div>
                          <div className="text-gray-500 text-xs">{booking.user_phone ?? 'N/A'}</div>
                        </td>
                        <td className="p-4 font-medium">{booking.session_type ?? 'N/A'}</td>
                        <td className="p-4">
                          <div>{booking.booking_date ?? 'N/A'}</div>
                          <div className="text-xs text-gray-400">{booking.booking_time ?? 'N/A'}</div>
                        </td>
                        <td className="p-4">
                          <span className="bg-blue-50 text-blue-700 border border-blue-100 px-2.5 py-0.5 rounded-full text-xs font-bold uppercase">
                            {booking.status ?? 'pending'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {!loading && activeTab === 'contacts' && (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-gray-50 border-b border-gray-100">
                    <tr>
                      <th className="p-4 font-medium text-gray-500">Contact</th>
                      <th className="p-4 font-medium text-gray-500">Subject</th>
                      <th className="p-4 font-medium text-gray-500">Message</th>
                      <th className="p-4 font-medium text-gray-500">Status</th>
                      <th className="p-4 font-medium text-gray-500 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {contacts.map((contact) => (
                      <tr key={contact.id} className="hover:bg-gray-50/50 transition-colors align-top">
                        <td className="p-4">
                          <div className="font-medium text-gray-900">{contact.name ?? 'N/A'}</div>
                          <div className="text-gray-500 text-xs">{contact.email ?? 'No email provided'}</div>
                          <div className="text-gray-400 text-xs mt-1">
                            Sent: {contact.sent_at ? new Date(contact.sent_at).toLocaleString() : contact.created_at ? new Date(contact.created_at).toLocaleString() : 'Unknown time'}
                          </div>
                          <div className="text-gray-400 text-xs mt-1">
                            Replied: {contact.replied_at ? new Date(contact.replied_at).toLocaleString() : 'Not yet'}
                          </div>
                        </td>
                        <td className="p-4 font-medium">{contact.subject ?? 'General Inquiry'}</td>
                        <td className="p-4 text-gray-600 max-w-md">
                          {contact.message ? `${contact.message.slice(0, 120)}${contact.message.length > 120 ? '...' : ''}` : 'No message content'}
                        </td>
                        <td className="p-4">
                          <span className="bg-amber-50 text-amber-700 border border-amber-100 px-2.5 py-0.5 rounded-full text-xs font-bold uppercase">
                            {getNormalizedContactStatus(contact)}
                          </span>
                        </td>
                        <td className="p-4 text-right">
                          <button
                            onClick={() => openReplyDraft(contact)}
                            className="text-xs font-bold px-4 py-2 rounded-lg border border-[#C19A6B]/30 text-[#C19A6B] hover:bg-[#C19A6B] hover:text-white transition-all"
                          >
                            Reply
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </section>

      {replyDraft && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-2xl bg-white rounded-xl border border-gray-200 shadow-xl">
            <div className="p-6 border-b border-gray-100">
              <h3 className="text-xl font-serif text-[#C19A6B]">Reply to {replyDraft.name}</h3>
              <p className="text-sm text-gray-500 mt-1">Sending to {replyDraft.email}</p>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="text-xs uppercase tracking-widest text-gray-500 font-bold">Subject</label>
                <input
                  type="text"
                  value={replyDraft.subject}
                  onChange={(e) => setReplyDraft({ ...replyDraft, subject: e.target.value })}
                  className="mt-2 w-full p-3 border border-gray-200 rounded bg-white outline-none focus:border-[#C19A6B]"
                />
              </div>

              <div>
                <label className="text-xs uppercase tracking-widest text-gray-500 font-bold">Message</label>
                <textarea
                  rows={8}
                  value={replyDraft.message}
                  onChange={(e) => setReplyDraft({ ...replyDraft, message: e.target.value })}
                  className="mt-2 w-full p-3 border border-gray-200 rounded bg-white outline-none focus:border-[#C19A6B] resize-none"
                />
              </div>
            </div>

            <div className="p-6 border-t border-gray-100 flex items-center justify-end gap-3">
              <button
                onClick={closeReplyDraft}
                className="px-4 py-2 text-sm font-medium border border-gray-200 rounded hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={sendReply}
                disabled={sendingReply}
                className="px-5 py-2 text-sm font-bold tracking-wide rounded bg-[#C19A6B] text-white hover:bg-[#a68257] disabled:opacity-60"
              >
                {sendingReply ? 'Sending...' : 'Send Reply'}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
