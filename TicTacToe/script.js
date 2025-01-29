let boxes = document.querySelectorAll(".box-align");
let turn = "X";
let isGameOver = false;

boxes.forEach((e) => {
  e.innerHTML = ""; // Clear the board
  e.addEventListener("click", () => {
    if (!isGameOver && e.innerHTML === "") {
      e.innerHTML = turn; // Set the clicked box to the current turn
      let currentTurn = turn; // Save the current turn before changing it
      if (CheckWin(currentTurn)) {
        document.querySelector("#results").innerHTML = currentTurn + " Wins"; // Use the saved turn
        document.querySelector("#play-again").style.display = "inline";
      } else if (checkDraw()) {
        document.querySelector("#results").innerHTML = "It's a Draw!";
        document.querySelector("#play-again").style.display = "inline";
      } else {
        changeTurn(); // Change the turn after checking for a win or draw
      }
    }
  });
});

function changeTurn() {
  if (turn === "X") {
    turn = "O";
    document.querySelector(".bg").style.left = "85px"; // Move the background indicator
  } else {
    turn = "X";
    document.querySelector(".bg").style.left = "0"; // Reset the background indicator
  }
}

function CheckWin(currentTurn) {
  let winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < winConditions.length; i++) {
    let v0 = boxes[winConditions[i][0]].innerHTML;
    let v1 = boxes[winConditions[i][1]].innerHTML;
    let v2 = boxes[winConditions[i][2]].innerHTML;
    if (v0 != "" && v0 === v1 && v0 === v2) {
      // Highlight winning boxes
      winConditions[i].forEach((index) => {
        boxes[index].classList.add("winning-box");
      });

      isGameOver = true; // Set the game over state
      return true; // Return true if a win is detected
    }
  }
  return false; // Return false if no win
}

function checkDraw() {
  // Check if all boxes are filled and there is no winner
  let filledBoxes = Array.from(boxes).every((box) => box.innerHTML !== "");
  return filledBoxes && !isGameOver;
}

// Play Again Functionality
document.querySelector("#play-again").addEventListener("click", () => {
  // Reset the game state
  boxes.forEach((box) => {
    box.innerHTML = ""; // Clear the content of each box
    box.classList.remove("winning-box"); // Remove winning highlight
  });
  turn = "X"; // Reset the turn to "X"
  isGameOver = false; // Reset the game state
  document.querySelector("#results").innerHTML = ""; // Clear the result message
  document.querySelector("#play-again").style.display = "none"; // Hide the play again button
  document.querySelector(".bg").style.left = "0"; // Reset the turn indicator
});
