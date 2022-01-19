const routes = require("express").Router();
const VagaController = require("../controllers/VagaController");

routes.get("/", VagaController.index);
routes.get("/find/:filter", VagaController.index);
routes.get("/:id", VagaController.show);
routes.post("/", VagaController.store);
routes.put("/:id", VagaController.update);
routes.put("/update-acessos/:id", VagaController.updateAcessos);
routes.put("/upload-image/:id", VagaController.upload);
routes.delete("/:id", VagaController.destroy);

module.exports = routes;
