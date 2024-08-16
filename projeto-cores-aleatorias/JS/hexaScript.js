//Colors by Hexa

const hexa = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "A", "B", "C", "D", "E", "F"];

const btnHexa = document.querySelector(".change-color-button-hexa");

btnHexa.addEventListener("click", function () {
  let hexaColor = "#";

  for (i = 0; i < 6; i++) {
    hexaColor += hexa[Math.floor(Math.random() * hexa.length)];
  }

  document.querySelector(".color-code").textContent = hexaColor;
  document.body.style.backgroundColor = hexaColor;
});
