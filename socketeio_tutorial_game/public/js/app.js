const socket = io();
const startingSection = document.querySelector(".starting-section");

const homeBtn = document.querySelector(".home-btn");

let crazyButton = document.getElementById("crazyButton");

let startButton = document.getElementById("startButton");

startButton.addEventListener("click", () => {
  socket.emit("startGame");
});

// when the game starts, hide the start button and start the game
socket.on("startGame", () => {
  hideStartButton();
});

// hide start button click handler
function hideStartButton() {
  startButton.style.display = "none";
  crazyButton.style.display = "block";
  startingSection.style.display = "none";
}

// crazy button handler, after emitting the message, the object can send data to the server
crazyButton.addEventListener("click", () => {
  console.log("red button clicked");
  socket.emit("crazyIsClicked", {
    offsetLeft:
      Math.random() * (window.innerWidth - crazyButton.clientWidth - 100),
    offsetTop:
      Math.random() * (window.innerHeight - crazyButton.clientHeight - 50)
  });
});

//go crazy function
function goCrazy(offLeft, offTop) {
  let top, left;
  left = offLeft;
  top = offTop;
  crazyButton.style.top = top + "px";
  crazyButton.style.left = left + "px";
  crazyButton.style.animation = "none";
}

// handling data received from crazy btn click
socket.on("crazyIsClicked", data => {
  goCrazy(data.offsetLeft, data.offsetTop);
});
