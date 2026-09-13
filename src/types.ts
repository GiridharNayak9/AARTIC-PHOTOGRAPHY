export type PhotoCategory = 'all' | 'fashion' | 'editorial' | 'architecture' | 'fine-art' | 'monochrome';

export interface PhotoItem {
  id: string;
  title: string;
  category: 'fashion' | 'editorial' | 'architecture' | 'fine-art' | 'monochrome';
  series: string;
  image: string;
  aspectRatio: 'portrait' | 'landscape' | 'square';
  year: string;
  camera: string;
  lens: string;
  shutter: string;
  aperture: string;
  iso: string;
  location: string;
  featuredQuote?: string;
  client?: string;
  exhibition?: string;
}

export interface CameraStudioSettings {
  model: 'hasselblad' | 'leica' | 'cinematic';
  aperture: number;
  focalLength: number;
  iso: number;
  lightingIntensity: number;
  autoRotate: boolean;
}

export interface BookingFormData {
  fullName: string;
  email: string;
  serviceCategory: string;
  shootLocation: string;
  estimatedDate: string;
  projectVision: string;
}
