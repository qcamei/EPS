//-------------------------------------------审批----------------------//
$(function(){
	//修改流程，审批-提交，加签，退回
	approving();
	function approving(){
		//审批下拉框
		var $approval=$('.approval');
		$(document).on('click','.yn .sel>p:first-child',function(){
			
			$(this).siblings().toggle();
		})
	
		$(document).on('keyup','.mes textarea',function(){
			var length=$(this).val().length;
			if(length>0){
				$(this).attr('txt',1);
			}else{
				$(this).attr('txt','');
			}r
		})
		$(document).on('click','.yn .sel div p',function(){
			
		    txt=$('.mes textarea').attr("txt");	
			
			var yjTxt=$(this).html();
			var spnrTxt=$('.spnr').html();
			$('.yn .sel div').hide();
			var ys_str=$(this).html();
			$('.yn .sel>p:first-child').html(ys_str).addClass('seled');
			if(!txt){
//				alert(txt)
				$('.spnr').html(yjTxt);
			    $('.spnr').val(yjTxt);
			    $('.spnr').attr('txt',"");
				
			}
			
			if(yjTxt=='同意'||yjTxt=='拟同意'){
				$('.backTo').attr('disabled','disabled').css('opacity',0.4);//同意则退回按钮失效
				$('.subTo').removeAttr('disabled').css('opacity',1);
				$('.addBtn').removeAttr('disabled').css('opacity',1);
			}else if(yjTxt=='不同意'){//不同意则提交加签按钮失效
				$('.subTo').attr('disabled','disabled').css('opacity','0.4');
				$('.addBtn').attr('disabled','disabled').css('opacity','0.4');
				$('.backTo').removeAttr('disabled').css('opacity',1);
			}
			
		});
		
	}
})
app.controller('spCtrl', function($scope, $http) {
	var ywbh = sessionStorage.getItem('ywbh');
	var rwslid = sessionStorage.getItem('rwslid');
	var czyid = sessionStorage.getItem('czyid');
	console.log(ywbh)
	//-------------------------------------直接提交下一环节环节处理人信息
	subNext=connectPath+'/undoCtrl/getNextHjInfo.do?callback=JSON_CALLBACK&ywbh='+ywbh+'&czyid='+czyid;
	subFlag=0;
	addBFlag=0;
	$scope.subNextFn=function(){
//		var nrBf=$('.spnr').attr('txt')&&$('.spyj').hasClass('seled');
         var nrBf=$('.spyj').hasClass('seled');
		 if(!nrBf){
		 	layer.alert('请填写审批意见!');
		 	$('.subTo').attr('data-target','')
			return;
		 }

	 	$('.subTo').attr('data-target','#subNext');
//		var nrBf=$('.spnr').text()&&$('.spyj').hasClass('seled');
		
		//如果审批内容存在,并且是第一次加载，或者是有过加签操作才执行一下代码
		if(
			(nrBf&&iLoadJson.iLoad3==0)||(nrBf&&addBFlag==1)
		
		){
			$('.loader').show();
			console.log(addBFlag)
			$http.jsonp(subNext).success(
				function(data){
				if(subFlag){//第二次执行该函数时，获取数据成功后隐藏加载层
					$('.loader').hide();
				}
				iLoadJson.iLoad3=1;
				//加载效果去除
				if(iLoadJson.iLoad3){
				    $('.loader').hide();
				}
				$scope.subNetData=data;
				console.log($scope.subNetData);
				$scope.currentID=null || $scope.subNetData[0].ID;
				$scope.isSel = function(id) {
		    		return id == $scope.currentIndex;
				}
				//标签里ng-class="{trSelected:isSel($index+1)}" //冒号：后值为true,class=trSelected.为false,则没有这个trSelected类
			    $scope.currentIndex = '1';
			
			    $scope.selId = function (index,id) {
			        $scope.currentIndex = index+1;
			        $scope.currentID=id;//获取选择下一环节ID
			        console.log($scope.currentID)

			    }					
				$scope.subNet=function(){
					$scope.idIndex=function(index){
						if(index==$scope.subNetData.length-1){
							var dataHeight=$('.sub-next-in').height();
							var winHeight=$(window).height();
							if(dataHeight>winHeight){
								$('.sub-popups-in').css({
									top:0,
									'transform':'translate(-50%, 0%)',
									'-webkit-transform':'translate(-50%, 0%)'
								});
							}
						}
					}
					//console.log(index)
					$scope.index=0;
					$scope.show=false;
					netBm=$scope.subNetData[0].HJMC;
					
					if($scope.subNetData.length==1){
						if(!netBm){//流程结束
							netSprEnd=$scope.subNetData[0].LCENDINFO;
							$('.sub-next-in p').html(netSprEnd);
							$('.sub-next-in p').css({
								'text-align':'center',
								'padding':'4rem 0 0 0'
							})
							return false;
						}else{//直接提交
							$('.sub-next-in p').css({
								'text-align':'center',
								'padding':'1rem 0 0'
							})
							$scope.show=false;//不需要选择
							//选择下一个联系人表格禁止选择
							$scope.currentID=null;
							$scope.isSel=null;
							$scope.selId=null;
							$('.sub-next-in p').html('确认下一环节<em class="text-blue">'+$scope.subNetData[0].HJMC+'</em>审核人：')
							return true;
						}
					}else{
						$('.sub-next-in p').css({
							'text-align':'center',
							'padding':'1rem 0 0'
						})
						/*
						 * RWMS：判断下一审核环节是必须全部通过还是其中任何一个人通过即可进入下一审批环节
						 * 0-单任务,可选择下一环节由谁审批
						 * 1-多任务，不需要选择下一环节审批人
						 * */
						if($scope.subNetData[0].RWMS==1){
							$scope.show=false;//不需要选择
							//选择下一个联系人表格禁止选择
							$scope.currentID=null;
							$scope.isSel=null;
							$scope.selId=null;
							$('.sub-next-in p').html('确认下一环节<em class="text-blue">'+$scope.subNetData[0].HJMC+'</em>审核人：')
						}else{//RWMS0: 0-单任务
							$scope.show=true;//需要选择
						}
						return true;
					}
				};
				subFlag=1;
				}
			).error(function(){
	    		$('.loader').hide();
	    		layer.open({
	    			type: 1,
	    			area: ['200px', 'auto'], //宽高
	    			content: '<p style="line-height:80px;text-align:center;" onclick="location.reload();">加载失败，点击重试</p>'
	    		});
			});
		}
	};
//	$scope.subNextFn();
	//-------------------------------------下一环节提交数据按钮
	$scope.submitNext=function(){
		
		$('.loader').show();
		//		loadTimer();
		/*var spyj=$('.spyj').html();
		var spnr=$('.spnr').html();*/
		//解决中文乱码问题
        var spyj = encodeURIComponent(encodeURIComponent($('.spyj').html())); 
        var spnr = encodeURIComponent(encodeURIComponent($('.spnr').html())); 
		var URL=connectPath+'/undoCtrl/submitSplc.do?callback=JSON_CALLBACK';
		var submitData=URL+"&ywbh="+ywbh+"&spyj="+spyj+"&spnr="+spnr+"&rwslid="+rwslid+"&selectedRwslId="+$scope.currentID;
		$http.jsonp(submitData).success(
			
			function(data){
				$('.loader').hide();
				layer.msg('提交成功',{
                time:1000,
                });
				setTimeout(function(){
					window.location.href="../undoList.html";
				},1500)
		}).error(
			function(){
				$('.loader').hide();
				layer.msg('提交失败',{
                time:1000,
                });
				
			}
		)
	}
	//-------------------------------------退回
	var URL=connectPath+'/undoCtrl/getRwThInfo.do?'+'ywbh='+ywbh+'&callback=JSON_CALLBACK'+'&czyid='+czyid;
	$scope.toBackFn=function(){
		var nrBf=$('.spyj').hasClass('seled');
		if(!nrBf){
			layer.alert('请填写审批意见!');
			$('.backTo').attr('data-target','')
			return;
		}
		$('.backTo').attr('data-target','#toBack')
			 
		if(!iLoadJson.iLoad6){//如果还未加载过
			$('.loader').show();
			$http.jsonp(URL).success(
				function(data){
					iLoadJson.iLoad6=1;
					//加载效果去除
					if(iLoadJson.iLoad6){
					    $('.loader').hide();
					}
					console.log(data);
					$scope.thhjMc=data[0].LCHJMC;
					$scope.thhjSpr=data[0].SPR;
					$scope.mdlchjxh=data[0].MDLCHJXH;
				}
			).error(function(){
				$('.loader').hide();
				layer.alert('加载出错啦')
			});
		}
	};
	//thbz 退回标识 0-修改完成按流程重新审批   2-修改完成直接提交给我
	var thbz=2;
	$scope.backSel0=function(){
		thbz=2;
	};
	$scope.backSel1=function(){
		thbz=0;
	};
	$scope.backToSuc=function(){
		$('.loader').show();
//		loadTimer();
		//var spnr=$('.spnr').html();
		var spnr = encodeURIComponent(encodeURIComponent($('.spnr').html())); 
		var URL=connectPath+'/undoCtrl/rwThCommit.do?ywbh='+ywbh+'&thbz='+thbz+'&mdlchjxh='+$scope.mdlchjxh+'&spyj='+spnr+'&callback=JSON_CALLBACK'+'&czyid='+czyid;                   
		$http.jsonp(URL).success(
			function(data){
				$('.loader').hide();
				layer.msg('退回成功');
				setTimeout(function(){
					window.location.href="../undoList.html";
				},1500)
				
			})
	};
	//--------------------------------------加签-------------------
	//---------------------获取待选人员--------
	var dxryUrl=connectPath+'/undoCtrl/getBmryList.do?czyid='+czyid+'&callback=JSON_CALLBACK';
	$scope.dxryFn=function(){
		var nrBf=$('.spyj').hasClass('seled');
		 if(!nrBf){
		 	layer.alert('请填写审批意见!');
		 	$('.addBtn').attr('data-target','')
			return;
		 }
	 	$('.addBtn').attr('data-target','#addPage1')
		addBFlag=0;//恢复加签状态
		if(!iLoadJson.iLoad4){
			$('.loader').show();
			$http.jsonp(dxryUrl).success(
				function(data){
					iLoadJson.iLoad4=1;
					//加载效果去除
					if(iLoadJson.iLoad4){
					    $('.loader').hide();
					}
					console.log(data)
					$scope.dxryList=data;
				}
			).error(function(){
				$('.loader').hide();
				layer.alert('加载出错啦')
			});
		}else{
			$('.membersL').html('');
			for(var i=0; i<$scope.dxryList.length; i++){
				$sp=$('<span id="'+$scope.dxryList[i].VALUE+'" ng-click="yxFN()">'+$scope.dxryList[i].NAME+'</span>');
				$('.membersL').append($sp);
			}
			$('.membersR').html('');
			$('.bmlxr-lb>li>ul>li em').removeClass('check');
			$('.bmlxr-lb>li>ul li').attr('bF','')
			$('.addSeleted ul').html('');
			
		}
	}
	//---------------------保存加签审批人--------
	var bfhj=1;
	var rwms=0;
	$scope.bfhjFn1=function(){
		$(this).children('input').attr('checked','checked');
		$(this).siblings().children('input').removeAttr('checked');
		bfhj=1;//顺序提交
		rwms=0;
		console.log(bfhj)
	};
	$scope.bfhjFn2=function(){
		$(this).children('input').attr('checked','checked');
		$(this).siblings().children('input').removeAttr('checked');
		bfhj=2;//同时提交
		rwms=1;//同时提交
		console.log(bfhj)
	};	
	
	$scope.addSubFn=function(){
		
		$('.loader').show();
		$('.addSubBtn').attr({'data-target':'#approval','data-dismiss':'modal'});
//		loadTimer();
		var blryids='';
		//如果没有加签人员则不保存
		if(!$('.membersR span').length){
			$('.loader').hide();
			$('.addSubBtn').attr({'data-target':'','data-dismiss':''});
			layer.alert('加签人员为空！');
			return;
		}else{
			$scope.yxFN=function(){
				var bl=$('.membersR span');
				for(var i=0;i<bl.length;i++){
					blryids+=','+bl.eq(i).attr('id');
				}
				console.log(blryids)
			};
			$scope.yxFN();
			var URL=connectPath+'/undoCtrl/saveLcSpr.do';
			var dataURL=URL+'?czyid='+czyid+'&bfhj='+bfhj+'&blryids='+blryids+'&ywbh='+ywbh+'&rwms='+rwms+'&callback=JSON_CALLBACK';
			$http.jsonp(dataURL).success(
				function(data){
//					alert(dataURL)
					addBFlag=1;//保存加签标志
					iLoadJson.iLoad2=0;//流程记录状态更新
					//$scope.subNextFn();
					$('.loader').hide();
					layer.alert(data[0].MESSAGE);
//					layer.confirm('确定', function(index){
//					    setTimeout(function(){
//							$('#addPage1').removeClass('in').css('display','none').attr('aria-hidden','true');
//							$('.modal-backdrop:gt(0)').remove();
//							$('body').removeClass('modal-open');
//					    },600)
//					    layer.close(index);
//					});       
					//$('.addSubBtn').attr({'data-target':'#approval','data-dismiss':'modal'});
				}
			).error(function(){
				$('.loader').hide();
				layer.alert('保存加签失败')
			})
		}
	}
});
