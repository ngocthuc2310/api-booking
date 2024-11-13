const express = require("express");
const cors = require("cors");
const body = require("body-parser");
const router = express.Router();
router.use(cors());
router.use(body.json());
const controllerAdmin = require("../controller/admin-co.js");

router.get("/topmap", controllerAdmin.map);
router.get("/listtransaction", controllerAdmin.listTransaction);
router.get("/listhotel", controllerAdmin.listHotel);
router.post("/addhotel", controllerAdmin.addHotel);
router.get("/deletehotel", controllerAdmin.deleteHotel);
router.get("/listroom", controllerAdmin.listRoom);
router.post("/addroom", controllerAdmin.addRoom);
router.get("/deleteroom", controllerAdmin.deleteRoom);
router.post("/updatehotel", controllerAdmin.editHotel);
router.post("/updateroom", controllerAdmin.editRoom);
router.get("/hotelinfo", controllerAdmin.hotelInfo);
router.get("/roominfo", controllerAdmin.roomInfo);

module.exports = router;
