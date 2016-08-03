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

console.log("=================例1=================");
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


console.log("=================例2=================");
console.log("----------------Generator函数可以不用yield语句(暂缓执行函数)--------------");
function* fee() {
    console.log('执行了！')
}
fee();        //不执行
fee().next(); //只有调用next才执行


console.log("=================例3=================");
console.log("----------------next 参数 错误 --------------");
function* foo(x) {
    let y = 2 * (yield (x + 1));
    let z = yield (y / 3);
    return (x + y + z);
}

var a1 = foo(5);
//第二次: 虽然x=5,但并不会执行第一个yield,所以y并没有,为NaN
//切记:每次next,返回的是yield后面的数
console.log(a1.next()) // {value:6, done:false}
console.log(a1.next()) // {value:NaN, done:false}
console.log(a1.next()) // {value:NaN, done:true}


console.log("----------------next 参数 正确--------------");
/**
 * next方法可以带一个参数，该参数就会被当作上一个yield语句的返回值。
 */
var a2 = foo(5);
console.log(a2.next())   // {value:6, done:false}      x=5->5+1
console.log(a2.next(12)) //{ value: 8, done: false }   y = 2*12->24/3=8
/**
 * 这里y之所以有值,是因为即使不会调用上一次yield,但是y变量已经在上次next的时候存在了。
 * 与上个错误例子区别在于,上个例子的 2 * (yield (x + 1)) 没有执行,也不会在执行。
 */
console.log(a2.next(12))   // {value:NaN, done:true}   x = 5, y=24,z =12; ->5+24+12=41


console.log("=================例4=================");
console.log("---------------Generator.prototype.throw()---------------");

var g = function*() {
    try {
        yield;
    } catch (e) {
        console.log('内部捕获', e);
    }
};
var i = g();

i.next();
i.throw('a');
try {
    i.throw('b');
} catch (e) {
    console.log('外部捕获', e);
}

// i.throw('b');  捕获过,不能在捕获

console.log("=================例5=================");
console.log("---------------Generator函数实现状态机:原来写法---------------");

var ticking = true;
var clock = function () {
    if (ticking)
        console.log('Tick!');
    else
        console.log('Tock!');
    ticking = !ticking;
}

clock();
clock();
clock();

console.log("---------------Generator函数实现状态机:现在写法---------------");

var clockPro = function*() {
    while (true) {
        console.log('Tick!');
        yield;
        console.log('Tock!');
        yield;

    }
}

clockPro().next();
clockPro().next();
clockPro().next();


console.log("=================*例6*=================");
console.log("---------------异步操作的同步化表达---------------");

/**
 * 第一次调用loadUI函数时，该函数不会执行，仅返回一个遍历器。
 * 下一次对该遍历器调用next方法，则会显示Loading界面，并且异步加载数据。
 * 等到数据加载完成，再一次使用next方法，则会隐藏Loading界面。
 * 可以看到，这种写法的好处是所有Loading界面的逻辑，都被封装在一个函数
 * 非常清晰。
 */
function showLoadingScreen(){
    console.log("show loading.....")
};
function loadUIDataAsynchronously(){
    console.log("loading data Asynchronously....")
};
function hideLoadingScreen(){
    console.log("hide loading....")
};

function* loadUI() {
    showLoadingScreen();
    yield loadUIDataAsynchronously();
    hideLoadingScreen();
}
var loader = loadUI();
// 显示loading,然后加载数据
loader.next()

// 取消loading
loader.next()


