import * as PIXI from "pixi.js";
import { root } from "postcss";
import { loadAssets } from "./common/assets"; // текстуры



const createScene = () => { // сцена игры
  const app = new PIXI.Application({ // инициальзируем приложение PIXI
    background: "#CCCCCC", // цвет фона
    antialias: true, // сглаживание
    width: WIDTH, // игровая область
    height: HEIGHT,
  });

  document.body.appendChild(app.view); // добавляем в body
  gameState.app = app; // добавляем в gameState || сохраняем объект приложения
  rootContainer = app.stage; // корневой контейнер приложения
  rootContainer.interactive = true; // включаем интерактивность для приложения
  rootContainer.hitArea = app.screen; // активкая область приложения


}

const initInteraction = () => { // интерактивность игры для коробля и стрельбы
  console.log("initInteraction");
}

export const initGame = () => { // инициализация игры
  loadAssets((progress) => {
    if (progress === "all") {
      createScene();// вызываем загрузку текстур
      initInteraction();
    }
  });
};