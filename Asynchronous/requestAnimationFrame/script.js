// script.js

let x, y, dx, dy, ctx, paddlex, paddleh, paddlew, bricks, g_stop, rightDown, leftDown;

const WIDTH = 300;
const HEIGHT = 300;
const NROWS = 5;
const NCOLS = 5;
const BRICKWIDTH = WIDTH / NCOLS - 1;
const BRICKHEIGHT = 15;
const PADDING = 1;

x = 150;
y = 150;
dx = 2;
dy = 4;
paddlex = WIDTH / 2;
paddleh = 10;
paddlew = 75;
g_stop = false;
rightDown = false;
leftDown = false;

window.addEventListener('DOMContentLoaded', () => {
  document.addEventListener('keydown', onKeyDown);
  document.addEventListener('keyup', onKeyUp);
  ctx = document.getElementById('canvas').getContext('2d');
  window.requestAnimationFrame(draw);
});

function circle(x, y, r) {
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2, true);
  ctx.closePath();
  ctx.fill();
}

function rect(x, y, w, h) {
  ctx.beginPath();
  ctx.rect(x, y, w, h);
  ctx.closePath();
  ctx.fill();
}

function clear() {
  ctx.clearRect(0, 0, WIDTH, HEIGHT);
}

//set rightDown or leftDown if the right or left keys are down
function onKeyDown(evt) {
  if (evt.keyCode == 39) rightDown = true;
  else if (evt.keyCode == 37) leftDown = true;
}

//and unset them when the right or left key is released
function onKeyUp(evt) {
  if (evt.keyCode == 39) rightDown = false;
  else if (evt.keyCode == 37) leftDown = false;
}

function draw() {
  if (g_stop) {
    return;
  } else {
    window.requestAnimationFrame(draw);
  }
  clear();
  circle(x, y, 10);

  //move the paddle if left or right is currently pressed
  if (rightDown) paddlex += 5;
  else if (leftDown) paddlex -= 5;
  rect(paddlex, HEIGHT - paddleh, paddlew, paddleh);

  if (x + dx > WIDTH || x + dx < 0) dx = -dx;

  if (y + dy < 0) {
    dy = -dy;
  } else if (y + dy > HEIGHT) {
    if (x > paddlex && x < paddlex + paddlew) {
      dy = -dy;
    } else {
      g_stop = true;
    }
  }

  x += dx;
  y += dy;
}
