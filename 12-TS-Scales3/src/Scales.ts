import IStorageEngine from "./IStorageEngine";
import { Product } from "./Product";

export default class Scales<StorageEngine extends IStorageEngine> {
  constructor(
    private storage: StorageEngine,
    private logNewProductAddOperation = false
  ) {}

  add(product: Product): Scales<StorageEngine> {
    let itemIndex = this.storage.addItem(product);
    this.logNewProductAddOperation &&
      console.log(
        `Продукт ${product.getName()} добавлен в хранилище ${
          this.storage.constructor.toString().match(/\w+/g)[1]
        } с ключом=${itemIndex}`
      );
    return this;
  }

  getNameList(): Array<string> {
    let products: Product[] = this.getScaleItems();
    return products.map((p) => p.getName());
  }

  getSumScale(): number {
    let products: Product[] = this.getScaleItems();
    let productsScaleList: Array<number> = products.map((p) => p.getScale());
    return productsScaleList.reduce((previous, current) => previous + current);
  }

  private getScaleItems(): Product[] {
    let products: Array<Product> = [];
    for (let i = 0; i < this.storage.getCount(); i++) {
      products.push(this.storage.getItem(i));
    }
    return products;
  }
}
