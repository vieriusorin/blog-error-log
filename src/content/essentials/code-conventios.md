---
title: "Code conventions"
description: "Javascript enables multi var statements anywhere and can lead to errors"
category: "frontend"
tags: ["code-style"]
complexity: "simple"
pubDate: "2024-01-01"
author:
  name: "John Doe"
---

## Definition

It's important to establish from beginning some code conventions so others they will make the code more consistent, predictable and much easier to understand.

To force other to have same format we should enforce them by using libraries for linting the code. EsLint, Biome.js or Pretties can do this for us. It will force linting, prettier the code or formatter.

## Summary

- use a linter to enforce code styling
- a README.md to explain how to be used those tools
- we can automatize this on pre-commit hooks (husky + lint-staged) or editor plugins
