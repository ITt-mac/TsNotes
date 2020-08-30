// 1.元素类型后面+[],形成数组
const list: number[] = [1, 2, 3]
// 2.泛型数组，Array<元素类型>
const list2: Array<number> = [1, 2, 3]


// 元组类型:允许表示一个已知元素数量和类型的数组,各元素的类型不必相同
let x: [string, number]
x = ['hello', 10]  //ok
x = [10, 'hello']  //error

// 当访问越界的元素，会使用联合类型替代：即使用元组里包含的所有类型
x[3] = 'world' // ok,字符串可以赋值给(string | number)类型，文档是这样写的，但是好像不太对
x[6] = true // error Boolean 不是(string | number)类型


// 枚举,enum类型
enum Color {
    Red,
    Green,
    Blue
}
let c: Color = Color.Green;  // Color.Green = 1,enum默认从0开始编号,可以手动编号
// 手动编号
enum Color2 {
    Red = 1,
    Green,
    Blue
}
let c2: Color2 = Color2.Green // Color.Green = 2,手动编号后，会自增后面的值，也可以全部手动赋值
// 可以通过枚举类型的值，反推对应的名字
let colorName: string = Color[2]
console.log(colorName) //Blue


// any类型
// 在编译的阶段，不清楚一个变量的内容，可以用any来定义。
let notSure: any = 4;
notSure = 'maybe a string instead'
notSure = false

// any 和 object的区别，都可以移除类型检查，但是object却不能在它上面任意调用方法。
let anyNotSure: any = 4;
anyNotSure.toFixed() //ok

let objNotSure: object = 4; // 文档说可以定义，但是好像不阔以？？？
objNotSure.toFixed()

// 只知道一部分数据的类型的时候，any是非常有用的
let someSure: any[] = [1, true, 'string']
someSure[1] = 100


// Void ,void类型像是与any类型相反，它表示没有任何类型。
// 常见的，当一个函数没有返回值时候，你通常会见到其返回值类型是void
function warnUser(): void {
    console.log('This is my warning message')
}
let unusable: void = undefined // 声明一个void没有啥意义，只能给它赋值为undefined 和null

// Never 类型表示的是那些永不存在的值类型。
// 例如：never类型是那些总是会抛出异常或根本就不会有返回值的函数表达式，
// 或箭头函数表达式的返回值类型；
// 变量也可能是never类型，当它们被永不为真的类型保护所约束的时候
// never类型是任何类型的子类型，也可以赋值给任何类型，但是没有类型可以给它赋值，除了自己

// 返回never的函数必须存在无法到达的终点
function error(message: string): never {
    throw new Error(message)
}
// 推断的返回值类型为never
function fail(): never {
    return error('something failed')
}
// 返回never的函数必须存在无法到达的终点
function infiniteLoop(): never {
    while (true) {

    }
}


// Object 表示非原始类型，使用object类型可以更好的表示像Object.create 这样的api
declare function create(obj: object | null): void;
create({ prop: 0 })
create(null)
create(21)


// 类型断言，告诉编译器我比你更懂我现在用的什么类型
// 尖括号语法
let someValue: any = 'this is a string'
// let strLength: number = (<string>someValue).length;  // 这种语法在jsx里不可用
// as语法：
let strLength2: number = (someValue as string).length




