const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");

const app = express();

const connectDatabase = async () => {
  const user = process.env.DB_USER;
  const password = process.env.DB_PASSWORD;

  await mongoose.connect(
    `mongodb+srv://${user}:${password}@cluster0.tx3jf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
  );
};

const applyMiddlewares = () => {
  app.use(express.json());
  app.use("/", routes);
  app.use(express.static("public"));
};

const startServer = () => {
  app.listen(process.env.PORT || 3000, () => {
    console.log("Servidor iniciado: http://localhost:3000/");
  });
};

(async () => {
  try {
    await connectDatabase();
    applyMiddlewares();
    startServer();
  } catch (error) {
    console.error("Erro ao iniciar o servidor: ", error);
  }
})();
