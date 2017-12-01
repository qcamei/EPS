app.controller('hycgJbxx',function($scope, $http){
	//var mark = "HYCG_HYCGSPLC";
    var ywbh = sessionStorage.getItem('ywbh');
	hymxUrl=connectPath+'/jsonDataCtrl/showHycgmx.do?callback=JSON_CALLBACK&xmid='+ywbh;
    $http.jsonp(hymxUrl)
	.success(function (response) {
		//loading控制
		 $('.loader').hide();
        iLoadJson.iLoad0=1;//加载成功
		$scope.fyData=response.hycg_fy;//费用信息
		console.log(response)
        $scope.selectLast = function (index) {//ng-repeat执行完的操作
        	if(index == $scope.fyData.length-1){
	           fyTable();
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

function ellip(){
		$('.ellipTable td').each(function(i){
			var $This=$(this);
			var outerH=$This.find('em').height();
			var innerH=$This.find('span').height();
			if(innerH>outerH){
				var innerH=$This.find('span').height();
				$This.addClass('ellip');
			}
		})
}
function fyTable(){
		$('.fyTable .tr-zong td').attr('colspan',10);
}