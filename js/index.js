// import * as PIXI from './pixi.mjs';
import * as PIXI from './pixi-legacy.js';
import { BlurFilter, Container, Graphics, Sprite } from './pixi-legacy.mjs';
let type = 'WebGL';
console.log(PIXI);

// let type = 'WebGL';
// if (!PIXI.utils.isWebGLSupported()) {
//   type = 'canvas';
// }
// // const app = new PIXI.Application({
// // 	view: document.getElementById('canvas'),
// //   background: '#1099bb'
// // });
// const app = new PIXI.Application({ background: '#1099bb' });
// document.body.appendChild(app.view);

// // create a new Sprite from an image path
// const bunny = PIXI.Sprite.from('examples/assets/bunny.png');

// // center the sprite's anchor point
// bunny.anchor.set(0.5);

// // move the sprite to the center of the screen
// bunny.x = app.screen.width / 2;
// bunny.y = app.screen.height / 2;

// app.stage.addChild(bunny);

// // Listen for animate update
// app.ticker.add((delta) => {
//   // just for fun, let's rotate mr rabbit a little
//   // delta is 1 if running at 100% performance
//   // creates frame-independent transformation
//   bunny.rotation += 0.1 * delta;
// });



const app = new PIXI.Application({ background: '#1099bb' });
document.body.appendChild(app.view);

const container = new PIXI.Container();

app.stage.addChild(container);

// Create a new texture
const texture = PIXI.Texture.from('examples/assets/bunny.png');

// Create a 5x5 grid of bunnies
for (let i = 0; i < 25; i++) {
    const bunny = new PIXI.Sprite(texture);
    bunny.anchor.set(0.5);
    bunny.x = (i % 5) * 40;
    bunny.y = Math.floor(i / 5) * 40;
    container.addChild(bunny);
}

// Move container to the center
container.x = app.screen.width / 2;
container.y = app.screen.height / 2;

// Center bunny sprite in local container coordinates
container.pivot.x = container.width / 2;
container.pivot.y = container.height / 2;

// Listen for animate update
app.ticker.add((delta) => {
    // rotate the container!
    // use delta to create frame-independent transform
    container.rotation -= 0.01 * delta;
});

/****** */
// пример наследования
// import { User, Admin } from './prototypes.js';
// import { getPrototypeChain } from './getPrototypeChain.js';

// // Create the application
// const app = new PIXI.Application({
// 	view: document.getElementById('canvas'),
// });

// console.log(getPrototypeChain(app.view).join(' => '));

// console.log(getPrototypeChain(new User()).join(' => '));

// console.log(getPrototypeChain(new Admin()).join(' => '));
/*
* порядок отрисовки
*
1.  PIXI.Application.
2. app.view(<canvas>) - экземпляр convas 2d или webgl элемента в котором будет отрисовываться сцена
3. Loader - асинхронно загружать ресурсы (изображения или аудио файлы) и создавать спрайты можно его не использовать если мы используем графику
4. app.stage(PIXI.Container) - корневой контейнер для всех элементов
5. app.ticker- отрисовывает сцену на экране из app.stage (каждый раз когда вызывается requestAnimationFrame())
6. renderer - рендерер  всех элементов,  начиная с stage, рекурсивно проходит по всем элементам дочерним и рисует их
7. plugins - плагины.



*
*/
//old code
// const app = new PIXI.Application({
// 	view: document.getElementById('canvas'), // добавили в блок canvas или отдельно // document.body.appendChild(app.view);
// 	with: 500,
// 	height: 900,
// 	backgroundColor: 0x7fd2e7,
// 	loader: {
// 		//  позволяет асинхронно загружать ресурсы (изображения или аудио файлы) и создавать спрайты можно его не использовать если мы используем графику
// 		baseUrl: 'images', // базовый URL для всех загружаемых ресурсов
// 		crossOrigin: 'anonymous', // устанавливает атрибут crossorigin для всех загружаемых ресурсов
// 		timeout: 60000, // время ожидания загрузки в миллисекундах
// 		maxConcurrency: 10, // максимальное количество загрузок, которые могут выполняться одновременно
// 		shared: false, // если true, то загрузчик будет использовать один кеш для всех загрузок
// 		middleware: [], // массив функций промежуточной обработки, которые будут вызываться во время загрузки каждого ресурса
// 	},
// 	cotainer: {
// 		//  корневой контейнер для всех элементов
// 		x: 100, // координаты
// 		y: 100, // координаты
// 		width: 300,
// 		height: 300,
// 		backgroundColor: 0xcccccc,
// 	},
// 	// создаём контейнер
//   // PIXI.Container или stage
// 	stage: {
// 		//  корневой контейнер для всех элементов
// 		x: 100, // координаты
// 		y: 100, // координаты
// 		width: 300,
// 		height: 300,
// 		backgroundColor: 0xcccccc,
// 	},

