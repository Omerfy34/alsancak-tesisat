export interface ServiceItem {
  id: string;
  icon: string;
  title: string;
  description: string;
  features: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  text: string;
  rating: number;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
}

export interface GalleryImage {
  id: string;
  url: string;
  caption: string;
}

export interface SiteContent {
  brand: {
    name: string;
    tagline: string;
    description: string;
    logoUrl: string;
  };
  contact: {
    phone: string;
    phoneDisplay: string;
    email: string;
    address: string;
    district: string;
    city: string;
    workingHours: string;
    workingDays: string;
    mapEmbedUrl: string;
  };
  social: {
    instagram: string;
    facebook: string;
    whatsapp: string;
  };
  hero: {
    title: string;
    subtitle: string;
    cta: string;
    secondaryCta: string;
    badges: string[];
  };
  about: {
    title: string;
    subtitle: string;
    description: string;
    paragraphs: string[];
    stats: { value: string; label: string }[];
  };
  services: ServiceItem[];
  whyUs: {
    title: string;
    subtitle: string;
    reasons: { icon: string; title: string; text: string }[];
  };
  testimonials: Testimonial[];
  faq: FAQ[];
  gallery: GalleryImage[];
  cta: {
    title: string;
    subtitle: string;
    buttonText: string;
  };
  footer: {
    copyright: string;
    links: { label: string; href: string }[];
  };
}

