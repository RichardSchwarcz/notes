<style>
r { color: #f54842 }    /*h2*/
o { color: Orange }     /*h3*/
g { color: Green }      /*h4*/
my { background: #ffdc6e4d }
</style>

# Closure

## <r>Returning functions</r>

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

## <r>Nested scope</r>

This example shows, how we can "memoize" values inside of functions. This function increments `counter` by every call.

```JS
function outer() {
  let counter = 0;
  function incrementCounter() {
      counter++;
  }
  incrementCounter();
}

outer();
```

![nestedScope](/assets/nestedScope.svg)

Lets execute this `outer()` function step by step:

1 - We define `outer()` function in **_global memory_**
2 - By calling `outer()` we create new execution context (A)
3 - We step inside of this execution context (A) and in local memory we create new variable `counter` and set it to `0`
4 - We define `incrementCounter()` function in local memory of `outer()` (A)
5 - By calling `incrementCounter()` we create new execution context (B) inside of execution context (A)
6 - By calling `incrementCounter()` we execute `counter++`

Now `counter++` looks into closest local memory (B). It Doesn't find counter there, so it goes up one level. Inside of (A) local memory is counter defined and so, it increments it.

## <r>Function closure</r>

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

![closureDiagram](/assets/closureDiagram.svg)

Again lets execute this function step by step:

1. We define `outer` function in **_global memory_**
2. We put `outer` on a Call Stack
3. By calling `outer()` we create new execution context (A)
4. We step inside of this execution context (A) and in local memory we create new variable `counter` and set it to `0`

5. We define `incrementCounter()` function in local memory of `outer()` (A)
6. We return `incrementCounter` function and assign it to `myNewFunction` which will be stored in **_global memory_**
7. _Execution context (A) has been DELETED and outer() popped out of Call Stack_
8. By calling `myNewFunction()` we create new execution context (B)
9. We step inside of this execution context (B) and run `counter++`
10. `counter++` now goes and looks into closest local memory (B) - memory of `myNewFunction`, previously known as `incrementCounter`. It Doesn't find counter there, so it goes up one level.
11. BUT! We might say, one level up, means it looks into **_global memory_**. That's because we returned `incrementCounter` on line 6 and we basically call it from global scope!
12. Problem is, that in **_global memory_** there is no `counter`.
13. Good news is, while returning function definition of `incrementCounter`, it got returned with special hidden property called `[[scope]]`, inside of which is stored all of the local memory of an execution context (A), incuding our `counter` variable.
14. Therefore, one level up doesn't mean we look inside of **_global memory_**, we are having a look inside this hidden property called `[[scope]]`.
15. Finally, we find our `counter` there and we increment it.
