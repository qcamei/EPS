/* �ҵĴ����б����ݴ��� */
var app=angular.module('myApp', []);
var czyid = sessionStorage.getItem('czyid');

app.controller('myController', function($scope, $http) {
    myUrl=connectPath+"/undoCtrl/getUndoListData.do?callback=JSON_CALLBACK&czyid="+czyid;
    oStorage = window.sessionStorage;
    $http.jsonp(myUrl).success(
    	function (data) {
    		$scope.undoList=data;
    		console.log(data);
            //����Ч��ȥ��
             $('.loader').fadeOut();

    		//lcbs-���̱�ʶ�ж���ʲô���� ;ywbh--��Ŀ����ID;����ʽ--�����ж��Ƿ�Ϊ��ݻ���
    		$scope.turnToSp = function(lcbs,ywbh,blfs){

    		    if(blfs == 0){
    		  	    alert("����������ݻ���,�뵽PC�˴���!");
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
			area: ['200px', 'auto'], //���
			content: '<p style="line-height:80px;text-align:center;" onclick="location.reload();">����ʧ�ܣ��������</p>'
		});
    );
});