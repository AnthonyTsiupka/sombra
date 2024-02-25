export interface Product {
  id: string;
  name: string;
  type: 'TVs' | 'Appliances' | 'Phones' | 'Video Games';
  price: number;
  rating: number;
  description: string;
  reviews: Review[];
}

export interface Review {
  id: string;
  user: string;
  comment: string;
  rating: number;
}
