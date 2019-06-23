const express = require('express');
const app = express();
const PORT = 4000;
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const routes = express.Router();

//classes which handles routes
var adminRouter = require('./controllers/admin.controller');
var instructorRouter = require('./controllers/instructor.controller');
var courseRouter = require('./controllers/courseController');
var studentRouter = require('./routes/student.routes');
var submissionRouter = require('./routes/submission.routes');
var assignmentRouter = require('./routes/assignment.routes');
var notificationRouter = require('./routes/notification.routes');
var examRouter = require('./routes/exam.routes');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//open up a connection to the database
mongoose.connect('mongodb://localhost/infosysdb', { useNewUrlParser: true });

var connection = mongoose.connection;
connection.once('open', function () {
    console.log("Connection Established");
});

//route the requests to the specified class
routes.use('/admin', adminRouter);
routes.use('/instructor', instructorRouter);
routes.use('/course', courseRouter);
routes.use('/student', studentRouter);
routes.use('/submission', submissionRouter);
routes.use('/exam', examRouter);
routes.use('/assignment', assignmentRouter);
routes.use('/submission', notificationRouter);

app.use('/', routes);

app.listen(PORT, function () {
    console.log("Server running on port: " + PORT);
})