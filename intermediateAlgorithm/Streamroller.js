
function steamrollArray(arr) {
  // I'm a steamroller, baby
  var flattenedArray = [];
  
  var flatten = function(arg){
    if(!Array.isArray(arg)){
      flattenedArray.push(arg);
    }
    else{
      for (var a in arg){
        flatten(arg[a]);
      }
    }
  };
  // call the function for each element  inther  array
  arr.forEach(flatten);
  return flattenedArray;
}

steamrollArray([1, [2], [3, [[4]]]]);
