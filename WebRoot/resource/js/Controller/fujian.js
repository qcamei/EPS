	"use strict";
	/*
	 * 这个函数专门用来处理附件的，
	 * 在获取数据成功后调用
	 */
	window.fjFn=function(path){
		var fileNation=path;
		try{
			fileNation=JSON.parse(fileNation);
			if(fileNation&&fileNation.flag=='success'){
					mgArr=fileNation.list;
					mgArr=JSON.stringify(mgArr);
					sessionStorage.setItem('fileimg',mgArr);
					window.location.href="../../../html/cgsp/file.html";
			}else{
					layer.alert('文件加载失败，请到PC端查看');
			}
		}catch(e){
			layer.alert('文件加载失败，请到PC端查看');
		}
	}
