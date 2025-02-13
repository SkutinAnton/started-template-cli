#!/usr/bin/env node

console.log("Hello from my CLI tool!");

// Пример обработки аргументов командной строки
const args = process.argv.slice(2);
if (args.length > 0) {
  console.log("Arguments:", args);
} else {
  console.log("No arguments provided.");
}