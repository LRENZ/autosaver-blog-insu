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
