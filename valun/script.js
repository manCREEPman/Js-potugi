const ball = {
  object: document.querySelector(".ball"),
  ballCompStyle: getComputedStyle(document.querySelector(".ball")),
  frequency: 100,
  speed: 10,
  currentSpeed: 10,
  fallState: false,
  fallStartHeight: 0,
  direction: 1,
  fallStartTime: null,
  posX: 0,
  posY: 0,
  shiftX: 0,
  shiftY: 0,
  mousedown: false,
};

const field = {
  object: document.querySelector(".screen-field"),
  fieldCompStyle: getComputedStyle(document.querySelector(".screen-field")),
};

function isBallNearGround() {
  return (ball.posY >= field.bottomBorder);
}

function isBallNearBounceHeight(){
  return (ball.posY <= ball.fallStartHeight && ball.direction < 0 );
}

function changeBallCoords(x, y) {
  ball.posX = x;
  ball.posY = y;
}

function placeBall() {
  ball.object.style.left = ball.posX + "px";
  ball.object.style.top = ball.posY + "px";
}

function changeBallDirection(){
  ball.direction *= -1;
  ball.fallStartHeight = field.bottomBorder - (field.bottomBorder - ball.fallStartHeight) * 2 / 3;
}


function changeBallCurrentSpeed() {
  if (!ball.fallState) {
    ball.fallStartHeight = ball.posY;
    ball.fallState = true;
    ball.fallStartTime = new Date();
  }
  tempTime = new Date();
  deltaTime = new Date(+tempTime - ball.fallStartTime).getMilliseconds();
  ball.currentSpeed += (ball.direction * 10 * deltaTime) / 1000;
  if (ball.currentSpeed < 0) ball.currentSpeed = 0;
}

function zeroBallSpeed(){
  return (ball.direction < 0 && ball.currentSpeed == 0);
}

function deltaHeightAndBorderClause(){
  return (field.bottomBorder - ball.fallStartHeight <= parseInt(ball.ballCompStyle.width));
}

function mainRender(){
  ball.speed = parseInt(document.getElementById("ballSpeed").value);
  ball.frequency = parseInt(document.getElementById("frameFrequency").value);
  fallingGravitation();
}

function fallingGravitation() {
  if(isBallNearGround() && deltaHeightAndBorderClause()){
    ball.fallState = false;
    ball.currentSpeed = ball.speed;
    ball.direction = 1;
  }
  else{
    if((ball.fallState && isBallNearGround()) || zeroBallSpeed()){
      changeBallDirection();
    }
    else
    if(ball.fallState && isBallNearBounceHeight()){
      changeBallDirection();
      ball.fallStartTime = new Date();
      ball.currentSpeed = ball.speed;
    }
    changeBallCurrentSpeed();
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
  ball['eventTimer'] = setInterval(mainRender, ball.frequency);
}

function initFormInputs(){
  document.getElementById("ballSpeed").value = ball.speed;
  document.getElementById("frameFrequency").value = ball.frequency;
}

function moveBallByMouse(event){
  let newX = event.clientX - ball.shiftX;
  let newY = event.clientY - ball.shiftY;
  if (newX >= field.leftBorder && newX <= field.rightBorder && newX != ball.posX) {
    ball.posX = newX;
  }
  if (newY >= field.topBorder && newY <= field.bottomBorder && newY != ball.posY){
    ball.posY = newY;
  } 
  placeBall();
}

function ballMouseDownEvent(event){
  ball.mousedown = true;
  ball.shiftX = event.clientX - ball.posX;
  ball.shiftY = event.clientY - ball.posY;
  moveBallByMouse(event);
  placeBall();
  document.addEventListener('mousemove', ballMouseMoveEvent);
  clearInterval(ball.eventTimer);
}

function ballMouseMoveEvent(event){
  if (ball.mousedown) moveBallByMouse(event);
}

function ballMouseUpEvent(event){
  if(ball.mousedown){
    document.removeEventListener('mousemove', ballMouseMoveEvent);
    ball.mousedown = false;
    ball.direction = 1;
    ball.currentSpeed = ball.speed;
    ball.eventTimer = setInterval(mainRender, ball.frequency);
  }
}

ball.object.addEventListener('mousedown', ballMouseDownEvent);
document.addEventListener('mouseup', ballMouseUpEvent);


initBallPosition();
initFieldBorders();
initFormInputs();


/*
    внешние объекты
*/
