import bodyParser from "body-parser";
import express from "express";
import controllers from "./controller.js";
import dotenv from 'dotenv';

const sendMessagesToKafka = async (messages) => {
    for (const message of messages) {
      console.log(message);
      await controllers.sendMessageToKafka(message);
    }
};

const messages = await controllers.chamarProcedure()

sendMessagesToKafka(messages)

