angular.module("myapp")
	.controller("data",data)
	.controller("sub",sub)
	.controller("render",render)


//渲染
function data($scope,$http){
	/*$scope.$on("ngRepeatFinished",function(ngRepeatFinishedEvent){
		
	})*/
	$http.post("data/data.json")
		.success(function(res){
			$scope.data=res;
		})
}

//判断验证
function sub($scope,$location,apiService){
	$scope.submit = function(){
	apiService.login('http://localhost:3001/login',{
		username:$scope.username,
		userpwd:$scope.userpwd
	},"jsonp")
	.success(function(res){
			if(res.code == 0){
				$location.url('/index')
			}
	})
	}
}

//渲染我的
function render($scope,$http){


}




