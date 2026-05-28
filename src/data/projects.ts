export interface Project {
  id: string;
  tag: string;
  title: string;
  subtitle: string;
  description: string;
  stack: string[];
  githubUrl: string;
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
    id: "seeit-cv",
    tag: "UNSTRUCTURED DATA",
    title: "SEEiT — Computer Vision Capstone",
    subtitle: "Pipeline for ingesting and processing image data",
    description:
      "Senior capstone built around a CV model. Included here for the data side: ingestion, preprocessing, and storage of unstructured image data — a concern that scales differently than tabular pipelines.",
    stack: ["TypeScript", "CV libraries", "image processing"],
    githubUrl: "https://github.com/Kinosaur/SEEiT-CV",
    liveUrl: "https://github.com/Kinosaur/SEEiT-CV/blob/main/docs/SEEiT_Senior_Porject_1_report.pdf",
    liveLabel: "Documentation",
  },
];

export const featuredProject = projects.find((p) => p.featured)!;
