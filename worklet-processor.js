class MyAudioWorkletProcessor extends AudioWorkletProcessor {
    constructor() {
      super();
    }
  
    process(inputs, outputs, parameters) {
      const output = outputs[0];  // Get the first output channel
  
      for (let channel = 0; channel < output.length; ++channel) {
        const outputChannel = output[channel];
  
        for (let i = 0; i < outputChannel.length; ++i) {
          outputChannel[i] = Math.random() * 2 - 1;  // Generate white noise
        }
      }
      return true;
    }
  }
  
  registerProcessor('my-audioworklet-processor', MyAudioWorkletProcessor);
  