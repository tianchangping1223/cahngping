angular.module("myapp")
		.directive("pageTitle",pageTitle)
		.directive("reFresh",reFresh)
		.directive("autoTime",autoTime)
		.directive("singleClick",singleClick)
		.directive("singleTap",singleTap)

function pageTitle($rootScope){
	return {
			restrict:"A",
			link:function(scope,element){
				$rootScope.$on("$stateChangeStart",function(event,tostate){
					var tit="";
					tit+=tostate.data.title;
					element.text(tit)
				})		
			}
		}
}
//刷新
function reFresh($timeout){
	return {
			restrict:"A",
			link:function(scope,element,attr){
				/*if(scope.$last ===  true){
					$timeout(function(){
						scope.$emit("ngRepeatfinished");
					})
				}*/
				setTimeout(function(){
					var mian = new IScroll("#main",{
						click:true
					});
				},100);
			}
		}
}

//时间
function autoTime(){
	return {
		restrict:"A",
		link:function(scope,element){
			//时间调用
			setInterval(function(){
			var time = new Date(),
			hour = time.getHours(),
			minute = time.getMinutes(),
			second = time.getSeconds();
			if(hour<10){
				hour="0"+hour;
			}
			if(minute<10){
				minute="0"+minute;
			}
			if(second<10){
				second="0"+second;
			}
			$(".hour").text(hour);
			$(".minute").text(minute);
			$(".second").text(second)
			//console.log(hour+":"+minute+":"+second)
		},1000);
		}
	}
}
//点击
function singleClick(){
	return {
		restrict:"A",
		link:function(scope,element){
			$(".nav li,.nav a").on("tap",function(){
				$(this).addClass("bg").siblings().removeClass("bg");
			})
		}
	}
}
function singleTap(){
	return {
		restrict:"A",
		link:function(scope,element){
			$(".list a").on("tap",function(){
				$(this).addClass("bg").siblings().removeClass("bg");
				$(this).parent().siblings().find("a").removeClass("bg");
			})
		}
	}
}



