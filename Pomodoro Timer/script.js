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
