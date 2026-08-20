export interface ProductItem {
  id: string;
  slug: string;
  badge: string;
  name: string;
  tagline: string;
  description: string;
  usp: string;
  image: string;
  specs: { label: string; value: string }[];
  features: string[];
  applications: { title: string; desc: string; icon: string }[];
  options: { title: string; choices: string[] }[];
  warranty: string;
  patent?: string;
}

export const products: Record<string, ProductItem> = {
  "tradecell-batteries": {
    id: "tradecell",
    slug: "customized-batteries",
    badge: "Hardware & CleanTech",
    name: "TradeCell™ Custom Smart Battery Systems",
    tagline: "Ultra-compact, ultra-lightweight Lithium & LFP blade cell energy solutions built to outlast.",
    description:
      "TradeCell custom-engineers high-density battery packs tailored for high-demand residential, commercial, and mobility applications. Utilizing advanced Lithium-Ion, Ferrous Phosphate (LiFePO4), and sourced prismatic Blade Cell architectures, our battery systems deliver uncompromised energy density with a significantly reduced weight and physical footprint.",
    usp: "Super small footprint & ultralight design compared to market alternatives — delivering matching or superior longevity, thermal stability, and cycle life.",
    image: "/tradecode/assets/product-battery.jpg",
    specs: [
      { label: "Cell Chemistries", value: "Lithium-Ion (NMC) / LiFePO4 (Ferrous Phosphate) / Sourced Blade Cells" },
      { label: "Form Factor", value: "Ultra-compact modular casing (up to 40% volume reduction)" },
      { label: "BMS Architecture", value: "Smart Active Balancing BMS or Industrial Non-Smart BMS" },
      { label: "Connectivity", value: "Integrated 5G IoT Telemetry Module / Standalone (Non-5G)" },
      { label: "Cycle Life", value: "3,500 – 6,000+ full charge/discharge cycles" },
      { label: "Protection", value: "Overvoltage, short-circuit, thermal runaway & cell-level isolation" },
    ],
    features: [
      "Custom cell configuration engineered to exact voltage, Ah capacity, and space constraints",
      "High thermal conductivity blade cell packaging with passive and active cooling pathways",
      "Smart BMS with real-time state-of-charge (SOC), state-of-health (SOH), and cell-level balancing",
      "Optional high-speed 5G module for instant cloud diagnostics and predictive maintenance alerts",
      "Plug-and-play compatibility with standard inverters, solar charge controllers, and EV drivetrains",
    ],
    applications: [
      {
        title: "Home Energy Storage (ESS)",
        desc: "Compact inverter backup and solar storage solutions that occupy minimum wall or floor space in residential apartments and villas.",
        icon: "Home",
      },
      {
        title: "Commercial Shops & Showrooms",
        desc: "Silent, zero-emission heavy load backup powering commercial retail outlets, hospitals, and enterprise workspaces without bulky generators.",
        icon: "Store",
      },
      {
        title: "Electric Vehicles (EVs)",
        desc: "Lightweight, high-discharge traction battery packs custom-designed for 2W, 3W, fleet e-rickshaws, and custom EV conversions.",
        icon: "Zap",
      },
    ],
    options: [
      {
        title: "Cell Chemistry",
        choices: ["Ferrous Phosphate (LiFePO4)", "Lithium-Ion (High Density)", "Sourced Blade Cells"],
      },
      {
        title: "BMS Configuration",
        choices: ["Smart BMS with App & Cloud Sync", "Standard Industrial BMS"],
      },
      {
        title: "IoT Connectivity",
        choices: ["Integrated 5G Telemetry & Remote Portal", "Standalone (No 5G)"],
      },
    ],
    warranty: "Complete Manufacturer Guarantee & Comprehensive Performance Warranty with dedicated service support.",
  },
  "miss-kaur-robot": {
    id: "miss-kaur",
    slug: "miss-kaur-humanoid",
    badge: "Design Patented Robotics",
    name: "Miss Kaur™ Autonomous Humanoid Receptionist",
    tagline: "The roaming digital information center and hospitality concierge for modern enterprise campuses.",
    description:
      "Miss Kaur is a patented humanoid service robot engineered to transform front-desk operations, visitor management, and concierge services in large organizations. Functioning as an autonomous roaming reception desk, Miss Kaur greets visitors, provides interactive facility navigation, answers complex organizational queries, and seamlessly coordinates guest check-ins.",
    usp: "Design-patented humanoid form factor acting as a fully mobile roaming information center across massive infrastructure facilities.",
    image: "/tradecode/assets/product-miss-kaur.jpg",
    patent: "Official Design Patented Humanoid Architecture & Chassis",
    specs: [
      { label: "Category", value: "Autonomous Humanoid Service Robot" },
      { label: "Navigation", value: "LiDAR + 3D Depth Vision Autonomous SLAM Navigation" },
      { label: "Display", value: "Interactive HD Touchscreen & Multi-Emotion Facial Screen" },
      { label: "AI Engine", value: "Multilingual Conversational LLM with Custom Knowledge Base" },
      { label: "Mobility", value: "Smooth omnidirectional roaming with smart obstacle avoidance" },
      { label: "Battery Runtime", value: "Up to 12 hours continuous operation with auto-docking" },
    ],
    features: [
      "Roaming Information Center: Navigates across multi-floor lobbies, atriums, and tech parks autonomously",
      "Interactive Touchscreen Console: Displays interactive floor plans, tenant directories, and queue management",
      "Patented Humanoid Ergonomics: Friendly aesthetic with expressive visual interactions and natural voice dialogue",
      "Enterprise Check-in & Badging: Integrates with visitor management systems for digital OTP & badge verification",
      "Autonomous Charging: Returns to self-docking station automatically when battery threshold is reached",
    ],
    applications: [
      {
        title: "Corporate Headquarters & Tech Parks",
        desc: "Greets corporate visitors, guides clients to meeting conference rooms, and relieves front-desk congestion in high-traffic campuses.",
        icon: "Building2",
      },
      {
        title: "Hospitals & Healthcare Facilities",
        desc: "Assists patients and visitors in finding OPD departments, diagnostic labs, and doctor consultation rooms with voice and visual maps.",
        icon: "Activity",
      },
      {
        title: "Universities & Convention Centers",
        desc: "Provides event agendas, booth directories, campus guidance, and real-time announcements in massive infrastructure complexes.",
        icon: "GraduationCap",
      },
    ],
    options: [
      {
        title: "Deployment Mode",
        choices: ["Stationary Concierge Dock", "Autonomous Roaming Guide", "Multi-Robot Fleet Sync"],
      },
      {
        title: "AI Knowledge Integration",
        choices: ["Custom Enterprise ERP/CRM Sync", "Standalone Multi-lingual AI Concierge"],
      },
    ],
    warranty: "Full OEM Warranty, On-Site Deployment Calibration & Continuous Software/AI Firmware Updates.",
  },
};
