/*
  ═══════════════════════════════════════════════════════════
  FIREBASE YAPILANDIRMASI

  Aşağıdaki değerleri kendi Firebase projenizden aldığınız
  bilgilerle değiştirin. Nasıl yapılacağını öğrenmek için
  yönetim panelindeki "Firebase" sekmesine bakın.
  ═══════════════════════════════════════════════════════════
*/

export interface FirebaseConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
}

// localStorage'dan config oku (admin panelinden girilmiş olabilir)
const FIREBASE_CONFIG_KEY = "firebase_config";

export function getFirebaseConfig(): FirebaseConfig | null {
  try {
    const stored = localStorage.getItem(FIREBASE_CONFIG_KEY);
    if (stored) {
      const cfg = JSON.parse(stored) as FirebaseConfig;
      if (cfg.apiKey && cfg.projectId && !cfg.apiKey.startsWith("YOUR_")) {
        return cfg;
      }
    }
  } catch {
    /* ignore */
  }

  // Hardcoded config — buraya kendi bilgilerinizi girebilirsiniz
  const hardcoded: FirebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT.appspot.com",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID",
  };

  if (hardcoded.apiKey.startsWith("YOUR_")) return null;
  return hardcoded;
}

export function saveFirebaseConfig(cfg: FirebaseConfig): void {
  localStorage.setItem(FIREBASE_CONFIG_KEY, JSON.stringify(cfg));
}

export function clearFirebaseConfig(): void {
  localStorage.removeItem(FIREBASE_CONFIG_KEY);
}

export function isFirebaseConfigured(): boolean {
  return getFirebaseConfig() !== null;
}
