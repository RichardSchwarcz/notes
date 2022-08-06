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

![Closure diagram](/assets/closureDiagram.drawio.svg "closureDiagram")
