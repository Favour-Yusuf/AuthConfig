import { IProduct } from "./products.interface";

export interface IShop {
  name: string;
  address: string;
  products: IProduct;
}
