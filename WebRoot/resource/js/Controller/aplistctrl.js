/* 我的代办列表数据处理 */
var app=angular.module('myApp', []);
app.controller('applyController', function($scope, $http) {
    myUrl=connectPath+'/applyCtrl/getApplyListData.do?&callback=JSON_CALLBACK&czyid='+czyid;
    oStorage = window.sessionStorage;
    $http.jsonp(myUrl).success(
    	function (data) {
            // alert("ni");
    		$scope.applyList=data;
    		console.log(data);
            //加载效果去除
            $('.loader').hide();
       		iLoadJson.iLoad0=1;//加载成功
       		
       		//判断是否显示“列表页没有内容”信息提示
       		if($scope.applyList.length){
 	       		$scope.show='hidden';
       		}else{
       			$scope.show='show';
       		}
    		$scope.index=function(index){//ng-repeat遍历完成后的操作
	    		if(index == $scope.applyList.length-1){
        			$('.listBox').show();
	    			stretchFn();//swiper的上下拉动留白
	    		}
    		};
    		//lcbs-流程标识判断是什么类型 ;ywbh--项目的主ID;办理方式--用于判断是否为起草环节
    		$scope.turnToSp = function(lidata){
    		    sessionStorage.setItem("ywbh",lidata.ywbh);
				sessionStorage.setItem('cgfsmc',lidata.xmlx); //获取采购方式
				sessionStorage.setItem('ywmc',lidata.xmmc);//获取任务实例Id
				sessionStorage.setItem('lcbs',lidata.lcbs);//获取任务实例Id
    		    if(lidata.xmlx == '会议采购'){//暂时根据项目类型判断，实际要根据流程名称判断，如下switch
    		          
    		            window.location.href="../../cgsp/apply/hycg/index.html";   
    		    }else if(lidata.xmlx == '零星采购'){
    		           
    		            window.location.href = "../../cgsp/apply/lxcg/index.html";
    		      
    		    }else if(lidata.xmlx == '项目报批'){
    		            
    		            window.location.href = "../../cgsp/apply/zzcgwjbp/index.html";
    		    } 
    		    /*
				switch (lcbs){//根据项目类型判断进入哪个页面
					case 'HYCG_HYCGSPLC'://会议采购
						window.location.href='hycg/index.html';
						break;
					case 'XMGL_LXCGCGNR'://零星采购
						window.location.href='lxcg/index.html';
						break;
					case 'HT_HTBZ'://合同编制
            			layer.alert('Hi,合同办理暂未上线<br>请移步至PC端处理~');
						break;
					case 'ZZCG_WJBPSPLC'://中支采购
					var mark = "ZZCG_WJBPSPLC";
						window.location.href='zzcgwjbp/index.html';
						break;
					case 'XMGL_CGWJSPJH'://采购文件审批
					var mark = "XMGL_CGWJSPJH";
						window.location.href='cgwjsp/index.html';
						break;  
					case 'XMGL_CGGGSP'://采购公告审批
					var mark = "XMGL_CGGGSP";
						window.location.href='cgggsp/index.html';
						break;
						
					default://其他
						layer.alert('Hi,合同办理暂未上线<br>请移步至PC端处理~');
						break;	              					
				}
				*/
    		}
    		$scope.time=function(time){
    			var time=''+time;
    			time=time.substring(0,16);
    			return time;
    		}
    	}
    ).error(
    	function(){
    		$('.loader').hide();
    		if(!navigator.onLine){
 	        	layer.alert('请检查网络');
    		}else{
	    		layer.open({
	    			type: 1,
	    			area: ['200px', 'auto'], //宽高
	    			content: '<p style="line-height:80px;text-align:center;" onclick="location.reload();">加载失败，点击重试</p>'
	    		});
	    	}
    	}
    );
});