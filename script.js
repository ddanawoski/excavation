"use strict";

let canvas = document.getElementById('canvas');
let ctx = canvas.getContext("2d");
let middleHorizontalLineOffset = 60;
let pixelRelitivity = 11.5;
let bound = {
    x1: 0 + 20,
    y1: 0 + 20,
    x2: canvas.width - 20,
    y2: canvas.height - 20
};
let leftMiddlePoint = {
    x: Math.floor((bound.x1 + bound.x1) / 2),
    y: Math.floor((bound.y1 + bound.y2) / 2)
}
let rightMiddlePoint = {
    x: Math.floor((bound.x2 + bound.x2) / 2),
    y: Math.floor((bound.y1 + bound.y2) / 2)
}
console.log(leftMiddlePoint);
console.log(rightMiddlePoint);

(function($) {
    //processX();
    $('#slopeForm').on('submit', function(e) {
        e.preventDefault();
        $('.drawnImg').removeClass('d-none');
        $('.resultImg').addClass('d-none');
        const formArr = $('#slopeForm').serializeArray();
        const soilType = formArr[0]['value'];
        const depth = parseFloat(formArr[1]['value']);
        const width = parseFloat(formArr[2]['value']);
        const trenchTopWidth = calculateWidth(soilType, width, depth);
        console.log(trenchTopWidth);
        $('.drawnImg').empty().append(`<canvas id="canvas" width=600 height=460></canvas>`);
        renderCanvas();
        drawLeftRightDepthLine(depth, trenchTopWidth);
        drawBottomWidth(width, depth);
        drawOuterWidthBoundry(width, depth, trenchTopWidth);
        drawMainLine(trenchTopWidth);
        processImg()
    })


    $('.radios .row .col label').on('click', function(ev) {
        if(ev.target.tagName === 'SPAN') {
            if ($(ev.target).prev().is(':checked') === false) {
                $('.radios .row .col label span').removeClass('radio-active');
                $('input[type="radio"]').attr('checked', false);
                $(ev.target).prev().attr('checked', true);
                $(ev.target).addClass('radio-active');
            }
        }
    });


})(jQuery);

function processImg() {
    const a = new Image();
    $('.drawnImg').addClass('d-none');
    a.src = canvas.toDataURL();
    $('.resultImg').empty().append(a);
    $('.resultImg img').addClass('img-fluid');
    $('.resultImg').removeClass('d-none');
    $('.resultImg').addClass('d-block');
}

function renderCanvas() {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext("2d");
    middleHorizontalLineOffset = 60;
    let pixelRelitivity = 11.5;
    bound = {
        x1: 0 + 20,
        y1: 0 + 20,
        x2: canvas.width - 20,
        y2: canvas.height - 20
    };
    leftMiddlePoint = {
        x: Math.floor((bound.x1 + bound.x1) / 2),
        y: Math.floor((bound.y1 + bound.y2) / 2)
    }
    rightMiddlePoint = {
            x: Math.floor((bound.x2 + bound.x2) / 2),
            y: Math.floor((bound.y1 + bound.y2) / 2)
        }
        //drawCanvasBoundry();
    drawMiddleHorizontalLine();
}

