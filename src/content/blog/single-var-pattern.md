---
title: "Single Var Pattern"
description: "A pattern for creating a single variable to store multiple values in JavaScript"
pubDate: "2024-01-01"
author:
  name: "John Doe"
tags: ["javascript", "patterns", "best-practices"]
category: "frontend"
difficulty: "beginner"
contentType: "tutorial"
featured: true
minutesToRead: 5
---

## Introduction

The Single Var Pattern is a JavaScript coding convention where multiple variables are declared using a single `var`, `let`, or `const` statement, with each variable declaration separated by commas. This pattern promotes cleaner code organization and helps prevent hoisting-related bugs.

```javascript
const 
  firstName = "John",
  lastName = "Doe",
  age = 30
```
<div style="margin-top: 20px;"></div>

## When to use

This pattern is useful when we want to declare multiple variables in a single line.

