app.controller('xmbpController',function($scope, $http){
	var mark = "ZZCG_WJBPSPLC";
	var b =new Base64();
	//alert(b);
    var ywbh = sessionStorage.getItem("ywbh");
     
    //�����ӿ�
    var lcbs = sessionStorage.getItem('lcbs');
    fjUrl =connectPath+'/jsonDataCtrl/showAnyfListj.do?callback=JSON_CALLBACK&xmid='+ywbh+'&lcbs='+lcbs;
    $http.jsonp(fjUrl).success(function(data){
      $scope.lxwjList=data[0].lxwj;
      $scope.cgjgwjList = data[0].cgjgwj;
      $scope.qtfjList = data[0].qtfj;//
      console.log(b.encode(($scope.lxwjList[0].SHOWNAME)))
      //����Ч��ȥ��
      $('.loader').fadeOut();
    });
	xmbpUrl=connectPath+"/jsonDataCtrl/showXmbp.do?callback=JSON_CALLBACK&xmid="+ywbh;
    //��ȡ����ɹ�����(������Ϣ)
    $http.jsonp(xmbpUrl)
	.success(function (response) {
		iLoadJson.iLoad1=1;
		//����Ч��ȥ��
		if(iLoadJson.iLoad1){
		    $('.loader').fadeOut();
		}
        iLoadJson.iLoad0=1;//���سɹ�
		$scope.listdata=response;//������Ϣ
		console.log(response);
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
			layer.alert('���س�������');
//  		layer.open({
//  			type: 1,
//  			area: ['200px', 'auto'], //���
//  			content: '<p style="line-height:80px;text-align:center;" onclick="location.reload();">����ʧ�ܣ��������</p>'
//  		});
	});
});

