import bodyParser from "body-parser";
import express from "express";
import controllers from "./controller.js";

const app = express();
const jsonParser = bodyParser.json();

app.post("/api/send", jsonParser, controllers.sendMessageToKafka);

app.listen(8080, () => {
    console.log("Server is running on port 8080.");
});
