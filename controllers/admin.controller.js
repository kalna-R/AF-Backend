const express = require("express");
const adminRoutes = express.Router();

let Admin = require("../models/admin.model");

//create new admin
adminRoutes.route("/create").post(function(req, res) {
  let admin = new Admin(req.body);

  let username = req.body.username;

  Admin.find({ username: username }, (err, admins) => {
    if (err) {
      return res.send({ message: "Error" });
    }
    if (admins.length >= 1) {
      return res.send({ message: "Username exists" });
    }
    admin.save()
      .then(admin => {
        res.status(200).json({ admin: "Added Successfully" });
      })
      .catch(err => {
        res.status(400).send("Adding failed");
      });
  });
});

//view admin details
adminRoutes.route("/").get(function(req, res) {
  Admin.find(function(err, admin) {
    if (err) {
      console.log(err);
    } else {
      res.json(admin);
    }
  });
});

//get admin details by id
adminRoutes.route("/:username").get(function(req, res) {
  let id = req.params.username;
  Admin.find({username: id})
    .exec()
    .then(data => {
      res.status(200).json(data);
    })
    .catch(err => {
      res.status(400).send("Could not find item");
    });
});

//update admin details
adminRoutes.route("/update/:username").put(function(req, res){
  let id = req.params.username;
  Admin.find({username: id})
    .exec()
    .then(data => {

      if (!data) {
        res.status(404).send("data is not found");
      }else{
        console.log(data);
        data.username = req.body.username;
        data.firstName = req.body.firstName;
        data.lastName = req.body.lastName;
        data.password = req.body.password;
        console.log(data);
      }
    })
    .catch(err => {
      res.status(400).send("Could not find item");
    });
});

adminRoutes.route('/:update/username').put(function (req, res) {
  assignmentExamController.update(req.params.assignmentExamCode, req.body).then(function (data) {
      res.status(data.status).send(
          {
              data: data.message
          }
      );
  }).catch(error => {
      res.status(error.status).send({
          message: error.message
      })
  })
});

//delete user details
adminRoutes.route("/:username").delete(function(req, res) {
  let id = req.params.username;
  Admin.remove({ username: id })
    .exec()
    .then(admin => {
      res.status(200).json({ Admin: "Deleted Successfully" });
    })
    .catch(err => {
      res.status(400).send("Deletion failed");
    });
});

module.exports = adminRoutes;