function drawMainLine(trenchTopWidth) {
    trenchTopWidth = trenchTopWidth * pixelRelitivity;
    ctx.beginPath();
    ctx.moveTo(((leftMiddlePoint.x + rightMiddlePoint.x) / 2) - (trenchTopWidth / 2), ((leftMiddlePoint.y + rightMiddlePoint.y) / 2) - 170);
    ctx.lineTo(((leftMiddlePoint.x + rightMiddlePoint.x) / 2) + (trenchTopWidth / 2), ((leftMiddlePoint.y + rightMiddlePoint.y) / 2) - 170);
    ctx.stroke();

    line_arrow(((leftMiddlePoint.x + rightMiddlePoint.x) / 2) - (trenchTopWidth / 2), ((leftMiddlePoint.y + rightMiddlePoint.y) / 2) - 170, ((leftMiddlePoint.x + rightMiddlePoint.x) / 2) + (trenchTopWidth / 2), ((leftMiddlePoint.y + rightMiddlePoint.y) / 2) - 170, 5);
    line_arrow(((leftMiddlePoint.x + rightMiddlePoint.x) / 2) + (trenchTopWidth / 2), ((leftMiddlePoint.y + rightMiddlePoint.y) / 2) - 170, ((leftMiddlePoint.x + rightMiddlePoint.x) / 2) - (trenchTopWidth / 2), ((leftMiddlePoint.y + rightMiddlePoint.y) / 2) - 170, 5);

    //write text above main line
    writeText(trenchTopWidth / pixelRelitivity, ((leftMiddlePoint.x + rightMiddlePoint.x) / 2) - 10, ((leftMiddlePoint.y + rightMiddlePoint.y) / 2) - 190);

    ctx.beginPath();

    //left 2 const
    ctx.moveTo(((leftMiddlePoint.x + rightMiddlePoint.x) / 2) - (trenchTopWidth / 2), ((leftMiddlePoint.y + rightMiddlePoint.y) / 2) - 175);
    ctx.lineTo(((leftMiddlePoint.x + rightMiddlePoint.x) / 2) - (trenchTopWidth / 2), ((leftMiddlePoint.y + rightMiddlePoint.y) / 2) - middleHorizontalLineOffset);
    ctx.moveTo((((leftMiddlePoint.x + rightMiddlePoint.x) / 2) - (trenchTopWidth / 2)) - 3 * pixelRelitivity, ((leftMiddlePoint.y + rightMiddlePoint.y) / 2) - 175);
    ctx.lineTo((((leftMiddlePoint.x + rightMiddlePoint.x) / 2) - (trenchTopWidth / 2)) - 3 * pixelRelitivity, ((leftMiddlePoint.y + rightMiddlePoint.y) / 2) - middleHorizontalLineOffset);
    writeText('2', ((((leftMiddlePoint.x + rightMiddlePoint.x) / 2) - (trenchTopWidth / 2) + (((leftMiddlePoint.x + rightMiddlePoint.x) / 2) - (trenchTopWidth / 2)) - 3 * pixelRelitivity) / 2) - 5, ((leftMiddlePoint.y + rightMiddlePoint.y) / 2) - 130);

    //right 2 const
    ctx.moveTo(((leftMiddlePoint.x + rightMiddlePoint.x) / 2) + (trenchTopWidth / 2), ((leftMiddlePoint.y + rightMiddlePoint.y) / 2) - 175);
    ctx.lineTo(((leftMiddlePoint.x + rightMiddlePoint.x) / 2) + (trenchTopWidth / 2), ((leftMiddlePoint.y + rightMiddlePoint.y) / 2) - middleHorizontalLineOffset);
    ctx.moveTo((((leftMiddlePoint.x + rightMiddlePoint.x) / 2) + (trenchTopWidth / 2)) + 3 * pixelRelitivity, ((leftMiddlePoint.y + rightMiddlePoint.y) / 2) - 175);
    ctx.lineTo((((leftMiddlePoint.x + rightMiddlePoint.x) / 2) + (trenchTopWidth / 2)) + 3 * pixelRelitivity, ((leftMiddlePoint.y + rightMiddlePoint.y) / 2) - middleHorizontalLineOffset);
    writeText('2', ((((leftMiddlePoint.x + rightMiddlePoint.x) / 2) + (trenchTopWidth / 2) + (((leftMiddlePoint.x + rightMiddlePoint.x) / 2) + (trenchTopWidth / 2)) + 3 * pixelRelitivity) / 2) - 5, ((leftMiddlePoint.y + rightMiddlePoint.y) / 2) - 130);

    ctx.setLineDash([2, 3]);
    ctx.stroke();


}

