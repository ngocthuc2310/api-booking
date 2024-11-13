const mongoose = require("mongoose");
const { type } = require("os");
const Schema = mongoose.Schema;

const transactionSchema = new Schema({
  user: { type: String, required: true },
  hotel: { type: Schema.Types.ObjectId, required: true },
  room: { type: Schema.Types.Array, required: true },
  dateStart: { type: Schema.Types.Date, required: true },
  dateEnd: { type: Schema.Types.Date, required: true },
  price: { type: Number, required: true },
  payment: { type: String, required: true },
  status: { type: String, required: true },
});
module.exports = mongoose.model("transaction", transactionSchema);
