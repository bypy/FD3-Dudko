export class Product {
  constructor(private name: string, private scale: number) {
  }

  getName(): string {
    return this.name;
  }

  getScale(): number {
    return this.scale;
  }
}