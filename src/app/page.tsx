import Hero from "@/components/Hero";
import FeaturedCaseStudy from "@/components/FeaturedCaseStudy";
import ProjectsGrid from "@/components/ProjectsGrid";
import SkillsMatrix from "@/components/SkillsMatrix";
import CurrentlyBuilding from "@/components/CurrentlyBuilding";
import About from "@/components/About";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main>
      <Hero />
      <FeaturedCaseStudy />
      <ProjectsGrid />
      <SkillsMatrix />
      <CurrentlyBuilding />
      <About />
      <Contact />
    </main>
  );
}
