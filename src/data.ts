import { WeddingEvent, GalleryItem, InfoCard } from './types';

export const BRIDE_NAME = "Meenakshi";
export const GROOM_NAME = "Karthik";
export const WEDDING_DATE = "2026-08-16T06:00:00"; // Muhurtham Date
export const WHATSAPP_PHONE = "919876543210"; // Example contact number

export const WEDDING_EVENTS: WeddingEvent[] = [
  {
    id: "mehendi",
    title: "Mehendi Ceremony",
    date: "August 14, 2026",
    time: "4:00 PM Onwards",
    venue: "The Heritage Pavilion, ECR, Chennai",
    description: "An afternoon of intricate henna, laughter, and high spirits alongside traditional dhol beats and South Indian street style snacks.",
    image: "/src/assets/images/mehendi_ceremony_1780298303200.png",
    mapsUrl: "https://maps.google.com/?q=The+Heritage+Pavilion+ECR+Chennai"
  },
  {
    id: "haldi",
    title: "Haldi Celebration",
    date: "August 15, 2026",
    time: "9:00 AM onwards",
    venue: "Amethyst Court Gardens, Nungambakkam, Chennai",
    description: "Shades of turmeric and gold. Join us for a delightful morning of marigolds, holy bathing, and high-energy pre-wedding fun.",
    image: "/src/assets/images/haldi_ceremony_1780298359091.png",
    mapsUrl: "https://maps.google.com/?q=Amethyst+Nungambakkam+Chennai"
  },
  {
    id: "sangeet",
    title: "Glittering Sangeet",
    date: "August 15, 2026",
    time: "7:00 PM Onwards",
    venue: "The Grand Ballroom, ITC Grand Chola, Chennai",
    description: "An evening filled with foot-tapping family dance performances, fusion music, and a majestic royal banquet.",
    image: "/src/assets/images/sangeet_ceremony_1780298379930.png",
    mapsUrl: "https://maps.google.com/?q=ITC+Grand+Chola+Chennai"
  },
  {
    id: "muhurtham",
    title: "Wedding Muhurtham",
    date: "August 16, 2026",
    time: "6:00 AM - 7:30 AM (Kalyanam)",
    venue: "Santhome Royal Mandapam, Santhome High Road, Chennai",
    description: "The sacred traditional South Indian knot-tying ceremony: Kanyadaanam and Mangalya Dharanam amidst sacred Vedic hymns and divine Nadaswaram.",
    image: "/src/assets/images/wedding_mandap_1780298320844.png",
    mapsUrl: "https://maps.google.com/?q=Santhome+Mandapam+Chennai"
  },
  {
    id: "reception",
    title: "Grand Reception",
    date: "August 16, 2026",
    time: "6:30 PM Onwards",
    venue: "The Imperial Ballroom, Leela Palace, Chennai",
    description: "Celebrate our first evening as husband and wife. An elegant gathering with a live musical orchestra, champagne toasts, and heavy dinner.",
    image: "/src/assets/images/reception_venue_1780298339761.png",
    mapsUrl: "https://maps.google.com/?q=The+Leela+Palace+Chennai"
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "gal-1",
    title: "The Radiant Bride",
    category: "bride",
    image: "/src/assets/images/bride_portrait_1780298271012.png"
  },
  {
    id: "gal-2",
    title: "The Royal Groom",
    category: "groom",
    image: "/src/assets/images/groom_portrait_1780298287193.png"
  },
  {
    id: "gal-3",
    title: "Intricate Henna Details",
    category: "ceremonies",
    image: "/src/assets/images/mehendi_ceremony_1780298303200.png"
  },
  {
    id: "gal-4",
    title: "Auspicious Haldi Vows",
    category: "ceremonies",
    image: "/src/assets/images/haldi_ceremony_1780298359091.png"
  },
  {
    id: "gal-5",
    title: "Sacred Holy Fire Mandap",
    category: "ceremonies",
    image: "/src/assets/images/wedding_mandap_1780298320844.png"
  },
  {
    id: "gal-6",
    title: "Leela Palace Grand Setup",
    category: "ceremonies",
    image: "/src/assets/images/reception_venue_1780298339761.png"
  },
  {
    id: "gal-7",
    title: "Golden Hour Glow",
    category: "portraits",
    image: "/src/assets/images/bride_portrait_1780298271012.png"
  },
  {
    id: "gal-8",
    title: "Groom in Classic Turban",
    category: "portraits",
    image: "/src/assets/images/groom_portrait_1780298287193.png"
  },
  {
    id: "gal-9",
    title: "Rhythm of Sangeet Strings",
    category: "ceremonies",
    image: "/src/assets/images/sangeet_ceremony_1780298379930.png"
  }
];

export const INFO_CARDS: InfoCard[] = [
  {
    id: "dress-code",
    iconName: "Shirt",
    title: "Dress Code",
    detail: "Muhurtham: Traditional Kanjeevaram Sarees & Veshtis.",
    subDetail: "Sangeet & Reception: Indo-Western luxury, Sherwanis, and Evening Gowns.",
    colorScheme: "from-amber-500/20 to-yellow-600/10"
  },
  {
    id: "hashtag",
    iconName: "Hash",
    title: "Wedding Hashtag",
    detail: "#KarthikGetsMeenâ",
    subDetail: "Use this tag for all your beautiful social uploads and memories!",
    colorScheme: "from-rose-500/20 to-amber-500/10"
  },
  {
    id: "parking",
    iconName: "Car",
    title: "Valet Parking",
    detail: "Complimentary valet parking is arranged for all guests at both Santhome Mandapam and Leela Palace.",
    subDetail: "Please look for the Valet Assist counters at the main entrance.",
    colorScheme: "from-emerald-500/20 to-teal-600/10"
  },
  {
    id: "accommodation",
    iconName: "Hotel",
    title: "Accommodation",
    detail: "Luxury stays are reserved at the Leela Palace & ITC Grand Chola for outstation guests.",
    subDetail: "Contact Hospitality Desk: +91 98765 43211 for any check-in assistance.",
    colorScheme: "from-blue-500/20 to-indigo-600/10"
  }
];

export const BRIDAL_BIO = "Meenakshi, an expert in temple architecture and a passionate Bharatanatyam dancer, hails from a traditional family in Madurai. Her grace is matched only by her love for South Indian music, culture, and filters of strong degree coffee.";

export const GROOM_BIO = "Karthik, a creative design partner based in London with roots in Mysore, is a cinematic enthusiast, a travel storyteller, and a foodie. His modern global canvas is beautifully anchored by classical Indian values.";
