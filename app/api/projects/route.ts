import { NextResponse } from "next/server";

const PROJECTS_DATABASE = [
  {
    id: "proj_01",
    title: "Hospital Management System",
    tagline: "Reimagining Healthcare Through Intelligent Digital Infrastructure",
    description: "A modern hospital ecosystem designed to transform patient care and operational efficiency through secure digital workflows, smart scheduling, cloud architecture, and data-driven healthcare management.",
    keyFeatures: [
      "Smart Patient Management",
      "AI-Assisted Appointment Scheduling",
      "Digital Medical Records (EMR)",
      "Real-Time Hospital Dashboard",
      "Laboratory & Pharmacy Integration"
    ],
    tech: ["Django", "PostgreSQL", "AWS", "REST API", "Docker"],
    impact: "Designed to reduce administrative workload, improve patient experience, and create scalable digital healthcare operations.",
    category: "Healthcare Technology",
    type: "Full-Stack Platform",
    focus: "Cloud • Security • Scalability",
    buttonText: "Explore Platform →",
    githubUrl: "https://github.com/fateemabarde086",
    // ROUTING SYSTEM DIRECTLY TO YOUR LOCAL DIRECTORY FILES
    uiScreenshots: [
      "/assets/hospital-dash.png",
      "/assets/hospital-schedule.png"
    ]
  },
  {
    id: "proj_02",
    title: "Period Tracker & Ovulation App",
    tagline: "Empowering Women Through Smart Cycle Intelligence",
    description: "A modern women’s wellness platform designed to help users understand their cycle, predict ovulation, track health patterns, and build healthier routines through secure, intelligent, and personalized experiences.",
    keyFeatures: [
      "Smart Period Prediction",
      "Ovulation & Fertility Window Tracking",
      "AI-Powered Cycle Insights",
      "Mood & Symptom Monitoring",
      "Health Analytics Dashboard"
    ],
    tech: ["Flutter", "Firebase", "Machine Learning", "Cloud Sync"],
    impact: "Designed to help women understand their health with confidence through intelligent tracking, privacy-first design, and accessible digital wellness tools.",
    category: "FemTech",
    type: "Health & Wellness Platform",
    focus: "AI • Privacy • User Experience",
    buttonText: "Experience the App →",
    githubUrl: "https://github.com/fateemabarde086",
    uiScreenshots: [
      "/assets/tracker-main.png",
      "/assets/tracker-insights.png"
    ]
  },
  {
    id: "proj_03",
    title: "Girls Safety & Awareness Platform",
    tagline: "Guardian Matrix // Digital Security for Community Empowerment",
    description: "A mission-critical defensive application engineered to protect, educate, and empower young women through instant emergency protocols, verified safety networks, and secure localized communication channels.",
    keyFeatures: [
      "Geo-Locked SOS Protocol",
      "Verified Resource Repository",
      "Encrypted Reporting Pipeline",
      "Offline Emergency Fallback",
      "Discreet Interface Shifting"
    ],
    tech: ["React", "Node.js", "Express", "MongoDB", "WebSockets"],
    impact: "Engineered to deliver real-time protective digital infrastructure, enabling community-driven safety responses and secure access to critical awareness metrics.",
    category: "Civic & Defensive Tech",
    type: "Secure Web Architecture",
    focus: "Real-Time • Encryption • Zero-Trust",
    buttonText: "Launch Platform →",
    githubUrl: "https://github.com/fateemabarde086",
    uiScreenshots: [
      "/assets/safety-map.png",
      "/assets/safety-sos.png"
    ]
  },
  {
    id: "proj_04",
    title: "Charity Platform for Girls",
    tagline: "Foundation Nexus // Transparent Crowdfunding Infrastructure",
    description: "A next-generation, high-transparency financial ledger and donation highway designed to connect global philanthropists directly with educational and welfare initiatives for underprivileged girls.",
    keyFeatures: [
      "Immutable Impact Tracking",
      "Dynamic Initiative Dashboards",
      "Automated Micro-Sponsorships",
      "Cryptographic Secure Checkout",
      "High-Performance Static Generation"
    ],
    tech: ["Django", "PostgreSQL", "AWS S3", "Stripe API", "Docker"],
    impact: "Designed to eliminate philanthropic friction, restore absolute institutional trust, and maximize the scale of targeted humanitarian funding lines.",
    category: "Philanthropy & FinTech",
    type: "Transparent Cloud Infrastructure",
    focus: "Transparency • Scale • Global Payments",
    buttonText: "Empower Change →",
    githubUrl: "https://github.com/fateemabarde086",
    uiScreenshots: [
      "/assets/charity-ledger.png",
      "/assets/charity-donor.png"
    ]
  },
  {
    id: "proj_05",
    title: "Social Commerce Marketplace",
    tagline: "OmniVibe // High-Performance Edge E-Commerce Matrix",
    description: "A blazing-fast, sub-second latency social marketplace engineered to blend interactive social curation loops with enterprise-grade product cataloging and transaction infrastructure.",
    keyFeatures: [
      "Sub-Second Edge Rendering",
      "Interactive Curation Architecture",
      "Secure Multi-Channel Checkout",
      "Predictive Analytics Inventory",
      "WebHook Inventory Synchronization"
    ],
    tech: ["Next.js", "TypeScript", "Stripe", "MongoDB", "Prisma ORM"],
    impact: "Built to redefine consumer velocity, eliminating drop-off rates with ultra-optimized interface responses and robust transactional security.",
    category: "E-Commerce Ecosystems",
    type: "High-Velocity Marketplace",
    focus: "Edge-Computing • FinTech • Optimization",
    buttonText: "Explore Marketplace →",
    githubUrl: "https://github.com/fateemabarde086",
    uiScreenshots: [
      "/assets/market-feed.png",
      "/assets/market-checkout.png"
    ]
  }
];

export async function GET() {
  try {
    return NextResponse.json(PROJECTS_DATABASE, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Data pipeline execution fault" }, { status: 500 });
  }
}