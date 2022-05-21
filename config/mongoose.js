const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/contact_list_db");

const db = mongoose.connection;
db.on("error", () => {
  console.log("error while connecting to db");
});

db.once("open", () => {
  console.log("successfully connected to the database!");
});
