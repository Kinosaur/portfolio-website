export interface SkillGroup {
  category: string;
  items: string[];
}

export interface SkillTier {
  tier: "proficient" | "learning" | "exploring";
  label: string;
  description: string;
  groups: SkillGroup[];
}

export const skills: SkillTier[] = [
  {
    tier: "proficient",
    label: "Proficient",
    description: "Things I've used to actually build something that works",
    groups: [
      {
        category: "Data processing",
        items: ["Python", "pandas", "NumPy", "Jupyter", "Matplotlib"],
      },
      {
        category: "Frontend & viz",
        items: ["TypeScript", "React", "Next.js", "D3.js"],
      },
      {
        category: "Tooling",
        items: ["Git", "GitHub", "Vercel", "Linux/shell"],
      },
    ],
  },
  {
    tier: "learning",
    label: "Learning Now",
    description: "Actively working through these — courses + small projects",
    groups: [
      {
        category: "SQL & warehousing",
        items: ["PostgreSQL", "DuckDB", "window functions", "data modeling"],
      },
      {
        category: "Transformations",
        items: ["dbt fundamentals"],
      },
      {
        category: "Orchestration",
        items: ["Airflow basics"],
      },
    ],
  },
  {
    tier: "exploring",
    label: "Exploring",
    description: "Read about, understand the shape of, haven't built with yet",
    groups: [
      {
        category: "Streaming",
        items: ["Kafka", "event-driven architectures"],
      },
      {
        category: "Data quality",
        items: ["Great Expectations", "validation pipelines"],
      },
      {
        category: "Cloud DE",
        items: ["AWS data services", "Snowflake / BigQuery"],
      },
    ],
  },
];
