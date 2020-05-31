/**
 *  Created by chenhong on 2020/5/24
 *
 */

//排序算法 + 搜索算法
function ArrayList(){
    var array = [];

    this.insert = function(item){
        array.push(item);
    };

    this.toString = function(){
        return array.join();
    };

    function swap(array, index1, index2){
        [array[index1], array[index2]] = [array[index2], array[index1]];
    }

    this.bubbleSort = function(){
        var length = array.length;
        for(var i=0; i<length; i++){
            for(var j=0; j<length-1; j++){
                if(array[j]> array[j+1]){
                    swap(array, j, j+1);
                }
            }
        }
    };

    //改进后的冒泡
    this.modifiedBubbleSort = function(){
        var length = array.length;
        for(var i=0; i<length; i++){
            for(var j=0; j<length-1-i; j++){
                if(array[j]> array[j+1]){
                    swap(array, j, j+1);
                }
            }
        }
    };

    this.selectionSort = function(){
        var length = array.length,
            indexMin;
        for(var i=0; i<length-1; i++){
            indexMin = i;
            for(var j=i; j<length; j++){
                if(array[indexMin] > array[j]){
                    indexMin = j;
                }
            }
            if(i !== indexMin){
                swap(array, i, indexMin);
            }
        }
    };

    this.insertSort = function(){
        var length = array.length,
            j,
            temp;
        for(var i=1; i<length; i++){
            j=i;
            temp = array[i];
            while(j>0 && array[j-1]>temp){
                array[j] = array[j-1];
                j--;
            }
            array[j] = temp;
        }
    };

    function merge(left, right){
        var result = [],
            il = 0,
            ir = 0;
        while(il<left.length && ir<right.length){
            if(left[il] < right[ir]){
                result.push(left[il]);
                il++;
            }else{
                result.push(right[ir]);
                ir++;
            }
        }

        while(il< left.length){
            result.push(left[il++]);
        }

        while(ir < right.length){
            result.push(right[ir++]);
        }

        return result;
    }

    function mergeSortRec(array){
        var length = array.length;
        if(length === 1){
            return array;
        }

        var mid = Math.floor(length/2),
            left = array.slice(0, mid),
            right = array.slice(mid, length);

        return merge(mergeSortRec(left), mergeSortRec(right));
    }

    this.mergeSort = function(){
        array = mergeSortRec(array);
    };

    //划分过程
    function partition(array, left, right){
        var pivot = array[Math.floor((right+left)/2)],
            i = left,
            j = right;
        while(i<=j){
            while(array[i] < pivot){
                i++;
            }
            while(array[j] > pivot){
                j--;
            }
            if(i<=j){
                swap(array, i, j);
                i++;
                j--;
            }
        }
        return i;
    }

    function quick(array, left, right){
        var index;

        if(array.length > 1){
            index = partition(array, left, right);

            if(left < index-1){
                quick(array, left, index-1);
            }

            if(index < right){
                quick(array, index, right);
            }
        }
    }

    this.quickSort = function(){
        quick(array, 0, array.length -1);
    };

    //搜索算法： 顺序查找
    this.sequentialSearch = function(item){
        for(var i=0; i<array.length; i++){
            if(array[i] === item){
                return i;
            }
        }
        return -1;
    };

    //搜索算法： 二分查找
    this.binarySearch = function(item){
        this.quickSort();

        var low = 0,
            high = array.length - 1,
            mid,
            element;
        while(low <= high){
            mid = Math.floor((low+high)/2);
            element = array[mid];

            if(element<item){
                low = mid+1;
            }else if(element > item){
                high = mid - 1;
            }else{
                return mid;
            }
        }

        return -1;
    }
}

//快排es6实现
function quickSort(arr){
    if(!arr.length){
        return [];
    }
    const [pivot, ...rest] = arr;
    return [...quickSort(rest.filter(x=>x<pivot)), pivot, ...quickSort(rest.filter(x=>x>pivot))];
}

//单链表反转
function reverseList(head){
    if(!head){
        return null;
    }
    let curr = head,
        prev = null,
        next;
    while(curr){
        next = curr.next;
        curr.next = prev;
        prev = curr;
        curr = next;
    }
    return prev;
}

