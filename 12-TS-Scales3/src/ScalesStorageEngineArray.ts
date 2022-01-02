import { Product } from "./Product";
import IStorageEngine from "./IStorageEngine";

export default class ScalesStorageEngineArray implements IStorageEngine {
  constructor(private storage: Array<Product> = []) {}

  getItem(index: number): Product {
    return this.storage[index];
  }

  addItem(item: Product): number {
    let addIndex: number = this.getCount();
    this.storage.push(item);
    return addIndex;
  }

  getCount(): number {
    return this.storage.length;
  }
}
