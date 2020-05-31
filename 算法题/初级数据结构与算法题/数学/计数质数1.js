var isPrimes = function(n){
    if(n<=3){
        return n>1;
    }
    for(var i=2; i<n; i++){
        if(n%i === 0){
            return false;
        }
    }
    return true;
}

/**
 * @param {number} n
 * @return {number}
 */
var countPrimes = function(n) {
    var count = 0;
    for(var i=2; i<n; i++){
        if(isPrimes(i)){
            count++;
        }
    }
    return count;
};

