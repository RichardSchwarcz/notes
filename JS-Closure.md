# Closure

## Returning functions

```JS
function createFunction() {
  function multiplyBy2(num) {
    return num * 2;
  }
  return multiplyBy2;
}

const generatedFunc = createFunction();
const result = generatedFunc(3); // 6

```

On the last line of this example we are running `generatedFunc()` which was born as `multiplyBy2()`.

## Nested scope

This example shows, how we can "memoize" values inside of functions. This function increments `counter` by every call.

```JS
1    function outer() {
2      let counter = 0;
3      function incrementCounter() {
4          counter++;
5      }
6      incrementCounter();
7    }
8
9    outer();
```

Lets execute this `outer()` function step by step:

- Line 1 - We define `outer()` function in **_global memory_**
- Line 9 - By calling `outer()` we create new execution context (A)
- Line 2 - We step inside of this execution context (A) and in local memory we create new variable `counter` and set it to `0`
- Line 3 - We define `incrementCounter()` function in local memory of `outer()` (A)
- Line 6 - By calling `incrementCounter()` we create new execution context (B) inside of execution context (A)
- Line 4 - By calling `incrementCounter()` we execute `counter++`

Now `counter++` looks into closest local memory (B). It Doesn't find counter there, so it goes up one level. Inside of (A) local memory is counter defined and so, it increments it.

## Function closure

In this example we return `incrementCounter` function from `outer` function. Turns out, while returning its definition, it has access to `counter` variable.

```JS
1    function outer() {
2      let counter = 0;
3      function incrementCounter() {
4        counter++;
5      }
6      return incrementCounter;
7    }
8
9    const myNewFunction = outer();
10   myNewFunction();
```

Again lets execute this function step by step:

- Line 1 - We define `outer()` function in **_global memory_**
- Line 9 - By calling `outer()` we create new execution context (A)
- Line 2 - We step inside of this execution context (A) and in local memory we create new variable `counter` and set it to `0`
- Line 3 - We define `incrementCounter()` function in local memory of `outer()` (A)
- Line 6 - We return `incrementCounter` function and assign it to `myNewFunction` which will be stored in **_global memory_**

_*Execution context (A) has been DELETED*_

- Line 10 - By calling `myNewFunction()` we create new execution context (B)
- Line 4 - We step inside of this execution context (B) and run `counter++`

`counter++` now goes and looks into closest local memory (B) - memory of `myNewFunction`, previously known as `incrementCounter`. It Doesn't find counter there, so it goes up one level.
BUT! We might say, one level up, means it looks into **_global memory_**. That's because we returned `incrementCounter` on line 6 and we basically call it global scope!

Example:

```JS
1    function myNewFunction() {
2      counter++;
3    }
4
5    myNewFunction();
```

Problem is, that in **_global memory_** there is no `counter`. Good news is, while returning function definition of `incrementCounter`, it got returned with special hidden property called `[[scope]]`, inside of which is stored all of the local memory of an execution context (A), incuding our `counter` variable.
Therefore, one level up doesn't mean we look inside of **_global memory_**, we are having a look inside this hidden property called `[[scope]]`.
Finally, we find our `counter` there and we increment it.
