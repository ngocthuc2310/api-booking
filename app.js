const express = require("express");
const mongoose = require("mongoose");
const app = express();
const userRouter = require("./router/user-ro.js");
const hotelRouter = require("./router/hotel-ro.js");
const transactionRoutor = require("./router/transaction-ro.js");
const adminRouter = require("./router/admin-ro.js");

app.use(userRouter);
app.use(hotelRouter);
app.use(transactionRoutor);
app.use(adminRouter);

mongoose
  .connect(
    "mongodb+srv://ngocthuc231087:SrXpqzt2epxMonz9@cluster0.7kf6zdq.mongodb.net/Booking?retryWrites=true"
  )
  .then((result) => {
    app.listen(5000, () => {
      console.log("server running!");
    });
  })
  .catch((er) => console.log(er));
