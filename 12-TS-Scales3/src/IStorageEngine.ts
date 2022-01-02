import { Product } from "./Product";

export default interface IStorageEngine {
  addItem(item: Product): number;

  getItem(index: number): Product;

  getCount(): number;
}
