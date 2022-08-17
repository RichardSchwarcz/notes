<style>
r { color: #f54842 }    /*h2*/
o { color: Orange }     /*h3*/
g { color: Green }      /*h4*/
my { background: #ffdc6e4d }
</style>

# Functional programming overview

## <r>Function purity</r>

> _Instead of asking if a function is pure, better ask if a function call is pure. Function purity is not binary. It's level of confidence. -- Kyle Simpson_

To determine if a function is pure or not we have to look at the code from a bigger perspective.

```JS
function getValue(obj) {
    return obj.value
}
```

Seeing this function, obvious question would be, if `obj` is mutated at some point.
But what if an `obj` looks like this?

```JS
function getValue(obj) {
    return obj.value
}

const obj = {
    get value() {
        return Math.random()
    }
}

console.log(getValue(obj))
```

This function call is definitely not pure, as it returns different value each time we call `getValue()` function with same arguments.

### <o>Pure functions</o>

> _A Pure Function is a function that always returns the same result if the same arguments are passed._

Pure function should not have side effects, which for ex. are:

- Console
- Network calls
- Timestamps
- Random numbers

Example of pure functions:

```JS
const array = [1, 2, 3]

function addElementToArray(array, element) {
    const newArray = [...array, element]
    return newArray
}

console.log(addElementToArray(array, 4))
// [1, 2, 3, 4]
console.log(array)
// [1, 2, 3]
```

Each time we call this function with same arguments, it returns same output. Also, it doesn't affect data in gloabal scope, it returns copy of an array.

### <o>Impure functions</o>

Example of impure functions:

```JS
const array = [1, 2, 3]

function addElementToArray(element) {
    array.push(element)
}

addElementToArray(4)
console.log(array)
// [1, 2, 3, 4]
```

This function mutates data in global scope.

```JS
const array = [1, 2, 3]

function addElementToArray(array, element) {
    return [...array, element, Math.random()]
}

addElementToArray(array, 4)
console.log(array)
// [1, 2, 3, 4, 0.45060435182323477]
```

Even if we call this function with same arguments, it returns different output.

## <r>Currying</r>

Currying is a transformation of functions that translates a function from callable as `f(a, b, c)` into callable as `f(a)(b)(c)`. Curried function accepts one argument.

Example of curry function:

```JS
const ajax = curry(
    3,
    function ajax(url, data, cb) {...}
)

ajax(CUSTOMER_API)({id:42})(renderCustomer)
```

Example of curried function

```JS
function ajax(url) {
    return function getData(data) {
        return function getCB(cb) {...}
    }
}

ajax(CUSTOMER_API)({id:42})(renderCustomer)
```

## <r>Recursion</r>

> _Recursive function is function that call itself._

Example of recursive function

```JS
function countDownRecursive(n) {
  if (n <= 0) {
    return console.log("fin");
  }
  console.log(n);
  countDownRecursive(n - 1);
}

countDownRecursive(3)
// 3
// 2
// 1
// fin
```

## <r>Unary & Binary functions</r>

In functional programming we tend to care about function shapes. More specificaly about its inputs and outputs. In the name of simplicity, **unary** and **binary** functions came to play.

```JS
//unary
function increment(x) {
  return sum(x, 1);
}

//binary
function sum(x, y) {
  return x + y;
}
```

Unary function - one input, one output
Binary function - two inputs, one output

## <r>Higher order function - HOF</r>

HOF is a function that receives a function in one of its inputs and returns one or more functions

<!-- TODO -->

## <r>Composition</r>

> _One functions output becomes second functions input_

**_Composition example:_**
First lets define our unary functions needed to calculate shipping rate

```JS
function minus2(x) {
  return x - 2;
}
function triple(x) {
  return x * 3;
}
function increment(x) {
  return x + 1;
}
```

In first example we are going to use temporary variable to store results of previous function call.

```JS
// add shipping rate
var tmp = increment(4);
tmp = triple(tmp);
totalCost = basePrice + minus2(tmp);
```

We can get rid of temporary variables by calling function iside other functions argument.

```JS
// add shipping rate
totalCost = basePrice + minus2(triple(increment(4)));
```

We can wrap these functions inside of a `shippingRate` function. This is called abstraction.

```JS
// wrapper function
function shippingRate(x) {
  return minus2(triple(increment(x)));
}

// add shipping rate
totalCost = basePrice + shippingRate(4);
```

In last example we created reusable composition function.

```JS
function composeThree(fn3, fn2, fn1) {
  return function composed(v) {
    return fn3(fn2(fn1(v)));
  };
}

const shippingRate = composeThree(minus2, triple, increment);

totalCost = basePrice + shippingRate(4);
```

Composition works from right to left. In `composeThree` function we pass functions in that order.
