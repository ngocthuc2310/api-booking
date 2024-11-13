const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const hotelSchema = new Schema({
  name: { type: String, required: true },
  title: { type: String, require: true },
  type: { type: String, required: true },
  city: { type: String, required: true },
  address: { type: String, required: true },
  cheapestPrice: { type: Number, required: true },
  distance: { type: String, required: true },
  photos: { type: Schema.Types.Array, required: true },
  desc: { type: String, required: true },
  rating: { type: String, required: false },
  featured: { type: String, required: true },
  rooms: { type: Schema.Types.Array, required: true },
});
module.exports = mongoose.model("hotel", hotelSchema);
