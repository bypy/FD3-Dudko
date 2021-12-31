import IScalable from "./IScalable";

export default class Scales<t extends IScalable> {
  constructor(private products: Array<t> = []) {}

  add(product: t): Scales<t> {
    this.products.push(product);
    return this;
  }

  getNameList(): Array<string> {
    return this.products.map((p) => p.getName());
  }

  getSumScale(): number {
    let productsScaleList: Array<number> = this.products.map((p) => p.getScale());
    return productsScaleList.reduce((previous, current) => previous + current);
  }
}
