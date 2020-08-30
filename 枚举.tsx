// 枚举enum，可以定义一些带名字的常量。可以清晰地表达意图或创建一组有区别的用例。
// 通过枚举的属性来访问枚举成员,和枚举的名字来访问枚举类型；
enum response {
    No = 0,
    yes = 1
}
function respond(recipient: string, message: response): void {
    //...
}
respond('this is string', response.yes)

interface Irespond {
    message: string
}
function respond2(message: Irespond): void { }
respond2({ message: 'this is string' })

// 数字枚举可以混入计算过的和常量成员，并且计算过的成员，应该放在常量初始化成员后面
function getSomeValue(){
    return 333
}
enum someValue1{
    A ,
    B = getSomeValue()
}

// 字符串枚举，每个字符串枚举里，每个成员都必须用字符串字面量。
// 字符串枚举可以很好的序列化，而且相比于数字枚举来说更容易知道具体的属性值
enum Direction{
    Up = 'up',
    Down = 'down',
    Left = 'left',
    Right = 'right',
}

// 异构枚举，可以混合字符串和数字成员（不建议）
enum mixEnum {
    No = 0,
    Yes = 'yes'
}


