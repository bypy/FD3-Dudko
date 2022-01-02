import Scales from "./Scales";
import { Product } from "./Product";
import ScalesStorageEngineLocalStorage from "./ScalesStorageEngineLocalStorage";
import ScalesStorageEngineArray from "./ScalesStorageEngineArray";

(() => {
  let localStorageScales = new Scales(
    new ScalesStorageEngineLocalStorage(window.localStorage, "Products")
  );
  let inMemoryArrayScales = new Scales(new ScalesStorageEngineArray());

  localStorageScales
    .add(new Product("Яблоко Медуница", 0.12))
    .add(new Product("Яблоко Рождественское", 0.18))
    .add(new Product("Томат Оранжевый спам", 0.2))
    .add(new Product("Томат Черри клубничный", 0.09))
    .add(new Product("Томат Медовая капля", 0.18));

  inMemoryArrayScales
    .add(new Product("Яблоко Белорусское сладкое", 0.1))
    .add(new Product("Яблоко Белый налив", 0.2))
    .add(new Product("Томат Розовый слон", 0.33))
    .add(new Product("Томат Эльдорадо", 0.25))
    .add(new Product("Томат Турецкий сверхранний", 0.21));

  console.log(
    `Список продуктов на весах localStorageScales:\n${localStorageScales
      .getNameList()
      .join("\n")}`
  );
  console?.log(
    `Суммарный вес продуктов на весах localStorageScales: ${localStorageScales.getSumScale()} кг.`
  );

  console?.log("===\n");

  console?.log(
    `Список продуктов на весах inMemoryArrayScales:\n${inMemoryArrayScales
      .getNameList()
      .join("\n")}`
  );
  console?.log(
    `Суммарный вес продуктов на весах inMemoryArrayScales: ${inMemoryArrayScales.getSumScale()} кг.`
  );
})();
