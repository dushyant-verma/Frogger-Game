    const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const grid = 50;
const canvasWidth = canvas.width;
const canvasHeight = canvas.height;

let frog = {
    x: canvasWidth / 2 - grid / 2,
    y: canvasHeight - grid,
    width: grid,
    height: grid,
    dx: grid,
    dy: grid
};

let cars = [];
let carSpeed = 2;
const numCars = 5;

for (let i = 0; i < numCars; i++) {
    cars.push({
        x: Math.random() * canvasWidth,
        y: grid * (i + 1),
        width: grid * 2,
        height: grid,
        speed: carSpeed
    });
}

function drawFrog() {
    ctx.fillStyle = 'green';
    ctx.fillRect(frog.x, frog.y, frog.width, frog.height);
}

function drawCars() {
    ctx.fillStyle = 'red';
    cars.forEach(car => {
        ctx.fillRect(car.x, car.y, car.width, car.height);
    });
}

function moveCars() {
    cars.forEach(car => {
        car.x += car.speed;
        if (car.x > canvasWidth) {
            car.x = -car.width;
        }
    });
}

function checkCollision() {
    cars.forEach(car => {
        if (
            frog.x < car.x + car.width &&
            frog.x + frog.width > car.x &&
            frog.y < car.y + car.height &&
            frog.y + frog.height > car.y
        ) {
            resetFrog();
        }
    });
}

function resetFrog() {
    frog.x = canvasWidth / 2 - grid / 2;
    frog.y = canvasHeight - grid;
}

function update() {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    drawFrog();
    drawCars();
    moveCars();
    checkCollision();
    requestAnimationFrame(update);
}

function moveFrog(e) {
    switch (e.key) {
        case 'ArrowUp':
            if (frog.y > 0) frog.y -= frog.dy;
            break;
        case 'ArrowDown':
            if (frog.y < canvasHeight - grid) frog.y += frog.dy;
            break;
        case 'ArrowLeft':
            if (frog.x > 0) frog.x -= frog.dx;
            break;
        case 'ArrowRight':
            if (frog.x < canvasWidth - grid) frog.x += frog.dx;
            break;
    }
}

document.addEventListener('keydown', moveFrog);
update();
