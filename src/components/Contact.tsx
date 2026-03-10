import { useState } from "react";
import { useContent } from "../context/ContentContext";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

export default function Contact() {
  const { content } = useContent();
  const { contact } = content;

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    service: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // WhatsApp numarasını linkten çıkar
    const waLink = content.social.whatsapp; // "https://wa.me/905001234567"
    const waNumber = waLink.replace("https://wa.me/", "").replace(/\D/g, "");

    // Mesaj metnini oluştur
    const lines = [
      `Merhaba, siteniz üzerinden ücretsiz keşif talebinde bulunmak istiyorum.`,
      ``,
      `👤 Ad Soyad: ${formData.name}`,
      `📞 Telefon: ${formData.phone}`,
      `🔧 Hizmet: ${formData.service}`,
    ];

    if (formData.message.trim()) {
      lines.push(`💬 Mesaj: ${formData.message}`);
    }

    lines.push("", "Teşekkürler.");

    const text = encodeURIComponent(lines.join("\n"));
    const whatsappUrl = `https://wa.me/${waNumber}?text=${text}`;

    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  const contactItems = [
    { icon: Phone, label: "Telefon", value: contact.phoneDisplay, href: contact.phone },
    { icon: Mail, label: "E-posta", value: contact.email, href: `mailto:${contact.email}` },
    { icon: MapPin, label: "Adres", value: `${contact.address}, ${contact.district} / ${contact.city}`, href: "#" },
    { icon: Clock, label: "Çalışma Saatleri", value: `${contact.workingDays}\n${contact.workingHours}`, href: "#" },
  ];

  return (
    <section id="iletisim" style={{ padding: "96px 0", backgroundColor: "#f8fafc", width: "100%" }}>
      <div className="site-container">
        {/* Başlık */}
        <div style={{ textAlign: "center", maxWidth: 600, margin: "0 auto 56px" }}>
          <span
            style={{
              display: "inline-block",
              fontWeight: 600,
              borderRadius: 999,
              background: "#eff6ff",
              color: "#1d5bd5",
              fontSize: 13,
              padding: "6px 18px",
              marginBottom: 16,
            }}
          >
            İletişim
          </span>
          <h2
            style={{
              fontWeight: 800,
              fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
              color: "#1e293b",
              marginBottom: 16,
            }}
          >
            Bize Ulaşın
          </h2>
          <p style={{ color: "#64748b", fontSize: 17, lineHeight: 1.7 }}>
            Tesisat ihtiyaçlarınız için hemen iletişime geçin, size en kısa sürede dönüş yapalım.
          </p>
        </div>

        <div className="contact-grid" style={{ display: "grid", gridTemplateColumns: "1fr", gap: 32 }}>
          {/* Sol: İletişim Bilgileri */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {contactItems.map((item, i) => (
              <a
                key={i}
                href={item.href}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 16,
                  backgroundColor: "#fff",
                  borderRadius: 16,
                  border: "1px solid #e2e8f0",
                  padding: 20,
                  textDecoration: "none",
                  transition: "all 0.3s",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.boxShadow = "0 8px 24px rgba(0,0,0,0.06)";
                  el.style.borderColor = "#bfdffd";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.boxShadow = "none";
                  el.style.borderColor = "#e2e8f0";
                }}
              >
                <div
                  style={{
                    width: 48,
                    height: 48,
                    backgroundColor: "#eff6ff",
                    borderRadius: 12,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <item.icon size={22} color="#2570e8" />
                </div>
                <div>
                  <div style={{ fontSize: 13, color: "#94a3b8", fontWeight: 500, marginBottom: 2 }}>
                    {item.label}
                  </div>
                  <div style={{ fontWeight: 600, color: "#334155", fontSize: 14, whiteSpace: "pre-line" }}>
                    {item.value}
                  </div>
                </div>
              </a>
            ))}

            {/* WhatsApp Butonu */}
            <a
              href={content.social.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 10,
                color: "#fff",
                borderRadius: 16,
                fontWeight: 600,
                width: "100%",
                padding: "16px 0",
                backgroundColor: "#16a34a",
                textDecoration: "none",
                transition: "all 0.2s",
              }}
            >
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              WhatsApp ile Yazın
            </a>
          </div>

          {/* Sağ: Form */}
          <div
            style={{
              backgroundColor: "#fff",
              borderRadius: 16,
              border: "1px solid #e2e8f0",
              padding: 28,
            }}
          >
            <h3 style={{ fontWeight: 700, fontSize: 19, color: "#1e293b", marginBottom: 6 }}>
              Ücretsiz Keşif Talep Edin
            </h3>
            <p style={{ color: "#64748b", fontSize: 14, marginBottom: 24, lineHeight: 1.6 }}>
              Formu doldurun, bilgileriniz otomatik olarak WhatsApp üzerinden bize iletilsin.
            </p>

            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <div className="form-row" style={{ display: "grid", gridTemplateColumns: "1fr", gap: 20 }}>
                <div>
                  <label style={{ display: "block", fontWeight: 500, fontSize: 13, color: "#334155", marginBottom: 6 }}>
                    Adınız Soyadınız *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Adınız Soyadınız"
                    style={{
                      width: "100%",
                      padding: "12px 16px",
                      borderRadius: 12,
                      border: "1px solid #e2e8f0",
                      fontSize: 14,
                      outline: "none",
                      transition: "border-color 0.2s",
                      boxSizing: "border-box",
                    }}
                    onFocus={(e) => (e.target.style.borderColor = "#60adf8")}
                    onBlur={(e) => (e.target.style.borderColor = "#e2e8f0")}
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontWeight: 500, fontSize: 13, color: "#334155", marginBottom: 6 }}>
                    Telefon *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="05XX XXX XX XX"
                    style={{
                      width: "100%",
                      padding: "12px 16px",
                      borderRadius: 12,
                      border: "1px solid #e2e8f0",
                      fontSize: 14,
                      outline: "none",
                      transition: "border-color 0.2s",
                      boxSizing: "border-box",
                    }}
                    onFocus={(e) => (e.target.style.borderColor = "#60adf8")}
                    onBlur={(e) => (e.target.style.borderColor = "#e2e8f0")}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: "block", fontWeight: 500, fontSize: 13, color: "#334155", marginBottom: 6 }}>
                  Hizmet Türü *
                </label>
                <select
                  name="service"
                  required
                  value={formData.service}
                  onChange={handleChange}
                  style={{
                    width: "100%",
                    padding: "12px 16px",
                    borderRadius: 12,
                    border: "1px solid #e2e8f0",
                    fontSize: 14,
                    outline: "none",
                    backgroundColor: "#fff",
                    color: "#334155",
                    boxSizing: "border-box",
                  }}
                >
                  <option value="">Seçiniz...</option>
                  <option>Su Tesisatı</option>
                  <option>Tıkanıklık Açma</option>
                  <option>Doğalgaz Tesisatı</option>
                  <option>Banyo Tadilat</option>
                  <option>Petek Temizliği</option>
                  <option>Sızıntı Tespiti</option>
                  <option>Diğer</option>
                </select>
              </div>

              <div>
                <label style={{ display: "block", fontWeight: 500, fontSize: 13, color: "#334155", marginBottom: 6 }}>
                  Mesajınız (isteğe bağlı)
                </label>
                <textarea
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Sorununuzu kısaca açıklayın..."
                  style={{
                    width: "100%",
                    padding: "12px 16px",
                    borderRadius: 12,
                    border: "1px solid #e2e8f0",
                    fontSize: 14,
                    outline: "none",
                    resize: "none",
                    transition: "border-color 0.2s",
                    boxSizing: "border-box",
                    fontFamily: "inherit",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "#60adf8")}
                  onBlur={(e) => (e.target.style.borderColor = "#e2e8f0")}
                />
              </div>

              <button
                type="submit"
                style={{
                  width: "100%",
                  color: "#fff",
                  fontWeight: 600,
                  borderRadius: 12,
                  backgroundColor: "#16a34a",
                  padding: "14px 0",
                  border: "none",
                  cursor: "pointer",
                  fontSize: 16,
                  transition: "all 0.2s",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 10,
                }}
              >
                <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                WhatsApp ile Gönder
              </button>

              <p style={{ textAlign: "center", fontSize: 12, color: "#94a3b8", lineHeight: 1.5 }}>
                Gönder butonuna bastığınızda WhatsApp açılır ve bilgileriniz otomatik olarak doldurulur.
              </p>
            </form>
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 1024px) {
          .contact-grid {
            grid-template-columns: 2fr 3fr !important;
          }
          .form-row {
            grid-template-columns: 1fr 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
