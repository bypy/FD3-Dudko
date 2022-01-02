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
    return this.products.reduce((previous, current) => previous + current.getScale(), 0);
  }
}
