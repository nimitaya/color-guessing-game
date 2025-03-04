// Elements
const h1 = document.querySelector("h1");
const correctValue = document.querySelector("#color-display");
const stripe = document.querySelector("#stripe");
const reset = document.getElementById("reset");
const message = document.getElementById("message");
const modes = document.querySelectorAll(".mode"); // ist Array
const easy = modes[0];
const hard = modes[1];
const container = document.querySelector("#container");
const squares = document.querySelectorAll(".square"); // ist Array

let numSquares = 6;
let colors = [];

// ========== Functions ==========
// Generiert zufällige Farbe
function generateColor() {
  let r = Math.floor(Math.random() * 256);
  let g = Math.floor(Math.random() * 256);
  let b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
}

// Färbt die Felder ein und macht einen Farb Array
function coloredSquares() {
  colors = [];
  for (let i = 0; i < numSquares; i++) {
    let color = generateColor();
    colors.push(color);
    squares[i].style.backgroundColor = color;
  }

  let correctColor = colors[Math.floor(Math.random() * numSquares)];
  console.log(colors);
  correctValue.innerText = correctColor;
}

// Überprüft, welcher Modus aktiv ist und zeigt 3 oder 6 Blöcke an
function checkMode() {
  const selectedMode = document.querySelector(".selected");
  if (selectedMode.textContent === "Easy") {
    numSquares = 3;
  } else {
    numSquares = 6;
  }

  // Anzahl der sichtbaren Blöcke anpassen
  for (let i = 0; i < numSquares; i++) {
    if (numSquares === 3) {
      for (let i = numSquares; i < 6; i++) {
        squares[i].style.display = "none";
      }
    } else {
      squares.forEach((square) => {
        square.style.display = "block";
      });
    }
  }
}

// Ändert den selektierten Modus
function changeMode(event) {
  if (event.target.textContent === "Easy") {
    easy.classList.add("selected");
    hard.classList.remove("selected");
  } else if (event.target.textContent === "Hard") {
    hard.classList.add("selected");
    easy.classList.remove("selected");
  } else {
    return; // damit hier aus der Funktion rausgeht und nicht unten weitermacht
  }

  checkMode();
  coloredSquares(); // damit bei Auswahl des Modus direkt neue Farben generiert werden
}

// wurde die richtige Farbe ausgewählt?
function clickSquare(event) {
  console.log(event.target.style.backgroundColor);
  console.log(correctValue.innerText.toLowerCase());

  if (
    event.target.style.backgroundColor === correctValue.innerText.toLowerCase()
  ) {
    message.textContent = "correct";
    squares.forEach(
      (element) =>
        (element.style.backgroundColor = correctValue.innerText.toLowerCase())
    );
    h1.style.backgroundColor =correctValue.innerText.toLowerCase();
  } else {
    message.textContent = "try again";
    event.target.style.backgroundColor = "#232323";
  }
}

// EventListeners
reset.addEventListener("click", coloredSquares);
stripe.addEventListener("click", changeMode);
container.addEventListener("click", clickSquare); // für das Auswählen der Squares
