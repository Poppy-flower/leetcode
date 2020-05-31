/**
 *  Created by chenhong on 2020/5/24
 *
 */

// ----------------start  防抖和节流 ------------
/**
 *  函数节流：是确保函数特定的时间内至多执行一次。
    函数防抖：是函数在特定的时间内不被再调用后执行。
 */
//防抖
function debounce(fn, wait){
    /**
     * 1. 触发事件，n秒后才执行
     * 2. 如果你在一个时间触发的n秒内又触发了这个事件，那就以新的时间为准，n秒后才执行
     * 3. 总之，就是要等你触发完事件 n秒内不再触发事件，我才执行
     */
    var timer = null;
    return function(){
        if(timer){
            clearTimeout(timer);
        }else{
            timer = setTimeout(()=>{
                fn.apply(this, arguments);
            }, wait)
        }
    }
}
//节流
function throttle(){
    function throttle1(fn, wait){
        /**
         * 设置一个定时器，触发事件的时候
         *    如果定时器存在，就不执行；
         *    如果定时器不存在，执行定时器(执行函数；清空定时器，这样可以设置下个定时器)
         */
        var timer = null;
        return function(){
            if(!timer){
                timer = setTimeout(()=>{
                    timer = null;
                    fn.apply(this, arguments);
                }, wait);
            }
        }
    }

    function throttle2(fn, wait){
        var flag = true;
        return function(){
            if(!flag) return;  //工作时间，不执行，直接return
            flag = false;  //把标志位设置为工作时间
            setTimeout(()=>{
                fn.apply(this, arguments);
                flag = true;
            }, wait);
        }
    }

    function throttle3(fn, wait){
        /**
         * 去除当前的时间戳，减去之前的时间戳（最初设置为0）
         *  如果大于设置的时间周期，就执行函数，然后更新时间戳为当前的时间戳
         *  如果小于，就不执行
         */
        let startTime = 0;
        return function(){
            var now = +(new Date());
            if(now - startTime > wait){
                fn.apply(this, arguments);
                startTime = now;
            }
        }
    }
}
// ----------------end  防抖和节流 ------------

const add = (x, y) => x+y;
const addCurried = x => y => x+y;

//curry函数定义 对2元函数处理
const curry = (binaryFn) => {
    return function (firstArg){
        return function (secondArg){
            return binaryFn(firstArg, secondArg);
        }
    }
};

//test curry
let autoCurriedAdd = curry(add);
autoCurriedAdd(2)(2);

//经典求和面试题
function sum(){
    // 第一次执行时，定义一个数组专门用来存储所有的参数
    var _args = [...arguments];

    // 在内部声明一个函数，利用闭包的特性保存_args并收集所有的参数值
    var _adder = function(){
        _args.push(...arguments);
        return _adder;
    };

    // 利用toString隐式转换的特性，当最后执行时隐式转换，并计算最终的值返回
    _adder.toString = function(){
        return _args.reduce((a, b)=>{
            return a+b;
        })
    };

    return _adder;
}

//把多参函数转化为一元函数的curry函数
let curry = (fn)=>{
    if(typeof fn !== 'function'){
        throw Error('No function provided');
    }
    return function curriedFn(...args){

        if(args.length < fn.length){  //检查传入的参数列表长度是否小于函数参数列表长度，如果不是，就调用整个函数
            return function(){
                return curriedFn.apply(null, args.concat([].slice.call(arguments)));
            }
        }

        return fn.apply(null, args);
    }
};

//偏函数定义
const partial = function(fn, ...partialArgs){
    let args = partialArgs;
    return function(...fullArguments){
        let arg = 0;
        for(let i=0; i<args.length && arg<fullArguments.length; i++){
            if(args[i] === undefined){
                args[i] = fullArguments[arg++];
            }
            return fn.apply(null, args);
        }
    }
}

//按顺序完成异步操作
async function logInOrder(urls){
    //并发读取远程url
    const textPromises = urls.map(async url=>{
        const response = await fetch(url);
        return response.text();
    });

    //按次序输出
    for(const textPromise of textPromises){
        console.log(await textPromise);
    }
}

