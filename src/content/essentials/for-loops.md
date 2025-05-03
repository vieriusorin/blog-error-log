---
title: "For loops"
description: "Let's talk about performance"
category: "frontend"
tags: ["code-style"]
complexity: "simple"
pubDate: "2024-01-01"
author:
  name: "John Doe"
---

```javascript
for (var i = 0; i < myArray.length; i++) {
	// do something
}
```

If we are looping some DOM collections we can have an performance issues because we are querying the DOM and these kind of operations are expensive.

To improve the performance of the loop we need to cache the length of the items.

```javascript
for (var i = 0, max = myArray.length; i < max i++ ) {
  // do something
}
```

This way you will retrieve the length of the array once and used it during the whole loop.
