app.controller('hycgJbxx',function($scope, $http){
	//var mark = "HYCG_HYCGSPLC";
	var b =new Base64();
    var ywbh = sessionStorage.getItem('ywbh');
    var lcbs = sessionStorage.getItem('lcbs');
    //附件接口
    fjUrl =connectPath+'/jsonDataCtrl/showAnyfListj.do?callback=JSON_CALLBACK&xmid='+ywbh+'&lcbs='+lcbs;
    $http.jsonp(fjUrl).success(function(data){
      $scope.fjList = data;
      $scope.showname = data[0].SHOWNAME;
      console.log(b.encode($scope.showname))
      //加载效果去除
      $('.loader').fadeOut();
    });
        
	myUrl=connectPath+'/jsonDataCtrl/showHycg.do?callback=JSON_CALLBACK&xmid='+ywbh;
    //获取会议采购详情
    $http.jsonp(myUrl)
	.success(function (response) {
		console.log(response)
		//loading控制
		iLoadJson.iLoad1=1;
		if(iLoadJson.iLoad1){
		    $('.loader').hide();
		}
        iLoadJson.iLoad0=1;//加载成功
		$scope.xmData=response.hycg_xm;//基本信息
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
		layer.open({
			type: 1,
			area: ['200px', 'auto'], //宽高
			content: '<p style="line-height:80px;text-align:center;" onclick="location.reload();">加载失败，点击重试</p>'
		});
	});
});