import { useState, useEffect } from "react";
import { useContent } from "../context/ContentContext";
import {
  Save, RotateCcw, CheckCircle, ExternalLink,
  Settings, Lock, Eye, EyeOff, LogOut, Shield,
  Plus, Trash2, Image, Cloud, CloudOff, Loader2,
  Wifi, WifiOff, Copy, Info,
} from "lucide-react";
import type {
  SiteContent, ServiceItem, Testimonial, FAQ, GalleryImage,
} from "../data/siteContent";
import {
  saveFirebaseConfig,
  clearFirebaseConfig,
  getFirebaseConfig,
  isFirebaseConfigured,
  type FirebaseConfig,
} from "../firebase/config";
import { testConnection } from "../firebase/firestore";

/* ─── Tipler ─── */
type Tab =
  | "genel"
  | "logo"
  | "iletisim"
  | "hero"
  | "hizmetler"
  | "hakkimizda"
  | "galeri"
  | "yorumlar"
  | "sss"
  | "cta"
  | "firebase"
  | "sifre";

const tabLabels: Record<Tab, string> = {
  genel: "Genel",
  logo: "Logo",
  iletisim: "İletişim",
  hero: "Ana Bölüm",
  hizmetler: "Hizmetler",
  hakkimizda: "Hakkımızda",
  galeri: "Galeri",
  yorumlar: "Yorumlar",
  sss: "SSS",
  cta: "Aksiyon",
  firebase: "☁️ Firebase",
  sifre: "🔒 Şifre",
};

/* ─── Şifre ─── */
const DEFAULT_PASSWORD = "alsancak2024";

function hashPassword(pass: string): string {
  let hash = 0;
  for (let i = 0; i < pass.length; i++) {
    const char = pass.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }
  return "h_" + Math.abs(hash).toString(36);
}

function getStoredHash(): string {
  return localStorage.getItem("admin_pass_hash") || hashPassword(DEFAULT_PASSWORD);
}

function isLoggedIn(): boolean {
  const session = sessionStorage.getItem("admin_session");
  if (!session) return false;
  try {
    const data = JSON.parse(session);
    if (data.expiry && Date.now() < data.expiry) return true;
    sessionStorage.removeItem("admin_session");
  } catch { /* ignore */ }
  return false;
}

function setSession() {
  sessionStorage.setItem(
    "admin_session",
    JSON.stringify({ loggedIn: true, expiry: Date.now() + 3600000 })
  );
}

function clearSession() {
  sessionStorage.removeItem("admin_session");
}

/* ─── Stiller ─── */
const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "10px 14px",
  borderRadius: 10,
  border: "2px solid #e2e8f0",
  fontSize: 14,
  outline: "none",
  color: "#1e293b",
  backgroundColor: "#fff",
  boxSizing: "border-box",
  transition: "border-color 0.2s",
};

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: 13,
  fontWeight: 600,
  color: "#475569",
  marginBottom: 6,
};

/* ─── Bağımsız InputField ─── */
function InputField({
  label, value, onChange, multiline = false, rows = 3, placeholder, type = "text",
}: {
  label: string;
  value: string;
  onChange: (val: string) => void;
  multiline?: boolean;
  rows?: number;
  placeholder?: string;
  type?: string;
}) {
  return (
    <div>
      <label style={labelStyle}>{label}</label>
      {multiline ? (
        <textarea
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          rows={rows}
          placeholder={placeholder}
          style={{ ...inputStyle, resize: "vertical", minHeight: 60 }}
          onFocus={(e) => (e.target.style.borderColor = "#2570e8")}
          onBlur={(e) => (e.target.style.borderColor = "#e2e8f0")}
        />
      ) : (
        <input
          type={type}
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          style={inputStyle}
          onFocus={(e) => (e.target.style.borderColor = "#2570e8")}
          onBlur={(e) => (e.target.style.borderColor = "#e2e8f0")}
        />
      )}
    </div>
  );
}

