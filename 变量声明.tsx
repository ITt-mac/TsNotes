// let 和 const到底使用哪一个？
// 视情况而定，基本原则是如果一个变量不需要对它写入，
// 那么其他使用这些代码的到人也不能写入它们。
// 并且思考为什么需要对这些变量重新赋值。
// 重要的是const 也更容易让我们推测数据的流动


// 解构数组
let objFooBar = {
    a: 'foo',
    b: 12,
    c: 'bar'
}
let { a: aName, b: bName }: { a: string, b: number } = objFooBar;


// 函数声明
type C = { a: string, b?: number }
function f({ a, b }: C): void { }

// 对象展开有限制，它仅仅包含对象的自身的可枚举的属性，
// 大体上是说当你展开一个对象实例时，会丢失方法
class classC {
    p=12;
    m(){

    }
}
let exC = new classC()
let clone = {...exC}
clone.p; // ok
clone.m()  //error


//TS编译器不允许展开泛型函数上的参数类型。