//深度优先遍历DOM树--------------start-------------------
//递归实现遍历DOM树
function traverseDOM(element, callback){
    callback(element);
    element = element.firstElementChild;
    while(element){
        traverseDOM(element, callback);
        element = element.nextElementSibling;
    }
}
const subTree = document.getElementById('subTree');
traverseDOM(subTree, (element)=>{console.log(element.nodeName)});

//用生成器遍历DOM
function *DomTraversal(element){
    yield element;
    element = element.firstElementChild;
    while(element){
        yield * DomTraversal(element);
        element = element.nextElementSibling;
    }
}
const subTree = document.getElementById('subTree');
for(let element of DomTraversal(subTree)){
    console.log(element);
}
//深度优先遍历DOM树--------------end-------------------

//模拟new操作符
function myNew(Parent, ...rest){
    var child = Object.create(Parent.prototype);
    var res = Parent.apply(child, rest);
    return typeof res === 'object'? res : child;
}
//模拟instanceOf 判断右操作数的原型 是否在 左操作数的 原型链上
function instance_of(L, R){
    var O = R.prototype;  //取R的显示原型
    L = L.__proto__;  //取L的隐式原型
    while (true){
        if(L === null) return false;
        if(O === L) return true;  //重点：当O严格等于L时，返回true
        L = L.__proto__;
    }
}
//模拟 apply call bind
Function.prototype._call = function(obj){
    obj = obj ? Object(obj) : window;
    obj.fn = this;
    var args = [...arguments].slice(1);
    var res = obj.fn(...args);

    delete obj.fn;
    return res;
}

Function.prototype._apply = function(obj, args){
    obj = obj ? Object(obj) : window;
    obj.fn = this;
    var res;
    if(args){
        res = obj.fn(...args);
    }else{
        res = obj.fn();
    }
    delete obj.fn;
    return res;
};
Function.prototype._bind = function(context){
    if(typeof this !== 'function'){
        throw new Error('Function.prototype.bind - what is trying to be bound is not callable');
    }

    //防止Function.prototype.bind.call(obj, param) 这种调用改变this
    var self = this;
    //获取bind函数从第二个参数往后的参数
    var args = [].slice.call(arguments, 1);

    var fNOP = function (){};

    var fBound = function(){
        //这个时候的arguments 是指bind返回的函数传入的参数
        var bindArgs = [].call(arguments);
        return self.apply(this instanceof fNOP ? this: context, args.concat(bindArgs))
    };

    fBound.prototype = this.prototype;
    fBound.prototype = new fNOP();

    return fBound;
};

//简单的bind实现
if(!Function.prototype.bind){
    Function.prototype.bind = function(){
        var self = this,  //保存原函数
            context = [].shift.call(arguments),  //保存需要绑定的this上下文
            args = [].slice.call(arguments);  //
        return function(){
            self.apply(context, args.concat([].slice.call(arguments)));
        }
    }
}
//数组扁平化
function flatten(){
    //不指定深度 reduce toString&&split join&&split 遍历&&concat es6拓展运算符
    arr.flat(Infinity);

    //不指定深度  遍历&&concat
    function flatten1(arr){
        var res = [];
        for(var i=0; i<arr.length; i++){
            var item = arr[i];
            if(Array.isArray(item)){
                res = res.concat(flatten(item))
            }else{
                res.push(item)
            }
        }
        return res;
    }

    //不指定深度  reduce
    function flatten2(arr){
        return arr.reduce((pre, current)=>{
            return pre.concat(Array.isArray(next)? flatten(current): current);
        })
    }

    //不指定深度  join&&split
    function flatten3(arr){
        return arr.join(',').split(',').map(item=>Number(item));
    }

    //不指定深度  toString&&split
    function flatten4(arr){
        return arr.toString().split(',').map(item=>Number(item));
    }

    //不指定深度  es6 拓展运算符
    function flatten5(arr){
        while(arr.some(item=>Array.isArray(item))){
            arr = [].concat(...arr);
        }
        return arr;
    }

    //指定深度的
    const flatten = (arr, depth=1)=>{
        if(depth !== 1){
            return arr.reduce((a, v)=>{
                a.concat(Array.isArray(v)? flatten(v, depth--): v)
            }, [])
        }else{
            return arr.reduce((a, v)=>{
                a.concat(v)
            }, [])
        }
    }
}

