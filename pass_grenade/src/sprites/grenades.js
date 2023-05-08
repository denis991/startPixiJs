import { AnimatedSprite, Texture, Container, filters } from 'pixi.js';
import appConstants from '../common/constants';
import { destroySprite } from '../common/utils';

let app;
let grenades; // пули
let timeout; // задержка между выстрелами
// !!???????????????????????????
const grenadeTypes = ['Bullet_Sequence1', 'Bullet_Sequence2']; // типы пуль (изображения) к json
const grenadeSpeed = 1; // скорость пули (сетит в верх )
const allTextures = {}; // создавать массив текстур для анимированного спрайта будем  если они ещё не созданы
// пули игрока
export const initGrenades = (currApp, root) => {
	// инициализация пуль
	grenades = new Container(); // создаем контейнер для пуль
	(grenades.name = appConstants.containers.grenades), (app = currApp);
	return grenades; // сохраняем текущеее состояние приложения
};

export const clearBullets = () => {
	// очистка пуль при перезапуске игры
	grenades.children.forEach((b) => {
		// проходим по мосиву пуль
		grenades.removeChild(b); // удаляем пулю
		b.destroy({ children: true }); // удаляем детей
	});
};

export const destroyGrenade = (grenade) => {
	destroySprite(grenade);
	//add explosion BOOM
};

export const addGrenade = (coord) => {
	// добавление пули | инициализация новой пули

	// новый спраайт
	const grenadeType = grenadeTypes[Math.floor(Math.random() * grenadeTypes.length)];

	let textures = []; // локальная переменная для хранения текстур
	if (allTextures[grenadeType]) {
		// проверяем если текстуры уже созданы
		textures = allTextures[grenadeType]; // присваиваем к текущемму массиву текстур
	} else {
		for (let i = 0; i < 6; i++) {
			// если нет то создаем
			const texture = Texture.from(`${grenadeType} ${i + 1}.png`); // создаём текстуру в фрейме с именем
			textures.push(texture); // добавляем текстуру в массив
		}
		allTextures[grenadeType] = textures; // только созданный массив добавляем в общий массив блочной области видимости
	}

	const grenade = new AnimatedSprite(textures); // объект снаряда на основе текстуры (анимированный спрайт)
	const filter = new filters.ColorMatrixFilter(); // фильтр для снаряда
	grenade.loop = false; // блокируем циклическое прогирование анимации
	const { matrix } = filter; // матрица фильтра
	matrix[1] = Math.sin(Math.random() * 10);// задаём рандомное значение матрицы
	matrix[2] = Math.cos(Math.random() * 10);
	matrix[3] = Math.cos(Math.random() * 10);
	matrix[4] = Math.sin(Math.random() * 10);
	matrix[5] = Math.sin(Math.random() * 10);
	matrix[6] = Math.sin(Math.random() * 10);
	grenade.filters = [filter]; // масив фильтров
	grenade.animationSpeed = 0.2;// скорость анимации
	grenade.anchor.set(0.5); // изменяем  якорь спрайта
	grenade.position.set(coord.x, coord.y - 10); // устанавливаем позицию спрайта по входному параметру (координаты)
  //coord.y - 10 снаряд появлялся немного выше корабля игрока
	grenade.destroyMe = function () {//
		destroyGrenade(this); // удаляем снаряд
	};
	grenades.addChild(grenade);// добавляем снаряд в контейнер,
	grenade.play(); // запускаем анимацию
	play(appConstants.sounds.shot);

	timeout = setTimeout(() => { // задержка между выстрелами
		timeout = null;
	}, appConstants.timeouts.playerShoots);
};

export const grenadeTick = () => { //
	const toRemove = [];
	grenades.children.forEach((b) => { // для вызова цикла в глобальной переменной он ест только у childern
		b.position.y -= grenadeSpeed * 2; // изменяем кординаты для снаряда
		if (b.position.y < 0) { // если снарад вышел за пределы экрана
			toRemove.push(b);
		}
	});
	toRemove.forEach((b) => { // удаляем снаряды
		grenades.removeChild(b);
		b.destroy({ children: true });// удаляем детей ОБЪЕКТА
	});
};