//list 转换成 树
function convert(list){
    let res = [];
    let obj = {};
    list.forEach((item)=>{
        obj[item.id] = item;
    });
    list.forEach((item)=>{
        if(item.parentId !== 0){
            obj[item.parentId]['children']? obj[item.parentId]['children'].push(item): obj[item.parentId]['children'] = [item];
        }else{
            res.push(item);
        }
    });
    return res;
}
//转化成树形数组  [{parentId: xxx, id: xxx}, ...]=>[{}]
/**
 * 1. 创建result
 * 2. data 不是数组 ，返回[]
 * 3. data 是数组
 *      3.1 清洗data，删除children属性，防止污染
 *      3.2 初始化map
 *      3.3 map[每个id] = 每个item；
 *      3.4 处理data
 *           帮data找parent
 *                 有parent，往里面加children，分两种，有children属性，没children属性
 *                 没有parent，直接push进res数组
 */
function toTree(data){
    let res = [];
    if(!Array.isArray(data)){
        return res;
    }
    data.forEach(item=>{
        delete item.children;
    });
    let map = {};
    data.map(item=>{
        map[item.id] = item;
    });

    data.forEach(item=>{
        let parent = map[item.parentId];
        if(parent){
            (parent.children || parent.children=[]).push(item);
        }else{
            res.push(item);
        }
    });

    return res;
}

//LeetCode 合并两个有序数组
var merge = function(nums1, m, nums2, n) {  //nums1 nums2 是有序数组 m n是有效位数
    var i=m-1,  //双指针法 从后往前 i是nums1的指针 j是num2的指针
        j=n-1,
        p=m+n;
    while(i>=0 && j>=0){
        nums1[--p] = nums1[i]<nums2[j]? nums2[j--]:nums1[i--];
    }
    if (i < 0) {
        while (j >= 0) {
            nums1[--p] = nums2[j--];
        }
    }
};

//正常的两个有序数组 left right 合并
function merge(left, right){
    var result = [],
        il = 0,
        ir = 0;
    while(il<left.length && ir<right.length){
        if(left[il] < right[ir]){
            result.push(left[il]);
            il++;
        }else{
            result.push(right[ir]);
            ir++;
        }
    }

    while(il< left.length){
        result.push(left[il++]);
    }

    while(ir < right.length){
        result.push(right[ir++]);
    }

    return result;
}

/**
 * LeetCode 链表相关
 */
function LinkedList(){
    //节点
    function LinkedNode(val){
        this.val = val;
        this.next = null;
    }

    //LeetCode 单链表反转
    var reverseList = function(head) {
        let curr = head;
        let prev = null;
        let next;
        if(curr === null){
            return null;
        }
        while(curr){
            next = curr.next;
            curr.next = prev;
            prev = curr;
            curr = next;
        }
        return prev;
    };

    //LeetCode 删除链表中的节点
    var deleteNode = function(node) {
        if(node.next){
            node.val = node.next.val;
            node.next = node.next.next;
        }else{
            node = null;
        }
    };

    //LeetCode 删除链表的倒数第N个节点
    var removeNthFromEnd = function(head, n) {
        var list = [];
        for(let curr=head; curr; curr=curr.next){
            list.push(curr);
        }
        let p = list.length - n;
        if(list[p-1]){
            let prev = list[p-1];
            if(list[p+1]){
                prev.next = list[p+1];
            }else{
                prev.next = null;
            }
        }else{
            if(list[p+1]){
                list[0] = list[p+1];
            }else{
                list[0] = null;
            }
        }
        return list[0];
    };

    //LeetCode 合并两个有序链表
    var mergeTwoLists = function(l1, l2) {
        if(l1 === null) return l2;
        if(l2 === null) return l1;
        var l3 = new ListNode(-1);
        var curr3 = l3;
        while(l1!==null && l2!==null){
            if(l1.val < l2.val){
                curr3.next = l1;
                l1 = l1.next;
            }else{
                curr3.next = l2;
                l2 = l2.next;
            }
            curr3 = curr3.next;
        }
        curr3.next = (l1 === null)? l2: l1;
        return l3.next;
    };

    //LeetCode 是否是回文链表
    var isPalindrome = function(head) {
        var stack = [];
        while(head){
            stack.push(head.val);
            head = head.next;
        }
        var stackCopy = Array.from([...stack]);
        stack.reverse();
        let flag = true;
        stack.map((item, index)=>{
            if(item != stackCopy[index]){
                flag = false;
            }
        });
        return flag;
    };

    //LeetCode 是否是环形链表
    var hasCycle = function(head) {
        if(!head){
            return false;
        }
        let slow = head, quick = head.next;
        while(quick && quick.next){
            if(slow === quick){
                return true;
            }else{
                slow = slow.next;
                quick = quick.next.next;
            }
        }
        return false;
    };

    //@todo 两两交换链表中的节点
}

