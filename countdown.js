const countdownDisplay = document.getElementById("countdown");
const startButton = document.getElementById("startButton");
const pauseButton = document.getElementById("pauseButton");
const resetButton = document.getElementById("resetButton");

let timeLeft = 10;
let countdown;
let isPaused = false; // Variável para controlar a pausa

// Função para iniciar a contagem regressiva
function startCountdown() {
  if (countdown) return; // Impede múltiplos intervalos

  countdown = setInterval(() => {
    if (!isPaused) {
      if (timeLeft > 0) {
        countdownDisplay.textContent = timeLeft;
        timeLeft--;
      } else {
        countdownDisplay.textContent = "Time's up!";
        clearInterval(countdown);
        countdown = null;
      }
    }
  }, 1000);
}

// Função para pausar ou retomar a contagem
function togglePause() {
  isPaused = !isPaused;
  pauseButton.textContent = isPaused ? "Resume" : "Pause";
}

// Função para redefinir a contagem
function resetCountdown() {
  clearInterval(countdown);
  countdown = null;
  timeLeft = 10;
  countdownDisplay.textContent = timeLeft;
  isPaused = false;
  pauseButton.textContent = "Pause";
}

// Adiciona eventos aos botões
startButton.addEventListener("click", startCountdown);
pauseButton.addEventListener("click", togglePause);
resetButton.addEventListener("click", resetCountdown);
