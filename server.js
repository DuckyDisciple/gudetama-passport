//
// # Passport tutorial
//
// Testing out passport with clementine tutorial
//
'use strict';

var express = require('express');
var app = express();
require("dotenv").load();

var routes = require("./app/routes/index.js");
var mongoose = require('mongoose');
var passport = require('passport');
var session = require('express-session');

require('./app/config/passport')(passport);

var mongooseUrl = "mongodb://"+process.env.IP+":27017/gudetama";
// var mongooseUrl = process.env.MONGO_URI;
mongoose.connect(mongooseUrl);
  
app.use('/client', express.static(process.cwd()+"/client"));  
app.use('/controllers', express.static(process.cwd()+'/app/controllers'));
app.use('/common', express.static(process.cwd() + '/app/common'));

app.use(session({
  secret: 'secretGudetama',
  resave: false,
  saveUninitialized: true
}));
  
app.use(passport.initialize());
app.use(passport.session());

routes(app, passport);

var port = process.env.PORT || 8080;
app.listen(port, function(){
  console.log("Listening on port " + port);
});