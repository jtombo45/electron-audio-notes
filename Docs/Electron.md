# My Electron App

A simple Electron application to get started with desktop app development using JavaScript.

# Prerequisites

Node.js: Ensure Node.js is installed on your machine.

# Getting Started

### 1. Clone the Repository (Optional)

If the project is hosted in a Git repository, clone it with:
In Bash terminal:

```
git clone <repository-url>
cd my-electron-app
```

Alternatively, create a folder manually:
In Bash terminal:

```
mkdir my-electron-app
cd my-electron-app
```

# 2. Initialize the Project

To set up the project, run the following command to generate a package.json file:
In Bash terminal:

```
npm init -y
```

This command creates a default package.json file with basic project metadata.

# 3. Install Electron

Install Electron as a development dependency:
In Bash terminal:

```
npm install electron --save-dev
```

This will add Electron to your node_modules folder and list it in your package.json under devDependencies.

# 4. Create the Entry Point

Create a file named main.js in your project directory. This file will serve as the entry point for your Electron app. Add the following code:

```javascript
const { app, BrowserWindow } = require("electron");

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  win.loadURL("https://www.electronjs.org"); // Or use win.loadFile('index.html')
}

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
```

This code initializes the Electron app, creates a browser window, and loads a website or local HTML file.

# 5. Create an HTML File (Optional)

If you prefer to load a local HTML file instead of a URL, create a file named index.html in your project folder:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>My Electron App</title>
  </head>
  <body>
    <h1>Hello from Electron!</h1>
  </body>
</html>
```

Update main.js to load the local file:

```javascript
Copy code
win.loadFile('index.html');
```

# 6. Update package.json Scripts

Modify the package.json file to include a start script:

```json
Copy code
"scripts": {
  "start": "electron ."
}
```

This script tells Node.js to run Electron and use the current directory (.) as the app’s root.

# 7. Run the Electron App

To start the application, use:

In Bash terminal:

```
npm start
```

This command will launch the Electron window with either your HTML content or the specified URL.

# 8. Package the App for Distribution (Optional)

To package your app for distribution, use one of these tools:

### Electron Forge:

In Bash terminal:

```
npx create-electron-app my-app --template=forge
```

### Electron Builder:

```
npm install electron-builder --save-dev
```

Configure the build section in your package.json for Electron Builder.

# Folder Structure:

```
my-electron-app/
│
├── main.js          # Entry point for the Electron app
├── index.html       # Optional HTML file to render in the window
├── package.json     # Project metadata and dependencies
└── node_modules/    # Installed dependencies

```
