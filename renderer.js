document.addEventListener('DOMContentLoaded', () => {
  const { ipcRenderer } = require('electron');

  const transcriptionElement = document.getElementById('transcription-result');
  const meetingSummaryElement = document.getElementById('meeting-summary');

  document.getElementById('start').addEventListener('click', () => {
    ipcRenderer.send('start-recording');
    console.log('Recording started...');
  });

  document.getElementById('stop').addEventListener('click', () => {
    ipcRenderer.send('stop-recording');
    console.log('Recording stopped.');
  });

  document.getElementById('transcribe').addEventListener('click', async () => {
    try {
      const bucketName = 'audio_output_bucket';
      const filename = 'output.wav';

      const uploadResult = await ipcRenderer.invoke('upload-to-storage', bucketName, filename);
      if (!uploadResult.success) throw new Error(uploadResult.error);

      const gcsUri = `gs://${bucketName}/${filename}`;
      const meetingData = await ipcRenderer.invoke('analyze-meeting', gcsUri);
      if (!meetingData.success) throw new Error(meetingData.error);

      transcriptionElement.textContent = `Transcript: ${meetingData.transcript}`;
      meetingSummaryElement.textContent = `
        Date: ${meetingData.date}
        Summary: ${meetingData.summary}
        Priorities: ${meetingData.priorities}
        Blockers: ${meetingData.blockers}
      `;
    } catch (error) {
      console.error('Error:', error.message);
      transcriptionElement.textContent = `Error: ${error.message}`;
      meetingSummaryElement.textContent = 'Meeting summary unavailable due to an error.';
    }
  });
});