//手写promise
class Promise{
    constructor(executor){
        this.state = 'pending';
        this.value = undefined;
        this.reason = undefined;
        //成功存放的数组
        this.onResolvedCallbacks = [];
        //失败存放的数组
        this.onRejectedCallbacks = [];

        let resolve = value =>{
            if(this.state === 'pending'){
                this.state = 'fulfilled';
                this.value = value;
                //一旦resolve执行，调用成功数组的函数
                this.onResolvedCallbacks.forEach(fn=>fn());
            }
        };

        let reject = value =>{
            if(this.state === 'pending'){
                this.state = 'rejected';
                this.value = value;
                //一旦resolve执行，调用成功数组的函数
                this.onRejectedCallbacks.forEach(fn=>fn());
            }
        };

        try{
            executor(resolve, reject);
        }catch(err){
            reject(err);
        }
    }

    then(onFulfilled, onRejected){
        if(this.state === 'fulfilled'){
            onFulfilled(this.value);
        }
        if(this.state === 'rejected'){
            onRejected(this.value);
        }
        //当状态state为pending时
        if(this.state === 'pending'){
            //onFulfilled传入成功的数组
            this.onResolvedCallbacks.push(()=>{onFulfilled(this.value)})
            //onRejected传入失败的数组
            this.onRejectedCallbacks.push(()=>{onFulfilled(this.reason)})
        }
    }
}

//promise all
Promise.all = function(promises){
    return new Promise((resolve, reject)=>{
        let done = gen(promises.length, resolve);
        promises.forEach((promise, index)=>{
            promise.then((value)=>{
                done(index, value)
            }, reject);
        })
    });
};

function gen(length, resolve){
    let count = 0;
    let values = [];
    return function(i, value){
        values[i] = value;
        if(++count === length){
            console.log(values);
            resolve(values);
        }
    }
}

// promise race
Promise.race = function(promises){
    return new Promise((resolve, reject)=>{
        promises.forEach((promise)=>{
            promise.then(resolve, reject);
        });
    })
};

//promise finally
Promise.prototype.finally = function(callback){
    let P = this.constructor();
    return this.then(
        value => P.resolve(callback()).then(()=>value),
        reason => P.resolve(callback()).then(()=>{throw reason})
    );
};

//深度克隆
/**
 * deep clone
 * @param {[type]} perent object 需要进行克隆的对象
 * @return {[type]}  深克隆后的对象
 */
const clone = perent=>{
    //判断类型
    const isType = (obj, type) => {
        if(typeof obj !== 'object') return false;
        const typeString = Object.prototype.toString.call(obj);
        let flag;
        switch(type){
            case 'Array':
                flag = typeString === "[object Array]";
            case 'Date':
                flag = typeString === "[object Date]";
            case 'RegExp':
                flag = typeString === "[object RegExp]";
            default:
                flag = false;
        }
        return flag;
    };

    //处理正则
    const getRegExp = re => {
        var flags = '';
        if(re.global) flags += 'g';
        if(re.ignoreCase) flags += 'i';
        if(re.multiline) flags += 'm';
        return flags;
    };

    //维护两个存储循环引用的数组
    const parents = [];
    const children = [];

    const _clone = parent => {
        if(parent === null) return null;
        if(typeof parent !== 'object') return parent;

        let child, proto;

        if(isType(parent, 'Array')){
            //对数组做特殊处理
            child = [];
        }else if(isType(parent, 'RegExp')){
            //对正则做特殊处理
            child = new RegExp(parent.source, getRegExp(parent));
            if(parent.lastIndex) child.lastIndex = parent.lastIndex;
        }else if(isType(parent, 'Date')){
            child = new Date(parent.getTime());
        }else{
            //处理对象原型
            proto = Object.getPrototypeOf(parent);
            //利用Object.create切断原型链
            child = Object.create(proto)
        }

        //处理循环引用
        const index = parents.indexOf(parent);

        if(index != -1){
            //如果父数组存在本对象，说明之前已经被引用过，直接返回对象
            return children[index];
        }
        parent.push(parent);
        children.push(child);

        for(let i in parent){
            //递归
            child[i] = _clone(parent[i]);
        }

        return child;
    };
    return _clone(parent);
};

//函数克隆
Function.prototype.clone = function(){
    var fct = this;
    var clone = function(){
        return fct.apply(this, arguments);
    };
    clone.prototype = fct.prototype;
    for(property in fct){
        if(fct.hasOwnProperty(property) && property !== 'prototype'){
            clone[property] = fct[property];
        }
    }
    return clone;
};

