# Moodle Learning Analytics

MLA is a modern open source desktop application that analyses Moodle generated logs and provides insightful information.

<p align="center">
  <img src="https://raw.githubusercontent.com/LS-LEDA/MLA/main/public/assets/mla_logo.png" alt="MLA Logo"/>
</p>


## 🌟 User Interface
<p align="center">
  <img src="https://raw.githubusercontent.com/LS-LEDA/MLA/main/resources/demo/demo_dashboard.png" alt="Dashboard Demo"/>
  <img src="https://raw.githubusercontent.com/LS-LEDA/MLA/main/resources/demo/demo_summary_card.png" alt="Summary Card Demo"/>
</p>

Visit [MLA website](https://ls-leda.github.io/Moodle-Learning-Analytics/) to learn more.

## ⚙ Installation

MLA can be downloaded from [MLA website](https://ls-leda.github.io/Moodle-Learning-Analytics/). Or, from [GitHub](https://github.com/LS-LEDA/MLA/releases/latest) latest release page.

### Windows
Download the latest [MLA installer](https://github.com/LS-LEDA/MLA/releases/latest). `MLA Setup.exe` will install the corresponding version for your device's architecture.
You can also download `MLA-windows.zip` from the [releases page](https://github.com/LS-LEDA/MLA/releases/latest).

There is a [portable](https://github.com/LS-LEDA/MLA/releases/latest) version to run it on the go, no installation is required.

### macOS
Download the latest [MLA](https://github.com/LS-LEDA/MLA/releases/latest) release.
`MLA.dmg` will install the corresponding version for your device, or use it as a portable app.

### Linux
MLA is only available for 64-bit Linux systems.

Built packages `.deb`, `.pacman`, `.freebsd`, `.rpm`, `.snap`, `.AppImage`

Download the latest [MLA](https://github.com/LS-LEDA/MLA/releases/latest) release.


# 👩‍💻 Developers

## Prerequisites

- [Git](https://git-scm.com/)
- [NodeJS](https://nodejs.org/)
- [NPM](https://www.npmjs.com/)

## Getting started

See [🧰 running](https://github.com/LS-LEDA/MLA#running) for notes on how to run the project.

See [🏗️ building](https://github.com/LS-LEDA/MLA#Building) for notes on how to compile the project and make a distributable version.

## 🧰 Running
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

```
// Clone git repository
git clone https://github.com/LS-LEDA/MLA.git

// Installing project dependencies
npm install

//Electron application 
npm run electron:serve

// Runs a nodeJS web server at default port 8080 
npm run serve
```

## 🏗️ Building
The following commands will build MLA for different target systems. Make sure to delete **--publish=onTagOrDraft** flag first, from the script in **package.json**.

```
// Clone git repository
git clone https://github.com/LS-LEDA/MLA.git

// Installing project dependencies
npm install
```

Finally, run one of the following commands for your target Operating System.

### Windows
`npm run build-win`

### macOS
`npm run build-mac`

### Linux
`npm run build-linux`


## 📜 License
Licensed under the [GPL](https://github.com/LS-LEDA/MLA/blob/main/LICENSE) license.
