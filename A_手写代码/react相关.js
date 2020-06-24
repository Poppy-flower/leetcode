//实现hook
function hook(){
    //通过数组维护变量
    let memoizedState = [];
    let currentCursor = 0;

    function useState(initVal){
        memoizedState[currentCursor] = memoizedState[currentCursor] || initVal;
        function setVal(newVal){
            memoizedState[currentCursor] = newVal;
            render();
        }
        //返回state 然后currentCursor+1
        return [memoizedState[currentCursor++], setVal];
    }

    function useEffect(fn, watch){
        const hasWatchChange = memoizedState[currentCursor]? !watch.every((val, i)=>(val === memoizedState[currentCursor][i])): true;
        if(hasWatchChange){
            fn();
            memoizedState[currentCursor] = watch;
            currentCursor++;  //累加currentCursor
        }
    }
}

//编写自定义useHook, 名字以use开头
function useCounter(initialValue){
    const [count, changeCount] = useState(initialValue);

    const decrease = ()=>{
        changeCount(count-1);
    };

    const increase = ()=>{
        changeCount(count+1);
    };

    const resetCounter = ()=>{
        changeCount(0);
    }

    //返回包含了更多逻辑的 state 以及改变 state 方法的钩子
    return [count, {decrease, increase, resetCounter}];
}

//HOC
function HOCFactoryFactory(...params){
    //do something with params
    return function HOCFactory(WrappedComponent){
        return class HOC extends React.Component{
            render(){
                return <WrappedComponent {...this.props}/>
            }
        }
    }
}

//@木瓜移动 @猿辅导 自己实现redux 的 store
const createStore = (initState, reducer)=>{
    let state = initState;
    let listeners = [];

    const getState = ()=>{
        return state;
    };

    const dispatch = (action)=>{
        state = reducer(state, action);
        listeners.forEach(listener=>listener());
    };

    const subscribe = (listener)=>{
        listeners.push(listener);
        return ()=>{
            listeners = listeners.filter((l)=>{return l!==listener});
        }
    };

    return {getState, dispatch, subscribe};
};
