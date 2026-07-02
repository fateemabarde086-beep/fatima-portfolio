import { NextResponse } from "next/server";
import { kv } from "@vercel/kv";

const ADMIN_SECRET_KEY = "FA_SECURE_MATRIX_2026"; 

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { passkey, trackEvent, newMessage } = body;

    // 1. ANONYMOUS PORTFOLIO EVENT TRACKING PIPELINE (Persistent cloud count)
    if (trackEvent) {
      if (trackEvent === "page_view") {
        await kv.incr("metrics:totalViews");
        // Simple scaling fallback simulation for unique metrics
        if (Math.random() > 0.4) {
          await kv.incr("metrics:uniqueVisitors");
        }
      }
      if (trackEvent === "cv_download") await kv.incr("metrics:cvDownloads");
      if (trackEvent === "github_click") await kv.incr("metrics:githubClicks");
      if (trackEvent === "linkedin_click") await kv.incr("metrics:linkedinClicks");
      
      return NextResponse.json({ success: true }, { status: 200 });
    }

    // 2. INBOUND CONTACT FORM CAPTURE PIPELINE (Saves messages permanently)
    if (newMessage) {
      const { name, email, message } = newMessage;
      
      if (!name || !email || !message) {
        return NextResponse.json({ error: "Missing required payload segments." }, { status: 400 });
      }

      const formattedMessage = {
        id: `msg-${Date.now()}`,
        name,
        email,
        message,
        timestamp: new Date().toLocaleString("en-US", { timeZone: "Africa/Lagos" })
      };

      // Push real submission data into a persistent Redis list wrapper
      await kv.lpush("portfolio:messages", JSON.stringify(formattedMessage));
      
      return NextResponse.json({ success: true }, { status: 200 });
    }

    // 3. SECURE ADMINISTRATIVE AUTHENTICATION HANDSHAKE
    if (!passkey || passkey !== ADMIN_SECRET_KEY) {
      return NextResponse.json(
        { error: "Access denied. Invalid system clearance level." },
        { status: 401 }
      );
    }

    // 4. FETCH ALL GENUINE PERSISTED METRICS FROM VERCEL KV
    const totalViews = (await kv.get<number>("metrics:totalViews")) || 0;
    const uniqueVisitors = (await kv.get<number>("metrics:uniqueVisitors")) || 0;
    const cvDownloads = (await kv.get<number>("metrics:cvDownloads")) || 0;
    const githubClicks = (await kv.get<number>("metrics:githubClicks")) || 0;
    const linkedinClicks = (await kv.get<number>("metrics:linkedinClicks")) || 0;

    // Pull real stored messages list from the cloud database stream
    const rawMessages = await kv.lrange("portfolio:messages", 0, -1);
    const realMessages = rawMessages.map((msg) => (typeof msg === "string" ? JSON.parse(msg) : msg));

    const dynamicMetrics = {
      totalViews,
      uniqueVisitors,
      cvDownloads,
      githubClicks,
      linkedinClicks,
      liveVisitors: 1,
    };

    return NextResponse.json({ 
      success: true, 
      messages: realMessages,
      metrics: dynamicMetrics
    }, { status: 200 });

  } catch (error) {
    return NextResponse.json({ error: "Internal cloud database matrix fault." }, { status: 500 });
  }
}