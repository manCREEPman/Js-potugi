const ball = {
    object: document.querySelector(".ball"),
    ballCompStyle: getComputedStyle(document.querySelector(".ball")),
    frequency: 300,
    speed: 10,
    posX: 0,
    posY: 0
}

const field = {
    object: document.querySelector(".screen-field"),
    fieldCompStyle: getComputedStyle(document.querySelector(".screen-field"))
}


function isBallNearGround(){
    if (ball.posY >= field.bottomBorder) {
        console.log("Ball near ground");
        return true;
    }
    else{
        console.log("Ball in air");
        return false;
    };
}


function changeBallCoords(x, y){
    ball.posX = x;
    ball.posY = y;
}


function placeBall(){
    ball.object.style.left = ball.posX + "px";
    ball.object.style.top = ball.posY + "px";
}


function fallingGravitation(){
    if (!isBallNearGround()){
        console.log(ball.posY);
        ball.posY += ball.speed;
        if (ball.posY > field.bottomBorder) ball.posY = field.bottomBorder;
        placeBall();
    }
}


function initFieldBorders(){
    field['topBorder'] = parseInt(field.fieldCompStyle.borderWidth);
    field['rightBorder'] = parseInt(field.fieldCompStyle.width) - parseInt(ball.ballCompStyle.width) - parseInt(field.fieldCompStyle.borderWidth);
    field['bottomBorder'] = parseInt(field.fieldCompStyle.height) - parseInt(ball.ballCompStyle.width) - parseInt(field.fieldCompStyle.borderWidth);
    field['leftBorder'] = parseInt(field.fieldCompStyle.borderWidth);
}

function initBallPosition(){
    ball.posX = parseInt(ball.ballCompStyle.left);
    ball.posY = parseInt(ball.ballCompStyle.top);
}


initBallPosition();
initFieldBorders();
eventTimer = setInterval(fallingGravitation, 200);
