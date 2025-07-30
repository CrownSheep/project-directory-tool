#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import inquirer from 'inquirer';
import {fileURLToPath} from 'url';
import chalk from 'chalk';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const TYPES = [
    { name: chalk.hex("#0F4A86")("C"), value: "C" },
    { name: chalk.hex("#3082FF")("C++"), value: "C++" },
    { name: chalk.hex("#68207B")("C#"), value: "C#" },
    { name: chalk.hex("#5D9AC8")("Godot"), value: "Godot" },
    { name: chalk.hex("#F99A17")("Java"), value: "Java" },
    { name: chalk.hex("#F0DC53")("JavaScript"), value: "JavaScript" },
    { name: chalk.hex("#8357FF")("Kotlin"), value: "Kotlin" },
    { name: chalk.hex("#52A434")("Mods"), value: "Mods" },
    { name: chalk.hex("#777BB3")("PHP"), value: "PHP" },
    { name: chalk.yellow("Pyt") + chalk.blue("hon"), value: "Python" },
    { name: chalk.hex("#D34516")("Rust"), value: "Rust" },
    { name: chalk.red("Rob") + chalk.white("ot") + chalk.blue("ics"), value: "Robotics" },
    { name: chalk.black("Unity"), value: "Unity" },
];

async function main() {
    const { targetPath } = await inquirer.prompt({
        type: 'input',
        name: 'targetPath',
        message: 'Enter the path where you want to create the Projects directory:',
        default: process.cwd()
    });

    const projectsPath = path.join(targetPath, 'Projects');

    if (!fs.existsSync(projectsPath)) {
        fs.mkdirSync(projectsPath);
        console.log(`✅ Created Projects directory at: ${projectsPath}`);
    } else {
        console.log(`⚠️ Projects directory already exists at: ${projectsPath}`);
    }

    const { selectedProjectTypes } = await inquirer.prompt({
        type: 'checkbox',
        name: 'selectedProjectTypes',
        message: 'Select project types:',
        choices: TYPES
    });

    for (const lang of selectedProjectTypes) {
        const dir = path.join(projectsPath, lang);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
            console.log(`📁  Created: ${dir}`);
        } else {
            console.log(`🔸  Already exists: ${dir}`);
        }
    }
}

main();
