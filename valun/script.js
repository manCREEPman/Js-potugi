const ball = {
  object: document.querySelector(".ball"),
  ballCompStyle: getComputedStyle(document.querySelector(".ball")),
  frequency: 300,
  speed: 10,
  currentSpeed: 10,
  fallState: false,
  fallStartHeight: 0,
  ballEndHeight: 0,
  direction: 1,
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

function isBallNearBounceHeight(){
  heightArea = 10;
  if (ball.posY <= ball.fallStartHeight && 
    ball.direction < 0) return true;
  return false;
}

function changeBallCoords(x, y) {
  ball.posX = x;
  ball.posY = y;
}

function placeBall() {
  ball.object.style.left = ball.posX + "px";
  ball.object.style.top = ball.posY + "px";
}

function changeDirection(){
  ball.direction *= -1;
  ball.fallStartHeight = field.bottomBorder - (field.bottomBorder - ball.fallStartHeight) * 2 / 3;
}


function increaseCurrentSpeed() {
  if (!ball.fallState) {
    ball.fallStartHeight = ball.posY;
    ball.fallState = true;
    ball.fallStartTime = new Date();
  }
  tempTime = new Date();
  deltaTime = new Date(+tempTime - ball.fallStartTime).getMilliseconds();
  ball.currentSpeed += (ball.direction * 10 * deltaTime) / 1000;
}

function deltaClause(){
  return (field.bottomBorder - ball.fallStartHeight <= parseInt(ball.ballCompStyle.width));
}

function fallingGravitation() {
  if(isBallNearGround() && deltaClause()){
    ball.fallState = false;
    ball.currentSpeed = ball.speed;
    ball.direction = 1;
  }
  else{
    if(ball.fallState && isBallNearGround()){
      changeDirection();
    }
    else
    if(ball.fallState && isBallNearBounceHeight()){
      changeDirection();
      ball.fallStartTime = new Date();
      ball.currentSpeed = 0;
    }
    increaseCurrentSpeed();
    ball.posY += ball.direction * ball.currentSpeed;
    if (ball.posY >= field.bottomBorder) ball.posY = field.bottomBorder;
    placeBall();
  }
  console.log("===========================")
  console.log("speed", ball.currentSpeed);
  console.log("direction", ball.direction);
  console.log("ball fall state", ball.fallState);
  console.log("bounce height", ball.fallStartHeight);
  console.log("current height", ball.posY);
  console.log("delta", field.bottomBorder - ball.fallStartHeight);
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


ball.onmousedown() = function () {

}

initBallPosition();
initFieldBorders();
eventTimer = setInterval(fallingGravitation, 100);

/*
    перетаскивание
    внешние объекты
*/
