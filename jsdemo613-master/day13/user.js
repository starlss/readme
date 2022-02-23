(function(w){
	
	//局部变量  存储所有的用户数据  
	var data=[];
	// 标识变量 默认为true表示当前是新增数据  为false表示是修改数据 
	//var isadd=true;
	//存储当前修改的数据的索引 
	var currentIndex=-1;
	
	//分页信息
	var page=1;  //默认显示第一页数据  
	var pageSize=3; //默认一页显示多少条数据
	var pageTotal=1; // 总共多少页 
	
	//本地存储的key
	const LOCAL_KEY="_localuser";
	
	var $=function(id){
		return document.getElementById(id);
	};
	
	//获取tbody表格内容的元素
	var tBody=$("userlist");
	
	//用户添加事件
	function add(){
		currentIndex=-1;
		clear();
		chg();
	}
	
	//关闭保存界面
	function cls(){
		//调用更改样式
		chg();
	}
	
	//更改样式
	function chg(){
		//根据id获取保存 Dom对象
		var save=$("save");
		//获取样式名save.className
		//设置样式名 更改显示效果
		//save.className=cname;
	   save.classList.toggle("hid");
	}
	
	//保存功能 
	function save(){
		//根据className获取所有用户输入的内容  
		var el=document.getElementsByClassName("ipt");
		//console.log(el)
		//遍历类数组对象 
		//方法一 
		convertFromObject(el);
		
		//方法二  
		//userEach(el);
	   // hobby();
		//getAllIptValue();
	}
	
	//定义一个方法 清空
	function clear(){
		$("username").value="";
		$("password").value="";
		$("email").value="";
		$("mobile").value="";
	}
	
	// 方法一 获取所有的值 
	function  getAllIptValue(){
		//定义 一个变量指定方法document.getElementById
		//let a=document.getElementById;
		
		let username=$("username").value;
		var password=$("password").value;
		var email=$("email").value;
		var mobile=$("mobile").value;
		//功能完善要求  验证用户名 密码不能为空 密码至少6位
		//扩展  验证email  mobile 格式 正确  
		//将结果合成一个对象 
		var user={
			"username":username,
			"password":password,
			"email":email,
			"mobile":mobile
		};
		
		console.log("用户信息:",user)
	}
	
	//根据标签名获取所有的元素
	function  queryAllElementByTagName(){
		var el=document.getElementsByTagName("input")
		console.log(el)
	}
	
	//获取用户的爱好 
	function hobby(){
		//根据name获取所有的元素 
		var el=document.getElementsByName("hobby");
		//将el转换成数组
		el=Array.from(el);
		//定义一个数组 用来存储爱好
		var rs=[];
		//遍历
		el.forEach(function(cb){
			//判断cb是否被选中
			if(cb.checked){
				rs.push(cb.value)
			}
		})
		//遍历完
	   return rs; //将结果返回
	}
	// for遍历类数组对象 
	function userEach(el){
		for(var i=0;i<el.length;i++){
			//获取当前对象
			var tmp=el[i];
			console.log(tmp)
		}
	}
	
	//将类数组转换成数组遍历
	function convertFromObject(el){
		//将类数组对象 转换成数组
		el=Array.from(el);
		var user={};
		//遍历所有输入
		el.forEach(function(ipt){
			user[ipt.id]=ipt.value;
		}) 
		
		//验证用户名
		if(user.username==""){
			$("usernameerror").innerHTML="<span style='color:#ff0000'>用户名不能为空！</span>";
			return;
		}else{
			$("usernameerror").innerHTML="";
		}
		
		//验证密码不能为空
		if(user.password=="" || user.password.length<6){
			alert("请输入至少6位密码！");
			return;
		}
		
		
		//将爱好结果加到user对象 上
		user.hobby=hobby();
		
		//说明新增数据
		if(currentIndex==-1){
			//将user对象加入到data数据集里
			data.push(user);
		}else{
			//修改数据 currentIndex
			//data[currentIndex]=user;
			data.splice(currentIndex,1,user);
		}
		
		// 保存到当前会话中
		//sessionStorage.setItem(LOCAL_KEY,JSON.stringify(data))
		localStorage.setItem(LOCAL_KEY,JSON.stringify(data))
		
		//更新用户列表
		init();
		
		//关闭窗口
		cls();
	}
	
	//显示用户数据 
	function init(){
		//先将之前的内容清除了 
		//方式一 最简单 
		//tBody.innerHTML="";
		//方式二 删除所有行数据
		removeAll();
        insertElement();	
	    //刷新或访问显示分页信息
	    topage();
	}
	
	//删除所有的数据
	function removeAll(){
		//获取tbody下的所有行tr
		var el=tBody.getElementsByTagName("tr");
		//先将类数组对象el转换为数组
		el=Array.from(el);
		el.forEach(function(e){
			tBody.removeChild(e);
		})
	}
	
	//更新页面数据
	function insertElement(){
		
		//获取当页的数据 
		//从数据第几条数据开始显示  
		var start=(page-1)*pageSize;
		var end=page*pageSize;
		
		//从数据源data中获取从start开始 到end结束的子数组 
		var curData=data.slice(start,end);
		
		//获取tbody元素
		//遍历curData  代表着当前页的数据
		curData.forEach(function(user,index){
			//创建一行 
			var tr=document.createElement("tr");
			//创建class属性节点添加到tr上
			//createAttribueAndAppend(tr,"class","trw");
			//直接在tr上添加属性
			tr.setAttribute("class","trw");
			tr.setAttribute("id","user"+index);
			//创建第一列并加入tr
			createAndAppend(tr,index+1);
			//创建第二列
			createAndAppend(tr,user.username);
			//创建第三列
			createAndAppend(tr,user.mobile);
			//创建第四列
			createAndAppend(tr,user.email);
			//创建第五列
			createAndAppend(tr,"<a href='javascript:mod("+index+")'>修改</a> | <a href='javascript:del("+index+")'>删除</a>");
			//将tr添加到obj上
			tBody.appendChild(tr);
			
		})
		
	}
	
	
	//修改用户
	function mod(index){
		isadd=false;
		currentIndex=index;
		//获取要修改的当前 数据
		var tmp=data[index];
		console.log(tmp)
		//显示保存界面 
		chg("add");
		$("username").value=tmp.username;
		$("password").value=tmp.password;
		$("email").value=tmp.email;
		$("mobile").value=tmp.mobile;
	}
	
	//删除方法
	function del(index){
		var flag=w.confirm("您确定要删除吗?")
		if(!flag)
		   return;
		//根据索引获取要删除的节点
		var node=$("user"+index);
		//将其从tbody中删除
		tBody.removeChild(node);
		//将下标为index的对象从data数组里移除 
		data.splice(index,1);
		//将data同步到本地存储
		localStorage.setItem(LOCAL_KEY,JSON.stringify(data));
	}
	
	/**
	 * 创建属性节点并追加到元素上
	 * @param {Object} tr
	 * @param {Object} attName 要创建的属性名
	 * @param {Object} attValue 要创建的属性值 
	 */
	function createAttribueAndAppend(tr,attName,attValue){
		//根据属性名创建属性节点
		var att=document.createAttribute(attName);
		//将属性值赋值给att属性
		att.value=attValue;
		//将当前属性追加到tr上
		tr.setAttributeNode(att);
		console.log("att==",att)
	}
	
	//更新页面数据 
	
	function insertElement2(){
		//获取tbody元素
		//遍历data
		data.forEach(function(user,index){
			//创建一个tr元素
			var tr=document.createElement("tr");
			createAndAppend(tr,index+1);
			//遍历当前user对象
			for(var u in user){
				if(u=="password")
				   continue;
				createAndAppend(tr,user[u]);
			}
			//将当前行加入到tbody中
			tBody.appendChild(tr);
			//console.log("tr>>>>",tr)
			
		});
	}
	
	/**
	 * 创建列td
	 * @param {Object} tr  要在哪个行对象上增加列
	 * @param {Object} colData 当前列的数据 
	 */
	function createAndAppend(tr,colData){
		//创建td元素
		var td=document.createElement("td");
		td.innerHTML=colData;
		//创建一个文本节点
		//var text=document.createTextNode(colData);
		//console.log(text)
		//将文本节点添加到td元素上
		//td.appendChild(text);
		//将td追加到tr上
		tr.appendChild(td);
	}
	
	insertElement();
	
	//使用innerHTML插入
	function insert(){
		var str="";//用于拼接每行内容 
		data.forEach(function(user,index){
			str+="<tr class=\"trw\">";
			str+="<td>"+(index+1)+"</td>";
			str+="<td>"+user.username+"</td>";
			str+="<td>"+user.mobile+"</td>";
			str+="<td>"+user.email+"</td>";
			str+="<td>&nbsp;</td>";
			str+="</tr>";
		});
		console.log(str)
		tBody.innerHTML=str;
	}
	
	
	//页面加载完后执行的初始化方法
	function initData(){
		//获取本地存储的用户数据
		//var tmp=sessionStorage.getItem("_localuser");
		var tmp=localStorage.getItem(LOCAL_KEY);
		if(tmp){
			tmp=JSON.parse(tmp);//将字符串转换为对象 
		}
		//更新data
		data=tmp || []; 
		//更新列表
		 init();
		 
		
	}
	
	
	
	//显示分页
	function topage(){
		
		
		//获取总记录数 
		var total=data.length;
		var tp=parseInt(total/pageSize);
		//计算总页数 
		pageTotal= total%pageSize==0?tp:(tp+1);
		
		//获取page对象
		var pobj=$("page");  
		//先清空
		pobj.innerHTML="";
		
		//  创建首页
		createA(pobj,"首页",1)
		
		// 如果当前页不是第一页  有上一页
		if(page>1){
			var tmp=parseInt(page)-1;
			createA(pobj,"上一页",tmp)
		}
		
		//如果当前页不是最后一页  有下一页
		if(page<pageTotal){
			var tmp=parseInt(page)+1;
			createA(pobj,"下一页",tmp)
		}
		
		//末页
		createA(pobj,"末页",pageTotal)
		
	}
	
	//页面跳转元素创建
	function  createA(po,pageinfo,dispage){
		var aobj=document.createElement("a");
		aobj.innerHTML=pageinfo;
		aobj.setAttribute("href","javascript:goto("+dispage+")");
		po.appendChild(aobj);
	}
	
	function goto(pg){
		//更改当前页
		page=pg;
		//刷新页面数据
		init();
	}
	
	
	
	//刷新或访问页面时执行
	initData();
	
	
	
	//对外统一暴漏接口
	w.save=save;
	w.add=add;
	w.cls=cls;
	w.del=del;
	w.mod=mod;
	w.goto=goto;
})(window);