function drawOuterWidthBoundry(givenWidth, givenDepth, trenchTopWidth) {
    givenWidth = givenWidth * pixelRelitivity;
    givenDepth = givenDepth * pixelRelitivity;
    trenchTopWidth = trenchTopWidth * pixelRelitivity;
    let val = (trenchTopWidth - givenWidth) / 2;
    console.log(val);
    //val = val * pixelRelitivity;

    const middlePt = {
        x: (leftMiddlePoint.x + rightMiddlePoint.x) / 2,
        y: ((rightMiddlePoint.y + leftMiddlePoint.y) / 2) - middleHorizontalLineOffset
    }
    const leftMoveTo = {
        x: (middlePt.x - (givenWidth / 2)) - val,
        y: ((rightMiddlePoint.y + leftMiddlePoint.y) / 2) - middleHorizontalLineOffset
    }
    console.log('left move to', leftMoveTo);
    const rightMoveTo = {
        x: (middlePt.x + (givenWidth / 2)) + val,
        y: ((rightMiddlePoint.y + leftMiddlePoint.y) / 2) - middleHorizontalLineOffset
    }

    ctx.beginPath();
    ctx.setLineDash([2, 3]);
    ctx.moveTo(leftMoveTo.x, leftMoveTo.y);
    ctx.lineTo(middlePt.x - (givenWidth / 2), leftMoveTo.y + givenDepth);
    ctx.lineTo(middlePt.x + (givenWidth / 2), leftMoveTo.y + givenDepth);
    ctx.lineTo(rightMoveTo.x, rightMoveTo.y);
    ctx.closePath();
    ctx.fillStyle = "#E0B976";
    ctx.globalCompositeOperation = 'destination-over';
    ctx.fill();
    ctx.stroke();

    ctx.beginPath();
    ctx.setLineDash([]);
    //draw left line above outer boundry and box
    ctx.moveTo(leftMoveTo.x, leftMoveTo.y - 30);
    ctx.lineTo(middlePt.x - (givenWidth / 2), leftMoveTo.y - 30);


    //draw right line above outer boundry and box
    ctx.moveTo(middlePt.x + (givenWidth / 2), rightMoveTo.y - 30);
    ctx.lineTo(rightMoveTo.x, rightMoveTo.y - 30);

    ctx.strokeStyle = "black";
    ctx.fillStyle = "black";
    ctx.stroke();

    //draw arrows for left line
    line_arrow(leftMoveTo.x, leftMoveTo.y - 30, middlePt.x - (givenWidth / 2), leftMoveTo.y - 30, 5);
    line_arrow(middlePt.x - (givenWidth / 2), leftMoveTo.y - 30, leftMoveTo.x, leftMoveTo.y - 30, 5);

    //draw arrows for right line
    line_arrow(middlePt.x + (givenWidth / 2), rightMoveTo.y - 30, rightMoveTo.x, rightMoveTo.y - 30, 5);
    line_arrow(rightMoveTo.x, rightMoveTo.y - 30, middlePt.x + (givenWidth / 2), rightMoveTo.y - 30, 5);

    //write text on left line
    writeText(val / pixelRelitivity, (leftMoveTo.x + (middlePt.x - (givenWidth / 2))) / 2, leftMoveTo.y - 40);

    //write text on right line
    writeText(val / pixelRelitivity, (rightMoveTo.x + (middlePt.x + (givenWidth / 2))) / 2, rightMoveTo.y - 40);
}

function drawCanvasBoundry() {
    ctx.beginPath();
    ctx.moveTo(bound.x1, bound.y1);
    ctx.lineTo(bound.x2, bound.y1);
    ctx.lineTo(bound.x2, bound.y2);
    ctx.lineTo(bound.x1, bound.y2);

    ctx.closePath();
    ctx.stroke();

}

function drawMiddleHorizontalLine() {
    ctx.beginPath();
    ctx.moveTo(leftMiddlePoint.x, leftMiddlePoint.y - middleHorizontalLineOffset);
    ctx.lineTo(rightMiddlePoint.x, rightMiddlePoint.y - middleHorizontalLineOffset);
    ctx.strokeStyle = "black";
    ctx.stroke();

}

function calculateWidth(type, width, depth) {

    switch (type) {
        case 'A':
            pixelRelitivity = 11.5;
            return width + (2 * (0.75 * depth));
            break;
        case 'B':
            pixelRelitivity = 9;
            return (width + (2 * (1 * depth)));
            break;
        case 'C':
            pixelRelitivity = 11.5;
            return (width + (2 * (1.5 * depth)));
            break;
        default:
            break;
    }
}

