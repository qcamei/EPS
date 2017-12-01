
app.controller('lxcgController',function($scope, $http){
    var ywbh = sessionStorage.getItem("ywbh");
    
    //附件接口
    var lcbs = sessionStorage.getItem('lcbs');
    fjUrl =connectPath+'/jsonDataCtrl/showAnyfListj.do?callback=JSON_CALLBACK&xmid='+ywbh+'&lcbs='+lcbs;
    $http.jsonp(fjUrl).success(function(data){
      $scope.fjList = data;
      $scope.showname = data[0].SHOWNAME;
      //加载效果去除
      $('.loader').fadeOut();
    });
   	
    lxcgUrl=connectPath+'/jsonDataCtrl/showLxcg.do?callback=JSON_CALLBACK&xmid='+ywbh;

    //获取采购内容详情
    $http.jsonp(lxcgUrl)
	.success(function (response) {
		//loading控制
		iLoadJson.iLoad1=1;
		if(iLoadJson.iLoad1){
		    $('.loader').hide();
		}
        iLoadJson.iLoad0=1;//加载成功
		$scope.listdata=response.lxcg_xm;//基本信息
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
		layer.open({
			type: 1,
			area: ['200px', 'auto'], //宽高
			content: '<p style="line-height:80px;text-align:center;" onclick="location.reload();">加载失败，点击重试</p>'
		});
	});
});
