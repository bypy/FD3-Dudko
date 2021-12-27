export class Product {
  name: string;

  scale: number;

  constructor(_name: string, _scale: number) {
    this.name = _name;
    this.scale = _scale;
  }

  getName(): string {
    return this.name;
  }

  getScale(): number {
    return this.scale;
  }
}