// 	ticker: { //отрисовывает сцену на экране из app.stage
// 		//  работает  requestAnimationFrame()  обновляет состояние приложения перед каждым кадром анимации, чтобы вызвать рендер который отрисует  стейдж
// 		autoStart: true, //  автоматически запускает тикер при создании
// 		deltaTime: 1 / 60, // дельта времени между кадрами в секундах, если это значение 0 или null, то он будет рассчитываться автоматически
// 		minFPS: 0, // минимальное количество кадров в секунду, если это значение 0 или null, то он будет рассчитываться автоматически
// 		maxFPS: 0, // максимальное количество кадров в секунду, если это значение 0 или null, то он будет рассчитываться автоматически
// 		minDeltaTime: 0, // минимальное количество времени между кадрами в секундах, если это значение 0 или null, то он будет рассчитываться автоматически
// 		maxDeltaTime: 0, // максимальное количество времени между кадрами в секундах, если это значение 0 или null, то он будет рассчитываться автоматически
// 		lastTime: 0, // время последнего кадра
// 		speed: 1, // скорость тикера, 1 - нормальная скорость, 2 - двойная скорость и т.д.
// 		started: true, // запущен ли тикер
// 		frame: 0, // количество кадров, прошедших с начала работы тикера
// 		deltaMS: 0, // дельта времени между кадрами в миллисекундах
// 		elapsedMS: 0, // прошедшее время с начала работы тикера в миллисекундах
// 		FPS: 0, // количество кадров в секунду
// 	},
//   renderer: {
// 		// рендерер  всех элементов,  начиная с stage, рекурсивно проходит по всем элементам дочерним и рисует их
// 		backgroundColor: 0x1099bb,
// 		antialias: true, // сглаживание
// 		resolution: 1, //  позволяет управлять разрешением устройства, на котором работает приложение
// 		width: 500, //  ширина
// 		height: 900, // высота
// 	},
// 	plugins: {
// 		interaction: {
// 			autoPreventDefault: true, //  автоматически предотвращает поведение по умолчанию для событий указателя
// 			autoAttach: true, //  автоматически присоединяет себя к событиям указателя, если они еще не были присоединены
// 			useSystemTicker: false, //  использует системный тикер для обновления вместо встроенного тикера PIXI.Ticker
// 			moveWhenInside: false, //  перемещает события указателя, когда указатель находится внутри элемента
// 			stage: true, //  прослушивает события указателя на сцене
// 			onClick: null, //  вызывается при нажатии на элемент
// 			onDblClick: null, //  вызывается при двойном нажатии на элемент

// 			onLeftClick: null, //  левая кнопка мыши
// 			onLeftClickOutside: null, //  левая кнопка мыши
// 			onLeftTap: null, //  левая кнопка мыши
// 			onLeftTapOutside: null, //  левая кнопка мыши
// 			onLeftDown: null, // вызывается при нажатии на элемент
// 			onLeftUp: null, // вызывается при отпускании элемента
// 			onLeftUpOutside: null, // вызывается при отпускании элемента за пределами элемента

