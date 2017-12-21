
function sym(args) {
  var arr = [];
  for (var i = 0; i < arguments.length; i++){
    arr.push(arguments[i]);
  }
  
  //给数组的每一项去重
  for(var j =0; j < arr.length; j++){
    for (var k=0; k <arr[j].length; k++){
      for(var m = k + 1; m <arr[j].length; m++){
        if(arr[j][k] === arr[j][m]){
          console.log(m);
          arr[j].splice(m,1);
          m -= 1;
          k -= 1;
        }
      }
    }
  }
  return arr.reduce(function(x,y){
    return diff(x,y);
  });
  
  //两两数组去重
  function diff(arr1,arr2){
    for(var i = 0; i < arr1.length; i++){
      for(var j = 0; j < arr2.length; j++){
        if(arr1[i] === arr2[j]){
          arr1.splice(i,1);
          arr2.splice(j,1);
          i -= 1;
          break;
        }
      }
    }
    return arr1.concat(arr2);
  }
}

sym([1, 2, 3], [5, 2, 1, 4]);
