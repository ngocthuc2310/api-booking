const express = require("express");
const cors = require("cors");
const body = require("body-parser");
const router = express.Router();
router.use(cors());
router.use(body.json());
const controllerTransaction = require("../controller/transaction-co.js");

router.post("/book", controllerTransaction.postBook);
router.get("/transaction", controllerTransaction.getTransaction);

module.exports = router;
