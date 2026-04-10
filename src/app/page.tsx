import Hero from "@/components/Hero";
import FeaturedCaseStudy from "@/components/FeaturedCaseStudy";
import ProjectsGrid from "@/components/ProjectsGrid";
import CurrentlyBuilding from "@/components/CurrentlyBuilding";
import SkillsMatrix from "@/components/SkillsMatrix";
import About from "@/components/About";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main>
      <Hero />
      <FeaturedCaseStudy />
      <ProjectsGrid />
      <CurrentlyBuilding />
      <SkillsMatrix />
      <About />
      <Contact />
    </main>
  );
}
