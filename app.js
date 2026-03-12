require('dotenv').config()

var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require("cors")
const connectDB = require('./config/db')

connectDB();

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const videoRouter = require('./routes/videos');
const couponsRouter = require("./routes/coupons")

var app = express();

app.use(logger('dev'));
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use("/api/users", usersRouter);
app.use("/api/videos", videoRouter);
app.use("/api/coupons", couponsRouter);

module.exports = app;
