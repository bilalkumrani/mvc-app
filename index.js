const express = require("express");
const path = require("path");
const db = require("./config/mongoose");
const contact = require("./models/contact");
const app = express();

const port = 4000;

app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(express.static("assets"));

app.get("/", (req, res) => {
  contact.find({}, (err, contacts) => {
    return res.render("home", {
      title: "My contact List",
      contact_list: contacts,
    });
  });
});

// app.get("/practice", (req, res) => {
//   return res.render("practice", {
//     title: "im practicing",
//   });
// });

app.post("/createContact", (req, res) => {
  //   console.log(req.body);
  //   contactList.push({
  //     name: req.body.name,
  //     phone: req.body.phone,
  //   });
  //   return res.redirect("back");
  contact.create(req.body, (err) => {
    if (err) {
      console.error("error is here !!!!");
    }
  });
  return res.redirect("back");
});

app.get("/deletecontact", (req, res) => {
  let id = req.query.id;

  contact.findByIdAndDelete(id, (err) => {
    if (err) {
      console.log("error in deleting an object");
      return;
    }
  });
  return res.redirect("back");
});

app.get("/update", (req, res) => {
  let name = req.query.name;
  let id = req.query.id;
  res.render("update", {
    id,
    name,
  });
});

app.post("/update/:id", (req, res) => {
  let id = req.params.id;
  let name = req.body.name;

  contact.findByIdAndUpdate(id, { name: name }, (err) => {
    if (err) {
      console.log("updating error");
    }
  });
  return res.redirect("/");
});

app.listen(port, (err) => {
  if (err) {
    console.log("there are some errors");
  } else {
    console.log("app is up on port: ", port);
  }
});
