# Data Engineering Portfolio Website — Blueprint v2 (Revised)

**North Star**: "Interface that makes my projects understandable in 30 seconds, with depth available for technical interviewers."

**Core Philosophy**: Honest, student-centric positioning. Show the *direction* I'm moving in (Data Engineering) and back it up with the work that's already shipped plus the work that's in flight. No inflated metrics, no senior-engineer cosplay.

**`[CHANGED]` What's different from v1**: Tightened the DE framing so the projects and the headline match. Reframed Weightlifting and SEEiT-CV so they earn their slots. Fixed honesty issues in the Transparent City case study language ("real-time" → only if it actually is). Expanded the About section. Added a "Currently Building" strip so the in-flight DE projects are visible without being claimed as done.

---

## 1. Site Structure & Navigation Flow

```
Home (/)
├── Hero Section
├── Featured Case Study (transparent-city)
├── Projects Grid (5 curated projects)
├── Currently Building              [CHANGED — new section]
├── Skills Matrix (Proficient / Learning Now / Exploring)   [CHANGED — 3 tiers, not 2]
├── About
└── Contact
```

**Navigation Bar** (sticky):
- Logo/Name (left)
- Featured | Projects | Building | Skills | About | Contact
- Dark/Light toggle (right)

---

## 2. Page Content

### 2.1 Hero Section

**`[CHANGED]`** Sharper positioning that names the direction explicitly instead of saying "data systems."

```
Kaung Khant Lin

Final-year CS student at Assumption University, Bangkok.
Moving toward data engineering — currently strongest in Python data
processing and visualization, learning warehousing and orchestration now.
```

**Why this works**:
- Names the actual direction (data engineering) without claiming to be there yet
- "Currently strongest in… learning… now" is the honest two-step that signals trajectory
- Geographic anchor (Bangkok, AU) is concrete and memorable
- Recruiters scanning for DE will not be misled; recruiters scanning for analytics/SWE will still find a fit

CTA: **`View Featured Work ↓`**

---

### 2.2 Featured Case Study: Transparent City

**`[CHANGED]`** Language audited for honesty. Only claim "real-time" / "pipeline" if the implementation actually does that. If it's a one-shot batch job processed in a notebook, the language below uses "batch ingestion" and "snapshot" — adjust to whichever is true. Be ready for an interviewer to ask "how often does this update?"

```
FEATURED PROJECT

Transparent City — Civic Data Visualization Platform

PROBLEM
Bangkok's Traffy Fondue platform has generated 1.1M+ civic feedback
tickets, but residents have no unified view to see what's been reported,
where, or whether anything is moving.

APPROACH
• Ingestion         Python script pulling 1.1M+ tickets from the
                    Traffy Fondue export, normalized into a clean
                    tabular schema.
• Data quality      ~15% of records missing geolocation; multiple
                    inconsistent category labels for the same issue
                    type. Handled both with pandas preprocessing
                    and a category mapping table.
• Delivery shape    Aggregated and pre-sliced the data so the
                    Next.js frontend never has to parse the full
                    1.1M-row file at runtime.
• Visualization     Interactive D3.js dashboard surfacing categories,
                    geography, and temporal patterns.

WHAT THIS DEMONSTRATES
- Working with a real-world dataset at non-trivial scale (1.1M rows)
- Diagnosing and handling messy input — not just happy-path data
- Thinking about the boundary between processing and serving
- Owning a project end-to-end, from raw export to deployed UI

[GitHub]   [Live Demo]
```

**`[CHANGED]` Removed**: the bold "Real-time civic transparency" claim. If the dashboard reads from a static processed file, "real-time" is wrong and an interviewer will catch it. "What this demonstrates" replaces "Result" because for a student project, what it *shows about you* matters more than fake KPIs.

**Honest upgrade path** (do this later, not now): if you want this project to truly earn the "data engineering" badge, the next version should add scheduled ingestion (cron + script, or Airflow DAG once you learn it) and store snapshots in Postgres or DuckDB. Then "pipeline" stops being aspirational.

---

### 2.3 Projects Grid (5 curated)

**`[CHANGED]`** Reframed cards 3 and 5 so they connect to the DE narrative. Card 4 is fine as-is.

**Project 1 — Transparent City** *(unchanged framing, just trimmed)*
```
[CIVIC TECH]   Transparent City
↳ 1.1M+ civic tickets ingested, cleaned, and visualized

End-to-end project taking raw Traffy Fondue exports through cleaning,
geolocation handling, and aggregation into an interactive dashboard.

Stack: Python · pandas · TypeScript · Next.js · D3.js · Vercel
[GitHub] [Live Demo]
```

