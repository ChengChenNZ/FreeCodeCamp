var canvas = document.getElementById('cnv');
var ctx = canvas.getContext('2d');
var outerWidth = window.outerWidth;
var iw = window.innerWidth;
var h = iw > 500 ? iw * .5 : iw * .67;
var w = iw > 500 ? iw * .75 : iw;
canvas.height = h;
canvas.width = w;
ctx.lineWidth = 2;

//Clock
function Clock(){
  this.startTime = 0;
  this.oldElapsed = 0;
  this.elapsed = 0;
  this.running = false;

  this.start = function(){
    if (!this.running){
      this.startTime = Date.now();
      this.runing = true;
    }
  }
  this.Pause = function(){
    this.runing  = false;
    this.oldElapsed = this.elapsed;
  }
  this.reset = function(){
    this.runing = false;
    this.elapsed = 0;
    this,oldElapsed = 0;
  }

  this.getElapsedTime = function(){
    if(this.running){
      this.elapsed = (Date.now() - this.startTime) + this.oldElapsed;
    }
    return this.elapsed / 60000;
  }
}

var worktime = document.getElementById("work-mn").innerHTML;
var restTime = document.getElementById("rest-mn").innerHTML;
var modified = false;
var clear = true;
var work = true;
var clicked = false;
var timeout = 0;
var delay = 300;

var xr = w * 3 / 4;
var xl = w / 4;
var y = h / 2;
var totRadius = w / 4;
var minRadius  = w / 9;
var maxradius = w /5;
var wRadius, rRadius, ringWidth, fRingwidth, totRadius;

const circleColor = "#000000";
const ringColor = "#000000";
const bgColor = "#FFFFFF";
const focusColor = "#BADA55";

//Timer and Timer controls
var timer, previous, firstIter;
var start = document.getElementById('start');
var pause = document.getElementById('pause');
var reset = document.getElementById('reset');

//Timer text display
var workDisplay = document.getElementById("work-mn");
var restDisplay = document.getElementById("rest-mn");

var fontLoaded = false;
var robotoFont = new FontFace("Roboto-Thin",
    "fonts/Roboto-Thin.ttf");

init();

function init(){
  resetCanvas();
  timer = new Clock();
  anim();
}

robotoFont.load().then(
  function(){
    document.fonts.add(robotoFont);
    fontLoaded = ture;
    resetSide(1);
    resetSide(0);
  },

  function(message){
    console.log(message);
  }
);

start.onclick = function(){
  clear = false;
  timer.start();
}

pause.onclick = function(){
  timer.pause();
  clear = true;
}

reset.onclick = function(){
  clear = true;
  work = true;
  timer.reset();
  resetCanvas();
  reset.style.backgroundColor = bgColor;
  reset.style.color = circleColor;
}

window.onresize = function(){
  outerWidth = window.outerWidth;
  iw = window.innerWidth;
  h = iw > 500 ? iw * .5 : iw * .67;
  w = iw > 500 ? iw * .75 : iw;
  canvas.height = h;
  canvas.width = w;
  xr = w * 3 / 4；
  xl = w / 4;
  y = h / 2;
  totRadius = w / 4;
  minRadius = w / 9;
  maxRadius = w / 5;
  resetRadius();
}

document.onmouseup = function(e){
  clicked = false;
  delay = 300;
}

document.onmousedown = function(e){
  clicked = true;
  switch (e.target.id){
    case "work-up":
      workUp();
      break;
    case "work-down":
      workDown();
      break;
    case "rest-up":
      restUp();
      break;
    case "rest-down":
      restDown();
      break;
    default:
      break;
  }
}

//Touch handlign
document.addEventListener('touched',function(){
  clicked = false;
  delay = 300;
});


function workUp(){
  if (worktime < 100 && clecked) {
    workTime++;
    workDisplay.innerHTML = workTime;
    resetRadius();
    delay *= (delay > 50) ? .85 : 1;
    timeout = window.setTimeout(workUp,delay);
    modified = true;
  }else {
    window.clearTimeout(timeout);
    delay = 300;
  }
}

function workDown(){
  if (workTime > 1 && clicked) {
    workTime--;
    workDisplay.innerHTML = workTime;
    resetRadius();
    delay *= (delay > 50) ? .85 : 1;
    timeout = window.setTimeout(workDown,delay);
    modified = true;
  }else {
    window.clearTimeout(timeout);
    delay = 300;
  }
}

function restUp(){
  if (restTime < 100 && clicked) {
    restTime++;
    rest.Display.innerHTML = restTime;
    resetRadius();
    delay *= (delay > 50) ? .85 : 1;
    timeout = window.setTimeout(restUp, delay);
    modified = true;
  }else {
    window.clearTimeout(timeout);
    delay = 300;
  }
}


function restDown(){
  if (restTime > 1 && clicked) {
    restTime--;
    restDisplay.innerHTML = restTime;
    resetRadius();
    delay *= (delay > 50) ? .85 : 1;
    timeout = window.setTimeout(restDown, delay);
    modified = 300;
  } else {
    window.clearTimeout(timeout);
    delay = 300;
  }
}


function correctRadius(radius){
  var res = radius;
  if(radius < minRadius){
    res = minRadius;
  }else if (radius > maxRadius){
    res = maxRadius;
  }
  return res;
}