Function.prototype.clone = function(){
    return eval(`(${+this.toString()})`);
};

//判断对象是否相等
function isObjectValueEqual(a, b){
    var aProps = Object.getOwnPropertyNames(a);
    var bProps = Object.getOwnPropertyNames(b);
    if(aProps.length = bProps.length){
        return false;
    }
    for(var i=0; i<aProps.length; i++){
        var propName = aProps[i];

        var propA = a[propName];
        var propB = b[propName];

        if(typeof propA === 'object'){
            if(this.isObjectValueEqual(propA, propB)){
                //return true;  //这里不能return，后面的对象还没判断
            }else{
                return false;
            }
        }else if(propA !== propB){
            return false
        }else{}
    }
    return true;
}

//实现双向绑定
function shuangxiangbangding(){
    //proxy
    const data = {count: 0};
    const proxy = new Proxy(data, {
        get(target, property){
            return target[property];
        },
        set(target, property, value){
            target[property] = value;
            console.log(value);
        }
    });

    //defineProperty
    const obj = {};

    let initValue = 1;

    Object.defineProperty(obj, 'name', {
        set: function(value){
            console.log('set方法被执行了');
            initValue = value;
        },
        get: function(){
            return initValue
        },
    });
    console.log(obj,name);
}

//实现EventEmeitter
function fn(){
    class EventEmeitter{
        constructor(){
            this._events = this._events || new Map();  //储存事件、回调键值对
            this._maxListeners = this._maxListeners || 10;  //设置监听上限
        }
    }

    //触发名为type的事件
    EventEmeitter.prototype.emit = function(type, ...args){
        let handler;

        // 从储存事件键值对的this._events中获取对应事件回调函数
        handler = this._events.get(type);
        if(args.length>0){
            handler.apply(this, args);
        }else{
            handler.call(this);
        }
        return true;
    };

    //监听名为type的事件
    EventEmeitter.prototype.addListener = function(type, fn){
        // 将type事件以及对应的fn函数放入this._events中储存
        if (!this._events.get(type)) {
            this._events.set(type, fn);
        }
    };

    //触发名为type的事件
    EventEmeitter.prototype.emit = function(type, ...args){
        let handler;
        handler = this._events.get(type);
        if (Array.isArray(handler)) {
            // 如果是一个数组说明有多个监听者,需要依次此触发里面的函数
            for (let i = 0; i < handler.length; i++) {
                if (args.length > 0) {
                    handler[i].apply(this, args);
                } else {
                    handler[i].call(this);
                }
            }
        } else {
            // 单个函数的情况我们直接触发即可
            if (args.length > 0) {
                handler.apply(this, args);
            } else {
                handler.call(this);
            }
        }

        return true;
    };

    //监听名为type的事件
    EventEmeitter.prototype.addListener = function(type, fn){
        const handler = this._events.get(type); // 获取对应事件名称的函数清单
        if (!handler) {
            this._events.set(type, fn);
        } else if (handler && typeof handler === "function") {
            // 如果handler是函数说明只有一个监听者
            this._events.set(type, [handler, fn]); // 多个监听者我们需要用数组储存
        } else {
            handler.push(fn); // 已经有多个监听者,那么直接往数组里push函数即可
        }
    }


    EventEmeitter.prototype.removeListener = function(type, fn) {
        const handler = this._events.get(type); // 获取对应事件名称的函数清单

        // 如果是函数,说明只被监听了一次
        if (handler && typeof handler === "function") {
            this._events.delete(type, fn);
        } else {
            let postion;
            // 如果handler是数组,说明被监听多次要找到对应的函数
            for (let i = 0; i < handler.length; i++) {
                if (handler[i] === fn) {
                    postion = i;
                } else {
                    postion = -1;
                }
            }
            // 如果找到匹配的函数,从数组中清除
            if (postion !== -1) {
                // 找到数组对应的位置,直接清除此回调
                handler.splice(postion, 1);
                // 如果清除后只有一个函数,那么取消数组,以函数形式保存
                if (handler.length === 1) {
                    this._events.set(type, handler[0]);
                }
            } else {
                return this;
            }
        }
    }

}

