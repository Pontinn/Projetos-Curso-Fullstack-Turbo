const numberOfButtons = document.querySelectorAll(".drum").length;

const soundTom1 = new Audio("sounds/tom-1.mp3");
const soundTom2 = new Audio("sounds/tom-2.mp3");
const soundTom3 = new Audio("sounds/tom-3.mp3");
const soundTom4 = new Audio("sounds/tom-4.mp3");
const soundCrash = new Audio("sounds/crash.mp3");
const soundKickBass = new Audio("sounds/kick-bass.mp3");
const soundSnare = new Audio("sounds/snare.mp3");

for (i = 0; i < numberOfButtons; i++) {
  document.querySelectorAll(".drum")[i].addEventListener("click", handleClick);
}

function handleClick() {
  let buttonInnerHTML = this.innerHTML;

  makeSounds(buttonInnerHTML);

  buttonAnimation(buttonInnerHTML);
}

document.addEventListener("keydown", function (event) {
  makeSounds(event.key);

  buttonAnimation(event.key);
});

function makeSounds(key) {
  switch (key) {
    case "w":
      soundTom1.play();
      break;

    case "a":
      soundTom2.play();
      break;

    case "s":
      soundTom3.play();
      break;

    case "d":
      soundTom4.play();
      break;

    case "j":
      soundSnare.play();
      break;

    case "k":
      soundCrash.play();
      break;

    case "l":
      soundKickBass.play();
      break;

    default:
      console.log("O botão pressionado não foi definido");
      break;
  }
}

function buttonAnimation(currentKey) {
  let activeButton = document.querySelector("." + currentKey);

  activeButton.classList.add("pressed");

  setTimeout(function () {
    activeButton.classList.remove("pressed");
  }, 100);
}
