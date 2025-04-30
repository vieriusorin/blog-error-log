---
title: "Single Responsibility Principle"
summary: "Design components and modules to have just one reason to change"
category: "architecture"
tags: ["SOLID", "design principles", "maintainability", "refactoring"]
complexity: "medium"
impact: "high"
createdDate: "2024-02-15"
contributors: [
  { name: "Jane Smith", github: "janesmith" }
]
references: [
  { title: "Clean Code", type: "book" },
  { title: "SOLID Principles in JavaScript", url: "https://medium.com/better-programming/solid-principles-in-javascript-1c6f370d948a", type: "article" }
]
applicableTo: ["javascript", "typescript", "react", "any"]
keywords: ["SRP", "responsibility", "cohesion", "separation of concerns"]
relatedEssentials: ["separation-of-concerns", "interface-segregation-principle"]
---

# Single Responsibility Principle

## Definition

> A class or module should have one, and only one, reason to change.

The Single Responsibility Principle (SRP) is the first principle in the SOLID design principles. It states that a module, class, or function should be responsible for a single part of the functionality and should have only one reason to change.

## Why It Matters

- **Maintainability**: Code that does one thing well is easier to understand and modify
- **Testability**: Focused modules are easier to test in isolation
- **Reusability**: Single-responsibility components are more likely to be reusable
- **Reduced Side Effects**: Changes to one responsibility don't affect other parts of the codebase