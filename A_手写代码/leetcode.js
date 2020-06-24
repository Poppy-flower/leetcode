/**
 * Created by chenhong on 2020/6/3
 */
//爬楼梯
var climbStairs = function(n) {
    var dp = [0, 1, 2];
    for(var i=3; i<=n; i++){
        dp[i] = dp[i-1]+dp[i-2];
    }
    return dp[n];
};

//斐波那契数列
function fn(){
    function fibonacci(n){
        if(n<=1){
            return 1;
        }
        return fibonacci(n-1)+fibonacci(n-2);
    }

    //尾调用优化
    function fibonacci2(n, ac1 = 1, ac2 = 1){
        if(n<=1){
            return ac2;
        }
        return fibonacci2(n-1, ac2, ac1+ac2);
    }
}

//阶乘
function fn(){
    function factorial(n){
        if(n==1){
            return 1;
        }
        return n*factorial(n-1);
    }

    //尾调用优化
    function factorial2(n, total){
        if(n==1){
            return total;
        }
        return factorial2(n-1, n*total);
    }
}

//最长不含重复字符的子串
var lengthOfLongestSubstring = function(s) {
    let head = 0;
    let tail = 0;
    if(s.length<2) return s.length;

    let res = 1;
    while(tail<(s.length-1)){
        tail++;
        if(!s.slice(head, tail).includes(s[tail])){
            res = Math.max(tail-head+1, res);
        }else{
            while(s.slice(head, tail).includes(s[tail])){
                head++;
            }
        }
    }
    return res;
};

