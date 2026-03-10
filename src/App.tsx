import { useState, useEffect } from "react";
import { ContentProvider } from "./context/ContentContext";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Services from "./components/Services";
import About from "./components/About";
import WhyUs from "./components/WhyUs";
import Testimonials from "./components/Testimonials";
import Gallery from "./components/Gallery";
import FAQ from "./components/FAQ";
import Contact from "./components/Contact";
import CTA from "./components/CTA";
import Footer from "./components/Footer";
import FloatingButtons from "./components/FloatingButtons";
import AdminPanel from "./pages/AdminPanel";

function AppContent() {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkHash = () => {
      setIsAdmin(window.location.hash === "#yonetim");
    };
    checkHash();
    window.addEventListener("hashchange", checkHash);
    return () => window.removeEventListener("hashchange", checkHash);
  }, []);

  const exitAdmin = () => {
    window.location.hash = "";
    setIsAdmin(false);
  };

  if (isAdmin) {
    return <AdminPanel onExit={exitAdmin} />;
  }

  return (
    <div style={{ overflowX: "hidden" }}>
      <Header />
      <main>
        <Hero />
        <Services />
        <About />
        <WhyUs />
        <Testimonials />
        <Gallery />
        <FAQ />
        <Contact />
        <CTA />
      </main>
      <Footer />
      <FloatingButtons />
    </div>
  );
}

export default function App() {
  return (
    <ContentProvider>
      <AppContent />
    </ContentProvider>
  );
}
