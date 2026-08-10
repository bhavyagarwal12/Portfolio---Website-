import { useEffect } from "react";
import Lenis from "lenis";
import { Toaster } from "sonner";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "@/App.css";
import { Navbar } from "@/components/site/Navbar";
import { CustomCursor } from "@/components/site/CustomCursor";
import { Hero } from "@/components/site/Hero";
import { Marquee } from "@/components/site/Marquee";
import { About } from "@/components/site/About";
import { Experience } from "@/components/site/Experience";
import { Projects } from "@/components/site/Projects";
import { Skills } from "@/components/site/Skills";
import { Contact } from "@/components/site/Contact";
import Insights from "@/pages/Insights";
import CaseStudy from "@/pages/CaseStudy";
import { trackPageView } from "@/lib/track";

function Portfolio() {
  useEffect(() => {
    trackPageView();
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    let raf;
    const loop = (time) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);

  return (
    <div className="grain relative min-h-screen bg-[#0A0A0F]">
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <Marquee />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Contact />
      </main>
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <CustomCursor />
      <Toaster
        theme="dark"
        position="bottom-right"
        toastOptions={{
          style: {
            background: "#111116",
            border: "1px solid rgba(124,92,252,0.3)",
            color: "#F5F5F7",
          },
        }}
      />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Portfolio />} />
          <Route path="/project/:slug" element={<CaseStudy />} />
          <Route path="/insights" element={<Insights />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
