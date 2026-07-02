import { NextResponse } from "next/server";

const ADMIN_SECRET_KEY = "FA_SECURE_MATRIX_2026"; 

// Simulated global state storage (In-Memory database backup layer)
// Note: In production, these will update dynamically when users interact with your portfolio elements!
let portfolioMetrics = {
  totalViews: 1240,
  uniqueVisitors: 842,
  cvDownloads: 142,
  githubClicks: 310,
  linkedinClicks: 198,
  liveVisitors: 3,
};

// In-Memory Message Store array
let activeMessages: any[] = [
  {
    id: "msg-1",
    name: "Hassan Musa",
    email: "hassan.musa@devcorp.ng",
    message: "Hey Fatima! Loved your 3D holographic command center portfolio. Are you available for a remote React/Next.js contract project starting next month?",
    timestamp: "2026-07-02 11:14 AM"
  },
  {
    id: "msg-2",
    name: "Amara Okafor",
    email: "amara@femtechmatrix.org",
    message: "Hi Sis! Just checking out your live site deployment. The clean light-mode transition inside your system gateway interface looks sleek!",
    timestamp: "2026-07-02 01:22 PM"
  }
];

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { passkey, trackEvent } = body;

    // 1. If a user is visiting the portfolio, they can anonymously track an interaction event without a passkey
    if (trackEvent) {
      if (trackEvent === "page_view") portfolioMetrics.totalViews += 1;
      if (trackEvent === "cv_download") portfolioMetrics.cvDownloads += 1;
      if (trackEvent === "github_click") portfolioMetrics.githubClicks += 1;
      if (trackEvent === "linkedin_click") portfolioMetrics.linkedinClicks += 1;
      
      return NextResponse.json({ success: true, metrics: portfolioMetrics }, { status: 200 });
    }

    // 2. Secure administrative authentication handshake
    if (!passkey || passkey !== ADMIN_SECRET_KEY) {
      return NextResponse.json(
        { error: "Access denied. Invalid system clearance level." },
        { status: 401 }
      );
    }

    // Return the authenticated data payload package including metrics and messages
    return NextResponse.json({ 
      success: true, 
      messages: activeMessages,
      metrics: portfolioMetrics
    }, { status: 200 });

  } catch (error) {
    return NextResponse.json({ error: "Internal administrative query fault." }, { status: 500 });
  }
}