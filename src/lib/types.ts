export type CategorySlug = string;

export interface Category {
  slug: string;
  name: string;
  parent?: string;
  description?: string;
  icon?: string;
}

export interface Brand {
  slug: string;
  name: string;
  country: string;
  description: string;
}

export type ProductKind =
  | "helmet"
  | "boots"
  | "breeches"
  | "jacket"
  | "gloves"
  | "vest"
  | "saddle"
  | "bridle"
  | "halter"
  | "blanket"
  | "boot"
  | "saddlepad"
  | "brush"
  | "feed"
  | "supplement"
  | "haynet"
  | "bucket"
  | "toy"
  | "fence"
  | "hobbyhorse"
  | "dog";

export interface Product {
  id: string;
  slug: string;
  name: string;
  brand: string;
  category: string;
  kind: ProductKind;
  price: number;
  oldPrice?: number;
  description: string;
  features: string[];
  sizes?: string[];
  colors: { name: string; hex: string }[];
  stock: number;
  ships24h: boolean;
  isNew?: boolean;
  isBestseller?: boolean;
  rating: number;
  reviews: number;
  sku: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  readingTime: number;
  content: string[];
}

export interface CartItem {
  productId: string;
  size?: string;
  color: string;
  quantity: number;
}
