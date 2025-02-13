#!/usr/bin/env node

const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');
const inquirer = require('inquirer');

const { Command } = require('commander');

const program = new Command();

// program
//   .name('started-template-cli')
//   .description('Инициализация шаблона проекта')
//   .version('1.0.0');

program
  .name('started-template-cli')
  .description('Создание проекта...')
  .action(async () => {
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

    console.log('mode', mode);
    console.log('template', template);
    const source = path.join(__dirname, `../templates/${template}`);
    const target = '.';

    console.log('source', source);

    fs.copySync(source, target);
    console.log(chalk.green('Создание проекта завершено'));
  });

program.parse(process.argv);