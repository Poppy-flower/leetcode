/**
 * 设计一个支持 push ，pop ，top 操作，并能在常数时间内检索到最小元素的栈。

     push(x) —— 将元素 x 推入栈中。
     pop() —— 删除栈顶的元素。
     top() —— 获取栈顶元素。
     getMin() —— 检索栈中的最小元素。
     示例:

     MinStack minStack = new MinStack();
     minStack.push(-2);
     minStack.push(0);
     minStack.push(-3);
     minStack.getMin();   --> 返回 -3.
     minStack.pop();
     minStack.top();      --> 返回 0.
     minStack.getMin();   --> 返回 -2.

 来源：力扣（LeetCode）
 链接：https://leetcode-cn.com/problems/min-stack
 */

/**
 * 解决方案
 * 1. 栈用数组实现，将最小值存到min变量里  (用一个变量保存最小值)
 * 2. 使用一个栈存数据，再用一个辅助栈，存最小值  （空间换时间）
 *       2.1 第一次入栈，将这个值就当做最小值，存入栈，也存入最小值栈
 *       2.2 每次入栈，都将该元素与最小值栈的栈顶比较，
 *               元素>栈顶，忽略；元素小于栈顶，压入最小值栈
 *       2.3 出栈时，
 *               元素等于栈顶，最小值栈顶出栈；否则忽略
 *       2.4 取最小值
 *               最小值就是辅助栈的栈顶元素
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


//解决方案一：通用法
/**
 * initialize your data structure here.
 */
var MinStack1 = function() {
    this.items = [];
    this.min = Infinity;
    return this;
};

/**
 * @param {number} x
 * @return {void}
 */
MinStack1.prototype.push = function(x) {
    this.items.push(x);
    if(x<this.min) this.min = x;
};

/**
 * @return {void}
 */
MinStack1.prototype.pop = function() {
    if(this.items.length){
        var popItem = this.items.pop();
        if(this.min === popItem) this.min = Math.min(...this.items);
        return popItem;
    }else{
        return undefined;
    }
};

/**
 * @return {number}
 */
MinStack1.prototype.top = function() {
    if(this.items.length){
        return this.items[this.items.length -1];
    }else{
        return undefined;
    }
};

/**
 * @return {number}
 */
MinStack1.prototype.getMin = function() {
    return this.min;
};

/**
 * Your MinStack object will be instantiated and called as such:
 * var obj = new MinStack()
 * obj.push(x)
 * obj.pop()
 * var param_3 = obj.top()
 * var param_4 = obj.getMin()
 */





