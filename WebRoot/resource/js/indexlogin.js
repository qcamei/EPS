		//��ȡ�������ӣ������һλ��ʼ��ȡ���õ���¼������Ϣ
		var param = location.search.substr(1);
		//var param ="r=WC5pu0QBb6k=";
		var paramValue = "";
		if(param != '' && param != null && param != 'n'){
			var post = param.indexOf('=');
			if(post < 0){
				$('.loader').hide();
				layer.alert("��½�û���Ϣ��ȡʧ��,�����µ�½");
			}else{
				paramValue = param.substring(post+1);
				var post = paramValue.indexOf('&');
				if(post > -1){
					paramValue = paramValue.substring(0,post);
				}
				//alert("paramValue:"+paramValue)
			}
		}
		
		//alert("��ȡ��½��Ϣ>>>"+paramValue);
		var czyid = "";
		var app = angular.module('myApp', []);
		app.controller('epsHomeCtrl', function($scope,$http) {
			//epsSuccess���� ִ�гɹ���ȡczyid
			var epsSuccess=function(){
				var undoCountUrl=connectPath+'/undoCtrl/getUndoCount.do?callback=JSON_CALLBACK&czyid='+czyid;
				$http.jsonp(undoCountUrl).success(
	         		function(data){
	         			$('.loader').hide();
	         			iLoadJson.iLoad0=1;
	         			$scope.iuCount=data[0].UNDOCOUNT;
	         			console.log($scope.iuCount)
	         			if(parseInt($scope.iuCount)){
	 	        			$('.num-new').show().html($scope.iuCount);
	 	        			var num=function(){
			         			$spUndo=$('<i class="num-new"></i>');
			         			$spUndo.appendTo($('.mainSlideBox ol li:first span'));
			         			$spUndo.show().html($scope.iuCount);
		 	        		};
	 	        			$(window).resize(function(){
	 	        				num();
	 	        			});
		 	        		num();
	         			}else{
	         				$('.sp-undo').bind('click',function(){
	         					layer.alert('���޴�������~');
	         					window.location='javascript:;';
	         				})
	         				$('.num-new').hide();
	         			}
	         	}).error(function(){
	        		$('.loader').hide(); 
	         		if(!navigator.onLine){
	         			//���û����
	 	        		layer.alert('��������');
	        		}else{
		         		layer.alert('���س�����');
	        		}
	         	});
			}
			if(paramValue != ""){
				var getUserUrl = connectPath + '/undoCtrl/getUserInfo.do?callback=JSON_CALLBACK&param='+paramValue;
  			$http.jsonp(getUserUrl).success(
  				function(data){
  					if(data[0].ZT == 'SUCCESS'){//������߳ɹ���ȡczyid
   						czyid = data[0].USERID;
 						//alert(czyid)
 						currentYhbh=czyid
  						sessionStorage.setItem('czyid',czyid);
  						epsSuccess();
  					}else{
  						$('.loader').hide();
  						layer.alert(data[0].MESSAGE);//��½Ȩ�޲���
  					}
  				}).error(function(){
  					$('.loader').hide();
  					layer.alert("��ȡ��½�û�����ʧ��");
  				})
			}else{
				if(sessionStorage.getItem('czyid')){
					czyid=sessionStorage.getItem('czyid');
					epsSuccess();
				}else{
					czyid="ff80808134d683bc0134e42d4c5f013c";//"ff80808133cfedde0133d02e8edb133b";//��������ɾ��
					layer.alert("��ȡ��½�û�����ʧ��");
					sessionStorage.setItem('czyid',czyid)//��������ɾ��
					epsSuccess();//��������ɾ��
				}
			}
		})
