
var app = angular.module('myApp', []);
app.controller('JsonController', function($scope,$http,$filter) {
    myUrl =connectPath+'/undoCtrl/getUndoListData.do?callback=JSON_CALLBACK&czyid='+czyid;
    oStorage = window.sessionStorage;
    $http.jsonp(myUrl).success(
         function(data){
            $scope.undoList = data;
            //����Ч��ȥ��
          	$('.loader').hide();
          	iLoadJson.iLoad0=1;//���سɹ�
       		//�ж��Ƿ���ʾ���б�ҳû�����ݡ���Ϣ��ʾ
       		if($scope.undoList.length){
 	       		$scope.show='hidden';
       		}else{
       			$scope.show='show';
       		}
          	$scope.timeStr = function (lidata,index) {//ng-repeatִ����Ĳ���
 	      		//pcͼ����ʾ
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
		      		//�ɣ��豸��Ӧ�̱�����������'��Ӧ�̱���'���ڲ�֧���ƶ�
		      		if(lidata.LCBS=='SAP_GYSBJSPLC'&&lidata.HJMC=='��Ӧ�̱���'){
		      			$('.pc').eq(index).show();
          				lidata.PC=2;
		      		}
		      		//�ɣ��豸����������������'IT��������ȷ��'���ڲ�֧���ƶ�����֧���ϴ������Ȳ���
 		      		if(lidata.LCBS=='SAP_CGDDYWLC'&&lidata.HJMC=='IT��������'){
		      			$('.pc').eq(index).show();
          				lidata.PC=2;
		      		}
   					$scope.toUrl=function(lidata,index){//�����ת�Ĳ���
						//�Ƿ��ƶ�������SFYDSP�����Ϊ1�����ʾ��ҪȥPC�˴������߰���ʽ��BLFS�����Ϊ0����ʾ��ݻ��ڣ���Ҳ��ҪȥPC�˴���
						if(lidata.SFYDSP == 1 || lidata.BLFS == 0|| lidata.PC == 2){
                 			layer.alert('Hi,�ô���֧��,���Ʋ���PC�˴���~');
          				}else{
          					//��ȡ�ɹ���ʽ��lidata.LCBSMC
   						oStorage.setItem('cgfsmc',lidata.LCBSMC); //��ȡ�ɹ���ʽ
						oStorage.setItem('ywbh',lidata.YWBH);//��ȡ��Ŀid(ҵ����)
						oStorage.setItem('rwslid',lidata.ID);//��ȡ����ʵ��Id
						oStorage.setItem('ywmc',lidata.LCSLMC);//��ȡ����ʵ��Id
						oStorage.setItem('lcbs',lidata.LCBS);//��ȡ����ʵ��Id
      					switch (lidata.LCBS){
      						case 'HYCG_HYCGSPLC'://����ɹ�
      							window.location.href='hycg/index.html';
     							break;
      						case 'XMGL_LXCGCGNR'://���ǲɹ�
      							window.location.href='lxcg/index.html';
      							break;
      						case 'HT_HTBZ'://��ͬ����
                    			layer.alert('Hi,�ù�����δ����<br>���Ʋ���PC�˴���~');
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
      						case 'XMGL_JJDSP'://���Ӿ��۲ɹ�����
      						var mark = "XMGL_JJDSP";
      							window.location.href='dzjjcg/index.html';
      							break;
      						case 'XMGL_JGGGSP'://�����������
      						//var mark = "XMGL_JGGGSP";
      							window.location.href='jgggsp/index.html';
      							break;
      						case 'XMGL_XJDSP'://�����Ա�������
      						//var mark = "XMGL_JGGGSP";
      							window.location.href='jzbjdsp/index.html';
      							break;
      							
       						case 'XMGL_TPJLSPLC'://̸�м�¼����
      							window.location.href='tpjlsp/index.html';
      							break;
      							
       						case 'GYSXT_LC'://Эͬ����
      							window.location.href='xtsp/index.html';
      							break;
      							
       						case 'SAP_CGDDYWLC'://IT�豸������������
      							window.location.href='itsbsqdd/index.html';
      							break;
      						
      						case 'SAP_GYSBJSPLC'://IT�豸��Ӧ�̱������
      							window.location.href='itsbsqgysbj/index.html';
     							break;
     							
      						case 'HT_ZFSQ'://IT�豸��Ӧ�̱������
      							window.location.href='htzfsq/index.html';
     							break;
     							
      						default://���� HT_HTBZ
      							layer.alert('Hi,�ù�����δ����<br>���Ʋ���PC�˴���~');
      							break;	              					
      					}
          			}
          		};
          		
        		if(index == $scope.undoList.length-1){
        			$('.listBox').show();
	             	$('.in-time em').each(function(index){
		             	var $this=$(this);
		             	$this.html($this.html().substring(0,16));//ʱ���ַ�������
		             	stretchFn();//swiper���»�������
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
