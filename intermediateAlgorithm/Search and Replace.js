function myReplace(str, before, after) {
  var index = str.indexOf(before);
  if(str[index] === str[index].toUpperCase()){
    after = after.charAt(0).toUpperCase() + after.slice(1);
  }
  //now replace /the original str with the edited one
  str = str.replace(before,after);
  return str;
}

myReplace("A quick brown fox jumped over the lazy dog", "jumped", "leaped");