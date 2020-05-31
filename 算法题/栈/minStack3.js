/**
 * 3. 上面2中，我们用了一个栈作为辅助，比较浪费，我们还是用一个最小值变量来存储，我们就会面临之前记得最小值丢失的问题
 *       参考方法3： https://leetcode-cn.com/problems/min-stack/solution/xiang-xi-tong-su-de-si-lu-fen-xi-duo-jie-fa-by-38/
 *       3.1 第一次入栈，将该元素作为最小值，将 元素-当前最小值入栈，即入栈0
 *       3.2 第二次入栈，将 元素-当前最小值入栈，
 *              若 值为负数，说明当前值最小，需要更新最小值，min=当前元素 （后面出栈我们遇到负数，也要更新最小值）
 *              若 值不为负数，说明当前元素大于最小值，不用管
 *       3.3 出栈时： 因为存的值 = 当前元素-当前最小值；且会遇到存的值为负数，更新最小值，所以要判断
 *              栈顶大于0 ， 当时存的元素 = 栈顶+最小值
 *              栈顶小于0，  当时存的元素 = 最小值； 且之前的最小值= 当时存的元素-实际存的栈顶（实际存的栈顶=存入元素-最小值）
 *       3.4 获取top元素
 *              top = 栈顶+最小值
 *       3.5 获取min
 *              min = min变量值
 */

var minStack3 = function(){
    this.items = [];
    this.min = Infinity;
    return this;
}

minStack3.prototype.push = function(x){
    if(!this.items.length){
        this.min = x;
        let pushItem = x-this.min;
        this.items.push(pushItem);
    }else{
        let pushItem = x-this.min;
        this.items.push(pushItem);
        if(pushItem < 0){
            this.min = x;
        }
    }
}

minStack3.prototype.pop = function(){
    if(this.items.length){
        let topStack = this.items.pop();
        let popItem;
        if(topStack<0){
            popItem = this.min;
            this.min = popItem - topStack;
        }else{
            popItem = topStack + this.min;
        }
        return popItem;
    }else{
        return undefined;
    }
}

minStack3.prototype.top = function(){
    if(this.items.length){
        return this.items[this.items.length -1] + this.min;
    }else{
        return undefined;
    }
};

minStack3.prototype.getMin = function(){
    return this.min;
};

let minStack3Obj = new minStack3();
minStack3Obj.push(-2);
minStack3Obj.push(0);
minStack3Obj.push(-3);
console.log(minStack3Obj.getMin());
minStack3Obj.pop();
console.log(minStack3Obj.getMin());
