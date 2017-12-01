		//获取参数，从？后面第一位开始截取，得到登录加密信息
		var param = location.search.substr(1);
		//var param ="r=WC5pu0QBb6k=";
		var paramValue = "";
		if(param != '' && param != null && param != 'n'){
			var post = param.indexOf('=');
			if(post < 0){
				$('.loader').hide();
				layer.alert("登陆用户信息获取失败,请重新登陆");
			}else{
				paramValue = param.substring(post+1);
				var post = paramValue.indexOf('&');
				if(post > -1){
					paramValue = paramValue.substring(0,post);
				}
				//alert("paramValue:"+paramValue)
			}
		}
		
		//alert("获取登陆信息>>>"+paramValue);
		var czyid = "";
		var app = angular.module('myApp', []);
		app.controller('epsHomeCtrl', function($scope,$http) {
			//epsSuccess函数 执行成功获取czyid
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
	         					layer.alert('暂无待办事项~');
	         					window.location='javascript:;';
	         				})
	         				$('.num-new').hide();
	         			}
	         	}).error(function(){
	        		$('.loader').hide(); 
	         		if(!navigator.onLine){
	         			//如果没有网
	 	        		layer.alert('请检查网络');
	        		}else{
		         		layer.alert('加载出错啦');
	        		}
	         	});
			}
			if(paramValue != ""){
				var getUserUrl = connectPath + '/undoCtrl/getUserInfo.do?callback=JSON_CALLBACK&param='+paramValue;
  			$http.jsonp(getUserUrl).success(
  				function(data){
  					if(data[0].ZT == 'SUCCESS'){//如果在线成功获取czyid
   						czyid = data[0].USERID;
 						//alert(czyid)
 						currentYhbh=czyid
  						sessionStorage.setItem('czyid',czyid);
  						epsSuccess();
  					}else{
  						$('.loader').hide();
  						layer.alert(data[0].MESSAGE);//登陆权限不足
  					}
  				}).error(function(){
  					$('.loader').hide();
  					layer.alert("获取登陆用户数据失败");
  				})
			}else{
				if(sessionStorage.getItem('czyid')){
					czyid=sessionStorage.getItem('czyid');
					epsSuccess();
				}else{
					czyid="ff80808134d683bc0134e42d4c5f013c";//"ff80808133cfedde0133d02e8edb133b";//此行上线删除
					layer.alert("获取登陆用户数据失败");
					sessionStorage.setItem('czyid',czyid)//此行上线删除
					epsSuccess();//此行上线删除
				}
			}
		})
