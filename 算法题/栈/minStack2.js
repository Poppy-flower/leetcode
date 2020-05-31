//解决方案二： 栈+辅助栈（存所有的最小值），典型的空间换时间

/**
 * 2. 使用一个栈存数据，再用一个辅助栈，存最小值  （空间换时间）
 *       2.1 第一次入栈，将这个值就当做最小值，存入栈，也存入最小值栈
 *       2.2 每次入栈，都将该元素与最小值栈的栈顶比较，
 *               元素>栈顶，忽略；元素小于栈顶，压入最小值栈
 *       2.3 出栈时，
 *               元素等于栈顶，最小值栈顶出栈；否则忽略
 *       2.4 取最小值
 *               最小值就是辅助栈的栈顶元素
 */
var minStack2 = function(){
    this.items = [];
    this.minStack = [];
    return this;
};

minStack2.prototype.push = function(x){
    if(!this.items.length){
        this.items.push(x);
        this.minStack.push(x);
    }else{
        let min = this.minStack[this.minStack.length -1];
        if(x<min){
            this.items.push(x);
            this.minStack.push(x);
        }else{
            this.items.push(x);
        }
    }
};

minStack2.prototype.pop = function(){
    if(this.items.length){
        let min = this.minStack[this.minStack.length -1];
        let popItem = this.items.pop();
        if(popItem === min){
            this.minStack.pop();
        }
        return popItem;
    }else{
        return undefined;
    }
};

minStack2.prototype.top = function(){
    if(this.items.length) {
        return this.items[this.items.length -1];
    }else{
        return undefined;
    }
}

minStack2.prototype.getMin = function(){
    if(this.items.length) {
        return this.minStack[this.minStack.length -1];
    }else{
        return Infinity;
    }
}

let minStack2Obj = new minStack2();
minStack2Obj.push(-2);
minStack2Obj.push(0);
minStack2Obj.push(-3);
console.log(minStack2Obj.getMin());
minStack2Obj.pop();
console.log(minStack2Obj.getMin());


