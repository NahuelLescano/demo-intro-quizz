const QUESTIONS = [
  {
    question: "En Bash, que comando muestra el directorio actual?",
    options: ["pwd", "ls"],
    answer: 0,
    source: "bash.md",
  },
  {
    question: "En Linux, que simbolo indica root en el prompt?",
    options: ["#", "$"],
    answer: 0,
    source: "linux.md",
  },
  {
    question: "Docker: una imagen es...",
    options: ["template inmutable", "contenedor en ejecucion"],
    answer: 0,
    source: "docker.md",
  },
  {
    question: "Bash: que tecla autocompleta?",
    options: ["Tab", "Shift"],
    answer: 0,
    source: "bash.md",
  },
  {
    question: "Linux: que comando lista archivos?",
    options: ["ls", "cd"],
    answer: 0,
    source: "linux.md",
  },
  {
    question: "Docker Compose: archivo se llama...",
    options: ["docker-compose.yml", "dockerfile"],
    answer: 0,
    source: "docker.md",
  },
  {
    question: "Bash: cual es el shell por defecto en Linux?",
    options: ["bash", "fish"],
    answer: 0,
    source: "linux.md",
  },
  {
    question: "Bash: que operador concatena stdout a archivo?",
    options: [">>", ">"],
    answer: 0,
    source: "bash.md",
  },
  {
    question: "Docker: contenedor es...",
    options: ["instancia en ejecucion", "archivo de config"],
    answer: 0,
    source: "docker.md",
  },
  {
    question: "Linux: ruta absoluta empieza con...",
    options: ["/", "~"],
    answer: 0,
    source: "linux.md",
  },
  {
    question: "Bash: que comando cancela el actual?",
    options: ["Ctrl+C", "Ctrl+Z"],
    answer: 0,
    source: "bash.md",
  },
  {
    question: "Docker: herramienta para multi servicios?",
    options: ["Compose", "Swarm"],
    answer: 0,
    source: "docker.md",
  },
  {
    question: "Linux: comando para saber quien sos?",
    options: ["whoami", "uname"],
    answer: 0,
    source: "linux.md",
  },
  {
    question: "Bash: que operador une comandos y solo sigue si OK?",
    options: ["&&", "|"],
    answer: 0,
    source: "bash.md",
  },
  {
    question: "Docker: motor principal se llama...",
    options: ["Docker Engine", "Docker Hub"],
    answer: 0,
    source: "docker.md",
  },
];

const ui = {
  card: document.getElementById("card"),
  question: document.getElementById("question"),
  options: [document.getElementById("opt0"), document.getElementById("opt1")],
  feedback: document.getElementById("feedback"),
  score: document.getElementById("score"),
  best: document.getElementById("best"),
  level: document.getElementById("level"),
  startBtn: document.getElementById("startBtn"),
  restartBtn: document.getElementById("restartBtn"),
  gameOver: document.getElementById("gameOver"),
  finalScore: document.getElementById("finalScore"),
  finalBest: document.getElementById("finalBest"),
  retryBtn: document.getElementById("retryBtn"),
  soundToggle: document.getElementById("soundToggle"),
  confetti: document.getElementById("confetti"),
};

const state = {
  active: false,
  score: 0,
  best: 0,
  activeIndex: 0,
  intervalId: null,
  roundId: null,
  speed: 1400,
  minSpeed: 520,
  question: null,
  soundOn: false,
  lastPick: 0,
};

const audioState = {
  ctx: null,
  enabled: true,
};

const confettiState = {
  ctx: null,
  pieces: [],
  frame: null,
};

const phrases = {
  ready: [
    "Dale, rompela",
    "Apretas y la clavas",
    "Tranqui, vos podes",
  ],
  win: ["Bien ahi", "Perfecto", "La rompiste"],
  lose: ["Uff, casi", "Te fuiste de largo", "Otra vez, mostro"],
};

const QUESTION_POOL = shuffle([...QUESTIONS]);

function init() {
  state.best = Number(localStorage.getItem("introquizz-best")) || 0;
  ui.best.textContent = state.best;
  ui.soundToggle.addEventListener("click", toggleSound);
  ui.startBtn.addEventListener("click", startGame);
  ui.restartBtn.addEventListener("click", startGame);
  ui.retryBtn.addEventListener("click", startGame);
  ui.options.forEach((btn, index) => {
    btn.addEventListener("click", () => handleChoice(index));
  });
  document.addEventListener("keydown", onKey);
  resizeConfetti();
  window.addEventListener("resize", resizeConfetti);
  showIdle();
}

function showIdle() {
  ui.question.textContent = "Presiona para arrancar";
  ui.options[0].textContent = "Arranco";
  ui.options[1].textContent = "Todavia no";
  ui.feedback.textContent = pick(phrases.ready);
  ui.feedback.className = "feedback";
  ui.options.forEach((btn) => btn.className = "option");
  ui.gameOver.hidden = true;
  ui.gameOver.setAttribute("aria-hidden", "true");
}

function startGame() {
  state.active = true;
  state.score = 0;
  state.speed = 1400;
  state.activeIndex = 0;
  state.lastPick = 0;
  ui.gameOver.hidden = true;
  ui.gameOver.setAttribute("aria-hidden", "true");
  ui.score.textContent = "0";
  ui.level.textContent = "Nivel 1";
  ui.startBtn.disabled = true;
  ui.restartBtn.disabled = false;
  ui.feedback.textContent = "Arranco la mezcla";
  ui.feedback.className = "feedback";
  resetOptions();
  nextQuestion();
  startSwitching();
  pulse(ui.card);
}

function nextQuestion() {
  state.question = pick(QUESTION_POOL);
  const { question, options } = state.question;
  ui.question.textContent = question;
  ui.options[0].textContent = options[0];
  ui.options[1].textContent = options[1];
  resetOptions();
}

