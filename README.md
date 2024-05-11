Para testar este projeto, é necessário a utilização de docker para a preparação do ambiente.

Está disponível neste repositório um docker compose, basta rodar o comando docker compose run -d para ter seu ambiente configurado com o kafka, kafdrop e zookeeper.
Para visualização dos tópicos e das mensagens, é possível acessar a url localhost na porta 19000 e terá acesso ao kafdrop.

Sobre o funcionamento:

Para rodar a api responsável pela criação de novas mensagens, é necessário rodar o comando npm start e realizar a requisição POST na rota http://localhost:8080/api/send.

Já para consumir as mensagens, será possível com o comando node consumer.js, para simulação de tarefas assìncronas, foi adicionado um tempo de espera antes de consumir uma mensagem da fila
