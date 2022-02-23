

    变量：  是计算机中的一个存储单元，用来存储数据的
    
    变量的类型由值来决定 
    
    js类型：
    基本类型 ： String Number  Boolean  null undefined  Symbol 
    引用类型 : 对象    Object  Function  Array  
    
    如果变量是基本类型的，称为变量 
    
    let obj; //声明变量 
    obj是一个变量 ，没有错 
    
    obj={};  //赋值 
    
    obj是一个对象  
    //引用类型的变量 称为对象  
    //通过new创建的都是对象  
    //o是对象   有时也称为  实例 
    var o=new Object();
    
    //为了区分  Object 类  （数据类型）
    
    对象： 是一个具体的值  
    类： 是一个类型  
    
    var s="abc";  //基本类型 
    
    //在这一刻  js引擎会将s转换为临时对象   一旦执行完 会立即销毁临时对象
    s.length;
     console.log(s)  //s又变成了基本类型  
     
     var ss=new String("abc"); //ss  是对象  
    