//Set
function Set(){
    let items = {};
    this.has = function(value){
        return items.hasOwnProperty(value);
    };
    this.add = function(value){
        if(!this.has(value)){
            items[value] = value;
            return true;
        }
        return false;
    };
    this.remove = function(value){
        if(this.has(value)){
            delete items[value];
            return true;
        }
        return false;
    };
    this.clear = function(){
        items = {};
    };
    this.size = function(){
        return Object.keys(items).length;
    };
    this.values = function(){
        let values = [];
        for(let i=0, keys=Object.keys(items); i<keys.length; i++){
            values.push(items[keys[i]]);
        }
        return values;
    };
    //交集
    this.interSection = function(otherSet){
        let interSectionSet = new Set();

        let values = this.values;
        for(let i=0; i<values.length; i++){
            if(otherSet.has(values[i])){
                interSectionSet.add(values[i]);
            }
        }

        return interSectionSet;
    };
    //差集
    this.difference = function(otherSet){
        let differenceSet = new Set();

        let values = this.values;
        for(let i=0; i<values.length; i++){
            if(!otherSet.has(values[i])){
                differenceSet.add(values[i]);
            }
        }

        return differenceSet;
    };
    //子集
    this.subSet = function(otherSet){  //判断当前集合是不是传入集合的子集

        if(this.size() > otherSet.size()){
            return false;
        }else{
            let values = this.values;
            for(let i=0; i<values.length; i++){
                if(!otherSet.has(values[i])){
                    return false;
                }
            }

            return true;
        }
    }
}
