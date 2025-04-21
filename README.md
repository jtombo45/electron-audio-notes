# Running the Audio Notes App Locally

**Audio Notes** is an Electron desktop app I built as a proof of concept to solve a friction point in my work life: too many meetings across different topics, with no easy way to summarize or keep track of them. I wanted a tool that could turn audio from meetings into clean, AI-generated meeting minutes — while keeping everything local and private, similar to how Obsidian works. Feel free to reach out if you want to collaborate and add additional features. 

The app uses:

- **Google Speech-to-Text API** (for transcribing audio)  
- **BlackHole** (to route system audio)  
- **Vertex AI (PaLM 2 / Bard)** (to generate structured notes)  
- **Electron** (for the desktop interface)

## To Run Locally

1. Clone the repo and install dependencies with `npm install`.
2. Check the `/Doc` folder for setup steps (API keys, config files, etc.).
3. Install **BlackHole** for local audio capture.
4. Make sure you have access to **Google Speech-to-Text API** and **Vertex AI**.
5. Run the app using `npm start` or `npm run dev`.
