const fetch = require("node-fetch");
const fs = require("fs");
const config = require("./config.js");

async function sendImageMessage() {
  try {
    // Read the image file and convert it to base64
    const imageBuffer = fs.readFileSync("./files/file_example_JPG_100kB.jpg");
    const base64Image = `data:image/jpeg;base64,${imageBuffer.toString(
      "base64"
    )}`;

    const response = await fetch(`${config.apiUrl}/messages/image`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${config.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        to: config.phoneNumber + "@s.whatsapp.net",
        caption:
          "*Sample Image Message* 🖼️\n\nThis is a test image sent via the WhatsApp Bot.\n\n_Sent at: " +
          new Date().toLocaleString() +
          "_",
        media: base64Image,
      }),
    });

    const data = await response.json();
    console.log("Response:", data);

    if (data.error) {
      console.error("Error details:", data.error);
    } else {
      console.log("Image sent successfully!");
    }
  } catch (error) {
    console.error("Error sending image:", error);
    if (error.code === "ENOENT") {
      console.error(
        "Image file not found. Please make sure the file exists in the 'files' directory."
      );
    }
  }
}

// Execute the test
sendImageMessage();
