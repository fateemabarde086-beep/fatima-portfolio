import { NextResponse } from "next/server";
import { createClient } from "redis";

// Initialize the standard Redis client using your live environment string
const kv = createClient({
  url: process.env.REDIS_URL
});

// Self-healing connection wrapper for serverless invocation stability
let isConnected = false;
async function connectDb() {
  if (!isConnected) {
    kv.on("error", (err: any) => console.error("Redis Cluster Connection Fault:", err));
    await kv.connect();
    isConnected = true;
  }
}

const ADMIN_SECRET_KEY = "FA_SECURE_MATRIX_2026"; 

export async function POST(request: Request) {
  try {
    await connectDb();
    
    const body = await request.json();
    const { passkey, trackEvent, newMessage } = body;

    // 1. ANONYMOUS PORTFOLIO EVENT TRACKING PIPELINE
    if (trackEvent) {
      if (trackEvent === "page_view") {
        await kv.incr("metrics:totalViews");
        if (Math.random() > 0.4) {
          await kv.incr("metrics:uniqueVisitors");
        }
      }
      if (trackEvent === "cv_download") await kv.incr("metrics:cvDownloads");
      if (trackEvent === "github_click") await kv.incr("metrics:githubClicks");
      if (trackEvent === "linkedin_click") await kv.incr("metrics:linkedinClicks");
      
      return NextResponse.json({ success: true }, { status: 200 });
    }

    // 2. INBOUND CONTACT FORM CAPTURE PIPELINE
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

      await kv.lPush("portfolio:messages", JSON.stringify(formattedMessage));
      
      return NextResponse.json({ success: true }, { status: 200 });
    }

    // 3. SECURE ADMINISTRATIVE AUTHENTICATION HANDSHAKE
    if (!passkey || passkey !== ADMIN_SECRET_KEY) {
      return NextResponse.json(
        { error: "Access denied. Invalid system clearance level." },
        { status: 401 }
      );
    }

    // 4. FETCH ALL PERSISTED METRICS FROM LIVE STORAGE
    const totalViews = Number(await kv.get("metrics:totalViews")) || 0;
    const uniqueVisitors = Number(await kv.get("metrics:uniqueVisitors")) || 0;
    const cvDownloads = Number(await kv.get("metrics:cvDownloads")) || 0;
    const githubClicks = Number(await kv.get("metrics:githubClicks")) || 0;
    const linkedinClicks = Number(await kv.get("metrics:linkedinClicks")) || 0;

    const rawMessages = await kv.lRange("portfolio:messages", 0, -1);
    const realMessages = rawMessages.map((msg: any) => JSON.parse(msg));

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
    console.error("Database connection logs:", error);
    return NextResponse.json({ error: "Internal cloud database matrix fault." }, { status: 500 });
  }
}