//发布订阅模式 EventEmitter
class EventEmitter{
    constructor(){
        //事件对象，存放订阅的名字和事件 如{click: [handleClick]}
        this.events = {}
    }

    //订阅事件和方法
    on(eventName, callback){
        if(!this.events[eventName]){
            //一个名字可以订阅多个事件函数
            this.events[eventName] = [callback];
        }else{
            //存在，则push到指定数组的尾部保存
            this.events[eventName].push(callback);
        }
    }

    //触发事件的方法
    emit(eventName, rest){
        //遍历执行所有订阅的事件
        this.events[eventName]
        && this.events[eventName].forEach((fn)=>{
            fn.apply(this, rest);
        })
    }

    //移除订阅事件
    remove(eventName, callback){
        if(this.events[eventName]){
            this.events[eventName] = this.events[eventName].filter(fn=>{fn != callback})
        }
    }

    //只执行一次订阅事件，然后移除
    once(eventName, callback){
        //绑定的是fn,执行的时候触发它
        const fn = ()=>{
            callback();  //fn里调原有的callback
            this.remove(eventName, fn);  //删除fn,再次执行的时候之后执行一次
        };
        this.on(eventName, fn);
    }
}

//实现hook
function hook(){
    //通过数组维护变量
    let memoizedState = [];
    let currentCursor = 0;

    function useState(initVal){
        memoizedState[currentCursor] = memoizedState[currentCursor] || initVal;
        function setVal(newVal){
            memoizedState[currentCursor] = newVal;
            render();
        }
        //返回state 然后currentCursor+1
        return [memoizedState[currentCursor++], setVal];
    }

    function useEffect(fn, watch){
        const hasWatchChange = memoizedState[currentCursor]? !watch.every((val, i)=>(val === memoizedState[currentCursor][i])): true;
        if(hasWatchChange){
            fn();
            memoizedState[currentCursor] = watch;
            currentCursor++;  //累加currentCursor
        }
    }
}

//编写自定义useHook, 名字以use开头
function useCounter(initialValue){
    const [count, changeCount] = useState(initialValue);

    const decrease = ()=>{
        changeCount(count-1);
    };

    const increase = ()=>{
        changeCount(count+1);
    };

    const resetCounter = ()=>{
        changeCount(0);
    }

    //返回包含了更多逻辑的 state 以及改变 state 方法的钩子
    return [count, {decrease, increase, resetCounter}];
}

//HOC
function HOCFactoryFactory(...params){
    //do something with params
    return function HOCFactory(WrappedComponent){
        return class HOC extends React.Component{
            render(){
                return <WrappedComponent {...this.props}/>
            }
        }
    }
}

//express get
function nodeGet(){
    var express = require('express');

    app.get('/', function(req, res){
        var url = req.query.url;
        var name = req.query.name;
        console.log(url, name);
    });

    //node http get
    var http = require('http');
    var options = {
        hostname: '127.0.0.1',
        port: 10086,
        path: '/pay/pay_callback?time=123',
        method: 'GET'
    };
    var req = http.request(options, function(res){
        res.setEncoding('utf8');
        res.on('data', function(chunk){
            console.log('BODY:', chunk);
        })
    });
    req.on('error', function(e){
        console.log('problem with request:' + e.message);
    });
    req.end();
}

//node http post
function nodePost(){
    var http = require('http');
    var queryString = require('querystring');

    var contents = queryString.stringify({
        name: 'byvoid',
        email: 'byvoid@byvoid.com',
        address: 'Zijing'
    });

    var options = {
        host: 'www.byvoid.com',
        path: '/application/node/post.php',
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': contents.length
        }
    };
    var req = http.request(options, function(res){
        res.setEncoding('utf8');
        res.on('data'. function(data){
            console.log('data: ', data);
        });
    });

    req.write(contents);
    req.end();
}


//js实现一个 hash-router
class Router{
    constructor(){
        this.routes = {};  //保存路由
        this.curUrl = '';  //保存当前的hash
    }

    init(){
        window.addEventListener('hashChange', this.reloadPage.bind(this));
    }

    reloadPage(){
        this.curUrl = location.hash.substring(1) || '/';
        this.routes[this.curUrl]();
    }

    map(key, callback){  //保存路由对应的函数
        this.routes[key] = callback;
    }
}

