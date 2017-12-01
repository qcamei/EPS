app.controller("pbCtrl",function($scope,$http){
	if(!Load1){
		$('.loader').show();
		$http.get("../../../resource/js/pbJs/data.json").success(
			function(data){
				Load1=1;
				if(Load1){
					$('.loader').hide();
				}
				$scope.pfstep = data.pfbz;
				$scope.box = data.data;
				$scope.leng=$scope.pfstep.length;
	    		console.log(Load1)
				$scope.begin=function(index){				
					if(index==$scope.pfstep.length-1){	
						thisFn.step1.itemEvery();
						thisFn.step1.pfsmKeyup();
						thisFn.step2.checkboxClick(".pb-box");
					}
					
				};
		
				$scope.nextFn=function(){
						$scope.begin=null;
						thisFn.step1.next();					
				};
				
				$scope.preFn=function(){
					thisFn.step1.pre();
				};
				
				$scope.none=function(index){
					if(index==0){
						return "none";
					}else {
						return "checkbox"
					}
				};
				
				
			}
		).error(function(){
			$('.loader').hide();
			layer.alert('º”‘ÿ≥ˆ¥Ì¿≤¿≤');
		});
	}

//	$scope.resultFn=function(){
//		$scope.begin=null;
//		if(!Load2){
//			$('.loader').show();
//			var url="../../../resource/js/pbJs/data2.json";
//			$http.get(url).success(
//				function(data){
//					Load2=1;
//					if(Load2){
//						$('.loader').hide();
//					};
//					$scope.pfend=data.pfend;
//					$scope.attr=function(index){
//						if(index==$scope.pfend.length-1){
//							$(".jdt-inner").each(function(index){
//								$scope.width=$(this).attr("width");
//								$(this).animate({
//									width: $scope.width
//								},1000);
//							});
//							
//							
//						}
//						
//					};
//					
//				}
//			).error(function(){
//				$('.loader').hide();
//				layer.alert('º”‘ÿ≥ˆ¥Ì¿≤¿≤');
//			});
//		}
//	};
	
	
});

