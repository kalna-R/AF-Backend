const express = require("express");
let AssignmentExamSchema = require("../models/assignment.exam.model");

var assignmentExamController = function() {
  /**
   * Insert method insert data into the AssignmentExam table
   */
  this.insert = function(data) {
    return new Promise(function(resolve, reject) {
      var assignmentExam = new AssignmentExamSchema({
        assignmentExamCode: data.assignmentExamCode,
        description: data.description,
        courseCode: data.courseCode,
        typeOfExam: data.typeOfExam,
        marks: data.marks,
        deadlineDate: data.deadlineDate
      });

      assignmentExam
        .save()
        .then(() => {
          resolve({
            status: 200,
            message: "Added a assignmentExam successfully"
          });
        })
        .catch(err => {
          reject({
            status: 500,
            message: "Error : " + err
          });
        });
    }).catch(err => {
      return console.log(err);
    });

    const output = `
        <p>Hi ${req.body.firstName}, </p>
        <p>Your account has been created</p>
        <ul>  
            <li>First Name: ${req.body.firstName}</li>
            <li>Last Name: ${req.body.lastName}</li>
            <li>Email Address: ${req.body.email}</li>
        </ul>
        <p>Welcome to the team!</p>
        `;

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      service: "gmail",
      secure: false,
      auth: {
        user: "siisystem1@gmail.com",
        pass: "siisystem74."
      },
      tls: {
        rejectUnauthorized: false
      }
    });

    // setup email data
    let mailOptions = {
      from: '"SII System" <siisystem1@gmail.com>',
      to: req.body.email,
      subject: "Welcome to SII",
      text: "text",
      html: output
    };

    // send mail
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log("Message sent: %s", info.messageId);
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

      res.status(200).json({ Instructor: "Added and sent mail Successfully" });
    });
  };
  /**
   * get method to retrieve all data
   */

  this.get = () => {
    return new Promise(function(resolve, reject) {
      AssignmentExamSchema.find()
        .exec()
        .then(data => {
          resolve({
            status: 200,
            data: data
          });
        })
        .catch(err => {
          reject({
            status: 500,
            message: "Error : " + err
          });
        });
    });
  };
  /**
   * getOne method to retrieve data of specified AssignmentExam based on the assignmentExam code
   */

  this.getOne = assignmentExamCode => {
    return new Promise(function(resolve, reject) {
      AssignmentExamSchema.find({
        assignmentExamCode: assignmentExamCode
      })
        .exec()
        .then(data => {
          resolve({
            status: 200,
            data: data
          });
        })
        .catch(err => {
          reject({
            status: 500,
            message: "Error : " + err
          });
        });
    });
  };

  /**
   * Delete an existing assignmentExam
   */
  this.deleteOne = id => {
    return new Promise(function(resolve, reject) {
      AssignmentExamSchema.remove({
        _id: id
      })
        .exec()
        .then(data => {
          resolve({
            status: 200,
            message: "Deleted"
          });
        })
        .catch(err => {
          reject({
            status: 500,
            message: "Error : " + err
          });
        });
    });
  };
  /**
   * User can update their profile
   */

  this.update = (assignmentExamCode, data) => {
    var description = JSON.stringify(data.description);
    var assignmentExamCode = JSON.stringify(data.assignmentExamCode);
    var courseCode = JSON.stringify(data.courseCode);
    var typeOfExam = JSON.stringify(data.typeOfExam);
    var marks = JSON.stringify(data.marks);
    var deadlineDate = JSON.stringify(data.deadlineDate);

    return new Promise(function(resolve, reject) {
      AssignmentExamSchema.find({
        assignmentExamCode: assignmentExamCode
      })
        .exec()
        .then(assignmentExam => {
          if (!assignmentExam) {
            assignmentExam.assignmentExamCode = assignmentExamCode;
            assignmentExam.description = description;
            assignmentExam.courseCode = courseCode;
            assignmentExam.typeOfExam = typeOfExam;
            assignmentExam.marks = marks;
            assignmentExam.deadlineDate = deadlineDate;

            assignmentExam
              .save()
              .then(data =>
                resolve({
                  status: 200,
                  data: data
                })
              )
              .catch(err =>
                reject({
                  status: 500,
                  message: "Error : " + err
                })
              );
          }
        })
        .catch(err => {
          reject({
            status: 500,
            message: "Error : " + err
          });
        });
    });
  };
};
/**
 * assignmentExamController() method is exported for the assignmentExamRouter class's use
 */
module.exports = new assignmentExamController();
