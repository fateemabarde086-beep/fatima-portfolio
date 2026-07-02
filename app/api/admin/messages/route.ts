import { NextResponse } from "next/server";

const ADMIN_SECRET_KEY = "FA_SECURE_MATRIX_2026"; 

// REAL-TIME RUNTIME STORAGE MATRIX (Resets mockup values to zero)
let portfolioMetrics = {
  totalViews: 0,
  uniqueVisitors: 0,
  cvDownloads: 0,
  githubClicks: 0,
  linkedinClicks: 0,
  liveVisitors: 1,
};

// Array to store real data incoming from your actual contact form submissions
let activeMessages: any[] = [];

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { passkey, trackEvent, newMessage } = body;

    // 1. ANONYMOUS PORTFOLIO EVENT TRACKING PIPELINE
    if (trackEvent) {
      if (trackEvent === "page_view") {
        portfolioMetrics.totalViews += 1;
        // Simple scaling simulation for unique session estimation
        if (portfolioMetrics.totalViews === 1 || Math.random() > 0.4) {
          portfolioMetrics.uniqueVisitors += 1;
        }
      }
      if (trackEvent === "cv_download") portfolioMetrics.cvDownloads += 1;
      if (trackEvent === "github_click") portfolioMetrics.githubClicks += 1;
      if (trackEvent === "linkedin_click") portfolioMetrics.linkedinClicks += 1;
      
      return NextResponse.json({ success: true, metrics: portfolioMetrics }, { status: 200 });
    }

    // 2. INBOUND CONTACT FORM CAPTURE PIPELINE (For real visitors submitting messages)
    if (newMessage) {
      const { name, email, message } = newMessage;
      
      if (!name || !email || !message) {
        return NextResponse.json({ error: "Missing required payload segments." }, { status: 400 });
      }

      const formattedMessage = {
        id: `msg-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
        name,
        email,
        message,
        timestamp: new Date().toLocaleString("en-US", { timeZone: "Africa/Lagos" })
      };

      // Push real submission data into your live storage deck
      activeMessages.unshift(formattedMessage);
      
      return NextResponse.json({ success: true }, { status: 200 });
    }

    // 3. SECURE ADMINISTRATIVE AUTHENTICATION HANDSHAKE
    if (!passkey || passkey !== ADMIN_SECRET_KEY) {
      return NextResponse.json(
        { error: "Access denied. Invalid system clearance level." },
        { status: 401 }
      );
    }

    // Return genuine runtime data tracking blocks
    return NextResponse.json({ 
      success: true, 
      messages: activeMessages,
      metrics: portfolioMetrics
    }, { status: 200 });

  } catch (error) {
    return NextResponse.json({ error: "Internal administrative query fault." }, { status: 500 });
  }
}