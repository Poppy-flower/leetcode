

/**
 * 厄拉多塞筛法
 * 1.将 2~n,加入表里
 * 2.2画圈，2的倍数划掉
 * 3.3画圈，3的倍数划掉
 * 4.下一个没画圈也没划掉的数字画圈，它的倍数划掉
 * 5.依次类推，所有画圈的数字数量就是小于n的质数的数量
 */
var countPrimes = function(n) {
    if(n<3){  //小于1,2的质数数量是0
        return 0;
    }
    if(n===3){  //小于3的质数的数量是1 [2]
        return 1;
    }

    var count = 0;
    var mark = new Array(n);
    //1.先标记2，处理2的倍数
    mark[2] = false;
    for(let i=2; i<n; i++){
        if(i%2 === 0){
            mark[i] = true;
        }else{
            mark[i] = false;
        }
    }

    //2.处理2之后的元素
    for(let i=2; i<n; i+=2){
        if(!mark[i]){
            if(i*i>n){
                break;
            }
            //打标记，j是倍数
            for(let j = 2; i*j<n; j++){
                mark[i*j-1]=true;
            }
        }
    }
    console.log(mark);
    //计数
    for(let i=0;i<n; i++){
        if(!mark[i]){
            count++;
        }
    }

    return count;
};

console.log(countPrimes(10));
