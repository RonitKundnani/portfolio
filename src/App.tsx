import { useEffect } from 'react';
import SceneBackground from './components/SceneBackground';
import NodeGraphNav from './components/NodeGraphNav';
import FlightHUD from './components/FlightHUD';
import Hero from './components/Hero';
import ProjectGrid from './components/ProjectGrid';
import SkillsGraph from './components/SkillsGraph';
import AchievementsStrip from './components/AchievementsStrip';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import { initScrollTracking } from './state/scroll';

export default function App() {
  useEffect(() => initScrollTracking(), []);

  return (
    <div className="relative min-h-screen">
      <SceneBackground />
      <NodeGraphNav />
      <FlightHUD />
      <main className="relative z-10">
        <Hero />
        <ProjectGrid />
        <SkillsGraph />
        <AchievementsStrip />
        <ContactSection />
        <Footer />
      </main>
    </div>
  );
}
