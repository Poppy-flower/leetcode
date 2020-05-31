/**
 * 数组存储顶点
 * 字典存储邻接表
 */
function Graph(){
    var vertices = [];
    var adjList = new Dictionary();
    this.addVertex = function(v){
        vertices.push(v);
        adjList.set(v, []);
    };
    this.addEdge = function (v, w) {
        adjList.get(v).push(w);
        adjList.get(w).push(v);
    };
    this.toString = function(){
        var s = '';
        for(var i =0,l=vertices.length; i<l; i++){
            s+= vertices[i] + '->';
            var neighbors = adjList.get(vertices[i]);
            for(var j=0,ln=neighbors.length; j<ln; j++){
                s+=neighbors[j]+ '    ';
            }
            s+= '\n';
        }
        return s;
    };

    //----------------------------从顶点v开始 广度优先搜索 start------------------
    /**
     * 解决方案：
     * 1. 创建一个队列Q
     * 2. 将v标注为被发现的（灰色），将v入队
     * 3. 如果Q非空，执行以下操作
     *      3.1 将u从Q中出队
     *      3.2 将标注u为被发现的（灰色）
     *      3.3 将u所有的未被访问的相邻节点（白色的），标注为被发现，且入队列
     *      3.4 将u标注为已经被探索的状态（黑色）
     *
     */
    var initializeColor = function(){
        var color = [];
        for(var i=0; i<vertices.length; i++){
            color[vertices[i]] = 'white';
        }
        return color;
    };
    this.bfs = function(v, callback){
        var color = initializeColor(),
            queue = new Queue();

        queue.enqueue(v);
        while(!queue.isEmpty()){  //队列不空，执行搜索操作
            var u = queue.dequeue();
            var neighbors = adjList.get(u);
            color[u] = 'gray';
            for(var i=0,l=neighbors.length; i<l; i++){  //把该所有相邻节点按广度顺序入队操作，便于后续按广度顺序搜索
                var w=neighbors[i];
                if(color[w] === 'white'){
                    color[w] = 'gray';
                    queue.enqueue(w);
                }
            }
            color[u] = 'black';
            callback && callback(u);
        }

    }
    //----------------------------从顶点v开始 广度优先搜索 end  ------------------

}

var graph = new Graph();
var myVertices = ['A','B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];
for(let i=0,l=myVertices.length; i<l; i++){
    graph.addVertex(myVertices[i]);
}
graph.addEdge('A', 'B');
graph.addEdge('A', 'C');
graph.addEdge('A', 'D');
graph.addEdge('C', 'D');
graph.addEdge('C', 'G');
graph.addEdge('D', 'G');
graph.addEdge('D', 'H');
graph.addEdge('B', 'E');
graph.addEdge('B', 'F');
graph.addEdge('E', 'I');
console.log(graph.toString());

/**
 * 输出结果：
 *  A->B    C    D
 B->A    E    F
 C->A    D    G
 D->A    C    G    H
 E->B    I
 F->B
 G->C    D
 H->D
 I->E
 *
 */







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

//队列
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
