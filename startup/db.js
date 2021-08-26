const mongoose = require("mongoose");

module.exports = function () {
  mongoose
    .connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    })
    .then(() => console.log("connected to database successfully"))
    .catch((err) => console.log(`cannot connect because of this: ${err}`));
};
