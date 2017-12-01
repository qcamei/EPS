window.$oBody=$('body').children();//等同于$(document).on()$(document)
$(function(){
	var $link='';
	var $close='<em>×</em>';
	$oBody.on('click','.membersL span',function(){
		var $this=$(this);
		$this_id=$this.attr('id');
		if(!$('.membersR span[id='+$this_id+']').length){
			$link=$(this).clone().append($close);
			$this.remove();
			$link.appendTo($('.membersR'));
		
		}

		//console.log($link.html())
		//console.log($('.membersR span').length)
	});
	
	$oBody.on('click.move','.membersR span',function(){	
		var $this=$(this);
		var $this_id=$(this).attr('id');
		//点击取消，哪来的回哪去：如果含有类'fromPart'表示从部门添加过来的
		if($this.hasClass('fromPart')){
				$('.addSeleted ul li[id='+$this_id+']').remove();//顶部的已选移除
				$('.bmlxr-lb>li>ul li.ry[id='+$this_id+']').find('em').removeClass('check');//树结构里的已选移除
				$('.bmlxr-lb>li>ul li.ry[id='+$this_id+']').attr('bF','')//'BF'=='',树结构里标志改为未选标志
				
		}else{//不含类fromPart，则回到左侧待选框内
			$link=$(this).css({'position':'relative','left':0,'top':0}).clone();
			//console.log($link.html())
			//alert($link.children('em').html());
			$link.children('em').remove();
			var name=$link.html();
			$link=$('<span id='+$this_id+'>'+name+'</span>');
			$link.appendTo($('.membersL'));
			$('.membersR span').css({'position':'relative','left':0,'top':0})
		}
		$this.remove();//当前的移除
	});
	
});
