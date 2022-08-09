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