function startSwitching() {
  clearInterval(state.intervalId);
  state.intervalId = setInterval(() => {
    state.activeIndex = state.activeIndex === 0 ? 1 : 0;
    highlightActive();
    playTick();
  }, state.speed);
  highlightActive();
}

function highlightActive() {
  ui.options.forEach((btn, index) => {
    btn.classList.toggle("is-active", index === state.activeIndex);
  });
}

function handleChoice(index) {
  if (!state.active) {
    startGame();
    return;
  }
  if (!state.question) return;
  const correct = state.question.answer === index;
  state.lastPick = index;
  if (correct) {
    handleWin();
  } else {
    handleLose();
  }
}

function handleWin() {
  state.score += 1;
  ui.score.textContent = state.score;
  updateBest();
  ui.feedback.textContent = pick(phrases.win);
  ui.feedback.className = "feedback is-win";
  ui.options[state.lastPick].classList.add("is-right");
  pulse(ui.card);
  popConfetti();
  playGood();
  rampDifficulty();
  setTimeout(nextQuestion, 260);
}

function handleLose() {
  state.active = false;
  clearInterval(state.intervalId);
  ui.options[state.lastPick].classList.add("is-wrong");
  ui.feedback.textContent = `${pick(phrases.lose)}. Tu score: ${state.score}`;
  ui.feedback.className = "feedback is-lose";
  ui.startBtn.disabled = false;
  ui.restartBtn.disabled = false;
  ui.finalScore.textContent = state.score;
  ui.finalBest.textContent = state.best;
  ui.gameOver.hidden = false;
  ui.gameOver.setAttribute("aria-hidden", "false");
  shake(ui.card);
  playBad();
}

function rampDifficulty() {
  if (state.score % 3 === 0) {
    state.speed = Math.max(state.minSpeed, state.speed - 120);
    ui.level.textContent = `Nivel ${Math.floor(state.score / 3) + 1}`;
    startSwitching();
  }
}

function resetOptions() {
  ui.options.forEach((btn) => {
    btn.className = "option";
  });
  highlightActive();
}

function updateBest() {
  if (state.score > state.best) {
    state.best = state.score;
    ui.best.textContent = state.best;
    localStorage.setItem("introquizz-best", String(state.best));
  }
}

function onKey(event) {
  if (event.code === "Space") {
    event.preventDefault();
    handleChoice(state.activeIndex);
  }
}

function toggleSound() {
  state.soundOn = !state.soundOn;
  ui.soundToggle.setAttribute("aria-pressed", String(state.soundOn));
  ui.soundToggle.textContent = `Silencio: ${state.soundOn ? "OFF" : "ON"}`;
}

function ensureAudio() {
  if (!state.soundOn) return null;
  if (!audioState.ctx) {
    audioState.ctx = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (audioState.ctx.state === "suspended") {
    audioState.ctx.resume();
  }
  return audioState.ctx;
}

function playTone({ freq = 440, duration = 0.08, type = "sine", gain = 0.08 }) {
  const ctx = ensureAudio();
  if (!ctx) return;
  const osc = ctx.createOscillator();
  const amp = ctx.createGain();
  osc.type = type;
  osc.frequency.value = freq;
  amp.gain.value = gain;
  osc.connect(amp);
  amp.connect(ctx.destination);
  osc.start();
  osc.stop(ctx.currentTime + duration);
}

function playTick() {
  playTone({ freq: 520, duration: 0.03, type: "square", gain: 0.03 });
}

function playGood() {
  playTone({ freq: 820, duration: 0.08, type: "triangle", gain: 0.09 });
  setTimeout(() => playTone({ freq: 1040, duration: 0.08, type: "triangle", gain: 0.06 }), 80);
}

function playBad() {
  playTone({ freq: 160, duration: 0.12, type: "sawtooth", gain: 0.1 });
}

function shake(target) {
  target.classList.remove("shake");
  void target.offsetWidth;
  target.classList.add("shake");
}

function pulse(target) {
  target.classList.remove("pulse");
  void target.offsetWidth;
  target.classList.add("pulse");
}

function pick(list) {
  return list[Math.floor(Math.random() * list.length)];
}

function shuffle(list) {
  for (let i = list.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [list[i], list[j]] = [list[j], list[i]];
  }
  return list;
}

function resizeConfetti() {
  const { confetti } = ui;
  confetti.width = window.innerWidth;
  confetti.height = window.innerHeight;
  confettiState.ctx = confetti.getContext("2d");
}

function popConfetti() {
  const ctx = confettiState.ctx;
  if (!ctx) return;
  const count = 18;
  for (let i = 0; i < count; i += 1) {
    confettiState.pieces.push({
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
      vx: (Math.random() - 0.5) * 6,
      vy: -Math.random() * 6 - 2,
      size: Math.random() * 6 + 4,
      color: Math.random() > 0.5 ? "#30f6d1" : "#42a5ff",
      life: 60 + Math.random() * 20,
    });
  }
  if (!confettiState.frame) {
    animateConfetti();
  }
}

function animateConfetti() {
  const ctx = confettiState.ctx;
  if (!ctx) return;
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  confettiState.pieces = confettiState.pieces.filter((piece) => piece.life > 0);
  confettiState.pieces.forEach((piece) => {
    piece.x += piece.vx;
    piece.y += piece.vy;
    piece.vy += 0.18;
    piece.life -= 1;
    ctx.fillStyle = piece.color;
    ctx.fillRect(piece.x, piece.y, piece.size, piece.size * 0.6);
  });
  if (confettiState.pieces.length > 0) {
    confettiState.frame = requestAnimationFrame(animateConfetti);
  } else {
    confettiState.frame = null;
  }
}

init();
