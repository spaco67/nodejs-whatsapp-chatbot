const fetch = require("node-fetch");
const config = require("./config.js");

async function sendButtonMessage() {
  try {
    const response = await fetch(`${config.apiUrl}/messages/interactive`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${config.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        to: config.phoneNumber + "@s.whatsapp.net",
        type: "button",
        header: {
          type: "text",
          text: "Interactive Message",
        },
        body: {
          text: "*Welcome to Our Bot* 🤖\n\nThis is a test message with interactive buttons. Please select an option:",
        },
        footer: {
          text: "Choose an option",
        },
        action: {
          buttons: [
            {
              id: "btn_1",
              type: "quick_reply",
              title: "✅ Yes",
            },
            {
              id: "btn_2",
              type: "quick_reply",
              title: "❌ No",
            },
            {
              id: "btn_3",
              type: "quick_reply",
              title: "🤔 Maybe",
            },
          ],
        },
      }),
    });

    const data = await response.json();
    console.log("Response:", data);

    if (data.error) {
      console.error("Error details:", data.error);
    } else {
      console.log("Interactive message sent successfully!");
      console.log("You should now see buttons in your WhatsApp message.");
    }
  } catch (error) {
    console.error("Error sending message:", error);
    console.error("Full error:", error);
  }
}

// Execute the test
sendButtonMessage();
