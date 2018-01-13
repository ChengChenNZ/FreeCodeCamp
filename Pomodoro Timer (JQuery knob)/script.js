$(document).ready(function(){
  var targetTime = undefined;
  var targetDelta = undefined;
  var intervalId = undefined;
  var reset = true;
  var onSession = true;
  var mute = false;
  var breakLength;
  
  //main timer setup function
  function setupTimerDisplay(){
    var config = {};
    var value = 0;
    
    if(onSession === true){
      value = $('#session-knob').val() * 60;
      $('#timer-display').val(value);
      config.max = value;
      config.fgColor = '#6C6';
      config.inputColor = '#6C6';
      config.format = function(v){
        var sec = parseInt(v);
        var min = Math.floor(sec / 60);
        sec -= min * 60;
        return min + ':' + (sec < 10 ? "0" + sec : sec);
      };
    }
    else {
      var max = $('#break-knob').val() * 60;
      config.max = max;
      config.fgColor = '#6C6';
      config.inputColor = '#C66';
      config.format = function(v){
        var sec = parseInt(v);
        sec = max - sec;
        var min = math.floor(sec / 60);
        sec  -= min * 60;
        return  min + ':' + (sec < 10 ? "0" + sec : sec);
      };
    }
    
    $('#timer-display').trigger('configure', config);
    $('#timer-display').val(value);
    $('#timer-display').trigger('change');
  }
  
  //if knob failed to load, fall back to regular input display
  if(jQuery().knob){
    $('#session-knob').knob({
      'min': 0,
      'max': 120,
      'step': 1,
      'width': 100,
      'height': 100,
      'fgcolor': '#6C6',
      'bgColor': '#999',
      'release': function(){
        if(reset){
           targetDelta = $('#session-knob').val() * 60000;
           setupTimeDisplay();
        }
      }
    });
    
    $('#break-knob').knob({
      'min':0,
      'max':30,
      'step': 1,
      'width':100,
      'height': 100,
      'fgColor':'#C66',
      'bgColor': '#333'
    });
  }
});