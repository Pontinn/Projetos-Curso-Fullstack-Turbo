let randomNumber1 = Math.floor(Math.random() * 6 + 1);

let randomImageSource = "img/dice" + randomNumber1 + ".png";

let randomNumber2 = Math.floor(Math.random() * 6 + 1);

let randomImageSource2 = "img/dice" + randomNumber2 + ".png";

let firstDiceImage = document
  .querySelectorAll("img")[0]
  .setAttribute("src", randomImageSource);
let secondDiceImage = document
  .querySelectorAll("img")[1]
  .setAttribute("src", randomImageSource2);

if (randomNumber1 > randomNumber2) {
  document.querySelector(".result").textContent = "JOGADOR 1 VENCEU! 🏆";
} else if (randomNumber1 === randomNumber2) {
  document.querySelector(".result").textContent = "EMPATE! 🥶";
} else {
  document.querySelector(".result").textContent = "JOGADOR 2 VENCEU! 🏆";
}