//拆解因数
function dismant(num, arr=[]){
    //所有因数都是从2开始
    let i = 2;

    //如果num是1、2、3没有因数直接返回
    if(num<=3){
        arr.push(num);
        return arr;
    }

    //核心：如果num从2开始找因数，一直找到自己的一半还没找到，那么就证明他没有因数了
    for(i; i< num/2; i++){
        if(num%i === 0){
            //存储最小的因数
            arr.push(i);
            //除以因数后 递归执行
            return dismant(num/i, arr)
        }
    }
    //最后，num既不是123，又找不到因数
    arr.push(num)
    return arr;
}

//判断循环引用
function fn(){
    //JSON.stringify  //抛出Uncaught TypeError: Converting circular structure to JSON.
    var stack = [];

    function fn(obj){
        var len;

        for(len = stack.length; len--;){
            if(stack[len] === obj) throw TypeError()
        }
        stack.push(obj);
        for(let k in obj){
            const value = obj[k];
            if(typeof value === 'object') fn(value);
        }
    }
}

//数组去重（包含NaN 各种类型的一个去重，就是每一项可能是数组，也可能是对象）
function uniq(){
    Array.prototype.uniq = function(){
        var arr = [];
        var flag = true;

        this.forEach((item)=>{
            //排除NaN（重要！！！）NaN和自身不相等
            //除了NaN，其他数据都和自身相等
            if(item != item){
                //只有第一次找到NaN 把他放在数组里面
                flag && arr.indexOf(item) === -1 ? arr.push(item): '';
                flag = false;
            }else{
                arr.indexOf(item) === -1? arr.push(item): '';
            }
        });
        return arr;
    }

    //ES6 Set
    var uniqueArr2 = Array.from(new Set(arr));
}

//数组乱序
function shuffle(a){
    for(let i=a.length; i; i--){
        let j = Math.floor(Math.random()*i);
        [a[i-1], a[j]] = [a[j], a[i-1]];
    }
    return a;
}

//promise 并发
function PromisePool(){
    class PromisePool{
        constructor(max, fn){
            this.max = max;  //最大并发数
            this.fn = fn;  //自定义的请求函数
            this.pool = [];  //并发池
            this.urls = [];  //剩余的请求地址
        }

        start(urls){
            this.urls = urls;

            //先循环把并发池塞满
            while(this.pool.length < this.max){
                let url = this.urls.shift();
                this.setTask(url);
            }

            //利用Promise.race方法来获得并发池中某任务完成的信号
            let race = Promise.race(this.pool);
            return this.run(race);
        }

        run(race){
            race.then(
                res=>{
                    let url = this.urls.shift();
                    this.setTask(url);
                    return this.run(Promise.race(this.pool));
                }
            )
        }

        setTask(url){
            if(!url) return;

            let task = this.fn(url);
            this.pool.push(task);  //将该任务推入pool并发池中

            console.log(`\x1B[43m ${url} 开始，当前并发数：${this.pool.length}`);
            task.then(
                res=>{
                    this.pool.splice(this.pool.indexOf(task), 1);
                }
            );
            console.log(`\x1B[43m ${url} 结束，当前并发数：${this.pool.length}`);
        }
    }

    //test
    const URLS = [
        'bytedance.com',
        'tencent.com',
        'alibaba.com',
        'microsoft.com',
        'apple.com',
        'hulu.com',
        'amazon.com'
    ];
    //自定义请求函数
    var requestFn = url=>{
        return new Promise(resolve=>{
            setTimeout(()=>{
                resolve(`任务${url}完成`);
            }, 1000*dur++);
        }).then(res=>{
            console.log('外部逻辑', res);
        })
    };

    const pool = new PromisePool(3, requestFn); // 并发数为3
    pool.start(URLS);
}

//添加 for of 迭代器 iterator
function addIterator(obj){
    obj[Symbol.iterator] = ()=>{
        let keys = Object.keys(obj);
        let len = keys.length;
        let n = 0;
        return {
            next(){
                if(n<length){
                    return {
                        done: false,
                        value: obj[keys[n++]]
                    }
                }else{
                    return {
                        done: true,
                        value: undefined
                    }
                }
            }
        }
    }
}

