const User = require("../model/user-mo.js");
const Transaction = require("../model/transaction-mo.js");
const Hotel = require("../model/hotel-mo.js");
const Room = require("../model/room-mo.js");

exports.map = (req, res, next) => {
  User.find({ isAdmin: { $ne: true } })
    .then((x) => {
      Transaction.find()
        .then((y) => {
          const user = x.length;
          const order = y.length;
          const earnings = y.reduce((kq, num) => {
            return kq + num.price;
          }, 0);
          const balance = earnings;
          res.json({ user, order, earnings, balance });
        })
        .catch((er) => res.json({ msg: er.message }));
    })
    .catch((er) => res.json({ msg: er.message }));
};

exports.listTransaction = (req, res, next) => {
  Hotel.find()
    .then((x) => {
      Transaction.find()
        .then((y) => {
          let list = [];
          let rooms;
          y.forEach((b) => {
            x.forEach((a) => {
              rooms = "";
              if (b.hotel.toString() == a._id.toString()) {
                rooms = b.room.join([", "]);
                const date =
                  b.dateStart.getDate() +
                  "/" +
                  (b.dateStart.getMonth() + 1) +
                  "/" +
                  b.dateStart.getFullYear() +
                  " - " +
                  b.dateEnd.getDate() +
                  "/" +
                  (b.dateEnd.getMonth() + 1) +
                  "/" +
                  b.dateEnd.getFullYear();
                list.push({
                  id: b._id,
                  user: b.user,
                  hotel: a.name,
                  room: rooms,
                  date: date,
                  price: b.price,
                  payment: b.payment,
                  status: b.status,
                });
              }
            });
          });
          const listtt = list.slice(0, 8);
          res.json(listtt);
        })
        .catch((er) => res.json({ msg: er.message }));
    })
    .catch((er) => res.json({ msg: er.message }));
};
exports.listHotel = (req, res, next) => {
  Hotel.find()
    .then((x) => {
      const list = x.map((x) => {
        return {
          id: x._id,
          name: x.name,
          type: x.type,
          title: x.title,
          city: x.city,
        };
      });
      res.json(list);
    })
    .catch((er) => res.json({ msg: er.message }));
};
exports.addHotel = (req, res, next) => {
  const info = req.body;
  const ht = new Hotel(info);
  ht.save()
    .then(() => {
      res.json({ msg: "Thêm thành công!!" });
    })
    .catch((er) => res.json({ msg: er.message }));
};
exports.deleteHotel = (req, res, next) => {
  const id = req.query.id;
  Transaction.find({ hotel: id }).then((x) => {
    if (x.length <= 0) {
      Hotel.deleteOne({ _id: id })
        .then(() => {
          res.json({ msg: "Xóa thành công" });
        })
        .catch((er) => res.json({ msg: er.message }));
    } else res.json({ msg: "Xóa thất bại, mục đang book" });
  });
};
exports.listRoom = (req, res, next) => {
  Room.find()
    .then((x) => {
      res.json(x);
    })
    .catch((er) => res.json({ msg: er.message }));
};
exports.addRoom = (req, res, next) => {
  const info = req.body;
  const room = new Room(info);
  room
    .save()
    .then(() => {
      res.json({ msg: "thêm thành công" });
    })
    .catch((er) => res.json({ msg: er.message }));
};
exports.deleteRoom = (req, res, next) => {
  const id = req.query.id;
  let timra = false;
  Transaction.find().then((x) => {
    Room.find({ _id: id }).then((y) => {
      y.forEach((b) => {
        x.forEach((a) => {
          b.roomNumbers.forEach((i) => {
            a.room.forEach((j) => {
              if (i == j) timra = true;
            });
          });
        });
      });
      if (!timra) {
        Room.deleteOne({ _id: id })
          .then(() => {
            res.json({ msg: "xóa thành công" });
          })
          .catch((er) => res.json({ msg: er.message }));
      } else res.json({ msg: "Room có người đặt" });
    });
  });
};
exports.editHotel = (req, res, next) => {
  const info = req.body;
  Hotel.updateOne(
    { _id: info._id },
    {
      $set: {
        name: info.name,
        title: info.title,
        type: info.type,
        city: info.city,
        address: info.address,
        cheapestPrice: info.cheapestPrice,
        distance: info.distance,
        photos: info.photos,
        desc: info.desc,
        rating: info.rating,
        featured: info.featured,
        rooms: info.rooms,
      },
    }
  )
    .then(() => {
      res.json({ msg: "update thành công:" });
    })
    .catch((er) => {
      res.json({ msg: er.message });
    });
};
exports.editRoom = (req, res, next) => {
  const info = req.body;
  Room.updateOne(
    { _id: info._id },
    {
      $set: {
        title: info.title,
        price: info.price,
        maxPeople: info.maxPeople,
        desc: info.desc,
        roomNumbers: info.roomNumbers,
      },
    }
  )
    .then(() => res.json({ msg: "update thành công" }))
    .catch((er) => res.json({ msg: er.message }));
};
exports.hotelInfo = (req, res, next) => {
  const id = req.query.id;
  Hotel.findById(id)
    .then((x) => {
      res.json(x);
    })
    .catch((er) => res.json({ msg: er.message }));
};
exports.roomInfo = (req, res, next) => {
  const id = req.query.id;
  Room.findById(id)
    .then((x) => res.json(x))
    .catch((er) => res.json({ msg: er.message }));
};
