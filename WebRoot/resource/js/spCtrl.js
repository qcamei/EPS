//-------------------------------------------����----------------------//
$(function(){
	//�޸����̣�����-�ύ����ǩ���˻�
	approving();
	function approving(){
		//����������
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
			
			if(yjTxt=='ͬ��'||yjTxt=='��ͬ��'){
				$('.backTo').attr('disabled','disabled').css('opacity',0.4);//ͬ�����˻ذ�ťʧЧ
				$('.subTo').removeAttr('disabled').css('opacity',1);
				$('.addBtn').removeAttr('disabled').css('opacity',1);
			}else if(yjTxt=='��ͬ��'){//��ͬ�����ύ��ǩ��ťʧЧ
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
	//-------------------------------------ֱ���ύ��һ���ڻ��ڴ�������Ϣ
	subNext=connectPath+'/undoCtrl/getNextHjInfo.do?callback=JSON_CALLBACK&ywbh='+ywbh+'&czyid='+czyid;
	subFlag=0;
	addBFlag=0;
	$scope.subNextFn=function(){
//		var nrBf=$('.spnr').attr('txt')&&$('.spyj').hasClass('seled');
         var nrBf=$('.spyj').hasClass('seled');
		 if(!nrBf){
		 	layer.alert('����д�������!');
		 	$('.subTo').attr('data-target','')
			return;
		 }

	 	$('.subTo').attr('data-target','#subNext');
//		var nrBf=$('.spnr').text()&&$('.spyj').hasClass('seled');
		
		//����������ݴ���,�����ǵ�һ�μ��أ��������й���ǩ������ִ��һ�´���
		if(
			(nrBf&&iLoadJson.iLoad3==0)||(nrBf&&addBFlag==1)
		
		){
			$('.loader').show();
			console.log(addBFlag)
			$http.jsonp(subNext).success(
				function(data){
				if(subFlag){//�ڶ���ִ�иú���ʱ����ȡ���ݳɹ������ؼ��ز�
					$('.loader').hide();
				}
				iLoadJson.iLoad3=1;
				//����Ч��ȥ��
				if(iLoadJson.iLoad3){
				    $('.loader').hide();
				}
				$scope.subNetData=data;
				console.log($scope.subNetData);
				$scope.currentID=null || $scope.subNetData[0].ID;
				$scope.isSel = function(id) {
		    		return id == $scope.currentIndex;
				}
				//��ǩ��ng-class="{trSelected:isSel($index+1)}" //ð�ţ���ֵΪtrue,class=trSelected.Ϊfalse,��û�����trSelected��
			    $scope.currentIndex = '1';
			
			    $scope.selId = function (index,id) {
			        $scope.currentIndex = index+1;
			        $scope.currentID=id;//��ȡѡ����һ����ID
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
						if(!netBm){//���̽���
							netSprEnd=$scope.subNetData[0].LCENDINFO;
							$('.sub-next-in p').html(netSprEnd);
							$('.sub-next-in p').css({
								'text-align':'center',
								'padding':'4rem 0 0 0'
							})
							return false;
						}else{//ֱ���ύ
							$('.sub-next-in p').css({
								'text-align':'center',
								'padding':'1rem 0 0'
							})
							$scope.show=false;//����Ҫѡ��
							//ѡ����һ����ϵ�˱���ֹѡ��
							$scope.currentID=null;
							$scope.isSel=null;
							$scope.selId=null;
							$('.sub-next-in p').html('ȷ����һ����<em class="text-blue">'+$scope.subNetData[0].HJMC+'</em>����ˣ�')
							return true;
						}
					}else{
						$('.sub-next-in p').css({
							'text-align':'center',
							'padding':'1rem 0 0'
						})
						/*
						 * RWMS���ж���һ��˻����Ǳ���ȫ��ͨ�����������κ�һ����ͨ�����ɽ�����һ��������
						 * 0-������,��ѡ����һ������˭����
						 * 1-�����񣬲���Ҫѡ����һ����������
						 * */
						if($scope.subNetData[0].RWMS==1){
							$scope.show=false;//����Ҫѡ��
							//ѡ����һ����ϵ�˱���ֹѡ��
							$scope.currentID=null;
							$scope.isSel=null;
							$scope.selId=null;
							$('.sub-next-in p').html('ȷ����һ����<em class="text-blue">'+$scope.subNetData[0].HJMC+'</em>����ˣ�')
						}else{//RWMS0: 0-������
							$scope.show=true;//��Ҫѡ��
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
	    			area: ['200px', 'auto'], //���
	    			content: '<p style="line-height:80px;text-align:center;" onclick="location.reload();">����ʧ�ܣ��������</p>'
	    		});
			});
		}
	};
//	$scope.subNextFn();
	//-------------------------------------��һ�����ύ���ݰ�ť
	$scope.submitNext=function(){
		
		$('.loader').show();
		//		loadTimer();
		/*var spyj=$('.spyj').html();
		var spnr=$('.spnr').html();*/
		//���������������
        var spyj = encodeURIComponent(encodeURIComponent($('.spyj').html())); 
        var spnr = encodeURIComponent(encodeURIComponent($('.spnr').html())); 
		var URL=connectPath+'/undoCtrl/submitSplc.do?callback=JSON_CALLBACK';
		var submitData=URL+"&ywbh="+ywbh+"&spyj="+spyj+"&spnr="+spnr+"&rwslid="+rwslid+"&selectedRwslId="+$scope.currentID;
		$http.jsonp(submitData).success(
			
			function(data){
				$('.loader').hide();
				layer.msg('�ύ�ɹ�',{
                time:1000,
                });
				setTimeout(function(){
					window.location.href="../undoList.html";
				},1500)
		}).error(
			function(){
				$('.loader').hide();
				layer.msg('�ύʧ��',{
                time:1000,
                });
				
			}
		)
	}
	//-------------------------------------�˻�
	var URL=connectPath+'/undoCtrl/getRwThInfo.do?'+'ywbh='+ywbh+'&callback=JSON_CALLBACK'+'&czyid='+czyid;
	$scope.toBackFn=function(){
		var nrBf=$('.spyj').hasClass('seled');
		if(!nrBf){
			layer.alert('����д�������!');
			$('.backTo').attr('data-target','')
			return;
		}
		$('.backTo').attr('data-target','#toBack')
			 
		if(!iLoadJson.iLoad6){//�����δ���ع�
			$('.loader').show();
			$http.jsonp(URL).success(
				function(data){
					iLoadJson.iLoad6=1;
					//����Ч��ȥ��
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
				layer.alert('���س�����')
			});
		}
	};
	//thbz �˻ر�ʶ 0-�޸���ɰ�������������   2-�޸����ֱ���ύ����
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
				layer.msg('�˻سɹ�');
				setTimeout(function(){
					window.location.href="../undoList.html";
				},1500)
				
			})
	};
	//--------------------------------------��ǩ-------------------
	//---------------------��ȡ��ѡ��Ա--------
	var dxryUrl=connectPath+'/undoCtrl/getBmryList.do?czyid='+czyid+'&callback=JSON_CALLBACK';
	$scope.dxryFn=function(){
		var nrBf=$('.spyj').hasClass('seled');
		 if(!nrBf){
		 	layer.alert('����д�������!');
		 	$('.addBtn').attr('data-target','')
			return;
		 }
	 	$('.addBtn').attr('data-target','#addPage1')
		addBFlag=0;//�ָ���ǩ״̬
		if(!iLoadJson.iLoad4){
			$('.loader').show();
			$http.jsonp(dxryUrl).success(
				function(data){
					iLoadJson.iLoad4=1;
					//����Ч��ȥ��
					if(iLoadJson.iLoad4){
					    $('.loader').hide();
					}
					console.log(data)
					$scope.dxryList=data;
				}
			).error(function(){
				$('.loader').hide();
				layer.alert('���س�����')
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
	//---------------------�����ǩ������--------
	var bfhj=1;
	var rwms=0;
	$scope.bfhjFn1=function(){
		$(this).children('input').attr('checked','checked');
		$(this).siblings().children('input').removeAttr('checked');
		bfhj=1;//˳���ύ
		rwms=0;
		console.log(bfhj)
	};
	$scope.bfhjFn2=function(){
		$(this).children('input').attr('checked','checked');
		$(this).siblings().children('input').removeAttr('checked');
		bfhj=2;//ͬʱ�ύ
		rwms=1;//ͬʱ�ύ
		console.log(bfhj)
	};	
	
	$scope.addSubFn=function(){
		
		$('.loader').show();
		$('.addSubBtn').attr({'data-target':'#approval','data-dismiss':'modal'});
//		loadTimer();
		var blryids='';
		//���û�м�ǩ��Ա�򲻱���
		if(!$('.membersR span').length){
			$('.loader').hide();
			$('.addSubBtn').attr({'data-target':'','data-dismiss':''});
			layer.alert('��ǩ��ԱΪ�գ�');
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
					addBFlag=1;//�����ǩ��־
					iLoadJson.iLoad2=0;//���̼�¼״̬����
					//$scope.subNextFn();
					$('.loader').hide();
					layer.alert(data[0].MESSAGE);
//					layer.confirm('ȷ��', function(index){
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
				layer.alert('�����ǩʧ��')
			})
		}
	}
});
