import { useContent } from "../context/ContentContext";
import { Phone } from "lucide-react";

export default function CTA() {
  const { content } = useContent();
  const { cta, contact } = content;

  return (
    <section style={{ padding: "96px 0", backgroundColor: "#fff", width: "100%" }}>
      <div className="site-container-md">
        <div
          style={{
            position: "relative",
            textAlign: "center",
            borderRadius: 24,
            background: "linear-gradient(135deg, #1d5bd5 0%, #1e4aad 50%, #1e4088 100%)",
            padding: "clamp(48px, 8vw, 80px) clamp(24px, 5vw, 56px)",
            overflow: "hidden",
          }}
        >
          {/* Dekoratif */}
          <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
            <div
              style={{
                position: "absolute",
                top: -80,
                right: -80,
                width: 240,
                height: 240,
                borderRadius: "50%",
                background: "rgba(37,112,232,0.3)",
                filter: "blur(60px)",
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: -64,
                left: -64,
                width: 192,
                height: 192,
                borderRadius: "50%",
                background: "rgba(59,143,243,0.2)",
                filter: "blur(60px)",
              }}
            />
          </div>

          <div style={{ position: "relative" }}>
            <h2
              style={{
                fontWeight: 800,
                color: "#fff",
                fontSize: "clamp(1.6rem, 4vw, 2.8rem)",
                marginBottom: 20,
                lineHeight: 1.2,
              }}
            >
              {cta.title}
            </h2>
            <p
              style={{
                color: "rgba(191,223,253,0.8)",
                fontSize: "clamp(1rem, 2vw, 1.15rem)",
                lineHeight: 1.7,
                maxWidth: 560,
                margin: "0 auto 40px",
              }}
            >
              {cta.subtitle}
            </p>
            <a
              href={contact.phone}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 12,
                fontWeight: 700,
                backgroundColor: "#facc15",
                color: "#172953",
                padding: "16px 40px",
                borderRadius: 16,
                fontSize: 18,
                boxShadow: "0 8px 32px rgba(250,204,21,0.3)",
                textDecoration: "none",
                transition: "all 0.2s",
              }}
            >
              <Phone size={22} />
              {cta.buttonText}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
