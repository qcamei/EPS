window.$oBody=$('body').children();//��ͬ��$(document).on()$(document)
//-------------------------------------------����----------------------//
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
	//-------------------------------------����----------------------
	bmURL=connectPath+'/utilCtrl/getRytree.do?callback=JSON_CALLBACK&czyid='+czyid;
	$scope.bmTreeFn=function(){
		if(!iLoadJson.iLoad5){
			$('.loader').show();
			$http.jsonp(bmURL).success(
				function(data){
					iLoadJson.iLoad5=1;
					//����Ч��ȥ��
					if(iLoadJson.iLoad5){
					    $('.loader').hide();
					}
					console.log(data);
					$scope.bmxx=data;
				}
			).error(function(){
				layer.alert('���س�����')
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
	
	$oBody.on('click','.bmlxr-lb>li>ul h3',function(){//�������Ƶ��ͼ�����Ա����	
		var $this=$(this);
		//ͼ��״̬
		$this.find('i').toggleClass('arr');
		$this.siblings('ul').slideToggle(160);
		//Ĭ����Աδ���أ�if ��ryjzzt(��Ա����״̬)������ԣ����ʾ�Ѿ����ع��ˣ����ڽ��м��ء�
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

	

	
	//���ṹ����Ա�����ѡ���ȡ��ѡ��ͬ����������ѡ��memberR��
	(function(){
		$oBody.on('click','.bmlxr-lb>li>ul li.ry',function(){	
			var $this=$(this);
			$this_id=$this.attr("id");
			//$this.attr('bF','1');
			var name=$this.find('span').html();
			if(parseInt($this.attr('bF'))){//'BF'==1,�����ѡ
				$this.find('em').removeClass('check');
				$('.addSeleted ul li[id='+$this_id+']').remove();//��������ѡ�Ƴ�
				$('.membersR span[id='+$this_id+']').remove();//memberR����ѡ�Ƴ�
				$this.attr('bF','')//'BF'=='',��־��Ϊδѡ��־
			}else{//'BF'!=1,���δѡ
				$this.find('em').addClass('check');
				
				//������ӵ�ǰѡ����
				var $selName=$('<li id='+$this_id+'>'+name+'</li>');
				$('.addSeleted ul').append($selName);
				
				//memberR��ӵ�ǰѡ���� �����'fromPart'������Ӵ�ѡ������ӵ���Ա
				var $membersR_span=$('<span class="fromPart" id='+$this_id+'>'+name+'<em>��</em></span>');
				$('.membersR').append($membersR_span);
				
				$this.attr('bF','1')
	
			}
			//���¼������ռλ�����ĸ߶�
			nH=$('.fixPart').innerHeight();
			$('.addSeletedCopy').css('height',nH)
				
		});
	})();
    
    $(".shai").click(function(){
    	$(this).hide();
    });
	//���ṹ��ɸѡ��Ա���
	(function(){
		$oBody.on('click','.shai ul li.ry',function(){	
			var $this=$(this);
			$this_id=$this.attr("id");
			//$this.attr('bF','1');
			var name=$this.find('span').html();
			if(parseInt($this.attr('bF'))){//'BF'==1,�����ѡ
				$this.find('em').removeClass('check');
				$('.addSeleted ul li[id='+$this_id+']').remove();//��������ѡ�Ƴ�
				$('.membersR span[id='+$this_id+']').remove();//memberR����ѡ�Ƴ�
				$this.attr('bF','')//'BF'=='',��־��Ϊδѡ��־
			}else{//'BF'!=1,���δѡ
				$this.find('em').addClass('check');
				$this.parent("ul").empty().hide();
				$(".shai").hide();
				$(".bmlxr-lb").show();
				$('.bmlxr-lb>li>ul li[id='+$this_id+']').find('em').addClass('check');
				$('.bmlxr-lb>li>ul li[id='+$this_id+']').attr('bF','1');

				//������ӵ�ǰѡ����
				var $selName=$('<li id='+$this_id+'>'+name+'</li>');
				$('.addSeleted ul').append($selName);
				
				//memberR��ӵ�ǰѡ����
				var $membersR_span=$('<span id='+$this_id+'>'+name+'<em>��</em></span>');
				$('.membersR').append($membersR_span);
				
				$this.attr('bF','1');

	
			}
			//���¼������ռλ�����ĸ߶�
			nH=$('.fixPart').innerHeight();
			$('.addSeletedCopy').css('height',nH)
				
		});
	})();
	
	
	$oBody.on('click','.addSeleted ul li',function(){				
		var $this=$(this);
		$this_id=$this.attr("id");
		console.log($('.bmlxr-lb>li .ry[id='+$this_id+']'))
		$('.bmlxr-lb>li .ry[id='+$this_id+']').attr('bF','').children('em').removeClass('check');		
		$('.membersR span[id='+$this_id+']').remove();//memberR����ѡ�Ƴ�
		$this.remove();
		
		//���¼������ռλ�����ĸ߶�
		nH=$('.fixPart').innerHeight();
		$('.addSeletedCopy').css('height',nH)
	});
	
	//�Ӳ��������Ա��ɰ�ťbmryBtn����
	$('.bmryBtn').bind('click',function(){
		//������Ա���Ҳ��ǩ��
		var bmSels=null || $('.addSeleted li').length;
		if(!bmSels){
			alert('û�������Ա')
		}
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
	
	var nH=$('.fixPart').innerHeight();
	$('.addSeletedCopy').css('height',nH)
