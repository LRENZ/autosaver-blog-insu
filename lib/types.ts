export interface Post {
  id: string;
  title: string;
  slug: string;
  category: 'Savings' | 'Guides' | 'Location';
  coverImage: string;
  excerpt: string;
  body: string;
  metaTitle: string;
  metaDescription: string;
  status: 'published' | 'draft';
  createdAt: Date;
  updatedAt: Date;
}

export interface Location {
  id: string;
  name: string;
  slug: string;
  state: string;
  description: string;
  averageRate: string;
}

export interface Popup {
  id: string;
  name: string;
  title: string;
  content: string;
  imageUrl: string;
  ctaText: string;
  ctaUrl: string;
  triggerType: 'onload' | 'exit' | 'scroll' | 'time';
  triggerValue: number;
  displayPages: string;
  status: 'active' | 'inactive';
  createdAt: Date;
  updatedAt: Date;
}
