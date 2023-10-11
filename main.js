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

// Función para actualizar las estadísticas del Tamagotchi.
function updateStats(action) {
    switch (action) {
        case "feed":
            tamagotchi.hunger += 10;
            break;
        case "play":
            tamagotchi.happiness += 10;
            tamagotchi.energy -= 10;
            break;
        case "clean":
            tamagotchi.cleanliness += 10;
            break;
        case "sleep":
            tamagotchi.energy += 10;
            break;
    }
}

// Event listeners para los botones.
document.getElementById("feed").addEventListener("click", () => updateStats("feed"));
document.getElementById("play").addEventListener("click", () => updateStats("play"));
document.getElementById("clean").addEventListener("click", () => updateStats("clean"));
document.getElementById("sleep").addEventListener("click", () => updateStats("sleep"));

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

gameLoop();
