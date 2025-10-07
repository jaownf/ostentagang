// Tipos para produtos
export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  rating: number;
  reviews: number;
  isNew: boolean;
  discount?: number;
  description: string;
  sizes: string[];
  colors: string[];
}

// Tipos para categorias
export interface Category {
  id: string;
  name: string;
  count: number;
}

// Tipos para coleções
export interface Collection {
  id: number;
  name: string;
  description: string;
  image: string;
  itemCount: number;
}

// Tipos para depoimentos
export interface Testimonial {
  id: number;
  name: string;
  avatar: string;
  rating: number;
  comment: string;
  product: string;
}

// Tipos para itens do carrinho
export interface CartItem extends Product {
  quantity: number;
}

// Tipos para páginas
export type Page = 'home' | 'produtos' | 'sobre' | 'contato';

// Tipos para ordenação
export type SortOption = 'relevancia' | 'preco-asc' | 'preco-desc' | 'popularidade';

// Tipos para tema
export type Theme = 'light' | 'dark';
