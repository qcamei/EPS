app.controller('hycgJbxx',function($scope, $http){
	//var mark = "HYCG_HYCGSPLC";
	var b =new Base64();
    var ywbh = sessionStorage.getItem('ywbh');
    var lcbs = sessionStorage.getItem('lcbs');
    //�����ӿ�
    fjUrl =connectPath+'/jsonDataCtrl/showAnyfListj.do?callback=JSON_CALLBACK&xmid='+ywbh+'&lcbs='+lcbs;
    $http.jsonp(fjUrl).success(function(data){
      $scope.fjList = data;
      $scope.showname = data[0].SHOWNAME;
      console.log(b.encode($scope.showname))
      //����Ч��ȥ��
      $('.loader').fadeOut();
    });
        
	myUrl=connectPath+'/jsonDataCtrl/showHycg.do?callback=JSON_CALLBACK&xmid='+ywbh;
    //��ȡ����ɹ�����
    $http.jsonp(myUrl)
	.success(function (response) {
		console.log(response)
		//loading����
		iLoadJson.iLoad1=1;
		if(iLoadJson.iLoad1){
		    $('.loader').hide();
		}
        iLoadJson.iLoad0=1;//���سɹ�
		$scope.xmData=response.hycg_xm;//������Ϣ
		$scope.mgFile=function(path){
			var fileNation=path;
			try{
				fileNation=JSON.parse(fileNation);
				if(fileNation&&fileNation.flag=='success'){
						mgArr=fileNation.list;
						mgArr=JSON.stringify(mgArr);
						sessionStorage.setItem('fileimg',mgArr);
						window.location.href="../../../cgsp/file.html";
				}else{
						layer.alert('�ļ�����ʧ�ܣ��뵽PC�˲鿴');
				}
			}catch(e){
				layer.alert('�ļ�����ʧ�ܣ��뵽PC�˲鿴');
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