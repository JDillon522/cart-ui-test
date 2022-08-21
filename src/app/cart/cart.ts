import { IProduct } from '../catalog/catalog';

export interface ICartProduct extends IProduct {
  quantity: number;
}

export interface ICart {
  products: ICartProduct[],
  success: boolean,
  totalCost: number;
}
