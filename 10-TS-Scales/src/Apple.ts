import { Product } from "./Product";

export class Apple extends Product {
  isSweetKind: boolean;

  constructor(_name: string, _scale: number, _isSweetKind: boolean) {
    super(`яблоко ${_name}`, _scale);
    this.isSweetKind = _isSweetKind;
  }
}