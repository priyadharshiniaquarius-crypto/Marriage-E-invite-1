export interface WeddingEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  venue: string;
  description: string;
  image: string;
  mapsUrl: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'all' | 'ceremonies' | 'groom' | 'bride' | 'portraits';
  image: string;
}

export interface InfoCard {
  id: string;
  iconName: string;
  title: string;
  detail: string;
  subDetail?: string;
  colorScheme: string;
}

export interface RSVPResponse {
  name: string;
  email: string;
  phone: string;
  attending: 'yes' | 'no';
  guests: number;
  events: string[];
  message?: string;
  dietary?: string;
}
