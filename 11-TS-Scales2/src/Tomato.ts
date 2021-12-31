import IScalable from "./IScalable";

export enum Color {
  Red,
  Pink,
  Orange,
  Yellow,
  Green,
}

export class Tomato implements IScalable {
  private readonly name: string;

  constructor(_name: string, private scale: number, private readonly _color?: Color) {
    this.name = `томат ${_name}`;
    this._color = _color || Color.Red;
  }

  getName(): string {
    return this.name;
  }

  getScale(): number {
    return this.scale;
  }

  get color(): Color {
    return this._color;
  }
}
