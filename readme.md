- Criar o arquivo package

  > npm init

- Instalar o Express, que gerencia as rotas

  > npm install express

- Instalar o Nodemon, que reinicia o servidor automativamente após uma alteração qualquer

  > npm install -D nodemon

- Instalar o Mongoose, que traduz os dados da base para objetos Javascript

  > npm install --save mongoose

- Instalar o Dotenv, que permite criar um arquivo com variáveis secretas

  > npm install dotenv --save

  - É necessário criar um script em package.json, assim:

    > "start": "nodemon -r dotenv/config server.js dotenv_config_path=.env"

- Instalar o Bcryptjs, que criptografa senhas do base de dados

  > npm install Bcryptjs --save

- Instalar o Multer, que permite criar uploads para o servidor

  > npm install multer --save

- Instalar o JSONWebToken, que criar Tokens que podem ser recebidos via Headers

  > npm install multer --save

---

- Instalar/atualizar depêndencias

  > npm i

- Rodar o projeto

  > nodemon app.js
