import { useContent } from "../context/ContentContext";
import { Phone, Mail, MapPin } from "lucide-react";

export default function Footer() {
  const { content } = useContent();
  const { brand, contact, footer, services } = content;

  const scrollTo = (href: string) => {
    if (href.startsWith("#")) {
      const el = document.getElementById(href.slice(1));
      if (el) {
        const y = el.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    }
  };

  return (
    <footer style={{ backgroundColor: "#0f172a", color: "#94a3b8", width: "100%" }}>
      <div className="site-container" style={{ paddingTop: 64, paddingBottom: 64 }}>
        <div
          className="footer-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: 40,
          }}
        >
          {/* Marka */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
              <img
                src={brand.logoUrl || "https://i.imgur.com/n8iJdSJ.png"}
                alt={brand.name}
                style={{
                  height: 44,
                  width: "auto",
                  objectFit: "contain",
                  borderRadius: 8,
                }}
              />
            </div>
            <p style={{ fontSize: 14, color: "#64748b", lineHeight: 1.7, marginBottom: 20 }}>
              {brand.description}
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 10, fontSize: 14 }}>
              <a href={contact.phone} style={{ display: "flex", alignItems: "center", gap: 8, color: "#94a3b8", textDecoration: "none" }}>
                <Phone size={14} />
                {contact.phoneDisplay}
              </a>
              <a href={`mailto:${contact.email}`} style={{ display: "flex", alignItems: "center", gap: 8, color: "#94a3b8", textDecoration: "none" }}>
                <Mail size={14} />
                {contact.email}
              </a>
              <span style={{ display: "flex", alignItems: "flex-start", gap: 8, color: "#94a3b8" }}>
                <MapPin size={14} style={{ marginTop: 2, flexShrink: 0 }} />
                {contact.address}, {contact.district}/{contact.city}
              </span>
            </div>
          </div>

          {/* Hızlı Bağlantılar */}
          <div>
            <h4 style={{ fontWeight: 600, color: "#fff", marginBottom: 16, fontSize: 15 }}>
              Hızlı Bağlantılar
            </h4>
            <ul style={{ display: "flex", flexDirection: "column", gap: 10, listStyle: "none" }}>
              {footer.links.map((link, i) => (
                <li key={i}>
                  <button
                    onClick={() => scrollTo(link.href)}
                    style={{
                      fontSize: 14,
                      color: "#94a3b8",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      padding: 0,
                    }}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Hizmetler */}
          <div>
            <h4 style={{ fontWeight: 600, color: "#fff", marginBottom: 16, fontSize: 15 }}>
              Hizmetlerimiz
            </h4>
            <ul style={{ display: "flex", flexDirection: "column", gap: 10, listStyle: "none" }}>
              {services.slice(0, 6).map((s) => (
                <li key={s.id}>
                  <button
                    onClick={() => scrollTo("#hizmetler")}
                    style={{
                      fontSize: 14,
                      color: "#94a3b8",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      padding: 0,
                    }}
                  >
                    {s.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Çalışma Saatleri */}
          <div>
            <h4 style={{ fontWeight: 600, color: "#fff", marginBottom: 16, fontSize: 15 }}>
              Çalışma Saatleri
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 14 }}>
              {[
                { day: "Pazartesi - Cuma", hours: "08:00 - 22:00" },
                { day: "Cumartesi", hours: "09:00 - 20:00" },
                { day: "Pazar", hours: "Acil Servis" },
              ].map((item, i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", color: "#94a3b8" }}>
                  <span>{item.day}</span>
                  <span style={{ color: "#cbd5e1" }}>{item.hours}</span>
                </div>
              ))}
            </div>
            <div
              style={{
                marginTop: 20,
                padding: 12,
                borderRadius: 12,
                background: "rgba(37,112,232,0.1)",
                border: "1px solid rgba(37,112,232,0.15)",
                textAlign: "center",
              }}
            >
              <p style={{ fontWeight: 500, color: "#60adf8", fontSize: 14 }}>
                🔧 Acil durumlarda 7/24 hizmet
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Alt çizgi */}
      <div style={{ borderTop: "1px solid #1e293b" }}>
        <div
          className="site-container"
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 12,
            paddingTop: 20,
            paddingBottom: 20,
          }}
        >
          <p style={{ fontSize: 13, color: "#475569" }}>{footer.copyright}</p>
          <button
            onClick={() => {
              window.location.hash = "yonetim";
              window.location.reload();
            }}
            style={{
              fontSize: 11,
              color: "#1e293b",
              background: "none",
              border: "none",
              cursor: "default",
              opacity: 0.2,
              userSelect: "none",
            }}
            title=""
          >
            ●
          </button>
        </div>
      </div>

      <style>{`
        @media (min-width: 640px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        @media (min-width: 1024px) {
          .footer-grid {
            grid-template-columns: 1.5fr 1fr 1fr 1fr !important;
          }
        }
      `}</style>
    </footer>
  );
}
