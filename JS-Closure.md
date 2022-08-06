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

This example shows, how we can "memoize" values inside of functions. This function increments `counter` by every call.

```JS
1 function outer() {
2   let counter = 0;
3   function incrementCounter() {
4       counter++;
5   }
6   incrementCounter();
7 }
8
9 outer();
```

Lets execute this `outer()` function step by step
![Closure diagram](/assets/closureDiagram.png "closureDiagram")

- Line 1 - We define `outer()` function in **_global memory_**
- Line 9 - By calling `outer()` we create new execution context (green)
- Line 2 - We step inside of this execution context and in local memory we create new variable `counter` and set it to `0`
- Line 3 - We define `incrementCounter()` function in local memory of `outer()` (green)
- Line 6 - By calling `incrementCounter()` we create new execution context (red)
- Line 4 - By calling `incrementCounter()` we execute `counter++`

Now `counter++` looks into closest local memory (red). It Doesn't find counter there, so it goes up one level. Inside of (green) local counter is defined and so, it increments it.
