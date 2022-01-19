const routes = require("express").Router();
const UsuarioController = require("../controllers/UsuarioController");

routes.get("/", UsuarioController.show);
routes.put("/favoritar-vaga", UsuarioController.updateFavorite);
routes.put("/upload-image", UsuarioController.upload);

module.exports = routes;
