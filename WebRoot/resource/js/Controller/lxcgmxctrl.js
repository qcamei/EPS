
app.controller('lxcgController',function($scope, $http){
    var ywbh = sessionStorage.getItem("ywbh");
	lxcgmxUrl=connectPath+'/jsonDataCtrl/showLxcgmx.do?callback=JSON_CALLBACK&xmid='+ywbh;
    //	$http.get("../../../../data/data.json")
    
    //��ȡ�ɹ���������
    $http.jsonp(lxcgmxUrl)
	.success(function (response) {
		//loading����
	    $('.loader').hide();
        iLoadJson.iLoad0=1;//���سɹ�
		$scope.lxcgdata=response.lxcg_nr;//���ǲɹ�������Ϣ
		console.log(response);
        $scope.selectLast = function (index) {//ng-repeatִ����Ĳ���
        	if(index == $scope.lxcgdata.length-1){
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
