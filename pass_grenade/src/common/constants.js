const appConstants = { // глоабльные константы
    size: { // размеры экрана
        WIDTH: window.innerWidth ? window.innerWidth : 800,
        HEIGHT: window.innerHeight ? window.innerHeight : 600,
    },
        timeouts: { // задержка
        playerLock: 2000,
        playerShoots: 1000,
    },
}

export default appConstants