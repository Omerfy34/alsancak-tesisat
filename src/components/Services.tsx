import { useContent } from "../context/ContentContext";
import { DynamicIcon, CheckCircle } from "./Icons";

export default function Services() {
  const { content } = useContent();

  return (
    <section id="hizmetler" style={{ padding: "96px 0", backgroundColor: "#f8fafc", width: "100%" }}>
      <div className="site-container">
        {/* Başlık */}
        <div style={{ textAlign: "center", maxWidth: 600, margin: "0 auto 56px" }}>
          <span
            style={{
              display: "inline-block",
              fontWeight: 600,
              borderRadius: 999,
              background: "#eff8ff",
              color: "#1d5bd5",
              fontSize: 13,
              padding: "6px 18px",
              marginBottom: 16,
            }}
          >
            Hizmetlerimiz
          </span>
          <h2
            style={{
              fontWeight: 800,
              fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
              color: "#1e293b",
              marginBottom: 16,
            }}
          >
            Tüm Tesisat İhtiyaçlarınız İçin
          </h2>
          <p style={{ color: "#64748b", fontSize: 17, lineHeight: 1.7 }}>
            Ev ve iş yerlerinizde karşılaşabileceğiniz her türlü tesisat sorununa profesyonel çözümler sunuyoruz.
          </p>
        </div>

        {/* Kartlar */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 340px), 1fr))",
            gap: 24,
          }}
        >
          {content.services.map((service) => (
            <div
              key={service.id}
              style={{
                backgroundColor: "#fff",
                borderRadius: 16,
                border: "1px solid #e2e8f0",
                padding: 28,
                transition: "all 0.3s",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.boxShadow = "0 12px 40px rgba(37,112,232,0.1)";
                el.style.borderColor = "#bfdffd";
                el.style.transform = "translateY(-4px)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.boxShadow = "none";
                el.style.borderColor = "#e2e8f0";
                el.style.transform = "translateY(0)";
              }}
            >
              <div
                style={{
                  width: 56,
                  height: 56,
                  backgroundColor: "#eff8ff",
                  borderRadius: 16,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 20,
                }}
              >
                <DynamicIcon name={service.icon} size={26} color="#2570e8" />
              </div>

              <h3 style={{ fontWeight: 700, fontSize: 19, color: "#1e293b", marginBottom: 12 }}>
                {service.title}
              </h3>

              <p style={{ color: "#64748b", fontSize: 14, lineHeight: 1.7, marginBottom: 20 }}>
                {service.description}
              </p>

              <ul style={{ display: "flex", flexDirection: "column", gap: 10, listStyle: "none" }}>
                {service.features.map((feature, i) => (
                  <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: 14, color: "#475569" }}>
                    <CheckCircle size={16} color="#2570e8" style={{ marginTop: 2, flexShrink: 0 }} />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
