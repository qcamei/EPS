	"use strict";
	/*
	 * �������ר�������������ģ�
	 * �ڻ�ȡ���ݳɹ������
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
					layer.alert('�ļ�����ʧ�ܣ��뵽PC�˲鿴');
			}
		}catch(e){
			layer.alert('�ļ�����ʧ�ܣ��뵽PC�˲鿴');
		}
	}
