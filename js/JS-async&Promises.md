<style>
r { color: #f54842 }    /*h2*/
o { color: Orange }     /*h3*/
g { color: Green }      /*h4*/
my { background: #ffdc6e4d }
</style>

# Async&Promises

## <r>Web API</r>

Here are some **_Web Browser_** features. In JS we communicate with them by their "pairs".

| Browser feature  | JS pair    |
| ---------------- | ---------- |
| Network requests | xhr/fetch  |
| HTML DOM         | document   |
| Timer            | setTimeout |

## <r>Event loop</r>

Event loop example

```JS
function printHello() {
  console.log("Hello");
}

function blockFor1Sec() {
  //.... Computational process or something
}

setTimeout(printHello, 0);

blockFor1Sec();
console.log("Me first!");

// Me first!
// Hello
```

![eventLoopDiagram](/assets/eventLoop.svg)

1. We define `printHello` function in global memory
2. We define `blockFor1Sec` function in global memory
3. We run `setTimeout` function, which is JS pair for `Timer` - feature of Web Browser
4. In Web Browser, we are going to turn on the timer
5. On completion of timer, we are going to push `printHello` function to Callback Queue
6. At 0ms the timer is complete
7. `printHello` function has been pushed into a Callback queuqe
8. We are going to run `blockFor1Sec` function
9. Now `blockFor1Sec` has been pushed into a Call Stack. At 1000.5ms `blockFor1Sec` is done and got popped out of the Call Stack
10. At 1001ms `console.log('Me first!)` is going to run and log `'Me first!'` to the console
11. At 1002ms Mr. EventLooper brought `printHello` inside of a Call Stack. That means, it could finally be run, and we can see `'Hello'` in our console. At 1002.5ms `printHello` got popped out of a Call Stack.

Function `setTimeout` does nothing in JS, instead, it's a command to Web Browser to switch on a `Timer`. Timer, needs time and function definiton to be run.

> :memo: **Note:** _Function is allowed to escape Callback Queue, once all of the synchronous code has been done. You could have infinite while loop of console logs and function in Callback Queue would never be pushed inside of a Call Stack._

**Mr. EventLooper** does very fast checking:
If there is something in a Call Stack - run it
Once Call Stack is empty, Mr. EventLooper checks if there is something in a Callback Queue. If there is a function waiting to be run, he brings it to the Call Stack.
**This is called Event Loop**.

## <r>Promises</r>

Promise chain example

```JS
function display(data) {
  console.log(data);
}

function printHello() {
  console.log("Hello");
}

function blockFor300ms() {
  //.... Computational process or something
}

setTimeout(printHello, 0);

const futureData = fetch("https://twitter.com/ryso/tweets/1");
futureData.then(display);

blockFor300ms();
console.log("Me first!");
```

![promiseDiagram](/assets/promises.svg)

1. We define functions in global memory
   1.1 `display`
   1.2 `printHello`
   1.3 `blockFor300ms`
2. We run function `setTimeout` which is a feature of Web Browser
   2.1 In Web Browser, we are going to turn on the timer
   2.2 At 0ms the timer is complete
   2.3 On completion of timer, we are going to push `printHello` function to Callback Queue
   2.4 `printHello` function is pushed into Callback queuqe
3. We define constant `futureData` and assign to it result of `fetch`
   3.A1 Result is promise object with `value` property and `on fulfilled` property. Both properties are empty for now
   3.A2 We save this promise object to global memory
   3.B1 `fetch` also communicates with browser and sends network request. Network request needs an address - domain name (twitter) and directory (/ryso/1)
   3.B2 At 1ms we made made a request to twitter
   3.B3 At 270ms twitter sent us tweet
   3.B4 Mr. PromiseMan takes that tweet and fills empty promise object's value property with it. Once that value property is updated, it's going to automatically run any function in on fulfilled array
4. To push a function to on fullfilled array, we use `.then` method
5. `display` function can't run unless all of the code in global execution context executes. For now it got pushed to Microtask Queue
6. We run `blockFor300ms` function
7. And put it on the Call Stack. Once it's finished, at 302.5ms, it go poped out of the Call Stack.
8. We run `console.log('Me first!')` and log `'Me first!'` to the console
9. Since Mikrotask Queue has priority over Callback Queue, `display` function got pushed to Call Stack and got executed at 303ms. `'hi'` has been logged to the console
10. At 303.5ms `display` function got poped out of the Call Stack
11. At 304ms `printHello` function run and `'Hello'` has been logged to the console

> :memo: **Note:**
>
> - 3A and 3B runs simultaneously.
> - Mr. EventLooper first checks microtask Queue and then Callbakck Queue

### <o>Legend of diagrams</o>

![legendDiagram](/assets/legendDiagram.svg)
