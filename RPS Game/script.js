const playerHand = document.getElementById("player-hand");
const computerHand = document.getElementById("computer-hand");
const resultText = document.getElementById("result");

const choices = {
  rock: "✊",
  paper: "✋",
  scissors: "✌️"
};

let stats = {
  user: { win: 0, loss: 0, draw: 0 },
  computer: { win: 0, loss: 0, draw: 0 }
};

loadStats();
updateStatsUI();

function loadStats() {
  const saved = localStorage.getItem("rpsStats");
  if (saved) stats = JSON.parse(saved);
}

function playGame(playerChoice) {
  resultText.textContent = "Shaking...";
  playerHand.textContent = "✊";
  computerHand.textContent = "✊";
  playerHand.classList.add("shake");
  computerHand.classList.add("shake");

  setTimeout(() => {
    const computerChoice = getComputerChoice();
    playerHand.textContent = choices[playerChoice];
    computerHand.textContent = choices[computerChoice];
    const winner = getWinner(playerChoice, computerChoice);

    updateStats(winner);
    updateStatsUI();

    resultText.textContent = winner;

    playerHand.classList.remove("shake");
    computerHand.classList.remove("shake");
  }, 1000);
}

function getComputerChoice() {
  const options = ["rock", "paper", "scissors"];
  return options[Math.floor(Math.random() * 3)];
}

function getWinner(player, computer) {
  if (player === computer) return "It's a Draw!";
  if (
    (player === "rock" && computer === "scissors") ||
    (player === "paper" && computer === "rock") ||
    (player === "scissors" && computer === "paper")
  ) return "You Win! 🎉";
  return "You Lose! 😢";
}

function updateStats(winnerMessage) {
  if (winnerMessage.includes("Win")) {
    stats.user.win++;
    stats.computer.loss++;
  } else if (winnerMessage.includes("Lose")) {
    stats.user.loss++;
    stats.computer.win++;
  } else {
    stats.user.draw++;
    stats.computer.draw++;
  }
  localStorage.setItem("rpsStats", JSON.stringify(stats));
}

function updateStatsUI() {
  document.getElementById("user-wins").textContent = stats.user.win;
  document.getElementById("user-losses").textContent = stats.user.loss;
  document.getElementById("user-draws").textContent = stats.user.draw;

  document.getElementById("comp-wins").textContent = stats.computer.win;
  document.getElementById("comp-losses").textContent = stats.computer.loss;
  document.getElementById("comp-draws").textContent = stats.computer.draw;
}

function resetStats() {
  stats = {
    user: { win: 0, loss: 0, draw: 0 },
    computer: { win: 0, loss: 0, draw: 0 }
  };
  localStorage.removeItem("rpsStats");
  updateStatsUI();
  resultText.textContent = "Stats reset. Make your move!";
}

function toggleTheme() {
  const body = document.body;
  const themeButton = document.getElementById('theme-toggle');

  if (body.classList.contains('light')) {
    body.classList.remove('light');
    body.classList.add('dark');
    themeButton.textContent = '🌞 Light Mode';
  } else {
    body.classList.remove('dark');
    body.classList.add('light');
    themeButton.textContent = '🌙 Dark Mode';
  }

  localStorage.setItem('theme', body.classList.contains('dark') ? 'dark' : 'light');
}

document.addEventListener('DOMContentLoaded', function () {
  const savedTheme = localStorage.getItem('theme');
  const body = document.body;
  const themeButton = document.getElementById('theme-toggle');

  if (savedTheme === 'dark') {
    body.classList.add('dark');
    themeButton.textContent = '🌞 Light Mode';
  } else {
    body.classList.add('light');
    themeButton.textContent = '🌙 Dark Mode';
  }
});