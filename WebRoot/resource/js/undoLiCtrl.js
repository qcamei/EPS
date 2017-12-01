
var app = angular.module('myApp', []);
app.controller('JsonController', function($scope,$http,$filter) {
    myUrl =connectPath+'/undoCtrl/getUndoListData.do?callback=JSON_CALLBACK&czyid='+czyid;
    oStorage = window.sessionStorage;
    $http.jsonp(myUrl).success(
         function(data){
            $scope.undoList = data;
            //加载效果去除
          	$('.loader').hide();
          	iLoadJson.iLoad0=1;//加载成功
       		//判断是否显示“列表页没有内容”信息提示
       		if($scope.undoList.length){
 	       		$scope.show='hidden';
       		}else{
       			$scope.show='show';
       		}
          	$scope.timeStr = function (lidata,index) {//ng-repeat执行完的操作
 	      		//pc图标显示
		      		if(lidata.LCBS=='HYCG_HYCGSPLC'
		      			||lidata.LCBS=='XMGL_LXCGCGNR'
		      			||lidata.LCBS=='ZZCG_WJBPSPLC'
		      			||lidata.LCBS=='XMGL_CGWJSPJH'
		      			||lidata.LCBS=='XMGL_CGGGSP'
		      			||lidata.LCBS=='XMGL_CGWJSPJH'
		      			||lidata.LCBS=='XMGL_JJDSP'
		      			||lidata.LCBS=='XMGL_JGGGSP'
		      			||lidata.LCBS=='XMGL_XJDSP'
		      			||lidata.LCBS=='XMGL_TPJLSPLC'
		      			||lidata.LCBS=='SAP_CGDDYWLC'
		      			||lidata.LCBS=='SAP_GYSBJSPLC'
		      			||lidata.LCBS=='HT_ZFSQ')//HT_HTBZ
		      		{
		      			if(lidata.SFYDSP == 1 || lidata.BLFS == 0){
		      				$('.pc').eq(index).show();
          					lidata.PC=2;
		      				
		      			}else{
		      				$('.pc').eq(index).hide();
		      				lidata.PC=1;
		      			}
		      		}else{
		      			$('.pc').eq(index).show();
          				lidata.PC=2;
		      				
		      		}
		      		//ＩＴ设备供应商报价审批：在'供应商报价'环节不支持移动
		      		if(lidata.LCBS=='SAP_GYSBJSPLC'&&lidata.HJMC=='供应商报价'){
		      			$('.pc').eq(index).show();
          				lidata.PC=2;
		      		}
		      		//ＩＴ设备订单申请审批：在'IT部门配置确认'环节不支持移动，不支持上传附件等操作
 		      		if(lidata.LCBS=='SAP_CGDDYWLC'&&lidata.HJMC=='IT部门审批'){
		      			$('.pc').eq(index).show();
          				lidata.PC=2;
		      		}
   					$scope.toUrl=function(lidata,index){//点击跳转的操作
						//是否移动审批“SFYDSP”如果为1，则表示需要去PC端处理，或者办理方式“BLFS”如果为0，表示起草环节，则也需要去PC端处理
						if(lidata.SFYDSP == 1 || lidata.BLFS == 0|| lidata.PC == 2){
                 			layer.alert('Hi,该处理不支持,请移步至PC端处理~');
          				}else{
          					//获取采购方式：lidata.LCBSMC
   						oStorage.setItem('cgfsmc',lidata.LCBSMC); //获取采购方式
						oStorage.setItem('ywbh',lidata.YWBH);//获取项目id(业务编号)
						oStorage.setItem('rwslid',lidata.ID);//获取任务实例Id
						oStorage.setItem('ywmc',lidata.LCSLMC);//获取任务实例Id
						oStorage.setItem('lcbs',lidata.LCBS);//获取任务实例Id
      					switch (lidata.LCBS){
      						case 'HYCG_HYCGSPLC'://会议采购
      							window.location.href='hycg/index.html';
     							break;
      						case 'XMGL_LXCGCGNR'://零星采购
      							window.location.href='lxcg/index.html';
      							break;
      						case 'HT_HTBZ'://合同编制
                    			layer.alert('Hi,该功能暂未上线<br>请移步至PC端处理~');
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
      						case 'XMGL_JJDSP'://电子竞价采购审批
      						var mark = "XMGL_JJDSP";
      							window.location.href='dzjjcg/index.html';
      							break;
      						case 'XMGL_JGGGSP'://结果公告审批
      						//var mark = "XMGL_JGGGSP";
      							window.location.href='jgggsp/index.html';
      							break;
      						case 'XMGL_XJDSP'://竞争性报价审批
      						//var mark = "XMGL_JGGGSP";
      							window.location.href='jzbjdsp/index.html';
      							break;
      							
       						case 'XMGL_TPJLSPLC'://谈判记录审批
      							window.location.href='tpjlsp/index.html';
      							break;
      							
       						case 'GYSXT_LC'://协同审批
      							window.location.href='xtsp/index.html';
      							break;
      							
       						case 'SAP_CGDDYWLC'://IT设备订单申请审批
      							window.location.href='itsbsqdd/index.html';
      							break;
      						
      						case 'SAP_GYSBJSPLC'://IT设备供应商报价审核
      							window.location.href='itsbsqgysbj/index.html';
     							break;
     							
      						case 'HT_ZFSQ'://IT设备供应商报价审核
      							window.location.href='htzfsq/index.html';
     							break;
     							
      						default://其他 HT_HTBZ
      							layer.alert('Hi,该功能暂未上线<br>请移步至PC端处理~');
      							break;	              					
      					}
          			}
          		};
          		
        		if(index == $scope.undoList.length-1){
        			$('.listBox').show();
	             	$('.in-time em').each(function(index){
		             	var $this=$(this);
		             	$this.html($this.html().substring(0,16));//时间字符串处理
		             	stretchFn();//swiper上下滑动留白
	             	});
        		}
          	}
          	var orderBy=$filter('orderBy');
          	var items=$scope.undoList;
          	console.log(orderBy(items,'PC'))
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
