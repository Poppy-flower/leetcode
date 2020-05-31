/**
 * 给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串，判断字符串是否有效。

 有效字符串需满足：

 左括号必须用相同类型的右括号闭合。
 左括号必须以正确的顺序闭合。
 注意空字符串可被认为是有效字符串。

 示例 1:

 输入: "()"
 输出: true
 示例 2:

 输入: "()[]{}"
 输出: true
 示例 3:

 输入: "(]"
 输出: false
 示例 4:

 输入: "([)]"
 输出: false
 示例 5:

 输入: "{[]}"
 输出: true


 来源：力扣（LeetCode）
 链接：https://leetcode-cn.com/problems/valid-parentheses
 */

/**
 * 解决方案：
 *  1. 通用解决方案： 元素跟栈顶配对成功，出栈；否则入栈
 */

//1. 通用方法：元素跟栈顶配对成功，出栈；否则入栈
/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function(s) {
    if(!s){
        return true;
    }
    if(!s.length%2){
        return false;
    }
    let stack = [];
    let rightObj = {
        ')': '(',
        '}': '{',
        ']': '['
    };
    s.split('').map((item, index)=>{
        let stackTopItem = stack.length>0 && stack[stack.length -1] || '';
        if(stackTopItem === rightObj[item]){
            stack.pop();
        }else{
            stack.push(item);
        }
    });
    return !stack.length;
};

console.log(isValid('[]'));
