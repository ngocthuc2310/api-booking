const express = require("express");
const cors = require("cors");
const body = require("body-parser");
const router = express.Router();
router.use(cors());
router.use(body.json());
const controllerHotel = require("../controller/hotel-co.js");

router.get("/topkhuvuc", controllerHotel.topKhuVuc);
router.get("/countbytype", controllerHotel.countHotelByType);
router.get("/toprating", controllerHotel.topRating);
router.post("/search", controllerHotel.search);
router.post("/bookroom", controllerHotel.postBookRoom);

module.exports = router;
