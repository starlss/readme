(function(){
	
	
	//第一步 初始化数据 
	var category=[{
		categoryName: "家用电器",
		hot: ["家电馆", "家电专卖店", "家电服务"],
		twocategory: [{
				name: "电视",
				child: ["全面屏电视", "教育电视", "OLED电视"]
			},
			{
				name: "空调",
				child: ["新风空调", "以旧换新"]
			},
			{
				name: "洗衣机",
				child: ["滚筒洗衣机", "洗洪一体机"]
			}
		]
	},
	{
		categoryName: "手机/运营商/数码",
		hot: ["手机频道", "网上营业厅", "配件频道"],
		twocategory: [{
				name: "手机通讯",
				child: ["手机", "5g手机"]
			},
			{
				name: "运营商",
				child: ["合约机", "手机卡"]
			},
			{
				name: "手机配件",
				child: ["手机壳", "贴膜", "数组线"]
			}
		]
	},
	{
		categoryName: "电脑/办公",
		hot: ["企业采购"],
		twocategory: [{
				name: "电脑整机",
				child: ["笔记本", "游戏本"]
			},
			{
				name: "电脑配件",
				child: ["显示器", "CPU"]
			}
		]
	},
	{
		categoryName: "家居/家具",
		hot: ["家装城", "居家日用"],
		twocategory: [{
				name: "厨具",
				child: ["锅"]
			},
			{
				name: "家访",
				child: ["四件套"]
			}
		]
	}
];
	//声明变量ul  在onload里初始化
	var ul;
	//声明变量div  显示二级类别
	
	
	//第二步  文档加载完事件处理
	//设置全局对象window的onLoad处理
	//onload 是文档(dom/图片等)加载完以后调用 
	window.onload=function(){
		//初始化ul
		ul=document.querySelector("ul");
		//给ul增加鼠标悬停事件 指向第四步
		ul.onmouseover=msover;
		//给ul增加鼠标离开事件 指向第五步
		ul.onmouseout=msout;
		
		//初始化div
		div=document.querySelector(".two_category");
		//给div增加鼠标悬停事件 
		div.onmousemove=divmsover;
		//当鼠标离开 时 
		div.onmouseout=divmsout;
		//调用第三步
		createCategoryList();
	}
	
	
	//第三步  根据数据创建商品列表 在onload方法中调用执行
	function createCategoryList(){
		
		//根据数据创建子元素
		//有多少数据  创建多少个子元素 既每一个元素都要访问
		//建议使用forEach方法
		//val 代表着数组中的每一个值  在这里是字符串
		category.forEach(function(val){
			//创建li元素
			var li=document.createElement("li");
			//设置li的内容 
			li.innerText=val.categoryName;
			//将li元素追加到ul下做为它的子元素
			ul.appendChild(li);
		});
	}
	
	
	//第四步 鼠标悬停事件  event事件对象 
	function msover(event){
		//调用第六步
		ms(event,"#ddd","#ff0000","block");
	}
	
	//第五步  鼠标离开事件 
	function msout(event){
		//调用第六步
		ms(event,"#fff","#000","none");
	}
	
	//第六步 合并 第四、第五步代码 
	function ms(event,bgcolor,ftcolor,dis){
		//获取目标元素li
		var el=event.target;
		//判断如果当前元素是UL 则返回不做任何处理
		if(el.tagName=="UL")
		    return;
		//将当前li的背景颜色更改了 
		el.style.backgroundColor=bgcolor;
		el.style.color=ftcolor;
		//更改二级类别显示状态
		div.style.display=dis;
		
		//获取当前一级别的名称 
		var tmp=el.innerText;
		//获取对象
		var tobj=getCategoryObj(tmp);
		
		//调用 动态显示二级类别
		updateTwoCategory(tobj);
	}
	
	
	//第七步  给div增加一个鼠标事件 
	function divmsover(){
		div.style.display="block";
	}
	
	//第八步
	function divmsout(){
		div.style.display="none";
	}
	
	//第九步  更新二级类别内容
	function updateTwoCategory(obj){
		//先清除之前的内容 
		div.innerHTML="";
		
		//创建一个div元素
		var first=document.createElement("div");
		//将其添加到div上
		div.appendChild(first);
		//遍历热门类类
		obj.hot.forEach(function(h){
			//创建span元素
			var span=document.createElement("span");
			span.innerHTML=h+"&nbsp;&nbsp;>";
			//增加css属性
			span.setAttribute("class","hot");
			//将span追加到first元素的子元素列表上
			first.appendChild(span)
		});
		
		//生成二级类别
		obj.twocategory.forEach(function(two){
			//创建一行
			var line=document.createElement("div");
			//将line追加到div上
			div.appendChild(line);
			
			//创建二级类别元素
			var span2=document.createElement("span");
			span2.innerHTML=two.name+"&nbsp;&nbsp;>";
			span2.setAttribute("class","two");
			//将span2追加到line
			line.appendChild(span2);
			
			//遍历三级类别 
			two.child.forEach(function(third){
				var span3=document.createElement("span");
				span3.innerHTML="<a href='#'>"+third+"</a>";
				span3.setAttribute("class","third");
				line.appendChild(span3);
			});
			
		});
		
	}
	
	//第十步  根据一级类别的名称 返回对应的对象 
	/**
	 * @param {Object} name  一级类别的名称
	 */
	function  getCategoryObj(name){
		//声明一个对象  用来指向找到的对象
		var obj;
		//找到这个一级类别对应的对象
		//遍历数据源category  
		for(var i=0;i<category.length;i++){
			//获取临时对象
			var cat=category[i];
			//判断当前对象的一级类别名称是否
			//等于name
			if(name==cat.categoryName){
				obj=cat;
				break;//终止循环
			}
		}
		return obj; //将找到的对象返回
	}
	
})();