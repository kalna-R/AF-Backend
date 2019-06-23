const express = require("express");
let AssignmentExamSchema = require("../models/assignment.model");

var assignmentExamController = function () {

  this.insert = function (data) {
    return new Promise(function (resolve, reject) {
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
  };

  this.get = () => {
    return new Promise(function (resolve, reject) {
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

  this.getOne = assignmentExamCode => {
    return new Promise(function (resolve, reject) {
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

  this.deleteOne = id => {
    return new Promise(function (resolve, reject) {
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

  this.update = (assignmentExamCode, data) => {
    var description = JSON.stringify(data.description);
    var assignmentExamCode = JSON.stringify(data.assignmentExamCode);
    var courseCode = JSON.stringify(data.courseCode);
    var typeOfExam = JSON.stringify(data.typeOfExam);
    var marks = JSON.stringify(data.marks);
    var deadlineDate = JSON.stringify(data.deadlineDate);

    return new Promise(function (resolve, reject) {
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

module.exports = new assignmentExamController();
