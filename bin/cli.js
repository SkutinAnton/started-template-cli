#!/usr/bin/env node

import fs from 'fs-extra';
import path from 'path';
import chalk from 'chalk';
import { Command } from 'commander';

const program = new Command();

program
  .name('started-template-cli')
  .description('Инициализация шаблона проекта')
  .version('1.0.0');

program
  .command('<mode>')
  .description('Создание проекта...')
  .action((mode) => {
    console.log("mode", mode);
    if (mode && ["standalone", "export"].includes(mode)) {
      const source = path.join(__dirname, `../templates/${mode}`);
      const target = ".";

      console.log("source", source);


      fs.copySync(source, target);
      console.log(chalk.green("Создание проекта завершено"));
    } else {
      console.log(chalk.red("Не выбран режим. Передайте аргумент 'standalone' или 'export'"));
      process.exit(1);
    }
  });

// Парсинг аргументов командной строки
program.parse(process.argv);