function SectionTitle({ title }: { title: string }) {
  return (
    <div style={{ borderBottom: "2px solid #f1f5f9", paddingBottom: 10 }}>
      <h3 style={{ fontWeight: 700, color: "#1e293b", fontSize: 17, margin: 0 }}>
        {title}
      </h3>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   LOGIN EKRANI
   ═══════════════════════════════════════════════════ */
function LoginScreen({ onLogin }: { onLogin: () => void }) {
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [locked, setLocked] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (locked) return;
    if (hashPassword(password) === getStoredHash()) {
      setSession();
      onLogin();
    } else {
      const n = attempts + 1;
      setAttempts(n);
      setError("Şifre hatalı. Lütfen tekrar deneyin.");
      setPassword("");
      if (n >= 5) {
        setLocked(true);
        setError("Çok fazla hatalı deneme. 30 saniye bekleyin.");
        setTimeout(() => { setLocked(false); setAttempts(0); setError(""); }, 30000);
      }
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #0f172a 0%, #1e3a5f 50%, #0f172a 100%)",
        padding: 20,
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 420,
          backgroundColor: "#fff",
          borderRadius: 20,
          padding: "48px 36px",
          boxShadow: "0 25px 60px rgba(0,0,0,0.3)",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div
            style={{
              width: 72, height: 72, borderRadius: "50%",
              background: "linear-gradient(135deg, #2570e8, #1d5bd5)",
              display: "inline-flex", alignItems: "center", justifyContent: "center",
              marginBottom: 20, boxShadow: "0 8px 24px rgba(37,112,232,0.3)",
            }}
          >
            <Shield size={32} color="#fff" />
          </div>
          <h1 style={{ fontSize: 22, fontWeight: 700, color: "#1e293b", marginBottom: 8 }}>
            Yönetim Paneli
          </h1>
          <p style={{ fontSize: 14, color: "#94a3b8" }}>
            Devam etmek için yönetici şifrenizi girin
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 20 }}>
            <label style={labelStyle}>Şifre</label>
            <div style={{ position: "relative" }}>
              <div style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "#94a3b8", pointerEvents: "none" }}>
                <Lock size={18} />
              </div>
              <input
                type={showPass ? "text" : "password"}
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError(""); }}
                placeholder="Şifrenizi girin"
                disabled={locked}
                style={{ ...inputStyle, padding: "14px 48px 14px 44px", borderColor: error ? "#ef4444" : "#e2e8f0", backgroundColor: locked ? "#f8fafc" : "#fff" }}
                autoFocus
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "#94a3b8", padding: 0, display: "flex" }}
              >
                {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {error && <p style={{ fontSize: 13, color: "#ef4444", marginTop: 8 }}>⚠ {error}</p>}
          </div>
          <button
            type="submit"
            disabled={locked || !password.trim()}
            style={{
              width: "100%", padding: "14px 0", borderRadius: 12, border: "none",
              fontSize: 15, fontWeight: 600, color: "#fff",
              background: locked || !password.trim() ? "#cbd5e1" : "linear-gradient(135deg, #2570e8, #1d5bd5)",
              cursor: locked || !password.trim() ? "not-allowed" : "pointer",
            }}
          >
            {locked ? "Kilitlendi..." : "Giriş Yap"}
          </button>
        </form>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   ŞİFRE AYARLARI SEKMESİ
   ═══════════════════════════════════════════════════ */
function PasswordTab() {
  const [currentPass, setCurrentPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [msg, setMsg] = useState<{ text: string; ok: boolean }>({ text: "", ok: false });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (hashPassword(currentPass) !== getStoredHash()) {
      setMsg({ text: "Mevcut şifre hatalı.", ok: false }); return;
    }
    if (newPass.length < 6) {
      setMsg({ text: "Yeni şifre en az 6 karakter olmalı.", ok: false }); return;
    }
    if (newPass !== confirmPass) {
      setMsg({ text: "Yeni şifreler eşleşmiyor.", ok: false }); return;
    }
    localStorage.setItem("admin_pass_hash", hashPassword(newPass));
    setMsg({ text: "Şifre başarıyla değiştirildi!", ok: true });
    setCurrentPass(""); setNewPass(""); setConfirmPass("");
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <SectionTitle title="Şifre Değiştir" />
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 400 }}>
        <div>
          <label style={labelStyle}>Mevcut Şifre</label>
          <input type="password" value={currentPass} onChange={(e) => { setCurrentPass(e.target.value); setMsg({ text: "", ok: false }); }} style={inputStyle} />
        </div>
        <div>
          <label style={labelStyle}>Yeni Şifre</label>
          <input type="password" value={newPass} onChange={(e) => { setNewPass(e.target.value); setMsg({ text: "", ok: false }); }} style={inputStyle} placeholder="En az 6 karakter" />
        </div>
        <div>
          <label style={labelStyle}>Yeni Şifre (Tekrar)</label>
          <input type="password" value={confirmPass} onChange={(e) => { setConfirmPass(e.target.value); setMsg({ text: "", ok: false }); }} style={inputStyle} />
        </div>

        {msg.text && (
          <p style={{ fontSize: 13, color: msg.ok ? "#16a34a" : "#ef4444", display: "flex", alignItems: "center", gap: 6 }}>
            {msg.ok ? <CheckCircle size={14} /> : "⚠"} {msg.text}
          </p>
        )}

        <button type="submit" style={{ padding: "12px 24px", borderRadius: 10, border: "none", fontSize: 14, fontWeight: 600, color: "#fff", backgroundColor: "#2570e8", cursor: "pointer", alignSelf: "flex-start" }}>
          Şifreyi Değiştir
        </button>
      </form>

      <div style={{ marginTop: 8, padding: 16, borderRadius: 12, backgroundColor: "#fefce8", border: "1px solid #fde68a" }}>
        <p style={{ fontSize: 13, color: "#92400e", lineHeight: 1.6, margin: 0 }}>
          <strong>Not:</strong> Varsayılan şifre{" "}
          <code style={{ backgroundColor: "#fef3c7", padding: "2px 6px", borderRadius: 4 }}>alsancak2024</code>{" "}
          olarak belirlenmiştir. Güvenliğiniz için lütfen ilk girişte şifrenizi değiştirin.
        </p>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   FIREBASE AYARLARI SEKMESİ
   ═══════════════════════════════════════════════════ */
function FirebaseTab() {
  const existing = getFirebaseConfig();
  const [apiKey, setApiKey] = useState(existing?.apiKey || "");
  const [authDomain, setAuthDomain] = useState(existing?.authDomain || "");
  const [projectId, setProjectId] = useState(existing?.projectId || "");
  const [storageBucket, setStorageBucket] = useState(existing?.storageBucket || "");
  const [messagingSenderId, setMessagingSenderId] = useState(existing?.messagingSenderId || "");
  const [appId, setAppId] = useState(existing?.appId || "");
  const [testing, setTesting] = useState(false);
  const [result, setResult] = useState<{ ok: boolean; msg: string } | null>(null);
  const [showGuide, setShowGuide] = useState(false);

  const connected = isFirebaseConfigured();

  const handleSave = async () => {
    const cfg: FirebaseConfig = { apiKey, authDomain, projectId, storageBucket, messagingSenderId, appId };
    saveFirebaseConfig(cfg);
    setTesting(true);
    setResult(null);
    const res = await testConnection();
    setTesting(false);
    setResult({ ok: res.ok, msg: res.message });
    if (res.ok) {
      setTimeout(() => window.location.reload(), 1500);
    }
  };

  const handleDisconnect = () => {
    clearFirebaseConfig();
    setApiKey(""); setAuthDomain(""); setProjectId(""); setStorageBucket(""); setMessagingSenderId(""); setAppId("");
    setResult(null);
    setTimeout(() => window.location.reload(), 500);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <SectionTitle title="Firebase Bağlantısı" />

      {/* Durum kartı */}
      <div style={{
        display: "flex", alignItems: "center", gap: 16, padding: 20,
        borderRadius: 14, border: `2px solid ${connected ? "#bbf7d0" : "#fde68a"}`,
        backgroundColor: connected ? "#f0fdf4" : "#fffbeb",
      }}>
        {connected ? <Wifi size={24} color="#16a34a" /> : <WifiOff size={24} color="#d97706" />}
        <div>
          <p style={{ fontWeight: 700, fontSize: 15, color: connected ? "#15803d" : "#92400e", margin: 0 }}>
            {connected ? "Firebase Bağlı ✓" : "Firebase Bağlı Değil"}
          </p>
          <p style={{ fontSize: 13, color: connected ? "#166534" : "#a16207", margin: "4px 0 0 0" }}>
            {connected
              ? "Değişiklikleriniz otomatik olarak tüm ziyaretçilere yansıyor."
              : "Değişiklikler sadece bu tarayıcıda geçerli. Firebase bağlayarak tüm ziyaretçilere yansıtın."}
          </p>
        </div>
      </div>

      {/* Kurulum rehberi */}
      <div>
        <button
          onClick={() => setShowGuide(!showGuide)}
          style={{
            display: "flex", alignItems: "center", gap: 8,
            background: "none", border: "1px solid #e2e8f0", borderRadius: 10,
            padding: "10px 16px", fontSize: 14, fontWeight: 600,
            color: "#2570e8", cursor: "pointer", width: "100%",
          }}
        >
          <Info size={16} />
          {showGuide ? "Rehberi Gizle" : "Firebase Nasıl Kurulur? (Adım Adım Rehber)"}
        </button>

        {showGuide && (
          <div style={{
            marginTop: 12, padding: 24, borderRadius: 14,
            backgroundColor: "#f8fafc", border: "1px solid #e2e8f0",
          }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {[
                {
                  step: "1",
                  title: "Firebase Console'a gidin",
                  desc: "console.firebase.google.com adresine gidin ve Google hesabınızla giriş yapın.",
                },
                {
                  step: "2",
                  title: "Yeni proje oluşturun",
                  desc: "\"Proje Ekle\" butonuna tıklayın. Proje adını girin (örn: alsancak-tesisat). Google Analytics'i kapatabilirsiniz.",
                },
                {
                  step: "3",
                  title: "Firestore Database oluşturun",
                  desc: "Sol menüden \"Firestore Database\" seçin → \"Veritabanı oluştur\" → \"Test modunda başla\" seçin → Konum olarak \"europe-west1\" seçin.",
                },
                {
                  step: "4",
                  title: "Web uygulaması ekleyin",
                  desc: "Proje ayarlarına gidin (⚙️ simgesi) → \"Genel\" sekmesinde aşağıda \"Web\" ikonuna (</>) tıklayın → Uygulama adı girin → \"Kaydet\".",
                },
                {
                  step: "5",
                  title: "Config bilgilerini kopyalayın",
                  desc: "Ekranda çıkan firebaseConfig nesnesindeki bilgileri aşağıdaki alanlara yapıştırın.",
                },
              ].map((item) => (
                <div key={item.step} style={{ display: "flex", gap: 14 }}>
                  <div style={{
                    width: 32, height: 32, borderRadius: "50%", flexShrink: 0,
                    background: "linear-gradient(135deg, #2570e8, #1d5bd5)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "#fff", fontSize: 14, fontWeight: 700,
                  }}>
                    {item.step}
                  </div>
                  <div>
                    <p style={{ fontWeight: 700, fontSize: 14, color: "#1e293b", margin: 0 }}>{item.title}</p>
                    <p style={{ fontSize: 13, color: "#64748b", margin: "4px 0 0 0", lineHeight: 1.5 }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div style={{
              marginTop: 20, padding: 16, borderRadius: 10,
              backgroundColor: "#eff6ff", border: "1px solid #bfdbfe",
            }}>
              <p style={{ fontSize: 13, color: "#1d4ed8", margin: 0, lineHeight: 1.5 }}>
                <strong>Güvenlik Kuralları:</strong> Firestore kurallarını şu şekilde ayarlayın:
              </p>
              <div style={{ position: "relative", marginTop: 8 }}>
                <pre style={{
                  backgroundColor: "#1e293b", color: "#e2e8f0", padding: 16,
                  borderRadius: 8, fontSize: 12, overflowX: "auto", margin: 0,
                }}>
{`rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /site/{document=**} {
      allow read: if true;
      allow write: if true;
    }
  }
}`}
                </pre>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(`rules_version = '2';\nservice cloud.firestore {\n  match /databases/{database}/documents {\n    match /site/{document=**} {\n      allow read: if true;\n      allow write: if true;\n    }\n  }\n}`);
                  }}
                  style={{
                    position: "absolute", top: 8, right: 8,
                    background: "#334155", border: "none", borderRadius: 6,
                    padding: "4px 8px", cursor: "pointer", color: "#94a3b8",
                    display: "flex", alignItems: "center", gap: 4, fontSize: 11,
                  }}
                >
                  <Copy size={12} /> Kopyala
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Config alanları */}
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        <SectionTitle title="Firebase Yapılandırma Bilgileri" />
        <InputField label="API Key" value={apiKey} onChange={setApiKey} placeholder="AIzaSy..." />
        <InputField label="Auth Domain" value={authDomain} onChange={setAuthDomain} placeholder="proje-adi.firebaseapp.com" />
        <InputField label="Project ID" value={projectId} onChange={setProjectId} placeholder="proje-adi" />
        <InputField label="Storage Bucket" value={storageBucket} onChange={setStorageBucket} placeholder="proje-adi.appspot.com" />
        <InputField label="Messaging Sender ID" value={messagingSenderId} onChange={setMessagingSenderId} placeholder="123456789" />
        <InputField label="App ID" value={appId} onChange={setAppId} placeholder="1:123456789:web:abc..." />
      </div>

      {/* Test & Kaydet */}
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        <button
          onClick={handleSave}
          disabled={testing || !apiKey || !projectId}
          style={{
            display: "flex", alignItems: "center", gap: 8,
            padding: "12px 24px", borderRadius: 10, border: "none",
            fontSize: 14, fontWeight: 600, color: "#fff",
            backgroundColor: testing || !apiKey || !projectId ? "#cbd5e1" : "#2570e8",
            cursor: testing || !apiKey || !projectId ? "not-allowed" : "pointer",
          }}
        >
          {testing ? <Loader2 size={16} className="animate-spin" /> : <Cloud size={16} />}
          {testing ? "Test Ediliyor..." : "Kaydet ve Bağlan"}
        </button>

        {connected && (
          <button
            onClick={handleDisconnect}
            style={{
              display: "flex", alignItems: "center", gap: 8,
              padding: "12px 24px", borderRadius: 10,
              border: "1px solid #fecaca", fontSize: 14, fontWeight: 600,
              color: "#dc2626", backgroundColor: "#fff", cursor: "pointer",
            }}
          >
            <CloudOff size={16} /> Bağlantıyı Kes
          </button>
        )}
      </div>

      {result && (
        <div style={{
          padding: 16, borderRadius: 12,
          backgroundColor: result.ok ? "#f0fdf4" : "#fef2f2",
          border: `1px solid ${result.ok ? "#bbf7d0" : "#fecaca"}`,
          display: "flex", alignItems: "center", gap: 10,
        }}>
          {result.ok ? <CheckCircle size={18} color="#16a34a" /> : <CloudOff size={18} color="#dc2626" />}
          <p style={{ fontSize: 14, color: result.ok ? "#15803d" : "#dc2626", margin: 0, fontWeight: 600 }}>
            {result.msg}
            {result.ok && " Sayfa yenileniyor..."}
          </p>
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   ANA ADMIN PANELİ
   ═══════════════════════════════════════════════════ */
export default function AdminPanel({ onExit }: { onExit: () => void }) {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    setAuthenticated(isLoggedIn());
  }, []);

  if (!authenticated) {
    return <LoginScreen onLogin={() => setAuthenticated(true)} />;
  }

  return (
    <AdminDashboard
      onExit={onExit}
      onLogout={() => { clearSession(); setAuthenticated(false); }}
    />
  );
}

/* ═══════════════════════════════════════════════════
   DASHBOARD
   ═══════════════════════════════════════════════════ */
function AdminDashboard({ onExit, onLogout }: { onExit: () => void; onLogout: () => void }) {
  const { content, updateContent, resetToDefault, firebaseActive, saving } = useContent();
  const [draft, setDraft] = useState<SiteContent>(() => JSON.parse(JSON.stringify(content)));
  const [activeTab, setActiveTab] = useState<Tab>("genel");
  const [saved, setSaved] = useState(false);
  const [confirmReset, setConfirmReset] = useState(false);

  useEffect(() => {
    setDraft(JSON.parse(JSON.stringify(content)));
  }, [content]);

  const setField = (path: string, value: any) => {
    setDraft((prev) => {
      const next = JSON.parse(JSON.stringify(prev));
      const keys = path.split(".");
      let obj: any = next;
      for (let i = 0; i < keys.length - 1; i++) {
        const k = isNaN(Number(keys[i])) ? keys[i] : Number(keys[i]);
        obj = obj[k];
      }
      const last = isNaN(Number(keys[keys.length - 1])) ? keys[keys.length - 1] : Number(keys[keys.length - 1]);
      obj[last] = value;
      return next;
    });
  };

  const getVal = (path: string): any => {
    const keys = path.split(".");
    let val: any = draft;
    for (const k of keys) val = val?.[isNaN(Number(k)) ? k : Number(k)];
    return val ?? "";
  };

  const save = () => {
    updateContent(draft);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const handleReset = () => {
    resetToDefault();
    setConfirmReset(false);
  };

  const F = (label: string, path: string, multiline = false, rows = 3) => (
    <InputField
      key={path}
      label={label}
      value={getVal(path)}
      onChange={(v) => setField(path, v)}
      multiline={multiline}
      rows={rows}
    />
  );

  /* ═══ TAB İÇERİKLERİ ═══ */
  const renderTab = () => {
    switch (activeTab) {
      case "sifre":
        return <PasswordTab />;
      case "firebase":
        return <FirebaseTab />;

      case "genel":
        return (
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <SectionTitle title="Marka Bilgileri" />
            <div className="adm-grid-2" style={{ display: "grid", gap: 16 }}>
              {F("Site Adı", "brand.name")}
              {F("Slogan", "brand.tagline")}
            </div>
            {F("Açıklama", "brand.description", true)}
            <SectionTitle title="Sosyal Medya" />
            <div className="adm-grid-3" style={{ display: "grid", gap: 16 }}>
              {F("Instagram", "social.instagram")}
              {F("Facebook", "social.facebook")}
              {F("WhatsApp", "social.whatsapp")}
            </div>
          </div>
        );

      case "logo":
        return (
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <SectionTitle title="Logo Ayarları" />
            <div style={{ display: "flex", alignItems: "center", gap: 24, padding: 24, border: "2px solid #e2e8f0", borderRadius: 16, backgroundColor: "#fafbfc" }}>
              <div style={{ width: 120, height: 120, borderRadius: 12, border: "2px dashed #cbd5e1", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", backgroundColor: "#fff", flexShrink: 0 }}>
                {draft.brand.logoUrl ? (
                  <img src={draft.brand.logoUrl} alt="Logo" style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }} />
                ) : (
                  <Image size={36} color="#cbd5e1" />
                )}
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: 14, fontWeight: 600, color: "#334155", marginBottom: 12 }}>Mevcut Logo</p>
                <p style={{ fontSize: 13, color: "#94a3b8", lineHeight: 1.5 }}>
                  Logo URL'sini aşağıdan değiştirebilirsiniz. Önerilen boyut: 200x60px, PNG veya SVG.
                </p>
              </div>
            </div>
            {F("Logo URL", "brand.logoUrl")}
          </div>
        );

      case "iletisim":
        return (
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <SectionTitle title="İletişim Bilgileri" />
            <div className="adm-grid-2" style={{ display: "grid", gap: 16 }}>
              {F("Telefon (link)", "contact.phone")}
              {F("Telefon (görünen)", "contact.phoneDisplay")}
              {F("E-posta", "contact.email")}
              {F("Adres", "contact.address")}
              {F("İlçe", "contact.district")}
              {F("Şehir", "contact.city")}
            </div>
            <div className="adm-grid-2" style={{ display: "grid", gap: 16 }}>
              {F("Çalışma Saatleri", "contact.workingHours")}
              {F("Çalışma Günleri", "contact.workingDays")}
            </div>
          </div>
        );

      case "hero":
        return (
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <SectionTitle title="Ana Bölüm (Hero)" />
            {F("Başlık", "hero.title")}
            {F("Alt Başlık", "hero.subtitle", true)}
            <div className="adm-grid-2" style={{ display: "grid", gap: 16 }}>
              {F("Buton 1", "hero.cta")}
              {F("Buton 2", "hero.secondaryCta")}
            </div>
            <SectionTitle title="Rozetler" />
            {draft.hero.badges.map((badge: string, i: number) => (
              <div key={i} style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 8 }}>
                <div style={{ flex: 1 }}>
                  <InputField label={`Rozet ${i + 1}`} value={badge} onChange={(v) => setField(`hero.badges.${i}`, v)} />
                </div>
                <button
                  onClick={() => setField("hero.badges", draft.hero.badges.filter((_: string, idx: number) => idx !== i))}
                  style={{ color: "#f87171", background: "none", border: "none", cursor: "pointer", padding: 8, marginTop: 20 }}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
            <button
              onClick={() => setField("hero.badges", [...draft.hero.badges, "Yeni Rozet"])}
              style={{ padding: "10px", border: "2px dashed #cbd5e1", borderRadius: 10, fontSize: 13, fontWeight: 600, color: "#64748b", background: "none", cursor: "pointer" }}
            >
              + Rozet Ekle
            </button>
          </div>
        );

      case "hizmetler":
        return (
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <SectionTitle title="Hizmetler" />
            {draft.services.map((svc: ServiceItem, i: number) => (
              <div key={svc.id} style={{ border: "2px solid #e2e8f0", borderRadius: 16, padding: 24, display: "flex", flexDirection: "column", gap: 16 }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <h4 style={{ fontWeight: 700, color: "#334155", fontSize: 15, margin: 0 }}>{svc.title || `Hizmet ${i + 1}`}</h4>
                  <button onClick={() => setField("services", draft.services.filter((_: ServiceItem, idx: number) => idx !== i))} style={{ color: "#f87171", fontSize: 13, fontWeight: 600, background: "none", border: "none", cursor: "pointer" }}>Sil</button>
                </div>
                <div className="adm-grid-2" style={{ display: "grid", gap: 12 }}>
                  {F("Başlık", `services.${i}.title`)}
                  {F("İkon", `services.${i}.icon`)}
                </div>
                {F("Açıklama", `services.${i}.description`, true, 2)}
                <div>
                  <label style={labelStyle}>Özellikler</label>
                  {svc.features.map((feat: string, fi: number) => (
                    <div key={fi} style={{ display: "flex", gap: 8, marginBottom: 6 }}>
                      <div style={{ flex: 1 }}>
                        <input
                          type="text"
                          value={feat}
                          onChange={(e) => setField(`services.${i}.features.${fi}`, e.target.value)}
                          style={inputStyle}
                        />
                      </div>
                      <button onClick={() => { const f = [...svc.features]; f.splice(fi, 1); setField(`services.${i}.features`, f); }} style={{ color: "#f87171", background: "none", border: "none", cursor: "pointer" }}>
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={() => setField(`services.${i}.features`, [...svc.features, "Yeni özellik"])}
                    style={{ fontSize: 12, color: "#2570e8", fontWeight: 600, background: "none", border: "none", cursor: "pointer", marginTop: 4 }}
                  >
                    + Özellik Ekle
                  </button>
                </div>
              </div>
            ))}
            <button
              onClick={() => {
                const ns: ServiceItem = { id: `s-${Date.now()}`, icon: "wrench", title: "Yeni Hizmet", description: "Açıklama...", features: ["Özellik 1"] };
                setField("services", [...draft.services, ns]);
              }}
              style={{ width: "100%", padding: "14px 0", border: "2px dashed #cbd5e1", borderRadius: 14, fontSize: 14, fontWeight: 600, color: "#64748b", background: "none", cursor: "pointer" }}
            >
              + Yeni Hizmet Ekle
            </button>
          </div>
        );

      case "hakkimizda":
        return (
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <SectionTitle title="Hakkımızda" />
            {F("Başlık", "about.title")}
            {F("Alt Başlık", "about.subtitle")}
            {F("Kısa Açıklama", "about.description", true)}
            <SectionTitle title="Paragraflar" />
            {draft.about.paragraphs.map((p: string, i: number) => (
              <div key={i} style={{ display: "flex", gap: 8 }}>
                <div style={{ flex: 1 }}>
                  <InputField label={`Paragraf ${i + 1}`} value={p} onChange={(v) => setField(`about.paragraphs.${i}`, v)} multiline rows={2} />
                </div>
                <button onClick={() => setField("about.paragraphs", draft.about.paragraphs.filter((_: string, idx: number) => idx !== i))} style={{ color: "#f87171", background: "none", border: "none", cursor: "pointer", marginTop: 24 }}>
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
            <button
              onClick={() => setField("about.paragraphs", [...draft.about.paragraphs, "Yeni paragraf..."])}
              style={{ fontSize: 12, color: "#2570e8", fontWeight: 600, background: "none", border: "none", cursor: "pointer" }}
            >
              + Paragraf Ekle
            </button>
            <SectionTitle title="İstatistikler" />
              {draft.about.stats.map((_s: { value: string; label: string }, i: number) => (
              <div key={i} className="adm-grid-2" style={{ display: "grid", gap: 12 }}>
                {F("Değer", `about.stats.${i}.value`)}
                {F("Etiket", `about.stats.${i}.label`)}
              </div>
            ))}
          </div>
        );

      case "galeri":
        return (
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <SectionTitle title="Fotoğraf Galerisi" />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 16 }}>
              {(draft.gallery || []).map((img: GalleryImage, i: number) => (
                <div key={img.id} style={{ border: "2px solid #e2e8f0", borderRadius: 14, overflow: "hidden" }}>
                  <div style={{ width: "100%", height: 140, backgroundColor: "#f1f5f9", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
                    {img.url ? (
                      <img src={img.url} alt={img.caption} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    ) : (
                      <Image size={32} color="#cbd5e1" />
                    )}
                  </div>
                  <div style={{ padding: 14, display: "flex", flexDirection: "column", gap: 10 }}>
                    <InputField label="Fotoğraf URL" value={img.url} onChange={(v) => setField(`gallery.${i}.url`, v)} placeholder="https://..." />
                    <InputField label="Açıklama" value={img.caption} onChange={(v) => setField(`gallery.${i}.caption`, v)} placeholder="Fotoğraf açıklaması" />
                    <button
                      onClick={() => setField("gallery", draft.gallery.filter((_: GalleryImage, idx: number) => idx !== i))}
                      style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, padding: "8px 0", fontSize: 13, fontWeight: 600, color: "#ef4444", background: "none", border: "1px solid #fecaca", borderRadius: 8, cursor: "pointer" }}
                    >
                      <Trash2 size={14} /> Sil
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={() => {
                const ni: GalleryImage = { id: `g-${Date.now()}`, url: "", caption: "Yeni Fotoğraf" };
                setField("gallery", [...(draft.gallery || []), ni]);
              }}
              style={{ width: "100%", padding: "14px 0", border: "2px dashed #cbd5e1", borderRadius: 14, fontSize: 14, fontWeight: 600, color: "#64748b", background: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}
            >
              <Plus size={18} /> Yeni Fotoğraf Ekle
            </button>
          </div>
        );

      case "yorumlar":
        return (
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <SectionTitle title="Müşteri Yorumları" />
            {draft.testimonials.map((t: Testimonial, i: number) => (
              <div key={t.id} style={{ border: "2px solid #e2e8f0", borderRadius: 16, padding: 24, display: "flex", flexDirection: "column", gap: 16 }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <h4 style={{ fontWeight: 700, color: "#334155", fontSize: 15, margin: 0 }}>Yorum {i + 1}</h4>
                  <button onClick={() => setField("testimonials", draft.testimonials.filter((_: Testimonial, idx: number) => idx !== i))} style={{ color: "#f87171", fontSize: 13, fontWeight: 600, background: "none", border: "none", cursor: "pointer" }}>Sil</button>
                </div>
                <div className="adm-grid-3" style={{ display: "grid", gap: 12 }}>
                  {F("İsim", `testimonials.${i}.name`)}
                  {F("Konum", `testimonials.${i}.location`)}
                  <div>
                    <label style={labelStyle}>Puan</label>
                    <select value={t.rating} onChange={(e) => setField(`testimonials.${i}.rating`, Number(e.target.value))} style={inputStyle}>
                      {[5, 4, 3, 2, 1].map((n) => <option key={n} value={n}>{n} Yıldız</option>)}
                    </select>
                  </div>
                </div>
                {F("Yorum", `testimonials.${i}.text`, true, 2)}
              </div>
            ))}
            <button
              onClick={() => {
                const nt: Testimonial = { id: `t-${Date.now()}`, name: "Yeni Müşteri", location: "İzmir", text: "Yorum metni...", rating: 5 };
                setField("testimonials", [...draft.testimonials, nt]);
              }}
              style={{ width: "100%", padding: "14px 0", border: "2px dashed #cbd5e1", borderRadius: 14, fontSize: 14, fontWeight: 600, color: "#64748b", background: "none", cursor: "pointer" }}
            >
              + Yeni Yorum Ekle
            </button>
          </div>
        );

      case "sss":
        return (
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <SectionTitle title="Sıkça Sorulan Sorular" />
            {draft.faq.map((item: FAQ, i: number) => (
              <div key={item.id} style={{ border: "2px solid #e2e8f0", borderRadius: 16, padding: 24, display: "flex", flexDirection: "column", gap: 16 }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <h4 style={{ fontWeight: 700, color: "#334155", fontSize: 15, margin: 0 }}>Soru {i + 1}</h4>
                  <button onClick={() => setField("faq", draft.faq.filter((_: FAQ, idx: number) => idx !== i))} style={{ color: "#f87171", fontSize: 13, fontWeight: 600, background: "none", border: "none", cursor: "pointer" }}>Sil</button>
                </div>
                {F("Soru", `faq.${i}.question`)}
                {F("Cevap", `faq.${i}.answer`, true, 2)}
              </div>
            ))}
            <button
              onClick={() => {
                const nf: FAQ = { id: `f-${Date.now()}`, question: "Yeni soru?", answer: "Cevap..." };
                setField("faq", [...draft.faq, nf]);
              }}
              style={{ width: "100%", padding: "14px 0", border: "2px dashed #cbd5e1", borderRadius: 14, fontSize: 14, fontWeight: 600, color: "#64748b", background: "none", cursor: "pointer" }}
            >
              + Yeni Soru Ekle
            </button>
          </div>
        );

      case "cta":
        return (
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <SectionTitle title="Aksiyon Bölümü (CTA)" />
            {F("Başlık", "cta.title")}
            {F("Alt Başlık", "cta.subtitle", true)}
            {F("Buton Metni", "cta.buttonText")}
            <SectionTitle title="Footer" />
            {F("Telif Hakkı", "footer.copyright")}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f8fafc" }}>
      {/* Üst bar */}
      <div style={{ position: "sticky", top: 0, zIndex: 50, backgroundColor: "#fff", borderBottom: "2px solid #e2e8f0", boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px", height: 68, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{ width: 40, height: 40, borderRadius: 12, background: "linear-gradient(135deg, #2570e8, #1d5bd5)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Settings size={20} color="#fff" />
            </div>
            <div>
              <h1 style={{ fontWeight: 700, color: "#1e293b", fontSize: 16, margin: 0 }}>Yönetim Paneli</h1>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 2 }}>
                <p style={{ fontSize: 12, color: "#94a3b8", margin: 0 }}>{content.brand.name}</p>
                {firebaseActive ? (
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 3, fontSize: 10, fontWeight: 700, color: "#16a34a", backgroundColor: "#f0fdf4", padding: "2px 6px", borderRadius: 4, border: "1px solid #bbf7d0" }}>
                    <Cloud size={10} /> Bulut
                  </span>
                ) : (
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 3, fontSize: 10, fontWeight: 700, color: "#d97706", backgroundColor: "#fffbeb", padding: "2px 6px", borderRadius: 4, border: "1px solid #fde68a" }}>
                    <CloudOff size={10} /> Yerel
                  </span>
                )}
              </div>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <button onClick={onExit} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 14, color: "#64748b", padding: "8px 16px", background: "none", border: "1px solid #e2e8f0", borderRadius: 10, cursor: "pointer", fontWeight: 500 }}>
              <ExternalLink size={14} /> Siteye Dön
            </button>
            <button onClick={onLogout} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 14, color: "#ef4444", padding: "8px 16px", background: "none", border: "1px solid #fecaca", borderRadius: 10, cursor: "pointer", fontWeight: 500 }}>
              <LogOut size={14} /> Çıkış
            </button>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "32px 24px 140px" }}>
        <div className="adm-layout" style={{ display: "flex", gap: 28 }}>
          {/* Sidebar */}
          <div className="adm-sidebar" style={{ width: 220, flexShrink: 0 }}>
            <div style={{ position: "sticky", top: 100, backgroundColor: "#fff", borderRadius: 16, border: "2px solid #e2e8f0", padding: 8 }}>
              <nav style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {(Object.keys(tabLabels) as Tab[]).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    style={{
                      textAlign: "left", padding: "11px 14px", fontSize: 14, whiteSpace: "nowrap",
                      fontWeight: activeTab === tab ? 600 : 500,
                      color: activeTab === tab ? "#1d5bd5" : "#475569",
                      backgroundColor: activeTab === tab ? "#eff6ff" : "transparent",
                      border: activeTab === tab ? "1px solid #bfdbfe" : "1px solid transparent",
                      borderRadius: 10, cursor: "pointer", width: "100%", transition: "all 0.15s",
                    }}
                  >
                    {tabLabels[tab]}
                  </button>
                ))}
              </nav>
            </div>

            <div style={{ backgroundColor: "#fff", borderRadius: 16, border: "2px solid #e2e8f0", padding: 16, marginTop: 16 }}>
              {confirmReset ? (
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  <p style={{ fontSize: 12, fontWeight: 600, color: "#dc2626", margin: 0 }}>Emin misiniz? Tüm değişiklikler silinecek.</p>
                  <div style={{ display: "flex", gap: 8 }}>
                    <button onClick={handleReset} style={{ flex: 1, fontSize: 12, fontWeight: 600, backgroundColor: "#dc2626", color: "#fff", padding: "8px 0", border: "none", borderRadius: 8, cursor: "pointer" }}>Evet</button>
                    <button onClick={() => setConfirmReset(false)} style={{ flex: 1, fontSize: 12, fontWeight: 600, backgroundColor: "#f1f5f9", color: "#475569", padding: "8px 0", border: "none", borderRadius: 8, cursor: "pointer" }}>İptal</button>
                  </div>
                </div>
              ) : (
                <button onClick={() => setConfirmReset(true)} style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, width: "100%", fontSize: 14, color: "#64748b", padding: "8px 0", background: "none", border: "none", cursor: "pointer", fontWeight: 500 }}>
                  <RotateCcw size={14} /> Varsayılana Dön
                </button>
              )}
            </div>
          </div>

          {/* İçerik */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ backgroundColor: "#fff", borderRadius: 16, border: "2px solid #e2e8f0", padding: 32 }}>
              {renderTab()}
            </div>
          </div>
        </div>
      </div>

      {/* Kaydet butonu - şifre ve firebase sekmelerinde gösterme */}
      {activeTab !== "sifre" && activeTab !== "firebase" && (
        <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 40, backgroundColor: "#fff", borderTop: "2px solid #e2e8f0", padding: "16px 0", boxShadow: "0 -4px 12px rgba(0,0,0,0.04)" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 16 }}>
            {saving && (
              <span style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 14, color: "#2570e8" }}>
                <Loader2 size={16} /> Buluta kaydediliyor...
              </span>
            )}
            {saved && (
              <span style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 14, fontWeight: 600, color: "#16a34a" }}>
                <CheckCircle size={16} />
                {firebaseActive ? "Kaydedildi ve yayınlandı!" : "Kaydedildi! (Sadece yerel)"}
              </span>
            )}
            <button
              onClick={save}
              style={{
                display: "flex", alignItems: "center", gap: 8, color: "#fff",
                borderRadius: 12, fontWeight: 600,
                background: "linear-gradient(135deg, #2570e8, #1d5bd5)",
                padding: "12px 28px", fontSize: 15, border: "none", cursor: "pointer",
                boxShadow: "0 4px 16px rgba(37,112,232,0.25)",
              }}
            >
              <Save size={16} />
              {firebaseActive ? "Kaydet ve Yayınla" : "Değişiklikleri Kaydet"}
            </button>
          </div>
        </div>
      )}

      <style>{`
        @media (min-width: 640px) {
          .adm-grid-2 { grid-template-columns: 1fr 1fr !important; }
          .adm-grid-3 { grid-template-columns: 1fr 1fr 1fr !important; }
        }
        @media (max-width: 860px) {
          .adm-layout { flex-direction: column !important; }
          .adm-sidebar { width: 100% !important; }
          .adm-sidebar nav { flex-direction: row !important; overflow-x: auto !important; gap: 4px !important; }
        }
      `}</style>
    </div>
  );
}
