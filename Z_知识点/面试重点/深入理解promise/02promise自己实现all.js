/**
 *  Created by chenhong on 2020/5/31
 */

/**
 * Promise.all(iterable)
 * 用处：
 *    执行一系列异步操作，返回结果集
 * 说明：
 *    Promise.all(iterable)方法 返回一个 promise数组，
 *    此实例在 参数内所有的promise都完成之后 或者参数中不含promise时，才回调完成；
 *    参数内只要有一个失败，就回调失败，失败原因是第一个失败promise的结果
 * 特点：
 *    1. 返回值将会按照参数内的promise顺序排列，而不是由调用promise的完成顺序决定
 *    2. 有一个出错，就被认定为失败；
 *    3. 返回的是一个promise
 *    4. 返回是一个数组，而且期望每一个都是promise，如果不是，会直接放入结果集
 *
 * 设计思路：
 *    1. promise.all 返回值是一个 new Promise
 *    2. 需要用一个数组，存放每一个promise的结果值
 *    3. 遍历参数数组，判断是否是promise，是的话执行，得到结果后压入结果数组；
 *                                    否则，直接放入结果数组
 *    4. 当每个都成功执行后，resolve(result)
 *    5. 当有一个失败，reject()
 */

function isPromise(obj){
    return !!obj && (typeof obj === 'object' || typeof obj === 'function') && (typeof obj.then === 'function');
}

const myPromiseAll = (arr)=>{
    let res = [];
    let count = arr.length;
    return new Promise((resolve, reject)=>{
        for(let i=0, l=arr.length; i<l; i++){
            if(isPromise(arr[i])){
                arr[i].then((data)=>{
                    res[i] = data;
                    if(--count === 0){
                        resolve(res);
                    }
                },reject);
            }else{
                res[i] = arr[i];
            }
        }
    });
};
