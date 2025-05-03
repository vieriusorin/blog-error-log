---
title: "Hoisting: The problem"
description: "Javascript enables multi var statements anywhere and can lead to errors"
category: "frontend"
tags: ["code-style"]
complexity: "simple"
pubDate: "2024-01-01"
author:
  name: "John Doe"
---

## Definition

Javascript enables you to have multiple statement variables anywhere in the codebase and if they act as variables were declare at the top of function.
This behavior is called "hoisting". This can lead to a lot of problems if we use a variable at the top and after we initialize inside another function.

```Javascript
myName = "global"; // global variable

function getTheName() {
  alert(myName);
  var myName = "Joe";
  alert(myName);
}
```

In the example above, first alert will show "undefined" and the second will be "Joe". It's better to declare variables and the top of the function/statement
all the time to avoid this kind of errors
