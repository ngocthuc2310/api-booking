const User = require("../model/user-mo.js");
const Hotel = require("../model/hotel-mo.js");
const Room = require("../model/room-mo.js");
const Transaction = require("../model/transaction-mo.js");

exports.test = (req, res, next) => {
  User.find();
  Hotel.find();
  Room.find();
  Transaction.find();
};
exports.login = (req, res, next) => {
  const userIfo = req.body;
  User.find({ email: userIfo.email, passWord: userIfo.passWord })
    .then((user) => {
      if (user.length > 0) res.json({ msg: "Login thành công", user: user[0] });
      else res.json({ msg: "Login không thành công", user: null });
    })
    .catch((er) => res.json({ msg: "ERR: " + er.message }));
};
exports.signUp = (req, res, next) => {
  const userIfo = req.body;
  User.find({ email: userIfo.email }).then((result) => {
    if (result.length <= 0) {
      const user = new User({
        email: userIfo.email,
        passWord: userIfo.passWord,
        isAdmin: false,
      });
      user
        .save()
        .then((result) => {
          res.json({ msg: "Thêm user thành công" });
        })
        .catch((er) => res.json({ msg: "ERR: " + er }));
    } else res.json({ msg: "email đã tồn tại!" });
  });
};
exports.updateUser = (req, res, next) => {
  const info = req.body;
  User.findByIdAndUpdate(info._id, {
    $set: { fullName: info.fullname, phoneNumber: info.phonenumber },
  })
    .then(() => {
      res.json({ msg: "update thành công" });
    })
    .catch((er) => res.json({ msg: "ERR " + er }));
};
exports.listUser = (req, res, next) => {
  User.find()
    .then((x) => {
      res.json(x);
    })
    .catch((er) => res.json({ msg: er.message }));
};
