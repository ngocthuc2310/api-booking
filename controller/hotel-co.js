const Hotel = require("../model/hotel-mo.js");
const Room = require("../model/room-mo.js");

exports.topKhuVuc = (req, res, next) => {
  let countHaNoi, countHCM, countDaNang;
  Hotel.find({ city: "Ha Noi" })
    .then((n) => {
      countHaNoi = n.length;
    })
    .then(() => {
      Hotel.find({ city: "Ho Chi Minh" })
        .then((n) => {
          countHCM = n.length;
        })
        .then(() => {
          Hotel.find({ city: "Da Nang" }).then((n) => {
            countDaNang = n.length;
            res.json([
              {
                image: "./images/haNoi.jpg",
                name: "Hà Nội",
                count: countHaNoi,
              },
              {
                image: "./images/hCM.jpg",
                name: "Hồ Chí Minh",
                count: countHCM,
              },
              {
                image: "./images/daNang.jpg",
                name: "Đà Nẵng",
                count: countDaNang,
              },
            ]);
          });
        });
    });
};
exports.countHotelByType = (req, res, next) => {
  let countHotel, countApartments, countResorts, countVillas, countCabins;
  Hotel.find({ type: "hotel" })
    .then((n) => {
      countHotel = n.length;
    })
    .then((n) => {
      Hotel.find({ type: "apartments" })
        .then((m) => {
          countApartments = m.length;
        })
        .then(() => {
          Hotel.find({ type: "resorts" })
            .then((o) => {
              countResorts = o.length;
            })
            .then(() => {
              Hotel.find({ type: "villas" })
                .then((p) => {
                  countVillas = p.length;
                })
                .then(() => {
                  Hotel.find({ type: "cabins" }).then((q) => {
                    countCabins = q.length;
                    res.json([
                      {
                        name: "Hotels",
                        count: countHotel,
                        image: "./images/type_1.webp",
                      },
                      {
                        name: "Apartments",
                        count: countApartments,
                        image: "./images/type_2.jpg",
                      },
                      {
                        name: "Resorts",
                        count: countResorts,
                        image: "./images/type_3.jpg",
                      },
                      {
                        name: "Villas",
                        count: countVillas,
                        image: "./images/type_4.jpg",
                      },
                      {
                        name: "Cabins",
                        count: countCabins,
                        image: "./images/type_5.jpg",
                      },
                    ]);
                  });
                });
            });
        });
    });
};
exports.topRating = (req, res, next) => {
  Hotel.find()
    .then((x) => {
      x.sort((a, b) => b.rating - a.rating);
      const topRating = x.slice(0, 4);
      res.json(topRating);
    })
    .catch((er) => res.json({ msg: er.message }));
};
exports.search = (req, res, next) => {
  const searchInfo = req.body;
  let result = [];
  Hotel.find()
    .then((a) => {
      Room.find().then((b) => {
        for (let x of a) {
          for (let y of b) {
            if (
              x.rooms.includes(y._id) &&
              x.city == searchInfo.city &&
              x.rooms.length >= searchInfo.countRoom &&
              y.maxPeople >= searchInfo.maxPeople
            ) {
              result.push(x);
              break;
            }
          }
        }
        res.json(result);
      });
    })
    .catch((er) => res.json({ msg: "ERR: " + er }));
};
exports.postBookRoom = (req, res, next) => {
  const info = req.body;
  Hotel.find({ _id: info.id }).then((a) => {
    Room.find().then((b) => {
      let result = [];
      a[0].rooms.forEach((x) => {
        b.forEach((y) => {
          if (x.includes(y._id)) result.push(y);
        });
      });
      res.json(result);
    });
  });
};
