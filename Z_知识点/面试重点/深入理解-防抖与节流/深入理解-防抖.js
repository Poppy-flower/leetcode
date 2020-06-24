/**
 * Created by chenhong on 2020/6/1
 */
/**
 * 防抖分两种：非立即执行版 和 立即执行版
 * 非立即执行版：触发事件后函数不会立即执行，而是在n秒后执行，如果在n秒内又触发了事件，则会重新计算函数执行时间。
 * 立即执行版：触发事件后函数会立即执行，然后n秒内不触发事件才能继续执行函数的结果
 */

//非立即执行版
function debance(fn, wait){
    let timeout;
    return ()=>{
        if(timeout){
            clearTimeout(timeout);
        }
        timeout = setTimeout(()=>{
            fn.apply(this, arguments);
        }, wait);
    }
}

//立即执行版
function debance(fn, wait){
    let timeout;
    return ()=>{
        if(timeout){
            clearTimeout(timeout);
        }

        let callNow = !timeout;
        timeout = setTimeout(()=>{
            timeout = null;
        }, wait);
        if(callNow){
            fn.apply(this, arguments);
        }
    }
}


/**
 * 双剑合璧版： 将非立即执行版和立即执行版结合起来，实现最终的双剑合璧版的防抖函数。
 * @param fn  函数
 * @param wait  延迟执行毫秒数
 * @param immediate  true表示立即执行，false表示 非立即执行
 */
function debance(fn, wait, immediate){
    let timeout;

    return ()=>{
        if(timeout){
            clearTimeout(timeout);
        }

        if(immediate){
            let callNow = !timeout;
            timeout = setTimeout(()=>{
                timeout = null;
            }, wait);
            if(callNow){
                fn.apply(this, arguments);
            }
        }else{
            timeout = setTimeout(()=>{
                fn.apply(this, arguments);
            }, wait);
        }
    }
}


