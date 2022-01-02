import { Product } from "./Product";

export default class Scales {
  products: Array<Product>;

  constructor() {
    this.products = [];
  }

  add(product: Product): Scales {
    this.products.push(product);
    return this;
  }

  getNameList(): Array<string> {
    return this.products.map((p) => p.getName());
  }

  getSumScale(): number {
    return this.products.reduce((previous, current) => previous + current.getScale(), 0);
  }
}
