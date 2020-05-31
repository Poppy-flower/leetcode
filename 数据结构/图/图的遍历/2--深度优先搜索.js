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

    //---------------------------- 深度优先搜索 start------------------

    var initializeColor = function(){
        var color = [];
        for(var i=0; i<vertices.length; i++){
            color[vertices[i]] = 'white';
        }
        return color;
    };

    var dfsVisit = function(u, color, callback){
        color[u] = 'gray';
        callback && callback(u);
        var neighbors = adjList[u];
        for(var i=0,len=neighbors.length; i<len; i++){
            if(color[neighbors[i]] === 'white'){
                dfsVisit(neighbors[i], color, callback);
            }
        }
        color[u] = 'black';
    };
    this.dfs = function(callback){
        var color = initializeColor();
        for(var i=0,len=vertices.length; i<len; i++){
            if(color[vertices[i]] === 'white'){
                dfsVisit(vertices[i], color, callback);
            }
        }

    };

    //---------------------------- 深度优先搜索 end  ------------------

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
