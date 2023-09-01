export interface ProductInterface {
  id: number;
  img: string;
  title: string;
  price: string;
  discount?: {
    newPrice: string;
  };
  category: string;
  description: string;
}
