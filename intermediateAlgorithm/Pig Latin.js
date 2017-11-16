function translatePigLatin(str) {
  var pigLatin = "";
  var regex = /[aeiou]/gi;
  
  //check if the first character is a vowel
  if(str[0].match(regex)){
    pigLatin = str + 'way';
  }else{
    // find how many consonants before the fruit vowel.
    var  vowelIndice = str.indexOf(str.match(regex)[0]);
    
    //take the string from the first  vowel to the last char
    // then add the consonant that were previously omitted and add the ending
    
    pigLatin = str.substr(vowelIndice) + str.substr(0,vowelIndice) + 'ay';
  }
  return pigLatin;
}

translatePigLatin("consonant");