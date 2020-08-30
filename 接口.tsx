// 接口：Ts核心原则之一，是对值所具有的结构进行类型检查。（结构性子类型化）
// 作用：为这些类型命名和为你的代码或第三方代码定义契约。

// 通过一个例子来看接口是怎么工作的
function printLabel(labelledObj: { label: string }) {
    console.log(labelledObj.label)
}
let myObj = { size: 10, label: 'Size 10 OBJ' }
printLabel(myObj)

// 使用接口,一般interface类型命名都是用大写I开头
interface Ilabel {
    label: string
}
function printLabel2(labelledObj: Ilabel) {
    console.log(labelledObj.label)
}
printLabel2(myObj)


// 可选属性，接口里的属性不全都是必需的。在函数传入的参数对象对，只有部分的属性赋值。
interface IsquareConfig {
    color?: string; // 注意这里是分号
    width?: number;
}
function createSquare(config: IsquareConfig): { color: string; area: number } {
    let newSquare = { color: 'white', area: 100 };
    if (config.color) {
        newSquare.color = config.color;
    }
    if (config.width) {
        newSquare.area = config.width * config.width;
    }
    return newSquare
}

let mySquare = createSquare({ color: 'block' }) // 注意这里传的是对象，然后接口检查的也是对象

// 只读属性，一些对象属性只能在对象刚刚创建的时候修改其值。
// 可以载属性名前加readonly来指定只读属性。
interface Point {
    readonly x: number;
    readonly y: number;
}
let p1: Point = { x: 10, y: 20 };
p1.x = 5; // error


// ReadonlyArray<T>类型，它与Array<T>相似，只是把所有可变方法去掉了，
// 因此可以确保数组创建后再也不能被修改
let editA: number[] = [1, 2, 3, 4];
let ro: ReadonlyArray<number> = editA;
editA[0] = 12;
editA.push(5);
editA.length = 100;
ro[0] = 12;
ro.push(5);
ro.length = 100;

editA = ro; // 把ReadonlyArray赋值给普通的数组也是不可以的
// 但是可以用类型重写
editA = ro as number[];


// readonly 与 const
// 最简单的判断该用readonly还是用const的方法是要用来当变量还是当属性。
// 变量用const，属性用readonly。


// 而外的属性检查
interface IsquareConfig2 {
    color?: string;
    width?: number;
}
function createSquare2(config: IsquareConfig2): { color: string, area: number } {
    // ...
}
// 这里的colour在IsquareConfig2是额外的属性，是无意义的
let mySquare2 = createSquare2({ colour: 'red', width: 100 })

// 绕开检查，可以使用类型断言
let mySquare3 = createSquare2({ width: 100, opactiy: 0.5 } as IsquareConfig2)

// 最佳的方式是添加一个字符串索引签名。前提是这个对象具有特殊用途使用的额外属性（就是不是偷懒，而是有正当理由~~~）
interface IsquareConfig3 {
    color?: string;
    width?: number;
    [propName: string]: any;
}

// 让人惊讶的方法，将对象赋值给另外一个变量，因为变量不会经过额外属性检查（我是震惊的）
let squareOtions = { colour: 'red', width: 100 };
let mySquare4 = createSquare2(squareOtions)


// 函数类型,接口除了描述带有属性的普通对象外，接口也可以描述函数类型。
// 接口表示函数类型，需要定义一个调用签名。
interface SearchFunc {
    // 它就像是一个只有参数列表和返回值类型的函数定义。
    // 参数列表里的每个参数都需要名字和类型。
    (source: string, subString: string): boolean;
}

let mySearch: SearchFunc;
mySearch = function (source: string, subString: string) {
    let result = source.search(subString);
    return result > -1;
}
// 对应函数类型的类型检查来说，函数的参数名不需要和接口里定义的一致（只看参数位置）。
// 还有就是如果在函数定义参数的时候，如果不想定义参数类型，那接口函数类型会推断出参数类型。（可以不定义）
// 我们可以把方法简写成这个亚子
let mySearch1: SearchFunc;
mySearch1 = function (sour, sub) {
    let result = sour.search(sub);
    return result > -1;
}

// 可索引的类型，与使用接口描述函数类型差不多。
// 可索引类型具有一个索引签名，它描述了对象索引的类型，还有相应的索引返回值类型
interface stringArray {
    [index: number]: string;
}
let myArray: stringArray;
myArray = ['Bob', 'Fred'];

let myStr: string = myArray[0];

// Ts支持两种索引签名：字符串和数字。
// 可以同时使用两种类型的索引，但是数字索引的返回值必须是字符串索引返回值类型的子类型
class Animal {
    name: string;
}
class Dog extends Animal {
    breed: string;
}

// 错误：使用数值型的字符串索引，有时候会得到不同的Animal！(没搞懂)
interface NotOkey {
    [x: string]: Dog;
    [x: number]: Animal;
}

// 观察下面的例子
interface numberDictionary {
    [index: string]: number;
    length: number; // ok;length是number类型
    name: string;  // error;name的类型与索引类型返回值的类型不匹配
}

// 可以设置索引签名为只读，防止索引赋值
interface readonlyStringArray{
    readonly [index: number]: string;
}
let myArray2: readonlyStringArray = ['Alice', 'Bob']
myArray2[2] = 'uzi' // 索引签名是制只读的，不能设置





















