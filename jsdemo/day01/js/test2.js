(function (window) {
    var cons = {};
    cons.log = function (msg) {
        if (window.console) {
            try {
                //window["console"].log(msg);
            } catch (e) {
            }
        }
    };
	
    var touclick = window["TouLocal"] = window["TouLocal"] || {};
	touclick.version="15.2.1";
    touclick["getRandCodeName"] = function (name) {
        var randCode_name = "randCode";
        
        if (name) {
            randCode_name += "_" + name;
        }
        return randCode_name;
    };
   
   touclick["getTouclickHtml"] = function (randCodeName) {
        return '<div class="touclick" name="touclick-' + randCodeName + '"><div class="touclick-wrapper"><div class="touclick-bgimg touclick-reload touclick-reload-normal"></div>' +
	    '<div class="touclick-bgimg touclick-arrow"></div>' +
		'<div class="touclick-img-par touclick-bgimg"  style=" width: 293px; height: 190px;">' +
			'<img class="touclick-image" alt="" src=""/></div></div></div>';
    };

	touclick["checkZByTargeElement"] = function(val){
		val||(val='');
		for(var i=0;i<targetelement.length;i++){
			if(val===targetelement[i]&&targettype[i]==='Z'){
				return 1;
			}
		}
		return 0;
	};
	//img_rand_code_
	touclick["refrshTouClick"] = function(randCodeId){
		try{
			TouClick.get("touclick-" + randCodeId).reload();
		}catch(e){}
	};

	touclick["checkZByRandCodeDom"] = function(obj){
		var tdid = $(obj).data("targetdiv");
		for(var i=0;i<targetdiv.length;i++){
			if(tdid===targetdiv[i]&&targettype[i]==='Z'){
				return 1;
			}
		}
		return 0;
	};

	touclick["checkZInTargetType"] = function(){
		for(var i=0;i<targettype.length;i++){
			if('Z'==targettype[i]){
				return 1;
			}
		}
		return 0;
	};

    touclick["insertCssFile"] = function (href) {
        var tag = document.createElement("link");
        tag.setAttribute('type', 'text/css');
        tag.setAttribute('rel', 'stylesheet');
        tag.setAttribute('href', href);
        $('head')[0].appendChild(tag);
    };
	touclick["testTouclick"] = (function(){
		var times = (new Date()).getTime();
		var ret = function(module,place){
		}
		return ret;
	})();
	touclick["clickCallback"]=function(randCodeName){
		if(!TouLocal.checkZByRandCodeDom(randCodeName)){
			return;
		}
		$('#leftTicketOrderNote').text(login_messages["leftTicketOrderClickCallbackNoteMessage"]);
	}
	touclick["showCallback"] = function(randCodeName){
		if(!TouLocal.checkZByTargeElement(randCodeName)){
			return;
		}
		$('#leftTicketOrderNote').text(login_messages["leftTicketOrderShowCallbackNoteMessage"]);
	}
	touclick["hiddenCallback"] = function(randCodeName){
		if(!TouLocal.checkZByTargeElement(randCodeName)){
			return;
		}
		$('#leftTicketOrderNote').text(login_messages["leftTicketOrderHiddenCallbackNoteMessage"]);
	}
	touclick["common_fun_checkRandCode"] = function(obj){
		var check=false;
		var randCode=obj.value;
		var randCode_validate_obj=obj.nextSibling;
		var randCode_validate=randCode_validate_obj.value;
		
		var targetdiv = $(obj).data("targetdiv");
		var rand = "sjrand";
		var code_type = $("#"+targetdiv).data("code_type");
		if("passenger"==code_type){
			rand = "randp";
		}
		$.ajax({
			url : ctx + "passcodeNew/checkRandCodeAnsyn",
			type : "post",
			data : {
				"randCode" : randCode,
				"rand":	rand,
				"randCode_validate":randCode_validate
			},
			async : false,
			success : function(response){
				if(response&&response.data&&response.data.result == "1"){
					check =  true;
					showSuc(obj);
					showError(obj).hide();
					var scallback = $("#"+targetdiv).data("sucess-callback");
					//console.log(scallback);
					//console.log(window[scallback]);
					if(typeof(window[scallback])==='function'){
						window[scallback]();
					}
				 }else{
					 check =  false;
					 showSuc(obj).hide();
					 if(response&&response.data&&response.data.msg){
						showError(obj,login_messages[response.data.msg]);	
					 }else{
						showError(obj,login_messages["randCodeError"]);
					 }
					 //console.log("fileCallback"+failCallback);
					 failCallback();
				 }
				oldRandCodeValue = randCode;
			}
		});
		return check;
	};
	
	touclick["isEventSupported"] = function(eventName){
        var  element =document.createElement('div');
        eventName = 'on' + eventName;
        var isSupported = (eventName in element);
        if (!isSupported) {
            if (element.setAttribute && element.removeAttribute) {
                element.setAttribute(eventName, '');
                isSupported = typeof element[eventName] == "function";
                if (typeof element[eventName] != "undefined") {
                    element[eventName] = void 0
                };
                element.removeAttribute(eventName);
            }
        }
        element = null;
        return isSupported;
    };
    touclick["isTouch"] = (function(){
    	return touclick["isEventSupported"]("touchstart");
    })();
	touclick["common_fun_verifyRandCode"] =  function(obj,isOk){
		var randCode = obj.value;
		//var targetdiv = $(obj).data("targetdiv");
		var check=true;
		if(!randCode){
			showSuc(obj).hide();
			showError(obj,login_messages['randCodeEmpty']);
			return false;
		}
		if(randCode.length!=4){
			showSuc(obj).hide();
			showError(obj,login_messages['randCodeLentgh']);
			return false;
		}
		var tel = /^[a-zA-Z0-9]+$/;
		if(!tel.test(randCode)){
			showSuc(obj).hide();
			showError(obj,login_messages['randCodeFormat']);
			return false;
		}
		if(!checkRandCode(obj)){
			return false;
		}
		return check;
	};
	
	touclick["touclick_fun_checkRandCode"] = function (obj) {
		var check = false, randCode = obj.value, rand = "sjrand", touclick = TouClick.get("touclick-" + obj.id),ispassenger=0;
		if ("passenger" == $("#" + $(obj).data("targetdiv")).data("code_type")) {
			rand = "randp";
			ispassenger=1;
		}
		$.ajax({
			url: ctx + "passcodeNew/checkRandCodeAnsyn",
			type: "post",
			data: {
				"randCode": randCode,
				"rand": rand
			},
			async: false,
			success: function (response) {
				if (response.data.result == "1") {
					check = true;
					touclick.success();
					//modify by zy 20141218
					//window["TouLocalisPassenger"] !== true 
					if (!ispassenger) {
						setTimeout(function () {
							if (touclick.getState() === 'success') {
								touclick.reload();
							}
						}, 3000);
					}
				} else {
					check = false;
					var msg = response.data.msg;
					touclick.fail();
					if ('' == msg || null == msg) {
					} else {
					}
				}
			}
		});
		return check;
	};
	
	touclick["touclick_fun_verifyRandCode"] = function (obj, isOk) {
		if (typeof (isOk) !== 'boolean') {
			showError(obj, isOk);
			return false;
		}
		var randCode = obj.value;
		var errorMessage = typeof (TouLocal.getErrorMessage) === 'function' ? TouLocal.getErrorMessage(obj) : login_messages['pleaseClickCaptcha'];
		if ('' == randCode || null == randCode) {
			showError(obj, errorMessage, 1);
			if (typeof (touclickHook) === 'function') {
				touclickHook();
			}
			return false;
		}
		if (!checkRandCode(obj)) {
			errorMessage = typeof (TouLocal.getErrorMessage) === 'function' ? TouLocal.getErrorMessage(obj, false) : login_messages['pleaseClickCaptcha'];
			showError(obj, errorMessage, 1);
			return false;
		}
		showError(obj).hide();
		return true;
	};
	
	touclick["common_fun_showError"] = function (obj,msg){
		var targetdiv = $(obj).data("targetdiv");
		var error_msg = $("#error_msg"+targetdiv);
		if(msg){
			error_msg.html(msg).show();
		}
		
		return error_msg;
	};
	
	touclick["common_fun_showSuc"] = function (obj){
		var targetdiv = $(obj).data("targetdiv");
		var i_ok =$("#i-ok"+targetdiv);
		i_ok.css({'display':'inline-block'});
		return i_ok;
	};
    
	//when msg==undefined only return error_msg
	//tag : error tag ; captchaError:1  otherError:2
	touclick["touclick_fun_showError"]=function (obj, msg, tag) {
		var targetdiv = $(obj).data("targetdiv");
		var error_msg = $("#error_msg" + targetdiv);
		if (msg) {
			error_msg.html(msg).show();
			if (tag) {
				error_msg.data("tag", tag);
			}
		}
		return error_msg;
	};
	
	touclick["touclick_fun_showSuc"] = function(){return $('');};
	
	touclick["common_fun_refreshImg"] = function(module,place,randCodeId) {
		
		//randCodeId  is targetelement
		var sourcerandCodeId= randCodeId;
		var imgCheckId="img-check";
		if ("undefined"==typeof(randCodeId)){
		   randCodeId="img_rand_code";
		}else{
		   randCodeId = "img_rand_code_"+randCodeId;
			//imgCheckId="img-check2";
		   imgCheckId="img-check_"+sourcerandCodeId;
		}
		oldRandCodeValue='';
		var randCodeImg = document.getElementById(randCodeId);
		if(randCodeImg){
			//randCodeImg.onload||(randCodeImg.onload=__captcha_reload_fun);
			randCodeImg.src= ctx + "passcodeNew/getPassCodeNew?module="+module+"&rand=" + place + '&' + Math.random();
		}
		
		var $span=$('#i-okmypasscode1');
		$span[0]&&$span.hide();
		var html = $("#"+imgCheckId).html();
		$("#"+imgCheckId).prev().val("");
	//	$("#randCode_validate").val("");
		$("#"+imgCheckId).html(html);
		try{
			//$("#i-ok").hide();
			//if($("#i-ok2")[0]){
				//$("#i-ok2").hide();
			//}
			$("#randCode").val("");
			
			$("#randCode").removeClass("error");
			if($("#randCode2")[0]){
				$("#randCode2").val("");
			}
		}catch(e){};
	};
	
	touclick["touclick_fun_refreshImg"] = function(module,place,randCodeId){
		TouClick.get("touclick-" + TouLocal["getRandCodeName"]( randCodeId)).reload();
	};
	
	//点触验证码的CSS样式  login 表示功能（code_type） _后面跟的是targetelement
    var css = touclick["localCssConfig"] = {};
    //login page
    css["login_"] = {
        "float": {
            "style": { "top": "-27px", "left": "264px", "position": "absolute", "z-index": "100" },
            "arrow": { "direction": "left", "offset": "31" },
            "hook": function (touclickObject, $target) {
                window["TouLocal"].getErrorMessage = function (randCodeDom, check, note) {
                    if (note) {
                        return login_messages["pleaseClickLoginButtonAfterClick"];
                    }
                    if (check === false) {
                        return login_messages["pleaseClickCaptchaRight"];
                    }
                    return login_messages['pleaseClickCaptcha'];
                };
                //添加回车事件绑定
                //when enter keyDown touclickObject.show();
                $target.css({ 'display': 'none' });
                $(touclickObject.getDom()).parent('.captchaButton').css({ 'z-index': '100' });
                return function () { };
            }
        },
		"inside":{
			"style":{},
			"hook":function(touclickObject, $target) {
			 	$("#randCode").css({"display":"none"});
                var $tou = $(touclickObject.getDom());
                $tou.css({ "float": 'left' });
                var captchaButton = $tou.parent();
              	captchaButton.css({"marginTop":"0px","height":"auto","padding-left":"0","zoom":"1"});
              	var ul = captchaButton.parent();
              	var ull = $("<ul></ul>");
              	ull.css({"float":"left","width":"147px"});
              	ul.css({"float":"left","width":"510px","borderLeft":"1px solid #bbb"});
              	ul.find("input").css({"width":"309px"});
              	ull.insertBefore(ul);
              	ul.children('.txt').css({"display":"none"});
              	ul.children('.zc').eq(0).children().appendTo(captchaButton);
              	ul.children('.zc').appendTo(ull);
              	ul.children('.error').css({"position":"absolute"}).wrap($("<div></div>").css({"height":"12px"}));
              	ull.children('.zc').css({"paddingLeft":"0","marginTop":"0px","height":"auto","paddingRight":"10px","zoom":"1"}).eq(0).css({"height":"10px"});
                var loginbut= captchaButton.children("a").css({"width":"155px","float":"left","marginLeft":"6px"}).eq(0).css({"marginLeft":"75px"});
                touclickObject.show();
//                $("<div style='background-position:97px 80px;background-repeat:no-repeat;cursor:pointer;background-image:url("+ctx+"resources/js/newpasscode/floatbg.jpg);background-color:#fff;float:left;width:315px;margin-left:8px;height:192px;margin-top:8px;margin-bottom:8px;border:1px solid #CFCDC7;'></div>").click(function(){
//               		touclickObject.show();
//               		this.style.display="none";
//               	}).insertBefore(loginbut);
               	$("<a href='../gonggao/yzmsysm.html' target='_blank' style='display:block;float:right;margin-right:11px;font-size:12px;line-height:25px;'>验证码如何使用？</a>").insertBefore(loginbut);
                ul.parent().css({"height":"340px"}).parent().next().css({"height":"360px"}).find("li").css({"paddingTop":"28px"});
                $('<span style="float:left;padding-right:2px;display:block;height:30px;width:65px;text-align:right;">验证码：</span>').insertBefore($tou);
                
                window["TouLocal"].getErrorMessage = function (randCodeDom, check, note) {
                    if (check === false) {
                        return login_messages["pleaseClickCaptchaRight"];
                    }
                    return login_messages['pleaseClickBottomCaptcha'];
                };
                return function () {
                };
			}
		}
    };
    //leftTicket login
    css["login_leftTicket-login"] = {
        "float": {
            "style": { "position": "absolute", "left": "50%", 'margin-left': '-155px', 'top': '-199px' },
            "arrow": { "direction": "bottom", "offset": "102" },
            "hookName": "touclickHook_leftTicketLogin",
            "hook": function (touclickObject, $target) {
                window["TouLocal"].getErrorMessage = function (randCodeDom, check, note) {
                    if (note) {
                        return login_messages["pleaseClickLoginButtonAfterClick"];
                    }
                    if (check === false) {
                        return login_messages["pleaseClickCaptchaRight"];
                    }
                    return login_messages['pleaseClickCaptcha'];
                };
                return function () {
                    var relogin = $('#relogin');
                    relogin.parents('.dhtmlx_window_active').css({ 'height': '437px', 'width': '475px' });//319px
                    relogin.parents('.dhtmlx_wins_body_outer').css({ 'height': '437px', 'width': '485px' });
                    relogin.parents('.dhtmlx_wins_body_inner').css({ 'height': '441px', 'width': '477px' });
                    relogin.parent().css({ 'width': '474px', 'height': '441px' });

                    var content = $('#content');
                    content.css({ 'width': '474px' })

                    var $tou = $(touclickObject.getDom());
                    var toup = $tou.parent();
                    toup.parent().css({ 'padding': "44px 0 39px 64px" });
                    toup.parent().parent().css({ 'width': '462px' });
                    toup.siblings('li').css({ 'height': '30px' });
                    $target.parent().parent().parent().css({ 'padding-bottom': '47px' });
                    toup.css({ 'margin-top': '22px' });
                    toup.siblings('.zc').add(toup).css({ 'padding-left': '65px' });
                    //if(toup.siblings('.touclick-leftTicket-login').length==0){
                    //$('<li class="touclick-leftTicket-login"><span class="label">验证码：</span></li>').insertBefore($tou.parent());
                    //}
               	    $tou.parent().siblings('.error').css({ 'line-height': '18px', "height": "20px", "padding": "2px 0 0 25px", 'margin-left': '39px', 'margin-top': '23px' });
               		
                };
            }
        },
        "inside": {
            "style": { "float":"left","margin-left":"-8px"},
            "hookName": "touclickHook_leftTicketLogin",
            "hook": function (touclickObject, $target) {
                window["TouLocal"].getErrorMessage = function (randCodeDom, check, note) {
                    if (note) {
                        //return login_messages["pleaseClickLoginButtonAfterClick"];
                    }
                    if (check === false) {
                        return login_messages["pleaseClickCaptchaRight"];
                    }
                    return login_messages['pleaseClickCaptcha'];
                };
                
                return function () {
                    var relogin = $('#relogin');
                    relogin.parents('.dhtmlx_window_active').css({ 'height': '485px', 'width': '416px' });
                    relogin.parents('.dhtmlx_wins_body_outer').css({ 'height': '485px', 'width': '465px' });
                    relogin.parents('.dhtmlx_wins_body_inner').css({ 'height': '487px', 'width': '465px' });
                    relogin.parent().css({ 'width': '465px', 'height': '484px' });

                    var content = $('#content');
                    content.css({ 'width': '415px' });
                    content.css({ 'height': '486px' });
                    
                    var $tou = $(touclickObject.getDom());
                    $tou.css({"float":"left"});
                    var captchaButton = $tou.parent();
                    var ul = captchaButton.parent().css({"zoom":"1"});
                    var forget_password = ul.children("li").css({"zoom":"1"}).find("input").css({"width":"309px"}).next();
                    forget_password.parent().parent().css({"height":"49px"});
                    if(!forget_password.siblings('.yzmsysm')[0]){
                    	$("<a class='yzmsysm' href='../gonggao/yzmsysm.html' target='_blank' style='display:inline-block;margin-left:125px;font-size:12px;height:20px;'>验证码如何使用？</a>").insertAfter(forget_password);
                    }
                    var lis = ul.children("li");
                    lis.eq(-1).add(lis.eq(-2)).add(lis.eq(-3)).css({"padding-left":"18px","height":"20px","zoom":"1"});
                    lis.eq(-3).css({"height":"24px","margin-top":"-5px"});
                    
                    $("#forget_my_password_id").css({"display":"inline-block","margin-left":"65px","height":"20px"});
                    var login = ul.parent();
                    login.css({'width':"auto","height":"auto","padding":"0","margin":"0"});
                    login.parent().css({"padding":"0"});
                    captchaButton.css({ 'height': 'auto', 'padding-left': '0px',"margin-top":"0" ,"padding-top":"0","zoom":"1"});
                    captchaButton.siblings(".zc").eq(0).css("display","none").children().appendTo(captchaButton);
                    captchaButton.siblings(".txt").eq(0).css({"height":"4px","width":"90%","border-width":"2px","margin":"0 auto","padding":"0"});
                    var loginbut = captchaButton.children("a").css({"width":"155px"}).eq(0).css({"margin-left":"65px"});
                	
                    if (captchaButton.children('.touclick-leftTicket-login-hold').length == 0) {
                        $('<span class="label touclick-leftTicket-login-hold">验证码：</span>').insertBefore($tou);
                    }
                   
                    captchaButton.siblings('.error').css({'line-height': '12px',"background-position":"left top", "height": "20px", "padding": "0px 0 0 19px", 'margin-left': '66px'}).insertAfter($tou);
                	captchaButton.children(".error").wrap("<span style='height:19px;margin-top:-2px;width:100%;display:block;clear:both'></span>");
                	touclickObject.show();
//                	if(!captchaButton.children(".touclick-leftTicket-captcha-hold")[0]){
//	                	$("<div class='touclick-leftTicket-captcha-hold' style='background-position:97px 80px;background-repeat:no-repeat;cursor:pointer;background-image:url("+ctx+"resources/js/newpasscode/floatbg.jpg);background-color:#fff;float:left;width:314px;height:192px;margin-top:8px;margin-bottom:8px;border:1px solid #CFCDC7;'></div>").click(function(){
//		               		this.style.display="none";
//		               		touclickObject.show();
//		               	}).insertBefore(loginbut.prev());
//	                	
//	               	}
                };
            }
        }
    };
    //leftTicket auto submit order
    css["passenger_other"] = {
        "float": {
            "style": { "position": "absolute", "left": "234px", "top": "-187px" },
            "arrow": { "direction": "bottom", "offset": "81" },
            "hook": function (touclickObject, $target) {
            	
                window["TouLocal"].getErrorMessage = function (randCodeDom, check, note) {
                    if (note) {
                        return login_messages["pleaseClickSubmitButtonAfterClick"];
                    }
                    if (check === false) {
                        return login_messages["pleaseClickCaptchaRight"];
                    }
                    return login_messages['pleaseClickCaptcha'];
                };
                
                return function () { };
            }
        },
        "inside": {
            "style": { "z-index": "100", "float": "left", "display": "block" },
            "hook": function (touclickObject, $target) {
                var $tou = $(touclickObject.getDom());
                $tou.css({ "float": 'left' });
                var captchaButton = $tou.parent();
                var yzm = $target.parents('.yzm');
                yzm.css({ 'padding': '0', "height": "auto", 'padding-botton': '5px', "zoom":"1","position":"relative" });
                captchaButton.appendTo(yzm);
                captchaButton.css({ 'height': 'auto', "padding": '0', 'padding-botton': '5px', 'overflow': 'hidden',"zoom":"1"});
                $('<span style="float:left;padding-top:12px;font-size:14px;color:#333;font-family:Tahoma,\"宋体\"">验证码：</span>').insertBefore($tou);
                //$('<div style="clear:left;width:100%;"></div>').insertAfter($tou);
                captchaButton.children('a').css({ 'float': 'left', 'margin-top': '172px' });
                var error_msg = $('#error_msg' + $target.attr('id')).css({ 'position': 'absolute', 'left': '396px', 'top': '116px', 'padding-top': '8px' });
                $("<a href='../gonggao/yzmsysm.html' target='_blank' style='display:inline-block;margin-left:0px;font-size:12px;height:20px;position:absolute;left:398px;top:149px;'>验证码如何使用？</a>").insertAfter(error_msg);
                touclickObject.show();
                window["TouLocal"].getErrorMessage = function (randCodeDom, check, note) {
                    if (note) {
                        return login_messages["pleaseClickSubmitButtonAfterClick"];
                    }
                    if (check === false) {
                        return login_messages["pleaseClickCaptchaRight"];
                    }
                    return login_messages['pleaseClickLeftCaptcha'];
                };
                return function () {


                };
            }
        }
    };
    css["regist_"] = {
        "float": {
            "style": { "top": "-69px", "left": "50%", "marginLeft": "60px", "z-index": "100", "position": "absolute" },
            "arrow": { "direction": "left", "offset": "67" },
            "hook": function (touclickObject, $target) {
                window["TouLocal"].getErrorMessage = function (randCodeDom, check) {
                    if (check === false) {
                        return login_messages["pleaseClickCaptchaRight"];
                    }
                    return login_messages['pleaseClickCaptcha'];
                };
                return function () {
                    cons.log("regist float hook");
                    cons.log(touclickObject.getName());
                    cons.log($target.attr('id'));
                    $('#error_msgmypasscode1').css({ 'margin-left': "361px" });
                };
            }
        },
        "inside":{
        	"style": {'display':'block','margin-left':'310px','float':'left'},
        	"hook": function (touclickObject, $target) {
        		window["TouLocal"].getErrorMessage = function (randCodeDom, check) {
                    if (check === false) {
                        return login_messages["pleaseClickCaptchaRight"];
                    }
                    return login_messages['pleaseClickCaptcha'];
                };
                touclickObject.show();
                var $tou = $(touclickObject.getDom());
                var captchaButton = $tou.parent();
              	captchaButton.css({"margin":"0px 0px 10px 0px","height":"auto","padding-left":"0","zoom":"1",'overflow':'hidden'});
              	var error_msg = $('#error_msg' + $target.attr('id')).css({ 'margin-left': "382px"});
              	error_msg.parent().append(error_msg);
              	$tou.siblings().css({'margin-left':'415px','float':'left',"clear":'left',"display":'block'});
                return function () {};
        	}
        }
    };
    css["findpassword_"] = {
        "inside": {
            "style": { "left": "50%", "marginLeft": "-166px", "z-index": "100", "position": "relative", "display": "block" },
            "hook": function (touclickObject, $target) {
                window["TouLocal"].getErrorMessage = function (randCodeDom, check) {
                    if (check === false) {
                        return login_messages["pleaseClickCaptchaRight"];
                    }
                    return login_messages['pleaseClickCaptcha'];
                };
                $('#error_msgmypasscode1').css({ 'margin-left': "379px" });
                $('#error_msgmypasscode2').css({ 'margin-left': '379px' });
                touclickObject.show();
                return function () {
                };
            }
        }
    };

    css["findpassword_password"] = {
        "float": {
            "style": { "top": "-76px", "left": "50%", "marginLeft": "60px", "z-index": "100", "position": "absolute" },
            "arrow": { "direction": "left", "offset": "85" }
            //hook function is used findpassword_.inside.hook
        }
    };
    css["passenger_"] = {
        "inside": {
            "style": { "z-index": "100", "float": "left", "display": "block" },
            "hook": function (touclickObject, $target) {
               
                var $tou = $(touclickObject.getDom());
                $tou.css({ "float": 'left' });
                var captchaButton = $tou.parent();
                var yzm = $target.parents('.yzm');
                yzm.css({ 'padding': '0', "height": "auto", 'padding-botton': '5px', "zoom":"1","position":"relative" });
                captchaButton.appendTo(yzm);
                captchaButton.css({ 'height': 'auto', "padding": '0', 'padding-botton': '5px', 'overflow': 'hidden',"zoom":"1"});
                $('<span style="float:left;padding-top:12px;font-size:14px;color:#333;font-family:Tahoma,\"宋体\"">验证码：</span>').insertBefore($tou);
                //$('<div style="clear:left;width:100%;"></div>').insertAfter($tou);
                captchaButton.children('a').css({ 'float': 'left', 'margin-top': '172px' });
                var error_msg = $('#error_msg' + $target.attr('id')).css({ 'position': 'absolute', 'left': '396px', 'top': '116px', 'padding-top': '8px' });
                $("<a href='../gonggao/yzmsysm.html' target='_blank' style='display:inline-block;margin-left:0px;font-size:12px;height:20px;position:absolute;left:398px;top:149px;'>验证码如何使用？</a>").insertAfter(error_msg);
                touclickObject.show();
                window["TouLocal"].getErrorMessage = function (randCodeDom, check, note) {
                    if (note) {
                        return login_messages["pleaseClickSubmitButtonAfterClick"];
                    }
                    if (check === false) {
                        return login_messages["pleaseClickCaptchaRight"];
                    }
                    return login_messages['pleaseClickLeftCaptcha'];
                };
                return function () {


                };
            }
        },
        "float": {
            "style": { "position": "absolute", "left": "50%", "margin-left": "-60px", "top": "243px" },
            "arrow": { "direction": "bottom", "offset": "100" }
        }
    };
})(window);

