function get(url,options,callback){//定义get函数
    //查询参数序列化
    function serialize(options){
        if(!options){//如果没有查询参数
            return "";//返回空字符
        }else{//否则
            var pairs=[];//定义一个数组
            for(var name in options){//遍历对象属性
                if(!options.hasOwnProperty(name)) continue;//过滤掉继承的属性和方法
                if(typeof options[name]==="function") continue;//过滤掉方法
                var value=options[name].toString();//属性值转字符串
                name=encodeURIComponent(name);//URI编码
                value=encodeURIComponent(value);//URI编码
                pairs.push(name+"="+value);//属性名和属性值放入数组
            }
            return pairs.join("&");//返回字符串
        }
    }
    var xhr=new XMLHttpRequest();//创建Ajax对象
    xhr.open("get",url+'?'+serialize(options));//开启一个异步请求
    xhr.send(null);//发送请求
    xhr.onreadystatechange=function(){//注册事件 处理返回数据
        if(xhr.readyState==4){//若请求完毕
            if(xhr.status>=200&&xhr.status<300||xhr.status==304){//若请求成功
                callback(xhr.responseText);//调用回调函数处理响应结果
            }else{//若请求失败
                alert('Requst was unsuccessful:'+xhr.status);//返回请求失败原因
            }
        }
    }  
}
