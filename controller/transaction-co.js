const Transaction = require("../model/transaction-mo");
const User = require("../model/user-mo.js");

exports.postBook = (req, res, next) => {
  const info = req.body;
  const trs = new Transaction(info);
  trs
    .save()
    .then(() => {
      res.json({ msg: "book thành công" });
    })
    .catch((er) => {
      res.json({ msg: "ERR: " + er.message });
    });
};
exports.getTransaction = (req, res, next) => {
  const user = req.query.email;
  Transaction.find({ user: user })
    .then((x) => {
      res.json(x);
    })
    .catch((er) => res.json(er.message));
};
