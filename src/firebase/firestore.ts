import { initializeApp, type FirebaseApp } from "firebase/app";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  onSnapshot,
  type Firestore,
  type Unsubscribe,
} from "firebase/firestore";
import { getFirebaseConfig } from "./config";
import type { SiteContent } from "../data/siteContent";

let app: FirebaseApp | null = null;
let db: Firestore | null = null;

const DOC_PATH = "site";
const DOC_ID = "content";

/** Firebase uygulamasını başlat */
export function initFirebase(): boolean {
  const cfg = getFirebaseConfig();
  if (!cfg) return false;

  try {
    if (!app) {
      app = initializeApp(cfg);
      db = getFirestore(app);
    }
    return true;
  } catch (err) {
    console.error("Firebase başlatılamadı:", err);
    return false;
  }
}

/** Firestore'dan içerik oku */
export async function fetchContent(): Promise<SiteContent | null> {
  if (!db) return null;
  try {
    const snap = await getDoc(doc(db, DOC_PATH, DOC_ID));
    if (snap.exists()) {
      return snap.data() as SiteContent;
    }
  } catch (err) {
    console.error("Firestore okuma hatası:", err);
  }
  return null;
}

/** Firestore'a içerik yaz */
export async function writeContent(content: SiteContent): Promise<boolean> {
  if (!db) return false;
  try {
    await setDoc(doc(db, DOC_PATH, DOC_ID), JSON.parse(JSON.stringify(content)));
    return true;
  } catch (err) {
    console.error("Firestore yazma hatası:", err);
    return false;
  }
}

/** Gerçek zamanlı dinleyici başlat */
export function listenContent(
  callback: (data: SiteContent) => void
): Unsubscribe | null {
  if (!db) return null;
  try {
    return onSnapshot(doc(db, DOC_PATH, DOC_ID), (snap) => {
      if (snap.exists()) {
        callback(snap.data() as SiteContent);
      }
    });
  } catch (err) {
    console.error("Firestore dinleyici hatası:", err);
    return null;
  }
}

/** Firebase bağlantı durumunu test et */
export async function testConnection(): Promise<{
  ok: boolean;
  message: string;
}> {
  const cfg = getFirebaseConfig();
  if (!cfg)
    return { ok: false, message: "Firebase yapılandırması bulunamadı." };

  try {
    if (!app) {
      app = initializeApp(cfg);
      db = getFirestore(app);
    }
    // Basit bir okuma denemesi
    await getDoc(doc(db!, DOC_PATH, DOC_ID));
    return { ok: true, message: "Bağlantı başarılı!" };
  } catch (err: any) {
    // Uygulamayı sıfırla
    app = null;
    db = null;
    return {
      ok: false,
      message: err?.message || "Bağlantı başarısız.",
    };
  }
}