/**
 * 二叉树相关
 */
function BinarySearchTree(){
    //节点结构
    function TreeNode(val){
        this.val = val;
        this.left = null;
        this.right = null;
    }

    // LeetCode 二叉树层序遍历I  二维数组
    var levelOrder = function(root) {
        var res = [];
        var helper = function(node, level){
            if(node === null) return;
            (res[level] || (res[level] = [])).push(node.val);
            helper(node.left, level+1);
            helper(node.right, level+1);
        };
        helper(root, 0);
        return res;
    };

    // LeetCode 二叉树层序遍历II  二维数组
    var levelOrderBottom = function(root) {
        var res = [];
        var helper = function(node, level){
            if(node === null) return;
            (res[level] || (res[level] = [])).push(node.val);
            helper(node.left, level+1);
            helper(node.right, level+1);
        };
        helper(root, 0);
        return res.reverse();
    };

    //@todo 二叉树层序遍历 一维数组（也就是层与层之间 加一个空的 搞一个分割）


    //二叉树-遍历  之字形遍历 锯齿形层次遍历(先从左到右，再从右到左)
    var zigzagLevelOrder = function(root) {
        var res = [];
        function helper(node, depth){
            if(node === null) return;
            (res[depth-1] || (res[depth-1] = [])).push(node.val);
            helper(node.left, depth+1);
            helper(node.right, depth+1);
        }
        helper(root, 1);  //正常层级遍历

        res = res.map((item, index)=>{  //对偶数层，数组翻转
            if(index%2 === 1){
                return item.reverse();
            }
            return item;
        });

        return res;
    };

    //@todo 二叉树-广度优先遍历 二维数组 一维数组

    //@todo 二叉树-深度优先遍历

    //二叉树的 先序遍历 存到结果数组
    var preorderTraversal = function(root) {
        var res = [];
        function helper(node){
            if(node === null) return;
            res.push(node.val);
            helper(node.left);
            helper(node.right);
        }
        helper(root);
        return res;
    };

    //二叉树的 中序遍历 存到结果数组
    var inorderTraversal = function(root) {
        var res = [];
        function helper(node){
            if(node === null) return;
            helper(node.left);
            res.push(node.val);
            helper(node.right);
        }
        helper(root);
        return res;
    };

    //二叉树的 后序遍历 存到结果数组
    var postorderTraversal = function(root) {
        var res = [];
        function helper(node){
            if(node === null) return;
            helper(node.left);
            helper(node.right);
            res.push(node.val);
        }
        helper(root);
        return res;
    };

    //@todo 根据二叉树的先序和中序遍历结果，重建出该二叉树


    //二叉树 最大深度
    var maxDepth = function(root) {
        if(root === null){
            return 0;
        }
        var lHeight = maxDepth(root.left);
        var rHeight = maxDepth(root.right);
        var childMaxHeight = Math.max(lHeight, rHeight);
        return childMaxHeight+1;
    };

    //二叉树 最小深度
    var minDepth = function(root) {
        if(root === null){
            return 0;
        }
        if((root.left===null) && (root.right===null)){
            return 1;
        }
        var min_dipth = Infinity;
        if(root.left){
            min_dipth = Math.min(minDepth(root.left), min_dipth);
        }
        if(root.right){
            min_dipth = Math.min(minDepth(root.right), min_dipth);
        }
        return min_dipth+1;
    };

    //LeetCode 101.是否是对称二叉树
    var isSymmetric = function(root) {
        function check(left, right){
            if(left === null && right === null){
                return true;
            }
            if(left === null || right === null){
                return false;
            }
            return (left.val === right.val) && check(left.left, right.right) && check(left.right, right.left);
        }
        return check(root, root);
    };
}