function drawBottomWidth(width, depth) {

    const newWidth = width * pixelRelitivity;
    const newDepth = depth * pixelRelitivity;

    const middlePt = {
        x: (leftMiddlePoint.x + rightMiddlePoint.x) / 2,
        y: ((rightMiddlePoint.y + leftMiddlePoint.y) / 2) - middleHorizontalLineOffset
    }
    ctx.beginPath();
    ctx.fillStyle = "#9A733A";
    ctx.fillRect(middlePt.x - (newWidth / 2), middlePt.y, newWidth, newDepth);

    //draw line inside box
    ctx.beginPath();
    ctx.moveTo(middlePt.x - (newWidth / 2), (middlePt.y + (newDepth / 2)));
    ctx.lineTo(middlePt.x + (newWidth / 2), (middlePt.y + (newDepth / 2)));
    ctx.strokeStyle = "black";
    ctx.stroke();
    ctx.fillStyle = "black";
    line_arrow(middlePt.x - (newWidth / 2), (middlePt.y + (newDepth / 2)), middlePt.x + (newWidth / 2), (middlePt.y + (newDepth / 2)), 5);
    line_arrow(middlePt.x + (newWidth / 2), (middlePt.y + (newDepth / 2)), middlePt.x - (newWidth / 2), (middlePt.y + (newDepth / 2)), 5);

    writeText(width, middlePt.x - 10, (middlePt.y + (newDepth / 2)) + 30);
}

function drawLeftRightDepthLine(depth, trenchTopWidth) {
    depth = depth * pixelRelitivity;
    trenchTopWidth = trenchTopWidth * pixelRelitivity;
    ctx.beginPath();

    //draw left line
    ctx.moveTo(((leftMiddlePoint.x + rightMiddlePoint.x) / 2) - (trenchTopWidth / 2) - 15, (leftMiddlePoint.y - middleHorizontalLineOffset));
    ctx.lineTo(((leftMiddlePoint.x + rightMiddlePoint.x) / 2) - (trenchTopWidth / 2) - 15, (leftMiddlePoint.y - middleHorizontalLineOffset) + depth);
    //write depth text
    writeText((depth / pixelRelitivity), ((((leftMiddlePoint.x + rightMiddlePoint.x) / 2) - (trenchTopWidth / 2)) - 25) - 15, ((leftMiddlePoint.y - middleHorizontalLineOffset) + (leftMiddlePoint.y - middleHorizontalLineOffset) + depth) / 2);
    //draw right line
    ctx.moveTo(((leftMiddlePoint.x + rightMiddlePoint.x) / 2) + (trenchTopWidth / 2) + 15, (rightMiddlePoint.y - middleHorizontalLineOffset));
    ctx.lineTo(((leftMiddlePoint.x + rightMiddlePoint.x) / 2) + (trenchTopWidth / 2) + 15, (rightMiddlePoint.y - middleHorizontalLineOffset) + depth);
    writeText((depth / pixelRelitivity), ((((leftMiddlePoint.x + rightMiddlePoint.x) / 2) + (trenchTopWidth / 2)) + 5) + 15, ((leftMiddlePoint.y - middleHorizontalLineOffset) + (leftMiddlePoint.y - middleHorizontalLineOffset) + depth) / 2);
    ctx.strokeStyle = "black";
    ctx.stroke();

    //draw left arrows
    line_arrow(((leftMiddlePoint.x + rightMiddlePoint.x) / 2) - (trenchTopWidth / 2) - 15, (leftMiddlePoint.y - middleHorizontalLineOffset) + depth, ((leftMiddlePoint.x + rightMiddlePoint.x) / 2) - (trenchTopWidth / 2) - 15, (leftMiddlePoint.y - middleHorizontalLineOffset), 5);
    line_arrow(((leftMiddlePoint.x + rightMiddlePoint.x) / 2) - (trenchTopWidth / 2) - 15, (leftMiddlePoint.y - middleHorizontalLineOffset), ((leftMiddlePoint.x + rightMiddlePoint.x) / 2) - (trenchTopWidth / 2) - 15, (leftMiddlePoint.y - middleHorizontalLineOffset) + depth, 5);

    //draw right arrows
    line_arrow(((leftMiddlePoint.x + rightMiddlePoint.x) / 2) + (trenchTopWidth / 2) + 15, (rightMiddlePoint.y - middleHorizontalLineOffset), ((leftMiddlePoint.x + rightMiddlePoint.x) / 2) + (trenchTopWidth / 2) + 15, (rightMiddlePoint.y - middleHorizontalLineOffset) + depth, 5);
    line_arrow(((leftMiddlePoint.x + rightMiddlePoint.x) / 2) + (trenchTopWidth / 2) + 15, (rightMiddlePoint.y - middleHorizontalLineOffset) + depth, ((leftMiddlePoint.x + rightMiddlePoint.x) / 2) + (trenchTopWidth / 2) + 15, (rightMiddlePoint.y - middleHorizontalLineOffset), 5);

}

