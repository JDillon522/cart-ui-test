export interface IProduct {
  id: number;
  name: string;
  price: number;
}

export interface IGetProductsResponse {
  success: boolean;
  products: IProduct[];
}
