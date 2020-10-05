function getCoords(elem) {
    let box = elem.getBoundingClientRect();
    return {
        top: box.top + pageYOffset,
        left: box.left + pageXOffset
    };
}

function ballPhysics(element, maxHeight) {

    let elementStyle = getComputedStyle(element);
    let elementRadius = parseInt(elementStyle.width);
    let bottomBorder = parseInt(screenStyle.height) - parseInt(screenStyle.borderWidth) - elementRadius;
    while (maxHeight > elementRadius) {
        while (parseInt(element.style.top) < bottomBorder) {
            let temp = parseInt(elementStyle.top);
            element.style.top = temp + speed + "px";
            console.log(element.style.top);
        }
        maxHeight /= 2;
        while (parseInt(element.style.top) > maxHeight) {
            let temp = parseInt(elementStyle.top);
            element.style.top = temp - speed + "px";
            console.log(element.style.top);
        }
    }
}


let ball = document.querySelector(".ball");
let screen = document.querySelector(".screen-field");
let screenStyle = getComputedStyle(screen);
let speed = 10;
let maxHeight = 0;


console.log(ball);

ball.onmousedown = function (event) {
    let coords = getCoords(ball);
    console.log("coords", coords);

    

    let shiftX = event.clientX - coords.left;
    let shiftY = event.clientY - coords.top;

    console.log("shiftx, shifty", shiftX, shiftY);

    let ballStyle = getComputedStyle(ball);

    let topBorder = parseInt(screenStyle.borderWidth);
    let rightBorder = parseInt(screenStyle.width) - parseInt(screenStyle.borderWidth) - parseInt(ballStyle.width);
    let bottomBorder = parseInt(screenStyle.height) - parseInt(screenStyle.borderWidth) - parseInt(ballStyle.width);
    let leftBorder = topBorder;

    moveAt(event);

    function moveAt(event) {
        let xDelta = event.clientX - shiftX;
        let yDelta = event.clientY - shiftY;
        maxHeight = yDelta;
        console.log("xDelta", xDelta);
        console.log("yDelta", yDelta);

        if (xDelta > leftBorder && xDelta < rightBorder) {
            ball.style.left = xDelta + 'px';
        }
        if (yDelta > topBorder && yDelta < bottomBorder) {
            ball.style.top = yDelta + 'px';
        }
    }

    document.onmousemove = function (event) {
        moveAt(event);
    };

    ball.onmouseup = function () {
        //        document.onmousemove = null;
//        ballPhysics(ball, maxHeight);
        ball.onmouseup = null;
        
    };

}

//ball.ondragstart = function () {
//    return false;
//};

ball.ondragend = function(){
    ballPhysics(ball, maxHeight);
}


/*

как лучше всего обрабатывать падение циклом или как-либо поэтапно
как при падении выключить маусмув
