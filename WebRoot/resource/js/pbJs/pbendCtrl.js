app.controller("pbendCtrl",function($scope,$http){
	var url="../../../resource/js/pbJs/data3.json";
	$('.loader').show();
	$http.get(url).success(
		function(data){
			Load3=1;
			if(Load3){
				$('.loader').hide();
				$scope.enddata=data;
				$scope.aa=function(index){
					if(index== $scope.enddata['company'].length-1){
						thisFn.step3.pfresultFn();
						thisFn.step3.everycompanyFn($(".every-company"));
					}
				}
			}
			
				
				
			
			
	    }
	).error(function(){
		$('.loader').hide();
		layer.alert('º”‘ÿ≥ˆ¥Ì¿≤¿≤');
	});
	
});

