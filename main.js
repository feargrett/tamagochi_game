const canvas = document.getElementById("tamagotchi");
const ctx = canvas.getContext("2d");

// Define la criatura Tamagotchi.
const tamagotchi = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    size: 32,
    hunger: 50,
    happiness: 50,
    cleanliness: 50,
    energy: 50,
};

// Función para dibujar la mascota en el lienzo.
function drawTamagotchi() {
  // Dibuja el cuerpo del Tamagotchi.
  ctx.fillStyle = "black";
  ctx.fillRect(tamagotchi.x - tamagotchi.size / 2, tamagotchi.y - tamagotchi.size / 2, tamagotchi.size, tamagotchi.size);

  drawEyes();
  drawMouth();
}

// Enumeración para las acciones del Tamagotchi.
const EYES_STATES = {
    OPEN: "OPEN",
    CLOSE: "CLOSE"
};

// Variable para la acción actual de los ojos.
let currentEyesAction = EYES_STATES.OPEN;

// Dibuja los ojos.
function drawEyes() {
  if (currentEyesAction === EYES_STATES.OPEN) {
    ctx.fillStyle = "white";
    ctx.fillRect(tamagotchi.x - 8, tamagotchi.y - 8, 4, 4);
    ctx.fillRect(tamagotchi.x + 4, tamagotchi.y - 8, 4, 4);
  }
}

// Dibuja la boca (una simple línea).
function drawMouth() {
  ctx.strokeStyle = "white";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(tamagotchi.x - 5, tamagotchi.y + 6);
  ctx.lineTo(tamagotchi.x + 5, tamagotchi.y + 6);
  ctx.stroke();
}

let checkedExecuteIsEyeClosed = false; 
function animateIdle() {
  //ABRIR Y CERRAR LOS OJOS CON DELTA TIME Y RANDOM
  if (Date.now() % 2000 < 1800) { 
    currentEyesAction = EYES_STATES.OPEN;
    if (checkedExecuteIsEyeClosed) checkedExecuteIsEyeClosed = false;
  } else if (!checkedExecuteIsEyeClosed) {  
    checkedExecuteIsEyeClosed = true;
    if (Math.random() * 100 > 60) currentEyesAction = EYES_STATES.CLOSE; 
  }

  //MOVER ARRIBA Y ABAJO CON DELTA TIME
  tamagotchi.y += Math.sin(Date.now() * 0.002) * 0.5;
}

const TAMAGOTCHI_ACTIONS = {
    FEED: "FEED",
    PLAY: "PLAY",
    CLEAN: "CLEAN",
    SLEEP: "SLEEP"
};
// Función para actualizar las estadísticas del Tamagotchi.
function updateStats(action) {
    switch (action) {
        case TAMAGOTCHI_ACTIONS.FEED:
            tamagotchi.hunger += 10;
            if (tamagotchi.hunger > 100) tamagotchi.hunger = 100;
            break;
        case TAMAGOTCHI_ACTIONS.PLAY:
            tamagotchi.happiness += 10;
            tamagotchi.energy -= 10;
            if (tamagotchi.energy < 0) tamagotchi.energy = 0;
            if (tamagotchi.happiness > 100) tamagotchi.happiness = 100;
            break;
        case TAMAGOTCHI_ACTIONS.CLEAN:
            tamagotchi.cleanliness += 10;
            if (tamagotchi.cleanliness > 100) tamagotchi.cleanliness = 100;
            break;
        case TAMAGOTCHI_ACTIONS.SLEEP:
            tamagotchi.energy += 10;
            if (tamagotchi.energy > 100) tamagotchi.energy = 100;
            break;
    }
}

// Event listeners para los botones.
document.getElementById("feed").addEventListener("click", () => updateStats(TAMAGOTCHI_ACTIONS.FEED));
document.getElementById("play").addEventListener("click", () => updateStats(TAMAGOTCHI_ACTIONS.PLAY));
document.getElementById("clean").addEventListener("click", () => updateStats(TAMAGOTCHI_ACTIONS.CLEAN));
document.getElementById("sleep").addEventListener("click", () => updateStats(TAMAGOTCHI_ACTIONS.SLEEP));

// Loop principal del juego.
function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawTamagotchi();
    animateIdle();

    document.getElementById('hunger').value = tamagotchi.hunger;
    document.getElementById('happiness').value = tamagotchi.happiness;
    document.getElementById('energy').value = tamagotchi.energy;
    document.getElementById('cleanliness').value = tamagotchi.cleanliness;

    requestAnimationFrame(gameLoop);
}

(() => {

  // Inicia el loop de la actualización de las estadísticas.
  setInterval(() => {
    tamagotchi.hunger -= Math.floor(Math.random() * 15) + 1;
    tamagotchi.happiness -= Math.floor(Math.random() * 10) + 1;
    tamagotchi.energy -= Math.floor(Math.random() * 5) + 1;
    tamagotchi.cleanliness -= Math.floor(Math.random() * 5) + 1;
    if (tamagotchi.hunger < 0) tamagotchi.hunger = 0;
    if (tamagotchi.happiness < 0) tamagotchi.happiness = 0;
    if (tamagotchi.energy < 0) tamagotchi.energy = 0;
    if (tamagotchi.cleanliness < 0) tamagotchi.cleanliness = 0;
  }, 1000 * 10);

  // Inicia el loop del juego.
  gameLoop();

})();
