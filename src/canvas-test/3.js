var canvas = document.getElementById('canvas'),
context = canvas.getContext('2d'),
drawingSurfaceImageData,
mousedown = {},
rubberBandRect = {},
dragging = false;

function windowToCanvas(x, y) {
var bbox = canvas.getBoundingClientRect();
return {
  x: x - bbox.left * canvas.width / bbox.width,
  y: y - bbox.top * canvas.height / bbox.height
};
}

function saveDrawingSurface() {
drawingSurfaceImageData = context.getImageData(0, 0, canvas.width, canvas.height);
}

function restoreDrawingSurface() {
context.putImageData(drawingSurfaceImageData, 0, 0);
}

function updateRubberbandRectangle(loc) {
rubberBandRect.width = Math.abs(loc.x - mousedown.x);
rubberBandRect.height = Math.abs(loc.y - mousedown.y);
if (loc.x > mousedown.x) {
  rubberBandRect.left = mousedown.x;
} else {
  rubberBandRect.left = loc.x;
}
if (loc.y > mousedown.y) {
  rubberBandRect.top = mousedown.y;
} else {
  rubberBandRect.top = mousedown.y;
}
}

function drawRubberbandShape(loc) {
context.beginPath();
context.moveTo(mousedown.x, mousedown.y);
context.lineTo(loc.x, loc.y);
context.stroke();
}

function updateRubberband(loc) {
updateRubberbandRectangle(loc);
drawRubberbandShape(loc);
}

function drawHorizontalLines(y) {
context.beginPath();
context.moveTo(0, y + 0.5);
context.lineTo(context.canvas.width, y + 0.5);
context.stroke();
}

function drawVerticalLine(x) {
context.beginPath();
context.moveTo(x + 0.5, 0);
context.lineTo(x + 0.5, context.canvas.height);
context.stroke();
}

function drawGuideWires(x, y) {
context.save();
context.strokeStyle = 'rgba(0,0,230,0.4)';
context.lineWidth = 0.5;
drawHorizontalLines(y);
drawVerticalLine(x);
context.restore();
}

canvas.onmousedown = function (e) {
var loc = windowToCanvas(e.clientX, e.clientY);
e.preventDefault();
saveDrawingSurface();
mousedown.x = loc.x;
mousedown.y = loc.y;
dragging = true;
};
canvas.onmousemove = function (e) {
var loc;
if (dragging) {
  e.preventDefault();
  loc = windowToCanvas(e.clientX, e.clientY);
  restoreDrawingSurface();
  updateRubberband(loc);
}
};

canvas.onmouseup = function (e) {
var loc = windowToCanvas(e.clientX, e.clientY);
restoreDrawingSurface();
updateRubberband(loc);
dragging = false;
}
