const fetch = require("node-fetch");
const fs = require("fs");
const config = require("./config.js");

async function sendVideoMessage() {
  try {
    // Read the video file and convert it to base64
    const videoBuffer = fs.readFileSync(
      "./files/file_example_MP4_480_1_5MG.mp4"
    );
    const base64Video = `data:video/mp4;base64,${videoBuffer.toString(
      "base64"
    )}`;

    const response = await fetch(`${config.apiUrl}/messages/video`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${config.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        to: config.phoneNumber + "@s.whatsapp.net",
        caption:
          "*Sample Video Message* 🎥\n\nThis is a test video sent via the WhatsApp Bot.\n\n_Sent at: " +
          new Date().toLocaleString() +
          "_",
        media: base64Video,
        filename: "sample-video.mp4", // Specify filename for the recipient
      }),
    });

    const data = await response.json();
    console.log("Response:", data);

    if (data.error) {
      console.error("Error details:", data.error);
    } else {
      console.log("Video sent successfully!");
    }
  } catch (error) {
    console.error("Error sending video:", error);
    if (error.code === "ENOENT") {
      console.error(
        "Video file not found. Please make sure the file exists in the 'files' directory."
      );
    } else {
      // Log the full error for debugging
      console.error("Full error:", error);
    }
  }
}

// Execute the test
sendVideoMessage();
