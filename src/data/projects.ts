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
    githubUrl: "https://github.com/Kinosaur",
    liveUrl: "#",
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
    githubUrl: "https://github.com/Kinosaur",
    liveUrl: "#",
    liveLabel: "Live Demo",
  },
  {
    id: "weightlifting",
    tag: "CS FUNDAMENTALS",
    title: "Weightlifting (Google Code Jam)",
    subtitle: "Interval DP solution, O(E³) complexity",
    description:
      "Solved using interval dynamic programming and memoization. Included because data engineering work eventually requires reasoning about algorithmic cost — not just calling library functions.",
    stack: ["Python", "dynamic programming"],
    githubUrl: "https://github.com/Kinosaur",
    liveLabel: "Writeup",
  },
  {
    id: "data-analytics",
    tag: "DATA QUALITY",
    title: "Data Analytics & Cleaning Portfolio",
    subtitle: "End-to-end EDA on real-world datasets",
    description:
      "Cleaning, validation, and exploratory analysis on messy public datasets. Practice ground for the boring but essential half of data work.",
    stack: ["Python", "pandas", "NumPy", "Jupyter", "Matplotlib"],
    githubUrl: "https://github.com/Kinosaur",
    liveLabel: "Notebook",
  },
  {
    id: "seeit-cv",
    tag: "UNSTRUCTURED DATA",
    title: "SEEiT — Computer Vision Capstone",
    subtitle: "Pipeline for ingesting and processing image data",
    description:
      "Senior capstone built around a CV model. Included here for the data side: ingestion, preprocessing, and storage of unstructured image data — a concern that scales differently than tabular pipelines.",
    stack: ["TypeScript", "CV libraries", "image processing"],
    githubUrl: "https://github.com/Kinosaur",
    liveLabel: "Documentation",
  },
];

export const featuredProject = projects.find((p) => p.featured)!;
