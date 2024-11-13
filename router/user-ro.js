const express = require("express");
const cors = require("cors");
const body = require("body-parser");
const router = express.Router();
router.use(cors());
router.use(body.json());
const controllerUser = require("../controller/user-co.js");

router.get("/t", controllerUser.test);
router.post("/login", controllerUser.login);
router.post("/signup", controllerUser.signUp);
router.post("/updateuser", controllerUser.updateUser);
router.get("/users", controllerUser.listUser);

module.exports = router;
