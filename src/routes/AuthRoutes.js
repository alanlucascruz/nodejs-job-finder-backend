const routes = require("express").Router();
const AuthController = require("../controllers/AuthController");
const auth = require("../middlewares/AuthMiddleware");

routes.post("/signin", AuthController.signIn);
routes.post("/signup", AuthController.signUp);
routes.put("/update-password", auth, AuthController.updatePassword);

module.exports = routes;
