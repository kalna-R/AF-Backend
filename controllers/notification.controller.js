const express = require('express');
let NotificationSchema = require('../models/notification.model');

var notificationController = function () {
    this.insert = function (data) {
        return new Promise(function (resolve, reject) {
            var notification = new NotificationSchema({
                description: data.description,
                notificationCode: data.notificationCode,
                receiverList: data.receiverList
            });

            notification.save().then(() => {
                resolve({
                    status: 200,
                    message: 'Added a notification successfully'
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
            NotificationSchema.find().exec().then((data) => {
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

    this.getOne = (notificationCode) => {
        return new Promise(function (resolve, reject) {
            NotificationSchema.find({
                notificationCode: notificationCode
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

    /**
     * Delete an existing notification
     */
    this.deleteOne = (id) => {
        return new Promise(function (resolve, reject) {
            NotificationSchema.remove({
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

    this.update = (notificationCode, data) => {
        var description = JSON.stringify(data.description);
        var notificationCode = JSON.stringify(data.notificationCode);
        var receiverList = JSON.stringify(data.receiverList);


        return new Promise(function (resolve, reject) {
            NotificationSchema.find({
                notificationCode: notificationCode
            }).exec().then((notification) => {

                if (!notification) {

                    notification.notificationCode = notificationCode;
                    notification.description = description;
                    notification.receiverList = receiverList;

                    notification.save().then((data) => resolve({
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

module.exports = new notificationController();