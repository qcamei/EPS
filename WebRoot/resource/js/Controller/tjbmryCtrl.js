
	window.$oBody=$('body').children();//��ͬ��$(document).on()$(document)
	var sFlag=0;
	var hcid='';//����ش�ID,Ĭ��Ϊ�գ�Ĭ����������������Ա
	//-------------------------------------------����----------------------//
	app.controller('bmryControl', function($scope, $http) {
		var ywbh = sessionStorage.getItem('ywbh');
		// var czyid=sessionStorage.getItem('id');
		$scope.search = function(){
			if(!$('#sslxr').val()){
				layer.alert('����������!');
				return;
			}
			$('.loader').show();
			$('.shai').show().children('ul').html('');
			var czyid = sessionStorage.getItem('czyid');
			var dlh = '';
			var mc = $("#sslxr").val();
			//myUrl =connectPath+'/utilCtrl/getRylist.do?callback=JSON_CALLBACK&czyid='+czyid+'&dlh='+encodeURI(encodeURI(dlh))+'&mc='+encodeURI(encodeURI(mc))+'&hcid='+hcid;//�ش�id�����������ŷ�Χ
			myUrl =connectPath+'/utilCtrl/getRylist.do?callback=JSON_CALLBACK&czyid='+czyid+'&dlh='+encodeURI(encodeURI(dlh))+'&mc='+encodeURI(encodeURI(mc));//Ĭ�ϴӸ���λ����
			console.log(myUrl)
		    $http.jsonp(myUrl).success(function(data){
		    	$('.loader').hide();
		        console.log(data);
		        $scope.data=data;
		        if(!$scope.data.length){
		        	layer.alert('û���ѵ�����');
		        }else{
		        	$('.searchP').addClass('searchedP');
					var ul=$('.shai ul').show();
					for(var i=0;i<data.length;i++){
						//$('.tolistBtn').show();
						//�ж��ǲ���ѡ��
						var zBf=$('.addSeleted li[id='+data[i].ID+']').length;
						if(parseInt(zBf)){
							var $liry=$('<li id='+data[i].ID+' class="ry" bF="1"><span class="rymc">'+data[i].MC+'</span>(<span class="bm">'+data[i].BMMC+'</span>)'+'<em class="check"></em></li>');
						}else{
								
							var $liry=$('<li id='+data[i].ID+' class="ry"><span class="rymc">'+data[i].MC+'</span>(<span class="bm">'+data[i].BMMC+'</span>)'+'<em></em></li>');
						}
		
						ul.append($liry);
					}
					$(".bmlxr-lb").hide();
		        }
				sFlag=1;//�˱�־Ϊ�����������ʾ��־��0Ϊ����
		    }).error(function(){
		    	$('.loader').hide();
		    	layer.alert('����ʧ��');
		    });
		};
	
		//-------------------------------------����----------------------
		bmURL=connectPath+'/utilCtrl/getRytree.do?callback=JSON_CALLBACK&czyid='+czyid;
		$scope.bmTreeFn=function(){
			if(!iLoadJson.iLoad5){
				$('.loader').show();
				$http.jsonp(bmURL).success(
					function(data){
						//hcid=data[0].items[0].id;
						iLoadJson.iLoad5=1;
						//����Ч��ȥ��
						if(iLoadJson.iLoad5){
						    $('.loader').hide();
						}
						console.log(data);
						$scope.bmxx=data;
					}
				).error(function(){
					$('.loader').hide();
					layer.alert('���س�����')
				});
			}
		}
		
	
	}).directive('recursion',function($compile){
	
	        function cpl(element, link){
	            // Normalize the link parameter
	            if(angular.isFunction(link)){
	                link = { post: link };
	            }
	
	            // Break the recursion loop by removing the contents
	            var contents = element.contents().remove();
	            var compiledContents;
	            return {
	                pre: (link && link.pre) ? link.pre : null,
	                /**
	                 * Compiles and re-adds the contents
	                 */
	                post: function(scope, element){
	                    // Compile the contents
	                    if(!compiledContents){
	                        compiledContents = $compile(contents);
	                    }
	                    // Re-add the compiled contents to the element
	                    compiledContents(scope, function(clone){
	                        element.append(clone);
	                    });
	
	                    // Call the post-linking function, if any
	                    if(link && link.post){
	                        link.post.apply(null, arguments);
	                    }
	                }
	            };
	        }
	        return {
	            restrict:'A',
	            scope: {recursion:'='},
	            template: '<li ng-repeat="item in recursion">\
	                            <h3 id="{{item.id}}"><i></i>{{item.name}}</h3>\
	                            <ul recursion="item.items">\
	                            </ul>\
	                        </li>',
	            compile: function(element){
	
	                return cpl(element, function(scope, iElement, iAttrs, controller, transcludeFn){
	                });
	            }
	        };
	});
		
		$oBody.on('click','.bmlxr-lb h3',function(){//�������Ƶ��ͼ�����Ա����	
			var $this=$(this);
			hcid=$this.attr('id');
			console.log(hcid);
			$this.find('i').toggleClass('arr');
			$this.siblings('ul').slideToggle(160);
			if($this.siblings('ul').children('li').length){
				return;
			}
			else{bmryLoad($this);}
			//Ĭ����Աδ���أ�if ��ryjzzt(��Ա����״̬)������ԣ����ʾ�Ѿ����ع��ˣ����ڽ��м��ء�
		});
		
		//��������ţ��ش�id����Ϊ�գ��ӱ�����������
		$oBody.on('click','.bmlxr-lb>li>h3',function(){
			var $this=$(this);
			hcid='';
		});
		
		//���ṹ����Ա����
		//Ĭ����Աδ���أ�if ��ryjzzt(��Ա����״̬)������ԣ����ʾ�Ѿ����ع��ˣ����ڽ��м��ء�����ͨ����Աid�ж��Ƿ��Ѿ�ѡ��
		function bmryLoad($_obj,yr_id){//$_objָ�������ƽڵ�
			if($_obj.attr('ryjzzt')){
				return;
			}else{
				$('.loader').show();
				this_hcid=$_obj.attr('id');
				$.ajax({
					type:"get",
					url:connectPath+'/utilCtrl/getRylist.do?callback=?&czyid='+czyid+'&hcid='+this_hcid,
					dataType:'jsonp',
					success:function(data){
						console.log(data)
						$('.loader').hide();
						if(data){
							var $ryUl=$_obj.siblings('ul');
							$ryUl.insertAfter($_obj);
							for(var i=0;i<data.length;i++){//��������ʱ�ж��Ƿ��Ѿ��������ط�ѡ�У������ѡ��ͬʱ���ѡ�б�־
								var $liry=$('<li id='+data[i].ID+' class="ry"><span>'+data[i].MC+'</span><em></em></li>');
								if($('.addSeleted li[id='+data[i].ID+']').length){
									$liry.find('em').addClass('check');
									$liry.attr('bF','1')
								}
								$ryUl.append($liry);
							}
						}
						$('.bmlxr-lb li[id='+yr_id+']').attr('bF',1).find('em').addClass('check');//���н��ڵ��������������Ա��Ч
						$_obj.attr('ryjzzt',1);
					}
				});
			};
		}
		//���ṹ����Ա�����ѡ���ȡ��ѡ��ͬ����������ѡ��memberR��
		(function(){
			$oBody.on('click','.bmlxr-lb>li>ul li.ry',function(){
				var $this=$(this);
				$this_id=$this.attr("id");
				//$this.attr('bF','1');
				var name=$this.find('span').html();
				if(parseInt($this.attr('bF'))){//'BF'==1,�����ѡ
					$('.bmlxr-lb>li>ul li[id='+$this_id+']').attr('bF',1).find('em').removeClass('check');
					$('.addSeleted ul li[id='+$this_id+']').remove();//��������ѡ�Ƴ�
					$('.membersR span[id='+$this_id+']').remove();//memberR����ѡ�Ƴ�
					$this.attr('bF','')//'BF'=='',��־��Ϊδѡ��־
				}else{//'BF'!=1,���δѡ
					$('.bmlxr-lb>li>ul li[id='+$this_id+']').attr('bF',1).find('em').addClass('check');
					
					//������ӵ�ǰѡ����
					var $selName=$('<li id='+$this_id+'>'+name+'</li>');
					$('.addSeleted ul').append($selName);
					
					//memberR��ӵ�ǰѡ����:����Ѿ��Ӵ�ѡ����ӹ�,���滻����������ӵ�membersR��
					if($('.membersR span[id='+$this_id+']').length){
						$('.membersR span[id='+$this_id+']').remove();
						$link=$('<span id='+$this_id+'>'+name+'</span>');
						$link.appendTo($('.membersL'));
					}
					var $membersR_span=$('<span class="fromPart" id='+$this_id+'>'+name+'<em>��</em></span>');
					$('.membersR').append($membersR_span);
			
					
					$this.attr('bF','1')
		
				}
				//���¼������ռλ�����ĸ߶�
				nH=$('.fixPart').innerHeight();
				$('.addSeletedCopy').css('height',nH);
				$('.partBox').css('top',nH+'px');
					
			});
		})();
	
	//���ṹ������ɸѡ��Ա�������
	(function(){
		$oBody.on('click','.shai ul li.ry',function(){	
			var $this=$(this);
			$this_id=$this.attr("id");
			//--------------ͬʱ��Աѡ��״̬���������ű���ͬ��---------
			var name=$this.find('span').html();
			if(parseInt($this.attr('bF'))){//'BF'==1,�����ѡ
				$this.find('em').removeClass('check');
				$('.addSeleted ul li[id='+$this_id+']').remove();//��������ѡ�Ƴ�
				$('.membersR span[id='+$this_id+']').remove();//memberR����ѡ�Ƴ�
				$('.bmlxr-lb>li .ry[id='+$this_id+']').attr('bF','').children('em').removeClass('check');		
				$this.attr('bF','')//'BF'=='',��־��Ϊδѡ��־
			}else{//'BF'!=1,���δѡ
				$this.find('em').addClass('check');
				//$(".shai").hide();
				//$(".bmlxr-lb").show();
				$('.bmlxr-lb>li>ul li[id='+$this_id+']').find('em').addClass('check');//���ṹ����Ա
				$('.bmlxr-lb>li>ul li[id='+$this_id+']').attr('bF',1);
				
	
				//������ӵ�ǰѡ����
				var $selName=$('<li id='+$this_id+'>'+name+'</li>');
				$('.addSeleted ul').append($selName);
				
				//memberR��ӵ�ǰѡ����:����Ѿ��Ӵ�ѡ����ӹ�,���滻����������ӵ�membersR��
				if($('.membersR span[id='+$this_id+']').length){
					$('.membersR span[id='+$this_id+']').remove();
					$link=$('<span id='+$this_id+'>'+name+'</span>');
					$link.appendTo($('.membersL'));
				}
				var $membersR_span=$('<span class="fromPart" id='+$this_id+'>'+name+'<em>��</em></span>');
				$('.membersR').append($membersR_span);
			
				
				$this.attr('bF','1');
	
		}
			//���¼������ռλ�����ĸ߶�
			nH=$('.fixPart').innerHeight();
			$('.addSeletedCopy').css('height',nH);
			$('.partBox').css('top',nH+'px');
				
		});
	})();
	
		
	$oBody.on('click','.addSeleted ul li',function(){				
		var $this=$(this);
		$this_id=$this.attr("id");
		console.log($('.bmlxr-lb>li .ry[id='+$this_id+']'))
		$('.bmlxr-lb>li .ry[id='+$this_id+']').attr('bF','').children('em').removeClass('check');		
		$('.shai li.ry[id='+$this_id+']').attr('bF','').children('em').removeClass('check');		
		$('.membersR span[id='+$this_id+']').remove();//memberR����ѡ�Ƴ�
		$this.remove();
		
		//���¼������ռλ�����ĸ߶�
		nH=$('.fixPart').innerHeight();
		$('.addSeletedCopy').css('height',nH);
		$('.partBox').css('top',nH+'px');
		return false;
	});
	
	//�Ӳ��������Ա��ɰ�ťbmryBtn����
	$('.bmryBtn').bind('click',function(){
		//������Ա���Ҳ��ǩ��
		var bmSels=null || $('.addSeleted li').length;
//		if(!bmSels){
//			alert('û�������Ա')
//		}
	});
	
	//������ѡ��Ա���ָ���ҳ������̶��ڶ���
	$('#toPart').scroll(function(){
		//�ж��Ƿ��������0
		var iscTop=$('#toPart').scrollTop(); //ҳ���������
		if(iscTop>0){
			$('.addSeletedCopy').show();
			$('.fixPart').addClass('fixPartScroll');
		}else{
			$('.addSeletedCopy').hide();
			$('.fixPart').removeClass('fixPartScroll');			
		}
	});
	$('.tjbmr').bind('click',function(){
		$('#toPart').show();
		var nH=$('.fixPart').innerHeight();
		$('.addSeletedCopy').css('height',nH);
		$('.partBox').css('top',nH+'px');
	})
	//��ȡ�����̶�����Ӧ�еĸ߶�
	
	
	//���²���Ϊ���������������������������أ���������ʾ
	$oBody.bind('click', function(ev) {
	    console.log(sFlag);
	    if(sFlag){
			var touch = ev.originalEvent.changedTouches ? ev.originalEvent.changedTouches[0] : ev;
		    var evt = $(touch.target);
			 if(evt.parents().hasClass('shai')||evt.parents().hasClass('fixPart')){
		    	return; // �����Ԫ�ر����򷵻�
		    }
		    else {
		        $('.shai').hide(); // �粻��������Ԫ��
		        $('.bmlxr-lb').show();
				$('.searchP').removeClass('searchedP')
		        sFlag=0;
		    }  
	    }
	});
	
	//������������б�ť������������أ���������ʾ
		$('.searchP .tolistBtn').bind('click',function(){
			$('.bmlxr-lb').show();
			$('.shai').hide();
			$('.searchP').removeClass('searchedP')
		})
	
	//���������λheader�ķ��ذ�ť�����������������·��أ�������������أ���������ʾ�����û�������������Ҫ���ص���ǩ
		$('#toPart .addHeader .pre-header2').bind('click',function(){
			if(!$('.shai').is(':hidden')){
				$(this).attr('data-dismiss','');
				$('.bmlxr-lb').show();
				$('.shai').hide();
			}else{
				$(this).attr('data-dismiss','modal');
			}
		})
	 
	
