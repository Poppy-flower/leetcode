function Queue(){
    var items = [];
    this.enqueue = function(element){
        items.push(element);
    };
    this.dequeue = function(element){
        return items.shift();
    };
    this.front = function(){
        return items[0];
    };
    this.isEmpty = function(){
        return !items.length;
    };
    this.size = function(){
        return items.length;
    };
    this.print = function(){
        console.log(items.toString());
    }

}