**Project 2 — Breath Before You Go** *(unchanged)*
```
[DATA VIZ]   Breath Before You Go
↳ Air quality across 15 Asian cities, with seasonal patterns

Multi-source environmental data aggregated into a decision-support
dashboard for travel and outdoor planning across Southeast Asia.

Stack: TypeScript · Next.js · D3.js · environmental APIs
[GitHub] [Live Demo]
```

**Project 3 — Weightlifting (Algorithms)** **`[CHANGED]`** *honest reframing*
```
[CS FUNDAMENTALS]   Weightlifting (Google Code Jam)
↳ Interval DP solution, O(E³) complexity

Solved using interval dynamic programming and memoization. Included
because data engineering work eventually requires reasoning about
algorithmic cost — not just calling library functions.

Stack: Python · dynamic programming
[GitHub] [Writeup]
```
*The earlier card oversold the DE link. The new framing is honest: it's a CS-fundamentals signal, not a DE project, and that's a fine thing for it to be.* **If you build a SQL/dbt/Airflow project before launch, swap this card out for that one — it will serve the narrative better.**

**Project 4 — Data Analytics & Cleaning Portfolio** *(unchanged)*
```
[DATA QUALITY]   Data Analytics & Cleaning Portfolio
↳ End-to-end EDA on real-world datasets

Cleaning, validation, and exploratory analysis on messy public datasets.
Practice ground for the "boring but essential" half of data work.

Stack: Python · pandas · NumPy · Jupyter · Matplotlib
[GitHub] [Notebook]
```

**Project 5 — SEEiT-CV** **`[CHANGED]`** *reframed around the data angle, not the CV angle*
```
[UNSTRUCTURED DATA]   SEEiT — Computer Vision Capstone
↳ Pipeline for ingesting and processing image data

Senior capstone built around a CV model. Included here for the data
side: ingestion, preprocessing, and storage of unstructured image
data — a concern that scales differently than tabular pipelines.

Stack: TypeScript · CV libraries · image processing
[GitHub] [Documentation]
```
*Same project, but the card now sells the part that matters for a DE-focused portfolio.*

---

### 2.4 Currently Building **`[CHANGED — new section]`**

**Purpose**: Show momentum. You said new projects and courses are in motion — make that visible without claiming any of it is done.

```
CURRENTLY BUILDING

A small, scrollable strip (3–5 items) of work-in-progress:

  → [Project name]                          (status: in progress)
    One-line description. Link to repo if public.

  → Learning: [course / topic]              (status: in progress)
    e.g. "dbt fundamentals" or "Airflow on a personal pipeline"

  → [Next project name]                     (status: planned)
```

**Design notes**:
- Visually distinct from the main Projects Grid — lighter background, smaller cards, "in progress" tag
- Be explicit about status: `in progress` or `planned`, never blank
- Update this every couple of weeks; if it goes stale it does the opposite of its job
- 3 items minimum, 5 maximum
- This section is the single most powerful thing you can add for the DE narrative, because it shows you're moving, not just claiming

---

### 2.5 Skills Matrix **`[CHANGED — 3 tiers]`**

The two-tier (Proficient / Exploring) version was good but had a gap: it didn't show what you're *actively learning right now*, which is exactly the thing that makes a student credible.

```
PROFICIENT
(things I've used to actually build something that works)

  Data processing       Python · pandas · NumPy · Jupyter · Matplotlib
  Frontend & viz        TypeScript · React · Next.js · D3.js
  Tooling               Git · GitHub · Vercel · Linux/shell

LEARNING NOW                                          [CHANGED — new tier]
(actively working through these — courses + small projects)

  SQL & warehousing     PostgreSQL · DuckDB · window functions · modeling
  Transformations       dbt fundamentals
  Orchestration         Airflow basics

EXPLORING
(read about, understand the shape of, haven't built with yet)

  Streaming             Kafka · event-driven architectures
  Data quality          Great Expectations · validation pipelines
  Cloud DE              AWS data services · Snowflake / BigQuery
```

