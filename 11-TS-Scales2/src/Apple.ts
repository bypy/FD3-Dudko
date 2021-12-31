import IScalable from "./IScalable";

export class Apple implements IScalable {
  constructor(
    private name: string,
    private scale: number,
    private _isSweetKind: boolean
  ) {}

  getName(): string {
    return `яблоко ${this.name}`;
  }

  getScale(): number {
    return this.scale;
  }

  get isSweetKind(): boolean {
    return this._isSweetKind;
  }
}
