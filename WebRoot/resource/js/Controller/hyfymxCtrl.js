app.controller('hycgJbxx',function($scope, $http){
	//var mark = "HYCG_HYCGSPLC";
    var ywbh = sessionStorage.getItem('ywbh');
	hymxUrl=connectPath+'/jsonDataCtrl/showHycgmx.do?callback=JSON_CALLBACK&xmid='+ywbh;
    $http.jsonp(hymxUrl)
	.success(function (response) {
		//loading����
		 $('.loader').hide();
        iLoadJson.iLoad0=1;//���سɹ�
		$scope.fyData=response.hycg_fy;//������Ϣ
		console.log(response)
        $scope.selectLast = function (index) {//ng-repeatִ����Ĳ���
        	if(index == $scope.fyData.length-1){
	           fyTable();
		       ellip();
	        }
	    }
	}).error(function(){
		$('.loader').hide();
		layer.open({
			type: 1,
			area: ['200px', 'auto'], //���
			content: '<p style="line-height:80px;text-align:center;" onclick="location.reload();">����ʧ�ܣ��������</p>'
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