const images = document.querySelectorAll('.draggable-image');
const renascerZone = document.getElementById('renascer');
const originalPositions = {};
let current = null;
let offsetX = 0, offsetY = 0;

let totalLives = 5;
let timeInSeconds = 5 * 60;
let timerInterval = null;
let isPaused = false; // Corrigido: declaração adicionada

const livesContainer = document.getElementById("lives");
const timerElement = document.getElementById("timer");
const messageDiv = document.getElementById("message");
const pauseBtn = document.getElementById("pause-btn");

// Formata tempo para mm:ss
function formatTime(sec) {
  const mins = String(Math.floor(sec / 60)).padStart(2, '0');
  const secs = String(sec % 60).padStart(2, '0');
  return `${mins}:${secs}`;
}

// Atualiza cronômetro
function updateTimer() {
  timerElement.textContent = formatTime(timeInSeconds);
  if (timeInSeconds > 0) {
    timeInSeconds--;
  } else {
    clearInterval(timerInterval);
    showCentralMessage("Tempo esgotado! O jogo será reiniciado.");
    setTimeout(resetGame, 3000);
  }
}

// Atualiza as vidas visuais
function updateLives() {
  livesContainer.innerHTML = '';
  for (let i = 0; i < totalLives; i++) {
    const heart = document.createElement("img");
    heart.src = "Vidas.png";
    heart.alt = "Coração";
    livesContainer.appendChild(heart);
  }

  if (totalLives <= 0) {
    clearInterval(timerInterval);
    showCentralMessage("Suas vidas acabaram! O jogo será reiniciado.");
    setTimeout(resetGame, 3000);
  }
}

function loseLife() {
  totalLives--;
  updateLives();
}

function showCentralMessage(text) {
  messageDiv.textContent = text;
  messageDiv.style.display = 'block';
  setTimeout(() => {
    messageDiv.style.display = 'none';
  }, 2500);
}

function showFeedback(zone, type) {
  const feedback = document.createElement('img');
  feedback.classList.add('feedback');
  feedback.src = type === 'success' ? 'L.png' : 'X.png';
  feedback.style.left = zone.offsetLeft + 12.5 + 'px';
  feedback.style.top = zone.offsetTop + 90 + 'px';
  document.body.appendChild(feedback);

  let blinkCount = 0;
  const blinkInterval = setInterval(() => {
    feedback.style.visibility = feedback.style.visibility === 'hidden' ? 'visible' : 'hidden';
    blinkCount++;
    if (blinkCount >= 6) clearInterval(blinkInterval);
  }, 500);

  setTimeout(() => feedback.remove(), 3000);
}

function positionLixosRandomly() {
  const zoneRect = renascerZone.getBoundingClientRect();
  images.forEach(img => {
    const x = Math.random() * (zoneRect.width - 60);
    const y = Math.random() * (zoneRect.height - 60);
    img.style.left = `${zoneRect.left + x}px`;
    img.style.top = `${zoneRect.top + y}px`;
    originalPositions[img.id] = {
      left: img.offsetLeft,
      top: img.offsetTop
    };
  });
}

function resetGame() {
  clearInterval(timerInterval);
  timeInSeconds = 300;
  timerInterval = setInterval(updateTimer, 1000);
  totalLives = 5;
  updateLives();
  images.forEach(img => {
    img.style.display = 'block';
  });
  positionLixosRandomly();
}

function checkWin() {
  const remaining = Array.from(images).some(img => img.style.display !== 'none');
  if (!remaining) {
    clearInterval(timerInterval);
    showCentralMessage("Parabéns! Você reciclou todos os lixos!");
    setTimeout(() => {
      window.location.href = "fase2.html";
    }, 3000);
  }
}

// Eventos de arrastar
images.forEach(img => {
  img.addEventListener('mousedown', (e) => {
    if (isPaused) return;
    current = img;
    offsetX = e.clientX - current.offsetLeft;
    offsetY = e.clientY - current.offsetTop;
    current.style.cursor = 'grabbing';
  });
});

document.addEventListener('mousemove', (e) => {
  if (!current || isPaused) return;
  const x = e.clientX - offsetX;
  const y = e.clientY - offsetY;
  current.style.left = x + 'px';
  current.style.top = y + 'px';
});

document.addEventListener('mouseup', () => {
  if (!current || isPaused) return;

  const targetId = current.dataset.target;
  const imgRect = current.getBoundingClientRect();
  let hit = false;

  document.querySelectorAll('.zone').forEach(zone => {
    const zoneRect = zone.getBoundingClientRect();
    const overlap = !(imgRect.right < zoneRect.left ||
                      imgRect.left > zoneRect.right ||
                      imgRect.bottom < zoneRect.top ||
                      imgRect.top > zoneRect.bottom);

    if (overlap) {
      hit = true;
      if (zone.id === targetId) {
        current.style.display = 'none';
        showFeedback(zone, 'success');
        checkWin();
      } else {
        const pos = originalPositions[current.id];
        current.style.left = pos.left + 'px';
        current.style.top = pos.top + 'px';
        loseLife();
        showFeedback(zone, 'fail');
      }
    }
  });

  if (!hit) {
    const pos = originalPositions[current.id];
    current.style.left = pos.left + 'px';
    current.style.top = pos.top + 'px';
  }

  current.style.cursor = 'grab';
  current = null;
});

// Função de pausa
pauseBtn.addEventListener('click', () => {
  isPaused = !isPaused;
  if (isPaused) {
    pauseBtn.innerHTML = '<img src="play.png" alt="Continuar">';
    clearInterval(timerInterval);
    showCentralMessage("Jogo pausado");
  } else {
    pauseBtn.innerHTML = '<img src="pause.png" alt="Pausar">';
    timerInterval = setInterval(updateTimer, 1000);
    showCentralMessage("Jogo retomado");
  }
});

// Inicialização
updateLives();
timerInterval = setInterval(updateTimer, 1000);
positionLixosRandomly();
