

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
