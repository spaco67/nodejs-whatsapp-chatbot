const fetch = require("node-fetch");
const config = require("./config.js");

async function sendMenuMessage() {
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
          text: "Available Services 📋",
        },
        body: {
          text: "*Welcome to our service menu!*\n\nChoose from our services:\n\n1. Web Development 🌐\n2. Mobile Apps 📱\n3. Cloud Solutions ☁️",
        },
        footer: {
          text: "Select an option to learn more",
        },
        action: {
          buttons: [
            {
              id: "service_web",
              type: "quick_reply",
              title: "Web Development",
            },
            {
              id: "service_mobile",
              type: "quick_reply",
              title: "Mobile Apps",
            },
            {
              id: "service_cloud",
              type: "quick_reply",
              title: "Cloud Solutions",
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
      console.log("Interactive menu sent successfully!");
      console.log("You should now see the menu with buttons.");
    }
  } catch (error) {
    console.error("Error sending message:", error);
    console.error("Full error:", error);
  }
}

// Execute the test
sendMenuMessage();
