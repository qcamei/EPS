window.$oBody=$('body').children();//等同于$(document).on()$(document)
//-------------------------------------------审批----------------------//
app.controller('bmryControl', function($scope, $http) {
	oStorage = window.sessionStorage;
	var ywbh = sessionStorage.getItem('ywbh');
	// var czyid=sessionStorage.getItem('id');
	$scope.search = function(){
		var czyid = sessionStorage.getItem('czyid');
		var hcid = sessionStorage.getItem('hcid');
		var dlh = '';
		var mc = $("#sslxr").val();
		myUrl =connectPath+'/utilCtrl/getRylist.do?callback=JSON_CALLBACK&czyid='+czyid+'&dlh='+encodeURI(encodeURI(dlh))+'&mc='+encodeURI(encodeURI(mc))+'&hcid='+hcid;
	    $http.jsonp(myUrl).success(function(data){
	        console.log(data);
	        $scope.data=data;
	        alert("aa");
			var ul=$('<ul></ul>').show();
			    // ul.insertAfter($(".bmlxr-lb"));
			    $(".shai").show().append(ul);

			for(var i=0;i<data.length;i++){
				var $liry=$('<li id='+data[i].ID+' class="ry"><span>'+data[i].MC+'</span>'+'('+data[i].BMMC+')'+'<em></em></li>');
				ul.append($liry);
			}
			$(".bmlxr-lb").hide();
	        
	    }).error(function(data,header,config,status){
	    	alert(header);
	    });
	};

	//var czyid='ff80808133cfedde0133d02e8edb133b';
	//-------------------------------------部门----------------------
	bmURL=connectPath+'/utilCtrl/getRytree.do?callback=JSON_CALLBACK&czyid='+czyid;
	$scope.bmTreeFn=function(){
		if(!iLoadJson.iLoad5){
			$('.loader').show();
			$http.jsonp(bmURL).success(
				function(data){
					iLoadJson.iLoad5=1;
					//加载效果去除
					if(iLoadJson.iLoad5){
					    $('.loader').hide();
					}
					console.log(data);
					$scope.bmxx=data;
				}
			).error(function(){
				layer.alert('加载出错啦')
			});
			oStorage.setItem('hcid',data[0].id);

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
                	
                    // Define your normal link function here.
                    // Alternative: instead of passing a function,
                    // you can also pass an object with
                    // a 'pre'- and 'post'-link function.
                });
            }
        };
});
	
	$oBody.on('click','.bmlxr-lb>li>ul h3',function(){//部门名称点击图标和人员加载	
		var $this=$(this);
		//图标状态
		$this.find('i').toggleClass('arr');
		$this.siblings('ul').slideToggle(160);
		//默认人员未加载，if 有ryjzzt(人员加载状态)这个属性，则表示已经加载过了，不在进行加载。
		if($this.attr('ryjzzt')){
			return;
		}else{
			$('.loader').show();
			this_hcid=$this.attr('id');
			oStorage.setItem('hcid',this_hcid);
			$.ajax({
				type:"get",
				url:connectPath+'/utilCtrl/getRylist.do?callback=?&czyid='+czyid+'&hcid='+this_hcid,
				dataType:'jsonp',
				success:function(data){
					console.log(data)
					$('.loader').hide();
					if(data){
						var $ryUl=$('<ul></ul>').show();
						$ryUl.insertAfter($this);
						for(var i=0;i<data.length;i++){
							var $liry=$('<li id='+data[i].ID+' class="ry"><span>'+data[i].MC+'</span><em></em></li>');
							$ryUl.append($liry);
						}
					}
					$this.attr('ryjzzt',1);

				}
			});
		}

	});

	

	
	//树结构下人员点击：选择或取消选择，同步至顶部已选和memberR内
	(function(){
		$oBody.on('click','.bmlxr-lb>li>ul li.ry',function(){	
			var $this=$(this);
			$this_id=$this.attr("id");
			//$this.attr('bF','1');
			var name=$this.find('span').html();
			if(parseInt($this.attr('bF'))){//'BF'==1,如果已选
				$this.find('em').removeClass('check');
				$('.addSeleted ul li[id='+$this_id+']').remove();//顶部的已选移除
				$('.membersR span[id='+$this_id+']').remove();//memberR的已选移除
				$this.attr('bF','')//'BF'=='',标志改为未选标志
			}else{//'BF'!=1,如果未选
				$this.find('em').addClass('check');
				
				//顶部添加当前选择人
				var $selName=$('<li id='+$this_id+'>'+name+'</li>');
				$('.addSeleted ul').append($selName);
				
				//memberR添加当前选择人 添加类'fromPart'以区别从待选框里添加的人员
				var $membersR_span=$('<span class="fromPart" id='+$this_id+'>'+name+'<em>×</em></span>');
				$('.membersR').append($membersR_span);
				
				$this.attr('bF','1')
	
			}
			//重新计算更新占位容器的高度
			nH=$('.fixPart').innerHeight();
			$('.addSeletedCopy').css('height',nH)
				
		});
	})();
    
    $(".shai").click(function(){
    	$(this).hide();
    });
	//树结构下筛选人员点击
	(function(){
		$oBody.on('click','.shai ul li.ry',function(){	
			var $this=$(this);
			$this_id=$this.attr("id");
			//$this.attr('bF','1');
			var name=$this.find('span').html();
			if(parseInt($this.attr('bF'))){//'BF'==1,如果已选
				$this.find('em').removeClass('check');
				$('.addSeleted ul li[id='+$this_id+']').remove();//顶部的已选移除
				$('.membersR span[id='+$this_id+']').remove();//memberR的已选移除
				$this.attr('bF','')//'BF'=='',标志改为未选标志
			}else{//'BF'!=1,如果未选
				$this.find('em').addClass('check');
				$this.parent("ul").empty().hide();
				$(".shai").hide();
				$(".bmlxr-lb").show();
				$('.bmlxr-lb>li>ul li[id='+$this_id+']').find('em').addClass('check');
				$('.bmlxr-lb>li>ul li[id='+$this_id+']').attr('bF','1');

				//顶部添加当前选择人
				var $selName=$('<li id='+$this_id+'>'+name+'</li>');
				$('.addSeleted ul').append($selName);
				
				//memberR添加当前选择人
				var $membersR_span=$('<span id='+$this_id+'>'+name+'<em>×</em></span>');
				$('.membersR').append($membersR_span);
				
				$this.attr('bF','1');

	
			}
			//重新计算更新占位容器的高度
			nH=$('.fixPart').innerHeight();
			$('.addSeletedCopy').css('height',nH)
				
		});
	})();
	
	
	$oBody.on('click','.addSeleted ul li',function(){				
		var $this=$(this);
		$this_id=$this.attr("id");
		console.log($('.bmlxr-lb>li .ry[id='+$this_id+']'))
		$('.bmlxr-lb>li .ry[id='+$this_id+']').attr('bF','').children('em').removeClass('check');		
		$('.membersR span[id='+$this_id+']').remove();//memberR的已选移除
		$this.remove();
		
		//重新计算更新占位容器的高度
		nH=$('.fixPart').innerHeight();
		$('.addSeletedCopy').css('height',nH)
	});
	
	//从部门添加人员完成按钮bmryBtn操作
	$('.bmryBtn').bind('click',function(){
		//保存人员至右侧加签框
		var bmSels=null || $('.addSeleted li').length;
		if(!bmSels){
			alert('没有添加人员')
		}
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
	
	var nH=$('.fixPart').innerHeight();
	$('.addSeletedCopy').css('height',nH)