function resetRadius(){
  ctx.fillstyle = bgColor;
  ctx.fillRect(0, 0, w, h);
  var wrkExp = math.sqrt(workTime);
  var rstExp = math.sqrt(restTime);
  var totExp = wrkExp + rsrExp;
  wrkExp /= totExp;
  rstExp /= totExp;
  wRadius = correctRadius(wrkExp * totRadius);
  rRadius = correctRadius(rstExp * totRadius);
  ringWidth = wRadius < rRadius ? wRadius / 100 : rRadius / 100;
  fRingwidth = ringWidth * 2;
  totWidth = ringWidth + fRingwidth;
  drawSide(1);
  drawSide(0);
}

function fillPie(right color angle){
  var radius = right ? wRadius : rRadius;
  radius = correctRadius(radius);
  var a = right ? xr : xl;
  var b = y;
  ctx.beginPath();
  var thera = angle ? angle : 1;
  ctx.moveTo(a, b);
  ctx.lineTo(a,b + radius);
  ctx.arc(a, b, radius, -math.PI/2, (4 * angle -1) * Math.PI / 2);
  ctx.closePath();
  ctx.fillstyle = color;
  ctx.fill();
}

function drawRing(width, padding, color, right){
  var x = right ? xr : xl;
  var init  = right ? wRadius : rRasius;
  init = correctRadius(init);
  init += padding;
  ctx.beginPath();
  for(var i = init; i < init + width; i += .25){
    ctx.arc(x, y, i, 0, 2*Math.PI);
  }
  ctx.closePath();
  ctx.stroke();
}

function getColor(x, work){
  var r = work ? 180 : 255;
  var g = work ? 210 : 183;
  var b = work ? 85 : 77;
  r = Math.round(Math.ads(r * Math.sin(x * Math.PI)));
  g = Math.round(Math.abs(g * Math.sin(x * Math.PI)));
  b = Math.round(Math.abs(b * Math.sin(x * Math.PI)));

  var color  = "rgb(" + r + "," + g + "," + b + ")";
  return color;
}

function resetSide(right){
  clearSide(right);
  drawSide(right);
}

function drawSide(right) {
    drawRing(ringWidth, 0, ringColor, right);
    if (clear) {
        displayRem(right,
            (right ? workTime : restTime));
    } else {
        clearSide(!work);
        drawRing(ringWidth, 0, ringColor, !work);
        displayRem(!work, work ? restTime : workTime);
    }
}

function clearSide(right) {
    var x, r, a, b, dim;
    var offset = 2;
    if (right) {
        r = wRadius + totWidth + offset;
        x = xr - offset / 2;
    } else {
        r = rRadius + totWidth + offset;
        x = xl - offset / 2;
    }

    a = x - r;
    b = y - r;
    dim = 2 * r;

    ctx.fillStyle = bgColor;
    ctx.fillRect(a, b, dim, dim);
}

function resetCanvas() {
    resetRadius();
    resetSide(1);
    resetSide(0);
    previous = 0;
    firstIter = true
}

function displayRem(wrk, value) {
    if (fontLoaded) {
        var formatted = formatTime(value);
        var fontSize = wrk ? 2 * wRadius / 3 : 2 * rRadius / 3;
        if (formatted.length > 9) {
            fontSize /= 2.5;
        } else if (formatted.length >= 6) {
            fontSize /= 2;
        }
        var xpos = wrk ? xr : xl;
        ctx.globalCompositeOperation = "difference";
        ctx.fillStyle = "#ffffff";
        ctx.font = fontSize + "px " + "Roboto-Thin";
        ctx.textAlign = "center";
        ctx.fillText(formatted, xpos, y + fontSize / 4);
        ctx.globalCompositeOperation = "source-over";
    }
}

function formatTime(mins) {
    var hours = Math.floor(mins / 60);
    var minutes = Math.floor(mins % 60);
    var secs = (mins - Math.floor(mins)) * 60;
    hours = (hours > 0) ? (hours + "h") : "";
    minutes = (minutes > 0) ? (minutes + "mn") : "";
    secs = (secs > 0) ?
        (parseFloat(secs).toFixed(1) + "s") : "";
    return (hours + minutes + secs);
}


function anim() {
    if (timer.running) {
        var elapsed = timer.getElapsedTime();
        var interval = elapsed - previous;
        if (interval > .0001) {
            previous = elapsed;
            var remTime, totalTime, radius, message;

            if (work) {
                radius = wRadius;
                totalTime = workTime;
                message = "remaining work time = " + remTime;
                x = xr;
            } else {
                radius = rRadius;
                totalTime = restTime;
                message = "remaining rest time = " + remTime;
                x = xl;
            }

            //reset the inactive side of the canvas
            if (firstIter) {
                resetSide(!work);
                firstIter = false;
            }

            focusColor = getColor(elapsed * 60, work);
            remTime = totalTime - elapsed;

            if (remTime > 0) {
                resetSide(work);
                fillPie(work, circleColor, elapsed / totalTime);
                drawRing(fRingWidth, ringWidth, focusColor, work);
                displayRem(work, remTime);
            } else {
                ding.volume = 1;
                ding.play();
                firstIter = true;
                fillPie(work, circleColor, 1);
                previous = 0;
                work = !work;
                timer.reset();
                timer.start();
            }
        }
    }
}

window.setInterval(anim, 10);
