export interface ProductSpec {
  label: string;
  value: string;
}

export interface ProductApplication {
  title: string;
  desc: string;
  icon?: string;
}

export interface ProductItem {
  id: string;
  slug: string;
  category: "energy" | "security" | "access";
  categoryLabel: string;
  badge: string;
  name: string;
  tagline: string;
  description: string;
  usp: string;
  image: string;
  specs: ProductSpec[];
  features: string[];
  applications?: ProductApplication[];
  options?: { title: string; choices: string[] }[];
  calibration?: { parameter: string; maxVal?: string; minVal?: string; defaultVal?: string; desc?: string }[];
  warranty?: string;
  patent?: string;
}

export const productCategories = [
  { id: "all", label: "All Products" },
  { id: "energy", label: "Clean Energy & Power" },
  { id: "security", label: "Security & Surveillance" },
  { id: "access", label: "Smart Infrastructure & Access" },
] as const;

export const products: Record<string, ProductItem> = {
  // ─── 1. TRADECELL BATTERIES ──────────────────────────────────────────────────
  "tradecell-batteries": {
    id: "tradecell",
    slug: "customized-batteries",
    category: "energy",
    categoryLabel: "Clean Energy & Power",
    badge: "Hardware & Energy Storage",
    name: "TradeCell™ Custom Smart Battery Systems",
    tagline: "Ultra-compact, ultra-lightweight Lithium & LFP blade cell energy solutions built to outlast.",
    description:
      "TradeCell custom-engineers high-density battery packs tailored for high-demand residential, commercial, and mobility applications. Utilizing advanced Lithium-Ion, Ferrous Phosphate (LiFePO4), and sourced prismatic Blade Cell architectures, our battery systems deliver uncompromised energy density with a significantly reduced weight and physical footprint.",
    usp: "Super small footprint & ultralight design compared to other market batteries with matching or superior longevity & cycle life.",
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
      "Custom cell configuration engineered to exact voltage, Ah capacity, and physical enclosure constraints",
      "High thermal conductivity blade cell packaging with passive and active cooling pathways",
      "Smart BMS with real-time state-of-charge (SOC), state-of-health (SOH), and cell-level balancing",
      "Optional high-speed 5G module for instant cloud diagnostics, fleet tracking, and predictive maintenance alerts",
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

  // ─── 3. DUAL-ENERGY X-RAY BAGGAGE SCANNER 100*100 ────────────────────────────
  "xray-baggage-scanner": {
    id: "scanner",
    slug: "baggage-scanner-100-100",
    category: "security",
    categoryLabel: "Security & Surveillance",
    badge: "Enterprise Security & Screening",
    name: "Dual-Energy X-Ray Baggage Scanner 100×100",
    tagline: "Heavy-duty high-throughput inspection system with 1005×1000mm tunnel and dual 21.5\" color displays.",
    description:
      "The 100×100 Dual-Energy X-Ray Baggage Scanner is engineered for high-security, high-capacity inspection checkpoints in airports, customs border posts, railway stations, government facilities, and critical commercial infrastructure. Featuring a 1005(W) × 1000(H) mm tunnel and 140KV generator, it provides crystal-clear material discrimination and threat detection.",
    usp: "Heavy-duty 250kg conveyor load rating with 100% continuous duty cycle, ISO 1600 film safety, and 1TB SSD high-speed image archiving.",
    image: "/tradecode/assets/product-scanner.jpg",
    specs: [
      { label: "Tunnel Size", value: "1005 mm (W) × 1000 mm (H)" },
      { label: "Conveyor Belt Speed", value: "0.22 m/s (Bi-directional: Forward / Reverse)" },
      { label: "Conveyor Max Load", value: "250 kg (Evenly Distributed)" },
      { label: "X-Ray Voltage", value: "140 KV Generator" },
      { label: "Cooling System", value: "Sealed Di-Electric Oil Bath with Forced Air" },
      { label: "Duty Cycle", value: "100% Continuous Operation" },
      { label: "Beam Direction", value: "Vertically Downward" },
      { label: "Film Safety", value: "Guaranteed ISO 1600 (33 DIN) High-Speed Film Safe" },
      { label: "Display System", value: "Dual 21.5\" LCD High-Resolution Color Monitors" },
      { label: "Display Resolution", value: "1280 × 1024; 24-bit/pixel True Color Imaging" },
      { label: "Processing & Storage", value: "4GB RAM System Memory / 1TB Solid State Drive (SSD)" },
      { label: "Operating Environment", value: "0°C to 40°C, up to 95% Humidity (Non-Condensing)" },
      { label: "Power Requirements", value: "220 VAC ±10%, 50/60 Hz, 10A Max" },
    ],
    features: [
      "Dual-Energy Multi-Material Color Discrimination: Organic (orange), inorganic (blue), and mixed light materials (green)",
      "High-speed bidirectional conveyor with emergency stop bars and durable stainless steel roller tables",
      "Real-time edge enhancement, high/low penetration scanning, organic/inorganic stripping, and zoom inspection (up to 64x)",
      "Threat Image Projection (TIP) ready with operator performance monitoring and suspicious item tagging",
      "Massive 1TB SSD local archive capable of storing hundreds of thousands of high-resolution scan records with timestamps",
    ],
    applications: [
      {
        title: "Airports & Aviation Hubs",
        desc: "High-throughput passenger checked baggage and oversized cargo scanning compliant with international aviation standards.",
      },
      {
        title: "Railways & Metro Terminals",
        desc: "Rapid passenger transit checkpoint screening capable of handling continuous peak rush-hour baggage flows.",
      },
      {
        title: "Government & Enterprise HQs",
        desc: "Perimeter security screening protecting embassies, high-profile summits, logistics hubs, and corporate complexes.",
      },
    ],
    warranty: "1-Year Comprehensive Manufacturer Warranty with On-Site Installation, Commissioning & Operator Training.",
  },

  // ─── 4. SISPL BATTERY LVD CONTROLLER ─────────────────────────────────────────
  "sispl-lvd-controller": {
    id: "lvd-controller",
    slug: "sispl-battery-lvd-controller",
    category: "energy",
    categoryLabel: "Clean Energy & Power",
    badge: "Microcontroller Power Management",
    name: "SISPL Microcontroller Battery LVD & Latch Controller",
    tagline: "Multifunction high-speed micro-controller Low Voltage Disconnect system with dual LVD trip latching.",
    description:
      "The SISPL Controller is an integrated multifunction high-speed microcontroller-based Battery LVD (Low Voltage Disconnect) and latching management system. Built for mission-critical DC power banks, solar telecommunication towers, and UPS installations, it continuously monitors battery bank voltage, provides dual programmable cut-off/cut-in thresholds, and drives potential-free alarm contacts with high MTBF reliability.",
    usp: "High MTBF compact modular design featuring on-site analog calibration, dual programmable LVD1/LVD2 trip levels, and potential-free relay contacts.",
    image: "/tradecode/assets/product-lvd.jpg",
    specs: [
      { label: "Controller Type", value: "High-Speed Microcontroller-Based DC Voltage Supervisor" },
      { label: "Voltage Monitoring Range", value: "20.0V to 60.0V DC Programmable" },
      { label: "Trip Relays", value: "Dual Stage: LVD1 Trip (J3) & LVD2 Trip (J4)" },
      { label: "Alarm Outputs", value: "Potential-Free Alarm Contacts (J1 & J2)" },
      { label: "User Interface", value: "Backlit Digital LCD Display with 3-Key Control (SW1, SW2, SW3)" },
      { label: "Calibration", value: "On-Site Analog Voltage, Current & Temperature Calibration" },
      { label: "Design Architecture", value: "Compact, High MTBF Modular DIN/Panel Mount Enclosure" },
    ],
    features: [
      "Real-time continuous monitoring of Battery Bank Voltage with 0.1V display resolution",
      "Two-tier Low Voltage Disconnect: LVD1 Cut-off (default 44.0V) and LVD2 Cut-off (default 42.0V)",
      "Automatic Reconnect/Cut-in: LVD2 Cut-in (default 43.0V) and LVD1 Cut-in (default 45.0V) when charging",
      "Potential-free alarm relay contacts for remote SCADA / NOC telemetry integration",
      "On-site parameter calibration for Mains Voltage, AC Load Currents (#1 & #2), Solar Array Current, and Room Temperature",
      "Simple 3-button configuration: SW1 (Increment), SW2 (Decrement), and SW3 (Enter / Confirm)",
    ],
    calibration: [
      { parameter: "LVD1 Cut off", maxVal: "60.0V", minVal: "20.0V", defaultVal: "44.0V", desc: "First stage load disconnect voltage" },
      { parameter: "LVD1 Cut in", maxVal: "60.0V", minVal: "20.0V", defaultVal: "45.0V", desc: "First stage load reconnect voltage" },
      { parameter: "LVD2 Cut off", maxVal: "60.0V", minVal: "20.0V", defaultVal: "42.0V", desc: "Second stage critical disconnect voltage" },
      { parameter: "LVD2 Cut in", maxVal: "60.0V", minVal: "20.0V", defaultVal: "43.0V", desc: "Second stage critical reconnect voltage" },
    ],
    applications: [
      {
        title: "Telecom Towers & Base Stations",
        desc: "Protects deep-cycle backup battery banks from destructive over-discharge during prolonged grid outages.",
      },
      {
        title: "Solar Off-Grid & Hybrid Plants",
        desc: "Manages solar array load shedding and battery health monitoring with automated reconnect profiles.",
      },
      {
        title: "Industrial UPS & Data Centers",
        desc: "Essential safeguard for DC distribution panels, switchgear battery banks, and critical control equipment.",
      },
    ],
    warranty: "Industrial OEM Warranty with On-Site Calibration Guidance and Technical Field Documentation.",
  },

  // ─── 5. PARKING GUIDANCE SYSTEM & VIDEO CAR SEARCH ───────────────────────────
  "parking-guidance-system": {
    id: "parking",
    slug: "intelligent-parking-guidance-system",
    category: "access",
    categoryLabel: "Smart Infrastructure & Access",
    badge: "Smart Mobility & Parking Management",
    name: "Intelligent Parking Space Guidance & Video Car Search System",
    tagline: "Automated ultrasonic/video space guidance with interactive License Plate Video Car Search Terminals.",
    description:
      "The Intelligent Parking Space Guidance System optimizes parking facility throughput, eliminates vehicle searching congestion, and enhances customer satisfaction. Through eye-catching LED directional guidance screens and ultrasonic/video space detectors, drivers are navigated smoothly to open stalls. The integrated Video Car Search Terminal allows drivers to instantly locate their parked vehicle by license plate or parking timestamp.",
    usp: "Eliminates customer parking hassles, maximizes space turnover rate, and enables instant vehicle locator search via interactive kiosk terminals.",
    image: "/tradecode/assets/product-parking.jpg",
    specs: [
      { label: "System Architecture", value: "Ultrasonic / Video Space Detectors + Central Controller + LED Wayfinding" },
      { label: "Occupancy Indicators", value: "High-Luminance Dual-Color LED Indicators (Green: Empty, Red: Occupied)" },
      { label: "Wayfinding Screens", value: "Multi-Directional LED Displays showing real-time available stall counts per aisle" },
      { label: "Search Terminal", value: "Interactive Touchscreen Kiosk with High-Accuracy ANPR License Plate OCR" },
      { label: "Search Methods", value: "License Plate Number / Parking Time Range / Stall Zone Navigation Map" },
      { label: "Network Interface", value: "TCP/IP, RS-485, and Cloud Central Management Integration" },
    ],
    features: [
      "Precision Space Guidance: Eye-catching overhead LED lights guide drivers directly to vacant bays without circling",
      "Video Car Search Terminal: Drivers enter their license plate on the touch kiosk to view exact vehicle location and route",
      "Maximizes Utilization: Increases parking lot turnover rate and lowers operational management overheads",
      "Traffic Optimization: Reduces congestion, carbon emissions, and transit idle time inside enclosed garages",
      "Central Management Dashboard: Real-time parking occupancy statistics, revenue analytics, and space utilization reports",
    ],
    applications: [
      {
        title: "Shopping Malls & Retail Hubs",
        desc: "Drastically improves shopper experience and customer return rates by eliminating parking confusion and vehicle search delays.",
      },
      {
        title: "Airports & Multi-Level Transit Hubs",
        desc: "Provides frictionless short-term and long-term parking guidance for thousands of daily travelers and fleet vehicles.",
      },
      {
        title: "Commercial Towers & IT Parks",
        desc: "Streamlines tenant and visitor vehicle allocation with automated space counting and VIP bay reservation integration.",
      },
    ],
    warranty: "Full System Hardware Warranty, Software License & On-Site Installation Commissioning.",
  },

  // ─── 6. PROXIMITY & RFID ACCESS CARD READERS ─────────────────────────────────
  "proximity-access-readers": {
    id: "proximity",
    slug: "proximity-rfid-card-readers",
    category: "access",
    categoryLabel: "Smart Infrastructure & Access",
    badge: "Enterprise Access Control",
    name: "High-Performance Proximity & RFID Access Card Readers",
    tagline: "Versatile, worldwide-recognized proximity readers across mini, mullion, vandal-resistant, and keypad models.",
    description:
      "Our proximity card readers are high-performance access control units engineered for commercial, institutional, and industrial facilities. Operating across 5 to 12.5 VDC and supporting standard industry output formats (Wiegand, Magstripe, and Serial ASCII), they integrate seamlessly into existing controllers and modern security networks. Available in mini, slim mullion, heavy-duty vandal-resistant, and combined card reader/keypad variants.",
    usp: "Full modular product range including mini, mullion, metal vandal-resistant, and keypad combo units with universal Wiegand/Serial compatibility.",
    image: "/tradecode/assets/product-proximity.jpg",
    specs: [
      { label: "Operating Voltage", value: "5.0 VDC to 12.5 VDC Regulated" },
      { label: "Read Range", value: "Up to 10 cm (depending on card type and physical environment)" },
      { label: "Interface Formats", value: "Wiegand 26/34-bit, Clock-and-Data Magstripe, Serial ASCII (RS-232/RS-485)" },
      { label: "Enclosure Variants", value: "Mini, Slim Mullion (Door Frame), Vandal-Resistant Metal, Keypad Combo" },
      { label: "Status Indicators", value: "Multi-Color LED Bar (Red / Green / Blue) and Audible Beeper" },
      { label: "Protection Rating", value: "IP65 Weatherproof & Vandal-Resistant Sealed Housing for Indoor/Outdoor Use" },
    ],
    features: [
      "Broad form factor family: Mini, door-frame mullion, rugged all-metal vandal-resistant, and dual PIN + RFID reader combinations",
      "Universal Controller Compatibility: Supports Wiegand, Magstripe, and Serial ASCII outputs for effortless retrofits",
      "Low power consumption architecture running efficiently from 5 to 12.5 VDC power supplies",
      "Weatherproof IP65 construction with potting compound protection for harsh indoor and outdoor environments",
      "Bi-color LED light bar and internal buzzer with external host control capabilities",
    ],
    applications: [
      {
        title: "Corporate Office Doors & Turnstiles",
        desc: "Slim mullion profile fits perfectly on narrow aluminum glass door frames and optical pedestrian speed gates.",
      },
      {
        title: "High-Security Server Rooms & Vaults",
        desc: "Combined RFID Card + PIN Keypad models ensure multi-factor physical access control for critical infrastructure.",
      },
      {
        title: "Outdoor Perimeter Gates & Elevators",
        desc: "Vandal-resistant metal units withstand external environmental exposure, mechanical impacts, and heavy daily usage.",
      },
    ],
    warranty: "Lifetime Standard Hardware Warranty with Direct OEM Replacement Support.",
  },

  // ─── 7. PTZ ROBOTIC OPTICAL CAMERAS ──────────────────────────────────────────
  "ptz-camera-systems": {
    id: "ptz-camera",
    slug: "ptz-robotic-optical-cameras",
    category: "security",
    categoryLabel: "Security & Surveillance",
    badge: "Robotic Video & Surveillance",
    name: "Enterprise PTZ Robotic Pan-Tilt-Zoom Optical Cameras",
    tagline: "High-precision robotic video cameras with optical zoom up to 30x, full 360° pan, and IP/SDI/HDMI/USB workflows.",
    description:
      "PTZ (Pan-Tilt-Zoom) cameras are motorized robotic video systems that empower a single operator or automated system to pan horizontally, tilt vertically, and zoom optically without digital pixelation. Built for live event broadcasting, distance learning, telemedicine, corporate boardrooms, and high-security facility surveillance, these cameras deliver pristine image quality and effortless remote preset control.",
    usp: "Full 360° pan coverage with up to 30x optical zoom, automated AI subject tracking, and multi-protocol IP/SDI/NDI control from OBS, vMix, or hardware joysticks.",
    image: "/tradecode/assets/product-ptz.jpg",
    specs: [
      { label: "Optical Zoom", value: "10x / 20x / 30x Lossless Optical Zoom Lenses" },
      { label: "Pan / Tilt Range", value: "Pan: 0° to 360° Continuous / Tilt: -30° to +90° / 180° Vertical" },
      { label: "Video Outputs", value: "3G-SDI, HDMI 2.0, USB 3.0, and IP (RTSP / RTMP / NDI|HX)" },
      { label: "Control Protocols", value: "VISCA over IP, VISCA Serial (RS-232/RS-485), Pelco-D/P, ONVIF" },
      { label: "Control Options", value: "IP Hardware Joystick, IR Remote, OBS, vMix, TriCaster, Software GUI" },
      { label: "Presets", value: "Up to 255 Customizable Position Presets with Smooth Robotic Recalls" },
      { label: "AI Features", value: "Automated Human Subject Tracking and Auto-Framing without manual operator" },
    ],
    features: [
      "Reduced Manpower: A single camera operator can control multiple robotic PTZ cameras simultaneously from one switcher",
      "Unparalleled Access & Compact Footprint: Can be mounted on ceilings, trusses, and remote corners where human camera operators cannot fit",
      "Massive Optical Reach: 10x, 20x, and 30x lossless optical zoom captures subjects with crisp fidelity from hundreds of feet away",
      "Automated Subject Tracking: Advanced AI computer vision adjusts field of view automatically to follow moving presenters or security targets",
      "Seamless Software Integration: Native plug-in support for OBS Studio, vMix, Wirecast, TriCaster, and Zoom Rooms",
    ],
    applications: [
      {
        title: "Broadcast Television & Event Production",
        desc: "Multi-camera live concert, sports, and studio broadcasting with synchronized joystick preset recalls and tally indicators.",
      },
      {
        title: "Enterprise Boardrooms & Hybrid Classrooms",
        desc: "Distance learning and executive video conferencing with automated lecturer tracking and crystal-clear whiteboard zoom.",
      },
      {
        title: "High-Security Perimeter Surveillance",
        desc: "Wide-area perimeter surveillance across tech parks, government campuses, and industrial infrastructure with rapid tour patrols.",
      },
    ],
    warranty: "3-Year Commercial Warranty with Remote Configuration Support and Firmware Updates.",
  },
};
