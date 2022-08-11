# Reduce Examples

_Code provided by:_

> Leigh Halliday
> https://www.youtube.com/watch?v=NiLUGy1Mh4U

## Recreate reduce using for loop

```JS
function reduce(array, callback, initial) {
  let acc = initial;
  for (let i = 0; i < array.length; i++) {
    acc = callback(acc, array[i], i);
  }
  return acc;
}

result = reduce([1, 2, 3], (acc, num) => acc + num, 0);
// result = 6
```

## Initial Data

```JS
const people = [
  { id: "1", name: "Leigh", age: 35 },
  { id: "2", name: "Jenny", age: 30 },
  { id: "3", name: "Heather", age: 28 },
];
```

### Count items in array

```JS
const result = people.reduce((acc, person) => acc + 1, 0);
// result = 3
```

### Sum ages

```JS
const result = people.reduce((acc, person) => acc + person.age, 0);
// result = 93
```

### Array of names `.map` method using `reduce` function

```JS
const result = people.reduce((acc, person) => [...acc, person.name], []);
// result = ['Leigh', 'Jenny, 'Heather']
```

### Object of objects - Dictionary

```JS
const result = people.reduce((acc, person) => {
  return { ...acc, [person.id]: person };
}, {});
// result = {
//     '1': { id: "1", name: "Leigh", age: 35 },
//     '2': { id: "2", name: "Jenny", age: 30 },
//     '3': { id: "3", name: "Heather", age: 28 },
// }
```

### Find max age

```JS
const result = people.reduce((acc, person) => {
  if (acc === null || person.age > acc) return person.age;
  return acc;
}, null);
// result = 35
```

### Find min age

```JS
const result = people.reduce((acc, person) => {
  if (acc === null || person.age < acc) return person.age;
  return acc;
}, null);
// result = 28
```

### Find by name

```JS
const result = people.reduce((acc, person) => {
  if (acc !== null) return acc;
  if (person.name === "Leigh") return person;
  return null;
}, null);
// result =   { id: "1", name: "Leigh", age: 35 }
```

### Find out if every person is older than 18

```JS
const result = people.reduce((acc, person) => {
  if (!acc) return false;
  return person.age > 18;
}, true);
// result = true
```

### Find out if any person is older than 18

```JS
result = people.reduce((acc, person) => {
  if (acc) return true;
  return person.age > 18;
}, false);
// result = true
```

### Count occurrences

```JS
const orders = [
  { id: "1", status: "pending" },
  { id: "2", status: "pending" },
  { id: "3", status: "cancelled" },
  { id: "4", status: "shipped" },
];

result = orders.reduce((acc, order) => {
  return { ...acc, [order.status]: (acc[order.status] || 0) + 1 };
}, {});
// result = { pending: 2, cancelled: 1, shipped: 1 }
```

### Flatten array

```JS
const folders = [
  "index.js",
  ["flatten.js", "map.js"],
  ["any.js", ["all.js", "count.js"]],
];

function flatten(acc, item) {
  if (Array.isArray(item)) {
    return item.reduce(flatten, acc);
  }
  return [...acc, item];
}

result = folders.reduce(flatten, []);
// result = ["index.js", "flatten.js", "map.js", "any.js", "all.js", "count.js"]
```

### Reduce with early abort

```JS
function reduceAbort(array, callback, initial) {
  let acc = initial;

  try {
    for (let i = 0; i < array.length; i++) {
      acc = callback(acc, array[i], i, array);
    }
  } catch (error) {
    if (Array.isArray(error) && error[0] === "abort") {
      return error[1];
    }
    throw error;
  }

  return acc;
}

person = reduceAbort(
  people,
  (_acc, person) => {
    if (person.name === "Leigh") throw ["abort", person];
    return null;
  },
  null
);
```
