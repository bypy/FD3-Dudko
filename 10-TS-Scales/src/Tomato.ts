import { Product } from "./Product";

export enum Color {
  Red,
  Pink,
  Orange,
  Yellow,
  Green,
}

export class Tomato extends Product {
  color: Color;

  constructor(_name: string, _scale: number, _color?: Color) {
    super(`томат ${_name}`, _scale);
    this.color = _color ? _color : Color.Red;
  }
}
