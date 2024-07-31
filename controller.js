import KafkaConfig from "./config.js";
import dotenv from 'dotenv';
import pkg from 'pg';
const { Client } = pkg;

dotenv.config();

const sendMessageToKafka = async (messageDB) => {
  try {
    const message = {
      "message": messageDB.mensagem,
      "email": messageDB.email,
      "subject": "Lembrete de suas metas",
    }
    const stringJson = JSON.stringify(message);
    const kafkaConfig = new KafkaConfig();
    const messages = [{ key: "key1", value: stringJson }];
    kafkaConfig.produce("my-topic", messages);

  } catch (error) {
    console.log(error);
  }
};

async function chamarProcedure() {
  const connectionString = "postgresql://postgres:example@localhost:5432/postgres";
  const client = new Client({
    connectionString: connectionString,
  });

  try {
    await client.connect();
    await client.query('CALL atualizar_notificacoes()');

    console.log('Procedure chamada com sucesso!');

    const messages = await client.query('select * from "NotificationMessages"')
    return messages.rows
  } catch (err) {
    console.error('Erro ao chamar a procedure:', err.stack);
  } finally {
    await client.end();
  }
}

const constrollers = { sendMessageToKafka, chamarProcedure };

export default constrollers;

