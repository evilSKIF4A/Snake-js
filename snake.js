/*

  Create by SKIF4A -> https://github.com/evilSKIF4A

*/

const canvas = document.getElementById("snake");
const context = canvas.getContext("2d");
const countApple = document.getElementById("countApple");

const box = 40;
var dx = box;
var dy = 0;

const snake = {
  x: box * 5,
  y: box * 5,
  tail: [],
  startTail: 4,
};
const eat = {
  x: randomCoordinates(20) * box,
  y: randomCoordinates(15) * box,
};
function randomCoordinates(num) {
  return Math.floor(Math.random() * num);
}

function game() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  snake.x += dx;
  snake.y += dy;

  snake.tail.unshift({ x: snake.x, y: snake.y });
  if (snake.tail.length > snake.startTail) {
    snake.tail.pop();
  }

  context.fillStyle = "red";
  context.fillRect(eat.x, eat.y, box, box);

  context.fillStyle = "green";
  snake.tail.forEach((tail, index) => {
    context.fillRect(tail.x, tail.y, box, box);
    if (tail.x === eat.x && tail.y === eat.y) {
      snake.startTail++;
      eat.x = randomCoordinates(20) * box;
      eat.y = randomCoordinates(15) * box;
      countApple.textContent = parseInt(countApple.textContent) + 1;
    }
    for (var i = index + 1; i < snake.tail.length; i++) {
      if (
        (tail.x === snake.teil[i].x && tail.y === snake.tail[i].y) ||
        !(
          snake.x >= 0 &&
          snake.x < canvas.width &&
          snake.y >= 0 &&
          snake.y < canvas.height
        )
      ) {
        snake.x = box * 5;
        snake.y = box * 5;
        snake.tail = [];
        snake.startTail = 4;
        dx = box;
        dy = 0;
        eat.x = randomCoordinates(20) * box;
        eat.y = randomCoordinates(15) * box;
        countApple.textContent = 0;
      }
    }
  });
}
setInterval(game, 100);

document.addEventListener("keydown", function (e) {
  if (e.which === 37 && dx === 0) {
    dx = -box;
    dy = 0;
  } else if (e.which === 38 && dy === 0) {
    dy = -box;
    dx = 0;
  } else if (e.which === 39 && dx === 0) {
    dx = box;
    dy = 0;
  } else if (e.which === 40 && dy === 0) {
    dy = box;
    dx = 0;
  }
});
