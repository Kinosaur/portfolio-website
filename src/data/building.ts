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
    id: "datacamp-de",
    title: "DataCamp Data Engineering Career Track",
    description:
      "Working through warehousing, orchestration, and pipeline tooling — SQL, dbt, Airflow. Directly filling the gaps between what I can do now and a full DE stack.",
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
