import { NextResponse } from "next/server";

// Simple secure system gate check passphrase
const ADMIN_SECRET_KEY = "FA_SECURE_MATRIX_2026"; 

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { passkey } = body;

    // Secure authentication handshake
    if (!passkey || passkey !== ADMIN_SECRET_KEY) {
      return NextResponse.json(
        { error: "Access denied. Invalid system clearance level." },
        { status: 401 }
      );
    }

    // Mock data array simulating incoming database lead storage rows
    const mockMessages = [
      {
        id: "1",
        name: "Alex Mercer",
        email: "alex@orionlabs.io",
        message: "Looking for a secure Next.js portal with AWS cloud setup. Your profile fits perfectly. Let's discuss contract terms.",
        timestamp: "2026-07-02 09:15"
      },
      {
        id: "2",
        name: "Elena Rostova",
        email: "e.rostova@cyberdefense.com",
        message: "Hi Fatima! We are looking to contract a software engineer for a secure Django platform integration. Can you share your calendar?",
        timestamp: "2026-07-01 14:22"
      }
    ];

    return NextResponse.json({ success: true, messages: mockMessages }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Internal administrative query fault." }, { status: 500 });
  }
}