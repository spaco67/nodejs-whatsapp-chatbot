const fetch = require("node-fetch");
const config = require("./config.js");

async function sendTestMessage() {
  try {
    const messageText =
      "🔄 Testing webhook functionality... Please respond with any message to verify the connection.";

    const response = await fetch(`${config.apiUrl}/messages/text`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${config.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        to: config.phoneNumber + "@s.whatsapp.net",
        body: messageText,
      }),
    });

    const data = await response.json();
    console.log("Response:", data);

    if (data.error) {
      console.error("Error details:", data.error);
    } else {
      console.log("Test message sent successfully!");
      console.log("Please reply to the message to test webhook functionality.");
    }
  } catch (error) {
    console.error("Error sending message:", error);
  }
}

// Execute the test
sendTestMessage();
