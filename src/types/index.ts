export interface Service {
  id: string;
  title: string;
  description: string;
  price: number;
  duration: string;
}

export interface Review {
  id: string;
  name: string;
  text: string;
  rating: number;
  date: string;
}

export interface GalleryItem {
  id: string;
  beforeImage: string;
  afterImage: string;
  title: string;
}

export interface BookingFormData {
  name: string;
  phone: string;
  email: string;
  service: string;
  message: string;
}

export interface ContactInfo {
  address: string;
  phone: string;
  email: string;
  workingHours: string;
  instagram: string;
  telegram: string;
}
