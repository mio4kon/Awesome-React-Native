/**
 * Created by mio4kon on 16/8/2.
 * 解构
 */

'use strict'

log("=================数组解构=================");
log("----------------例1----------------");
log("##")
//数组解构
{
    let [a,b,c] = [1, 2, 3];
    log("a:" + a);
}


log("##")
//嵌套
{
    let [foo ,[[bar],goo]] = [10, [[20], 30]];
    log("bar:" + bar);
}


log("##")
{
    let [,,third]=[11, 12, 13];
    log("third:" + third);

}

log("##")
{
    let [head,...tail] = [1, 2, 3, 4];
    log("tail:" + tail);
}

log("##")
{
    //不完全解构
    let [x,y] = [7, 8, 9];
    log("x:" + x);
}

//如果等号的右边不是可遍历解构,报错
// let [z] = 1;
// console.log("z:"+z);

log("----------------例2----------------");
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
log("first:" + first);
log("second:" + second);
log("third:" + third);
log("fourth:" + fourth);
log("fifth:" + fifth);
log("sixth:" + sixth);

console.log("=================对象解构=================");
log("##")
{
    let {foo, bar} ={foo: "1", bar: "2"};
    log(foo);
}


log("##")
{
    let {foo:baz} = {foo: "3", bar: "4"};
    // log(foo); error
    log(baz) // 3
    //对象的解构赋值的内部机制，是先找到同名属性，然后再赋给对应的变量。真正被赋值的是后者，而不是前者。

}


function log(content) {
    console.log(content)
}
