window.$oBody=$('body').children();//��ͬ��$(document).on()$(document)
$(function(){
	var $link='';
	var $close='<em>��</em>';
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
		//���ȡ���������Ļ���ȥ�����������'fromPart'��ʾ�Ӳ�����ӹ�����
		if($this.hasClass('fromPart')){
				$('.addSeleted ul li[id='+$this_id+']').remove();//��������ѡ�Ƴ�
				$('.bmlxr-lb>li>ul li.ry[id='+$this_id+']').find('em').removeClass('check');//���ṹ�����ѡ�Ƴ�
				$('.bmlxr-lb>li>ul li.ry[id='+$this_id+']').attr('bF','')//'BF'=='',���ṹ���־��Ϊδѡ��־
				
		}else{//������fromPart����ص�����ѡ����
			$link=$(this).css({'position':'relative','left':0,'top':0}).clone();
			//console.log($link.html())
			//alert($link.children('em').html());
			$link.children('em').remove();
			var name=$link.html();
			$link=$('<span id='+$this_id+'>'+name+'</span>');
			$link.appendTo($('.membersL'));
			$('.membersR span').css({'position':'relative','left':0,'top':0})
		}
		$this.remove();//��ǰ���Ƴ�
	});
	
});
