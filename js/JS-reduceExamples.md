<style>
r { color: #f54842 }    /*h2*/
o { color: Orange }     /*h3*/
g { color: Green }      /*h4*/
my { background: #ffdc6e4d }
</style>

# Reduce Examples

_Code provided by:_

> Leigh Halliday
> https://www.youtube.com/watch?v=NiLUGy1Mh4U

## <r>Recreate reduce using for loop</r>

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

## <r>Initial Data</r>

```JS
const people = [
  { id: "1", name: "Leigh", age: 35 },
  { id: "2", name: "Jenny", age: 30 },
  { id: "3", name: "Heather", age: 28 },
];
```

### <o>Count items in array</o>

```JS
const result = people.reduce((acc, person) => acc + 1, 0);
// result = 3
```

### <o>Sum ages</o>

```JS
const result = people.reduce((acc, person) => acc + person.age, 0);
// result = 93
```

### <o>Array of names `.map` method using `reduce` function</o>

```JS
const result = people.reduce((acc, person) => [...acc, person.name], []);
// result = ['Leigh', 'Jenny, 'Heather']
```

### <o>Object of objects - Dictionary</o>

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

### <o>Find max age</o>

```JS
const result = people.reduce((acc, person) => {
  if (acc === null || person.age > acc) return person.age;
  return acc;
}, null);
// result = 35
```

### <o>Find min age</o>

```JS
const result = people.reduce((acc, person) => {
  if (acc === null || person.age < acc) return person.age;
  return acc;
}, null);
// result = 28
```

### <o>Find by name</o>

```JS
const result = people.reduce((acc, person) => {
  if (acc !== null) return acc;
  if (person.name === "Leigh") return person;
  return null;
}, null);
// result =   { id: "1", name: "Leigh", age: 35 }
```

### <o>Find out if every person is older than 18</o>

```JS
const result = people.reduce((acc, person) => {
  if (!acc) return false;
  return person.age > 18;
}, true);
// result = true
```

### <o>Find out if any person is older than 18</o>

```JS
result = people.reduce((acc, person) => {
  if (acc) return true;
  return person.age > 18;
}, false);
// result = true
```

### <o>Count occurrences</o>

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

### <o>Flatten array</o>

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

### <o>Reduce with early abort</o>

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
