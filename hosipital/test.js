//交换   分支
var a = 0;
var b = 1;
a = [a,b=a][1]

var arr = [1,2,3,4,4,3,2,1,1,2]
function unique(){
	var n = [];
	var obj = {};
	if(!obj[arr[i]]){
		n.push([arr[i]]);
		obj[arr[i]]=1;
	}
	return n;
}