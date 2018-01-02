
function orbitalPeriod(arr) {
  var GM = 398600.4418;
  var earthRadius = 6367.4447;
  for(var i=0;i<arr.length;i++){
    var R=(arr[i].avgAlt+6367.4447);
    var T=R*2*Math.PI*Math.sqrt((R/GM));
    delete arr[i].avgAlt;
    arr[i].orbitalPeriod=Math.round(T);
  }

  console.log(arr);
  return arr;
}

orbitalPeriod([{name : "sputnik", avgAlt : 35873.5553}]);
