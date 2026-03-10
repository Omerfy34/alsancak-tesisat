import { useContent } from "../context/ContentContext";
import { Shield, Award, Clock, Wrench } from "lucide-react";

export default function About() {
  const { content } = useContent();
  const { about, brand } = content;

  const highlights = [
    { icon: Shield, title: "Garantili İşçilik", desc: "Tüm işlerimize 2 yıl garanti" },
    { icon: Clock, title: "Hızlı Servis", desc: "30 dakika içinde kapınızdayız" },
    { icon: Award, title: "Uzman Ekip", desc: "Sertifikalı ve deneyimli ustalar" },
  ];

  return (
    <section id="hakkimizda" style={{ padding: "96px 0", backgroundColor: "#fff", width: "100%" }}>
      <div className="site-container">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: 48,
            alignItems: "center",
          }}
          className="about-grid"
        >
          {/* Sol: Görsel Alan */}
          <div style={{ position: "relative" }}>
            <div
              style={{
                borderRadius: 24,
                position: "relative",
                aspectRatio: "4/3",
                background: "linear-gradient(135deg, #dbeefe 0%, #eff8ff 50%, #f8fafc 100%)",
                overflow: "hidden",
              }}
            >
              <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div style={{ textAlign: "center", padding: 32 }}>
                  <div
                    style={{
                      width: 96,
                      height: 96,
                      backgroundColor: "#2570e8",
                      borderRadius: 24,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "0 auto 24px",
                      boxShadow: "0 20px 40px rgba(37,112,232,0.3)",
                    }}
                  >
                    <Wrench size={48} color="#fff" />
                  </div>
                  <h3 style={{ fontWeight: 700, fontSize: 22, color: "#1e4088", marginBottom: 8 }}>
                    {brand.name}
                  </h3>
                  <p style={{ fontWeight: 500, color: "#2570e8", fontSize: 15 }}>
                    {brand.tagline}
                  </p>
                </div>
              </div>
              {/* Köşe süsleri */}
              <div
                style={{
                  position: "absolute",
                  top: 24,
                  left: 24,
                  width: 64,
                  height: 64,
                  borderLeft: "4px solid #93cafb",
                  borderTop: "4px solid #93cafb",
                  borderTopLeftRadius: 16,
                }}
              />
              <div
                style={{
                  position: "absolute",
                  bottom: 24,
                  right: 24,
                  width: 64,
                  height: 64,
                  borderRight: "4px solid #93cafb",
                  borderBottom: "4px solid #93cafb",
                  borderBottomRightRadius: 16,
                }}
              />
            </div>

            {/* Yüzen kart */}
            <div
              style={{
                position: "absolute",
                bottom: -24,
                right: 24,
                padding: 20,
                backgroundColor: "#fff",
                borderRadius: 16,
                boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
                border: "1px solid #f1f5f9",
                maxWidth: 200,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div
                  style={{
                    width: 40,
                    height: 40,
                    backgroundColor: "#fef9c3",
                    borderRadius: 12,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Award size={20} color="#ca8a04" />
                </div>
                <div>
                  <div style={{ fontWeight: 800, fontSize: 22, color: "#1e293b" }}>15+</div>
                  <div style={{ fontSize: 12, color: "#94a3b8", fontWeight: 500 }}>Yıllık Tecrübe</div>
                </div>
              </div>
            </div>
          </div>

          {/* Sağ: İçerik */}
          <div>
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
              {about.subtitle}
            </span>
            <h2
              style={{
                fontWeight: 800,
                fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
                color: "#1e293b",
                marginBottom: 24,
                lineHeight: 1.2,
              }}
            >
              {about.title}
            </h2>

            <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 32 }}>
              {about.paragraphs.map((p, i) => (
                <p key={i} style={{ color: "#475569", lineHeight: 1.7, fontSize: 15 }}>
                  {p}
                </p>
              ))}
            </div>

            {/* Öne çıkan özellikler */}
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {highlights.map((item, i) => (
                <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 16 }}>
                  <div
                    style={{
                      width: 44,
                      height: 44,
                      backgroundColor: "#eff8ff",
                      borderRadius: 12,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <item.icon size={20} color="#2570e8" />
                  </div>
                  <div>
                    <h4 style={{ fontWeight: 600, color: "#1e293b", marginBottom: 2, fontSize: 15 }}>
                      {item.title}
                    </h4>
                    <p style={{ fontSize: 14, color: "#64748b" }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 1024px) {
          .about-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