// 			onRightClick: null, //  вызывается при нажатии правой кнопкой мыши на элемент
// 			onRightClickOutside: null, //  правая кнопка мыши
// 			onRightDown: null, // вызывается при нажатии правой кнопкой мыши на элемент
// 			onRightUp: null, // вызывается при отпускании элемента
// 			onRightUpOutside: null, // вызывается при отпускании элемента за пределами элемента
// 			onRightTap: null, //  правая кнопка мыши
// 			onRightTapOutside: null, //  правая кнопка мыши

// 			onMiddleDown: null, //  средняя кнопка мыши
// 			onMiddleUp: null, //  средняя кнопка мыши
// 			onMiddleClick: null, //  вызывается при нажатии средней кнопкой мыши на элемент
// 			onMiddleClickOutside: null, //  средняя кнопка мыши
// 			onMiddleTap: null, //  средняя кнопка мыши
// 			onMiddleTapOutside: null, //  средняя кнопка мыши
// 			onMiddleUpOutside: null, //  средняя кнопка мыши

// 			onMouseDown: null, //  вызывается при нажатии на элемент
// 			onMouseUp: null, //  вызывается при отпускании элемента
// 			onMouseMove: null, // вызывается при перемещении указателя по элементу
// 			onMouseOut: null, //  вызывается при перемещении указателя с элемента
// 			onMouseOver: null, //  вызывается при перемещении указателя на элемент
// 			onMouseUpOutside: null, //  вызывается при отпускании элемента за пределами элемента
// 			onPointerCancel: null, //  вызывается при отмене события указателя
// 			onPointerDown: null, //  вызывается при нажатии на элемент
// 			onPointerMove: null, //  вызывается при перемещении указателя по элементу
// 			onPointerOut: null, //  вызывается при перемещении указателя с элемента
// 			onPointerOver: null, // вызывается при перемещении указателя на элемент
// 			onPointerTap: null, // вызывается при нажатии на элемент
// 			onPointerUp: null, // вызывается при отпускании элемента
// 			onPointerUpOutside: null, // вызывается при отпускании элемента за пределами элемента
// 			onTouchCancel: null, // вызывается при отмене события касания
// 			onTouchEnd: null, // вызывается при отпускании элемента
// 			onTouchEndOutside: null, //  вызывается при отпускании элемента за пределами элемента
// 			onTouchMove: null, // вызывается при перемещении указателя по элементу
// 			onTouchStart: null, // вызывается при нажатии на элемент
// 			onDragStart: null, // вызывается при начале перетаскивания элемента
// 			onDragEnd: null, // вызывается при окончании перетаскивания элемента
// 			onDragMove: null, // вызывается при перемещении элемента во время перетаскивания
// 			onAdded: null, // вызывается при добавлении элемента на сцену
// 			onRemoved: null, // вызывается при удалении элемента со сцены
// 			onTap: null, // вызывается при нажатии на элемент
// 			onWheel: null, //  колесо мыши
// 		},
// 	},
// 	sharedLoader: false, // если true, то загрузчик будет использовать один кеш для всех загрузок
// 	sharedTicker: false, // если true, то тикер будет использовать один кеш для всех загрузок
// 	autoDensity: false, // автоматически масштабирует приложение к плотности пикселей устройства
// 	resizeTo: window, //  автоматически изменяет размер приложения при изменении размера окна
// 	forceCanvas: false, //  принудительно использует канвас вместо WebGL
// 	powerPreference: 'default', //  предпочтение мощности для создания контекста WebGL
// 	sharedLoader: false, // если true, то загрузчик будет использовать один кеш для всех загрузок
// 	sharedTicker: false, // если true, то тикер будет использовать один кеш для всех загрузок
// 	autoDensity: false, // автоматически масштабирует приложение к плотности пикселей устройства
// });
