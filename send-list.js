const fetch = require("node-fetch");
const config = require("./config.js");

async function sendListMessage() {
  try {
    const response = await fetch(`${config.apiUrl}/messages/interactive`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${config.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        to: config.phoneNumber + "@s.whatsapp.net",
        type: "list",
        header: {
          type: "text",
          text: "Available Services 📋",
        },
        body: {
          text: "Please select one of our services to learn more:",
        },
        footer: {
          text: "Choose from our list of services",
        },
        action: {
          button: "View Services",
          sections: [
            {
              title: "Main Services",
              rows: [
                {
                  id: "service_web",
                  title: "Web Development",
                  description: "Custom websites and web applications",
                },
                {
                  id: "service_mobile",
                  title: "Mobile Apps",
                  description: "iOS and Android app development",
                },
                {
                  id: "service_cloud",
                  title: "Cloud Solutions",
                  description: "Cloud hosting and infrastructure",
                },
              ],
            },
            {
              title: "Support Services",
              rows: [
                {
                  id: "service_consulting",
                  title: "IT Consulting",
                  description: "Technical advice and planning",
                },
                {
                  id: "service_support",
                  title: "24/7 Support",
                  description: "Round-the-clock technical support",
                },
              ],
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
      console.log("List message sent successfully!");
      console.log("You should now see a list menu in your WhatsApp message.");
    }
  } catch (error) {
    console.error("Error sending message:", error);
    console.error("Full error:", error);
  }
}

// Execute the test
sendListMessage();