function writeText(text, x, y, transform = null) {
    ctx.font = "17px Arial";
    ctx.fillText(text + "'", x, y);
}

function line_arrow(fromx, fromy, tox, toy, r) {
    var x_center = tox;
    var y_center = toy;

    var angle;
    var x;
    var y;

    ctx.beginPath();

    angle = Math.atan2(toy - fromy, tox - fromx)
    x = r * Math.cos(angle) + x_center;
    y = r * Math.sin(angle) + y_center;

    ctx.moveTo(x, y);

    angle += (1 / 3) * (2 * Math.PI)
    x = r * Math.cos(angle) + x_center;
    y = r * Math.sin(angle) + y_center;

    ctx.lineTo(x, y);

    angle += (1 / 3) * (2 * Math.PI)
    x = r * Math.cos(angle) + x_center;
    y = r * Math.sin(angle) + y_center;

    ctx.lineTo(x, y);

    ctx.closePath();

    ctx.fill();
}

function processX() {
    // See my tech blog at http://tech.scargill.net 
    // Very simple example of getting mouse information from an HTML5 canvas for gauges etc.
    // values returned include degrees, x and y and finally distance from centre of the canvas

    // Get a "handle" on the canvas to work with
    theCanvas = document.getElementById("canvas");
    // define the centre point of the canvas
    cX = Math.floor(theCanvas.width / 2);
    cY = Math.floor(theCanvas.height / 2);
    // Get a "context"
    ctx2 = theCanvas.getContext("2d");

    // set up the font
    ctx2.font = "12px Helvetica";
    ctx2.textAlign = 'center';
    ctx2.fillStyle = '#8A8A8A';

    // the rest are functions - the "event listener" traps the mouse and displays results

    // Get the position of the mouse relative to the canvas
    function getMousePos(canvasDom, mouseEvent) {
        var rect = canvasDom.getBoundingClientRect();
        return {
            x: mouseEvent.clientX - rect.left,
            y: mouseEvent.clientY - rect.top
        };
    }

    // Here we get mouse coordinates and translate to a value
    // Good old basic algebra from school
    // Apparently the convention is  to start at 0 degrees on the right and go backwards
    // - someone should have told that to clock-makers
    theCanvas.addEventListener("mousemove", function(e) {
        var m = getMousePos(theCanvas, e);
        if (m.x < cX) {
            if (m.y < cY) pos = 180 + Math.floor(Math.atan((m.y - cY) / (cX - m.x)) * (180 / Math.PI));
            else pos = 180 + -Math.floor(Math.atan((m.y - cY) / (m.x - cX)) * (180 / Math.PI));
        } else {
            if (m.y < cY) pos = -Math.floor(Math.atan((cY - m.y) / (cX - m.x)) * (180 / Math.PI));
            else pos = 360 + Math.floor(Math.atan((cY - m.y) / (m.x - cX)) * (180 / Math.PI));
        }

        // and for good measure get the distance from the centre
        // You may, for example, only be interested in an arc area around the edge of the canvas
        tX = Math.abs(cX - m.x);
        tY = Math.abs(cY - m.y);
        tD = Math.floor(Math.sqrt(tX * tX + tY * tY));


        // print the result
        ctx2.clearRect(0, 0, canvas.width, canvas.height);
        ctx2.moveTo(cX, cY);
        ctx2.fillStyle = "#ff0044";
        ctx2.arc(cX, cY, 5, 0, 360, false);
        // ctx2.closePath();
        ctx2.fill();

        // some colour just for the sake of it
        var gradient = ctx2.createLinearGradient(0, 0, 150, 100);
        gradient.addColorStop(0, "rgb(255, 0, 128)");
        gradient.addColorStop(1, "rgb(105, 103, 255)");
        ctx2.fillStyle = gradient;

        ctx2.fillText("Mouse= " + pos + " degrees. (" + m.x + "x," + m.y + "y)" + " Dist; " + tD + "px", cX, 30);
    }, false);

}
