/* �ҵĴ����б����ݴ��� */
var app=angular.module('myApp', []);
app.controller('applyController', function($scope, $http) {
    myUrl=connectPath+'/applyCtrl/getApplyListData.do?&callback=JSON_CALLBACK&czyid='+czyid;
    oStorage = window.sessionStorage;
    $http.jsonp(myUrl).success(
    	function (data) {
            // alert("ni");
    		$scope.applyList=data;
    		console.log(data);
            //����Ч��ȥ��
            $('.loader').hide();
       		iLoadJson.iLoad0=1;//���سɹ�
       		
       		//�ж��Ƿ���ʾ���б�ҳû�����ݡ���Ϣ��ʾ
       		if($scope.applyList.length){
 	       		$scope.show='hidden';
       		}else{
       			$scope.show='show';
       		}
    		$scope.index=function(index){//ng-repeat������ɺ�Ĳ���
	    		if(index == $scope.applyList.length-1){
        			$('.listBox').show();
	    			stretchFn();//swiper��������������
	    		}
    		};
    		//lcbs-���̱�ʶ�ж���ʲô���� ;ywbh--��Ŀ����ID;����ʽ--�����ж��Ƿ�Ϊ��ݻ���
    		$scope.turnToSp = function(lidata){
    		    sessionStorage.setItem("ywbh",lidata.ywbh);
				sessionStorage.setItem('cgfsmc',lidata.xmlx); //��ȡ�ɹ���ʽ
				sessionStorage.setItem('ywmc',lidata.xmmc);//��ȡ����ʵ��Id
				sessionStorage.setItem('lcbs',lidata.lcbs);//��ȡ����ʵ��Id
    		    if(lidata.xmlx == '����ɹ�'){//��ʱ������Ŀ�����жϣ�ʵ��Ҫ�������������жϣ�����switch
    		          
    		            window.location.href="../../cgsp/apply/hycg/index.html";   
    		    }else if(lidata.xmlx == '���ǲɹ�'){
    		           
    		            window.location.href = "../../cgsp/apply/lxcg/index.html";
    		      
    		    }else if(lidata.xmlx == '��Ŀ����'){
    		            
    		            window.location.href = "../../cgsp/apply/zzcgwjbp/index.html";
    		    } 
    		    /*
				switch (lcbs){//������Ŀ�����жϽ����ĸ�ҳ��
					case 'HYCG_HYCGSPLC'://����ɹ�
						window.location.href='hycg/index.html';
						break;
					case 'XMGL_LXCGCGNR'://���ǲɹ�
						window.location.href='lxcg/index.html';
						break;
					case 'HT_HTBZ'://��ͬ����
            			layer.alert('Hi,��ͬ������δ����<br>���Ʋ���PC�˴���~');
						break;
					case 'ZZCG_WJBPSPLC'://��֧�ɹ�
					var mark = "ZZCG_WJBPSPLC";
						window.location.href='zzcgwjbp/index.html';
						break;
					case 'XMGL_CGWJSPJH'://�ɹ��ļ�����
					var mark = "XMGL_CGWJSPJH";
						window.location.href='cgwjsp/index.html';
						break;  
					case 'XMGL_CGGGSP'://�ɹ���������
					var mark = "XMGL_CGGGSP";
						window.location.href='cgggsp/index.html';
						break;
						
					default://����
						layer.alert('Hi,��ͬ������δ����<br>���Ʋ���PC�˴���~');
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
 	        	layer.alert('��������');
    		}else{
	    		layer.open({
	    			type: 1,
	    			area: ['200px', 'auto'], //���
	    			content: '<p style="line-height:80px;text-align:center;" onclick="location.reload();">����ʧ�ܣ��������</p>'
	    		});
	    	}
    	}
    );
});