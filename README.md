#Desafio Técnico

O Projeto tem como finalidade ser um processador de CEP.

O app recebe um numero de CEP por meio de rota POST e após receber esse CEP o mesmo será adicionado a uma collection do mongo db, e seu id enviado como mensagem para fila SQS, o método de consulta da fila SQS vai estar em loop buscando o id dos documentos com status "PENDENTE", após o encontrado o mesmo será consultado na API >> "https://viacep.com.br/ws/75619970/json/" e atualizado suas informações na collection do banco de dados, após ser tratado a mensagem é excluida da fila SQS.


[PASSSOS PARA EXECUTAR O PROJETO]

#1 - Realizar o npm install para instalar as depedências do projeto.

#2 - Criar o arquivo .env na pasta raiz do projeto, com as variaveis "PORT","MONGO_URI","SQS_URL".

#3 - Após seguir os passos a cima realizar o npm start na pasta do projeto.

#4 - Enviar requisição do tipo POST na rota "http://localhost:{PORT}/api/cep".

#4.4 - Modelo da requisição na rota post deve ser um body 
#{
#    "cep":"75902030"
#}
