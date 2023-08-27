export interface ProductInterface {
  id: number;
  img: string;
  title: string;
  price: number;
  discount?: {
    newPrice: number;
  };
}
