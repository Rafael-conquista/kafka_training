import KafkaConfig from "./config.js";
import dotenv from 'dotenv';

dotenv.config();

const sendMessageToKafka = async (req, res) => {
  try {
    const mail_desc = req.body;
    const message = {
      "message": mail_desc.body,
      "email": mail_desc.email,
      "subject": mail_desc.subject,
    }
    const stringJson = JSON.stringify(message);
    const kafkaConfig = new KafkaConfig();
    const messages = [{ key: "key1", value: stringJson}];
    kafkaConfig.produce("my-topic", messages);

    res.status(200).json({
      status: "Ok!",
      message: "Message successfully send!",
    });
  } catch (error) {
    console.log(error);
  }
};

const constrollers = { sendMessageToKafka };

export default constrollers;
