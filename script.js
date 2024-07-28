let score = JSON.parse(localStorage.getItem("score")) || {
  wins: 0,
  losses: 0,
  ties: 0,
};

const theme = localStorage.getItem("theme") || "dark";
document.body.className = theme;
document.querySelector(".container").className = `container ${theme}`;

document.getElementById("theme-toggle").checked = theme === "light";

updateScore();

function playGame(playerMove) {
  const computerMove = pickComputerMove();
  let result = "";

  if (playerMove === "rock") {
    if (computerMove === "rock") {
      result = "Tie";
    } else if (computerMove === "paper") {
      result = "You Lose";
    } else if (computerMove === "scissors") {
      result = "You Win";
    }
  } else if (playerMove === "paper") {
    if (computerMove === "rock") {
      result = "You Win";
    } else if (computerMove === "paper") {
      result = "Tie";
    } else if (computerMove === "scissors") {
      result = "You Lose";
    }
  } else if (playerMove === "scissors") {
    if (computerMove === "rock") {
      result = "You Lose";
    } else if (computerMove === "paper") {
      result = "You Win";
    } else if (computerMove === "scissors") {
      result = "Tie";
    }
  }

  if (result === "You Win") {
    score.wins += 1;
  } else if (result === "You Lose") {
    score.losses += 1;
  } else if (result === "Tie") {
    score.ties += 1;
  }

  localStorage.setItem("score", JSON.stringify(score));
  updateResult(result);
  updateMoves(playerMove, computerMove);
  updateScore();
}

function updateResult(result) {
  const resultElement = document.querySelector(".js-result");
  resultElement.textContent = result;

  if (result === "You Win") {
    resultElement.style.color = "green";
  } else if (result === "You Lose") {
    resultElement.style.color = "red";
  } else {
    resultElement.style.color = "";
  }
}

function updateMoves(playerMove, computerMove) {
  document.querySelector(
    ".js-moves"
  ).textContent = `You picked ${playerMove}. Computer picked ${computerMove}.`;
}

function updateScore() {
  document.querySelector(
    ".js-score"
  ).innerHTML = `<span style="color: green;">Wins: ${score.wins}</span> , <span style="color: red;">Losses: ${score.losses}</span> , <span style="color: black;"> Ties: ${score.ties}</span>`;
}

function pickComputerMove() {
  const randomNumber = Math.random();
  if (randomNumber < 1 / 3) {
    return "rock";
  } else if (randomNumber < 2 / 3) {
    return "paper";
  } else {
    return "scissors";
  }
}

function resetScore() {
  score = { wins: 0, losses: 0, ties: 0 };
  localStorage.setItem("score", JSON.stringify(score));
  localStorage.removeItem("score");
  updateScore();
  alert("Score has been reset!");
}

function toggleTheme() {
  const currentTheme = document.body.className;
  const newTheme = currentTheme === "dark" ? "light" : "dark";
  document.body.className = newTheme;
  document.querySelector(".container").className = `container ${newTheme}`;
  localStorage.setItem("theme", newTheme);
}