**Why three tiers is better than two**:
- Proficient = trust signal (don't dilute it)
- Learning Now = momentum signal (the most important one for a student)
- Exploring = roadmap signal (shows you know where you're going)
- An interviewer reading this immediately knows what to ask about and what not to grill you on

**Honesty rule**: only put something in *Learning Now* if you can name the course or project you're using to learn it. If asked "what are you doing for SQL?", you should be able to answer in one sentence.

---

### 2.6 About Section **`[CHANGED — expanded]`**

The original four sentences undersold the most distinctive thing about you. Two short paragraphs.

```
ABOUT

I'm a final-year Computer Science student at Assumption University in
Bangkok, originally from Myanmar. I'm focused on becoming a data
engineer — currently strongest in Python-side data processing and
visualization, and actively learning the warehousing, modeling, and
orchestration tools that make up the rest of the stack.

What pulls me toward this kind of work is civic transparency in
Southeast Asia. Most of the data that should be public here either
isn't, or exists in a form nobody can use. Projects like Transparent
City and Breath Before You Go are my way of practicing the craft on
problems I actually care about.
```

**Why this works**:
- First paragraph = the technical reality (where you are, where you're going, no inflation)
- Second paragraph = the *why*, which is what makes you memorable vs. every other CS student
- Myanmar + Bangkok + civic transparency in SEA is a real differentiator and now gets the room it deserves
- Still honest, still short (under 120 words)

---

### 2.7 Contact

```
GET IN TOUCH

[Email]   [GitHub]   [LinkedIn]
```
- Footer-style, minimal
- No form
- LinkedIn link confirmed: linkedin.com/in/kaung-khant-lin-kino

---

## 3. Design System

*(Unchanged from v1 — palette, typography, spacing all fine. One small note below.)*

**`[CHANGED]` Optional accent decision**: the slate + blue + Geist combo is competent but generic. Since your *content* angle is distinctive (SEA civic tech), you could afford one small distinctive move:
- A custom accent color drawn from Bangkok / Traffy Fondue branding, OR
- A Burmese or Thai typographic detail in the H1 (e.g., your name in both scripts), OR
- A literal slice of a Transparent City visualization as the hero background

None of these are required. But the current palette won't help you stand out the way the writing will. Pick one, or pick none — just don't add three.

---

## 4. Component Breakdown

*(Unchanged from v1, plus one new component for the new section.)*

**`[CHANGED]` New: `<CurrentlyBuilding />`**
```
src/components/CurrentlyBuilding.tsx
```
- Lighter background than ProjectsGrid
- Each item: title · status pill · one-line description · optional repo link
- Status pill colors: `in progress` (amber), `planned` (gray)
- Driven by `src/data/building.ts` so you can update without touching component code

---

## 5. Animation & Interaction

*(Unchanged from v1 — the "purposeful only" principle is correct and the specific animations table is well-chosen.)*

---

## 6. Technical Stack & Architecture

*(Unchanged from v1.)*

One small addition to `src/data/`:
```
src/data/
  ├── projects.ts
  ├── building.ts        [CHANGED — new]
  ├── skills.ts
  └── content.ts
```

---

## 7. Final Content Summary

**Hero**
- Name: Kaung Khant Lin
- Positioning: Final-year CS student at Assumption University, Bangkok. Moving toward data engineering — currently strongest in Python data processing and visualization, learning warehousing and orchestration now.

**Featured Case Study**: Transparent City (problem → approach → what it demonstrates)

**Projects Grid (5)**:
1. Transparent City — Civic tech, 1.1M+ tickets
2. Breath Before You Go — Data viz, 15 Asian cities
3. Weightlifting — CS fundamentals (honestly framed)
4. Data Analytics & Cleaning Portfolio — Data quality
5. SEEiT-CV — Unstructured data pipeline framing

**Currently Building**: 3–5 in-progress / planned items, kept fresh

**Skills**: Proficient / Learning Now / Exploring (3 tiers)

**About**: Two paragraphs — technical trajectory + civic transparency motivation

**Contact**: Email · GitHub · LinkedIn

---

## 8. Open Questions Before Building

These are the things I'd nail down before writing any component code:

1. **Transparent City pipeline reality check**: Is the ingestion a one-shot script, or scheduled? Is the data static or refreshed? The case study language has to match the answer exactly. If it's static, that's fine — say "snapshot of 1.1M tickets" instead of "real-time pipeline."

2. **Which DE project is shipping next?** If you have one within ~3 weeks of launch, the Currently Building section can list it and the launch can wait for it. If not, launch now and add it after — momentum > perfection.

3. **Is the Weightlifting project the best slot 3?** If you have any SQL-heavy or ETL-shaped project, even small, it would replace Weightlifting more coherently for the DE narrative. Weightlifting can move to a "more projects" link.

4. **Geographic targeting**: SEA-only roles, or global remote? If SEA-focused, the Bangkok / Myanmar framing is pure asset. If global remote, keep it but make sure the rest of the page reads as work-from-anywhere too.

---

## 9. What Changed from v1 — Quick Diff

| Section | Change |
|---|---|
| Hero | Sharper positioning that names "data engineering" as the direction, not vague "data systems" |
| Featured case study | Removed unverified "real-time" claim; replaced "Result" with "What this demonstrates" |
| Project 3 (Weightlifting) | Reframed honestly as CS fundamentals, not stretched into a DE project |
| Project 5 (SEEiT-CV) | Reframed around unstructured data ingestion, not CV |
| **New: Currently Building** | New section showing in-flight projects + courses |
| Skills Matrix | Two tiers → three tiers (Proficient / Learning Now / Exploring) |
| About | 4 sentences → 2 short paragraphs, with the SEA civic-tech motivation given room |
| Design system | Optional distinctive-accent suggestion added |

Everything else from v1 is intact and correct.
