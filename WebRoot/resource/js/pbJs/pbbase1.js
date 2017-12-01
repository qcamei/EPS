(function(){
	var container=$(".pb-container");
	
	// ȫ�ֵ�domԪ��
	var globalDom={
		container : $(".pb-container"),
		ol_li : container.find(".pb-style-nation>ol>li"),
		ul_li : container.find(".pb-style-nation>ul>li"),
		pre:container.find(".pre"),
		next:container.find(".next"),
		savebtn:$(".home-save"),
		step_li:container.find(".step-ul li"),
		submit_btn:$(".home-save")
	};

	var thisFn={
			init:function(){
				this.step1.init(), //��һ��
				this.step2.init()  //�ڶ���
			},
			step1:{
				init:function(){
					this.olClick(),
					this.pre(), //��һ��
					this.next(), //��һ��
					this.pfsmKeyup(),
					this.itemEvery()
				},
				olClick:function(){  //���֣������л�
					globalDom.ol_li.on("click",function(){
						var $this=$(this);
						var index=$this.index();
						$this.addClass("on").siblings().removeClass("on"); 
						globalDom.ul_li.eq(index).show().siblings().hide();
					});
				},
				pre:function(){  //��һ��
					globalDom.pre.on("click",function(){
						var index=container.find(".show").index();
						if(index == 0){
							layer.alert("�Ѿ���һҳ�ˣ�");
							return;
						}
						globalDom.step_li.removeClass("show").hide();
						globalDom.step_li.eq(index-1).addClass("show").show().siblings().removeClass("show").hide();
						container.find(".pb-box").eq(index).removeClass("show").hide();
						container.find(".pb-box").eq(index-1).addClass("show").show();
						
					});
				},
				next:function(){  //��һ��
					globalDom.next.on("click",function(){
						var index=container.find("li.show").index();
						var length=container.find(".pb-box").length;						
						if(index == length-1){
							layer.alert("���һҳ�ˣ�");
							return;
						}
						
						var bool=thisFn.step1.pfsmFn($(".pb-box.show"));
						if(bool){
							container.find(".pb-box").eq(index).removeClass("show").hide();
							container.find(".pb-box").eq(index+1).addClass("show").show();
							globalDom.step_li.removeClass("show").hide();
						    globalDom.step_li.eq(index+1).addClass("show").show().siblings().removeClass("show").hide();
							$("form").serializeArray();
//							console.log($("form").serializeArray())
						}
						
						$(".pb-box.show").find(".item-every").each(function(){//ÿ�ε��next���¼���ҳ��߶��Լ�����
							var height=$(this).height();
							$(this).find(".every-left").height(height);	
							$(this).find(".every-right").height(height);
							$(this).find(".every-middle").height(height);
					 	});
						
					});
				},

				pfsmFn:function(_box){ //����˵������
//					var _index=_box.index();
					var zong_num=$(".step li.show").find(".page_totle").text();
					if(zong_num.indexOf("-")!=-1){
						var num_arr=zong_num.split("-");
						zong_num=num_arr[0]>num_arr[1]?num_arr[0]:num_arr[1];
					}
					var bz = Number(zong_num)/2;
					var bool=true;
					$(_box).find(".item-every").each(function(_i){
						var $this = $(this);
						var name = $this.parents("ol").siblings(".p-company").html();
						var name_name=$this.find(".every-left").text();
						var	self_text = $this.find(".pfsm");
						if($this.find(":checked").length || $this.find("[checked]").length || $this.find("select").length){
							var self_val =  $this.find("input:checked").val() || $this.find("[checked]").val() || $this.find("select").val();
							if($this.find("input[type=checkbox]:checked").length){
								var checkbox_val=0;
								$this.find("input[type=checkbox]:checked").each(function(){
									var every_val=Number($(this).val());
									checkbox_val+=every_val;
								})
								self_val=checkbox_val;
							}
							$this.removeClass("warn");
							if(self_val < bz && !self_text.val().length){
								self_text.addClass("warn").attr("placeholder","������д����˵��");
								layer.alert("����д����˵��")
								bool = false;
							}
						}else{
							alert(name+"��˾"+name_name+"δ����");
							$this.addClass("warn");
							self_text.removeClass("warn").attr("placeholder","����˵��");
							bool=false;
						}
					});
					
					return bool;
					
				},
				pfsmKeyup:function(){
					$(".pfsm").each(function(){//����˵�����̼���
						$(this).keyup(function(){
							if($(this).val().length){
								$(this).removeClass("warn").attr("placeholder","����˵��");
							}
						});
					});
					
					$(".item-every").each(function(){//δ����ҳ����radio��checkbox,selectʱ������warn��ʾ��󣬵������ÿһ��pȥ��warn��
						var $this=$(this);
						$this.find(".every-middle p").click(function(){
							if($(this).find(":checked").length) {
								$this.removeClass("warn");
								var zong_num=$(".step li.show").find(".page_totle").text();
								if(zong_num.indexOf("-")!=-1){
									var num_arr=zong_num.split("-");
									zong_num=num_arr[0]>num_arr[1]?num_arr[0]:num_arr[1];
								}
								var bz = Number(zong_num)/2;
								var self_val =  $this.find("input:checked").val() || $this.find("[checked]").val() || $this.find("select").val();
								var	self_text = $this.find(".pfsm");
								if($this.find("input[type=checkbox]:checked").length){
									var checkbox_val=0;
									$this.find("input[type=checkbox]:checked").each(function(){
										var every_val=Number($(this).val());
										checkbox_val+=every_val;
									})
									self_val=checkbox_val;
								}
								
								if(self_val >=bz){
									self_text.removeClass("warn").attr("placeholder","����˵��");
								}
							}
						});
					});
					
					$(".item-every").find($("input[type=number]")).each(function(){//��number�������ֵʱ������item-everyδ���ֵ�warn��ȥ��
						$(this).keyup(function(){
							var this_val=$(this).val();
							var	self_text = $(this).parents(".every-middle").find(".pfsm");
							var zong_num=$(".step li.show").find(".page_totle").text();
							if(zong_num.indexOf("-")!=-1){
								var num_arr=zong_num.split("-");
								zong_num=num_arr[0]>num_arr[1]?num_arr[0]:num_arr[1];
							}
							var bz = Number(zong_num)/2;
							if(this_val.length){
								if(!isNaN(this_val)){
									if(this_val<0 || this_val>Number(zong_num)){
										layer.alert("���������ֵ��Χ����");
										$(this).val("");
										$(this).removeAttr("checked","checked");
										return;
									}
									$(this).parents(".item-every").removeClass("warn");
									$(this).attr("checked","checked");
									if(this_val>=bz){
										self_text.removeClass("warn").attr("placeholder","����˵��");
									}
								}else{
									layer.alert("�����������֣�");
									$(this).val("");
									$(this).focus();
									return;
								}
							}else{
								$(this).val("");
								$(this).removeAttr("checked","checked");
								self_text.attr("placeholder","����˵��");
								return;
							}
						});
					});
				},
				itemEvery:function(){//��ʼ���� һЩЧ��

					globalDom.step_li.eq(0).addClass("show");
					$(".pb-box").eq(0).addClass("show").show();

					$(".pb-box.show").find(".item-every").each(function(){
						var height=$(this).height();
						$(this).find(".every-left").height(height);	
						$(this).find(".every-right").height(height);
						$(this).find(".every-middle").height(height);
					});
				}
				
			},
	  		step2:{
  				init:function(){
  					this.checkboxClick(".pb-box"),
  					this.submitFn()
  				},
  				checkboxClick:function(_box){//checkbox���
  					var flag=true;
  					$(_box).find(".item-every").each(function(){
  						var $this=$(this),
  							none=$this.find(".none");
  						$this.on("click",none,function(){
  							if(none.is(":checked")){
  								$this.find(".checkbox").removeAttr("checked");
  							}
  						});
  						$this.on("click",".checkbox",function(){
  							none.removeAttr("checked");
  						});
  					});
  				},
  				submitFn:function(){
  					globalDom.submit_btn.on("click",function(){
  						var bool=thisFn.step1.pfsmFn($(".pb-box"));
  						if(bool){
  							$("form").serializeArray();
							console.log($("form").serializeArray())
							alert("success")
  						}
  					});
  				}
	  		},

	};
	thisFn.init();
}());

