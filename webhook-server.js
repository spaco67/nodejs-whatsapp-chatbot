const express = require("express");
const bodyParser = require("body-parser");
const config = require("./config.js");
const fetch = require("node-fetch");

const app = express();

// Parse JSON bodies
app.use(bodyParser.json());

// Helper function to handle all webhook events
function handleWebhookEvent(req, res) {
  try {
    const data = req.body;
    console.log("Received webhook event:", JSON.stringify(data, null, 2));

    // Handle different types of messages
    if (data.messages && data.messages.length > 0) {
      const message = data.messages[0];
      console.log("Message type:", message.type);
      console.log("Interactive type:", message.interactive?.type);

      // Handle interactive messages (both list and button responses)
      if (message.type === "interactive") {
        console.log(
          "Full interactive message:",
          JSON.stringify(message.interactive, null, 2)
        );

        if (message.interactive.type === "button_reply") {
          const response = message.interactive.button_reply;
          console.log("Button response:", response);
          handleButtonResponse(message.from, response.id);
        } else if (message.interactive.type === "quick_reply") {
          const response = message.interactive.quick_reply;
          console.log("Quick reply response:", response);
          handleButtonResponse(message.from, response.id);
        } else if (message.interactive.type === "list_reply") {
          const response = message.interactive.list_reply;
          console.log("List response:", response);
          handleListSelection(message.from, response.id, response.title);
        }
      }
      // Handle text messages
      else if (message.type === "text") {
        console.log(`Received text message: ${message.text.body}`);
        sendTextMessage(message.from, `You said: ${message.text.body}`);
      }
    }

    // Always respond with 200 OK to acknowledge receipt
    res.status(200).json({ status: "success" });
  } catch (error) {
    console.error("Error processing webhook:", error);
    res.status(500).json({ status: "error", message: error.message });
  }
}

// Main webhook endpoint
app.post("/webhook", handleWebhookEvent);

// Additional webhook endpoints for different event types
app.post("/webhook/messages", handleWebhookEvent);
app.post("/webhook/statuses", handleWebhookEvent);
app.post("/webhook/chats", handleWebhookEvent);
app.patch("/webhook/chats", handleWebhookEvent);
app.post("/webhook/contacts", handleWebhookEvent);
app.patch("/webhook/contacts", handleWebhookEvent);
app.post("/webhook/groups", handleWebhookEvent);
app.patch("/webhook/groups", handleWebhookEvent);
app.post("/webhook/presences", handleWebhookEvent);
app.post("/webhook/channel", handleWebhookEvent);
app.patch("/webhook/channel", handleWebhookEvent);
app.post("/webhook/users", handleWebhookEvent);
app.delete("/webhook/users", handleWebhookEvent);
app.post("/webhook/labels", handleWebhookEvent);
app.delete("/webhook/labels", handleWebhookEvent);
app.post("/webhook/calls", handleWebhookEvent);
app.post("/webhook/service", handleWebhookEvent);

// Function to handle list selections
async function handleListSelection(from, id, title) {
  let responseMessage = "";

  switch (id) {
    case "service_web":
      responseMessage =
        "*Web Development Services* 🌐\n\n" +
        "Our web development services include:\n" +
        "• Custom website development\n" +
        "• Web applications\n" +
        "• E-commerce solutions\n" +
        "• CMS development\n\n" +
        "_Would you like to schedule a consultation?_";
      break;

    case "service_mobile":
      responseMessage =
        "*Mobile App Development* 📱\n\n" +
        "We develop mobile apps for:\n" +
        "• iOS (iPhone & iPad)\n" +
        "• Android devices\n" +
        "• Cross-platform solutions\n\n" +
        "_Want to discuss your app idea?_";
      break;

    case "service_cloud":
      responseMessage =
        "*Cloud Solutions* ☁️\n\n" +
        "Our cloud services include:\n" +
        "• Cloud hosting\n" +
        "• Infrastructure setup\n" +
        "• Cloud migration\n" +
        "• Maintenance & monitoring\n\n" +
        "_Need help with cloud solutions?_";
      break;

    case "service_consulting":
      responseMessage =
        "*IT Consulting Services* 💡\n\n" +
        "We provide expert advice on:\n" +
        "• Technology strategy\n" +
        "• Digital transformation\n" +
        "• IT infrastructure\n" +
        "• Security solutions\n\n" +
        "_Ready to transform your business?_";
      break;

    case "service_support":
      responseMessage =
        "*24/7 Technical Support* 🔧\n\n" +
        "Our support services include:\n" +
        "• Round-the-clock assistance\n" +
        "• Remote troubleshooting\n" +
        "• System maintenance\n" +
        "• Emergency response\n\n" +
        "_Need technical support?_";
      break;

    case "about_us":
      responseMessage =
        "*About Our Company* ℹ️\n\n" +
        "We are a leading technology solutions provider with:\n" +
        "• Years of industry experience\n" +
        "• Expert development team\n" +
        "• Proven track record\n" +
        "• Client-focused approach\n\n" +
        "_Want to know more about us?_";
      break;

    case "contact_us":
      responseMessage =
        "*Contact Information* 📞\n\n" +
        "Get in touch with us:\n" +
        "• Email: info@example.com\n" +
        "• Phone: +1234567890\n" +
        "• Hours: Mon-Fri, 9AM-6PM\n\n" +
        "_How can we help you today?_";
      break;

    default:
      responseMessage =
        "Thank you for your selection! A team member will assist you shortly.";
  }

  await sendTextMessage(from, responseMessage);
}

// Function to handle button responses
async function handleButtonResponse(from, buttonId) {
  console.log(`Handling button response for ID: ${buttonId}`);
  let responseMessage = "";

  switch (buttonId) {
    case "service_web":
      responseMessage =
        "*Web Development Services* 🌐\n\n" +
        "Our web development services include:\n" +
        "• Custom website development\n" +
        "• Web applications\n" +
        "• E-commerce solutions\n" +
        "• CMS development\n\n" +
        "_Would you like to schedule a consultation?_";
      break;

    case "service_mobile":
      responseMessage =
        "*Mobile App Development* 📱\n\n" +
        "We develop mobile apps for:\n" +
        "• iOS (iPhone & iPad)\n" +
        "• Android devices\n" +
        "• Cross-platform solutions\n\n" +
        "_Want to discuss your app idea?_";
      break;

    case "service_cloud":
      responseMessage =
        "*Cloud Solutions* ☁️\n\n" +
        "Our cloud services include:\n" +
        "• Cloud hosting\n" +
        "• Infrastructure setup\n" +
        "• Cloud migration\n" +
        "• Maintenance & monitoring\n\n" +
        "_Need help with cloud solutions?_";
      break;

    default:
      responseMessage =
        "Thank you for your selection! A team member will assist you shortly.";
  }

  console.log(`Sending response message: ${responseMessage}`);
  await sendTextMessage(from, responseMessage);
}

// Function to send text messages
async function sendTextMessage(to, message) {
  try {
    const response = await fetch(`${config.apiUrl}/messages/text`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${config.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        to: to,
        body: message,
      }),
    });

    const data = await response.json();
    console.log("Response message sent:", data);
  } catch (error) {
    console.error("Error sending response:", error);
  }
}

// Start the server
const PORT = process.env.PORT || config.port || 3000;
app.listen(PORT, () => {
  console.log(`Webhook server is running on port ${PORT}`);
  console.log(`Webhook URL: ${config.botUrl}`);
  console.log("Make sure to configure this URL in your Whapi.Cloud dashboard");
});
