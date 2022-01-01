import IScalable from "./IScalable";

export default class Scales {
  constructor(private products: Array<IScalable> = []) {}

  add(product: IScalable): Scales {
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
