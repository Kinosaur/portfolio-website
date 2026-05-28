export const siteContent = {
  name: "Kaung Khant Lin",
  hero: {
    eyebrow: "Portfolio · Data Engineering",
    cta: "View Featured Work",
    positioning:
      "Moving toward data engineering — currently strongest in Python data processing and visualization, learning warehousing and orchestration now.",
    positioningShort:
      "Final-year CS student in Bangkok. Python pipelines, data visualization, learning the full DE stack.",
  },
  featuredCaseStudy: {
    label: "Featured Project",
    title: "Transparent City",
    tagline: "Civic Data Visualization Platform",
    problem:
      "Bangkok's Traffy Fondue platform has generated 1.1M+ civic feedback tickets, but residents have no unified view to see what's been reported, where, or whether anything is moving. Most public-facing views are Thai-first, which can limit access for non-Thai users.",
    approach: [
      {
        label: "Ingestion",
        text: "Python script pulling from the Traffy Fondue export, normalized into a clean tabular schema. Weekly-refreshed snapshot of ~1.1M tickets, based on the latest successful pipeline run.",
      },
      {
        label: "Data quality",
        text: "~15% of records missing geolocation; multiple inconsistent category labels for the same issue type. Handled both with pandas preprocessing and a category mapping table.",
      },
      {
        label: "Delivery shape",
        text: "Aggregated and pre-sliced the data so the Next.js frontend never has to parse the full dataset at runtime.",
      },
      {
        label: "Visualization",
        text: "Interactive D3.js dashboard surfacing categories, geography, and temporal patterns, available in both Thai and English.",
      },
    ],
    stats: [
      { value: "1.1M+", label: "civic tickets ingested" },
      { value: "~15%", label: "missing geo — handled" },
      { value: "Weekly", label: "pipeline refresh" },
    ],
    githubUrl: "https://github.com/Kinosaur/transparent-city",
    liveUrl: "https://transparent-city.vercel.app/",
  },
  about: {
    paragraphs: [
      "CS student in Bangkok, from Myanmar. Building toward data engineering — Python pipelines and visualization now, full DE stack in progress.",
      "Drawn to civic data in Southeast Asia. Most useful public data here is either missing or locked away. Transparent City and Breath Before You Go are the practice ground.",
    ],
  },
  contact: {
    email: "kaungkhantlin999@gmail.com",
    github: "https://github.com/Kinosaur",
    linkedin: "https://www.linkedin.com/in/kaungkhantlin-kinosaur/",
  },
  availability: {
    status: "OPEN TO ROLES",
    note: "Seeking data engineering roles. Graduating 2026.",
  },
};
