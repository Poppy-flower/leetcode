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
