# Creating a Dependency Tracker Overview

To document and streamline the setup process for your project, here’s a suggested overview of dependencies:

# 1. System Utilities:

- SoX: Audio utility required for recording audio on macOS. Install with:
- bash

```
brew install sox
```

- BlackHole: Virtual audio driver to capture system audio. Link: https://github.com/ExistentialAudio/BlackHole?tab=readme-ov-file

# 2. Node.js Packages:

- mic: Record audio from the microphone.
- bash

```
npm install mic
```

- Google Cloud SDK/Client: For Speech-to-Text or other Google Cloud services. Ensure you set up authentication by downloading the JSON credentials.

# 3. Electron Setup:

- Follow the Electron Debugging Guide for debugging configuration using VSCode. Link: https://github.com/Microsoft/vscode-recipes/tree/master/Electron
- Use this command to launch Electron with remote debugging:
- bash

```
npx electron --remote-debugging-port=9223 .
```

# 4. Authentication Files:

- Place your Google Cloud credentials JSON in an accessible location and set the environment variable:
- bash

```export GOOGLE_APPLICATION_CREDENTIALS="/path/to/credentials.json"

```

# 5. VSCode Configuration:

- Set up the launch.json file for debugging the main and renderer processes in Electron.

This documentation will provide clarity when setting up the program on other systems, ensuring that dependencies and configurations are accounted for across platforms. Let me know if you need help refining this further!
