app.controller('xmbpController',function($scope, $http){
	var mark = "ZZCG_WJBPSPLC";
	var b =new Base64();
	//alert(b);
    var ywbh = sessionStorage.getItem("ywbh");
     
    //附件接口
    var lcbs = sessionStorage.getItem('lcbs');
    fjUrl =connectPath+'/jsonDataCtrl/showAnyfListj.do?callback=JSON_CALLBACK&xmid='+ywbh+'&lcbs='+lcbs;
    $http.jsonp(fjUrl).success(function(data){
      $scope.lxwjList=data[0].lxwj;
      $scope.cgjgwjList = data[0].cgjgwj;
      $scope.qtfjList = data[0].qtfj;//
      console.log(b.encode(($scope.lxwjList[0].SHOWNAME)))
      //加载效果去除
      $('.loader').fadeOut();
    });
	xmbpUrl=connectPath+"/jsonDataCtrl/showXmbp.do?callback=JSON_CALLBACK&xmid="+ywbh;
    //获取会议采购详情(基本信息)
    $http.jsonp(xmbpUrl)
	.success(function (response) {
		iLoadJson.iLoad1=1;
		//加载效果去除
		if(iLoadJson.iLoad1){
		    $('.loader').fadeOut();
		}
        iLoadJson.iLoad0=1;//加载成功
		$scope.listdata=response;//基本信息
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
						layer.alert('文件加载失败，请到PC端查看');
				}
			}catch(e){
				layer.alert('文件加载失败，请到PC端查看');
			}
		}
		
	}).error(function(){
			$('.loader').hide();
			layer.alert('加载出错啦！');
//  		layer.open({
//  			type: 1,
//  			area: ['200px', 'auto'], //宽高
//  			content: '<p style="line-height:80px;text-align:center;" onclick="location.reload();">加载失败，点击重试</p>'
//  		});
	});
});

