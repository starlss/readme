//构造函数
function Maths(x,y){
	this.x=x;
	this.y=y;
}

//增加求和
Maths.prototype.sum=function(){
	console.log(this.x+this.y)
}

//求差 
Maths.prototype.diff=function(){
	console.log(this.x-this.y);
}