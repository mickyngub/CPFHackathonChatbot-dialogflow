const express = require("express");
const router = express.Router();
const dialogflow = require("dialogflow");
const path = require("path");
require("dotenv").config({
  path: path.resolve(__dirname, "./../../.env"),
});

/* testing dotenv with path
router.get("/test", () => {
  console.log(process.env.a);
});
*/

// console.log(process.env.dialogFlowSessionID);
// console.log(process.env.googleProjectID);
const projectId = "cpfchatbot-rnweat";
const sessionId = "bot-session";
const sessionClient = new dialogflow.SessionsClient();
const sessionPath = sessionClient.sessionPath(projectId, sessionId);

router.post("/textQuery", async (req, res) => {
  // The text query request.
  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        // The query to send to the dialogflow agent
        text: req.body.text,
        // The language used by the client (en-US)
        languageCode: "en-US",
      },
    },
  };

  // Send request and log result
  const responses = await sessionClient.detectIntent(request);
  console.log("Detected intent");
  const result = responses[0].queryResult;
  console.log(`  Query: ${result.queryText}`);
  console.log(`  Response: ${result.fulfillmentText}`);
  if (result.intent) {
    console.log(`  Intent: ${result.intent.displayName}`);
  } else {
    console.log(`  No intent matched.`);
  }

  res.send(result);
});

router.post("/eventQuery", async (req, res) => {
  // The text query request.
  const request = {
    session: sessionPath,
    queryInput: {
      event: {
        // The query to send to the dialogflow agent
        name: req.body.event,
        // The language used by the client (en-US)
        languageCode: "en-US",
      },
    },
  };

  // Send request and log result
  const responses = await sessionClient.detectIntent(request);
  console.log("Detected intent");
  const result = responses[0].queryResult;
  console.log(`  Query: ${result.queryText}`);
  console.log(`  Response: ${result.fulfillmentText}`);
  if (result.intent) {
    console.log(`  Intent: ${result.intent.displayName}`);
  } else {
    console.log(`  No intent matched.`);
  }

  res.send(result);
});

module.exports = router;
