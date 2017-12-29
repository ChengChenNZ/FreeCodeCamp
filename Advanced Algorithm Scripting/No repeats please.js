  function permAlone(str){
    //create a regex to match repeated consecutive characters
    var regex = /(.)\1/g;
    // split the string into an array of characters;
    var arr = str.split('');
    var permutations = [];
    var tmp;

    //return 0 if str contains same characters;
    if(str.match(regex) !== null && str.match(regex)[0] === str) return 0;

    function swap(index1,index2){
      tmp = arr[index1];
      arr[index1] = arr[index2];
      arr[index2] = tmp;
    }

    //generate arrays of permutations using the algorithm
    function generate(int){
      if(int === 1){
        //make sure to join the characters as we create the permutation arrays
        permutations.push(arr.join(''));
      }else {
        for(var i=0; i != int; ++i){
          generate(int - 1);
          swap(int % 2 ? 0 : i, int - 1)
      }
    }
  }

  generate(arr.length

  //filter the array of the repeated permutations
  var filtered = permutation.filter(function(){
    return !string.match(regex);
  });

  //return how many have no repetitions
  return filtered.length;
}

//test here
perAlone('aab')
