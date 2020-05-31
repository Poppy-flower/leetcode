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
