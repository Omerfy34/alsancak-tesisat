import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef,
  type ReactNode,
} from "react";
import {
  getContent,
  saveContent as saveLocal,
  resetContent as resetLocal,
  getDefaultContent,
  type SiteContent,
} from "../data/siteContent";
import { isFirebaseConfigured } from "../firebase/config";
import {
  initFirebase,
  fetchContent,
  writeContent,
  listenContent,
} from "../firebase/firestore";

interface ContentContextValue {
  content: SiteContent;
  updateContent: (newContent: SiteContent) => void;
  resetToDefault: () => void;
  firebaseActive: boolean;
  saving: boolean;
}

const ContentContext = createContext<ContentContextValue | null>(null);

export function ContentProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<SiteContent>(getContent);
  const [firebaseActive, setFirebaseActive] = useState(false);
  const [saving, setSaving] = useState(false);
  const unsubRef = useRef<(() => void) | null>(null);

  // Firebase başlat ve dinleyici kur
  useEffect(() => {
    let cancelled = false;

    async function setup() {
      if (!isFirebaseConfigured()) return;

      const ok = initFirebase();
      if (!ok || cancelled) return;

      // İlk yükleme: Firestore'dan oku
      const remote = await fetchContent();
      if (cancelled) return;

      if (remote) {
        // Uzak veri var, onu kullan
        const merged = { ...getDefaultContent(), ...remote };
        setContent(merged);
        saveLocal(merged); // Yerel yedek
      } else {
        // Firestore boş, mevcut yerel veriyi yükle
        const local = getContent();
        await writeContent(local);
      }

      setFirebaseActive(true);

      // Gerçek zamanlı dinleyici
      const unsub = listenContent((data) => {
        if (!cancelled) {
          const merged = { ...getDefaultContent(), ...data };
          setContent(merged);
          saveLocal(merged);
        }
      });
      if (unsub) unsubRef.current = unsub;
    }

    setup();

    return () => {
      cancelled = true;
      if (unsubRef.current) unsubRef.current();
    };
  }, []);

  const updateContent = useCallback(
    async (newContent: SiteContent) => {
      setContent(newContent);
      saveLocal(newContent);

      if (firebaseActive) {
        setSaving(true);
        await writeContent(newContent);
        setSaving(false);
      }
    },
    [firebaseActive]
  );

  const resetToDefault = useCallback(async () => {
    const def = getDefaultContent();
    setContent(def);
    resetLocal();

    if (firebaseActive) {
      setSaving(true);
      await writeContent(def);
      setSaving(false);
    }
  }, [firebaseActive]);

  return (
    <ContentContext.Provider
      value={{ content, updateContent, resetToDefault, firebaseActive, saving }}
    >
      {children}
    </ContentContext.Provider>
  );
}

export function useContent() {
  const ctx = useContext(ContentContext);
  if (!ctx) throw new Error("useContent must be used within ContentProvider");
  return ctx;
}
