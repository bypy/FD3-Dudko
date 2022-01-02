import { Product } from "./Product";
import IStorageEngine from "./IStorageEngine";

export default class ScalesStorageEngineLocalStorage implements IStorageEngine {
  constructor(
    private storage = window.localStorage,
    private dbName: string = "MyProducts",
    private dbConflict: boolean = false
  ) {
    if (this.storageExists()) {
      this.dbConflict = true;
    }
  }

  getItem(index: number): Product {
    let items: Array<any> = this.getStorageItems();
    return new Product(items[index].name, items[index].scale);
  }

  addItem(item: Product): number {
    if (this.dbConflict) {
      if (confirm("На весах уже есть продукты. Убрать?")) {
        this.clearStorage();
      }
      this.dbConflict = false;
    }
    let items: Array<any> = this.getStorageItems();
    let addIndex: number = items.length;
    items.push({ name: item.getName(), scale: item.getScale() });
    this.storage.setItem(this.dbName, JSON.stringify(items));
    return addIndex;
  }

  getCount(): number {
    let products: Array<any> = this.getStorageItems();
    return products.length;
  }

  private storageExists(): boolean {
    return !!this.storage.getItem(this.dbName);
  }

  private getStorageItems(): Array<any> {
    let serializedItems: string = this.storage.getItem(this.dbName);
    return serializedItems ? JSON.parse(serializedItems) : [];
  }

  private clearStorage(): void {
    this.storage.setItem(this.dbName, JSON.stringify([]));
  }
}
