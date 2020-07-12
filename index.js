const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const Query = require("./server/routes/dialogflow");
const path = require("path");

require("dotenv").config();

// app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/api/dialogflow", Query);

if (process.env.NODE_ENV === "production") {
  //set static folder
  app.use(express.static("client/build"));

  app.get("*", async (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log("The serving is running on port ", port);
  console.log(process.env.a);
});
