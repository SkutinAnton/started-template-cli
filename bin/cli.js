#!/usr/bin/env node

const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');
const inquirer = require('inquirer');

const { Command } = require('commander');

const program = new Command();

program
  .name('started-template-cli')
  .action(async () => {
    console.log(chalk.magenta.bold('Инициализация нового проекта'));

    const questions = [
      {
        type: 'list',
        name: 'mode',
        message: 'Выберите режим:',
        choices: ['export (SPA)', 'standalone (SSR)'],
      },
    ];

    const { mode } = await inquirer.prompt(questions);
    const template = mode.split(" ")[0];
    const source = path.join(__dirname, `../templates/${template}`);
    const target = '.';

    fs.copySync(source, target);
    console.log(chalk.green.bold('Создание проекта завершено'));
  });

program.parse(process.argv);