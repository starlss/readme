//构造函数 
function  RiQi(){
    //debugger;
    this.year="2021";
    this.month="10";
    this.day="26";
}

RiQi.getTime=function(){
    return "2021/10/26";
}

RiQi.prototype.getYear=function(){
    return this.year;
}
RiQi.prototype.getMonth=function(){
    return this.month;
}
RiQi.prototype.getDay=function(){
    return this.day;
}