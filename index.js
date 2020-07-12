const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const Query = require("./server/routes/dialogflow");

require("dotenv").config();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/api/dialogflow", Query);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log("The serving is running on port ", port);
  console.log(process.env.a);
});
