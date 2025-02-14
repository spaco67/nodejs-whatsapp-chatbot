const fetch = require("node-fetch");
const fs = require("fs");
const config = require("./config.js");

async function sendPdfDocument() {
  try {
    // Read the PDF file and convert it to base64
    const documentBuffer = fs.readFileSync(
      "./files/file-example_PDF_500_kB.pdf"
    );
    const base64Document = `data:application/pdf;base64,${documentBuffer.toString(
      "base64"
    )}`;

    const response = await fetch(`${config.apiUrl}/messages/document`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${config.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        to: config.phoneNumber + "@s.whatsapp.net",
        caption:
          "*Sample PDF Document* 📄\n\nThis is a test PDF document sent via the WhatsApp Bot.\n\n_Sent at: " +
          new Date().toLocaleString() +
          "_",
        media: base64Document,
        filename: "sample-document.pdf", // Specify filename for the recipient
      }),
    });

    const data = await response.json();
    console.log("Response:", data);

    if (data.error) {
      console.error("Error details:", data.error);
    } else {
      console.log("Document sent successfully!");
    }
  } catch (error) {
    console.error("Error sending document:", error);
    if (error.code === "ENOENT") {
      console.error(
        "PDF file not found. Please make sure the file exists in the 'files' directory."
      );
    }
  }
}

// Execute the test
sendPdfDocument();
