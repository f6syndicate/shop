
export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  image: string;
  sizes: string[];
  colors: string[];
}

export interface CartItem extends Product {
  selectedSize: string;
  selectedColor: string;
  quantity: number;
}

export interface Address {
  fullName: string;
  email: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  zip: string;
}

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  total: number;
  address: Address;
  status: 'Pending' | 'Paid' | 'Shipped' | 'Delivered';
}

export enum AppRoute {
  Home = '/',
  Shop = '/shop',
  Product = '/product/:id',
  Cart = '/cart',
  Checkout = '/checkout',
  OrderSuccess = '/order-success/:orderId'
}
