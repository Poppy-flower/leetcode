//Dictionary 参照Map实现
function Dictionary(){
    var items = {};
    this.has = function(key){
        return items.hasOwnProperty(key);
    };
    this.set = function(key, value){
        items[key] = value;
    };
    this.delete = function(key){
        if(this.has(key)){
            delete items[key];
            return true;
        }
        return false;
    };
    this.get = function(key){
        return this.has(key)?items[key]:undefined;
    };
    this.values = function(){
        var value = [];
        for(var k in items){
            if(this.has(k)){
                value.push(items[k]);
            }
        }
        return value;
    };
    this.keys = function(){
        return Object.keys(items);
    };
    this.clear = function(){
        items = {};
    };
    this.getItems = function(){
        return items;
    };
    this.size = function(){
        return Object.keys(items).length;
    };
}
