/**
 * Created by mio4kon on 16/8/2.
 * 解构
 */

'use strict'

//数组解构
var [a,b,c] = [1, 2, 3];
console.log("a:" + a);

//嵌套
var [foo ,[[bar],goo]] = [10, [[20], 30]];
console.log("bar:" + bar);

var [,,third]=[11, 12, 13];
console.log("third:" + third);


var [head,...tail] = [1, 2, 3, 4];
console.log("tail:" + tail);

//不完全解构
var [x,y] = [7, 8, 9];
console.log("x:" + x);

//如果等号的右边不是可遍历解构,报错
// let [z] = 1;
// console.log("z:"+z);


//fibs是一个Generator函数，具有Iterator接口
//generator函数:见demo4
function* fibs() {
    var a = 0;
    var b = 1;
    while (true) {
        yield a;
        [a, b] = [b, a + b];
    }
}

var [first, second, third, fourth, fifth, sixth] = fibs();
console.log("first:"+first);
console.log("second:"+second);
console.log("third:"+third);
console.log("fourth:"+fourth);
console.log("fifth:"+fifth);
console.log("sixth:"+sixth);

