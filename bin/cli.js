#!/usr/bin/env node

const fs = require("fs-extra");
const path = require("path");
const chalk = require("chalk");
const inquirer = require("inquirer");
const { Command } = require("commander");

const program = new Command();

const targetDir = ".";
const questions = [
  {
    type: "list",
    name: "mode",
    message: "Выберите режим:",
    choices: ["export (SPA)", "standalone (SSR)"],
  },
];

const deleteAllFiles = async () => {
  try {
    const files = await fs.readdir(targetDir);

    if (files.length) {
      files.forEach((item) => {
        const itemPath = path.join(targetDir, item);

        if (fs.statSync(itemPath).isDirectory()) {
          fs.rmSync(itemPath, { recursive: true });
        } else {
          fs.unlinkSync(itemPath);
        }
      });
    }
  } catch (err) {
    console.log(chalk.red.bold(`Ошибка при удалении файлов: ${err}`));
    process.exit(1);
  }
};

const createTemplate = async () => {
  console.log(chalk.blue.bold("Инициализация нового проекта"));

  const { mode } = await inquirer.prompt(questions);
  const templateName = mode.split(" ")[0];
  const templateDir = path.join(__dirname, `../templates/${templateName}`);

  await deleteAllFiles();

  fs.copySync(templateDir, targetDir);
  console.log(chalk.green.bold("Создание проекта завершено"));
};

program.name("started-template-cli").action(createTemplate);

program.parse(process.argv);
