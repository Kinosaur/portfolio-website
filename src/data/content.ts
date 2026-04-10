export const siteContent = {
  name: "Kaung Khant Lin",
  hero: {
    headline: "Kaung Khant Lin",
    subheadline:
      "Final-year CS student at Assumption University, Bangkok.\nMoving toward data engineering — currently strongest in Python data\nprocessing and visualization, learning warehousing and orchestration now.",
    cta: "View Featured Work",
  },
  featuredCaseStudy: {
    label: "FEATURED PROJECT",
    title: "Transparent City",
    tagline: "Civic Data Visualization Platform",
    problem:
      "Bangkok's Traffy Fondue platform has generated 1.1M+ civic feedback tickets, but residents have no unified view to see what's been reported, where, or whether anything is moving.",
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
        text: "Interactive D3.js dashboard surfacing categories, geography, and temporal patterns.",
      },
    ],
    demonstrates: [
      "Working with a real-world dataset at non-trivial scale (1.1M rows)",
      "Diagnosing and handling messy input — not just happy-path data",
      "Thinking about the boundary between processing and serving",
      "Owning a project end-to-end, from raw export to deployed UI",
    ],
    githubUrl: "https://github.com/Kinosaur",
    liveUrl: "#",
  },
  about: {
    paragraphs: [
      "I'm a final-year Computer Science student at Assumption University in Bangkok, originally from Myanmar. I'm focused on becoming a data engineer — currently strongest in Python-side data processing and visualization, and actively learning the warehousing, modeling, and orchestration tools that make up the rest of the stack.",
      "What pulls me toward this kind of work is civic transparency in Southeast Asia. Most of the data that should be public here either isn't, or exists in a form nobody can use. Projects like Transparent City and Breath Before You Go are my way of practicing the craft on problems I actually care about.",
    ],
  },
  contact: {
    email: "kaungkhantlin999@gmail.com",
    github: "https://github.com/Kinosaur",
    linkedin: "https://linkedin.com/in/kaung-khant-lin-kino",
  },
};
