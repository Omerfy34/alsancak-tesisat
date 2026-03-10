import { useState } from "react";
import { useContent } from "../context/ContentContext";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

export default function Gallery() {
  const { content } = useContent();
  const images = content.gallery || [];
  const [lightbox, setLightbox] = useState<number | null>(null);

  if (images.length === 0) return null;

  const openLightbox = (idx: number) => setLightbox(idx);
  const closeLightbox = () => setLightbox(null);
  const goPrev = () => {
    if (lightbox === null) return;
    setLightbox(lightbox === 0 ? images.length - 1 : lightbox - 1);
  };
  const goNext = () => {
    if (lightbox === null) return;
    setLightbox(lightbox === images.length - 1 ? 0 : lightbox + 1);
  };

  return (
    <section id="galeri" style={{ padding: "80px 0", backgroundColor: "#f8fafc" }}>
      <div className="site-container">
        {/* Başlık */}
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <span
            style={{
              display: "inline-block",
              fontSize: 13,
              fontWeight: 700,
              color: "#2563eb",
              textTransform: "uppercase",
              letterSpacing: 2,
              marginBottom: 12,
            }}
          >
            Galeri
          </span>
          <h2 style={{ fontSize: 32, fontWeight: 800, color: "#0f172a", marginBottom: 12 }}>
            Çalışmalarımız
          </h2>
          <p style={{ fontSize: 16, color: "#64748b", maxWidth: 540, margin: "0 auto", lineHeight: 1.7 }}>
            Tamamladığımız projelerden örnekler. Kaliteli işçiliğimizi yakından inceleyin.
          </p>
        </div>

        {/* Grid */}
        <div className="gallery-grid">
          {images.map((img, idx) => (
            <div
              key={img.id}
              onClick={() => openLightbox(idx)}
              style={{
                position: "relative",
                borderRadius: 16,
                overflow: "hidden",
                cursor: "pointer",
                aspectRatio: "4/3",
                backgroundColor: "#e2e8f0",
              }}
            >
              <img
                src={img.url}
                alt={img.caption}
                loading="lazy"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                  transition: "transform 0.4s ease",
                }}
                onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.08)")}
                onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
              />
              {/* Overlay */}
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: "32px 16px 16px",
                  background: "linear-gradient(to top, rgba(0,0,0,0.7), transparent)",
                  pointerEvents: "none",
                }}
              >
                <p style={{ color: "#fff", fontSize: 14, fontWeight: 600 }}>{img.caption}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          onClick={closeLightbox}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            backgroundColor: "rgba(0,0,0,0.92)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 20,
          }}
        >
          {/* Kapat */}
          <button
            onClick={closeLightbox}
            style={{
              position: "absolute",
              top: 20,
              right: 20,
              background: "rgba(255,255,255,0.15)",
              border: "none",
              borderRadius: "50%",
              width: 44,
              height: 44,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              color: "#fff",
              zIndex: 10,
            }}
          >
            <X size={22} />
          </button>

          {/* Önceki */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              goPrev();
            }}
            style={{
              position: "absolute",
              left: 16,
              top: "50%",
              transform: "translateY(-50%)",
              background: "rgba(255,255,255,0.15)",
              border: "none",
              borderRadius: "50%",
              width: 48,
              height: 48,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              color: "#fff",
              zIndex: 10,
            }}
          >
            <ChevronLeft size={24} />
          </button>

          {/* Sonraki */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              goNext();
            }}
            style={{
              position: "absolute",
              right: 16,
              top: "50%",
              transform: "translateY(-50%)",
              background: "rgba(255,255,255,0.15)",
              border: "none",
              borderRadius: "50%",
              width: 48,
              height: 48,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              color: "#fff",
              zIndex: 10,
            }}
          >
            <ChevronRight size={24} />
          </button>

          {/* Resim */}
          <div
            onClick={(e) => e.stopPropagation()}
            style={{ maxWidth: "90vw", maxHeight: "85vh", position: "relative" }}
          >
            <img
              src={images[lightbox].url}
              alt={images[lightbox].caption}
              style={{
                maxWidth: "100%",
                maxHeight: "80vh",
                objectFit: "contain",
                borderRadius: 12,
                display: "block",
              }}
            />
            <p
              style={{
                textAlign: "center",
                color: "#fff",
                fontSize: 15,
                marginTop: 16,
                fontWeight: 500,
              }}
            >
              {images[lightbox].caption}
              <span style={{ color: "rgba(255,255,255,0.5)", marginLeft: 12, fontSize: 13 }}>
                {lightbox + 1} / {images.length}
              </span>
            </p>
          </div>
        </div>
      )}

      <style>{`
        .gallery-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
        }
        @media (min-width: 768px) {
          .gallery-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 20px;
          }
        }
      `}</style>
    </section>
  );
}
