/**
 * Created by chenhong on 2020/6/1
 */
/**
 * 所谓节流，就是指连续触发事件，但是n秒钟只执行一次函数。节流会稀释函数的执行频率。
 *
 * 对于节流，一般有两种实现方式，分别是时间戳版 和 定时器版。
 */

//时间戳版：在持续触发过程中，函数会立即执行，并且每wait毫秒执行一次
function throttle(fn, wait){
    let previous = 0;

    return ()=>{
        let now = Date.now();

        if(now - previous > wait){
            fn.apply(this, arguments);
            previous = now;
        }
    }
}

//定时器版：在持续触发过程中，函数不会立即执行，并且每wait毫秒执行一次，在停止触发事件后，函数还会再执行一次
function throttle(fn, wait){
    let timeout;

    return ()=>{
        if(!timeout){
            timeout = setTimeout(()=>{
                timeout = null;
                fn.apply(this, arguments);
            }, wait);
        }
    }
}

/**
 * 我们应该很容易的会发现，其实时间戳和定时器版的节流函数的区别就是，时间戳版的函数触发是在时间段内开始的时候，
 * 而定时器版的函数触发是在时间段内结束的时候。
 *
 * 同样地，我们也可以将时间戳版和定时器版的节流函数结合起来，实现双剑合璧版的节流函数。
 */


/**
 * 双剑合璧版
 * @param fn
 * @param wait
 * @param type  1表示时间戳版，2表示定时器版
 */
function throttle(fn, wait, type){
    if(type === 1){
        var previous = 0;
    }else if(type === 2){
        var timeout;
    }

    return ()=>{
        if(type === 1){
            let now = Date.now();

            if(now - previous > wait){
                fn.apply(this, arguments);
                previous = now;
            }
        }else if(type === 2){
            if(!timeout){
                timeout = setTimeout(()=>{
                    timeout = null;
                    fn.apply(this, arguments);
                }, wait);
            }
        }
    }
}

/**
 * 优化： 一次触发，两次执行（先立即执行，结尾也有执行）
 * @todo https://blog.csdn.net/beijiyang999/article/details/79836463
 */
