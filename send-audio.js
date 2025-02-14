const fetch = require("node-fetch");
const fs = require("fs");
const config = require("./config.js");

async function sendAudioMessage() {
  try {
    // Read the audio file and convert it to base64
    const audioBuffer = fs.readFileSync("./files/file_example_MP3_1MG.mp3");
    const base64Audio = `data:audio/mp3;base64,${audioBuffer.toString(
      "base64"
    )}`;

    const response = await fetch(`${config.apiUrl}/messages/audio`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${config.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        to: config.phoneNumber + "@s.whatsapp.net",
        media: base64Audio,
        filename: "sample-audio.mp3", // Specify filename for the recipient
        // Note: WhatsApp audio messages don't support captions, but we can set other properties
        voice: false, // Set to true if this is a voice message, false for music/regular audio
        seconds: 30, // Duration of the audio in seconds (optional)
      }),
    });

    const data = await response.json();
    console.log("Response:", data);

    if (data.error) {
      console.error("Error details:", data.error);
    } else {
      console.log("Audio sent successfully!");
      console.log(
        "Note: Audio messages appear differently in WhatsApp compared to other media types."
      );
    }
  } catch (error) {
    console.error("Error sending audio:", error);
    if (error.code === "ENOENT") {
      console.error(
        "Audio file not found. Please make sure the file exists in the 'files' directory."
      );
    } else {
      // Log the full error for debugging
      console.error("Full error:", error);
    }
  }
}

// Execute the test
sendAudioMessage();
