const { app, BrowserWindow, ipcMain } = require('electron');
const { Storage } = require('@google-cloud/storage');
const { SpeechClient } = require('@google-cloud/speech');
const { LanguageServiceClient } = require('@google-cloud/language');
const path = require('path');
const fs = require('fs');
const { exec } = require('child_process');

// Set Google credentials
process.env.GOOGLE_APPLICATION_CREDENTIALS = "/Users/judicaeltombo/Documents/Fullstack Interviews/FigmaToCode/Audio_Notes/App/electron-audio-notes/service-account-file.json";

// Initialize Google Cloud clients
const storage = new Storage();
const speechClient = new SpeechClient();
const languageClient = new LanguageServiceClient();

let mainWindow;
const audioFilePath = path.join(__dirname, 'output.wav');

// Create the Electron window
app.whenReady().then(() => {
  mainWindow = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  mainWindow.loadFile('index.html');
  mainWindow.webContents.openDevTools();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

// IPC handler: Start recording
ipcMain.on('start-recording', () => {
  if (fs.existsSync(audioFilePath)) {
    console.log('Removing existing output.wav...');
    fs.unlinkSync(audioFilePath);
  }

  console.log('Starting recording...');
  const command = `sox -d -c 1 -r 16000 -b 16 ${audioFilePath} trim 0 300`; // Record up to 5 minutes
  exec(command, (error) => {
    if (error) {
      console.error('Error starting recording:', error.message);
    } else {
      console.log('Recording in progress...');
    }
  });
});

// IPC handler: Stop recording
ipcMain.on('stop-recording', () => {
  console.log('Stopping recording...');
  exec('pkill sox', (error) => {
    if (error) {
      console.error('Error stopping recording:', error.message);
    } else if (fs.existsSync(audioFilePath)) {
      console.log(`Audio file saved at ${audioFilePath}`);
    } else {
      console.error('Recording failed. No output file found.');
    }
  });
});

// IPC handler: Upload audio to Google Cloud Storage
ipcMain.handle('upload-to-storage', async (event, bucketName, filename) => {
  try {
    await storage.bucket(bucketName).upload(filename, { destination: filename });
    console.log(`Uploaded ${filename} to ${bucketName}`);
    return { success: true };
  } catch (error) {
    console.error('Upload failed:', error.message);
    return { success: false, error: error.message };
  }
});

// IPC handler: Transcribe and analyze the audio
ipcMain.handle('analyze-meeting', async (event, gcsUri) => {
  try {
    console.log('Transcribing audio...');
    const [operation] = await speechClient.longRunningRecognize({
      audio: { uri: gcsUri },
      config: { encoding: 'LINEAR16', sampleRateHertz: 16000, languageCode: 'en-US' },
    });
    const [response] = await operation.promise();

    const transcript = response.results.map(r => r.alternatives[0].transcript).join('\n');
    console.log('Transcription completed:', transcript);

    console.log('Analyzing transcript...');
    const document = { content: transcript, type: 'PLAIN_TEXT' };
    const [analysis] = await languageClient.analyzeEntities({ document });

    const summary = extractSummary(analysis.entities);
    const priorities = extractPriorities(analysis.entities);
    const blockers = extractBlockers(analysis.entities);
    const currentDate = new Date().toLocaleDateString();

    return {
      success: true,
      transcript,
      date: currentDate,
      summary,
      priorities,
      blockers,
    };
  } catch (error) {
    console.error('Analysis failed:', error.message);
    return { success: false, error: error.message };
  }
});

// Helper functions to extract insights
function extractSummary(entities) {
  return entities.filter(e => e.type === 'EVENT' || e.type === 'WORK_OF_ART')
                 .map(e => e.name).join(', ');
}

function extractPriorities(entities) {
  return entities.filter(e => e.type === 'PERSON' || e.type === 'ORGANIZATION')
                 .map(e => e.name).join(', ');
}

function extractBlockers(entities) {
  return entities.filter(e => e.name.toLowerCase().includes('block') || e.type === 'OTHER')
                 .map(e => e.name).join(', ');
}
