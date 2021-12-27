import Scales from "./Scales";
import { Apple } from "./Apple";
import { Color, Tomato } from "./Tomato";

(() => {
  const scales = new Scales();
  scales
    .add(new Apple("Медуница", 0.12, true))
    .add(new Apple("Рождественское", 0.18, true))
    .add(new Apple("Белорусское сладкое", 0.1, true))
    .add(new Apple("Белый налив", 0.2, false))
    .add(new Tomato("Оранжевый спам", 0.2, Color.Orange))
    .add(new Tomato("Черри клубничный", 0.09, Color.Red))
    .add(new Tomato("Медовая капля", 0.18, Color.Yellow))
    .add(new Tomato("Розовый слон", 0.33, Color.Pink))
    .add(new Tomato("Эльдорадо", 0.25, Color.Yellow))
    .add(new Tomato("Турецкий сверхранний", 0.21));

  console?.log(
    `Список продуктов на весах:\n${scales.getNameList().join("\n")}`
  );
  console?.log(`Суммарный вес продуктов: ${scales.getSumScale()} кг.`);
})();
