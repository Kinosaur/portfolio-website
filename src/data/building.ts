export type BuildStatus = "in_progress" | "planned";

export interface BuildingItem {
  id: string;
  title: string;
  description: string;
  status: BuildStatus;
  repoUrl?: string;
}

export const buildingItems: BuildingItem[] = [
  {
    id: "retail-insights",
    title: "Retail Insights",
    description:
      "Ongoing project focused on data engineering: pipeline and analytics for small clothing shops to surface top revenue products, dead stock, and stock-aware reorder timing from operational data.",
    status: "in_progress",
    repoUrl: "https://github.com/Kinosaur/retail-insights",
  },
  {
    id: "unimatch-educompare",
    title: "UniMatch (EduCompare)",
    description:
      "Ongoing project where I contribute on data engineering and light frontend support for a FastAPI + React + PostgreSQL (Neon) platform that compares universities/programs in parts of Thailand, Taiwan, and Singapore using verifiable data.",
    status: "in_progress",
    repoUrl: "https://github.com/PyaeSone-Hein/eduHelper",
  },
  {
    id: "datacamp-de",
    title: "DataCamp Data Engineering Career Track",
    description:
      "Just started this track. Learning warehousing, orchestration, and pipeline tooling — SQL, dbt, Airflow — to fill the gaps between what I can do now and a full DE stack.",
    status: "in_progress",
  },
  {
    id: "au-wallet",
    title: "AU Wallet — Senior Project 2",
    description:
      "Part of the AU SuperApp and Thailand's National Document Wallet initiative. Data side: verifiable document issuance and storage for student credentials (certifications, diplomas). Early-stage scoping with project advisor.",
    status: "planned",
  },
];
