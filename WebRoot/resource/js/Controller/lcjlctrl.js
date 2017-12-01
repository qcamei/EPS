// 流程记录
app.controller('lcjlController',function($scope,$http){
	$('.loader').show();
	var ywbh = sessionStorage.getItem("ywbh");
	lcjlUrl=connectPath+"/undoCtrl/getLcjlList.do?callback=JSON_CALLBACK&ywbh="+ywbh;
	$scope.lcjlFn=function(){
		if(!iLoadJson.iLoad2){
			$('.loader').show();
			$http.jsonp(lcjlUrl)
			.success(function (responses){
				iLoadJson.iLoad2=1;
				//加载效果去除
				if(iLoadJson.iLoad2){
				    $('.loader').hide();
				}
				$scope.lcjldata=responses;//流程信息
				console.log(responses);
				$scope.spsj=function(sj){
					if(sj){
						sj=''+sj;
					 	sj=sj.replace(/([0-9]{4})([0-9]{2})([0-9]{2})([0-9]{2})([0-9]{2})([0-9]{2})/,"$1-$2-$3 $4:$5");
					}else{
						sj='';
					}
					return sj;
				};
		
				$scope.spzt=function(zt){
					if(zt==1){
						return 'done';
					}else if(zt==0){
						return 'doing';
					}else if(zt==-1){
						return 'undo';
					}
				}
				console.log(responses);
			}).error(function(){
					$('.loader').hide();
					layer.alert('加载出错啦！');
		//  		layer.open({
		//  			type: 1,
		//  			area: ['200px', 'auto'], //宽高
		//  			content: '<p style="line-height:80px;text-align:center;" onclick="location.reload();">加载失败，点击重试</p>'
		//  		});
			});
		}
		return;
	};

});