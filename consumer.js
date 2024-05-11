import KafkaConfig from "./config.js";

const kafkaConfig = new KafkaConfig()

kafkaConfig.consume("my-topic", (value) => {
    console.log("📨 Receive message: ", value);
  });