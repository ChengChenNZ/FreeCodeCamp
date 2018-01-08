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
var y =h / 2;
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
