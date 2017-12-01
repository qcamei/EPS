'use strict';
/*
//检测是否手动进入并且是从正确的父页面进入
var referStr=document.referrer;
//var searchStr="http://tkvc.eps.group.taikang.com/tkyc/index.html";//生产项目域名
var searchStr="http://epsout.life.taikang.com/tkyc/";//测试项目域名
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
window.czyid=sessionStorage.getItem('czyid');//通过本地存储获取操作员
window.$oBody=$('body').children();//等同于$(document).on()$(document)
$(function(){
	//FastClick.attach(document.body);//fastclick插件
	FastClick.attach(document.body);
	//判断是不是移动设备
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
	//获取项目名称，同步到项目主页标题上
	if(sessionStorage.ywmc){
		$('.tailPage>header h1').html(sessionStorage.ywmc)
	}
	//内容及附件信息
	//<span class="no-nation">暂无更多信息</span>
	adNoNation();
	function adNoNation(){
		if(!$('.compreNation .link-list a').length){
			var $noNation='<span class="no-nation">暂无更多信息…</span>';
			$('.compreNation .link-list').append($noNation)
		}
	}
	
	//详情页基本信息
	taiPageTop();
	function taiPageTop(){
		//判断展开小按钮的存在与否
		var x=$(".nation-base ul").height();
		var y=$(".orign").height();
		if(x>y){
			$(".arrow").show();			
		}else{
			$(".arrow").hide();
		}
		//基本信息更多展开图标切换
		var t=1;
		$(".arrow").bind('click',function(){
			var $tar=$(this).find('img');
			x=$(".nation-base ul").height();
			$tar.toggleClass("bottom");
			var $listBox=$(this).prev();
//			$listBox.css('transition','.1s ease-in-out');
//			$listBox.css('-webkit-transition','.1s ease-in-out');
			if(t){
				$listBox.css('height',x+'px');//展开
				t=0;
			}else{
				$listBox.css('height',y+'px');//收缩	
				t=1;
			}
		});
	}
	window.taiPageTop=taiPageTop;

	//内容信息与流程信息查看切换
	styleNationTab();
	function styleNationTab(){
		$(document).on('click','.style-nation ol li',function(){
			var $thisIndex=$(this).index();
			$(this).addClass('on').siblings().removeClass('on');
			$('.style-nation>ul>li').eq($thisIndex).show().siblings().hide();
		})
	}
	
		
	//单选按钮
	$oBody.on('click','.checkRadioBox',function(){
		var $this=$(this);
		$this.find('input').addClass('check');
		$this.siblings('.checkRadioBox').find('input').removeClass('check');
	})
	//表格内容溢出处理
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
	//list搜索框
	$('.list-select input').focus(function(){
		$(this).css('text-align','left');
		$(this).attr('placeholder','');
		$(this).css('background-position','3% center');
	}).blur(function(){
		$(this).css('text-align','center');
		$(this).attr('placeholder','搜索');
		$(this).css('background-position','42% center');
	});

}); 
//文本溢出计算函数
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
//文本溢出计算函数
window.tabFn=function(){
	$('.tabBox .bd>li').eq(0).show().siblings().hide();
	$(document).on('click','.tabBox .hd>li',function(){
		$('.tabBox .bd>li').eq($(this).index()).show().siblings().hide();
		$(this).addClass('on').siblings().removeClass('on');
	})
}