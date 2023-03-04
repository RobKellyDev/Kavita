export type Product = {
  _id: string;
  title: string;
  price: number;
  description: string;
  quantity: number;
  category: {
    _id: string;
    name: string;
    image: string;
  };
  images: string[];
};
