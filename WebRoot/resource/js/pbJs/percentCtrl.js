app.controller("percentCtrl",function($scope,$http){
	var url="../../../resource/js/pbJs/data2.json";
	$scope.resultFn=function(){
		$scope.aa=null;
		$scope.begin=null;
		
		if(!Load2){
			$('.loader').show();
			$http.get(url).success(
				function(data){
					Load2=1;
					if(Load2){
						$('.loader').hide();
					};
					$scope.pfend=data;
					console.log($scope.pfend);
					$scope.attr=function(index){
						if(index==$scope.pfend.length-1){
							$(".jdt-inner").each(function(index){
								$scope.width=$(this).attr("width");
								$(this).animate({
									width: $scope.width
								},1000);
							});								
						}	
					};
				}
			).error(function(){
				$('.loader').hide();
				layer.alert('º”‘ÿ≥ˆ¥Ì¿≤¿≤');
			});
		}
	};
	
	
});

