
	window.$oBody=$('body').children();//等同于$(document).on()$(document)
	var sFlag=0;
	var hcid='';//定义回传ID,默认为空，默认搜索本级部门人员
	//-------------------------------------------审批----------------------//
	app.controller('bmryControl', function($scope, $http) {
		var ywbh = sessionStorage.getItem('ywbh');
		// var czyid=sessionStorage.getItem('id');
		$scope.search = function(){
			if(!$('#sslxr').val()){
				layer.alert('请输入内容!');
				return;
			}
			$('.loader').show();
			$('.shai').show().children('ul').html('');
			var czyid = sessionStorage.getItem('czyid');
			var dlh = '';
			var mc = $("#sslxr").val();
			//myUrl =connectPath+'/utilCtrl/getRylist.do?callback=JSON_CALLBACK&czyid='+czyid+'&dlh='+encodeURI(encodeURI(dlh))+'&mc='+encodeURI(encodeURI(mc))+'&hcid='+hcid;//回传id决定搜索部门范围
			myUrl =connectPath+'/utilCtrl/getRylist.do?callback=JSON_CALLBACK&czyid='+czyid+'&dlh='+encodeURI(encodeURI(dlh))+'&mc='+encodeURI(encodeURI(mc));//默认从跟单位搜索
			console.log(myUrl)
		    $http.jsonp(myUrl).success(function(data){
		    	$('.loader').hide();
		        console.log(data);
		        $scope.data=data;
		        if(!$scope.data.length){
		        	layer.alert('没有搜到数据');
		        }else{
		        	$('.searchP').addClass('searchedP');
					var ul=$('.shai ul').show();
					for(var i=0;i<data.length;i++){
						//$('.tolistBtn').show();
						//判断是不是选中
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
				sFlag=1;//此标志为搜索结果框显示标志，0为隐藏
		    }).error(function(){
		    	$('.loader').hide();
		    	layer.alert('加载失败');
		    });
		};
	
		//-------------------------------------部门----------------------
		bmURL=connectPath+'/utilCtrl/getRytree.do?callback=JSON_CALLBACK&czyid='+czyid;
		$scope.bmTreeFn=function(){
			if(!iLoadJson.iLoad5){
				$('.loader').show();
				$http.jsonp(bmURL).success(
					function(data){
						//hcid=data[0].items[0].id;
						iLoadJson.iLoad5=1;
						//加载效果去除
						if(iLoadJson.iLoad5){
						    $('.loader').hide();
						}
						console.log(data);
						$scope.bmxx=data;
					}
				).error(function(){
					$('.loader').hide();
					layer.alert('加载出错啦')
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
		
		$oBody.on('click','.bmlxr-lb h3',function(){//部门名称点击图标和人员加载	
			var $this=$(this);
			hcid=$this.attr('id');
			console.log(hcid);
			$this.find('i').toggleClass('arr');
			$this.siblings('ul').slideToggle(160);
			if($this.siblings('ul').children('li').length){
				return;
			}
			else{bmryLoad($this);}
			//默认人员未加载，if 有ryjzzt(人员加载状态)这个属性，则表示已经加载过了，不在进行加载。
		});
		
		//点击根部门，回传id设置为空，从本级部门搜索
		$oBody.on('click','.bmlxr-lb>li>h3',function(){
			var $this=$(this);
			hcid='';
		});
		
		//树结构下人员加载
		//默认人员未加载，if 有ryjzzt(人员加载状态)这个属性，则表示已经加载过了，不在进行加载。并且通过人员id判断是否已经选中
		function bmryLoad($_obj,yr_id){//$_obj指向部门名称节点
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
							for(var i=0;i<data.length;i++){//加载数据时判断是否已经在其它地方选中，如果有选中同时添加选中标志
								var $liry=$('<li id='+data[i].ID+' class="ry"><span>'+data[i].MC+'</span><em></em></li>');
								if($('.addSeleted li[id='+data[i].ID+']').length){
									$liry.find('em').addClass('check');
									$liry.attr('bF','1')
								}
								$ryUl.append($liry);
							}
						}
						$('.bmlxr-lb li[id='+yr_id+']').attr('bF',1).find('em').addClass('check');//此行仅在点击搜索结果里的人员有效
						$_obj.attr('ryjzzt',1);
					}
				});
			};
		}
		//树结构下人员点击：选择或取消选择，同步至顶部已选和memberR内
		(function(){
			$oBody.on('click','.bmlxr-lb>li>ul li.ry',function(){
				var $this=$(this);
				$this_id=$this.attr("id");
				//$this.attr('bF','1');
				var name=$this.find('span').html();
				if(parseInt($this.attr('bF'))){//'BF'==1,如果已选
					$('.bmlxr-lb>li>ul li[id='+$this_id+']').attr('bF',1).find('em').removeClass('check');
					$('.addSeleted ul li[id='+$this_id+']').remove();//顶部的已选移除
					$('.membersR span[id='+$this_id+']').remove();//memberR的已选移除
					$this.attr('bF','')//'BF'=='',标志改为未选标志
				}else{//'BF'!=1,如果未选
					$('.bmlxr-lb>li>ul li[id='+$this_id+']').attr('bF',1).find('em').addClass('check');
					
					//顶部添加当前选择人
					var $selName=$('<li id='+$this_id+'>'+name+'</li>');
					$('.addSeleted ul').append($selName);
					
					//memberR添加当前选择人:如果已经从待选中添加过,则替换，否则再添加到membersR里
					if($('.membersR span[id='+$this_id+']').length){
						$('.membersR span[id='+$this_id+']').remove();
						$link=$('<span id='+$this_id+'>'+name+'</span>');
						$link.appendTo($('.membersL'));
					}
					var $membersR_span=$('<span class="fromPart" id='+$this_id+'>'+name+'<em>×</em></span>');
					$('.membersR').append($membersR_span);
			
					
					$this.attr('bF','1')
		
				}
				//重新计算更新占位容器的高度
				nH=$('.fixPart').innerHeight();
				$('.addSeletedCopy').css('height',nH);
				$('.partBox').css('top',nH+'px');
					
			});
		})();
	
	//树结构下搜索筛选人员点击操作
	(function(){
		$oBody.on('click','.shai ul li.ry',function(){	
			var $this=$(this);
			$this_id=$this.attr("id");
			//--------------同时人员选中状态与其它部门保持同步---------
			var name=$this.find('span').html();
			if(parseInt($this.attr('bF'))){//'BF'==1,如果已选
				$this.find('em').removeClass('check');
				$('.addSeleted ul li[id='+$this_id+']').remove();//顶部的已选移除
				$('.membersR span[id='+$this_id+']').remove();//memberR的已选移除
				$('.bmlxr-lb>li .ry[id='+$this_id+']').attr('bF','').children('em').removeClass('check');		
				$this.attr('bF','')//'BF'=='',标志改为未选标志
			}else{//'BF'!=1,如果未选
				$this.find('em').addClass('check');
				//$(".shai").hide();
				//$(".bmlxr-lb").show();
				$('.bmlxr-lb>li>ul li[id='+$this_id+']').find('em').addClass('check');//树结构下人员
				$('.bmlxr-lb>li>ul li[id='+$this_id+']').attr('bF',1);
				
	
				//顶部添加当前选择人
				var $selName=$('<li id='+$this_id+'>'+name+'</li>');
				$('.addSeleted ul').append($selName);
				
				//memberR添加当前选择人:如果已经从待选中添加过,则替换，否则再添加到membersR里
				if($('.membersR span[id='+$this_id+']').length){
					$('.membersR span[id='+$this_id+']').remove();
					$link=$('<span id='+$this_id+'>'+name+'</span>');
					$link.appendTo($('.membersL'));
				}
				var $membersR_span=$('<span class="fromPart" id='+$this_id+'>'+name+'<em>×</em></span>');
				$('.membersR').append($membersR_span);
			
				
				$this.attr('bF','1');
	
		}
			//重新计算更新占位容器的高度
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
		$('.membersR span[id='+$this_id+']').remove();//memberR的已选移除
		$this.remove();
		
		//重新计算更新占位容器的高度
		nH=$('.fixPart').innerHeight();
		$('.addSeletedCopy').css('height',nH);
		$('.partBox').css('top',nH+'px');
		return false;
	});
	
	//从部门添加人员完成按钮bmryBtn操作
	$('.bmryBtn').bind('click',function(){
		//保存人员至右侧加签框
		var bmSels=null || $('.addSeleted li').length;
//		if(!bmSels){
//			alert('没有添加人员')
//		}
	});
	
	//顶部已选人员部分跟随页面滚动固定在顶部
	$('#toPart').scroll(function(){
		//判断是否滚动大于0
		var iscTop=$('#toPart').scrollTop(); //页面滚动距离
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
	//获取顶部固定部分应有的高度
	
	
	//以下部门为点击搜索部分外区域，搜索结果隐藏，部门树显示
	$oBody.bind('click', function(ev) {
	    console.log(sFlag);
	    if(sFlag){
			var touch = ev.originalEvent.changedTouches ? ev.originalEvent.changedTouches[0] : ev;
		    var evt = $(touch.target);
			 if(evt.parents().hasClass('shai')||evt.parents().hasClass('fixPart')){
		    	return; // 如果是元素本身，则返回
		    }
		    else {
		        $('.shai').hide(); // 如不是则隐藏元素
		        $('.bmlxr-lb').show();
				$('.searchP').removeClass('searchedP')
		        sFlag=0;
		    }  
	    }
	});
	
	//点击返回搜索列表按钮，搜索结果隐藏，部门树显示
		$('.searchP .tolistBtn').bind('click',function(){
			$('.bmlxr-lb').show();
			$('.shai').hide();
			$('.searchP').removeClass('searchedP')
		})
	
	//点击本级单位header的返回按钮：如果是在搜索结果下返回，则搜索结果隐藏，部门树显示；如果没有搜索结果，是要返回到加签
		$('#toPart .addHeader .pre-header2').bind('click',function(){
			if(!$('.shai').is(':hidden')){
				$(this).attr('data-dismiss','');
				$('.bmlxr-lb').show();
				$('.shai').hide();
			}else{
				$(this).attr('data-dismiss','modal');
			}
		})
	 
	
