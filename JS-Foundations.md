# Types

## Primitive types

- undefined
- string
- number
- boolean
- object
- symbol

Undefined is kind of a default value.

```js
var v;
type of v
// 'undefined'
```

_Btw `type of` returns a string._

Array is subtype of an object.

```js
v = [1, 2, 3];
type of v;
// 'object'
```

_If you want to check if it's an array use `Array.isArray()`_

**_undefined_** _vs_ **_undeclared_**
`undefined` there is a variable and at the moment it has no value.
`undeclared` it never been created in any scope we have access to.

## Negative zero

**_Math definition:_**
For each real number `a`, we have a number `−a`.

```JS script
console.log(trendRate) = -0; // 0

trendRate.toString(); // '0'

trendRate === 0 // true

trendRate < 0 // false
trendRate > 0 // false

Object.is(trendRate, -0) //true
Object.is(trendRate, 0) //false
```

Negative zeros are actually used in programs. To check if a value is `-0` use `Object.is`.

# Coercion

Type coercion is the **_automatic or implicit conversion of values_** from one data type to another.
**Implicit** coercion happens when JavaScript coerces the value type to the expected type under the hood. This type of coercion happens without the developer noticing. **Explicit** coercion happens when we want to coerce the value type to a specific type.

## To String

You can use `toString()`, which returns a string representing the object.

```JS script
[]                  // ''
[1, 2, 3]           // '1,2,3'
[null, undefined]   // ','
[[], [], []]        // ',,'
[,,,]               // ',,,'

{}                  // '[object Object]'
{a:2}               // '[object Object]'
```

_Implicit coercion example_

```JS Script
const numStudents = 16
console.log(
    `There are ${numStudents} students`
)
// There are 16 students
```

## String to number

You can use `Number()` function to convert values of other types to number

```JS script
''            // 0
'0'           // 0
'-0'          // -0
' 0009  '     // 9
'3.120'       // 3.120
'0.'          // 0
'.'           // NaN
```

```JS script
false         // 0
true          // 1
null          // 0
undefined     // NaN
```

_Be careful with using coercion to number with arrays, as there are many corner cases_

```JS script
['']          // 0
['0']         // 0
['-0']        // -0
[null]        // 0
[undefined]   // 0
[1,2,3]       // NaN
```

```JS script
const string = '2'
const toNumber = +string
typeof(toNumber)
// number
```

Insted of using `+string` it's better to use `Number(string)` which gives us same output.

## Boxing

Boxing is a form of implicit coercion.

```JS script
if (studentName.length > 50) {
    console.log('Students name too long')
}
```

> _How so we can access `.length` property on a primitive value?_

JS uses implicit coercion to convert it to its object counterpart.

```JS script
const studentObj = new String('Stud')
// returns an object
// String {0: "S", 1: "t", 2: "u", 3: "d", constructor: Object}
```

String object has a property `.length`.

## Coercion takeaways

- Avoid creating functions which can take many value types and do different things based on that value. Other way you risk coercion problems.
- Its better to design a function which can take only one or two types. For ex. Numbers and strings.
- This is why TypeScript exists, as its static typing solves this problem.
- Its not necessary to use TypeScript everywhere, instead, keep it simple

# Equality

<!-- TODO
More reasearch needed  -->

I think in React ESlint complains about using `==`, so unless you disable this check, to keep it shut you have to use `===`.
Because we use React, for now i will stick with `===`.

## Takeaway

- Kyle made a good point about knowing types of values before you compare them. Since you know their types, he says `==` is much better option.

# Scope

> _JS is two-pass system_

While executing code, JS passes this first step where for ex. syntax errors are catched. In this first step, which we can call **_compilation_** or **_parsing_**, is where scopes are set up.
In Second step, JS executes code line by line top to bottom.

> _JS organizes scopes with functions and blocks_

Function scope ex.

```JS Script
const teacher = "Kyle";

function otherClass() {
  const teacher = "Suzy";

  function ask(question) {
    console.log(teacher, question);
  }

  ask("why?");
}

otherClass();
// Suzy why?
```

Block scope ex.

```JS Script
const teacher = "kyle";

{
  let teacher = 'Suzy'
  console.log(teacher)
}

console.log(teacher)

// Suzy
// Kyle
```

By defining variable via `let` keyword, you create **_block scope_** and in global scope you dont have access to:

```JS
let teacher = 'Suzy'
```

> _If you use `var` instead of `let`, you dont create block scope_

## Hoisting

One example could be when we call something before its been declared.

```JS
const teacher = "kyle";
otherTeacher()

function otherTeacher() {
    console.log(teacher)
    var teacher = 'Suzy'
}
// undefined
```

In this example, calling function `otherTeacher()` before it was declared is good and does work. Problems begin within a body of a function, where we try to log teacher in the console, before teacher was declared inside of a `otherTeacher` scope.

# Closure

> _Closure is when a function "remembers" its lexical scope even when the function is executed outside that lexical scope._ -- _Kyle Simpson_

<!-- TODO -->

```JS
var teacher = "kyle";

function myTeacher() {
  console.log(teacher)
}

teacher = "Suzy"

myTeacher()
// Suzy
```

# Objects

## _this_ keyword

> A function's **_this_** references the execution context for that call, determined entirely by **_how the function was called._** -- _Kyle Simpson_

There are four wayst to call a function

- Explicitly via call and apply
- Implicitly as a method
- As a constructor
- As a function

### Explicit binding

Call a function via `.call()` method

```JS
function ask(question) {
  console.log(this.teacher, question)
}

function otherClass() {
  var myContext = {
    teacher: 'Suzy'
  }
  ask.call(myContext, 'Why?')
}

otherClass()
// Suzy Why?
```

First argument of `.call()` method is thisArg. In this case `this.teacher` points at teacher property of some object. When we call `ask()` function by using `.call()` method while passing `myContext` as thisArg, `this.teacher` points at `myContext.teacher`.

```JS
function ask(question) {
  console.log(this.teacher,question)
}

const workshop = {
  teacher:'Kyle',
}

ask.call(workshop, 'what is explicit binding')
// Kyle what is explicit binding
```

In this example we explicitly say that we want to invoke `ask()` function in a `workshop` context.

### Implicit binding

```JS
const workshop = {
  teacher:'Kyle',
  ask(question) {
    console.log(this.teacher,question)
  }
}

workshop.ask('what is implicit binding')
// Kyle what is implicit binding
```

In this case, `this.teacher` points automatically to the `workshop` object and looks inside of it if `.teacher` is there.
Dont look at the function definition. All of the magic happens at the line where the function is called. `this.teacher` points to the object which appears before `.ask()`

<!-- TODO (am i right??) -->

## Arrow functions & `this`

```JS
var workshop = {
  teacher: 'kyle',
  ask: (question) => {
    console.log(this.teacher, question)
  }
}

workshop.ask('What happened to this')
// undefined What happened to this
```

Arrow functions dont have `this`, therefore, in this case, `this` resolves lexically. In this example `workshop` is not creating a scope, so `this` is pointing to global scope. Because in global scope there is no teacher, it returns `undefined`.

# Classes

Class example:

```JS
class Workshop {
    constructor (teacher) {
        this.teacher = teacher
    }
    ask(question) {
        console.log(this.teacher, question)
    }
}

var deepJS = new Workshop('Kyle')
deepJS.ask('Is class a class?')

var reactJS = new Workshop('Suzy')
reactJS.ask('Is this class OK?')

// Kyle Is class a class?
// Suzy is this class OK?
```
