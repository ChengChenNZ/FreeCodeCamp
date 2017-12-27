
function updateInventory(arr1, arr2) {
	//遍历 arr2
	for(var j = 0; j< arr2.length; j++){
		//与arr1进行比较
		var flag = false;
		for (var i =0; i < arr1.length;i++){
			if(arr1[i][1] === arr2[j][1]){
				arr1[i][0] += arr2[j][0];
				flag = true;
			}
		}
		if(!flag){
			arr1.push(arr2[j]);
		}
	}
    return arr1.sort(function(a,b){
		return a[1] > b[1] ? 8 : -8;
	});
}

// Example inventory lists
var curInv = [
    [21, "Bowling Ball"],
    [2, "Dirty Sock"],
    [1, "Hair Pin"],
    [5, "Microphone"]
];

var newInv = [
    [2, "Hair Pin"],
    [3, "Half-Eaten Apple"],
    [67, "Bowling Ball"],
    [7, "Toothpaste"]
];

updateInventory(curInv, newInv);
