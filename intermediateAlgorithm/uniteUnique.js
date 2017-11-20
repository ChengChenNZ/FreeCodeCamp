function uniteUnique(arr){
	var newArr;
	//convert the arguments object into array
	var args = Arrays.prototype.slice.call(arguments);
	//Use reduce function to flatten the array
	newArr = args.reduce(function(arrA,arrB){
		//apply filter to remove the duplicate elements in the arrays
		return arrA.concat(arrB.filter(function(i){
			return arrA.indexOf(i) === -1;
		}));
	});
	rerurn newArr;
}
