import { useState } from "react";
import { useContent } from "../context/ContentContext";
import { ChevronDown } from "lucide-react";

export default function FAQ() {
  const { content } = useContent();
  const [openId, setOpenId] = useState<string | null>(null);

  const toggle = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section style={{ padding: "96px 0", backgroundColor: "#fff", width: "100%" }}>
      <div className="site-container-sm">
        {/* Başlık */}
        <div style={{ textAlign: "center", marginBottom: 56 }}>
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
            Sıkça Sorulan Sorular
          </span>
          <h2
            style={{
              fontWeight: 800,
              fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
              color: "#1e293b",
              marginBottom: 16,
            }}
          >
            Merak Edilenler
          </h2>
          <p style={{ color: "#64748b", fontSize: 17, lineHeight: 1.7 }}>
            En çok sorulan soruları sizin için derledik
          </p>
        </div>

        {/* Soru kartları */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {content.faq.map((item) => {
            const isOpen = openId === item.id;
            return (
              <div
                key={item.id}
                style={{
                  borderRadius: 16,
                  border: `1px solid ${isOpen ? "#bfdffd" : "#e2e8f0"}`,
                  overflow: "hidden",
                  transition: "all 0.2s",
                }}
              >
                <button
                  onClick={() => toggle(item.id)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    width: "100%",
                    textAlign: "left",
                    padding: "20px 24px",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  <span style={{ fontWeight: 600, color: "#1e293b", paddingRight: 16, fontSize: 15 }}>
                    {item.question}
                  </span>
                  <ChevronDown
                    size={20}
                    color="#94a3b8"
                    style={{
                      flexShrink: 0,
                      transition: "transform 0.2s",
                      transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                    }}
                  />
                </button>
                <div
                  style={{
                    overflow: "hidden",
                    maxHeight: isOpen ? 300 : 0,
                    opacity: isOpen ? 1 : 0,
                    transition: "all 0.3s ease",
                  }}
                >
                  <div style={{ padding: "0 24px 20px", color: "#64748b", fontSize: 14, lineHeight: 1.7 }}>
                    {item.answer}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
