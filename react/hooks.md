<style>
r { color: #f54842 }    /*h2*/
o { color: Orange }     /*h3*/
g { color: Green }      /*h4*/
my { background: #ffdc6e4d }
</style>

# Overview of some React hooks

## <r>Rules of Hooks</r>

Hooks are JavaScript functions, but you need to follow two rules when using them.

### <o>Only Call Hooks at the Top Level</o>

**Don’t call Hooks inside loops, conditions, or nested functions.** Instead, always use Hooks at the top level of your React function, before any early returns. By following this rule, you ensure that Hooks are called in the same order each time a component renders. That’s what allows React to correctly preserve the state of Hooks between multiple `useState` and `useEffect` calls.

### <o>Only Call Hooks from React Functions</o>

Don’t call Hooks from regular JavaScript functions. Instead, you can:

✅ Call Hooks from React function components.
✅ Call Hooks from custom Hooks (we’ll learn about them on the next page).
By following this rule, you ensure that all stateful logic in a component is clearly visible from its source code.

> :memo: **Note:** _There is just one other valid place to call Hooks — your own custom Hooks._

Custom Hooks are more of a convention than a feature. If a function’s name starts with `use` and it calls other Hooks, we say it is a custom Hook.

Function components in React look like this:

```JS
function Example(props) {
    // You can use Hooks here!
  return <div />;
}
```

Previously known as “stateless components”. We’re now introducing the ability to use React state from these, so we prefer the name “function components”.
Hooks don’t work inside classes. But you can use them instead of writing classes.

## <r>useState hook</r>

Our new example starts by importing the useState Hook from React:

```JS
import React, { useState } from 'react';

function Example() {
  // Declare a new state variable, which we'll call "count"
  const [count, setCount] = useState(0);
```

**What does calling `useState` do?**
It declares a “state variable”. Our variable is called `count`. This is a way to “preserve” some values between the function calls. Normally, variables “disappear” when the function exits but state variables are preserved by React.

**What do we pass to `useState` as an argument?**
The only argument to the `useState()` Hook is the initial state. In our example, we just want a number for how many times the user clicked, so pass `0` as initial state for our variable.

**What does `useState` return?**
It returns a pair of values: the current state and a function that updates it. This is why we write `const [count, setCount] = useState()`.

We declare a state variable called `count`, and set it to `0`. React will remember its current value between re-renders, and provide the most recent one to our function. If we want to update the current `count`, we can call `setCount`.

### <o>Reading state</o>

We can use count directly:

```JS
<p>You clicked {count} times</p>
```

### <o>Updating State</o>

We pass `setCount` function to update the state

```JS
<button onClick={() => setCount(count + 1)}>
  Click me
</button>
```

### <o>Recap</o>

```JS
 1:  import React, { useState } from 'react';
 2:
 3:  function Example() {
 4:    const [count, setCount] = useState(0);
 5:
 6:    return (
 7:      <div>
 8:        <p>You clicked {count} times</p>
 9:        <button onClick={() => setCount(count + 1)}>
10:         Click me
11:        </button>
12:      </div>
13:    );
14:  }
```

- Line 1: We import the useState Hook from React.
- Line 4: Inside the `Example` component, we declare a new state variable by calling the `useState` Hook. It returns a pair of values, to which we give names. We’re calling our variable `count` because it holds the number of button clicks. We initialize it to zero by passing `0` as the only `useState` argument. The second returned item is itself a function. It lets us update the `count` so we’ll name it `setCount`.
- Line 9: When the user clicks, we call `setCount` with a new value. React will then re-render the `Example` component, passing the new `count` value to it.

## <r>useEffect hook</r>

> _The Effect Hook lets you perform side effects in function components:_

Data fetching, setting up a subscription, and manually changing the DOM in React components are **all examples of side effects**. There are two common kinds of side effects in React components: those that don’t require cleanup, and those that do.

### <o>Effects Without Cleanup</o>

Sometimes, we want to **run some additional code after React has updated the DOM.** Network requests, manual DOM mutations, and logging are common examples of effects that don’t require a cleanup.

```JS
import React, { useState, useEffect } from 'react';

function Example() {
  const [count, setCount] = useState(0);

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    // Update the document title using the browser API
    document.title = `You clicked ${count} times`;
  });

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```

**What does `useEffect` do?**
By using this Hook, you tell React that your component needs to do something after render. React will remember the function you passed (we’ll refer to it as our “effect”), and call it later after performing the DOM updates. In this effect, we set the document title, but we could also perform data fetching or call some other imperative API.

**Does `useEffect` run after every render?**
Yes! By default, it runs both after the first render and after every update. Think that effects happen “after render”. React guarantees the DOM has been updated by the time it runs the effects.

### <o>Effects with Cleanup</o>

For example, **we might want to set up a subscription** to some external data source. In that case, it is important to clean up so that we don’t introduce a memory leak!
You might be thinking that we’d need a separate effect to perform the cleanup. But code for adding and removing a subscription is so tightly related that `useEffect` is designed to keep it together. If your effect returns a function, React will run it when it is time to clean up:

```JS
import React, { useState, useEffect } from 'react';

function FriendStatus(props) {
  const [isOnline, setIsOnline] = useState(null);

  useEffect(() => {
    function handleStatusChange(status) {
      setIsOnline(status.isOnline);
    }
    ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
    // Specify how to clean up after this effect:
    return function cleanup() {
      ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
    };
  });

  if (isOnline === null) {
    return 'Loading...';
  }
  return isOnline ? 'Online' : 'Offline';
}
```

**Why did we return a function from our effect?**
This is the optional cleanup mechanism for effects. Every effect may return a function that cleans up after it. This lets us keep the logic for adding and removing subscriptions close to each other. They’re part of the same effect!

**When exactly does React clean up an effect?**
React performs the cleanup when the component unmounts. However, effects run for every render and not just once. This is why React also cleans up effects from the previous render before running the effects next time.

### <o>Dependency array</o>

```JS
useEffect(() => {
  document.title = `You clicked ${count} times`;
}, [count]); // Only re-run the effect if count changes
```

In the example above, we pass `[count]` as the second argument. What does this mean? If the `count` is `5`, and then our component re-renders with `count` still equal to `5`, React will compare `[5]` from the previous render and `[5]` from the next render. Because all items in the array are the same `(5 === 5)`, React would skip the effect.

When we render with count updated to `6`, React will compare the items in the `[5]` array from the previous render to items in the `[6]` array from the next render. This time, React will re-apply the effect because `5 !== 6`. If there are multiple items in the array, React will re-run the effect even if just one of them is different.

> :memo: **Note:** _If you want to run an effect and clean it up only once (on mount and unmount), you can pass an empty array ([ ]) as a second argument. This tells React that your effect doesn’t depend on any values from props or state, so it never needs to re-run._

```JS
function Example({ someProp }) {
  function doSomething() {
    console.log(someProp);
  }

  useEffect(() => {
    doSomething();
  }, []); // 🔴 This is not safe (it calls `doSomething` which uses `someProp`)
}
```

It’s difficult to remember which props or state are used by functions outside of the effect. This is why **usually you’ll want to declare functions needed by an effect inside of it.** Then it’s easy to see what values from the component scope that effect depends on:

```JS
function Example({ someProp }) {
  useEffect(() => {
    function doSomething() {
      console.log(someProp);
    }

    doSomething();
  }, [someProp]); // ✅ OK (our effect only uses `someProp`)
}
```

If after that we still don’t use any values from the component scope, it’s safe to specify `[]`:

```JS
useEffect(() => {
  function doSomething() {
    console.log('hello');
  }

  doSomething();
}, []); // ✅ OK in this example because we don't use *any* values from component scope
```

> :memo: **Note:** _Every value referenced inside the effect function should also appear in the dependencies array._

#### <g>More examples</g>

It is **only** safe to omit a function from the dependency list if nothing in it (or the functions called by it) references props, state, or values derived from them. This example has a bug:

```JS
function ProductPage({ productId }) {
  const [product, setProduct] = useState(null);

  async function fetchProduct() {
    const response = await fetch('http://myapi/product/' + productId); // Uses productId prop
    const json = await response.json();
    setProduct(json);
  }

  useEffect(() => {
    fetchProduct();
  }, []); // 🔴 Invalid because `fetchProduct` uses `productId`
  // ...
}
```

**The recommended fix is to move that function inside of your effect.** That makes it easy to see which props or state your effect uses, and to ensure they’re all declared:

```JS
function ProductPage({ productId }) {
  const [product, setProduct] = useState(null);

  useEffect(() => {
    // By moving this function inside the effect, we can clearly see the values it uses.
    async function fetchProduct() {
      const response = await fetch('http://myapi/product/' + productId);
      const json = await response.json();
      setProduct(json);
    }

    fetchProduct();
  }, [productId]); // ✅ Valid because our effect only uses productId
  // ...
}
```

## <r>useReducer hook</r>

[Dmitri Pavlutin useReducer blog](https://dmitripavlutin.com/react-usereducer/)

`useReducer` is usually preferable to `useState` when you have complex state logic that involves multiple sub-values or when the next state depends on the previous one.

The `useReducer(reducer, initialState)` hook accept 2 arguments: the _reducer function_ and the _initial state_. The hook then returns an array of 2 items: the _current state_ and the _dispatch function_.

```JS
import { useReducer } from 'react';
function MyComponent() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const action = {
    type: 'ActionType'
  };
  return (
    <button onClick={() => dispatch(action)}>
      Click me
    </button>
  );
}
```

### <o>Initial state</o>

> :memo: **Note:** _The initial state is the value the state is initialized with._

For example, in the case of a counter state, the initial value could be:

```JS
// initial state
const initialState = {
  counter: 0
};
```

### <o>Action object</o>

> :memo: **Note:** _An action object is an object that describes how to update the state._

Typically, the action object would have a property type — a string describing what kind of state update the reducer must do.

For example, an action object to increase the counter can look as follows:

```JS
const action = {
  type: 'increase'
};
```

If the action object must carry some useful information (aka payload) to be used by the reducer, then you can add additional properties to the action object.

For example, here's an action object to add a new user to an array of users state:

```JS
const action = {
  type: 'add',
  user: {
    name: 'John Smith',
    email: 'jsmith@mail.com'
  }
};
```

`user` is a property that holds the information about the user to add.

### <o>Dispatch function</o>

> :memo: **Note:** _The dispatch is a special function that dispatches an action object._

The dispatch function is created for your by the `useReducer()` hook:

```JS
const [state, dispatch] = useReducer(reducer, initialState);
```

Whenever you want to update the state (usually from an event handler or after completing a fetch request), you simply call the dispatch function with the appropriate action object: `dispatch(actionObject)`.

### <o>Reducer function</o>

> :memo: **Note:** _The reducer is a pure function that accepts 2 parameters: the current state and an action object. Depending on the action object, the reducer function must update the state in an immutable manner, and return the new state._

The following reducer function supports the increase and decrease of a counter state:

```JS
function reducer(state, action) {
  let newState;
  switch (action.type) {
    case 'increase':
      newState = { counter: state.counter + 1 };
      break;
    case 'descrease':
      newState = { counter: state.counter - 1 };
      break;
    default:
      throw new Error();
  }
  return newState;
}
```

The reducer above doesn't modify directly the current state in the state variable, but rather creates a new state object stored in newState, then returns it.

React checks the difference between the new and the current state to determine whether the state has been updated, so do not mutate the current state directly.

### <o>Wiring everything</o>

Wiring all these terms together, here's how the state update using a reducer works.

![useReducerDiagram](/assets/useReducerDiagram.svg)

1. As a result of an event handler or after completing a fetch request, you call the dispatch function with the action object.
2. Then React redirects the action object and the current state value to the reducer function.
3. The reducer function uses the action object and performs a state update, returning the new state.
4. React then checks whether the new state differs from the previous one. If the state has been updated, React re-renders the component and `useReducer()` returns the new state value: `[newState, ...] = useReducer(...)`.

```JS
import { useReducer } from "react";

const initialState = {
  counter: 0
};

function reducer(state, action) {
  let newState;
  switch (action.type) {
    case "increment":
      newState = { counter: state.counter + 1 };
      break;
    case "decrement":
      newState = { counter: state.counter - 1 };
      break;
    default:
      throw new Error();
  }
  return newState;
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  console.log(state);
  return (
    <>
      Count: {state.counter}
      <button onClick={() => dispatch({ type: "decrement" })}>-</button>
      <button onClick={() => dispatch({ type: "increment" })}>+</button>
    </>
  );
}
```
