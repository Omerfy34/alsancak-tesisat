import { useContent } from "../context/ContentContext";
import { Phone, ArrowRight, CheckCircle } from "lucide-react";

export default function Hero() {
  const { content } = useContent();
  const { hero, contact, about } = content;

  const scrollToServices = () => {
    const el = document.getElementById("hizmetler");
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      style={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        minHeight: "100vh",
        width: "100%",
        background: "linear-gradient(135deg, #1e4088 0%, #1e4aad 40%, #172953 100%)",
        paddingTop: 120,
      }}
    >
      {/* Dekoratif arka plan */}
      <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
        <div
          style={{
            position: "absolute",
            top: -120,
            right: -120,
            width: 500,
            height: 500,
            borderRadius: "50%",
            background: "rgba(29,91,213,0.2)",
            filter: "blur(80px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -150,
            left: -150,
            width: 600,
            height: 600,
            borderRadius: "50%",
            background: "rgba(37,112,232,0.15)",
            filter: "blur(80px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div
        className="site-container"
        style={{ position: "relative", paddingTop: 40, paddingBottom: 120 }}
      >
        <div style={{ maxWidth: 720 }}>
          {/* Rozetler */}
          <div className="anim-fade-up" style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 32 }}>
            {hero.badges.map((badge, i) => (
              <span
                key={i}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  color: "#fff",
                  fontSize: 14,
                  fontWeight: 500,
                  padding: "0 16px",
                  lineHeight: "34px",
                  borderRadius: 999,
                  background: "rgba(255,255,255,0.1)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  backdropFilter: "blur(6px)",
                }}
              >
                <CheckCircle size={14} color="#facc15" />
                {badge}
              </span>
            ))}
          </div>

          {/* Başlık */}
          <h1
            className="anim-fade-up anim-delay-1"
            style={{
              fontWeight: 800,
              color: "#fff",
              fontSize: "clamp(2.2rem, 5vw, 4rem)",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              marginBottom: 24,
            }}
          >
            {hero.title}
          </h1>

          {/* Alt başlık */}
          <p
            className="anim-fade-up anim-delay-2"
            style={{
              fontSize: "clamp(1rem, 2vw, 1.2rem)",
              color: "rgba(191, 223, 253, 0.85)",
              lineHeight: 1.7,
              maxWidth: 600,
              marginBottom: 40,
            }}
          >
            {hero.subtitle}
          </p>

          {/* CTA butonları */}
          <div className="anim-fade-up anim-delay-3" style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
            <a
              href={contact.phone}
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 10,
                fontWeight: 700,
                backgroundColor: "#facc15",
                color: "#172953",
                padding: "16px 32px",
                borderRadius: 16,
                fontSize: 17,
                boxShadow: "0 8px 32px rgba(250,204,21,0.3)",
                textDecoration: "none",
                transition: "all 0.2s",
              }}
            >
              <Phone size={20} />
              {hero.cta}
            </a>
            <button
              onClick={scrollToServices}
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 10,
                color: "#fff",
                fontWeight: 600,
                background: "rgba(255,255,255,0.1)",
                border: "1px solid rgba(255,255,255,0.2)",
                backdropFilter: "blur(6px)",
                padding: "16px 32px",
                borderRadius: 16,
                fontSize: 17,
                cursor: "pointer",
                transition: "all 0.2s",
              }}
            >
              {hero.secondaryCta}
              <ArrowRight size={18} />
            </button>
          </div>

          {/* İstatistikler */}
          <div
            className="anim-fade-up anim-delay-4"
            style={{
              marginTop: 64,
              paddingTop: 40,
              borderTop: "1px solid rgba(255,255,255,0.1)",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
              gap: 24,
            }}
          >
            {about.stats.map((stat, i) => (
              <div key={i} style={{ textAlign: "center" }}>
                <div style={{ color: "#fff", fontWeight: 800, fontSize: "clamp(1.4rem, 3vw, 1.8rem)", marginBottom: 4 }}>
                  {stat.value}
                </div>
                <div style={{ fontSize: 13, color: "rgba(191, 223, 253, 0.6)", fontWeight: 500 }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Alt dalga */}
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, lineHeight: 0 }}>
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: "block", width: "100%", height: 80 }} preserveAspectRatio="none">
          <path d="M0 32L60 29C120 26 240 20 360 24C480 28 600 42 720 48C840 54 960 52 1080 44C1200 36 1320 22 1380 16L1440 10V80H0V32Z" fill="white" />
        </svg>
      </div>
    </section>
  );
}
