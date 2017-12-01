
app.controller('lxcgController',function($scope, $http){
    var ywbh = sessionStorage.getItem("ywbh");
	lxcgmxUrl=connectPath+'/jsonDataCtrl/showLxcgmx.do?callback=JSON_CALLBACK&xmid='+ywbh;
    //	$http.get("../../../../data/data.json")
    
    //获取采购内容详情
    $http.jsonp(lxcgmxUrl)
	.success(function (response) {
		//loading控制
	    $('.loader').hide();
        iLoadJson.iLoad0=1;//加载成功
		$scope.lxcgdata=response.lxcg_nr;//零星采购内容信息
		console.log(response);
        $scope.selectLast = function (index) {//ng-repeat执行完的操作
        	if(index == $scope.lxcgdata.length-1){
                ellip();
	        }
	    }
	}).error(function(){
		$('.loader').hide();
		layer.open({
			type: 1,
			area: ['200px', 'auto'], //宽高
			content: '<p style="line-height:80px;text-align:center;" onclick="location.reload();">加载失败，点击重试</p>'
		});
	});
});
