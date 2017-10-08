
//get the latitue and longitude 
$(document).ready(function(){
  var d;
  var loc;
  $.getJSON('https://ipinfo.io', function(d){
    loc = d.loc.split(","); 
    console.log(loc);
  $.getJSON('https://fcc-weather-api.glitch.me/api/current?lat=' + loc[0] +'&lon=' + loc[1],function(wd){
            console.log("Got the data",wd);
    var currentLocation = wd.name;
    var currentWeather = wd.weather[0].description;
    var currentTemp = wd.main.temp;
    var tempMax = wd.main.temp_max;
    var tempMin = wd.main.temp_min;
    var currentCounty = wd.sys.country;
    var thumbnail = wd.icon;
    console.log(currentWeather);
    
    $('#currentLocation').html(currentLocation);
    $('#currentCounty').html(currentCounty);
    $('#currentTemp').html(currentTemp);
    $('#currentWeather').html(currentWeather);
    $('#currentWeather').html(currentWeather);
    document.getElementById('thumbnail').src=
				wd.weather[0].icon;
            
    });
  })
})

