export interface Project {
  id: string;
  tag: string;
  title: string;
  subtitle: string;
  description: string;
  stack: string[];
  githubUrl?: string;
  liveUrl?: string;
  liveLabel?: string;
  featured?: boolean;
}

export const projects: Project[] = [
  {
    id: "transparent-city",
    tag: "CIVIC TECH",
    title: "Transparent City",
    subtitle: "1.1M+ civic tickets ingested, cleaned, and visualized",
    description:
      "End-to-end project taking raw Traffy Fondue exports through cleaning, geolocation handling, and aggregation into an interactive dashboard. Weekly-refreshed snapshot of Bangkok's civic feedback data.",
    stack: ["Python", "pandas", "TypeScript", "Next.js", "D3.js", "Vercel"],
    githubUrl: "https://github.com/Kinosaur/transparent-city",
    liveUrl: "https://transparent-city.vercel.app/",
    liveLabel: "Live Demo",
    featured: true,
  },
  {
    id: "breath-before-you-go",
    tag: "DATA VIZ",
    title: "Breath Before You Go",
    subtitle: "Air quality across 15 Asian cities, with seasonal patterns",
    description:
      "Multi-source environmental data aggregated into a decision-support dashboard for travel and outdoor planning across Southeast Asia.",
    stack: ["TypeScript", "Next.js", "D3.js", "environmental APIs"],
    githubUrl: "https://github.com/Kinosaur/breath-before-you-go",
    liveUrl: "https://breath-before-you-go.vercel.app/",
    liveLabel: "Live Demo",
  },
  {
    id: "retail-insights",
    tag: "DATA PIPELINE",
    title: "Retail Insights Engine",
    subtitle: "Python backend turning messy retail CSVs into structured business intelligence",
    description:
      "FastAPI + PostgreSQL pipeline that ingests dirty sales and inventory data, runs five analytics queries (top products, dead stock, reorder timing), then routes aggregated results through an LLM for plain-English summaries. Built against 155K synthetic transactions and 801 SKUs. 34-test pytest suite.",
    stack: ["Python", "FastAPI", "pandas", "PostgreSQL", "SQLAlchemy", "Groq AI", "pytest"],
    githubUrl: "https://github.com/Kinosaur/retail-insights",
  },
  {
    id: "seeit-cv",
    tag: "ACCESSIBILITY · CV",
    title: "SEEiT — Computer Vision Capstone",
    subtitle: "Real-time object detection and audio feedback for visually impaired users",
    description:
      "Accessibility-focused mobile app using on-device object detection and text-to-speech to help visually impaired users understand their surroundings. Built around live camera input and unstructured image data, with color-blind support and an accessibility-first UI.",
    stack: ["React Native", "ML Kit", "Text-to-Speech", "Android"],
    githubUrl: "https://github.com/Kinosaur/SEEiT-CV",
    liveUrl: "https://github.com/Kinosaur/SEEiT-CV/blob/main/docs/SEEiT_Senior_Porject_1_report.pdf",
    liveLabel: "Documentation",
  },
];

/* Personal projects — shown in their own section. Kino's repo is private,
   so it has no githubUrl; Motion Ghost has no public live demo. */
export const personalProjects: Project[] = [
  {
    id: "kino-library",
    tag: "FULL-STACK",
    title: "Kino Library",
    subtitle: "A personal bookshelf with a private admin workflow",
    description:
      "A quiet public shelf for a real book collection, paired with a local-only admin for data entry. Next.js public site backed by Supabase Postgres and Storage; a separate local FastAPI tool handles image uploads, keeping a clean public/private data boundary.",
    stack: ["Next.js", "Supabase", "PostgreSQL", "FastAPI", "ISR"],
    liveUrl: "https://kino-library.vercel.app/",
    liveLabel: "Live Site",
  },
  {
    id: "motion-ghost",
    tag: "CREATIVE CODING",
    title: "Motion Ghost",
    subtitle: "A browser camera that reveals only movement",
    description:
      "A real-time WebGL2 camera effect that isolates motion and renders it as light. Everything runs locally — webcam frames become a motion mask, then a shader pass, with MediaRecorder export. No footage ever leaves the device.",
    stack: ["WebGL2", "GLSL", "TypeScript", "MediaRecorder API"],
    githubUrl: "https://github.com/Kinosaur/motion-ghost-camera",
  },
];

export const featuredProject = projects.find((p) => p.featured)!;
