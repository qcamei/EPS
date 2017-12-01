/* 我的代办列表数据处理 */
var app=angular.module('myApp', []);
var czyid = sessionStorage.getItem('czyid');

app.controller('myController', function($scope, $http) {
    myUrl=connectPath+"/undoCtrl/getUndoListData.do?callback=JSON_CALLBACK&czyid="+czyid;
    oStorage = window.sessionStorage;
    $http.jsonp(myUrl).success(
    	function (data) {
    		$scope.undoList=data;
    		console.log(data);
            //加载效果去除
             $('.loader').fadeOut();

    		//lcbs-流程标识判断是什么类型 ;ywbh--项目的主ID;办理方式--用于判断是否为起草环节
    		$scope.turnToSp = function(lcbs,ywbh,blfs){

    		    if(blfs == 0){
    		  	    alert("该流程在起草环节,请到PC端处理!");
                    // $(this).find(".pc").show();
    		  	    return ;
    		    }else{
    		        if(lcbs == 'HYCG_HYCGSPLC'){
    		            var mark = "HYCG_HYCGSPLC";
    		            sessionStorage.setItem("ywbh_"+mark,ywbh);
    		            window.location.href="../../cgsp/undo/hycg/index.html";
    		        }else if(lcbs == 'HT_HTBZ'){
    		      
    		        }else if(lcbs == 'XMGL_LXCGCGNR'){
    		    	    var mark = "XMGL_LXCGCGNR";
    		            sessionStorage.setItem("ywbh_"+mark,ywbh);
    		            window.location.href = "../../cgsp/undo/lxcg/index.html";
    		      
    		        }else if(lcbs == 'ZZCG_WJBPSPLC'){
    		    	    var mark = "ZZCG_WJBPSPLC";
    		            sessionStorage.setItem("ywbh_"+mark,ywbh);
    		            window.location.href = "../../cgsp/undo/zzcgwjbp/index.html";
    		        }
    		    }  
    		}    		
    	}
    ).error(
    	$('.loader').hide();
		layer.open({
			type: 1,
			area: ['200px', 'auto'], //宽高
			content: '<p style="line-height:80px;text-align:center;" onclick="location.reload();">加载失败，点击重试</p>'
		});
    );
});