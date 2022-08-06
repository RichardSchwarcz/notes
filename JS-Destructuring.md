# Destructuring

## Array destructuring examples

In Array we acces values by indexes, therefore positions does matter. Also, we can provide default values using `=`

```JS
function data() {
  return [1, 2, 3, 4, 5, 6];
}

const [
    first = 10,
    second = 20,
    third = 30,
    ...rest
    ] = data();
```

In this case we also provided default values, in case `data()` returns undefined. Also we made `rest` variable to catch rest of the values. `rest` returns an **_array_**, in this case `[4, 5, 6]`.

Let's say we don't care about `second` and we don't wan't to include it in destructuring.

```JS
const [
    first = 10,
    ,
    third = 30,
    ...rest
    ] = data();
```

We would simply leave a `,` in it's position.
In case `data()` would not return an array, we need to provide an empty array using `||`. Otherwise we would get type error, because we attempt to access a position on `null` value.

```JS
function data() {
  return null;
}

const [
    first = 10,
    second = 20,
    third = 30,
    ...rest
    ] = data() || [];

console.log(first) // 10
```

### Nested array destructuring

```JS
function data() {
  return [1, [2, 3], 4, 5, 6];
}

const [
    first = 10,
    [
        second = 20,
        third = 30,
    ] = [], // fallback
    ...rest
    ] = data() || [];
```

Again we are providing an empty array, in case we would get `undefined` instead of `[2,3]`.

### Swapping variables

Without destructuring, swapping variables would look something like this:

```JS
var x = 10;
var y = 20;

{
  let tmp = x;
  x = y;
  y = tmp;
}
```

By using destructuring we can swap variables without using `tmp` variable:

```JS
var x = 10;
var y = 20;

[x, y] = [y, x];
```

# Object destructuring examples

Since in object we access values by keys (properties), positions doesn't matter. What matters are keys (properties). Later we can reasign them as you can see in this example:

```JS
function data() {
  return { a: 1, b: 2, c: 3, d: 4, e: 5 };
}

var {
    a: first = 10,
    b: second = 20,
    c: third = 30,
    ...rest
    } = data() || {};
```

Again we also provided default values, in case `data()` returns undefined. Also we made `rest` variable to catch rest of the values. `rest` returns an **_object_**, in this case `{d: 4, e: 5}`. Same as with arrays, we insured ourselves that we dont get type error in case `data()` doesn't return an object, by using `||` and providing default value in form of empty object.

### Nested object destructuring

```JS
function data() {
  return { a: 1, b: { c: 3, d: 4 }, e: 5 };
}

const {
    a = 10,
    b:
    {
        c = 30,
        d = 40,
    } = {},
    ...rest
  } = data() || {};
```

### Named arguments

Example

```JS
function lookupRecord({
    store = "person-records",
    id = -1
    }) {
  // ...
}

lookupRecord({ id: 42 });
```

Very commonly used in react, where we pass prop object to a children, inside which we destructure this prop object.
Advantage is, that you don't have to remember order of parameters. On the other hand, disadvantage is, that you have to remember names.