/**
 * N叉树相关
 */
function NTree(){
    //多叉树 就可以想成 dom树
    //多叉树的 深度优先遍历
    function deepTraversal(node){
        let nodes = [];
        if(node !== null){
            nodes.push(node);
            let children = node.children;
            !!children && children.length>0 && children.map((childNode)=>{
                deepTraversal(childNode);
            })
        }
        return nodes;
    }

    //DOM树的 多叉树的 广度优先遍历
    function wideTraversal(node){
        let nodes = [], i=0;
        if(nodes !== null){
            nodes.push(node);
            wideTraversal(node.nextElementSibling);
            node = nodes[i++];
            wideTraversal(node.firstElementChild);
        }
        return nodes;
    }

    //LeetCode N叉树 先序遍历 存入数组
    var preorder = function(root) {
        var res = [];

        function helper(node){
            if(node === null) return;
            res.push(node.val);
            let children = node.children;
            !!children && (children.length>0) && children.map(childNode=>{
                helper(childNode);
            })
        }
        helper(root);
        return res;
    };

    //LeetCode N叉树 后序遍历 存入数组
    var postorder = function(root) {
        var res = [];
        function helper(node){
            if(node === null) return;
            let children = node.children;
            !!children && (children.length>0) && children.map(childNode=>{
                helper(childNode);
            });
            res.push(node.val);
        }
        helper(root);
        return res;
    };

    //LeetCode N叉树 层序遍历 存入数组
    var levelOrder = function(root) {
        let res = [];
        function helper(node, level){
            if(node === null) return;
            (res[level] || (res[level]=[])).push(node.val);
            let children = node.children;
            !!children && (children.length>0) && children.map((childNode)=>{
                helper(childNode, level+1);
            })
        }
        helper(root, 0);
        return res;
    };

    //@猿辅导
    //@todo N叉树 求depth层有多少个节点 root的层级为1

}

//@todo 判断另一颗树的子结构

//@todo 给定一个非空数组，返回此数组中第三大的数。

//零钱兑换
var coinChange = function(coins, amount) {
    var dp = (new Array(amount+1)).fill(amount+1);
    dp[0] = 0;
    for(var i=1; i<=amount; i++){
        for(var j=0,l=coins.length; j<l; j++){
            if(coins[j]<=i){
                dp[i] = Math.min(dp[i], dp[i-coins[j]]+1);
            }
        }
    }
    return (dp[amount]>amount)? -1: dp[amount];
};

//@todo //反转数组|字符串


//判断是否是回文字符串，忽略大小写
var isPalindrome = function(s) {
    s = s.replace(/\W/g, '').toLowerCase();
    return (s === s.split('').reverse().join(''));
};

//用自己的方法，判断是否是回文字符串
var isPalindrome = function(s){
    var i = 0,  //创建左指针
        j = s.length-1;  //创建右指针
    var flag = true;
    while(i<=j){
        if(s[i] !== s[j]){
            return flag = false;
        }
        i++;
        j--;
    }
    return flag;
};

//计数质数 统计所有小于非负整数 n 的质数的数量
var countPrimes = function(n) {
    var isPrime = (new Array(n)).fill(true);
    for(var i=2; i<n; i++){
        if(isPrime[i]){
            for(var j=i*i; j<n; j += i){
                if(isPrime[j]){
                    isPrime[j] = false;
                }
            }
        }
    }
    var count = 0;
    for(var i=2; i<n; i++){
        if(isPrime[i]){
            count++;
        }
    }
    return count;
};

//@todo 最长不含重复字符的子字符串

//@todo 栈排序




































