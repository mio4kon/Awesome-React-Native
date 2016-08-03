/**
 * Created by mio4kon on 16/8/3.
 * Generator函数
 *
 * 调用Generator函数，返回一个遍历器对象，代表Generator函数的内部指针。
 *
 * 调用generator对象有两个方法
 *
 * 一:
 * 每次调用遍历器对象的next方法，就会返回一个有着value和done两个属性的对象。
 * value属性表示当前的内部状态的值，是yield语句后面那个表达式的值；
 * done属性是一个布尔值，表示是否遍历结束。
 *
 * 二:
 * for ... of循环迭代generator对象
 * 这种遍历最后一项不会遍历到(done为true不会遍历到)
 *
 */


function* foo(x) {
    yield x + 1;
    yield x + 2;
    return x + 3;
}

console.log("---------------错误---------------");

//这样永远都是{ value: 2, done: false }
console.log(foo(1).next());
console.log(foo(1).next());

console.log("---------------正确---------------");

//应该这样
var f = foo(1);
console.log(f.next());  //{ value: 2, done: false }
console.log(f.next());  //{ value: 3, done: false }
console.log(f.next());  //{ value: 4, done: true }
console.log(f.next());  //{ value: undefined, done: true }


console.log("----------------遍历:1 --------------");

var f2 = foo(1);
while (true) {
    let one = f2.next();
    console.log(one.value);
    if (one.done) {
        break;
    }
}

console.log("----------------遍历:2 --------------");
var f3 = foo(1);
for (var a of f3) {
    console.log(a);  //!!!最后一项4不会遍历到!!!
}


console.log("----------------Generator函数可以不用yield语句(暂缓执行函数)--------------");

function* fee() {
    console.log('执行了！')
}
fee();        //不执行
fee().next(); //只有调用next才执行


