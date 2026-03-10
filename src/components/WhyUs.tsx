import { useContent } from "../context/ContentContext";
import { DynamicIcon } from "./Icons";

export default function WhyUs() {
  const { content } = useContent();
  const { whyUs } = content;

  return (
    <section
      id="neden-biz"
      style={{
        padding: "96px 0",
        width: "100%",
        background: "linear-gradient(135deg, #1e4088 0%, #1e4aad 50%, #172953 100%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Dekoratif arka plan */}
      <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
        <div
          style={{
            position: "absolute",
            top: "-50%",
            right: "-10%",
            width: 500,
            height: 500,
            borderRadius: "50%",
            background: "rgba(30,74,173,0.5)",
            filter: "blur(80px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-40%",
            left: "-10%",
            width: 400,
            height: 400,
            borderRadius: "50%",
            background: "rgba(29,91,213,0.3)",
            filter: "blur(80px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: "radial-gradient(rgba(255,255,255,0.08) 1px, transparent 1px)",
            backgroundSize: "30px 30px",
          }}
        />
      </div>

      <div className="site-container" style={{ position: "relative" }}>
        {/* Başlık */}
        <div style={{ textAlign: "center", maxWidth: 600, margin: "0 auto 56px" }}>
          <span
            style={{
              display: "inline-block",
              fontWeight: 600,
              borderRadius: 999,
              background: "rgba(255,255,255,0.1)",
              color: "#bfdffd",
              fontSize: 13,
              padding: "6px 18px",
              border: "1px solid rgba(255,255,255,0.1)",
              marginBottom: 16,
            }}
          >
            Avantajlarımız
          </span>
          <h2
            style={{
              fontWeight: 800,
              color: "#fff",
              fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
              marginBottom: 16,
            }}
          >
            {whyUs.title}
          </h2>
          <p style={{ color: "rgba(191,223,253,0.7)", fontSize: 17, lineHeight: 1.7 }}>
            {whyUs.subtitle}
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
          {whyUs.reasons.map((reason, i) => (
            <div
              key={i}
              style={{
                borderRadius: 16,
                background: "rgba(255,255,255,0.06)",
                backdropFilter: "blur(8px)",
                border: "1px solid rgba(255,255,255,0.1)",
                padding: 28,
                transition: "all 0.3s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.12)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.06)";
              }}
            >
              <div
                style={{
                  width: 56,
                  height: 56,
                  backgroundColor: "rgba(29,91,213,0.5)",
                  borderRadius: 16,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 20,
                }}
              >
                <DynamicIcon name={reason.icon} size={26} color="#facc15" />
              </div>
              <h3 style={{ fontWeight: 700, color: "#fff", fontSize: 19, marginBottom: 12 }}>
                {reason.title}
              </h3>
              <p style={{ color: "rgba(191,223,253,0.7)", fontSize: 14, lineHeight: 1.7 }}>
                {reason.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
