const ball = {
  object: document.querySelector(".ball"),
  ballCompStyle: getComputedStyle(document.querySelector(".ball")),
  frequency: 300,
  speed: 10,
  currentSpeed: 10,
  fallState: false,
  fallStartTime: null,
  posX: 0,
  posY: 0,
};

const field = {
  object: document.querySelector(".screen-field"),
  fieldCompStyle: getComputedStyle(document.querySelector(".screen-field")),
};

function isBallNearGround() {
  if (ball.posY >= field.bottomBorder) return true;
  else return false;
}

function changeBallCoords(x, y) {
  ball.posX = x;
  ball.posY = y;
}

function placeBall() {
  ball.object.style.left = ball.posX + "px";
  ball.object.style.top = ball.posY + "px";
}

function increaseCurrentSpeed(direction) {
  if (!ball.fallState) {
    ball.fallState = true;
    ball.fallStartTime = new Date();
  }
  tempTime = new Date();
  deltaTime = new Date(+tempTime - ball.fallStartTime).getMilliseconds();
  ball.currentSpeed += (direction * 10 * deltaTime) / 1000;
}

function fallingGravitation() {
  if (!isBallNearGround()) {
    increaseCurrentSpeed(1);
    console.log(ball.currentSpeed);
    ball.posY += ball.currentSpeed;
    if (ball.posY > field.bottomBorder) ball.posY = field.bottomBorder;
    placeBall();
  } else {
    ball.fallState = false;
    ball.currentSpeed = ball.speed;
  }
}

function initFieldBorders() {
  field["topBorder"] = parseInt(field.fieldCompStyle.borderWidth);
  field["rightBorder"] =
    parseInt(field.fieldCompStyle.width) -
    parseInt(ball.ballCompStyle.width) -
    parseInt(field.fieldCompStyle.borderWidth);
  field["bottomBorder"] =
    parseInt(field.fieldCompStyle.height) -
    parseInt(ball.ballCompStyle.width) -
    parseInt(field.fieldCompStyle.borderWidth);
  field["leftBorder"] = parseInt(field.fieldCompStyle.borderWidth);
}

function initBallPosition() {
  ball.posX = parseInt(ball.ballCompStyle.left);
  ball.posY = parseInt(ball.ballCompStyle.top);
}

initBallPosition();
initFieldBorders();
eventTimer = setInterval(fallingGravitation, 100);

/*
    ускорение
    отскок
    внешние объекты
*/
