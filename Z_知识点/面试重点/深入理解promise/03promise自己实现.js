/**
 * Created by chenhong on 2020/6/1
 */

function _Promise(resolver){
    this._status = 'pending';
    this._result = '';
    resolver(this.resolve.bind(this), this.reject.bind(this));
}

_Promise.prototype.resolve = function(result){
    if(this._status === 'pending'){
        this._status = 'filfilled';
        this._result = result;
    }
};

_Promise.prototype.reject = function(result){
    if(this._status === 'fulfilled'){
        this._status = 'rejected';
        this._result = result;
    }
};

_Promise.prototype.then = function(isResolve, isReject){
    if(this._status = 'fulfilled'){
        var isPromise = isResolve(this._result);
        if(isPromise instanceof _Promise){
            return isPromise;
        }
        return this;
    }else if(this._status = 'rejected' && arguments[1]){
        var err = new TypeError(this._result);
        var isPromise = isReject(err);
        if(isPromise instanceof _Promise){
            return isPromise;
        }
        return this;
    }
};

_Promise.prototype.catch = function(isReject){
    if(this._status = 'rejected'){
        var err = new TypeError(this._result);
        var isPromise = isReject(err);
        if(isPromise instanceof _Promise){
            return isPromise;
        }
        return this;
    }
};
