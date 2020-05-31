/**
 * 有效的字母异位词
 *
 * 给定两个字符串 s 和 t ，编写一个函数来判断 t 是否是 s 的字母异位词。

     示例 1:

     输入: s = "anagram", t = "nagaram"
     输出: true
     示例 2:

     输入: s = "rat", t = "car"
     输出: false
 */

/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isAnagram = function(s, t) {
    let arr = new Array(26).fill(0);
    s.split('').map((item, index)=>{
        arr[item.codePointAt()-'a'.codePointAt()]++;
    });
    t.split('').map((item, index)=>{
        arr[item.codePointAt()-'a'.codePointAt()]--;
    })
    var flag = true;
    arr.map((item, index)=>{
        if(item !== 0){
            flag=false;
        }
    });
    return flag;
};