//单例模式-闭包
var Single = (function(){
    var instance;  //声明一个instance对象
    function SingleClass(){
        this.say = function(){
            console.log('single');
        }
    }

    //声明SingleClass对象，无法在外部直接调用
    return function(){
        if(instance){  //如果存在 则返回 instance
            return instance;
        }
        instance = new SingleClass();  //如果不存在 则new一个
        return instance;
    }
});

//单例模式-构造函数
function Single(){
    if(typeof Single.instance === 'object'){
        return Single.instance;
    }
    //否则正常创建实例
    this.say = function(){
        console.log('single');
    };

    //缓存
    Single.instance = this;

    return this;
}


function checkType(target){
    return Object.prototype.toString.call(target).slice(8, -1);
}
//手写深拷贝
function clone(target){
    let result,
        targetType = checkType(target);

    if(targetType === 'Object'){
        result = {};
    }else if(targetType === 'Array'){
        result = [];
    }

    for(let key in target){
        let value = target[key];
        if(checkType(value) === 'Object' || checkType(value) === 'Array'){
            result[key] = clone(value);
        }else{
            result[key] = value;
        }
    }
    return result;
}

/**
 * 总结ES6 与 ES5 实现类的区别：
 * 1. class是语法糖，本质上仍然是函数，调用方法一致，都是new
 * 2. ES6 class里面定义的方法，都是在原型上的；ES5的写在里面的不是在原型上，写在原型上的才是
 *    ES6 定义在原型上的方法  是不可枚举的
 * 3. ES6 class是严格模式的，不存在变量提升，保证父类子类的顺序；
 * 4. 继承不同：
 *    ES6 有新写法 extends, 子类必须在父类的构造函数中调用super()，这样才有this对象，因为this对象是从父类继承下来的。
 *        而要在子类中调用父类的方法，用super关键词可指代父类。
 *
 *    ES5 类继承的关系是相反的，先有子类的this，然后用父类的方法应用在this上。
 *    ES6 类继承子类的this是从父类继承下来的这个特性，使得在ES6中可以构造原生数据结构的子类，这是ES5无法做到的。
 * 5. 关于静态属性 静态方法：
 *    ES6也可以定义类的静态方法和静态属性，静态的意思是这些不会被实例继承，不需要实例化类，就可以直接拿来用。
 *    ES6中class内部只能定义方法，不能定义属性。
 *    在方法名前加上static就表示这个方式是静态方法，而属性还是按照ES5的方式来实现。
 * 6. ES6中当函数用new关键词的时候，增加了new.target属性来判断当前调用的构造函数。这个有什么用处呢？
 *    可以限制函数的调用，比如一定要用new命令来调用，或者不能直接被实例化需要调用它的子类。
 */

/**
 * 类的构造函数 加return
 * 1. return; 或者 return 基本类型， 不影响
 * 2. return 引用类型，会影响。此时返回的就是该引用类型的对象了
 */

/**
 * 首先，比较直观的感觉 new一个构造函数，实例继承了构造器的构造属性，还继承了构造函数原型上的属性
 * new 主要有三步：（一般解释）
 * 1. 创建一个空对象，将他的引用赋给this，继承函数的原型
 * 2. 通过this，将属性和方法添加至这个对象
 * 3.
 *
 * winter大神的重学前端的解释：（好的解释）
 * 1. 以构造器的prototype为原型，创建新对象；
 * 2. 将this（也就是上一句中的新对象）和调用参数传给构造器，执行
 * 3. 如果构造器没有手动返回对象，则返回第一步创建的新对象；如果有，则舍弃掉第一步创建的对象，返回手动return的对象。
 *
 * 到此，来总结一下：
 * new过程中会创建新对象，此对象会继承构造器的原型与原型上的属性，最后他会被作为实例返回
 *
 * 自己实现new
 *
 */

//自己定义的new方法
let newMethod = function(Parent, ...rest){
    //1. 以构造器的prototype为原型，创建新对象；
    let child = Object.create(Parent.prototype);

    //2. 将this 和 调用参数 传给构造器执行
    let result = Parent.apply(child, rest);

    //3. 如果构造器没手动返回对象，则返回第一步的对象
    return (typeof result === 'object')? result: child;
};

//@todo 防抖 与 节流 （3秒请求一次）

//@todo 实现Promise.all方法

//@todo 自己实现redux 的 store





























