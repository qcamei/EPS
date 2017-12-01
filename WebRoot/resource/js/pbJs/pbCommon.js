	//console.log(isMobile())
	$('.home-btn').click(function(){
			window.location.href=indexHref;		
	});
	$('.pre-header').click(function(){
		window.history.back(-1);
	});
	$('#eps-footer span').eq(0).click(function(){
		window.location="../myPro/proList.html";
	});
	$('#eps-footer span').eq(1).click(function(){
		window.location="../undo/undoList.html";
	});
	//listËÑË÷¿ò
	$('.list-select input').focus(function(){
		$(this).css('text-align','left');
		$(this).attr('placeholder','');
		$(this).css('background-position','3% center');
	}).blur(function(){
		$(this).css('text-align','center');
		$(this).attr('placeholder','ËÑË÷');
		$(this).css('background-position','42% center');
	});

