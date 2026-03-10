import { useState, useEffect } from "react";
import { useContent } from "../context/ContentContext";
import { Phone, Menu, X } from "lucide-react";

const NAV_ITEMS = [
  { id: "hero", label: "Ana Sayfa" },
  { id: "hizmetler", label: "Hizmetler" },
  { id: "hakkimizda", label: "Hakkımızda" },
  { id: "neden-biz", label: "Neden Biz" },
  { id: "yorumlar", label: "Yorumlar" },
  { id: "galeri", label: "Galeri" },
  { id: "iletisim", label: "İletişim" },
];

export default function Header() {
  const { content } = useContent();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      const sections = NAV_ITEMS.map((n) => n.id);
      let current = "hero";
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el && el.offsetTop - 140 <= window.scrollY) {
          current = id;
        }
      }
      setActiveSection(current);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const scrollTo = (id: string) => {
    setMobileOpen(false);
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        backgroundColor: "#fff",
        transition: "box-shadow 0.3s",
        boxShadow: scrolled ? "0 2px 24px rgba(0,0,0,0.08)" : "0 1px 4px rgba(0,0,0,0.04)",
      }}
    >
      {/* Üst bilgi şeridi */}
      <div
        style={{
          maxHeight: scrolled ? 0 : 40,
          opacity: scrolled ? 0 : 1,
          overflow: "hidden",
          backgroundColor: "#1e4aad",
          color: "#fff",
          transition: "all 0.3s",
        }}
      >
        <div
          className="site-container"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: 40,
            fontSize: 13,
          }}
        >
          <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <Phone size={13} />
            {content.contact.workingDays} | {content.contact.workingHours}
          </span>
          <a
            href={content.contact.phone}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              fontWeight: 600,
              color: "#fde047",
              textDecoration: "none",
            }}
          >
            <Phone size={13} />
            {content.contact.phoneDisplay}
          </a>
        </div>
      </div>

      {/* Ana Navbar */}
      <nav className="site-container">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: 72,
          }}
        >
          {/* Logo */}
          <button
            onClick={() => scrollTo("hero")}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 0,
            }}
          >
            <img
              src={content.brand.logoUrl || "https://i.imgur.com/n8iJdSJ.png"}
              alt={content.brand.name}
              style={{
                height: 52,
                width: "auto",
                objectFit: "contain",
              }}
            />
          </button>

          {/* Desktop Nav */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 4,
            }}
            className="desktop-nav"
          >
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                style={{
                  padding: "8px 14px",
                  borderRadius: 8,
                  fontSize: 14,
                  fontWeight: 500,
                  transition: "all 0.2s",
                  background:
                    activeSection === item.id
                      ? "#eff6ff"
                      : "transparent",
                  color:
                    activeSection === item.id
                      ? "#1d5bd5"
                      : "#475569",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* CTA + Mobile */}
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <a
              href={content.contact.phone}
              className="desktop-cta"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                color: "#fff",
                padding: "10px 22px",
                borderRadius: 12,
                fontSize: 14,
                fontWeight: 600,
                backgroundColor: "#2570e8",
                textDecoration: "none",
                transition: "all 0.2s",
              }}
            >
              <Phone size={15} />
              Hemen Ara
            </a>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="mobile-toggle"
              style={{
                padding: 8,
                borderRadius: 8,
                color: "#334155",
                background: "none",
                border: "none",
                cursor: "pointer",
                display: "none",
              }}
              aria-label="Menüyü aç"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div
          style={{
            position: "fixed",
            left: 0,
            right: 0,
            bottom: 0,
            top: 112,
            backgroundColor: "#fff",
            zIndex: 40,
            animation: "slideDown 0.3s ease-out both",
          }}
        >
          <div style={{ padding: 24, display: "flex", flexDirection: "column", gap: 4 }}>
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                style={{
                  display: "block",
                  width: "100%",
                  textAlign: "left",
                  padding: "12px 16px",
                  borderRadius: 12,
                  fontWeight: 500,
                  fontSize: 16,
                  color: activeSection === item.id ? "#1d5bd5" : "#334155",
                  backgroundColor: activeSection === item.id ? "#eff6ff" : "transparent",
                  border: "none",
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
              >
                {item.label}
              </button>
            ))}
            <div style={{ paddingTop: 16 }}>
              <a
                href={content.contact.phone}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                  color: "#fff",
                  width: "100%",
                  padding: "14px 0",
                  borderRadius: 12,
                  fontWeight: 600,
                  backgroundColor: "#2570e8",
                  fontSize: 16,
                  textDecoration: "none",
                }}
              >
                <Phone size={18} />
                {content.contact.phoneDisplay}
              </a>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 1023px) {
          .desktop-nav { display: none !important; }
          .desktop-cta { display: none !important; }
          .mobile-toggle { display: block !important; }
        }
      `}</style>
    </header>
  );
}
