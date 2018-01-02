
function pairwise(arr, arg) {
  var arr2 = arr;
  var count = 0;

  for(var j = 0; j<arr.length;j++){
    for(var i = j+1; i< arr2.length; i++){
      if(arr[j] + arr[i] == arg){
        count += i + j;
        arr[i] = "false";
        arr[j] = "false";
      }
    }
  }
  console.log(count);
  return count;
}

pairwise([1,4,2,3,0,5], 7);
