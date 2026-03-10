import { useContent } from "../context/ContentContext";
import { Star } from "lucide-react";

export default function Testimonials() {
  const { content } = useContent();

  return (
    <section id="yorumlar" style={{ padding: "96px 0", backgroundColor: "#f8fafc", width: "100%" }}>
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
            Müşteri Yorumları
          </span>
          <h2
            style={{
              fontWeight: 800,
              fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
              color: "#1e293b",
              marginBottom: 16,
            }}
          >
            Müşterilerimiz Ne Diyor?
          </h2>
          <p style={{ color: "#64748b", fontSize: 17, lineHeight: 1.7 }}>
            Binlerce mutlu müşterimizden bazılarının görüşleri
          </p>
        </div>

        {/* Kartlar */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 280px), 1fr))",
            gap: 24,
          }}
        >
          {content.testimonials.map((t) => (
            <div
              key={t.id}
              style={{
                backgroundColor: "#fff",
                borderRadius: 16,
                border: "1px solid #e2e8f0",
                padding: 24,
                display: "flex",
                flexDirection: "column",
                transition: "all 0.3s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 24px rgba(0,0,0,0.06)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow = "none";
              }}
            >
              {/* Yıldızlar */}
              <div style={{ display: "flex", gap: 4, marginBottom: 16 }}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    fill={i < t.rating ? "#eab308" : "transparent"}
                    color={i < t.rating ? "#eab308" : "#cbd5e1"}
                  />
                ))}
              </div>

              {/* Yorum */}
              <p style={{ flex: 1, color: "#475569", fontSize: 14, lineHeight: 1.7, marginBottom: 24 }}>
                &ldquo;{t.text}&rdquo;
              </p>

              {/* Kişi */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  paddingTop: 16,
                  borderTop: "1px solid #f1f5f9",
                }}
              >
                <div
                  style={{
                    width: 40,
                    height: 40,
                    backgroundColor: "#dbeefe",
                    color: "#1d5bd5",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 700,
                    fontSize: 13,
                  }}
                >
                  {t.name.split(" ").map((n: string) => n[0]).join("")}
                </div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 14, color: "#1e293b" }}>{t.name}</div>
                  <div style={{ fontSize: 12, color: "#94a3b8" }}>{t.location}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
