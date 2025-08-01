#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import inquirer from 'inquirer';
import arg from 'arg';
import {fileURLToPath} from 'url';
import chalk from 'chalk';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function isWhitespace(str) {
    return !str || /^\s*$/.test(str);
}

const jsonTypes = JSON.parse(fs.readFileSync(path.join(__dirname, 'project_types.json'), 'utf-8'));

const TYPES = Object.entries(jsonTypes).map(([key, value]) => {
    const name = value.name;
    const description = value.description;
    const color = value.color;

    let coloredName = "";

    if (Array.isArray(color)) {
        for (const [hex, start, end] of color) {
            coloredName += chalk.hex(hex)(name.slice(start, end + 1));
        }
    } else {
        coloredName = chalk.hex(color)(name);
    }

    return {
        name: `${coloredName}${!isWhitespace(description) ? "\n" + chalk.gray(description) : ""}`,
        short: coloredName,
        value: name,
    };
});

async function promptProjectsPath(message) {
    const { projectsPath } = await inquirer.prompt({
        type: 'input',
        name: 'projectsPath',
        message,
        default: process.cwd(),
    }, {});

    return projectsPath;
}

async function createFolders(basePath, selectedTypes) {
    const created = [];
    const alreadyExists = [];

    for (const lang of selectedTypes) {
        const dir = path.join(basePath, lang);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
            created.push(lang);
        } else {
            alreadyExists.push(lang);
        }
    }

    return { created, alreadyExists };
}

async function deleteFolders(basePath, selectedTypes) {
    const deleted = [];
    const alreadyDeleted = [];

    for (const lang of selectedTypes) {
        const dir = path.join(basePath, lang);
        if (fs.existsSync(dir)) {
            fs.rmSync(dir, { recursive: true, force: true });
            deleted.push(lang);
        } else {
            alreadyDeleted.push(lang);
        }
    }

    return { deleted, alreadyDeleted };
}

async function createArgs() {
    return arg({
        '--create': Boolean,
        '--remove': Boolean,
        '-c': "--create",
        '-r': "--remove",
    });
}

async function main() {
    try {
        const args = await createArgs();

        if (args['--create']) {
            const targetPath = await promptProjectsPath(`Enter the path where your ${chalk.bgGray("Projects")} directory is:`);

            const projectsPath = path.join(targetPath, 'Projects');
            if (!fs.existsSync(projectsPath)) {
                fs.mkdirSync(projectsPath);
                console.log(`${chalk.greenBright(`+ Created ${chalk.bold("Projects")} directory at:`)} ${chalk.underline(`${chalk.white(targetPath + "\\")}${chalk.whiteBright('Projects')}`)}`);
            } else {
                console.log(`${chalk.yellowBright("* Projects directory already exists at:")} ${chalk.underline(projectsPath)}`);
            }

            const { selectedProjectTypesToCreate } = await inquirer.prompt({
                type: 'checkbox',
                name: 'selectedProjectTypesToCreate',
                message: 'Select project types:',
                choices: TYPES,
                validate: answer => (answer.length < 1 ? chalk.redBright("You must choose at least one project type.") : true),
            }, {});

            console.log(`in ${chalk.whiteBright(targetPath + "\\")}${chalk.bgGray('Projects')}`);

            const { created, alreadyExists } = await createFolders(projectsPath, selectedProjectTypesToCreate);

            if (created.length > 0) console.log(`${chalk.greenBright("+ Created:")} ${created.join(', ')}`);
            if (alreadyExists.length > 0) console.log(`${chalk.yellowBright("* Already exists:")} ${alreadyExists.join(', ')}`);

        } else if (args['--remove']) {
            const targetPath = await promptProjectsPath(`Enter the path where your ${chalk.bgGray("Projects")} directory is:`);

            const { deleteProjectsDirectory } = await inquirer.prompt({
                type: 'confirm',
                name: 'deleteProjectsDirectory',
                message: `Delete the entire ${chalk.bgGray("Projects")} directory?`,
                default: false,
            });

            const projectsPath = path.join(targetPath, 'Projects');

            if (deleteProjectsDirectory) {
                if (fs.existsSync(projectsPath)) {
                    fs.rmSync(projectsPath, { recursive: true, force: true });
                    console.log(chalk.redBright(`- Deleted entire ${chalk.bold("Projects")} directory at: ${chalk.underline(`${chalk.white(targetPath + "\\")}${chalk.whiteBright('Projects')}`)}`));
                } else {
                    console.log(chalk.yellowBright(`* Projects directory does not exist at ${projectsPath}`));
                }
            } else {
                const { selectedProjectTypesToDelete } = await inquirer.prompt({
                    type: 'checkbox',
                    name: 'selectedProjectTypesToDelete',
                    message: 'Select project types to delete:',
                    choices: TYPES,
                    validate: answers => (answers.length < 1 ? chalk.redBright("You must choose at least one project type.") : true),
                }, {});

                console.log(`in ${chalk.whiteBright(targetPath + "\\")}${chalk.bgGray('Projects')}`);

                const { deleted, alreadyDeleted } = await deleteFolders(projectsPath, selectedProjectTypesToDelete);

                if (deleted.length > 0) console.log(`${chalk.redBright("- Deleted:")} ${deleted.join(', ')}`);
                if (alreadyDeleted.length > 0) console.log(`${chalk.yellowBright("* Already deleted:")} ${alreadyDeleted.join(', ')}`);
            }
        } else {
            usage();
        }
    } catch (e) {
        console.log(chalk.yellowBright(`Error: ${e.message}`));
        usage();
    }
}

function usage() {
    console.log(`${chalk.whiteBright('projects-directory [CMD]')}
  ${chalk.greenBright(`--create ${chalk.gray("or")} -c`)}\tCreates the projects directory and project type folders
  ${chalk.greenBright(`--remove ${chalk.gray("or")} -r`)}\tRemoves the projects directory or selected project type folders`);
}

main();
