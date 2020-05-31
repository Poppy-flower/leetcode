/**
 * 1. 非递归实现
 * 2. 递归实现
 *
 */
//1
function fabonacci(n){
    var n1 = 1, n2 = 1, n = 1;
    for(var i=3;i<n;i++){
        n=n1+n2;
        n1=n2;  //n1 往前走
        n2=n;  //n2往前走
    }

    return n;
}

//2
function fabonacci2(n){
    if(n===1 || n===2){
        return 1;
    }
    return fabonacci2(n-1)+fabonacci2(n-2);
}
