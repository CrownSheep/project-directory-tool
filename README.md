# 🗂️ Projects Directory CLI Tool

A simple interactive CLI tool to create and manage a `Projects` directory for all of your project-type-specific folders.

---

## ✨ Features

- 📁 Create a `Projects` directory in a specified location
- 📦 Select which project types to create subdirectories for
- ❌ Remove specific project folders or the entire `Projects` directory
- 🎨 Custom folder types and colors via `project_types.json`

---

## 📚 Included Project Types (Custom Configuration)

The CLI tool comes preloaded with a set of project types defined in `project_types.json`. These represent **my own personal development setup**, including languages, tools, and environments I frequently use.

Each project type can include:
- A display **name**
- An optional **description**
- An optional **color** (either a single hex code or multiple colored segments)

You can freely modify, remove, or add your own project types manually by editing the `project_types.json` file — and in the future, the tool will make this even easier with the abillity to add new project types directly in the CLI.

### 🗂️ Current Built-in Project Types

| Folder Key   | Name       | Description                                                      |                                                                                                                                    Color                                                                                                                                   |
|--------------|------------|------------------------------------------------------------------|:--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------:|
| `c`          | C          | C language projects                                              |                                                                                          ![#0F4A86](https://img.shields.io/badge/-0F4A86.svg?style=flat-square&labelColor=0F4A86)                                                                                          |
| `c++`        | C++        | C++ language projects                                            |                                                                                          ![#3082FF](https://img.shields.io/badge/-3082FF.svg?style=flat-square&labelColor=3082FF)                                                                                          |
| `c#`         | C#         | C# / .NET development                                            |                                                                                          ![#68207B](https://img.shields.io/badge/-68207B.svg?style=flat-square&labelColor=68207B)                                                                                          |
| `godot`      | Godot      | Game development using Godot engine                              |                                                                                          ![#5D9AC8](https://img.shields.io/badge/-5D9AC8.svg?style=flat-square&labelColor=5D9AC8)                                                                                          |
| `java`       | Java       | Java development                                                 |                                                                                          ![#C88101](https://img.shields.io/badge/-C88101.svg?style=flat-square&labelColor=C88101)                                                                                          |
| `javascript` | JavaScript | JavaScript/Web projects                                          |                                                                                          ![#F0DC53](https://img.shields.io/badge/-F0DC53.svg?style=flat-square&labelColor=F0DC53)                                                                                          |
| `kotlin`     | Kotlin     | Kotlin language development                                      |                                                                                          ![#8357FF](https://img.shields.io/badge/-8357FF.svg?style=flat-square&labelColor=8357FF)                                                                                          |
| `mods`       | Mods       | Game modding |                                                                                          ![#52A434](https://img.shields.io/badge/-52A434.svg?style=flat-square&labelColor=52A434)                                                                                          |
| `python`     | Python     | Python scripts and projects                                      |                                              ![#336C99](https://img.shields.io/badge/-336C99.svg?style=flat-square&labelColor=336C99) ![#FECD3B](https://img.shields.io/badge/-FECD3B.svg?style=flat-square&labelColor=FECD3B)                                             |
| `rust`       | Rust       | Rust development                                                 |                                                                                          ![#D34516](https://img.shields.io/badge/-D34516.svg?style=flat-square&labelColor=D34516)                                                                                          |
| `robotics`   | Robotics   | Robotics work (e.g. FTC, FRC)                                    | ![#EE161E](https://img.shields.io/badge/-EE161E.svg?style=flat-square&labelColor=EE161E) ![#FFFFFF](https://img.shields.io/badge/-FFFFFF.svg?style=flat-square&labelColor=FFFFFF) ![#0166B4](https://img.shields.io/badge/-0166B4.svg?style=flat-square&labelColor=0166B4) |
| `unity`      | Unity      | Unity game engine projects                                       |                                                                                          ![#808080](https://img.shields.io/badge/-808080.svg?style=flat-square&labelColor=808080)                                                                                          |

> 🎨 Color formatting is used in the CLI interface with `chalk`, and some types (like Python or Robotics) use **multi-colored segments**.

---

### 🧩 Customizing Your Project Types (Planned)

In the future, this tool will support:

- ✅ Easy creation/editing of project types from the CLI  
- 🧠 Configuration of presets or setups (bundle multiple project types together)
- 🗂️ Folder templates (e.g. with a `.gitignore`, `README.md`, `LICENSE` etc.)

For now, you can customize by editing `project_types.json` directly. Here’s an example:

```json
"lua": {
  "name": "Lua",
  "color": "#130A84"
}
```
---

## 🚀 Installation
Download the `projects-directory-tool.exe` from the releases tab and make sure to download the `project_types.json` as well, make sure to put it in the same directory as the exe.
&nbsp;
### 🔨 Manual Building
```bash
git clone https://github.com/CrownSheep/projects-directory-tool.git
cd projects-directory-tool
npm install
npm link
```
---

## 🕹️ Usage

After either downloading the exe or manually building the tool, you can run it from the terminal:

### ✅ Create a `Projects` directory and select project types

```bash
projects-directory --create
```
#### or using the short flag:
```bash
projects-directory -c
```
&nbsp;
### ❌ Remove folders from the `Projects` directory
```bash
projects-directory --remove
```
#### or using the short flag:
```bash
projects-directory -r
```
