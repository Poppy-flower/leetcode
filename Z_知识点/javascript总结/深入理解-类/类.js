/**
 * Created by chenhong on 2020/5/31
 * @猿辅导面试题
 * 1. ES6  ES5 分别实现类 区别
 * 2. 类的构造函数 加return会不会影响
 * 3. new 做了什么 自己实现new
 */
//------------------start    ES6  ES5 分别实现类 区别  ------------------------
//ES6 实现类
class Person{
    constructor(name){
        if(new.target === Person){  //ES6 可通过new.target 获取当前调用的构造函数
            this.name = name;
        }else {
            throw new Error('必须用new生成实例');  //此时，在子类里super调用就会报这个错
        }
    }
    sayHello(){
        console.log(`Hello, I'm ${this.name}`);
    }

    //静态属性ES6不支持在里面写
    //静态方法
    static counter(){
        return this.total++;
    }
}
//静态属性
Person.total = 0;

//ES6继承
class Student extends Person{  //extends关键字实现继承
    constructor(name, age){
        super(name);  //super调父类的构造函数
        this.age = age;  //this是从父类继承来的
    }

    sayHello(){
        super.sayHello();  //super调父类的方法
        console.log(`My age is ${this.age}`);
    }
}

// var p1 = new Person('小红');
// p1.sayHello();
// console.log('Person-counter(): ', Person.counter());

// var s = new Student('小马', 3);
// s.sayHello();

//ES5 实现类
function PersonF(name){
    this.name = name;
}
PersonF.prototype.sayHello = function(){
    console.log(`Hello, I'm ${this.name}`);
};
//静态属性
PersonF.total = 0;
//静态方法
PersonF.counter = function(){
    return this.total++;
};

// var p1F = new PersonF('小红');
// p1F.sayHello();
// console.log('PersonF-counter(): ', PersonF.counter());

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


//------------------end    ES6  ES5 分别实现类 区别  ------------------------

//------------------start  类的构造函数 加return会不会影响--------------------
/**
 * 类的构造函数 加return
 * 1. return; 或者 return 基本类型， 不影响
 * 2. return 引用类型，会影响。此时返回的就是该引用类型的对象了
 */
//正常
function PersonR(name){
    this.name = name;
}
PersonR.prototype.sayHello = function(){
    console.log(`Hello, I'm ${this.name}`);
};
function PersonR1(name){
    this.name = name;
    return {name: '张三'};
}
PersonR1.prototype.sayHello = function(){
    console.log(`Hello, I'm ${this.name}`);
};
//直接返回
function PersonR2(name){
    this.name = name;
    return;
}
//返回数字
function PersonR3(name){
    this.name = name;
    return 123;
}
//返回字符串
function PersonR4(name){
    this.name = name;
    return 'abcd';
}
//返回数组
function PersonR5(name){
    this.name = name;
    return ['aa', 'bb', 'cc'];
}
//返回对象
function PersonR6(name){
    this.name = name;
    return {name: '李四'};
}
//返回包装类型
function PersonR7(name){
    this.name = name;
    return new Number(5678);
}

//test
var p = new PersonR('小红');
var p1 = new PersonR1('小红');
var p2 = new PersonR2('小红');
var p3 = new PersonR3('小红');
var p4 = new PersonR4('小红');
var p5 = new PersonR5('小红');
var p6 = new PersonR6('小红');
var p7 = new PersonR7('小红');
console.log(p);  //正常
console.log(p1);  //新对象，且丢了原型
console.log(p2);  //正常
console.log(p3);  //正常
console.log(p4);  //正常
console.log(p5);  //数组
console.log(p6);  //李四对象
console.log(p7);  //包装类型
//------------------end  类的构造函数 加return会不会影响--------------------


//------------------start  new 做了什么 自己实现new--------------------
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

//ES5构造函数（简单理解 构造属性 没有原型属性）
function Parent(name, age){
    //1. 创建一个对象，赋予this，这一步是隐性的
    // let this = {};
    //2. 给this指向的对象赋予构造属性
    this.name = name;
    this.age = age;

    //3. 如果没有手动的返回对象，则默认返回this指向的这个对象，这一步也是隐性的
    // return this;
}


//构造器函数
let Parent = function (name, age) {
    this.name = name;
    this.age = age;
};
Parent.prototype.sayName = function () {
    console.log(this.name);
};

//自己定义的new方法
let newMethod = function(Parent, ...rest){
    //1. 以构造器的prototype为原型，创建新对象；
    let child = Object.create(Parent.prototype);

    //2. 将this 和 调用参数 传给构造器执行
    let result = Parent.apply(child, rest);

    //3. 如果构造器没手动返回对象，则返回第一步的对象
    return (typeof result === 'object')? result: child;
};

//test
//创建实例，将构造函数Parent与形参作为参数传入
const child = newMethod(Parent, 'xiaohong', 18);
child.sayName(); //'xiaohong';

//最后检验，与使用new的效果相同
child instanceof Parent;  //true
child.hasOwnProperty('name');  //true
child.hasOwnProperty('age');  //true
child.hasOwnProperty('sayName');  //false

//------------------end  new 做了什么 自己实现new--------------------
