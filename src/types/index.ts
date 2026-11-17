export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  category: string;
  description: string;
  imageUrl: string;
  isBestseller?: boolean;
  size?: 'Small' | 'Medium' | 'Large' | 'Extra Large';
  includes?: string[];
}

export interface Testimonial {
  id: string;
  customerName: string;
  rating: number;
  comment: string;
  photoUrl: string;
  event: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}
