import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const body = await request.json();
  const { password } = body;

  // Compare the input against the SECRET environment variable
  if (password === process.env.ADMIN_PASSWORD) {
    // Password matches! Return success.
    return NextResponse.json({ success: true });
  } else {
    // Wrong password.
    return NextResponse.json({ success: false }, { status: 401 });
  }
}