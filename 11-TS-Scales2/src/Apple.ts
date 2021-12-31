import IScalable from "./IScalable";

export class Apple implements IScalable {
  private readonly name;

  constructor(
    _name: string,
    private scale: number,
    private _isSweetKind: boolean
  ) {
    this.name = `яблоко ${_name}`;
  }

  getName(): string {
    return this.name;
  }

  getScale(): number {
    return this.scale;
  }

  get isSweetKind(): boolean {
    return this._isSweetKind;
  }
}
