const express = require('express');
let StudentExamSchema = require('../models/exam.model');

var studentExamController = function () {

    this.insert = function (data) {
        return new Promise(function (resolve, reject) {
            var studentExam = new StudentExamSchema({
                examId: data.examId,
                studentId: data.studentId,
                marks: data.marks,
                deadlineDate: data.deadlineDate
            });

            studentExam.save().then(() => {
                resolve({
                    status: 200,
                    message: 'Added a studentExam successfully'
                })
            }).catch((err) => {
                reject({
                    status: 500,
                    message: 'Error : ' + err
                })
            });
        }).catch(err => {
            return (console.log(err));
        });
    };

    this.get = () => {
        return new Promise(function (resolve, reject) {
            StudentExamSchema.find().then((data) => {
                resolve({
                    status: 200,
                    data: data
                })
            }).catch((err) => {
                reject({
                    status: 500,
                    message: 'Error : ' + err
                })
            })
        })
    };

    this.getOne = (examId) => {
        return new Promise(function (resolve, reject) {
            StudentExamSchema.find({
                examId: examId
            }).exec().then((data) => {
                resolve({
                    status: 200,
                    data: data
                })
            }).catch((err) => {
                reject({
                    status: 500,
                    message: 'Error : ' + err
                })
            })
        })
    };

    this.deleteOne = (id) => {
        return new Promise(function (resolve, reject) {
            StudentExamSchema.remove({
                _id: id
            }).exec().then((data) => {
                resolve({
                    status: 200,
                    message: 'Deleted'
                })
            }).catch((err) => {
                reject({
                    status: 500,
                    message: 'Error : ' + err
                })
            })
        })
    };

    this.update = (examId, data) => {
        var examId = JSON.stringify(data.examId);
        var studentId = JSON.stringify(data.studentId);
        var marks = JSON.stringify(data.marks);


        return new Promise(function (resolve, reject) {
            StudentExamSchema.find({
                examId: examId
            }).exec().then((studentExam) => {

                if (!studentExam) {

                    studentExam.assignmentExamCode = examId;
                    studentExam.description = studentId;
                    studentExam.marks = marks;

                    studentExam.save().then((data) => resolve({
                        status: 200,
                        data: data
                    })).catch((err) => reject({
                        status: 500,
                        message: 'Error : ' + err
                    }));

                }

            }).catch((err) => {
                reject({
                    status: 500,
                    message: 'Error : ' + err
                })
            })
        })
    }

};

module.exports = new studentExamController();