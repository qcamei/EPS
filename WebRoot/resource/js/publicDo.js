'use strict';
/*
//����Ƿ��ֶ����벢���Ǵ���ȷ�ĸ�ҳ�����
var referStr=document.referrer;
//var searchStr="http://tkvc.eps.group.taikang.com/tkyc/index.html";//������Ŀ����
var searchStr="http://epsout.life.taikang.com/tkyc/";//������Ŀ����
function safeIn(){
		if(!(referStr&&referStr.indexOf(searchStr)==0)){
		window.location.href="http://epsout.life.taikang.com/tkyc/error.html";
	}
}
safeIn();
window.onload=function(){
	safeIn();
}
*/
window.czyid=sessionStorage.getItem('czyid');//ͨ�����ش洢��ȡ����Ա
window.$oBody=$('body').children();//��ͬ��$(document).on()$(document)
$(function(){
	//FastClick.attach(document.body);//fastclick���
	FastClick.attach(document.body);
	//�ж��ǲ����ƶ��豸
	var isMobile=function(){
		if(navigator.userAgent.match(/mobile/i)){
			return true; 
		}else{
			return false;
		}
	}
	//console.log(isMobile())
	$('.home-btn').click(function(){
			window.location.href=indexHref;		
	});
	$('.pre-header').click(function(){
		window.history.back(-1);
	});
	$('#eps-footer span').eq(0).click(function(){
		window.location="../apply/apList.html";
	});
	$('#eps-footer span').eq(1).click(function(){
		window.location="../undo/undoList.html";
	});
	//��ȡ��Ŀ���ƣ�ͬ������Ŀ��ҳ������
	if(sessionStorage.ywmc){
		$('.tailPage>header h1').html(sessionStorage.ywmc)
	}
	//���ݼ�������Ϣ
	//<span class="no-nation">���޸�����Ϣ</span>
	adNoNation();
	function adNoNation(){
		if(!$('.compreNation .link-list a').length){
			var $noNation='<span class="no-nation">���޸�����Ϣ��</span>';
			$('.compreNation .link-list').append($noNation)
		}
	}
	
	//����ҳ������Ϣ
	taiPageTop();
	function taiPageTop(){
		//�ж�չ��С��ť�Ĵ������
		var x=$(".nation-base ul").height();
		var y=$(".orign").height();
		if(x>y){
			$(".arrow").show();			
		}else{
			$(".arrow").hide();
		}
		//������Ϣ����չ��ͼ���л�
		var t=1;
		$(".arrow").bind('click',function(){
			var $tar=$(this).find('img');
			x=$(".nation-base ul").height();
			$tar.toggleClass("bottom");
			var $listBox=$(this).prev();
//			$listBox.css('transition','.1s ease-in-out');
//			$listBox.css('-webkit-transition','.1s ease-in-out');
			if(t){
				$listBox.css('height',x+'px');//չ��
				t=0;
			}else{
				$listBox.css('height',y+'px');//����	
				t=1;
			}
		});
	}
	window.taiPageTop=taiPageTop;

	//������Ϣ��������Ϣ�鿴�л�
	styleNationTab();
	function styleNationTab(){
		$(document).on('click','.style-nation ol li',function(){
			var $thisIndex=$(this).index();
			$(this).addClass('on').siblings().removeClass('on');
			$('.style-nation>ul>li').eq($thisIndex).show().siblings().hide();
		})
	}
	
		
	//��ѡ��ť
	$oBody.on('click','.checkRadioBox',function(){
		var $this=$(this);
		$this.find('input').addClass('check');
		$this.siblings('.checkRadioBox').find('input').removeClass('check');
	})
	//��������������
	$oBody.on('click','.ellip',function(){
		var thisTxt=$(this).find('span').html();
		if(!$('.total-text').length){
			var $totalText=$('<div class="total-text" style="display:none;"></div>');
			$totalText.appendTo($('body'))
		}else{
			$totalText=$('.total-text');
		}
		$totalText.html(thisTxt).hide().fadeIn();
		return false;
	});
	($oBody,$(document)).on('click','.total-text',function(){
		$(this).hide().fadeOut();
	});
	//list������
	$('.list-select input').focus(function(){
		$(this).css('text-align','left');
		$(this).attr('placeholder','');
		$(this).css('background-position','3% center');
	}).blur(function(){
		$(this).css('text-align','center');
		$(this).attr('placeholder','����');
		$(this).css('background-position','42% center');
	});

}); 
//�ı�������㺯��
window.ellip=function(){
	$('.ellipTable td').each(function(i){
		var $This=$(this);
		var outerH=$This.find('em').height();
		var innerH=$This.find('span').height();
		if(innerH>outerH){
			var innerH=$This.find('span').height();
			$This.addClass('ellip');
		}
	})
}
//
//�ı�������㺯��
window.tabFn=function(){
	$('.tabBox .bd>li').eq(0).show().siblings().hide();
	$(document).on('click','.tabBox .hd>li',function(){
		$('.tabBox .bd>li').eq($(this).index()).show().siblings().hide();
		$(this).addClass('on').siblings().removeClass('on');
	})
}