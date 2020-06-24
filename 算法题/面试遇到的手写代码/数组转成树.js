function toTree(arr) {
    let result = [];
    let map = {};
    for(let item of arr){
        map[item.id] = item;
    }
    for(let item of arr){
        let parent = map[item.pid];
        if(parent){
            (parent.children || (parent.children = [])).push(item);
        }else{
            result.push(item);
        }
    }
    return result;
}

let arr = [
    {name:'A',id:1,pid:0},
    {name:'6A',id:6,pid:0},
    {name:'B',id:2,pid:1},
    {name:'C',id:3,pid:1},
    {name:'D',id:4,pid:2},
    {name:'E',id:5,pid:3},
];

console.log(toTree(arr));
