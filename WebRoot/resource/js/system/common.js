'use strict';
FastClick.attach(document.body);//��Чfastclick

//var currentYhbh = 'ff80808136c556cb0136c56865d04cba';//��ǰ�û�//ff80808136c556cb0136c568d3295eb6/ff80808136c556cb0136c56865d04cba
//var connectPath = 'http://eps.taikang.com/epstk';//��ʽϵͳ��̨����·��64.11:8080
//var currentYhbh = 'ff80808134d683bc0134e42d4c5f013c';//��ǰ�û�//ff80808136c556cb0136c568d3295eb6/ff80808136c556cb0136c56865d04cba//�콨��ff80808134d683bc0134e42d4c5f013c
var connectPath ='http://10.136.24.50:8080/eps-tkyc';//���ԣ�http://epsout.life.taikang.com/epstk//�ѽܣ�http://10.136.89.75:8888/eps-tkyc//'http://10.136.89.207:8080/eps-tkyc';//��ʽϵͳ��̨����·��64.11:8080
var indexHref = 'http://tkvc.eps.group.taikang.com/tkyc/index.html';//��ʽϵͳH5��ҳ·��64.11:8081
var iLoadJson={};
iLoadJson.iLoad0=0;//ҳ�����֮ǰ״̬�����سɹ���Ϊ1

//var sessionCzyid=sessionStorage.getItem('czyid');
//sessionStorage.setItem('czyid',currentYhbh);
$(function(){
	setTimeout(function(){
		if(iLoadJson.iLoad0==0){
			$('.loader').hide();
			layer.open({
				type: 1,
				area: ['200px', 'auto'], //���
				content: '<p style="line-height:80px;text-align:center;" onclick="location.reload();">����ʧ�ܣ��������</p>'
			});
		}
	},15000)
});
//���»�������ˢ��
var stretchFn=function(){
	var $preLoad=$('.preloader')
	var swiper = new Swiper('.stretch-container', {
	    scrollbar: '.swiper-scrollbar',
	    direction: 'vertical',
	    slidesPerView: 'auto',
	    mousewheelControl: true,
	    freeMode: true,
	    onTouchMove:function(swiper){
	    	$preLoad.show();
	    	if(swiper.translate>50){
		    	$preLoad.html('����ˢ��');
	    	}
	    	if(swiper.translate>100){
	    		$preLoad.html('����ˢ��');
	    	}
	    },
	    onTouchEnd:function(swiper){
	    	if(swiper.translate>100){
		    	$preLoad.html('ˢ����');
		    	setTimeout(function(){
		    		location.reload();
		    	},800);
	    	}else{
	    		$preLoad.hide();
	    	}
	    }
	});
}
