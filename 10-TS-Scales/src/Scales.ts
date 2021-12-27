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
    let productsScaleList: Array<number> = this.products.map((p) =>
      p.getScale()
    );
    return productsScaleList.reduce((previous, current) => previous + current);
  }
}
