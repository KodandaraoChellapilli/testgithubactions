import { About } from "../components/About";
import { Contact } from "../components/Contact";
import { DigitalTwinChat } from "../components/DigitalTwinChat";
import { Experience } from "../components/Experience";
import { Header } from "../components/Header";
import { Hero } from "../components/Hero";

export default function Home() {
  return (
    <main>
      <div className="page-shell">
        <Header />
        <Hero />
        <About />
        <Experience />
        <Contact />
      </div>
      <DigitalTwinChat />
    </main>
  );
}
