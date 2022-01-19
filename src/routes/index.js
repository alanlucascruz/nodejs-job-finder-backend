const routes = require("express").Router();
const auth = require("../middlewares/AuthMiddleware");

routes.use("/auth", require("./AuthRoutes"));
routes.use("/vagas", auth, require("./VagaRoutes"));
routes.use("/usuarios", auth, require("./UsuarioRoutes"));

module.exports = routes;
