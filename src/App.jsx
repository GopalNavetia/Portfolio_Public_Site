import { useEffect, useState } from "react";
import api from "./api/axios";
import About from "./components/About";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Projects from "./components/Projects";
import Skills from "./components/Skills";

function App() {
  const [about, setAbout] = useState(null);
  const [loading, setLoading] = useState(true);
  const [aboutError, setAboutError] = useState(false);

  useEffect(() => {
    let active = true;
    api
      .get("/about")
      .then(({ data }) => {
        if (active) setAbout(data || null);
      })
      .catch(() => {
        if (active) {
          setAbout(null);
          setAboutError(true);
        }
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Navbar name={about?.name} />
      <main>
        <About about={about} loading={loading} error={aboutError} />
        <Skills />
        <Projects />
      </main>
      <Footer about={about} />
    </div>
  );
}

export default App;
