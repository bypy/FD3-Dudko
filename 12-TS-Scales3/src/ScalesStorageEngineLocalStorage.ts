import { Product } from "./Product";
import IStorageEngine from "./IStorageEngine";

type ProductType = { name: string; scale: number };

export default class ScalesStorageEngineLocalStorage implements IStorageEngine {
  constructor(
    private storage = window.localStorage,
    private dbName: string = "MyProducts",
    private confirmed: boolean = false
  ) {}

  getItem(index: number): Product {
    let items: ProductType[] = this.getStorage();
    return new Product(items[index].name, items[index].scale);
  }

  addItem(item: Product): number {
    if (!this.confirmed && this.storageExists()) {
      if (confirm("На весах уже есть продукты. Убрать?")) {
        this.clearStorage();
      }
      this.confirmed = true;
    }
    let items: ProductType[] = this.getStorage();
    let addIndex: number = items.length;
    items[addIndex] = { name: item.getName(), scale: item.getScale() };
    this.storage.setItem(this.dbName, JSON.stringify(items));
    return addIndex;
  }

  getCount(): number {
    let products: ProductType[] = this.getStorage();
    return products.length;
  }

  private storageExists(): boolean {
    return !!this.storage.getItem(this.dbName);
  }

  private getStorage(): ProductType[] {
    let sProductDb: string = this.storage.getItem(this.dbName);
    return sProductDb ? JSON.parse(sProductDb) : [];
  }

  private clearStorage(): void {
    this.storage.setItem(this.dbName, JSON.stringify([]));
  }
}
