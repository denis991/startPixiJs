import * as PIXI from "pixi.js";
import { root } from "postcss";
import { loadAssets } from "./common/assets"; // текстуры
import appConstants from "./common/constants"; // константы
import { addPlayer, getPlayer, playerShoots, playerTick } from "./sprites/player"; // игрок и его состояния
import { grenadesTick, cleargrenades, destroyGrenade, initGrenades } from "./sprites/grenades";
import { initInfo } from "./sprites/infoPanel";// информационная панель

// локальные переменные
const HEIGHT = appConstants.size.HEIGHT;
const WIDTH = appConstants.size.WIDTH;
const gameState = { // состояние игры
  stopped: false
};
let rootContainer;

const createScene = () => { // сцена игры
  const app = new PIXI.Application({ // инициальзируем приложение PIXI
    background: "#CCCCCC", // цвет фона
    antialias: true, // сглаживание
    width: WIDTH, // игровая область
    height: HEIGHT,
    resolution: window.devicePixelRatio || 1, // плотность пикселей
  });

  document.body.appendChild(app.view); /// Добавление сцены в HTML-документ
  gameState.app = app; // добавляем в gameState || сохраняем объект приложения
  rootContainer = app.stage; // корневой контейнер приложения
  rootContainer.eventMode = true; // включаем интерактивность для приложения
  rootContainer.hitArea = app.screen; // активкая область приложения

  initInfo(app, rootContainer); // инициализация информационной панели

  const player = addPlayer(app, rootContainer); // создаём игрока , передаём корневой контейнер его положение
  rootContainer.addChild(player); // player добавляем в корневой контейнер игры // Добавление спрайта на сцену
  // app.stage.addChild(player);
}

const initInteraction = () => { // интерактивность игры для пользователя
  console.log("initInteraction");
  gameState.mousePosition = getPlayer().position.x; //инициализирум  позиция игрок , и потом получаем позицию мышки

  gameState.app.stage.addEventListener("pointermove", (e) => { // обработчик событий для обработки курсора мышки
    gameState.mousePosition = e.global.x; // сохраняем позицию мышки в gameState
  });

  document.addEventListener("keydown", (e) => { // обработчик событий для обработки клавиатуры
    if (e.code === "Space") {
      playerShoots(); // стрельба
    }
  });

  gameState.app.ticker.add((delta) => { // глобальный цикл обработки цикла состояния игры
    playerTick(gameState); // пользователь
    grenadesTick(); // гранаты

  });
};

export const initGame = () => { // инициализация игры
  loadAssets((progress) => {
    console.log('progress: ', progress);
    if (progress === "all") {
      createScene();// вызываем загрузку текстур
      initInteraction();
    }
  });
};