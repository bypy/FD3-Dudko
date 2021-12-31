import IScalable from "./IScalable";

export enum Color {
  Red,
  Pink,
  Orange,
  Yellow,
  Green,
}

export class Tomato implements IScalable {

  constructor(private name: string, private scale: number, private _color?: Color) {
    this._color = _color || Color.Red;
  }

  getName(): string {
    return `томат ${this.name}`;
  }

  getScale(): number {
    return this.scale;
  }

  get color(): Color {
    return this._color;
  }
}
