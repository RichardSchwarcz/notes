// Code by https://www.youtube.com/watch?v=NiLUGy1Mh4U

const people = [
  { id: "1", name: "Leigh", age: 35 },
  { id: "2", name: "Jenny", age: 30 },
  { id: "3", name: "Heather", age: 28 },
];

let result;

// count
result = people.reduce((acc, person) => acc + 1, 0);
// result = 3
//--------------------

// sum ages
result = people.reduce((acc, person) => acc + person.age, 0);
// result = 93
//--------------------

// array of names (map)
result = people.reduce((acc, person) => [...acc, person.name], []);
// result = ['Leigh', 'Jenny, 'Heather']
//--------------------

// convert to id => person lookup (dict)
result = people.reduce((acc, person) => {
  return { ...acc, [person.id]: person };
}, {});
// result = {
//     '1': { id: "1", name: "Leigh", age: 35 },
//     '2': { id: "2", name: "Jenny", age: 30 },
//     '3': { id: "3", name: "Heather", age: 28 },
// }
//--------------------

// max age
result = people.reduce((acc, person) => {
  if (acc === null || person.age > acc) return person.age;
  return acc;
}, null);
// result = 35
//--------------------

// min age
result = people.reduce((acc, person) => {
  if (acc === null || person.age < acc) return person.age;
  return acc;
}, null);
// result = 28
//--------------------

// find by name
result = people.reduce((acc, person) => {
  if (acc !== null) return acc;
  if (person.name === "Leigh") return person;
  return null;
}, null);
// result =   { id: "1", name: "Leigh", age: 35 }
//--------------------

// all over 18
result = people.reduce((acc, person) => {
  if (!acc) return false;
  return person.age > 18;
}, true);
// result = true
//--------------------

// any over 18
result = people.reduce((acc, person) => {
  if (acc) return true;
  return person.age > 18;
}, false);
// result = true
//--------------------

// count occurrences
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
//--------------------

// flatten
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
//--------------------

// create reduce ourselves
function reduce(array, callback, initial) {
  let acc = initial;
  for (let i = 0; i < array.length; i++) {
    acc = callback(acc, array[i], i);
  }
  return acc;
}

result = reduce([1, 2, 3], (acc, num) => acc + num, 0);
// result = 6
//--------------------

// reduce with early abort
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
