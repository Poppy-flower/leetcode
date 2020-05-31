/**
 *  Created by chenhong on 2020/5/24
 *
 */

//栈
function Stack(){
    let items = [];
    this.push = function(element){
        items.push(element);
    };
    this.pop = function(){
        items.pop();
    };
    //查看栈顶元素
    this.peek = function(){
        return items[items.length-1];
    };
    //检查栈是否为空
    this.isEmpty = function(){
        return items.length === 0;
    };
    this.size = function(){
        return items.length;
    };
    this.clear = function(){
        items = [];
    };
    this.print = function(){
        console.log(items.toString());
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

//优先队列
function PriorityQueue(){
    let items = [];
    function QueueElement(element, priority){
        this.element = element;
        this.priority = priority;
    }

    this.enqueue = function(element, priority){
        let queueElement = new QueueElement(element, priority);

        let added = false;
        for(let i=0; i<items.length; i++){
            if(queueElement.priority < items[i].priority){  //假设priority越小，优先级越高
                items.splice(i, 0, queueElement);
                added = true;
                break;
            }
        }
        if(!added){
            items.push(queueElement);
        }
    };

    this.print = function(){
        for(let i=0; i<items.length; i++){
            console.log(`${items[i].element}-${items[i].priority}`);
        }
    }

    //其他方法与Queue的相同

}

//循环队列-击鼓传花
function hotPotato(nameList, num){

    let queue = new Queue();

    for(let i=0; i<nameList; i++){
        queue.enqueue(nameList[i]);
    }

    let eliminated = '';
    while(queue.size() > 1){
        for(let i=0; i<num; i++){
            queue.enqueue(queue.dequeue());
        }
        eliminated = queue.dequeue();
        console.log(`${eliminated}在击鼓传花游戏中被淘汰！`);
    }
    return queue.dequeue();
}

//链表
function LinkedList(){
    let Node = function(element){
        this.element = element;
        this.next = null;
    };

    let length = 0;
    let head = null;
    this.append = function(element){
        let node = new Node(element),
            current;

        if(head === null){  //列表中第一个节点
            head = node;
        }else{
            current = head;

            //循环列表，知道找到最后一项
            while(current.next){
                current = current.next;
            }

            //找到最后一项，将其next赋为node,建立链接
            current.next = node;
        }

        length++;
    };
    this.insert = function(position, element){

        //检查越界值
        if(position>=0 && position<=length){

            let node = new Node(element),
                current = head,
                previous,
                index=0;

            if(position===0){  //在第一个位置添加
                node.next = current;
                head = node;
            }else{
                while(index++ < position){
                    previous = current;
                    current = current.next;
                }
                node.next = current;
                previous.next = node;
            }

            length++;

            return true;
        }else{
            return false;
        }
    };
    this.removeAt = function(position){

        //检查越界值
        if(position>-1 && position<length){

            let current = head,
                previous,
                index=0;

            //移除第一项
            if(position === 0){
                head = current.next;
            }else{

                while(index++ < position){

                    previous = current;
                    current = current.next;
                }

                //将previous与current的下一项链接起来，跳过current，从而移除它
                previous = current.next;
            }

            length--;

            return current.element;
        }
    };
    this.indexOf = function(element){
        let current = head,
            index = 0;

        while(current){
            if(element === current.element){
                return index;
            }

            index++;
            current = current.next;
        }

        return -1;
    };
    this.remove = function(element){
        let index = this.indexOf(element);
        return this.removeAt(index);
    };
    this.isEmpty = function(){
        return length===0;
    };
    this.size = function(){
        return length;
    };
    this.getHead = function(){
        return head;
    };
    this.toString = function(){
        let current = head,
            string = '';
        while(current){
            string += `${current.element}${current.next? 'n': ''}`;
            current = current.next;
        }

        return string;
    };
    this.print = function(){

    };

}


//双向链表
function DoublyLinkedList(){

    let Node = function(element){
        this.element = element;
        this.next = null;
        this.prev = null;  //新增的
    };

    let head = null;
    let length = 0;
    let tail = null;  //新增的

    //从任意位置添加元素
    this.insert = function(position, element){
        let node = new Node(element),
            current = head,
            previous,
            index = 0;

        //检查越界值
        if(position>=0 && position<=length){

            if(position === 0){  //在第一个位置添加
                if(!head){  //新增的
                    head = node;
                    tail = node;
                }else{
                    node.next = current;
                    current.prev = node;  //新增的
                    head = node;
                }
            }else if(position === length){  //在最后一个位置添加  //新增的

                current = tail;
                current.next = node;
                node.prev = current;
                tail = node;
            }else{
                while(index++ < position){
                    previous = current;
                    current = current.next;
                }
                node.next = current;
                previous.next = node;

                current.prev = node;  //新增的
                node.prev = previous;  //新增的

            }

            length++;
            return true;
        }else{
            return false;
        }
    }
    //从任意位置移除元素
    this.removeAt = function(position){
        //检查越界值
        if(position>-1 && position<length){

            let current = head,
                previous,
                index=0;

            //移除第一项
            if(position === 0){

                head = current.next;

                //如果只有一项，更新tail  //新增的
                if(length === 1){
                    tail = null;
                }else{
                    head.prev = null;
                }
            }else if(position === length){  //最后一项 //新增的
                current = tail;
                tail = current.prev;
                tail.next = null;
            }else{

                while(index++ < position){
                    previous = current.next;
                    current = current.next;
                }

                //将previous与current的下一项链接起来——跳过current
                previous.next = current.next;
                current.next.prev = previous;  //新增的
            }

            length--;

            return current.element;
        }else{
            return false;
        }
    }
}

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

//二叉搜索树
function BinarySearchTree(){
    var node = function(key){
        this.key = key;
        this.left = null;
        this.right = null;
    };

    var root = null;

    var insertNode = function(node, newNode){
        if(newNode.key < node.key){
            if(node.left === null){
                node.left = newNode;
            }else{
                insertNode(node.left, newNode);
            }
        }else{
            if(node.right === null){
                node.right = newNode;
            }else{
                insertNode(node.right, newNode);
            }
        }
    };

    this.insert = function(key){
        var newNode = new Node(key);

        if(root === null){
            root = newNode;
        }else{
            insertNode(root, newNode);
        }
    };

    //树的中序遍历 先序遍历 后序遍历

    var inOrderTraverseNode = function(node, callback){

        inOrderTraverseNode(node.left, callback);
        callback(node);
        inOrderTraverseNode(node.right, callback);

    };
    this.inOrderTraverse = function(callback){
        inOrderTraverseNode(root, callback);
    };

    //先序遍历
    var preTraverseNode = function(node, callback){

        callback(node);
        preTraverseNode(node.left, callback);
        preTraverseNode(node.right, callback);

    };
    this.preTraverse = function(callback){
        preTraverseNode(root, callback);
    };

    //后序遍历
    var postTraverseNode = function(node, callback){

        postTraverseNode(node.left, callback);
        postTraverseNode(node.right, callback);
        callback(node);

    };
    this.postTraverse = function(callback){
        postTraverseNode(root, callback);
    };

    //搜索树中的值 最小值 最大值 特定值
    //最小值
    var minNode = function(node){
        if(node){
            while(node && node.left !== null){
                node = node.left;
            }

            return node.key;
        }
        return null;
    };
    this.min = function(){
        return minNode(root);
    };

    //最大值
    var maxNode = function(node){
        if(node){
            while(node && node.right !== null){
                node = node.right;
            }

            return node.key;
        }
        return null;
    };
    this.max = function(){
        return maxNode(root);
    };

    //特定值
    var searchNode = function(node, key){
        if(node === null){
            return false;
        }
        if(key < node.key){
            return searchNode(node.left, key);
        }else if(key > node.key){
            return searchNode(node.right, key);
        }else{
            return true;
        }
    };
    this.search = function(key){
        return searchNode(root, key);
    };

    //移除一个节点
    var findMinNode = function(node){
        while(node && node.left !== null){
            node = node.left;
        }
        return node;
    };
    var removeNode = function(node, key){

        if(root === null){
            return null;
        }
        if(key<node.key){
            node.left = removeNode(node.left, key);
            return node;
        }else if(key>node.key){
            node.right = removeNode(node.right, key);
            return node;
        }else{  //键等于node.key

            //第一种情况——一个叶节点
            if(node.left === null && node.right === null){
                node = null;
                return node;
            }

            //第二种情况——一个只有一个子节点的节点
            if(node.left === null){
                node = node.right;
                return node;
            }else if(node.right === null){
                node = node.left;
                return node;
            }

            //第三种情况——一个有两个子节点的节点
            var aux = findMinNode(node.right);
            node.key = aux.key;
            node.right = removeNode(node.right, aux.key);
            return node;
        }
    };
    this.remove = function(key){
        root = removeNode(root, key);
    }
}

//@todo 自平衡树 AVL树

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