const defaultContent: SiteContent = {
  brand: {
    name: "Alsancak Tesisat",
    tagline: "Güvenilir Tesisat Çözümleri",
    description:
      "İzmir Alsancak ve çevresinde 15 yılı aşkın tecrübemizle profesyonel tesisat hizmetleri sunuyoruz.",
    logoUrl: "https://i.imgur.com/n8iJdSJ.png",
  },

  contact: {
    phone: "tel:+905001234567",
    phoneDisplay: "0500 123 45 67",
    email: "info@alsancaktesisat.com",
    address: "Kıbrıs Şehitleri Cad. No:42/A",
    district: "Alsancak",
    city: "İzmir",
    workingHours: "08:00 - 22:00",
    workingDays: "Pazartesi - Pazar (7/24 Acil)",
    mapEmbedUrl: "",
  },

  social: {
    instagram: "https://instagram.com/alsancaktesisat",
    facebook: "https://facebook.com/alsancaktesisat",
    whatsapp: "https://wa.me/905001234567",
  },

  hero: {
    title: "Profesyonel Tesisat Hizmetleri",
    subtitle:
      "İzmir Alsancak ve çevresinde 15 yıllık deneyimimizle su tesisatı, doğalgaz, tıkanıklık açma ve tadilat işlerinizde yanınızdayız. Hızlı, güvenilir ve uygun fiyatlı çözümler.",
    cta: "Hemen Ara",
    secondaryCta: "Hizmetlerimiz",
    badges: ["7/24 Acil Servis", "Ücretsiz Keşif", "Garantili İşçilik"],
  },

  about: {
    title: "Hakkımızda",
    subtitle: "Tecrübe ve güvenin adresi",
    description:
      "Alsancak Tesisat olarak 2009 yılından bu yana İzmir'in Alsancak semtinde hizmet vermekteyiz.",
    paragraphs: [
      "Kuruluşumuzdan bu yana binlerce ev ve iş yerine profesyonel tesisat hizmeti sunduk. Deneyimli ekibimiz, en son teknoloji ekipmanlarla donatılmış araçlarımızla İzmir'in her noktasına hızla ulaşıyoruz.",
      "Müşteri memnuniyetini her zaman ön planda tutarak, kaliteli malzeme kullanımı ve garantili işçilik anlayışımızla sektörde fark yaratıyoruz. Acil durumlarınızda 7/24 yanınızdayız.",
    ],
    stats: [
      { value: "15+", label: "Yıllık Deneyim" },
      { value: "5.000+", label: "Mutlu Müşteri" },
      { value: "7/24", label: "Acil Servis" },
      { value: "%100", label: "Müşteri Memnuniyeti" },
    ],
  },

  services: [
    {
      id: "su-tesisati",
      icon: "droplets",
      title: "Su Tesisatı",
      description:
        "Temiz su ve pis su tesisatı montaj, bakım ve onarım hizmetleri.",
      features: [
        "Boru döşeme ve değiştirme",
        "Su kaçağı tespiti ve tamiri",
        "Armatür montajı",
        "Şofben ve termosifon bağlantısı",
      ],
    },
    {
      id: "tikaniklik",
      icon: "wrench",
      title: "Tıkanıklık Açma",
      description:
        "Her türlü tıkanıklık sorununa hızlı ve kalıcı çözümler üretiyoruz.",
      features: [
        "Lavabo tıkanıklığı",
        "Tuvalet tıkanıklığı",
        "Kanal temizliği",
        "Rögar açma ve temizleme",
      ],
    },
    {
      id: "dogalgaz",
      icon: "flame",
      title: "Doğalgaz Tesisatı",
      description:
        "Lisanslı ekibimizle güvenli doğalgaz tesisatı kurulum ve bakımı.",
      features: [
        "Yeni tesisat döşeme",
        "Kombi montajı ve bakımı",
        "Gaz kaçak kontrolü",
        "Proje ve onay işlemleri",
      ],
    },
    {
      id: "banyo-tadilat",
      icon: "bath",
      title: "Banyo Tadilat",
      description:
        "Banyo ve mutfak tadilat projelerinizi anahtar teslim gerçekleştiriyoruz.",
      features: [
        "Komple banyo yenileme",
        "Duşakabin montajı",
        "Fayans ve seramik döşeme",
        "Küvet ve lavabo değişimi",
      ],
    },
    {
      id: "petek-temizligi",
      icon: "thermometer",
      title: "Petek Temizliği",
      description:
        "Kış öncesi petek temizliği ile ısınma verimliliğinizi artırıyoruz.",
      features: [
        "Kimyasal petek temizleme",
        "Petek söküm ve montaj",
        "Kalorifer tesisatı bakım",
        "Kombi petek bağlantısı",
      ],
    },
    {
      id: "sizinti-tespit",
      icon: "search",
      title: "Sızıntı Tespiti",
      description:
        "Son teknoloji cihazlarla kırıp dökmeden su kaçağı noktasını buluyoruz.",
      features: [
        "Kameralı boru inceleme",
        "Termal kamera tespiti",
        "Akustik dinleme",
        "Basınç testi",
      ],
    },
  ],

  whyUs: {
    title: "Neden Biz?",
    subtitle: "Alsancak Tesisat'ı tercih etmeniz için birçok neden var",
    reasons: [
      {
        icon: "clock",
        title: "Hızlı Müdahale",
        text: "Acil çağrılarınıza en geç 30 dakika içinde ekibimizi yönlendiriyoruz.",
      },
      {
        icon: "shield",
        title: "Garantili İşçilik",
        text: "Tüm işlerimize 2 yıl garanti veriyoruz. Sorun yaşarsanız ücretsiz onarım.",
      },
      {
        icon: "banknote",
        title: "Uygun Fiyat",
        text: "Piyasanın en uygun fiyatlarıyla kaliteli hizmet sunuyoruz. Keşif ücretsiz.",
      },
      {
        icon: "award",
        title: "Uzman Kadro",
        text: "Sertifikalı ve deneyimli ustalarımız her işin hakkını veriyor.",
      },
      {
        icon: "thumbsUp",
        title: "Temiz Çalışma",
        text: "İş bitiminde alanı tertemiz bırakıyoruz. Hijyen bizim için önemli.",
      },
      {
        icon: "headphones",
        title: "7/24 Destek",
        text: "Gece gündüz fark etmez, her an bize ulaşabilirsiniz.",
      },
    ],
  },

  testimonials: [
    {
      id: "t1",
      name: "Mehmet Yılmaz",
      location: "Alsancak",
      text: "Gece yarısı su borusu patladı, 20 dakikada geldiler. Çok profesyonel ve hızlı bir şekilde sorunu çözdüler. Fiyat da gayet makuldü. Teşekkürler Alsancak Tesisat!",
      rating: 5,
    },
    {
      id: "t2",
      name: "Ayşe Kaya",
      location: "Kordon",
      text: "Banyo tadilatımızı yaptırdık, sonuç beklentimizin çok üzerinde oldu. Zamanında teslim ettiler ve çok temiz çalıştılar. Kesinlikle tavsiye ediyorum.",
      rating: 5,
    },
    {
      id: "t3",
      name: "Ali Demir",
      location: "Konak",
      text: "Kombi bakımı ve petek temizliği yaptırdık. Gayet ilgili ve bilgili ustalar. Fiyat konusunda da dürüst davrandılar. Bir sonraki sefere de onları arayacağım.",
      rating: 5,
    },
    {
      id: "t4",
      name: "Fatma Özkan",
      location: "Karşıyaka",
      text: "Mutfak lavabosu tıkanmıştı, kısa sürede gelip hallettiler. Üstelik tıkanıklığın sebebini de açıkladılar ve önlem almamız için tavsiyelerde bulundular.",
      rating: 4,
    },
  ],

  faq: [
    {
      id: "f1",
      question: "Acil durumlarda ne kadar sürede gelirsiniz?",
      answer:
        "İzmir Alsancak ve yakın çevresinde acil çağrılara en geç 30 dakika içinde ekibimizi yönlendiriyoruz. Diğer bölgelerde ise ortalama 45-60 dakika içinde müdahale ediyoruz.",
    },
    {
      id: "f2",
      question: "Keşif ücreti alıyor musunuz?",
      answer:
        "Hayır, İzmir merkez ve yakın ilçelerde keşif hizmetimiz tamamen ücretsizdir. Sorununuzu yerinde görüp size en uygun ve ekonomik çözümü sunuyoruz.",
    },
    {
      id: "f3",
      question: "Garanti süresi ne kadardır?",
      answer:
        "Yaptığımız tüm işlere 2 yıl garanti veriyoruz. Garanti kapsamında herhangi bir sorun yaşarsanız ücretsiz onarım sağlıyoruz.",
    },
    {
      id: "f4",
      question: "Hafta sonu ve tatil günlerinde çalışıyor musunuz?",
      answer:
        "Evet, 7 gün 24 saat hizmet veriyoruz. Hafta sonu ve resmi tatillerde de acil çağrılarınıza yanıt veriyoruz.",
    },
    {
      id: "f5",
      question: "Ödeme seçenekleriniz nelerdir?",
      answer:
        "Nakit, kredi kartı ve havale/EFT ile ödeme kabul ediyoruz. Büyük projelerde taksit imkânı da sunmaktayız.",
    },
  ],

  gallery: [
    {
      id: "g1",
      url: "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=600&h=400&fit=crop",
      caption: "Banyo Tadilat Projesi",
    },
    {
      id: "g2",
      url: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=600&h=400&fit=crop",
      caption: "Su Tesisatı Montajı",
    },
    {
      id: "g3",
      url: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=600&h=400&fit=crop",
      caption: "Petek Temizliği",
    },
    {
      id: "g4",
      url: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=600&h=400&fit=crop",
      caption: "Doğalgaz Tesisatı",
    },
    {
      id: "g5",
      url: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&h=400&fit=crop",
      caption: "Tıkanıklık Açma",
    },
    {
      id: "g6",
      url: "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=600&h=400&fit=crop",
      caption: "Sızıntı Tespiti",
    },
  ],

  cta: {
    title: "Tesisat Sorununuz mu Var?",
    subtitle:
      "Hemen arayın, en kısa sürede kapınızda olalım. Ücretsiz keşif ve uygun fiyat garantisi ile hizmetinizdeyiz.",
    buttonText: "0500 123 45 67",
  },

  footer: {
    copyright: `© ${new Date().getFullYear()} Alsancak Tesisat. Tüm hakları saklıdır.`,
    links: [
      { label: "Ana Sayfa", href: "#hero" },
      { label: "Hizmetler", href: "#hizmetler" },
      { label: "Hakkımızda", href: "#hakkimizda" },
      { label: "İletişim", href: "#iletisim" },
    ],
  },
};

const STORAGE_KEY = "alsancak_tesisat_content";

export function getContent(): SiteContent {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored) as SiteContent;
      // Merge with defaults for new fields
      return {
        ...defaultContent,
        ...parsed,
        brand: { ...defaultContent.brand, ...parsed.brand },
        gallery: parsed.gallery || defaultContent.gallery,
      };
    }
  } catch {
    // fallback
  }
  return defaultContent;
}

export function saveContent(content: SiteContent): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(content));
}

export function resetContent(): void {
  localStorage.removeItem(STORAGE_KEY);
}

export function getDefaultContent(): SiteContent {
  return JSON.parse(JSON.stringify(defaultContent));
}

export default defaultContent;
