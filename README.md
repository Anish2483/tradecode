# Tradecode Innovations — Website

Official website for **Tradecode Technologies** — a deep-tech consultancy building Agentic AI, Robotics & Automation for founders and enterprises.

🌐 Live: [tradecode.in](https://tradecode.in)

---

## Tech Stack

- **Framework**: [TanStack Start](https://tanstack.com/start) (React 19, SSR)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com) + [tw-animate-css](https://github.com/joe-bell/tw-animate-css)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **UI Components**: [Radix UI](https://radix-ui.com) + [shadcn/ui](https://ui.shadcn.com)
- **Icons**: [Lucide React](https://lucide.dev)
- **Build**: [Vite 8](https://vitejs.dev) + [Nitro](https://nitro.unjs.io)
- **Package Manager**: [Bun](https://bun.sh)

---

## Getting Started

```bash
# Install dependencies
bun install

# Start dev server
bun run dev

# Build for production
bun run build

# Preview production build
bun run preview
```

---

## Project Structure

```
src/
├── assets/           # Static assets (images, videos via asset.json)
├── components/
│   ├── brand/        # Logo, brand assets
│   ├── hero/         # Hero section components (LogoVideo, SpotlightCard)
│   ├── layout/       # Header, Footer, NoticeBar, PageShell
│   ├── service/      # Service page components
│   └── ui/           # Radix-based UI primitives
├── content/          # Shared content data (services, etc.)
├── hooks/            # Custom React hooks
├── lib/              # Utilities
├── routes/           # File-based routing (TanStack Router)
│   ├── index.tsx     # Home page
│   ├── about.tsx
│   ├── contact.tsx
│   ├── services/     # Service sub-pages
│   └── legal/        # Legal pages
├── styles.css        # Global styles + Tailwind config
├── router.tsx        # Router setup
└── server.ts         # SSR server entry
```

---

## Deployment

### Netlify (Recommended)
1. Connect GitHub repo to Netlify
2. Build command: `npm run build`
3. Publish directory: `.output/public`

### Vercel
1. Import repo to Vercel
2. Framework: auto-detect
3. Deploy

### Cloudflare Pages
1. Connect GitHub repo
2. Build command: `npm run build`
3. Output directory: `.output/public`

---

## About Tradecode

Tradecode Technologies is headquartered in **Dehradun, Uttarakhand, India**.
We build agentic AI systems, robotics, automation, and scalable digital solutions — engineered by senior operators.

📧 [hello@tradecode.in](mailto:hello@tradecode.in)
📍 Rajpur Road, Dehradun, Uttarakhand 248001
